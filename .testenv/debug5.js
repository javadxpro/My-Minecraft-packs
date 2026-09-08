import { FakePlayer, pump, setTime, setBiome, fireScriptEvent } from "@minecraft/server";
import "./scripts/main.js";
import { allStates } from "./scripts/core.js";

setTime(6000); setBiome("minecraft:plains");
pump();
const alice = new FakePlayer("A", 100.5, 70, 100.5);
for (const [s, t] of [["Head","minecraft:leather_helmet"],["Chest","minecraft:leather_chestplate"],["Legs","minecraft:leather_leggings"],["Feet","minecraft:leather_boots"]]) alice.equip(s, t);
for (let i = 0; i < 5; i++) pump();
const st = allStates().get("p_A");
console.log("pre-snow: temp", st.temp.toFixed(1), "wet", st.wet.toFixed(1), "tempEff", st.tempEff.toFixed(1), "ins", st.armorStats.ins);

fireScriptEvent("truecraft:weather", "clear", alice);
fireScriptEvent("truecraft:cfg", "weatherManage off", alice);
setBiome("minecraft:snowy_plains"); setTime(18000);
alice.location = { x: alice.location.x + 30, y: alice.location.y, z: alice.location.z };
const realNow = Date.now; let shift = 0;
Date.now = function(){ return realNow() + shift; };
for (let i = 0; i < 70; i++) { pump(); shift += 6000; if (i % 20 === 19) console.log("pump", i+1, "temp", st.temp.toFixed(1), "eff", st.tempEff.toFixed(1), "wet", st.wet.toFixed(1), "scan.sky", st.scan.skyExposed, "snowGround", st.scan.snowGround, "waterNear", st.scan.waterNear, "weather check"); }
Date.now = realNow;
