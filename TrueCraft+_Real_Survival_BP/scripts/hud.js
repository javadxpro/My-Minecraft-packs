// ============================================================
// TrueCraft+ Real Survival - HUD
// One quiet action bar line per second: temperature, thirst,
// carried weight, exploration points, day count, plus Wet/Camp
// flags. Uses text only - no resource pack needed.
// ============================================================

import { CFG } from "./config.js";

export function hudTick(p, st, ctx) {
  if (!CFG.hud) return;
  const t = Math.round(st.temp);
  const th = Math.round(st.thirst);
  const kg = Math.round(st.load * 10) / 10;

  const tCol = t < 15 ? "§b" : t < 35 ? "§3" : t <= 65 ? "§a" : t <= 85 ? "§6" : "§c";
  const thCol = th < 15 ? "§c" : th < 35 ? "§6" : "§9";
  const wCol = kg >= 22 ? "§c" : kg >= 16 ? "§6" : "§7";

  let s = tCol + "Temp " + t + "° §8| " + thCol + "Thirst " + th + "% §8| " + wCol + kg + "kg §8| §a" + Math.round(st.pts) + " pts §8| §fDay " + ctx.day;
  if (st.wet > 25) s += " §9Wet";
  if (st.campLevel === 2) s += " §aCamp";

  try {
    p.onScreenDisplay.setActionBar(s);
  } catch (e) {
    /* HUD unavailable - ignore */
  }
}
