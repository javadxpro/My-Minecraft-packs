# TrueCraft+ Java - exploration: biome discovery + day milestones
execute as @a if score @s tc_zone != @s tc_zoneL run function truecraft:survival/discover
execute as @a run scoreboard players operation @s tc_zoneL = @s tc_zone
# day tracking + milestones
execute as @a store result score @s tc_day run time query day
execute as @a if score @s tc_day matches 1.. if score @s tc_m1 matches 0 run function truecraft:survival/mile1
execute as @a if score @s tc_day matches 5.. if score @s tc_m5 matches 0 run function truecraft:survival/mile5
execute as @a if score @s tc_day matches 10.. if score @s tc_m10 matches 0 run function truecraft:survival/mile10
execute as @a if score @s tc_day matches 30.. if score @s tc_m30 matches 0 run function truecraft:survival/mile30
execute as @a if score @s tc_day matches 100.. if score @s tc_m100 matches 0 run function truecraft:survival/mile100
