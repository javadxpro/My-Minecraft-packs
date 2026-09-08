import { FakePlayer, pump, setTime, setBiome, dims, fireItemCompleteUse } from "@minecraft/server";
import "./scripts/main.js";
import { allStates } from "./scripts/core.js";
import { THIRST } from "./scripts/config.js";

setTime(6000); setBiome("minecraft:plains");
pump();
const alice = new FakePlayer("A", 100.5, 70, 100.5);
for (let i = 0; i < 5; i++) pump();
const st = allStates().get("p_A");

// build camp exactly like test.js
const bx = Math.floor(alice.location.x), by = Math.floor(alice.location.y), bz = Math.floor(alice.location.z);
dims.overworld.setBlockAt(bx, by, bz + 1, "minecraft:campfire");
dims.overworld.setBlockAt(bx + 2, by, bz, "minecraft:bed");
for (const [dx, dz] of [[-1,-1],[-1,0],[-1,1],[0,-1],[1,-1],[1,0]]) dims.overworld.setBlockAt(bx+dx, by, bz+dz, "minecraft:oak_log");
alice.location = { x: alice.location.x + 3, y: alice.location.y, z: alice.location.z };
for (let i = 0; i < 4; i++) pump();

console.log("campLevel:", st.campLevel, "campfireDist:", st.scan.campfireDist, "boilRadius:", THIRST.boilRadius);
console.log("near would be:", st.scan && st.scan.campfireDist >= 0 && st.scan.campfireDist <= THIRST.boilRadius);
const m0 = alice.messages.length;
fireItemCompleteUse(alice, "minecraft:potion");
console.log("msgs:", JSON.stringify(alice.messages.slice(m0)));
