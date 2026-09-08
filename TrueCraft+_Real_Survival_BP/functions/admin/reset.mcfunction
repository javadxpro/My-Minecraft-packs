# TrueCraft+ - admin reset (scores for online players)
scoreboard players reset @a tc_temp
scoreboard players reset @a tc_thirst
scoreboard players reset @a tc_weight
scoreboard players reset @a tc_wet
scoreboard players reset @a tc_points
scoreboard players reset @a tc_days
scoreboard players reset @a tc_camp
tellraw @a {"rawtext":[{"text":"§2[TrueCraft+] §fScoreboards cleared. §7To wipe ALL saved data (biomes found, ruins, milestones), run: §e/scriptevent truecraft:reset"}]}
