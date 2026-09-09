# TrueCraft+ LITE - thirst drains (every second, staggered)
# base drain: 1 per 15s
execute if score qm15 tc_meta matches 0 run scoreboard players remove @a[scores={tc_thirst=1..}] 1
# desert daytime: 1 extra per 8s
execute if score qm8 tc_meta matches 0 if score qnight tc_meta matches 0 run scoreboard players remove @a[scores={tc_thirst=1..,tc_zone=1}] 1
# heavy armor: 1 extra per 12s
execute if score qm12 tc_meta matches 0 run scoreboard players remove @a[scores={tc_thirst=1..,tc_ap=9..}] 1
# freezing also dehydrates less, but cold burns food (see effects)
execute as @a[scores={tc_thirst=..-1}] run scoreboard players set @s tc_thirst 0
