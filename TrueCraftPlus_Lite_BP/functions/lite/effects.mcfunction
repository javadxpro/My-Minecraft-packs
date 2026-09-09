# TrueCraft+ LITE - effects & survival damage
# cold
execute as @a[scores={tc_temp=..14}] run effect @s slowness 2 0 true
execute as @a[scores={tc_temp=..14}] run effect @s hunger 4 0 true
execute as @a[scores={tc_temp=..8}] run effect @s slowness 2 1 true
# freezing damage every 5s
execute as @a[scores={tc_temp=..3}] if score #m5 tc_meta matches 0 run damage @s 1 freeze
# heat
execute as @a[scores={tc_temp=86..}] run effect @s weakness 2 0 true
execute as @a[scores={tc_temp=86..}] run effect @s slowness 2 0 true
execute as @a[scores={tc_temp=96..}] if score #m30 tc_meta matches 0 run effect @s nausea 9 0 true
# heatstroke damage every 5s
execute as @a[scores={tc_temp=94..}] if score #m5 tc_meta matches 0 run damage @s 1 magic
# dehydration damage every 5s
execute as @a[scores={tc_thirst=..0}] if score #m5 tc_meta matches 0 run damage @s 1 starvation
execute as @a[scores={tc_thirst=..5}] run effect @s weakness 2 0 true
# heavy armor slows you down
execute as @a[scores={tc_ap=12..}] run effect @s slowness 2 0 true
execute as @a[scores={tc_ap=16..}] run effect @s slowness 2 1 true
# safe camp regeneration
execute as @a[scores={tc_camp=2}] run effect @s regeneration 3 0 true
