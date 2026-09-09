# thunderstorm warning (per-player cooldown via tc_cd)
scoreboard players set @s tc_cd 30
tellraw @s {"text":"!! Thunderstorm - being outside is dangerous. Find shelter!","color":"red"}
