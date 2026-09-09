# TrueCraft+ Java - trades module (every 10 seconds)
scoreboard players add #td truecraft 1
execute if score #trades truecraft_cfg matches 1 run function truecraft:trades/upgrade_scan
execute if score #td truecraft matches 3.. if score #discount truecraft_cfg matches 1 run function truecraft:trades/discount
execute if score #td truecraft matches 3.. run scoreboard players set #td truecraft 0
