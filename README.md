# My-Minecraft-packs

Minecraft Bedrock Edition add-ons built with vanilla-first, mobile-friendly design.

## TrueCraft+ Real Survival (Behavior Pack)

A realistic, calm and immersive survival experience: body temperature, thirst,
clothing weight, camping and exploration. **No fantasy, no magic, no RPG
superpowers — only real survival mechanics.** No resource pack required.

**Requirements:** Minecraft Bedrock **1.26.0+** (the pack uses the stable
`@minecraft/server 2.3.0` Script API). Works on phones, tablets and PC.

### Installing

1. Open `packs/TrueCraft+_Real_Survival.mcaddon` with Minecraft
   (double-click on Windows, "Open with Minecraft" on mobile), **or**
2. copy the `TrueCraft+_Real_Survival_BP/` folder into your world's
   `behavior_packs` folder and activate it in the world settings.

Cheats are **not** required: the pack sets itself up automatically when the
world loads. All data (functions, scoreboards, tags, dynamic properties) is
standard Bedrock content.

### Gameplay at a glance

| System | What it does |
| --- | --- |
| **Temperature** | Body temp 0–100 (0-15 freezing, 15-35 cold, 35-65 comfortable, 65-85 hot, 85-100 heat exhaustion). Driven by biome, weather, time of day, clothing, nearby heat and being wet. |
| **Clothing realism** | Every armor piece has weight, insulation, breathability, conductivity and sun absorption. Leather = warm, chain = breathable, iron = conducts (colder in snow, hotter in desert), gold = absorbs sun, diamond/netherite = strong but heavy. |
| **Weight** | Armor + cargo slow you down (Slowness I–III) and burn extra food/water. |
| **Thirst** | Sneak in fresh water to drink (small sickness chance), drink water bottles, **boil bottles next to a campfire for the safest drink**, eat snow (small sip, chills you). |
| **Fire & heat** | Torches in hand and nearby campfires warm you; heat scales with distance; campfires dry wet clothes. |
| **Weather** | Rain soaks and chills you, snowfall is dangerous cold, deserts bake under clear skies, nights are colder. |
| **Camping** | Campfire + bed + wooden blocks nearby = **Safe Camp**: faster temperature recovery, small regeneration, fast drying. |
| **Exploration** | "New area discovered: Forest" messages, exploration points, travel distance rewards, plus abandoned old camps, small ruins, forgotten storage boxes and old mining sites to find. |
| **Animals** | Wolves are livelier at night and stick around camps; prey animals get nervous near fires and lava. Vanilla creatures only. |
| **Milestones** | Day 1 shelter, Day 5 food source, Day 10 equipment, Day 30 permanent home, Day 100 complete survival base. |
| **Ambience** | Morning mist, wind and campfire embers — vanilla particles and sounds only. |

### Useful commands

```
/function help                       full in-game guide
/function setup                      manual setup (automatic anyway)
/scriptevent truecraft:status        print your survival status
/scriptevent truecraft:cfg hud off   toggle modules: temp thirst weight camping
                                     weatherManage ruins animals ambient
                                     challenges hardMode hud
/scriptevent truecraft:weather rain  set weather: clear | rain | thunder
/scriptevent truecraft:ruin          build an abandoned location nearby
/function hud/sidebar                show exploration points on the side bar
/scriptevent truecraft:reset         wipe all TrueCraft+ data in the world
```

### Project layout

```
TrueCraft+_Real_Survival_BP/
├── manifest.json            data + script modules (@minecraft/server 2.3.0)
├── pack_icon.png
├── functions/               vanilla command layer (tick.json, setup, module views)
│   ├── tick.json
│   ├── tick.mcfunction
│   ├── setup.mcfunction
│   ├── temperature.mcfunction / thirst / weight / camping / exploration ...
│   ├── exploration/spawn_ruin.mcfunction
│   ├── weather/rain.mcfunction, weather/clear.mcfunction
│   ├── hud/sidebar.mcfunction, hud/sidebar_off.mcfunction
│   └── admin/reset.mcfunction
├── scripts/                 Script API simulation engine (ES modules)
│   ├── main.js              1 Hz per-player loop, module wiring, script events
│   ├── config.js            every tuning value in one place
│   ├── core.js              state, persistence, effects, scoreboards
│   ├── env.js               cached block scan (heat sources, camp, ground, sky)
│   ├── temperature.js / thirst.js / weight.js / camping.js
│   ├── exploration.js / weather.js / animals.js / challenges.js / ambient.js / hud.js
│   └── util.js
└── loot_tables/old_storage.json
```

The engine is modular: add a new `scripts/<module>.js`, call its `tick*()`
from `main.js`, and it can immediately use the shared environment scan, player
state, effects and messaging.

### Performance notes (mobile first)

- Simulation runs once per second per player, not per tick
- Block scans are cached for ~2.5 s and stop early once enough is known
- Effects are batched into one application per second; particles are rare
- Scoreboard writes are throttled; persistence is throttled to every 5 s
- No ticking areas, no entities spawned, no forced chunks

### Development

`testenv/` contains a Node.js harness with a mock of `@minecraft/server`
that smoke-tests the real pack scripts (37 assertions):

```
cd testenv
npm run test
```

## License

MIT
