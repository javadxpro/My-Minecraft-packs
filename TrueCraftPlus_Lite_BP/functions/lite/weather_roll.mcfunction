# TrueCraft+ LITE - pseudo-random weather rolls (no scripts, deterministic pattern)
scoreboard players operation qr tc_meta = qwt tc_meta
scoreboard players operation qr tc_meta %= qc10 tc_meta
execute if score qr tc_meta matches 0..1 run function lite/w_rain
execute if score qr tc_meta matches 2..9 run function lite/w_clear
