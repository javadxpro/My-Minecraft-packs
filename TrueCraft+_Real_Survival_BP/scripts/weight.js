// ============================================================
// TrueCraft+ Real Survival - weight system
// Every armor piece has a weight value; cargo adds up too.
//   Leather: 1/3/2/1 (7 kg)      Iron: 2/5/4/2 (13 kg)
//   Chain:   1/4/3/1 (9 kg)      Gold: 1/3/2/1 (7 kg)
//   Diamond: 3/6/5/2 (16 kg)     Netherite: 3/7/5/3 (18 kg)
// Heavy equipment: slower movement, higher stamina (hunger) and
// thirst consumption, harder exploration.
// ============================================================

import { ARMOR, CFG, WEIGHT } from "./config.js";
import { getEquippable, getInventory, maxFx, warn, syncScore, markDirty } from "./core.js";

function armorOf(typeId) {
  return ARMOR[typeId];
}

/**
 * Compute the player's carried weight and clothing statistics.
 * Stores results on the state object for the other systems:
 *   st.load        total kg (armor + cargo)
 *   st.armorStats  summed ins / breath / cond / absorb
 *   st.loadMult    thirst multiplier from weight
 *   st.staminaMult hunger multiplier from armor weight
 */
export function computeLoad(p, st) {
  const stats = { ins: 0, breath: 0, cond: 0, absorb: 0 };
  let armorKg = 0;

  try {
    const eq = getEquippable(p);
    if (eq && typeof eq.getEquipment === "function") {
      const slots = ["Head", "Chest", "Legs", "Feet"];
      for (const s of slots) {
        let item = null;
        try {
          item = eq.getEquipment(s);
        } catch (e) {
          item = null;
        }
        if (!item) continue;
        const a = armorOf(item.typeId);
        if (a) {
          armorKg += a.w;
          stats.ins += a.ins;
          stats.breath += a.breath;
          stats.cond += a.cond;
          stats.absorb += a.absorb;
        }
      }
    }
  } catch (e) {
    /* equippable unavailable - weight falls back to cargo only */
  }

  let cargoKg = 0;
  try {
    const inv = getInventory(p);
    if (inv && inv.container) {
      const size = inv.container.size();
      let counted = 0;
      for (let i = 0; i < size; i++) {
        let item = null;
        try {
          item = inv.container.getItem(i);
        } catch (e) {
          item = null;
        }
        if (item && item.amount) {
          cargoKg += item.amount * WEIGHT.cargoKgPerItem;
          counted += item.amount;
        }
        if (cargoKg >= WEIGHT.cargoCap) {
          cargoKg = WEIGHT.cargoCap;
          break;
        }
      }
    }
  } catch (e) {
    /* ignore */
  }

  st.load = armorKg + cargoKg;
  st.armorStats = stats;
  st.loadMult = 1 + st.load * WEIGHT.thirstMultPerKg;
  st.staminaMult = 1 + armorKg * WEIGHT.staminaMultPerArmorKg;
  return st;
}

export function tickWeight(p, st, ctx) {
  if (!CFG.weight) {
    st.load = 0;
    st.loadMult = 1;
    st.staminaMult = 1;
    return;
  }
  const kg = st.load;
  const W = WEIGHT;

  if (kg >= W.slow3) {
    maxFx(st, "slow", 2); // overloaded
    maxFx(st, "hunger", 0);
    warn(p, st, "heavy3", 90, "§cYou are overloaded! Drop some weight to move.");
  } else if (kg >= W.slow2) {
    maxFx(st, "slow", 1);
    maxFx(st, "hunger", 0);
    warn(p, st, "heavy2", 120, "§6Your pack is very heavy. Travel gets exhausting.");
  } else if (kg >= W.slow1) {
    maxFx(st, "slow", 0);
    warn(p, st, "heavy1", 150, "§7You feel weighed down by your gear.");
  }

  // stamina: heavy armor burns food faster (applied via st.staminaMult in main)
  if (Math.random() < 0.02) syncScore(p, "tc_weight", st.load * 10); // stored x10 (0.1 kg steps)

  markDirty(st);
}

/**
 * Hunger exhaustion amplifier from combined cold + weight stamina drain.
 * Called by main so temperature and weight share one "hunger" intent.
 */
export function staminaHungerAmp(st, ctx) {
  let amp = -1;
  if (st.load >= WEIGHT.slow2) amp = 0;
  if (st.load >= WEIGHT.slow3) amp = 0;
  if (ctx.sprinting && st.load >= WEIGHT.slow1) amp = 0;
  return amp;
}
