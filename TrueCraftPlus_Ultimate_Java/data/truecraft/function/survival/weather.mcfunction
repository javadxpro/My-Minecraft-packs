# TrueCraft+ Ultimate - weather: heat waves + thunderstorm danger
# heat wave rolls every 30s during daytime
execute if score #wcool truecraft matches 1.. run scoreboard players remove #wcool truecraft 1
execute if score #wave truecraft matches 1.. run scoreboard players remove #wave truecraft 1
execute unless predicate truecraft:env/night if score #m30 truecraft matches 0 if score #wcool truecraft matches 0 run function truecraft:survival/wave_roll
# heat wave: deserts scorch, warning shown once
execute if score #wave truecraft matches 1 if score #m30 truecraft matches 0 run tellraw @a {"text":"!! Heat wave - the sun is merciless. Seek shade and water!","color":"red"}
execute if score #wave truecraft matches 1 run scoreboard players set #wcool truecraft 120
# thunderstorm: warn anyone under open sky
execute as @a if predicate truecraft:env/thunder if predicate truecraft:env/open_sky if score @s tc_cd matches 0 run function truecraft:survival/thunder_warn
