# deep enclosed spaces (y<=30, no sky): pull target toward a stable 45
execute run scoreboard players operation @s tc_x = #stable truecraft
execute run scoreboard players operation @s tc_x -= @s tc_btgt
execute run scoreboard players operation @s tc_x /= #two truecraft
execute run scoreboard players operation @s tc_btgt += @s tc_x
# well-built underground floors (stone) insulate even better: extra pull toward comfort
execute if block ~ ~-1 ~ #truecraft:insulation_stone run scoreboard players operation @s tc_x = #stable truecraft
execute if block ~ ~-1 ~ #truecraft:insulation_stone run scoreboard players operation @s tc_x -= @s tc_btgt
execute if block ~ ~-1 ~ #truecraft:insulation_stone run scoreboard players operation @s tc_x /= #two truecraft
execute if block ~ ~-1 ~ #truecraft:insulation_stone run scoreboard players operation @s tc_btgt += @s tc_x
