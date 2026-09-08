# TrueCraft+ - wildlife report (vanilla-side view)
# Live tweaks (night-active wolves, fire-shy animals) run in scripts/animals.js.

execute if entity @e[type=wolf,distance=..32] run tellraw @s {"rawtext":[{"text":"§7Wolves nearby: §fyes §7(more active at night)"}]}
execute unless entity @e[type=wolf,distance=..32] run tellraw @s {"rawtext":[{"text":"§7Wolves nearby: §fnone"}]}
execute if entity @e[type=cow,distance=..32] run tellraw @s {"rawtext":[{"text":"§7Cows nearby: §fyes"}]}
execute if entity @e[type=sheep,distance=..32] run tellraw @s {"rawtext":[{"text":"§7Sheep nearby: §fyes"}]}
execute if entity @e[type=pig,distance=..32] run tellraw @s {"rawtext":[{"text":"§7Pigs nearby: §fyes"}]}
execute if entity @e[type=chicken,distance=..32] run tellraw @s {"rawtext":[{"text":"§7Chickens nearby: §fyes"}]}
