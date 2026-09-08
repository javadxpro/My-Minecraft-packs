// ============================================================
// TrueCraft+ Real Survival - realistic survival challenges
// Day 1   - Build a shelter
// Day 5   - Create a food source
// Day 10  - Prepare equipment
// Day 30  - Build a permanent home
// Day 100 - Create a complete survival base
// Each milestone is announced once per player and rewards
// exploration points.
// ============================================================

import { CFG, MILESTONES } from "./config.js";
import { say, addPoints, syncScore, markDirty } from "./core.js";

export function tickChallenges(p, st, ctx) {
  if (!CFG.challenges) return;
  if (st.lastDay === ctx.day) return;
  st.lastDay = ctx.day;
  markDirty(st);

  for (const m of MILESTONES) {
    if (ctx.day >= m.day && !(st.chal & m.key)) {
      st.chal |= m.key;
      say(p, "§6Milestone - Day " + m.day + ": " + m.title + " §7- " + m.hint);
      addPoints(p, st, m.pts, "milestone reached");
    }
  }

  if (ctx.day > 1 && ctx.day <= 4) {
    say(p, "§eDay " + ctx.day + " §7begins. The camp is quiet.");
  }

  syncScore(p, "tc_days", ctx.day);
}
