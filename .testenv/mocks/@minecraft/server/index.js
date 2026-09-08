// Mock implementation of @minecraft/server for local smoke-testing.
// This lives OUTSIDE the behavior pack and is never shipped.
export class ItemStack {
  constructor(id, amount) {
    this.typeId = id;
    this.amount = amount || 1;
  }
}

export const EquipmentSlot = {
  Head: "Head",
  Chest: "Chest",
  Legs: "Legs",
  Feet: "Feet",
  Mainhand: "Mainhand",
  Offhand: "Offhand",
};

export const EntityDamageCause = { freeze: "freeze", magic: "magic", starve: "starve" };

export const effectsLog = [];
export const damageLog = [];
export const commandLog = [];
export const particleLog = [];
export const players = [];
export const dims = {};

let worldTime = 6000;
const worldProps = new Map();
const runs = [];
const intervals = [];
const subs = { scriptEventReceive: [], playerBreakBlock: [], itemCompleteUse: [] };

export function setTime(t) {
  worldTime = ((t % 24000) + 24000) % 24000;
}
export function getTime() {
  return worldTime;
}
export function setBiome(id) {
  dims.overworld.biomeId = id;
}
export function setSkyLight(v) {
  dims.overworld.sky = v;
}

class Objective {
  constructor(name) {
    this.id = name;
    this.scores = {};
  }
  setScore(p, v) {
    this.scores[p.id] = v;
  }
  getScore(p) {
    return this.scores[p.id] !== undefined ? this.scores[p.id] : 0;
  }
}

class Scoreboard {
  constructor() {
    this.objs = new Map();
  }
  addObjective(name, display) {
    if (this.objs.has(name)) throw new Error("objective exists: " + name);
    const o = new Objective(name);
    this.objs.set(name, o);
    return o;
  }
  getObjective(name) {
    if (!this.objs.has(name)) throw new Error("no objective " + name);
    return this.objs.get(name);
  }
}

export const scoreboard = new Scoreboard();

class Dim {
  constructor(id) {
    this.id = id;
    this.biomeId = "minecraft:plains";
    this.blocks = new Map();
    this.sky = 15;
  }
  key(x, y, z) {
    return Math.floor(x) + "," + Math.floor(y) + "," + Math.floor(z);
  }
  setBlockAt(x, y, z, id) {
    this.blocks.set(this.key(x, y, z), id);
  }
  getBlock(loc) {
    const id = this.blocks.get(this.key(loc.x, loc.y, loc.z));
    return id ? { typeId: id } : undefined;
  }
  getBiome() {
    return { id: this.biomeId };
  }
  getSkyLightLevel() {
    return this.sky;
  }
  isChunkLoaded() {
    return true;
  }
  getTimeOfDay() {
    return worldTime;
  }
  getEntities() {
    return [];
  }
  spawnParticle(name, loc) {
    particleLog.push({ name: name, loc: loc });
  }
  runCommand(c) {
    commandLog.push(c);
    return { successCount: 1 };
  }
  getWeather() {
    throw new Error("beta only");
  }
}

dims.overworld = new Dim("minecraft:overworld");
dims.nether = new Dim("minecraft:nether");
dims.nether.biomeId = "minecraft:hell";
dims["the_end"] = new Dim("minecraft:the_end");

export class FakePlayer {
  constructor(name, x, y, z) {
    this.id = "p_" + name;
    this.name = name;
    this.typeId = "minecraft:player";
    this.location = { x: x, y: y, z: z };
    this.dimension = dims.overworld;
    this.isSprinting = false;
    this.isSneaking = false;
    this.isInWater = false;
    this.isOnGround = true;
    this.health = 20;
    this._equip = { Head: null, Chest: null, Legs: null, Feet: null, Mainhand: null, Offhand: null };
    this._inv = new Array(36).fill(null);
    this.messages = [];
    this.actionbars = [];
    this._props = new Map();
    players.push(this);
  }
  equip(slot, typeId) {
    this._equip[slot] = typeId ? { typeId: typeId } : null;
  }
  give(slotIdx, id, amount) {
    this._inv[slotIdx] = new ItemStack(id, amount);
  }
  getComponent(kind) {
    if (kind === "health" || kind === "minecraft:health") {
      const h = this.health;
      return { currentValue: h, effectiveMax: 20, resetToMaxValue() {} };
    }
    if (kind === "equippable" || kind === "minecraft:equippable") {
      const e = this._equip;
      return { getEquipment: (s) => e[s] || null };
    }
    if (kind === "inventory" || kind === "minecraft:inventory") {
      const inv = this._inv;
      return {
        container: {
          size: () => 36,
          getItem: (i) => inv[i] || null,
          setItem: (i, it) => {
            inv[i] = it;
          },
        },
      };
    }
    return null;
  }
  getDynamicProperty(k) {
    return this._props.has(k) ? this._props.get(k) : undefined;
  }
  setDynamicProperty(k, v) {
    if (v === undefined) this._props.delete(k);
    else this._props.set(k, v);
  }
  sendMessage(m) {
    this.messages.push(m);
  }
  get onScreenDisplay() {
    const self = this;
    return {
      setActionBar(s) {
        self.actionbars.push(s);
      },
    };
  }
  addEffect(name, dur, opts) {
    effectsLog.push({ player: this.id, name: name, dur: dur, amp: opts && opts.amplifier !== undefined ? opts.amplifier : 0 });
  }
  applyDamage(n, opts) {
    this.health -= n;
    damageLog.push({ player: this.id, n: n, cause: opts && opts.cause ? opts.cause : "none" });
  }
  playSound() {}
  runCommand(c) {
    commandLog.push(c);
    return { successCount: 1 };
  }
}

export const world = {
  getAllPlayers: () => players,
  getDimension: (id) => {
    const k = String(id).replace("minecraft:", "");
    return dims[k] || dims.overworld;
  },
  getDynamicProperty: (k) => (worldProps.has(k) ? worldProps.get(k) : undefined),
  setDynamicProperty: (k, v) => {
    if (v === undefined) worldProps.delete(k);
    else worldProps.set(k, v);
  },
  scoreboard: scoreboard,
  afterEvents: {
    playerBreakBlock: {
      subscribe(fn) {
        subs.playerBreakBlock.push(fn);
      },
    },
    itemCompleteUse: {
      subscribe(fn) {
        subs.itemCompleteUse.push(fn);
      },
    },
  },
};

export const system = {
  currentTick: 0,
  run(fn) {
    runs.push(fn);
  },
  runInterval(fn, period) {
    intervals.push({ fn: fn, period: period });
    return intervals.length;
  },
  afterEvents: {
    scriptEventReceive: {
      subscribe(fn) {
        subs.scriptEventReceive.push(fn);
      },
    },
  },
};

export function fireScriptEvent(id, message, sourceEntity) {
  for (const f of subs.scriptEventReceive) f({ id: id, message: message, sourceEntity: sourceEntity });
}
export function fireItemCompleteUse(player, typeId) {
  for (const f of subs.itemCompleteUse) f({ itemStack: { typeId: typeId }, source: player });
}

/** Run one simulated "second": queued startups + one pass of every interval. */
export function pump() {
  while (runs.length) runs.shift()();
  for (const iv of intervals) iv.fn();
  system.currentTick++;
}

export function clearTransient() {
  effectsLog.length = 0;
  damageLog.length = 0;
}
