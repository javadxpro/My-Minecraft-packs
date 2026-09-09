# TrueCraft+ Ultimate - effects & survival damage (new thresholds)
# 0-10 CRITICAL freezing
execute as @a[scores={tc_temp=..10}] run effect give @s minecraft:slowness 3 2 true
execute as @a[scores={tc_temp=..10}] run effect give @s minecraft:hunger 4 0 true
execute if score #m5 truecraft matches 0 as @a[scores={tc_temp=..10}] run damage @s 1 minecraft:freeze
# screen effect for critical freezing
execute as @a[scores={tc_temp=..6}] if score #m30 truecraft matches 0 run effect give @s minecraft:nausea 8 0 true
execute as @a[scores={tc_temp=..6}] if score #m30 truecraft matches 0 run tellraw @s {"text":"Hypothermia! Get to warmth NOW.","color":"dark_red"}
# 10-30 cold
execute as @a[scores={tc_temp=11..30}] run effect give @s minecraft:slowness 2 0 true
execute as @a[scores={tc_temp=11..30}] run effect give @s minecraft:hunger 4 0 true
# 90-100 heat stroke
execute as @a[scores={tc_temp=90..}] run effect give @s minecraft:weakness 3 1 true
execute as @a[scores={tc_temp=90..}] run effect give @s minecraft:slowness 3 1 true
execute if score #m5 truecraft matches 0 as @a[scores={tc_temp=90..}] run damage @s 1 minecraft:magic
execute as @a[scores={tc_temp=94..}] if score #m30 truecraft matches 0 run effect give @s minecraft:nausea 9 0 true
execute as @a[scores={tc_temp=94..}] if score #m30 truecraft matches 0 run tellraw @s {"text":"Heat stroke! Get out of the sun and drink!","color":"dark_red"}
# 70-90 hot
execute as @a[scores={tc_temp=70..89}] run effect give @s minecraft:slowness 2 0 true
# dehydration damage
execute if score #m5 truecraft matches 0 as @a[scores={tc_thirst=..0}] run damage @s 1 minecraft:starve
execute as @a[scores={tc_thirst=..5}] run effect give @s minecraft:weakness 2 0 true
# heavy armor
execute as @a[scores={tc_ap=12..}] run effect give @s minecraft:slowness 2 0 true
execute as @a[scores={tc_ap=16..}] run effect give @s minecraft:slowness 2 1 true
# fall injury effects handled in fall_injury
