import { FakePlayer, pump, setTime, setBiome, dims, fireScriptEvent, fireItemCompleteUse, commandLog } from "@minecraft/server";
import "./scripts/main.js";
import { allStates } from "./scripts/core.js";

setTime(6000);
setBiome("minecraft:plains");
pump();
const alice = new FakePlayer("A", 100.5, 70, 100.5);
for (let i = 0; i < 6; i++) pump();
const st = allStates().get("p_A");
console.log("A) before drink: thirst=", st.thirst.toFixed(2), "drinkAt=", st.drinkAt, "sneak/water set...");
alice.isInWater = true; alice.isSneaking = true;
pump();
console.log("B) after 1 pump: thirst=", st.thirst.toFixed(2), "drinkAt=", st.drinkAt, "msgs=", JSON.stringify(alice.messages.slice(-2)));
alice.isInWater = false; alice.isSneaking = false;

// boiled water path
dims.overworld.setBlockAt(101, 70, 102, "minecraft:campfire");
alice.location = { x: alice.location.x + 3, y: alice.location.y, z: alice.location.z };
for (let i = 0; i < 4; i++) pump();
console.log("C) scan.campfireDist=", st.scan && st.scan.campfireDist);
const b0 = alice.messages.length;
fireItemCompleteUse(alice, "minecraft:potion");
console.log("D) boiled msgs:", JSON.stringify(alice.messages.slice(b0)));

// ruins
const c0 = commandLog.length;
const ok = fireScriptEvent("truecraft:ruin", "", alice);
pump();
console.log("E) ruin cmds added:", commandLog.length - c0);
const stProps = [];
for (const [k, v] of alice._props) stProps.push(k + "=" + JSON.stringify(v));
console.log("F) player props:", stProps.join(" "));
fireScriptEvent("truecraft:reset", "", alice);
console.log("G) after reset pts prop:", JSON.stringify(alice.getDynamicProperty("tc:pts")));
