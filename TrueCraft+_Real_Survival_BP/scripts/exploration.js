// ============================================================
// TrueCraft+ Real Survival - exploration system
// - biome discovery messages ("New area discovered: Forest") + points
// - travel distance tracking with periodic rewards
// - abandoned realistic locations: old camps, small ruins,
//   forgotten storage boxes and old mining sites (script-built,
//   filled via loot command / direct chest injection)
// ============================================================

import { world, ItemStack } from "@minecraft/server";
import { runCmd, chance, dist2D, rndRange, rndInt, warnOnce } from "./util.js";
import { CFG, EXPLORATION as E } from "./config.js";
import { caps, ensureState, getDiscovered, getFoundRuins, say, playSoundSafe, markDirty } from "./core.js";

let ruinQueue = [];
let pendingLoot = [];
let lastCheck = -9999;
let ruins = null;

// JS mirror of loot_tables/old_storage.json (used to fill containers directly)
const JS_LOOT = [
  { id: "minecraft:bread", min: 1, max: 3, w: 12 },
  { id: "minecraft:apple", min: 1, max: 2, w: 10 },
  { id: "minecraft:baked_potato", min: 1, max: 3, w: 10 },
  { id: "minecraft:dried_kelp", min: 1, max: 4, w: 8 },
  { id: "minecraft:sweet_berries", min: 1, max: 3, w: 8 },
  { id: "minecraft:stick", min: 2, max: 6, w: 10 },
  { id: "minecraft:coal", min: 1, max: 4, w: 9 },
  { id: "minecraft:torch", min: 2, max: 6, w: 10 },
  { id: "minecraft:string", min: 1, max: 3, w: 8 },
  { id: "minecraft:leather", min: 1, max: 2, w: 7 },
  { id: "minecraft:paper", min: 1, max: 3, w: 6 },
  { id: "minecraft:book", min: 1, max: 1, w: 4 },
  { id: "minecraft:glass_bottle", min: 1, max: 2, w: 7 },
  { id: "minecraft:flint", min: 1, max: 2, w: 6 },
  { id: "minecraft:arrow", min: 2, max: 5, w: 6 },
  { id: "minecraft:iron_ingot", min: 1, max: 2, w: 4 },
  { id: "minecraft:bucket", min: 1, max: 1, w: 2 },
  { id: "minecraft:compass", min: 1, max: 1, w: 1 },
  { id: "minecraft:emerald", min: 1, max: 2, w: 2 },
  { id: "minecraft:wheat_seeds", min: 2, max: 5, w: 6 },
];

function getRuins() {
  if (ruins) return ruins;
  ruins = [];
  try {
    const csv = String(world.getDynamicProperty("tc:ruins") || "");
    for (const part of csv.split(";")) {
      const xy = part.split(",");
      if (xy.length === 2) ruins.push([Number(xy[0]), Number(xy[1])]);
    }
  } catch (e) {
    ruins = [];
  }
  return ruins;
}

function setRuins(list) {
  ruins = list;
  try {
    world.setDynamicProperty("tc:ruins", list.map(function (r) { return r[0] + "," + r[1]; }).join(";"));
  } catch (e) {}
}

// ---------------- biome discovery ----------------
const WATER_KEYS = ["ocean", "warm_ocean", "cold_ocean", "river", "beach", "stony_shore"];

export function tickExploration(p, st, ctx) {
  const loc = p.location;

  // --- biome discovery (caves count as their own area) ---
  let info = ctx.biome;
  if (!ctx.env.skyExposed && loc.y < 50 && WATER_KEYS.indexOf(info.key) < 0 && info.key !== "cave") {
    const cave = { key: "cave", name: "Cave", temp: info.temp, rare: false };
    info = cave;
    ctx.biome = cave; // keep HUD consistent
  }
  if (info.key !== st.biomeKey) {
    st.biomeKey = info.key;
    const disc = getDiscovered(st);
    if (!disc.has(info.key)) {
      disc.add(info.key);
      const pts = info.rare ? E.pointsBiomeRare : E.pointsBiome;
      st.pts += pts;
      st.dirty = true;
      say(p, "§6New area discovered: " + info.name + " §7(+" + pts + " pts)");
      playSoundSafe(p, "random.orb", 0.4, 1.5);
    }
  }

  // --- travel distance ---
  if (st.lastPos) {
    const d = dist2D(loc.x, loc.z, st.lastPos.x, st.lastPos.z);
    if (d < 40) {
      // ignore teleport-style jumps
      const before = Math.floor(st.dist / E.pointsPerMeters);
      st.dist += d;
      const after = Math.floor(st.dist / E.pointsPerMeters);
      if (after > before) {
        st.pts += E.pointsTravel;
        st.dirty = true;
        say(p, "§7You have traveled " + (after * E.pointsPerMeters) + " m. §7(+" + E.pointsTravel + " pts)");
      }
    }
  }
  st.lastPos = { x: loc.x, z: loc.z };

  // --- discovering an abandoned location ---
  for (const r of getRuins()) {
    const key = r[0] + "," + r[1];
    if (getFoundRuins(st).has(key)) continue;
    if (dist2D(loc.x, loc.z, r[0] + 0.5, r[1] + 0.5) <= E.ruinDiscoverRadius) {
      getFoundRuins(st).add(key);
      st.pts += E.pointsRuins;
      st.dirty = true;
      say(p, "§eYou discover an abandoned location. §7Someone camped here long ago. §7(+" + E.pointsRuins + " pts)");
    }
  }
}

// ---------------- abandoned locations ----------------
function sb(x, y, z, b) {
  return "setblock " + x + " " + y + " " + z + " " + b;
}
function fl(x1, y1, z1, x2, y2, z2, b) {
  return "fill " + x1 + " " + y1 + " " + z1 + " " + x2 + " " + y2 + " " + z2 + " " + b;
}

function ruinCmds(type, x, y, z) {
  const cmds = [];
  let loot = { x: x, y: y, z: z + 1 };
  if (type === "old_camp") {
    cmds.push(fl(x - 2, y - 1, z - 2, x + 2, y - 1, z + 2, "coarse_dirt"));
    cmds.push(sb(x, y, z, "campfire"));
    cmds.push(sb(x + 1, y, z, "oak_log"));
    cmds.push(sb(x - 1, y, z, "oak_log"));
    cmds.push(sb(x, y, z + 1, "barrel"));
    cmds.push(sb(x, y, z - 2, "torch"));
    loot = { x: x, y: y, z: z + 1 };
  } else if (type === "storage") {
    cmds.push(fl(x - 2, y - 1, z - 2, x + 2, y - 1, z + 2, "spruce_planks"));
    cmds.push(sb(x - 2, y, z - 2, "spruce_log"));
    cmds.push(sb(x + 2, y, z - 2, "spruce_log"));
    cmds.push(sb(x - 2, y + 1, z - 2, "spruce_log"));
    cmds.push(sb(x + 2, y + 1, z - 2, "spruce_log"));
    cmds.push(sb(x - 1, y, z, "barrel"));
    cmds.push(sb(x + 1, y, z, "barrel"));
    cmds.push(sb(x, y, z - 2, "torch"));
    loot = { x: x + 1, y: y, z: z };
  } else if (type === "ruin") {
    cmds.push(fl(x - 2, y - 1, z - 2, x + 2, y - 1, z + 2, "stone_bricks"));
    cmds.push(sb(x - 2, y, z - 2, "mossy_cobblestone"));
    cmds.push(sb(x - 2, y + 1, z - 2, "cobblestone"));
    cmds.push(sb(x + 2, y, z - 2, "cobblestone"));
    cmds.push(sb(x - 2, y, z + 2, "cobblestone"));
    cmds.push(sb(x + 2, y, z + 2, "mossy_cobblestone"));
    cmds.push(sb(x, y, z, "cracked_stone_bricks"));
    cmds.push(sb(x, y, z + 1, "barrel"));
    cmds.push(sb(x, y, z - 1, "torch"));
    loot = { x: x, y: y, z: z + 1 };
  } else {
    // old mining site
    cmds.push(fl(x - 2, y - 1, z - 2, x + 2, y - 1, z + 2, "cobblestone"));
    cmds.push(sb(x - 2, y, z, "oak_fence"));
    cmds.push(sb(x - 2, y + 1, z, "oak_fence"));
    cmds.push(sb(x + 2, y, z, "oak_fence"));
    cmds.push(sb(x + 2, y + 1, z, "oak_fence"));
    cmds.push(sb(x, y, z - 1, "torch"));
    cmds.push(sb(x - 1, y, z + 1, "barrel"));
    cmds.push(sb(x + 1, y, z + 1, "cobblestone"));
    cmds.push(sb(x + 1, y, z - 1, "mossy_cobblestone"));
    loot = { x: x - 1, y: y, z: z + 1 };
  }
  return { cmds: cmds, loot: loot };
}

function pickType() {
  const r = Math.random();
  if (r < 0.32) return "old_camp";
  if (r < 0.55) return "ruin";
  if (r < 0.78) return "storage";
  return "mining";
}

function chunkLoaded(dim, x, y, z) {
  if (!caps.isChunkLoaded) return true;
  try {
    return dim.isChunkLoaded({ x: x, y: y, z: z });
  } catch (e) {
    return false;
  }
}

/** Periodic world tick: maybe spawn one abandoned location near a random explorer. */
export function ruinCheck(players, tick) {
  if (!CFG.ruins || players.length === 0) return;
  if (tick - lastCheck < E.ruinCheckInterval) return;
  lastCheck = tick;
  if (!chance(E.ruinChance)) return;
  const p = players[rndInt(0, players.length - 1)];
  if (p) attemptRuin(p, false);
}

export function attemptRuin(p, manual) {
  try {
    if (p.dimension.id !== "minecraft:overworld") {
      if (manual) say(p, "§cAbandoned locations only appear in the Overworld.");
      return false;
    }
    const loc = p.location;
    const ang = Math.random() * Math.PI * 2;
    const d = rndRange(E.ruinMinDistance, E.ruinMaxDistance);
    const x = Math.floor(loc.x + Math.cos(ang) * d);
    const z = Math.floor(loc.z + Math.sin(ang) * d);
    const y = Math.floor(loc.y);
    const dim = p.dimension;
    if (!chunkLoaded(dim, x, y, z)) {
      if (manual) say(p, "§7That area is not loaded yet. Try again nearby.");
      return false;
    }
    const list = getRuins();
    for (const r of list) {
      if (dist2D(r[0], r[1], x, z) < E.ruinSpacing) {
        if (manual) say(p, "§7There is already an abandoned location nearby.");
        return false;
      }
    }
    const built = ruinCmds(pickType(), x, y, z);
    for (const c of built.cmds) ruinQueue.push({ dimId: "minecraft:overworld", cmd: c });
    pendingLoot.push({ x: built.loot.x, y: built.loot.y, z: built.loot.z, at: Date.now() + built.cmds.length * 400 + 1200 });
    list.push([x, z]);
    if (list.length > 12) list.shift();
    setRuins(list);
    if (manual) say(p, "§2An abandoned location was built nearby. Go find it!");
    return true;
  } catch (e) {
    warnOnce("ruin", "ruin build failed: " + e);
    return false;
  }
}

/** Fast lane: place a couple of ruin blocks every few ticks (mobile friendly). */
export function fastTick() {
  let n = 0;
  while (ruinQueue.length > 0 && n < 2) {
    const job = ruinQueue.shift();
    try {
      const dim = world.getDimension(job.dimId);
      if (dim) runCmd(dim, job.cmd);
    } catch (e) {
      /* chunk unloaded meanwhile - drop it */
    }
    n++;
  }
  if (pendingLoot.length > 0 && ruinQueue.length === 0) {
    const now = Date.now();
    for (let i = pendingLoot.length - 1; i >= 0; i--) {
      if (now >= pendingLoot[i].at) {
        injectLoot(pendingLoot[i]);
        pendingLoot.splice(i, 1);
      }
    }
  }
}

function pickLoot() {
  let total = 0;
  for (const l of JS_LOOT) total += l.w;
  let r = Math.random() * total;
  for (const l of JS_LOOT) {
    r -= l.w;
    if (r <= 0) return l;
  }
  return JS_LOOT[0];
}

function injectLoot(pos) {
  try {
    const dim = world.getDimension("minecraft:overworld");
    let block = null;
    try {
      block = dim.getBlock({ x: pos.x, y: pos.y, z: pos.z });
    } catch (e) {
      block = null;
    }
    if (block) {
      let inv = null;
      try {
        inv = block.getComponent("inventory") || block.getComponent("minecraft:inventory");
      } catch (e2) {
        inv = null;
      }
      if (inv && inv.container) {
        const size = inv.container.size();
        const rolls = rndInt(2, 4);
        for (let i = 0; i < rolls; i++) {
          const pick = pickLoot();
          try {
            inv.container.setItem(rndInt(0, size - 1), new ItemStack(pick.id, rndInt(pick.min, pick.max)));
          } catch (e3) {
            /* slot issue - skip */
          }
        }
        return;
      }
    }
    // fallback: scatter the loot with the vanilla loot table
    runCmd(dim, "loot spawn " + (pos.x + 0.5) + " " + (pos.y + 1) + " " + (pos.z + 0.5) + " loot old_storage");
  } catch (e) {
    warnOnce("loot", "loot injection failed: " + e);
  }
}
