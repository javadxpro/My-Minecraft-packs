# TrueCraft+ LITE - pseudo-random weather rolls (no scripts, deterministic pattern)
scoreboard players operation #r tc_meta = #wt tc_meta
scoreboard players operation #r tc_meta %= #c10 tc_meta
execute if score #r tc_meta matches 0..1 run function lite/w_rain
execute if score #r tc_meta matches 2..9 run function lite/w_clear
