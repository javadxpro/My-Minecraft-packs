# TrueCraft+ LITE - master clock (NO JavaScript, runs automatically)
execute unless score #init tc_meta matches 1 run function lite/boot
scoreboard players add #t tc_meta 1
execute if score #t tc_meta matches 20 run function lite/second_all
execute if score #t tc_meta matches 20 run scoreboard players set #t tc_meta 0
