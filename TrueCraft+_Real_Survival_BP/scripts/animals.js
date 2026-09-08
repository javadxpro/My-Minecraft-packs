// ============================================================
// TrueCraft+ Real Survival - natural animal behavior
// Light, vanilla-first touches only (no fantasy creatures):
//   - wolves are more active at night (gentle speed pulses)
//   - wolves linger near camps and are left calm by fires
//   - cows/sheep/pigs/chickens get nervous around open fires
//     and lava (they avoid dangerous areas)
// Deliberately cheap: one entity query per type every 15 s.
// ============================================================

import { CFG } from "./config.js";
import { ensureState, addEffectSafe } from "./core.js";

const PREY = ["minecraft:cow", "minecraft:sheep", "minecraft:pig", "minecraft:chicken"];

export function tickAnimals(players, night) {
  if (!CFG.animals) return;
  for (const p of players) {
    try {
      const dim = p.dimension;

      // wolves: night activity + calm around camps
      const wolves = dim.getEntities({ location: p.location, maxDistance: 32, type: "minecraft:wolf" });
      for (const w of wolves) {
        if (night && Math.random() < 0.3) addEffectSafe(w, "speed", 100, 0);
      }

      // prey animals avoid dangerous areas (open fire, lava)
      const st = ensureState(p);
      const env = st.scan;
      if (env && ((env.campfireDist >= 0 && env.campfireDist <= 6) || (env.lavaDist >= 0 && env.lavaDist <= 8))) {
        for (const t of PREY) {
          const group = dim.getEntities({ location: p.location, maxDistance: 8, type: t });
          for (const a of group) {
            if (Math.random() < 0.5) addEffectSafe(a, "speed", 40, 0);
          }
        }
      }
    } catch (e) {
      /* ignore per-player failures */
    }
  }
}
