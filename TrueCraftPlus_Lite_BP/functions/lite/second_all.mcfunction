# TrueCraft+ LITE - per-second driver
scoreboard players add qtod tc_meta 1
# day/night cycle: 1200s total (20 min like Minecraft). Resync with /function day or /function night
execute if score qtod tc_meta matches 650 run scoreboard players set qnight tc_meta 1
execute if score qtod tc_meta matches 1200 run scoreboard players set qtod tc_meta 0
execute if score qtod tc_meta matches 1200 run scoreboard players add qday tc_meta 1
execute if score qtod tc_meta matches ..649 run scoreboard players set qnight tc_meta 0
# periodic counters
scoreboard players add qm4 tc_meta 1
execute if score qm4 tc_meta matches 4.. run scoreboard players set qm4 tc_meta 0
scoreboard players add qm5 tc_meta 1
execute if score qm5 tc_meta matches 5.. run scoreboard players set qm5 tc_meta 0
scoreboard players add qm8 tc_meta 1
execute if score qm8 tc_meta matches 8.. run scoreboard players set qm8 tc_meta 0
scoreboard players add qm11 tc_meta 1
execute if score qm11 tc_meta matches 11.. run scoreboard players set qm11 tc_meta 0
scoreboard players add qm12 tc_meta 1
execute if score qm12 tc_meta matches 12.. run scoreboard players set qm12 tc_meta 0
scoreboard players add qm15 tc_meta 1
execute if score qm15 tc_meta matches 15.. run scoreboard players set qm15 tc_meta 0
scoreboard players add qm30 tc_meta 1
execute if score qm30 tc_meta matches 30.. run scoreboard players set qm30 tc_meta 0
# welcome (first time)
execute as @a[tag=!tc_lite] run tellraw @a[tag=!tc_lite] {"rawtext":[{"text":"§2[TrueCraft+ LITE] §fRealistic survival: temperature, thirst, weight, camping. §7Stand in water to drink. Campfire warms you. §e/function help"}]}
tag @a[tag=!tc_lite] add tc_lite
# systems
execute if score qm4 tc_meta matches 0 run function lite/scan
function lite/weather
function lite/temperature
function lite/thirst
function lite/effects
function lite/hud
function lite/milestones
