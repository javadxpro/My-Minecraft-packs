# advanced camp -> permanent base check: bed+fire (level 2) plus chest, furnace and crafting table within reach
execute as @a at @s run scoreboard players set @s tc_y 0
execute as @a at @s if block ~2 ~ ~ minecraft:chest run scoreboard players add @s tc_y 1
execute as @a at @s if block ~-2 ~ ~ minecraft:chest run scoreboard players add @s tc_y 1
execute as @a at @s if block ~ ~ ~2 minecraft:chest run scoreboard players add @s tc_y 1
execute as @a at @s if block ~ ~ ~-2 minecraft:chest run scoreboard players add @s tc_y 1
execute as @a at @s if block ~2 ~ ~ minecraft:furnace run scoreboard players add @s tc_y 1
execute as @a at @s if block ~-2 ~ ~ minecraft:furnace run scoreboard players add @s tc_y 1
execute as @a at @s if block ~ ~ ~2 minecraft:furnace run scoreboard players add @s tc_y 1
execute as @a at @s if block ~ ~ ~-2 minecraft:furnace run scoreboard players add @s tc_y 1
execute as @a at @s if block ~2 ~ ~ minecraft:crafting_table run scoreboard players add @s tc_y 1
execute as @a at @s if block ~-2 ~ ~ minecraft:crafting_table run scoreboard players add @s tc_y 1
execute as @a at @s if block ~ ~ ~2 minecraft:crafting_table run scoreboard players add @s tc_y 1
execute as @a at @s if block ~ ~ ~-2 minecraft:crafting_table run scoreboard players add @s tc_y 1
execute as @a[scores={tc_y=3..}] run scoreboard players set @s tc_camp 3
