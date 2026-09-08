// ============================================================
// TrueCraft+ Real Survival - environment effects
// Vanilla particles only, no resource pack required:
//   - morning ground mist in forests, swamps, rivers and hills
//   - sparse wind wisps in open daylight
//   - cozy embers near campfires
// All effects are rare and cheap (mobile friendly).
// ============================================================

import { runCmd, chance, rndRange } from "./util.js";
import { CFG } from "./config.js";
import { caps } from "./core.js";

function spawnP(p, dim, name, x, y, z) {
  if (caps.spawnParticle) {
    try {
      dim.spawnParticle(name, { x: x, y: y, z: z });
      return;
    } catch (e) {
      /* fall through to command */
    }
  }
  runCmd(p, "particle " + name + " " + x.toFixed(1) + " " + y.toFixed(1) + " " + z.toFixed(1));
}

export function tickAmbient(p, st, ctx) {
  if (!CFG.ambient) return;
  const info = ctx.biome;
  const env = ctx.env;
  const loc = p.location;
  const dim = p.dimension;

  const morning = ctx.tod < 2500 || ctx.tod > 23250;

  // morning fog feeling
  if (morning && info.fog && env.skyExposed && chance(0.4)) {
    spawnP(p, dim, "minecraft:campfire_smoke_particle", loc.x + rndRange(-5, 5), loc.y + 0.3, loc.z + rndRange(-5, 5));
  }

  // wind atmosphere
  if (!ctx.night && env.skyExposed && chance(0.1)) {
    spawnP(p, dim, "minecraft:basic_smoke_particle", loc.x + rndRange(-6, 6), loc.y + rndRange(0.5, 2), loc.z + rndRange(-6, 6));
  }

  // campfire embers
  if (env.campfireDist >= 0 && env.campfireDist <= 5 && chance(0.25)) {
    spawnP(p, dim, "minecraft:basic_flame_particle", loc.x + rndRange(-1.5, 1.5), loc.y + rndRange(0.5, 1.2), loc.z + rndRange(-1.5, 1.5));
  }
}
