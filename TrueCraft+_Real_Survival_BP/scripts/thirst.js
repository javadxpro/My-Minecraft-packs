// ============================================================
// TrueCraft+ Real Survival - thirst system
// Hydration 0..100. Drains faster when running, jumping, mining,
// in hot weather or wearing heavy armor.
// Drinking:
//   - sneak in a lake/river  -> raw water (small sickness chance)
//   - drink a water bottle   -> portable safe-ish water
//   - bottle next to campfire-> boiled water (best, always safe)
//   - sneak on snow          -> eat snow (little water, cools you)
//   - ocean water            -> barely helps, may upset your stomach
// ============================================================

import { clamp } from "./util.js";
import { CFG, THIRST, CAMPING } from "./config.js";
import {
  ensureState,
  maxFx,
  damageSafe,
  warn,
  syncScore,
  markDirty,
  addEffectSafe,
  playSoundSafe,
  say,
} from "./core.js";
import { world } from "@minecraft/server";

export function initThirstEvents() {
  try {
    if (world.afterEvents && world.afterEvents.itemCompleteUse) {
      world.afterEvents.itemCompleteUse.subscribe(function (ev) {
        try {
          if (!ev.itemStack || ev.itemStack.typeId !== "minecraft:potion") return;
          const p = ev.source;
          if (!p) return;
          const valid = typeof p.isValid === "function" ? p.isValid() : p.isValid !== false;
          if (!valid) return;
          const st = ensureState(p);
          const near = st.scan && st.scan.campfireDist >= 0 && st.scan.campfireDist <= CAMPING.boilRadius;
          if (near) {
            st.thirst = clamp(st.thirst + THIRST.boiledRestore, 0, 100);
            say(p, "§9You drink boiled water. Safe and refreshing.");
          } else {
            st.thirst = clamp(st.thirst + THIRST.bottleRestore, 0, 100);
            if (Math.random() < THIRST.bottleSickChance) makeSick(p);
            else say(p, "§9You drink from your water bottle.");
          }
          st.dirty = true;
          playSoundSafe(p, "random.drink", 0.8, 1);
        } catch (e) {
          /* ignore */
        }
      });
    }
  } catch (e) {
    /* events unavailable - sneak-drinks still work */
  }
}

function makeSick(p) {
  addEffectSafe(p, "nausea", 200, 0);
  addEffectSafe(p, "hunger", 200, 0);
  if (Math.random() < 0.3) addEffectSafe(p, "poison", 60, 0);
  say(p, "§7That water tasted dirty... you feel sick.");
}

export function tickThirst(p, st, ctx) {
  if (!CFG.thirst) {
    st.thirst = 100;
    return;
  }
  const now = Date.now();
  const T = THIRST;

  // ---------------- passive drain ----------------
  let mult = 1;
  if (st.tempEff > 85) mult *= T.scorchMult; // faster thirst loss in extreme heat
  else if (st.tempEff > 65) mult *= T.hotMult;
  mult *= st.loadMult || 1; // heavy armor dehydrates faster
  if (CFG.hardMode) mult *= 1.4;

  let drain = T.baseDrain * mult;
  if (ctx.sprinting) drain += T.sprintDrain * mult;
  if (ctx.jumped) drain += T.jumpCost * 0; // jumps are event-driven below
  if (ctx.jumpedThisSecond) drain += 0;
  st.thirst -= drain;
  if (ctx.jumped) st.thirst -= T.jumpCost;

  // ---------------- drinking: sneak interactions ----------------
  if (p.isSneaking && now - st.drinkAt > T.drinkCooldown) {
    const env = ctx.env;
    if (ctx.inWater) {
      st.drinkAt = now;
      const info = ctx.biome;
      if (info && info.salt) {
        st.thirst = clamp(st.thirst + T.saltRestore, 0, 100);
        if (Math.random() < T.saltSickChance) {
          makeSick(p);
        } else {
          say(p, "§7Salt water... barely helps.");
        }
      } else {
        st.thirst = clamp(st.thirst + T.rawRestore, 0, 100);
        if (Math.random() < T.rawSickChance) makeSick(p);
        else say(p, "§9You drink raw water. §7Boil it at a campfire to be safe.");
      }
      st.dirty = true;
      playSoundSafe(p, "random.drink", 0.8, 1);
    } else if (env.snowGround || env.iceNear) {
      st.drinkAt = now;
      st.thirst = clamp(st.thirst + T.snowRestore, 0, 100);
      st.temp = clamp(st.temp - T.snowChill, 0, 100); // eating snow cools the body
      say(p, "§bYou eat snow. §7It quiets your thirst but chills you.");
      st.dirty = true;
      playSoundSafe(p, "random.drink", 0.6, 0.8);
    }
  }

  st.thirst = clamp(st.thirst, 0, 100);

  // ---------------- warnings & effects ----------------
  if (st.thirst < T.warnHard) {
    warn(p, st, "thirstHard", 40, "§cYou are severely dehydrated! Drink something NOW.");
  } else if (st.thirst < T.warnSoft) {
    warn(p, st, "thirstSoft", 60, "§6You are getting thirsty. Find water.");
  }

  if (st.thirst <= 0) {
    if (now - st.hurtAt > 8000) {
      st.hurtAt = now;
      damageSafe(p, 1, "magic");
    }
    maxFx(st, "weak", 0);
    maxFx(st, "mining", 0);
  } else if (st.thirst < 10) {
    maxFx(st, "weak", 0);
  }

  if (Math.random() < 0.02) syncScore(p, "tc_thirst", st.thirst);
}

/** Called by main when a player breaks a block (event-driven drain). */
export function onBlockBroken(st) {
  st.thirst = clamp(st.thirst - THIRST.breakCost, 0, 100);
  st.dirty = true;
}
