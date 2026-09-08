// ============================================================
// TrueCraft+ Real Survival - tuning tables & game data
// Every number a designer may want to touch lives in this file.
// ============================================================

export const VERSION = "1.0.0";

/** Runtime toggles - changed with /scriptevent truecraft:cfg <key> <on|off> */
export const CFG = {
  temp: true, // realistic body temperature
  thirst: true, // hydration
  weight: true, // equipment weight / encumbrance
  camping: true, // safe camp detection & effects
  weatherManage: true, // let TrueCraft+ drive natural weather cycles
  ruins: true, // abandoned camps, ruins, storage boxes
  animals: true, // natural animal behavior tweaks
  ambient: true, // fog / wind / ember particles
  challenges: true, // milestone progression announcements
  hud: true, // action bar status display
  hardMode: false, // faster drains, harsher survival
};

// ------------------------------------------------------------
// TEMPERATURE SYSTEM (body temperature 0..100, 50 = comfortable)
// Freezing 0-15 | Cold 15-35 | Comfortable 35-65 | Hot 65-85 | Heat exhaustion 85-100
// ------------------------------------------------------------
export const TEMP = {
  rate: 0.1, // fraction per second the body moves toward effective temperature
  campRateMult: 2.2, // recovering near a camp feels twice as fast
  waterRateMult: 1.8, // cold water pulls your temperature faster
  wetChill: 12, // being soaked removes this much effective warmth
  undergroundBlend: 0.6, // caves pull temperature toward the cave base value
  caveTemp: 45,
  nightChill: 10,
  dayHeatPlains: 2,
  dayHeatHot: 5,
  damageBelow: 12, // freezing damage starts here
  damageBelowHard: 4, // faster damage deep-freeze
  heatDamageAbove: 93,
};

// ------------------------------------------------------------
// BIOME CLIMATE TABLE (substring match, first match wins, ordered specific -> generic)
// temp = base body-stress temperature on the 0..100 scale
// rare = exploration bonus biome, fog = morning fog flavor biomes
// ------------------------------------------------------------
export const BIOME_TABLE = [
  // cold family first (specific before generic)
  ["ice_spikes", "ice_spikes"],
  ["frozen_peaks", "frozen_peaks"],
  ["jagged_peaks", "jagged_peaks"],
  ["snowy_slopes", "snowy_slopes"],
  ["grove", "grove"],
  ["snowy", "snowy"],
  ["frozen", "frozen"],
  ["ice", "snowy"], // legacy ice_plains / ice_mountains
  ["deep_dark", "deep_dark"],
  ["dripstone", "dripstone"],
  ["lush", "lush"],
  ["mangrove", "mangrove"],
  ["swamp", "swamp"],
  ["badlands", "badlands"],
  ["mesa", "badlands"], // legacy
  ["desert", "desert"],
  ["savanna", "savanna"],
  ["jungle", "jungle"],
  ["bamboo", "jungle"],
  ["stony_shore", "stony_shore"],
  ["stony_peaks", "stony_peaks"],
  ["meadow", "meadow"],
  ["cherry", "cherry"],
  ["flower_forest", "flower_forest"],
  ["birch", "birch"],
  ["dark_forest", "dark_forest"],
  ["old_growth", "old_growth"],
  ["giant_tree", "old_growth"], // legacy
  ["redwood", "old_growth"], // legacy
  ["taiga", "taiga"],
  ["windswept", "windswept"],
  ["extreme_hills", "windswept"], // legacy
  ["mountains", "windswept"],
  ["mushroom", "mushroom"],
  ["warm_ocean", "warm_ocean"],
  ["lukewarm_ocean", "ocean"],
  ["cold_ocean", "cold_ocean"],
  ["ocean", "ocean"],
  ["river", "river"],
  ["beach", "beach"],
  ["sunflower", "plains"],
  ["plains", "plains"],
  ["forest", "forest"],
  // nether & end
  ["crimson", "crimson"],
  ["warped", "warped"],
  ["soul_sand", "soul_sand"],
  ["basalt", "basalt"],
  ["nether_wastes", "nether"],
  ["hell", "nether"], // legacy nether id
  ["the_end", "end"],
  ["end", "end"],
];

export const BIOME_INFO = {
  ice_spikes: { name: "Ice Spikes", temp: 6, rare: true },
  frozen_peaks: { name: "Frozen Peaks", temp: 6 },
  jagged_peaks: { name: "Jagged Peaks", temp: 6, rare: true },
  snowy_slopes: { name: "Snowy Slopes", temp: 14 },
  grove: { name: "Grove", temp: 20, fog: true },
  snowy: { name: "Snowy Plains", temp: 14 },
  frozen: { name: "Frozen Wastes", temp: 10 },
  deep_dark: { name: "Deep Dark", temp: 32, rare: true },
  dripstone: { name: "Dripstone Caves", temp: 55 },
  lush: { name: "Lush Caves", temp: 60 },
  mangrove: { name: "Mangrove Swamp", temp: 64, fog: true },
  swamp: { name: "Swamp", temp: 58, fog: true },
  badlands: { name: "Badlands", temp: 76 },
  desert: { name: "Desert", temp: 80, hot: true },
  savanna: { name: "Savanna", temp: 72, hot: true },
  jungle: { name: "Jungle", temp: 70, hot: true },
  stony_shore: { name: "Stony Shore", temp: 42 },
  stony_peaks: { name: "Stony Peaks", temp: 40 },
  meadow: { name: "Meadow", temp: 46 },
  cherry: { name: "Cherry Grove", temp: 50, rare: true },
  flower_forest: { name: "Flower Forest", temp: 52 },
  birch: { name: "Birch Forest", temp: 52 },
  dark_forest: { name: "Dark Forest", temp: 50, fog: true },
  old_growth: { name: "Old-Growth Taiga", temp: 40 },
  taiga: { name: "Taiga", temp: 38 },
  windswept: { name: "Windswept Hills", temp: 32, fog: true },
  mushroom: { name: "Mushroom Fields", temp: 55, rare: true },
  warm_ocean: { name: "Warm Ocean", temp: 58, salt: true },
  ocean: { name: "Ocean", temp: 40, salt: true },
  cold_ocean: { name: "Cold Ocean", temp: 30, salt: true },
  river: { name: "River", temp: 46, fog: true },
  beach: { name: "Beach", temp: 58 },
  plains: { name: "Plains", temp: 54 },
  forest: { name: "Forest", temp: 52, fog: true },
  crimson: { name: "Crimson Forest", temp: 90, hot: true },
  warped: { name: "Warped Forest", temp: 85, hot: true },
  soul_sand: { name: "Soul Sand Valley", temp: 88, hot: true },
  basalt: { name: "Basalt Deltas", temp: 94, hot: true },
  nether: { name: "Nether Wastes", temp: 92, hot: true },
  end: { name: "The End", temp: 22 },
  cave: { name: "Cave", temp: 45, rare: false },
  wilds: { name: "Wilderness", temp: 52 },
};

// ------------------------------------------------------------
// CLOTHING REALISM - every armor piece has weight, insulation
// (warmth in the cold), breathability (relief in the heat),
// conductivity (metal transfers extremes) and sun absorption.
// Weights follow the pack design: Leather 1/3/2/1, Iron 2/5/4/2.
// ------------------------------------------------------------
export const ARMOR = {
  "minecraft:leather_helmet": { mat: "leather", w: 1, ins: 2.6, breath: 0.3, cond: 0, absorb: 0.2 },
  "minecraft:leather_chestplate": { mat: "leather", w: 3, ins: 2.6, breath: 0.3, cond: 0, absorb: 0.2 },
  "minecraft:leather_leggings": { mat: "leather", w: 2, ins: 2.6, breath: 0.3, cond: 0, absorb: 0.2 },
  "minecraft:leather_boots": { mat: "leather", w: 1, ins: 2.6, breath: 0.3, cond: 0, absorb: 0.2 },

  "minecraft:iron_helmet": { mat: "iron", w: 2, ins: 0.3, breath: 0.1, cond: 0.07, absorb: 0.8 },
  "minecraft:iron_chestplate": { mat: "iron", w: 5, ins: 0.3, breath: 0.1, cond: 0.07, absorb: 0.8 },
  "minecraft:iron_leggings": { mat: "iron", w: 4, ins: 0.3, breath: 0.1, cond: 0.07, absorb: 0.8 },
  "minecraft:iron_boots": { mat: "iron", w: 2, ins: 0.3, breath: 0.1, cond: 0.07, absorb: 0.8 },

  "minecraft:chainmail_helmet": { mat: "chain", w: 1, ins: 0.4, breath: 1.6, cond: 0.04, absorb: 0.4 },
  "minecraft:chainmail_chestplate": { mat: "chain", w: 4, ins: 0.4, breath: 1.6, cond: 0.04, absorb: 0.4 },
  "minecraft:chainmail_leggings": { mat: "chain", w: 3, ins: 0.4, breath: 1.6, cond: 0.04, absorb: 0.4 },
  "minecraft:chainmail_boots": { mat: "chain", w: 1, ins: 0.4, breath: 1.6, cond: 0.04, absorb: 0.4 },

  "minecraft:golden_helmet": { mat: "gold", w: 1, ins: 0.3, breath: 0.4, cond: 0.05, absorb: 1.4 },
  "minecraft:golden_chestplate": { mat: "gold", w: 3, ins: 0.3, breath: 0.4, cond: 0.05, absorb: 1.4 },
  "minecraft:golden_leggings": { mat: "gold", w: 2, ins: 0.3, breath: 0.4, cond: 0.05, absorb: 1.4 },
  "minecraft:golden_boots": { mat: "gold", w: 1, ins: 0.3, breath: 0.4, cond: 0.05, absorb: 1.4 },

  "minecraft:diamond_helmet": { mat: "diamond", w: 3, ins: 1.2, breath: 0.1, cond: 0.02, absorb: 0.3 },
  "minecraft:diamond_chestplate": { mat: "diamond", w: 6, ins: 1.2, breath: 0.1, cond: 0.02, absorb: 0.3 },
  "minecraft:diamond_leggings": { mat: "diamond", w: 5, ins: 1.2, breath: 0.1, cond: 0.02, absorb: 0.3 },
  "minecraft:diamond_boots": { mat: "diamond", w: 2, ins: 1.2, breath: 0.1, cond: 0.02, absorb: 0.3 },

  "minecraft:netherite_helmet": { mat: "netherite", w: 3, ins: 1.4, breath: 0.2, cond: 0.02, absorb: 0.3 },
  "minecraft:netherite_chestplate": { mat: "netherite", w: 7, ins: 1.4, breath: 0.2, cond: 0.02, absorb: 0.3 },
  "minecraft:netherite_leggings": { mat: "netherite", w: 5, ins: 1.4, breath: 0.2, cond: 0.02, absorb: 0.3 },
  "minecraft:netherite_boots": { mat: "netherite", w: 3, ins: 1.4, breath: 0.2, cond: 0.02, absorb: 0.3 },
};

// ------------------------------------------------------------
// WEIGHT SYSTEM - thresholds and cargo costs
// ------------------------------------------------------------
export const WEIGHT = {
  cargoKgPerItem: 0.06, // each item in the inventory weighs this much
  cargoCap: 12, // maximum kg counted from cargo alone
  slow1: 11, // Slowness I
  slow2: 16, // Slowness II
  slow3: 22, // Slowness III (overloaded)
  thirstMultPerKg: 1 / 90, // heavy gear dehydrates you faster
  staminaMultPerArmorKg: 1 / 40, // hunger multiplier from armor weight
};

// ------------------------------------------------------------
// THIRST SYSTEM (0..100)
// ------------------------------------------------------------
export const THIRST = {
  baseDrain: 0.03, // per second
  sprintDrain: 0.085, // extra per second while sprinting
  jumpCost: 0.3, // per jump
  breakCost: 0.12, // per block broken
  hotMult: 1.5, // effective temp > 65
  scorchMult: 2.5, // effective temp > 85
  drinkCooldown: 2500, // ms between sneak-drinks
  rawRestore: 25, // drinking from a lake/river
  rawSickChance: 0.18,
  bottleRestore: 35, // water bottle (assumed filled from a raw source)
  bottleSickChance: 0.08,
  boiledRestore: 50, // water bottle drunk next to a campfire
  snowRestore: 8, // eating snow
  snowChill: 7, // eating snow cools the body
  saltRestore: 4, // ocean water - barely helps
  saltSickChance: 0.25,
  warnSoft: 25,
  warnHard: 10,
};

// ------------------------------------------------------------
// CAMPING SYSTEM
// ------------------------------------------------------------
export const CAMPING = {
  campfireRadius: 6, // blocks: campfire warmth
  boilRadius: 4, // blocks: close enough to boil/drink safely
  bedRadius: 6, // blocks: bed counts toward a safe camp
  woodNeeded: 6, // wooden blocks nearby count toward a safe camp
  dryNearFire: 6, // wetness lost per second near a campfire
  dryBase: 0.6, // wetness lost per second otherwise
  drySun: 2, // extra drying in hot daylight sun
  rainWet: 6, // wetness gained per second in rain
  waterWet: 25, // wetness gained per second in water
};

// ------------------------------------------------------------
// EXPLORATION SYSTEM
// ------------------------------------------------------------
export const EXPLORATION = {
  pointsBiome: 5,
  pointsBiomeRare: 12,
  pointsRuins: 8,
  pointsPerMeters: 500, // every 500 m traveled
  pointsTravel: 3,
  ruinCheckInterval: 20, // seconds between ruin spawn attempts
  ruinChance: 0.12, // chance per check (per random online player)
  ruinMinDistance: 24, // blocks from player
  ruinMaxDistance: 42,
  ruinDiscoverRadius: 10, // walk this close to claim the reward
  ruinSpacing: 160, // min blocks between ruins
};

// ------------------------------------------------------------
// MILESTONES (realistic survival progression)
// ------------------------------------------------------------
export const MILESTONES = [
  { day: 1, key: 1, title: "Build a shelter", hint: "Gather wood and build a shelter before dark.", pts: 5 },
  { day: 5, key: 2, title: "Create a food source", hint: "Start a farm or breed animals for steady food.", pts: 10 },
  { day: 10, key: 3, title: "Prepare equipment", hint: "Craft armor, tools and pack supplies for travel.", pts: 15 },
  { day: 30, key: 4, title: "Build a permanent home", hint: "Settle down: a base, a farm and a camp.", pts: 30 },
  { day: 100, key: 5, title: "Create a complete survival base", hint: "Your settlement stands complete. Well lived.", pts: 100 },
];

// ------------------------------------------------------------
// HUD / MISC
// ------------------------------------------------------------
export const HUD = {
  enabled: () => CFG.hud,
};

export const SCOREBOARDS = [
  ["tc_temp", "Temp"],
  ["tc_thirst", "Thirst"],
  ["tc_weight", "Weight"],
  ["tc_wet", "Wetness"],
  ["tc_points", "Exploration"],
  ["tc_days", "Days"],
  ["tc_camp", "Camp"],
  ["tc_meta", "TC"],
];
