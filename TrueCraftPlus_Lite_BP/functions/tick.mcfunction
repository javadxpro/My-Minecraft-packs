# TrueCraft+ LITE - master clock (NO JavaScript, runs automatically)
execute unless score qinit tc_meta matches 1 run function lite/boot
scoreboard players add qt tc_meta 1
execute if score qt tc_meta matches 20 run function lite/second_all
execute if score qt tc_meta matches 20 run scoreboard players set qt tc_meta 0
