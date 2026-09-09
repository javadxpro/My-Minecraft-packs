# plain (unboiled) water bottle - decent, small risk
scoreboard players add @s tc_thirst 35
tellraw @s {"text":"+ You drink from your water bottle.","color":"aqua"}
execute store result score @s tc_x run random roll 1 10
execute if score @s tc_x matches 1 run function truecraft:survival/get_sick
