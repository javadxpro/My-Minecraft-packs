// ============================================================
// TrueCraft+ Real Survival - core
// Player state, persistence, effect intents, scoreboards,
// capability probing and small cross-module helpers.
// ============================================================

import { world } from "@minecraft/server";
import { runCmd, warnOnce } from "./util.js";
import { SCOREBOARDS } from "./config.js";

/** Feature flags detected once at startup (keeps the pack resilient). */
export const caps = {
  getBiome: false,
  skyLight: false,
  isChunkLoaded: false,
  getTimeOfDay: false,
  spawnParticle: false,
  scoreboard: false,
  dynamicProps: false,
};

export function probeCaps(dim) {
  try {
    caps.getBiome = typeof dim.getBiome === "function";
    caps.skyLight = typeof dim.getSkyLightLevel === "function";
    caps.isChunkLoaded = typeof dim.isChunkLoaded === "function";
    caps.getTimeOfDay = typeof dim.getTimeOfDay === "function";
    caps.spawnParticle = typeof dim.spawnParticle === "function";
    caps.scoreboard = !!world.scoreboard && typeof world.scoreboard.addObjective === "function";
    caps.dynamicProps = typeof world.getDynamicProperty === "function";
  } catch (e) {
    warnOnce("caps", "capability probe failed: " + e);
  }
}

// ------------------------------------------------------------
// component access helpers (work on 1.x and 2.x API surfaces)
// ------------------------------------------------------------
export function getHealth(p) {
  try {
    const h = p.getComponent("health");
    if (h) return h;
  } catch (e) {}
  try {
    return p.getComponent("minecraft:health");
  } catch (e) {
    return undefined;
  }
}

export function getEquippable(p) {
  try {
    const e = p.getComponent("equippable");
    if (e) return e;
  } catch (e2) {}
  try {
    return p.getComponent("minecraft:equippable");
  } catch (e3) {
    return undefined;
  }
}

export function getInventory(p) {
  try {
    const i = p.getComponent("inventory");
    if (i) return i;
  } catch (e) {}
  try {
    return p.getComponent("minecraft:inventory");
  } catch (e2) {
    return undefined;
  }
}

// ------------------------------------------------------------
// per-player state (persisted via dynamic properties)
// ------------------------------------------------------------
const players = new Map();

function dpGet(obj, key, fallback) {
  try {
    if (typeof obj.getDynamicProperty !== "function") return fallback;
    const v = obj.getDynamicProperty(key);
    return v === undefined ? fallback : v;
  } catch (e) {
    return fallback;
  }
}

function dpSet(obj, key, value) {
  try {
    if (typeof obj.setDynamicProperty === "function") obj.setDynamicProperty(key, value);
  } catch (e) {
    /* ignore */
  }
}

export function ensureState(p) {
  let st = players.get(p.id);
  if (!st) {
    st = {
      // persisted
      temp: Number(dpGet(p, "tc:temp", 50)) || 50,
      thirst: Number(dpGet(p, "tc:thirst", 100)),
      wet: Number(dpGet(p, "tc:wet", 0)) || 0,
      pts: Number(dpGet(p, "tc:pts", 0)) || 0,
      dist: Number(dpGet(p, "tc:dist", 0)) || 0,
      biomesCsv: String(dpGet(p, "tc:biomes", "") || ""),
      chal: Number(dpGet(p, "tc:chal", 0)) || 0,
      welcomed: !!dpGet(p, "tc:welcome", false),
      foundRuinsCsv: String(dpGet(p, "tc:foundruins", "") || ""),
      // volatile
      dirty: true,
      lastSave: 0,
      lastPos: null,
      wasOnGround: true,
      scan: null,
      scanPos: null,
      scanAge: 99,
      load: 0,
      armorStats: null,
      loadMult: 1,
      staminaMult: 1,
      campLevel: 0,
      tempEff: 50,
      tempState: "",
      biomeKey: "",
      discovered: null,
      foundRuins: null,
      fx: { slow: -1, weak: -1, hunger: -1, mining: -1, regen: false, nausea: false },
      warns: {},
      drinkAt: 0,
      hurtAt: 0,
      nauseaAt: 0,
      lastDay: 0,
    };
    players.set(p.id, st);
  }
  return st;
}

export function allStates() {
  return players;
}

export function markDirty(st) {
  st.dirty = true;
}

/** Persist volatile-turned-valuable fields back to dynamic properties. */
export function saveState(p, st) {
  dpSet(p, "tc:temp", Math.round(st.temp * 10) / 10);
  dpSet(p, "tc:thirst", Math.round(st.thirst * 10) / 10);
  dpSet(p, "tc:wet", Math.round(st.wet));
  dpSet(p, "tc:pts", Math.round(st.pts));
  dpSet(p, "tc:dist", Math.round(st.dist));
  if (st.discovered) dpSet(p, "tc:biomes", Array.from(st.discovered).join(","));
  dpSet(p, "tc:chal", st.chal);
  dpSet(p, "tc:welcome", st.welcomed ? 1 : 0);
  if (st.foundRuins) dpSet(p, "tc:foundruins", Array.from(st.foundRuins).join(","));
  st.dirty = false;
  st.lastSave = Date.now();
}

/** Wipe all TrueCraft+ data (used by /scriptevent truecraft:reset). */
export function resetAll(playersOnline) {
  const keys = [
    "tc:temp",
    "tc:thirst",
    "tc:wet",
    "tc:pts",
    "tc:dist",
    "tc:biomes",
    "tc:chal",
    "tc:welcome",
    "tc:foundruins",
    "tc:day",
    "tc:weather",
    "tc:weatherUntil",
    "tc:ruins",
    "tc:start",
  ];
  for (const p of playersOnline) {
    for (const k of keys) dpSet(p, k, undefined);
  }
  try {
    for (const k of keys) world.setDynamicProperty(k, undefined);
  } catch (e) {}
  players.clear();
}

export function getDiscovered(st) {
  if (!st.discovered) {
    st.discovered = new Set(
      st.biomesCsv
        .split(",")
        .map(function (s) {
          return s.trim();
        })
        .filter(function (s) {
          return s.length > 0;
        })
    );
  }
  return st.discovered;
}

export function getFoundRuins(st) {
  if (!st.foundRuins) {
    st.foundRuins = new Set(
      st.foundRuinsCsv
        .split(",")
        .map(function (s) {
          return s.trim();
        })
        .filter(function (s) {
          return s.length > 0;
        })
    );
  }
  return st.foundRuins;
}

// ------------------------------------------------------------
// scoreboards (created idempotently; script commands work even
// with world cheats disabled, so setup is fully automatic)
// ------------------------------------------------------------
const objectives = {};

export function ensureObjectives() {
  if (!caps.scoreboard) return;
  for (const entry of SCOREBOARDS) {
    const name = entry[0];
    const display = entry[1];
    try {
      objectives[name] = world.scoreboard.addObjective(name, display);
    } catch (e) {
      try {
        objectives[name] = world.scoreboard.getObjective(name);
      } catch (e2) {
        warnOnce("obj:" + name, "could not create objective " + name);
      }
    }
  }
}

export function syncScore(p, name, value) {
  const obj = objectives[name];
  const v = Math.round(value);
  if (obj) {
    try {
      obj.setScore(p, v);
      return;
    } catch (e) {
      /* fall through to command */
    }
  }
  runCmd(p, "scoreboard players set @s " + name + " " + v);
}

// ------------------------------------------------------------
// effect intents - modules request effects; applied once per
// second with the strongest value, then expire naturally.
// ------------------------------------------------------------
export function resetFx(st) {
  st.fx.slow = -1;
  st.fx.weak = -1;
  st.fx.hunger = -1;
  st.fx.mining = -1;
  st.fx.regen = false;
  st.fx.nausea = false;
}

export function maxFx(st, key, val) {
  if (val > st.fx[key]) st.fx[key] = val;
}

export function applyFx(p, st) {
  const f = st.fx;
  if (f.slow >= 0) addEffectSafe(p, "slowness", 35, f.slow);
  if (f.weak >= 0) addEffectSafe(p, "weakness", 35, f.weak);
  if (f.hunger >= 0) addEffectSafe(p, "hunger", 45, f.hunger);
  if (f.mining >= 0) addEffectSafe(p, "mining_fatigue", 35, f.mining);
  if (f.regen) addEffectSafe(p, "regeneration", 70, 0);
  if (f.nausea) addEffectSafe(p, "nausea", 120, 0);
}

export function addEffectSafe(p, effect, durationTicks, amplifier) {
  try {
    p.addEffect(effect, durationTicks, { amplifier: amplifier, showParticles: false });
    return;
  } catch (e) {}
  const seconds = Math.max(1, Math.round(durationTicks / 20));
  runCmd(p, "effect @s " + effect + " " + seconds + " " + amplifier + " true");
}

export function damageSafe(p, amount, cause) {
  try {
    if (typeof p.applyDamage === "function") {
      p.applyDamage(amount, { cause: cause });
      return;
    }
  } catch (e) {}
  runCmd(p, "damage @s " + amount + " " + cause);
}

/** Throttled warning message (per player state, per key). */
export function warn(p, st, key, cooldownSec, msg) {
  const now = Date.now();
  if (st.warns[key] && now - st.warns[key] < cooldownSec * 1000) return;
  st.warns[key] = now;
  try {
    p.sendMessage(msg);
  } catch (e) {}
}

export function say(p, msg) {
  try {
    p.sendMessage(msg);
  } catch (e) {}
}

export function addPoints(p, st, n, note) {
  st.pts += n;
  st.dirty = true;
  if (note) say(p, "§2+§a" + n + "§2 pts §7" + note);
}

/** Play a sound just for one player, never throwing. */
export function playSoundSafe(p, soundId, volume, pitch) {
  try {
    if (typeof p.playSound === "function") {
      p.playSound(soundId, { volume: volume || 1, pitch: pitch || 1 });
      return;
    }
  } catch (e) {}
  runCmd(p, "playsound " + soundId + " @s ~ ~ ~ " + (volume || 1) + " " + (pitch || 1));
}
