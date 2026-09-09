# drinking raw water (sneaking inside a water block)
scoreboard players set @s tc_cd 4
scoreboard players add @s tc_thirst 25
scoreboard players add @s tc_wet 30
tellraw @s {"text":"+ You drink raw water. Boil it at a campfire to be safe.","color":"aqua"}
execute store result score @s tc_x run random roll 1 5
execute if score @s tc_heat matches ..0 if score @s tc_x matches 1 run function truecraft:survival/get_sick
