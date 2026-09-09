# TrueCraft+ LITE - per-second driver
scoreboard players add #sec tc_meta 1
scoreboard players add #tod tc_meta 1
# day/night cycle: 1200s total (20 min like Minecraft). Resync with /function day or /function night
execute if score #tod tc_meta matches 650 run scoreboard players set #night tc_meta 1
execute if score #tod tc_meta matches 1200 run scoreboard players set #tod tc_meta 0
execute if score #tod tc_meta matches 1200 run scoreboard players add #day tc_meta 1
execute if score #tod tc_meta matches ..649 run scoreboard players set #night tc_meta 0
# periodic counters
scoreboard players add #m4 tc_meta 1
execute if score #m4 tc_meta matches 4.. run scoreboard players set #m4 tc_meta 0
scoreboard players add #m5 tc_meta 1
execute if score #m5 tc_meta matches 5.. run scoreboard players set #m5 tc_meta 0
scoreboard players add #m8 tc_meta 1
execute if score #m8 tc_meta matches 8.. run scoreboard players set #m8 tc_meta 0
scoreboard players add #m11 tc_meta 1
execute if score #m11 tc_meta matches 11.. run scoreboard players set #m11 tc_meta 0
scoreboard players add #m12 tc_meta 1
execute if score #m12 tc_meta matches 12.. run scoreboard players set #m12 tc_meta 0
scoreboard players add #m15 tc_meta 1
execute if score #m15 tc_meta matches 15.. run scoreboard players set #m15 tc_meta 0
scoreboard players add #m30 tc_meta 1
execute if score #m30 tc_meta matches 30.. run scoreboard players set #m30 tc_meta 0
# welcome (first time)
execute as @a[tag=!tc_lite] run tellraw @a[tag=!tc_lite] {"rawtext":[{"text":"§2[TrueCraft+ LITE] §fRealistic survival: temperature, thirst, weight, camping. §7Stand in water to drink. Campfire warms you. §e/function help"}]}
tag @a[tag=!tc_lite] add tc_lite
# systems
execute if score #m4 tc_meta matches 0 run function lite/scan
function lite/weather
function lite/temperature
function lite/thirst
function lite/effects
function lite/hud
function lite/milestones
