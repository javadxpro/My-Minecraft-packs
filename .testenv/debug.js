import { FakePlayer, pump, setTime, setBiome } from "@minecraft/server";
import "./scripts/main.js";
import { computeEffectiveTemp } from "./scripts/temperature.js";

const p = new FakePlayer("Dbg", 100.5, 70, 100.5);
setBiome("minecraft:plains");
setTime(6000);
pump();

// hand-build a ctx like main does
const ctx = {
  tod: 6000, night: false, dayLight: Math.sin(Math.PI*6000/11500), day: 1,
  weather: "clear",
  env: { campfireDist:-1, soulCampfire:false, torchNear:false, lavaDist:-1, magmaNear:false, furnaceNear:false, bedDist:-1, woodNear:0, snowGround:false, iceNear:false, sandGround:false, waterNear:false, skyExposed:true, handTorch:false },
  biome: { key:"plains", name:"Plains", temp:54, rare:false, hot:false, fog:false, salt:false },
  armor: { ins:10.4, breath:1.2, cond:0, absorb:0.8 },
  y: 70, sprinting:false, jumped:false, inWater:false, st: p._st || { wet:0 },
};
ctx.st = { wet: 0 };
console.log("eff =", computeEffectiveTemp(ctx));
