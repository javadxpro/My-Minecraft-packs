// ============================================================
// TrueCraft+ Real Survival - main entry point
// One lightweight loop per second per player (Script API). All
// heavy lifting is data-driven and cached; block scans are
// throttled, particles are rare. Designed for low-end mobile
// devices: stable FPS, low RAM.
//
// Modules: temperature, thirst, weight, camping, exploration,
// weather, animals, challenges, ambient, hud.
// ============================================================

import { world, system } from "@minecraft/server";
import { scanEnv } from "./env.js";
import { CFG, VERSION, BIOME_TABLE, BIOME_INFO } from "./config.js";
import { getBlockSafe, errOnce, warnOnce } from "./util.js";
import {
  probeCaps,
  caps,
  ensureState,
  resetFx,
  maxFx,
  applyFx,
  saveState,
  resetAll,
  ensureObjectives,
  syncScore,
  say,
  markDirty,
} from "./core.js";
import * as temperature from "./temperature.js";
import * as thirst from "./thirst.js";
import * as weight from "./weight.js";
import * as camping from "./camping.js";
import * as exploration from "./exploration.js";
import * as weatherMod from "./weather.js";
import * as animals from "./animals.js";
import * as challenges from "./challenges.js";
import * as ambient from "./ambient.js";
import * as hud from "./hud.js";

let tick = 0;
let worldDay = 1;
let prevTod = -1;
let ready = false;

// ---------------- biome lookup ----------------
function withKey(info, key) {
  return {
    key: key,
    name: info.name,
    temp: info.temp,
    rare: !!info.rare,
    hot: !!info.hot,
    fog: !!info.fog,
    salt: !!info.salt,
  };
}

function biomeInfoFromId(id) {
  const short = String(id).replace("minecraft:", "");
  for (const row of BIOME_TABLE) {
    if (short.indexOf(row[0]) >= 0) return withKey(BIOME_INFO[row[1]], row[1]);
  }
  return withKey(BIOME_INFO.wilds, "wilds");
}

function fallbackBiome(p, loc) {
  try {
    const dimId = p.dimension.id;
    if (dimId === "minecraft:nether") return withKey(BIOME_INFO.nether, "nether");
    if (dimId === "minecraft:the_end") return withKey(BIOME_INFO.end, "end");
  } catch (e) {}
  const g = getBlockSafe(p.dimension, Math.floor(loc.x), Math.floor(loc.y) - 1, Math.floor(loc.z));
  const id = g ? g.typeId : "";
  if (id.indexOf("snow") >= 0 || id.indexOf("ice") >= 0) return withKey(BIOME_INFO.snowy, "snowy");
  if (id === "minecraft:sand" || id === "minecraft:red_sand") return withKey(BIOME_INFO.desert, "desert");
  if (id === "minecraft:podzol") return withKey(BIOME_INFO.taiga, "taiga");
  if (id === "minecraft:mud") return withKey(BIOME_INFO.swamp, "swamp");
  return withKey(BIOME_INFO.wilds, "wilds");
}

function getBiomeSafe(p) {
  const loc = p.location;
  if (caps.getBiome) {
    try {
      const b = p.dimension.getBiome({ x: loc.x, y: loc.y, z: loc.z });
      if (b && b.id) return biomeInfoFromId(b.id);
    } catch (e) {
      /* unloaded chunk etc. - fall through */
    }
  }
  return fallbackBiome(p, loc);
}

// ---------------- welcome ----------------
function welcome(p) {
  say(p, "§2[TrueCraft+] §fReal Survival §7v" + VERSION + " §f- realistic temperature, thirst, weight, camping and exploration.");
  say(p, "§7Sneak in water to drink. Water bottles are portable - boil them next to a campfire for the safest drink. Campfire + bed + wood = §aSafe Camp§7.");
  say(p, "§7Type §e/function help §7for the full guide. Explore far - new areas earn points.");
}

// ---------------- status (scriptevent) ----------------
function printStatus(p) {
  const st = ensureState(p);
  const env = st.scan || {};
  say(p, "§2=== TrueCraft+ status ===");
  say(p, "§bTemp: §f" + Math.round(st.temp) + "°  §9Thirst: §f" + Math.round(st.thirst) + "%  §6Weight: §f" + Math.round(st.load * 10) / 10 + "kg  §7Wet: " + Math.round(st.wet) + "%");
  say(p, "§aPoints: §f" + Math.round(st.pts) + "  §7Biome: " + (st.biomeKey || "?") + "  §7Day: " + worldDay + "  §7Weather: " + weatherMod.getWeather());
  say(p, "§7Camp level: " + st.campLevel + "  §7Campfire: " + (env.campfireDist >= 0 ? Math.round(env.campfireDist) + "m" : "none"));
}

// ---------------- script events ----------------
function onScriptEvent(ev) {
  try {
    const id = String(ev.id || "");
    if (id.indexOf("truecraft:") !== 0) return;
    const cmd = id.slice("truecraft:".length);
    const msg = String(ev.message || "").trim();
    const src = ev.sourceEntity;

    if (cmd === "cfg") {
      const parts = msg.split(/\s+/);
      const key = parts[0];
      const val = (parts[1] || "").toLowerCase();
      if (Object.prototype.hasOwnProperty.call(CFG, key)) {
        CFG[key] = val === "on" || val === "true" || val === "1";
        if (src) say(src, "§2[TrueCraft+] §f" + key + " = " + (CFG[key] ? "on" : "off"));
      } else if (src) {
        say(src, "§c[TrueCraft+] unknown module: " + key);
      }
    } else if (cmd === "status") {
      if (src) printStatus(src);
    } else if (cmd === "weather") {
      const w = msg.toLowerCase();
      if (weatherMod.forceWeather(w)) {
        if (src) say(src, "§2[TrueCraft+] §fWeather set to " + w + ".");
      } else if (src) {
        say(src, "§c[TrueCraft+] usage: /scriptevent truecraft:weather <clear|rain|thunder>");
      }
    } else if (cmd === "reset") {
      resetAll(world.getAllPlayers());
      if (src) say(src, "§2[TrueCraft+] §fAll TrueCraft+ data wiped for this world.");
    } else if (cmd === "ruin") {
      if (src) exploration.attemptRuin(src, true);
    }
  } catch (e) {
    errOnce("scriptevent", e);
  }
}

// ---------------- init ----------------
function init() {
  const overworld = world.getDimension("overworld");
  probeCaps(overworld);
  try {
    caps.nativeWeather = typeof overworld.getWeather === "function";
  } catch (e) {
    caps.nativeWeather = false;
  }
  ensureObjectives();
  try {
    worldDay = Number(world.getDynamicProperty("tc:day") || 1) || 1;
  } catch (e) {
    worldDay = 1;
  }
  weatherMod.initWeather(overworld);
  thirst.initThirstEvents();

  try {
    if (system.afterEvents && system.afterEvents.scriptEventReceive) {
      system.afterEvents.scriptEventReceive.subscribe(onScriptEvent);
    }
  } catch (e) {
    warnOnce("evt", "scriptEventReceive unavailable: " + e);
  }

  try {
    if (world.afterEvents && world.afterEvents.playerBreakBlock) {
      world.afterEvents.playerBreakBlock.subscribe(function (ev) {
        try {
          if (!ev.player) return;
          const st = ensureState(ev.player);
          thirst.onBlockBroken(st); // mining makes you thirsty
        } catch (e2) {}
      });
    }
  } catch (e) {
    warnOnce("evt", "playerBreakBlock unavailable: " + e);
  }

  ready = true;
  warnOnce("boot", "Real Survival v" + VERSION + " initialized. caps=" + JSON.stringify(caps));
}

system.run(function () {
  try {
    init();
  } catch (e) {
    warnOnce("init", "init failed: " + e);
    ready = true; // never lock the world out of the loop
  }
});

system.runInterval(function () {
  if (!ready) return;
  try {
    exploration.fastTick();
  } catch (e) {
    errOnce("fast", e);
  }
}, 4);

// ---------------- main loop (1 Hz per player) ----------------
function tickPlayer(p, ctx) {
  const st = ensureState(p);
  if (!st.welcomed) {
    welcome(p);
    st.welcomed = true;
    markDirty(st);
  }

  resetFx(st);

  const loc = p.location;
  st.scanAge++;
  const env = scanEnv(p, st);
  ctx.env = env;

  weight.computeLoad(p, st);
  ctx.armor = st.armorStats;
  ctx.biome = getBiomeSafe(p);
  ctx.weather = weatherMod.getWeather();
  ctx.y = loc.y;
  ctx.sprinting = p.isSprinting === true;
  try {
    ctx.inWater = p.isInWater === true;
  } catch (e) {
    ctx.inWater = false;
  }
  ctx.jumped = false;
  try {
    if (st.wasOnGround && p.isOnGround === false && !ctx.inWater) ctx.jumped = true;
    st.wasOnGround = p.isOnGround !== false;
  } catch (e) {
    st.wasOnGround = true;
  }

  camping.tickCamp(p, st, ctx);
  weight.tickWeight(p, st, ctx);
  temperature.tickTemp(p, st, ctx);
  thirst.tickThirst(p, st, ctx);
  exploration.tickExploration(p, st, ctx);
  challenges.tickChallenges(p, st, ctx);
  ambient.tickAmbient(p, st, ctx);

  // stamina: shared hunger intent from heavy gear (weight + sprinting)
  const hungerAmp = weight.staminaHungerAmp(st, ctx);
  if (hungerAmp >= 0) maxFx(st, "hunger", hungerAmp);

  applyFx(p, st);

  if (tick % 2 === 0) {
    syncScore(p, "tc_temp", st.temp);
    syncScore(p, "tc_thirst", st.thirst);
    syncScore(p, "tc_weight", st.load * 10);
    syncScore(p, "tc_wet", st.wet);
    syncScore(p, "tc_points", st.pts);
    syncScore(p, "tc_days", ctx.day);
    syncScore(p, "tc_camp", st.campLevel);
  }

  hud.hudTick(p, st, ctx);

  if (st.dirty && Date.now() - st.lastSave > 5000) saveState(p, st);
}

function mainTick() {
  tick++;
  const overworld = world.getDimension("overworld");

  let tod = -1;
  try {
    if (caps.getTimeOfDay && typeof overworld.getTimeOfDay === "function") tod = overworld.getTimeOfDay();
  } catch (e) {
    tod = -1;
  }
  if (tod < 0 || tod > 24000) tod = (tick * 20) % 24000;

  if (prevTod > tod) {
    worldDay++;
    try {
      world.setDynamicProperty("tc:day", worldDay);
    } catch (e) {}
  }
  prevTod = tod;

  weatherMod.tickWeather();

  const ctxBase = {
    tod: tod,
    night: tod >= 12500 && tod <= 23000,
    dayLight: tod <= 11500 ? Math.sin((Math.PI * tod) / 11500) : 0,
    day: worldDay,
  };

  let players = [];
  try {
    players = world.getAllPlayers();
  } catch (e) {
    players = [];
  }

  for (const p of players) {
    try {
      const ctx = Object.assign({}, ctxBase);
      tickPlayer(p, ctx);
    } catch (e) {
      errOnce("player:" + p.id, e);
    }
  }

  if (tick % 15 === 0) {
    try {
      animals.tickAnimals(players, ctxBase.night);
    } catch (e) {
      errOnce("animals", e);
    }
  }

  if (tick % 20 === 0) {
    try {
      exploration.ruinCheck(players, tick);
    } catch (e) {
      errOnce("ruin", e);
    }
  }
}

system.runInterval(function () {
  if (!ready) return;
  try {
    mainTick();
  } catch (e) {
    errOnce("main", e);
  }
}, 20);
