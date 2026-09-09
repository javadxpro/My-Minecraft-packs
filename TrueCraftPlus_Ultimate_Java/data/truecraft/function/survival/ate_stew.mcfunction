# survivor's stew: food + hydration
execute if score #thirst truecraft_cfg matches 1 run scoreboard players add @s tc_thirst 15
tellraw @s {"text":"+ Homemade stew - warm and hydrating (+15 thirst)","color":"aqua"}
