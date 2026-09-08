// ============================================================
// TrueCraft+ Real Survival - weather manager
// Bedrock has no stable script API to READ weather (getWeather is
// still beta), so TrueCraft+ drives realistic weather cycles itself:
// long calm periods, occasional rain fronts, rare thunderstorms.
// The chosen state is stored in world dynamic properties, survives
// restarts, and feeds the temperature system (rain chills, deserts
// bake under clear skies, snowfall in cold biomes).
// If a future engine exposes a stable weather query, it is used
// automatically instead of managing weather.
// ============================================================

import { world } from "@minecraft/server";
import { runCmd, rndRange, chance, warnOnce } from "./util.js";
import { CFG } from "./config.js";
import { caps } from "./core.js";

let state = "clear";
let untilTs = 0;
let dim = null;

function apply(s, seconds) {
  state = s;
  untilTs = Date.now() + seconds * 1000;
  try {
    world.setDynamicProperty("tc:weather", s);
    world.setDynamicProperty("tc:weatherUntil", untilTs);
  } catch (e) {}
  if (dim) runCmd(dim, "weather " + (s === "clear" ? "clear" : s) + " " + Math.max(1, Math.round(seconds)));
}

export function initWeather(overworld) {
  dim = overworld;
  try {
    state = String(world.getDynamicProperty("tc:weather") || "clear");
  } catch (e) {
    state = "clear";
  }
  try {
    untilTs = Number(world.getDynamicProperty("tc:weatherUntil") || 0);
  } catch (e) {
    untilTs = 0;
  }
  if (CFG.weatherManage && state !== "clear") {
    // re-assert the stored weather for a short while after (re)load
    apply(state, 180);
  }
}

export function tickWeather() {
  // future-proofing: prefer a native stable read if the engine has one
  if (caps.nativeWeather && dim && typeof dim.getWeather === "function") {
    try {
      const w = String(dim.getWeather());
      state = w.indexOf("thunder") >= 0 ? "thunder" : w.indexOf("rain") >= 0 ? "rain" : "clear";
      return;
    } catch (e) {
      /* fall through to manager */
    }
  }
  if (!CFG.weatherManage || !dim) return;
  if (Date.now() < untilTs) return;
  if (state === "clear") {
    if (chance(0.3)) {
      const storm = chance(0.18);
      apply(storm ? "thunder" : "rain", Math.round(rndRange(storm ? 90 : 150, storm ? 180 : 420)));
    } else {
      apply("clear", Math.round(rndRange(360, 1200)));
    }
  } else {
    apply("clear", Math.round(rndRange(360, 1200)));
  }
}

export function getWeather() {
  return state;
}

/** Manual override, e.g. /scriptevent truecraft:weather rain */
export function forceWeather(s) {
  if (s !== "clear" && s !== "rain" && s !== "thunder") return false;
  apply(s, 300);
  return true;
}
