# TrueCraft+ Java - effects & survival damage
# ---- cold ----
execute as @a[scores={tc_temp=..14}] run effect give @s minecraft:slowness 2 0 true
execute as @a[scores={tc_temp=..14}] run effect give @s minecraft:hunger 4 0 true
execute as @a[scores={tc_temp=..8}] run effect give @s minecraft:slowness 2 1 true
execute if score #m5 truecraft matches 0 as @a[scores={tc_temp=..3}] run damage @s 1 minecraft:freeze
# ---- heat ----
execute as @a[scores={tc_temp=86..}] run effect give @s minecraft:weakness 2 0 true
execute as @a[scores={tc_temp=86..}] run effect give @s minecraft:slowness 2 0 true
execute as @a[scores={tc_temp=96..}] if score #m30 truecraft matches 0 run effect give @s minecraft:nausea 9 0 true
execute if score #m5 truecraft matches 0 as @a[scores={tc_temp=94..}] run damage @s 1 minecraft:magic
# ---- dehydration ----
execute if score #m5 truecraft matches 0 as @a[scores={tc_thirst=..0}] run damage @s 1 minecraft:starve
execute as @a[scores={tc_thirst=..5}] run effect give @s minecraft:weakness 2 0 true
# ---- heavy armor ----
execute as @a[scores={tc_ap=12..}] run effect give @s minecraft:slowness 2 0 true
execute as @a[scores={tc_ap=16..}] run effect give @s minecraft:slowness 2 1 true
