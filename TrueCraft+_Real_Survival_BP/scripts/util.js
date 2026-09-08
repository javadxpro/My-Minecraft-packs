// ============================================================
// TrueCraft+ Real Survival - shared utilities
// Small helpers used by every survival module.
// ============================================================

export function clamp(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function chance(p) {
  return Math.random() < p;
}

export function rndRange(min, max) {
  return min + Math.random() * (max - min);
}

export function rndInt(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

export function dist2D(ax, az, bx, bz) {
  const dx = ax - bx;
  const dz = az - bz;
  return Math.sqrt(dx * dx + dz * dz);
}

export function dist3D(ax, ay, az, bx, by, bz) {
  const dx = ax - bx;
  const dy = ay - by;
  const dz = az - bz;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

const loggedOnce = {};

/** Log a warning only once per key so the content log stays readable. */
export function warnOnce(key, msg) {
  if (loggedOnce[key]) return;
  loggedOnce[key] = true;
  try {
    console.warn("[TrueCraft+] " + msg);
  } catch (e) {
    /* ignore */
  }
}

let errCount = 0;

/** Log repeated runtime errors, but never spam the log. */
export function errOnce(key, e) {
  errCount++;
  if (errCount > 40) return;
  warnOnce("err:" + key, "module '" + key + "' error: " + e);
}

/**
 * Run a slash command on an entity or dimension. Never throws.
 * Works on both 1.x (runCommandAsync) and 2.x (runCommand) API surfaces.
 */
export function runCmd(target, command) {
  try {
    if (typeof target.runCommand === "function") {
      return target.runCommand(command);
    }
  } catch (e) {
    warnOnce("cmd:" + command.split(" ")[0], "command failed: " + command);
    return undefined;
  }
  try {
    if (typeof target.runCommandAsync === "function") {
      const r = target.runCommandAsync(command);
      if (r && typeof r.catch === "function") r.catch(function () {});
      return undefined;
    }
  } catch (e) {
    /* ignore */
  }
  return undefined;
}

/** Safely read a block; returns undefined when unloaded / out of bounds. */
export function getBlockSafe(dimension, x, y, z) {
  try {
    return dimension.getBlock({ x: x, y: y, z: z });
  } catch (e) {
    return undefined;
  }
}
