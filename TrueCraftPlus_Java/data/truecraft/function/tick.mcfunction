# TrueCraft+ Java - master tick
scoreboard players add #c truecraft 1
execute if score #c truecraft matches 20.. run function truecraft:survival/tick
execute if score #c truecraft matches 20.. run scoreboard players set #c truecraft 0
scoreboard players add #cl truecraft 1
execute if score #cl truecraft matches 2.. if score #light truecraft_cfg matches 1 run function truecraft:light/tick
execute if score #cl truecraft matches 2.. run scoreboard players set #cl truecraft 0
scoreboard players add #ct truecraft 1
execute if score #ct truecraft matches 200.. run function truecraft:trades/tick
execute if score #ct truecraft matches 200.. run scoreboard players set #ct truecraft 0
