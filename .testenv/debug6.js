import { FakePlayer, pump, setTime, setBiome, fireScriptEvent, fireItemCompleteUse, dims } from "@minecraft/server";
import "./scripts/main.js";
import { allStates } from "./scripts/core.js";

setTime(6000); setBiome("minecraft:plains");
pump();
const alice = new FakePlayer("Alice", 100.5, 70, 100.5);
for (const [s, t] of [["Head","minecraft:leather_helmet"],["Chest","minecraft:leather_chestplate"],["Legs","minecraft:leather_leggings"],["Feet","minecraft:leather_boots"]]) alice.equip(s, t);
for (let i = 0; i < 5; i++) pump();
const st = allStates().get("p_Alice");
const show = (tag) => console.log(tag, "temp", st.temp.toFixed(1), "eff", st.tempEff.toFixed(1), "wet", st.wet.toFixed(1), "camp", st.campLevel);

// desert phase
setBiome("minecraft:desert");
for (let i = 0; i < 70; i++) pump();
show("after-desert:");

// drinking phase (in water!)
alice.isInWater = true; alice.isSneaking = true;
pump(); pump();
alice.isSneaking = false; alice.isInWater = false;
pump();
show("after-drink:");

// camping phase
const bx = Math.floor(alice.location.x), by = Math.floor(alice.location.y), bz = Math.floor(alice.location.z);
dims.overworld.setBlockAt(bx, by, bz + 1, "minecraft:campfire");
dims.overworld.setBlockAt(bx + 2, by, bz, "minecraft:bed");
alice.location = { x: alice.location.x + 3, y: alice.location.y, z: alice.location.z };
for (let i = 0; i < 4; i++) pump();
show("after-camp:");
for (let i = 0; i < 6; i++) { fireItemCompleteUse(alice, "minecraft:potion"); pump(); }
show("after-boiled:");

// freezing phase exactly like test.js
fireScriptEvent("truecraft:weather", "clear", alice);
fireScriptEvent("truecraft:cfg", "weatherManage off", alice);
setBiome("minecraft:snowy_plains"); setTime(18000);
alice.location = { x: alice.location.x + 30, y: alice.location.y, z: alice.location.z };
const realNow = Date.now; let shift = 0;
Date.now = function(){ return realNow() + shift; };
for (let i = 0; i < 70; i++) { pump(); shift += 6000; if (i % 15 === 14) show("  snow-pump" + (i+1) + ":"); }
Date.now = realNow;
show("final:");
