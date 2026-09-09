# eating snow (sneaking on snow)
scoreboard players set @s tc_cd 4
scoreboard players add @s tc_thirst 8
scoreboard players remove @s tc_temp 7
tellraw @s {"text":"+ You eat snow. It helps a little, but chills you.","color":"aqua"}
