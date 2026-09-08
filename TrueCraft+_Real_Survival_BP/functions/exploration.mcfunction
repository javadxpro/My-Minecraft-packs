# TrueCraft+ - exploration module (vanilla-side view)
# The live simulation runs in scripts/exploration.js.
# Shows exploration points and days survived. Discover biomes, travel far and
# find old camps, ruins and storage boxes to earn points.

titleraw @a actionbar {"rawtext":[{"text":"§aExploration points: §f"},{"score":{"name":"*","objective":"tc_points"}},{"text":" §7- Day "},{"score":{"name":"*","objective":"tc_days"}}]}
tellraw @s {"rawtext":[{"text":"§7Tip: §f/function exploration/spawn_ruin §7builds an old camp 8 blocks ahead (for testing)."}]}
