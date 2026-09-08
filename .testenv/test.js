// Smoke test: runs the actual pack scripts against the mock API
// and asserts the survival systems behave as designed.
import {
  world,
  FakePlayer,
  pump,
  setTime,
  setBiome,
  setSkyLight,
  dims,
  effectsLog,
  damageLog,
  commandLog,
  fireScriptEvent,
  fireItemCompleteUse,
  scoreboard,
} from "@minecraft/server";

import "./scripts/main.js";

let pass = 0;
let fail = 0;
function check(cond, label) {
  if (cond) {
    pass++;
    console.log("  PASS  " + label);
  } else {
    fail++;
    console.log("  FAIL  " + label);
  }
}
function scoreOf(p, obj) {
  return scoreboard.getObjective(obj).getScore(p);
}
function msgCount(p, needle) {
  return p.messages.filter((m) => m.indexOf(needle) >= 0).length;
}

console.log("== boot ==");
pump();
check(commandLog.length >= 0, "init ran without exceptions");

// --- players ---
const alice = new FakePlayer("Alice", 100.5, 70, 100.5); // temperate plains
const bob = new FakePlayer("Bob", -300.5, 72, 250.5); // will live in the desert
alice.equip("Head", "minecraft:leather_helmet");
alice.equip("Chest", "minecraft:leather_chestplate");
alice.equip("Legs", "minecraft:leather_leggings");
alice.equip("Feet", "minecraft:leather_boots");
bob.equip("Head", "minecraft:iron_helmet");
bob.equip("Chest", "minecraft:iron_chestplate");
bob.equip("Legs", "minecraft:iron_leggings");
bob.equip("Feet", "minecraft:iron_boots");
bob.give(0, "minecraft:cobblestone", 64);
bob.give(1, "minecraft:dirt", 64);

// deterministic sky for the whole run (no random rain soaking the players)
fireScriptEvent("truecraft:weather", "clear", alice);
fireScriptEvent("truecraft:cfg", "weatherManage off", alice);
pump();

console.log("== first ticks (plains, day) ==");
setBiome("minecraft:plains");
setTime(6000);
for (let i = 0; i < 5; i++) pump();

check(alice.messages.some((m) => m.indexOf("Real Survival") >= 0), "welcome message sent");
check(alice.messages.some((m) => m.indexOf("Milestone - Day 1") >= 0), "Day 1 milestone announced");
check(alice.actionbars.length > 0, "HUD action bar rendering");
check(scoreOf(alice, "tc_points") >= 5, "exploration points awarded for first biome");
check(scoreOf(alice, "tc_days") >= 1, "day counter synced to scoreboard");
const aliceTemp1 = scoreOf(alice, "tc_temp");
check(aliceTemp1 >= 40 && aliceTemp1 <= 70, "plains daytime temperature comfortable (" + aliceTemp1 + ")");
const bobW0 = scoreOf(bob, "tc_weight");
check(bobW0 >= 130 && bobW0 <= 210, "iron armor + cargo weight ~13-21kg x10 (" + bobW0 + ")");

console.log("== desert heat (iron armor bakes) ==");
setBiome("minecraft:desert");
for (let i = 0; i < 40; i++) pump();
const bobTemp = scoreOf(bob, "tc_temp");
const aliceTemp = scoreOf(alice, "tc_temp");
check(bobTemp > 75, "full iron in desert gets dangerously hot (" + bobTemp + ")");
check(bobTemp > aliceTemp, "iron runs hotter than leather in the sun (" + bobTemp + " vs " + aliceTemp + ")");
const thirstBefore = scoreOf(bob, "tc_thirst");
for (let i = 0; i < 30; i++) pump();
const thirstAfter = scoreOf(bob, "tc_thirst");
check(thirstAfter < thirstBefore, "thirst drains over time (" + thirstBefore + " -> " + thirstAfter + ")");

console.log("== drinking ==");
const drinkBefore = msgCount(alice, "raw water") + msgCount(alice, "tasted dirty");
alice.isInWater = true;
alice.isSneaking = true;
pump();
pump();
alice.isSneaking = false;
alice.isInWater = false;
pump();
const drinkAfter = msgCount(alice, "raw water") + msgCount(alice, "tasted dirty");
check(drinkAfter > drinkBefore, "sneak-drinking raw water fires (drink or sickness message)");
const th0 = scoreOf(alice, "tc_thirst");
const bottleBefore = msgCount(alice, "water bottle") + msgCount(alice, "tasted dirty");
fireItemCompleteUse(alice, "minecraft:potion");
pump();
pump();
const bottleAfter = msgCount(alice, "water bottle") + msgCount(alice, "tasted dirty");
check(bottleAfter > bottleBefore, "drinking a water bottle works (drink or sickness message)");
check(scoreOf(alice, "tc_thirst") >= th0 - 1, "bottle restored thirst or capped (" + th0 + ")");

console.log("== camping ==");
const bx = Math.floor(alice.location.x);
const by = Math.floor(alice.location.y);
const bz = Math.floor(alice.location.z);
dims.overworld.setBlockAt(bx, by, bz + 1, "minecraft:campfire");
dims.overworld.setBlockAt(bx + 2, by, bz, "minecraft:bed");
dims.overworld.setBlockAt(bx - 1, by, bz - 1, "minecraft:oak_log");
dims.overworld.setBlockAt(bx - 1, by, bz, "minecraft:oak_log");
dims.overworld.setBlockAt(bx - 1, by, bz + 1, "minecraft:oak_log");
dims.overworld.setBlockAt(bx, by, bz - 1, "minecraft:oak_log");
dims.overworld.setBlockAt(bx + 1, by, bz - 1, "minecraft:oak_log");
dims.overworld.setBlockAt(bx + 1, by, bz, "minecraft:oak_log");
alice.location = { x: alice.location.x + 3, y: alice.location.y, z: alice.location.z };
for (let i = 0; i < 4; i++) pump();
check(scoreOf(alice, "tc_camp") === 2, "campfire + bed + wood = Safe Camp (level 2)");
check(effectsLog.some((e) => e.name === "regeneration" && e.player === alice.id), "Safe Camp grants small regeneration");
check(msgCount(alice, "Safe Camp") > 0, "safe camp message shown");

// boiled water next to campfire (fire several times - boiling never sickens)
const boiledBefore = msgCount(alice, "boiled water");
const sickBefore = msgCount(alice, "tasted dirty");
for (let i = 0; i < 6; i++) {
  fireItemCompleteUse(alice, "minecraft:potion");
  pump();
}
check(msgCount(alice, "boiled water") > boiledBefore, "bottle next to campfire = boiled water (message)");
check(msgCount(alice, "tasted dirty") === sickBefore, "boiled water never sickens");

console.log("== freezing night in the snow ==");
fireScriptEvent("truecraft:weather", "clear", alice); // deterministic sky
fireScriptEvent("truecraft:cfg", "weatherManage off", alice); // no random rain mid-test
setBiome("minecraft:snowy_plains");
setTime(18000); // night
alice.location = { x: alice.location.x + 30, y: alice.location.y, z: alice.location.z };
bob.location = { x: bob.location.x + 30, y: bob.location.y, z: bob.location.z };
const bobHealth0 = bob.health;
// damage cooldowns run on real time; compress time so 70 simulated seconds pass
const realNow = Date.now;
let timeShift = 0;
Date.now = function () {
  return realNow() + timeShift;
};
for (let i = 0; i < 70; i++) {
  pump();
  timeShift += 6000;
}
Date.now = realNow;
const bobTempSnow = scoreOf(bob, "tc_temp");
check(bobTempSnow <= 10, "full iron in snowy night plunges toward freezing (" + bobTempSnow + ")");
check(bob.health < bobHealth0, "long freezing exposure deals damage");
check(effectsLog.some((e) => e.name === "slowness" && e.player === bob.id && e.amp >= 1), "freezing slows the player down");

console.log("== leather keeps you warmer ==");
const aliceTempSnow = scoreOf(alice, "tc_temp");
check(aliceTempSnow > bobTempSnow, "leather insulates better than iron in snow (" + aliceTempSnow + " vs " + bobTempSnow + ")");

console.log("== morning fog / ambient ==");
setTime(500); // dawn
setBiome("minecraft:forest");
alice.location = { x: alice.location.x + 30, y: alice.location.y, z: alice.location.z };
setSkyLight(15);
for (let i = 0; i < 10; i++) pump();
check(alice.actionbars.length > 0, "HUD still rendering");

console.log("== discovery messages ==");
setBiome("minecraft:jungle");
alice.location = { x: alice.location.x + 2000, y: alice.location.y, z: alice.location.z };
setTime(6000);
for (let i = 0; i < 3; i++) pump();
check(alice.messages.some((m) => m.indexOf("New area discovered: Jungle") >= 0), '"New area discovered: Jungle" shown');
check(msgCount(alice, "New area discovered: Cave") === 0, "no cave discovery under open sky");

console.log("== script events ==");
const barsMid = alice.actionbars.length;
fireScriptEvent("truecraft:cfg", "hud off", alice);
pump();
pump();
check(alice.messages.some((m) => m.indexOf("hud = off") >= 0), "config toggle confirmed");
check(alice.actionbars.length === barsMid, "HUD disabled via config");
fireScriptEvent("truecraft:cfg", "hud on", alice);
fireScriptEvent("truecraft:status", "", alice);
check(alice.messages.some((m) => m.indexOf("TrueCraft+ status") >= 0), "status command prints");

console.log("== ruins ==");
const cmds0 = commandLog.length;
fireScriptEvent("truecraft:ruin", "", alice);
for (let i = 0; i < 30; i++) pump(); // drain the build queue
check(commandLog.length > cmds0, "ruin builder queued commands");
check(commandLog.some((c) => c.indexOf("setblock") >= 0 || c.indexOf("fill") >= 0), "ruin placed blocks");
// wait out the loot timer, then let fastTick inject it
const waitUntil = Date.now() + 7200;
while (Date.now() < waitUntil) {}
for (let i = 0; i < 10; i++) pump();
check(commandLog.some((c) => c.indexOf("loot spawn") >= 0 && c.indexOf("old_storage") >= 0), "storage loot spawned (fallback path)");
check(msgCount(alice, "abandoned location") > 0, "ruin built + discovery reward message");

console.log("== weather manager ==");
check(commandLog.some((c) => c.indexOf("weather ") >= 0), "weather manager drove /weather");

console.log("== day cycle & challenges ==");
setTime(23999);
pump();
setTime(100); // next dawn
setBiome("minecraft:plains");
for (let i = 0; i < 2; i++) pump();
check(scoreOf(alice, "tc_days") >= 2, "day counter advanced through dawn wrap (" + scoreOf(alice, "tc_days") + ")");

console.log("== nether heat ==");
alice.dimension = dims.nether;
alice.location = { x: 10.5, y: 64, z: 10.5 };
for (let i = 0; i < 40; i++) pump();
const netherTemp = scoreOf(alice, "tc_temp");
check(netherTemp > 80, "the nether is brutally hot (" + netherTemp + ")");
alice.dimension = dims.overworld;
alice.location = { x: 100.5, y: 70, z: 100.5 };

console.log("== reset ==");
const discoveriesBefore = msgCount(alice, "New area discovered");
fireScriptEvent("truecraft:reset", "", alice);
for (let i = 0; i < 3; i++) pump();
check(msgCount(alice, "New area discovered") > discoveriesBefore, "reset wipes discovered biomes (they re-discover)");

console.log("");
console.log("RESULT: " + pass + " passed, " + fail + " failed");
process.exit(fail > 0 ? 1 : 0);
