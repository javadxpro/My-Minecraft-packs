// ============================================================
// TrueCraft+ Real Survival - environment scanner
// One cheap, cached block scan per player answers every "what is
// around me" question: heat sources, camp objects, ground type,
// open sky. Cached for a couple of seconds so standing still or
// walking slowly costs almost nothing (mobile friendly).
// ============================================================

import { getBlockSafe, dist3D, dist2D } from "./util.js";
import { getEquippable, caps } from "./core.js";

const HEAT_ITEMS = ["minecraft:torch", "minecraft:soul_torch", "minecraft:campfire", "minecraft:soul_campfire", "minecraft:lantern"];

export function mainhandIsTorch(p) {
  try {
    const eq = getEquippable(p);
    if (!eq || typeof eq.getEquipment !== "function") return false;
    const item = eq.getEquipment("Mainhand");
    if (!item) return false;
    return HEAT_ITEMS.indexOf(item.typeId) >= 0;
  } catch (e) {
    return false;
  }
}

/**
 * Scan the area around a player.
 * Returns (and caches):
 *   campfireDist  distance to nearest campfire, or -1
 *   soulCampfire  true when the nearest campfire is a soul campfire
 *   torchNear     torch within 3 blocks
 *   lavaDist      distance to nearest lava block, or -1
 *   magmaNear     magma block within reach
 *   furnaceNear   furnace block within reach
 *   bedDist       distance to nearest bed, or -1
 *   woodNear      count of wooden blocks nearby (capped)
 *   snowGround / iceNear / sandGround
 *   waterNear     water blocks right around the player
 *   skyExposed    open sky above the player (skylight probe)
 */
export function scanEnv(p, st) {
  const loc = p.location;
  // reuse a recent scan when the player barely moved
  if (st.scan && st.scanAge < 2.5 && st.scanPos) {
    if (dist2D(loc.x, loc.z, st.scanPos.x, st.scanPos.z) < 1.2 && Math.abs(loc.y - st.scanPos.y) < 2.5) {
      return st.scan;
    }
  }
  st.scanPos = { x: loc.x, y: loc.y, z: loc.z };

  const dim = p.dimension;
  const bx = Math.floor(loc.x);
  const by = Math.floor(loc.y);
  const bz = Math.floor(loc.z);

  const env = {
    campfireDist: -1,
    soulCampfire: false,
    torchNear: false,
    lavaDist: -1,
    magmaNear: false,
    furnaceNear: false,
    bedDist: -1,
    woodNear: 0,
    snowGround: false,
    iceNear: false,
    sandGround: false,
    waterNear: false,
    skyExposed: true,
    handTorch: mainhandIsTorch(p),
  };

  let interesting = 0;
  // three layers around the body: wide layer at foot level, tighter above/below
  for (let dy = -1; dy <= 1; dy++) {
    const r = dy === 0 ? 5 : 3;
    for (let dx = -r; dx <= r; dx++) {
      for (let dz = -r; dz <= r; dz++) {
        const b = getBlockSafe(dim, bx + dx, by + dy, bz + dz);
        if (!b) continue;
        const id = b.typeId;
        if (id === "minecraft:campfire" || id === "minecraft:soul_campfire") {
          const d = dist3D(bx + dx + 0.5, by + dy, bz + dz + 0.5, loc.x, loc.y, loc.z);
          if (env.campfireDist < 0 || d < env.campfireDist) {
            env.campfireDist = d;
            env.soulCampfire = id === "minecraft:soul_campfire";
          }
          interesting++;
        } else if (id === "minecraft:torch" || id === "minecraft:wall_torch" || id === "minecraft:soul_torch" || id === "minecraft:soul_wall_torch") {
          if (Math.abs(dx) <= 3 && Math.abs(dz) <= 3) env.torchNear = true;
        } else if (id === "minecraft:lava") {
          const d = dist3D(bx + dx + 0.5, by + dy, bz + dz + 0.5, loc.x, loc.y, loc.z);
          if (env.lavaDist < 0 || d < env.lavaDist) env.lavaDist = d;
          interesting++;
        } else if (id === "minecraft:magma") {
          env.magmaNear = true;
        } else if (id === "minecraft:furnace") {
          env.furnaceNear = true;
        } else if (id === "minecraft:bed") {
          const d = dist2D(bx + dx + 0.5, bz + dz + 0.5, loc.x, loc.z);
          if (env.bedDist < 0 || d < env.bedDist) env.bedDist = d;
          interesting++;
        } else if (id.indexOf("log") >= 0 || id.indexOf("planks") >= 0 || id.indexOf("_wood") >= 0) {
          if (env.woodNear < 10) env.woodNear++;
        } else if (id === "minecraft:water") {
          env.waterNear = true;
        } else if (id === "minecraft:ice" || id === "minecraft:packed_ice" || id === "minecraft:blue_ice") {
          env.iceNear = true;
        }
        if (interesting >= 4 && env.woodNear >= 8) {
          dy = 2; // enough data, leave the loops early
          dx = 99;
          break;
        }
      }
    }
  }

  // ground type (feet support block)
  const ground = getBlockSafe(dim, bx, by - 1, bz);
  if (ground) {
    const g = ground.typeId;
    env.snowGround = g === "minecraft:snow" || g === "minecraft:snow_layer" || g === "minecraft:powder_snow";
    env.sandGround = g === "minecraft:sand" || g === "minecraft:red_sand";
    if (g === "minecraft:ice" || g === "minecraft:packed_ice" || g === "minecraft:blue_ice") env.iceNear = true;
  }

  // open sky check - skylight 15 means nothing blocks the sky (works day & night)
  if (caps.skyLight) {
    try {
      env.skyExposed = dim.getSkyLightLevel({ x: bx, y: by + 1, z: bz }) >= 14;
    } catch (e) {
      env.skyExposed = true;
    }
  } else {
    let exposed = true;
    for (let dy = 1; dy <= 6; dy++) {
      const b = getBlockSafe(dim, bx, by + dy, bz);
      if (b && b.typeId !== "minecraft:air") {
        exposed = false;
        break;
      }
    }
    env.skyExposed = exposed;
  }

  st.scan = env;
  st.scanAge = 0;
  return env;
}

export function ageScans(st) {
  st.scanAge++;
}
