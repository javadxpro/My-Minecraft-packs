import { FakePlayer, pump, setTime, setBiome } from "@minecraft/server";
import "./scripts/main.js";
import { allStates } from "./scripts/core.js";
import { computeEffectiveTemp } from "./scripts/temperature.js";

const p = new FakePlayer("Dbg", 100.5, 70, 100.5);
p.equip("Head", "minecraft:leather_helmet");
p.equip("Chest", "minecraft:leather_chestplate");
setBiome("minecraft:plains");
setTime(6000);
for (let i=0;i<3;i++) pump();
const st = allStates().get("p_Dbg");
console.log("temp:", st.temp, "tempEff:", st.tempEff, "wet:", st.wet, "campLevel:", st.campLevel, "load:", st.load);
console.log("armorStats:", JSON.stringify(st.armorStats));
console.log("scan:", JSON.stringify(st.scan));
