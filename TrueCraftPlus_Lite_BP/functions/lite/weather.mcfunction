# TrueCraft+ LITE - weather manager + rain wetness (every second)
scoreboard players add qwt tc_meta 1
execute if score qwt tc_meta >= qwdur tc_meta run function lite/weather_roll
# rain soaks players under open sky
execute as @a at @s if score qwstate tc_meta matches 1 if block ~ ~5 ~ air run scoreboard players add @s tc_wet 2
execute as @a[scores={tc_wet=101..}] run scoreboard players set @s tc_wet 100
# rain chills handled in temperature
