// ============================================================
// TrueCraft+ Real Survival - temperature system
// Body temperature 0..100 (50 = comfortable).
//   0-15 Freezing | 15-35 Cold | 35-65 Comfortable | 65-85 Hot | 85-100 Heat exhaustion
// Driven by: biome, weather, time of day, clothing, nearby heat
// sources and being wet. Calm, gradual and fair.
// ============================================================

import { clamp, lerp } from "./util.js";
import { CFG, TEMP } from "./config.js";
import { ensureState, maxFx, damageSafe, warn, syncScore, markDirty } from "./core.js";

function isHotBiome(info) {
  return !!info.hot;
}

function isSnowyName(name) {
  return (
    name.indexOf("Snow") >= 0 ||
    name.indexOf("Frozen") === 0 ||
    name.indexOf("Ice") >= 0 ||
    name === "Grove" ||
    name === "Jagged Peaks" ||
    name === "Frozen Peaks"
  );
}

/** Compute the effective environment temperature for this player right now. */
export function computeEffectiveTemp(ctx) {
  const info = ctx.biome;
  const env = ctx.env;
  let t = info.temp;

  // --- time of day: days are warmer, nights are colder ---
  const dayHeat = isHotBiome(info) ? TEMP.dayHeatHot : TEMP.dayHeatPlains;
  if (isHotBiome(info) || isSnowyName(info.name)) {
    // extremes swing more: deserts bake at noon, tundra dies at night
    t += ctx.dayLight * (dayHeat + 2);
    t -= ctx.night ? TEMP.nightChill + 2 : 0;
  } else {
    t += ctx.dayLight * dayHeat;
    t -= ctx.night ? TEMP.nightChill : 0;
  }

  // --- weather ---
  const w = ctx.weather;
  if (w === "rain") {
    if (isSnowyName(info.name)) t -= 14; // snowfall
    else if (isHotBiome(info)) t -= 6;
    else t -= 8;
  } else if (w === "thunder") {
    t -= 11;
  }

  // --- being wet steals body heat ---
  if (ctx.st.wet > 25) t -= TEMP.wetChill;
  else if (ctx.st.wet > 5) t -= 6 * (ctx.st.wet / 25);

  // --- underground is cool and stable ---
  if (!env.skyExposed && ctx.y < 55 && !ctx.env.waterNear && info.temp < 75) {
    t = lerp(t, TEMP.caveTemp, TEMP.undergroundBlend);
  }

  // --- nearby heat sources (radius matters) ---
  if (env.campfireDist >= 0 && env.campfireDist <= 6) {
    const strength = env.soulCampfire ? 0.5 : 1;
    t += strength * clamp(3 * (6 - env.campfireDist), 0, 18);
  }
  if (env.lavaDist >= 0 && env.lavaDist < 5) {
    t += clamp(10 - 2 * env.lavaDist, 4, 10);
  }
  if (env.magmaNear) t += 3;
  if (env.furnaceNear) t += 2;
  if (env.torchNear) t += 2;
  if (env.handTorch) t += 2.5; // a torch in hand keeps the fingers warm
  if (ctx.sprinting) t += 1.5;

  // --- clothing ---
  const a = ctx.armor;
  if (a) {
    if (t < 50) t += Math.min(a.ins, 12); // insulation: leather shines here
    if (t > 60) t -= a.breath * 1.2; // breathability: chainmail shines here
    if (ctx.dayLight > 0.4 && env.skyExposed) t += a.absorb * 1.4; // metal bakes in the sun
    if (a.cond > 0) t = 50 + (t - 50) * (1 + a.cond); // conductivity amplifies extremes
  }

  return clamp(t, 0, 100);
}

function stateName(temp) {
  if (temp < 15) return "freezing";
  if (temp < 35) return "cold";
  if (temp <= 65) return "comfortable";
  if (temp <= 85) return "hot";
  return "exhaustion";
}

const STATE_MSG = {
  freezing: "§bYou are freezing! Find shelter, a fire or warm clothes.",
  cold: "§3You feel cold. Staying warm burns extra energy.",
  comfortable: "",
  hot: "§6It is getting hot. Rest in shade and drink water.",
  exhaustion: "§cHeat exhaustion! Get out of the sun and hydrate now.",
};

export function tickTemp(p, st, ctx) {
  if (!CFG.temp) {
    st.temp = 50;
    return;
  }
  ctx.st = st; // computeEffectiveTemp reads wetness from the player state
  const eff = computeEffectiveTemp(ctx);
  st.tempEff = eff;

  // the body drifts gradually toward the effective temperature
  let rate = TEMP.rate;
  if (st.campLevel >= 1) rate *= TEMP.campRateMult;
  if (ctx.env.waterNear && eff < st.temp) rate *= TEMP.waterRateMult;
  if (CFG.hardMode) rate *= 1.3;

  st.temp = clamp(st.temp + (eff - st.temp) * rate, 0, 100);
  markDirty(st);

  // state transitions -> gentle, immersive messages
  const s = stateName(st.temp);
  if (s !== st.tempState) {
    st.tempState = s;
    const msg = STATE_MSG[s];
    if (msg) warn(p, st, "state" + s, 30, msg);
  }

  const now = Date.now();
  const dmgEvery = CFG.hardMode ? 6000 : 8000;

  // ---------------- cold effects ----------------
  if (st.temp < 15) {
    maxFx(st, "slow", st.temp < 3 ? 2 : st.temp < 8 ? 1 : 0); // slower movement
    maxFx(st, "hunger", st.temp < 10 ? 1 : 0); // increased hunger consumption
    if (st.temp < TEMP.damageBelowHard) {
      if (now - st.hurtAt > dmgEvery * 0.7) {
        st.hurtAt = now;
        damageSafe(p, 1, "freeze"); // damage after long exposure
      }
    } else if (st.temp < TEMP.damageBelow) {
      if (now - st.hurtAt > dmgEvery) {
        st.hurtAt = now;
        damageSafe(p, 1, "freeze");
      }
    }
  } else if (st.temp < 35) {
    maxFx(st, "hunger", 0); // cold burns extra energy (increased hunger consumption)
    if (st.temp < 25) maxFx(st, "slow", 0);
  }

  // ---------------- heat effects ----------------
  if (st.temp > 85) {
    // heat exhaustion
    if (st.temp >= 88) maxFx(st, "weak", 0); // weakness after long exposure
    if (st.temp > TEMP.heatDamageAbove && now - st.hurtAt > dmgEvery) {
      st.hurtAt = now;
      damageSafe(p, 1, "magic");
    }
    if (st.temp > 95 && now - st.nauseaAt > 45000) {
      st.nauseaAt = now;
      try {
        p.addEffect("nausea", 140, { amplifier: 0, showParticles: false });
      } catch (e) {}
    }
    if (st.temp > 82) maxFx(st, "slow", 1);
    else if (st.temp > 75) maxFx(st, "slow", 0);
  } else if (st.temp > 65) {
    if (st.temp > 82) maxFx(st, "slow", 1);
    else if (st.temp > 75) maxFx(st, "slow", 0);
  }

  if (Math.random() < 0.02) syncScore(p, "tc_temp", st.temp);
}
