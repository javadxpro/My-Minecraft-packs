// ============================================================
// TrueCraft+ Real Survival - camping system
// A campfire nearby warms and dries you (radius based heat).
// Campfire + bed + wooden blocks around = SAFE CAMP:
//   - better temperature recovery (temperature.js reads campLevel)
//   - small regeneration while you stay
//   - fast drying after rain or swimming
// Also owns the wetness model (rain, water, drying).
// ============================================================

import { clamp } from "./util.js";
import { CFG, CAMPING } from "./config.js";
import { ensureState, syncScore, markDirty, say } from "./core.js";

/**
 * Evaluate camp level and wetness for this player.
 *   level 0 = no camp, 1 = campfire warmth, 2 = Safe Camp
 */
export function tickCamp(p, st, ctx) {
  const env = ctx.env;

  // ---------------- camp level ----------------
  let level = 0;
  if (CFG.camping && env.campfireDist >= 0 && env.campfireDist <= CAMPING.campfireRadius) {
    level = 1;
    if (env.bedDist >= 0 && env.bedDist <= CAMPING.bedRadius && env.woodNear >= CAMPING.woodNeeded) {
      level = 2;
    }
  }
  if (level > st.campLevel) {
    if (level === 1) say(p, "§7The campfire warms you.");
    if (level === 2) say(p, "§aSafe Camp §7- fire, shelter and wood. You feel at home here.");
  }
  st.campLevel = level;

  if (level === 2) {
    st.fx.regen = true; // small regeneration at a safe camp
  }

  // ---------------- wetness ----------------
  const C = CAMPING;
  if (ctx.inWater) {
    st.wet += C.waterWet;
  } else if (ctx.weather === "rain" || ctx.weather === "thunder") {
    if (env.skyExposed) st.wet += C.rainWet; // rain makes you wet
    else st.wet -= C.dryBase;
  } else {
    let dry = C.dryBase;
    if (env.campfireDist >= 0 && env.campfireDist <= 5) dry += C.dryNearFire; // campfires dry you
    if (level === 2) dry += 2;
    if (ctx.dayLight > 0.5 && env.skyExposed && st.tempEff > 65) dry += C.drySun; // hot sun dries fast
    st.wet -= dry;
  }
  st.wet = clamp(st.wet, 0, 100);

  if (Math.random() < 0.02) {
    syncScore(p, "tc_camp", level);
    syncScore(p, "tc_wet", st.wet);
  }
  markDirty(st);
}
