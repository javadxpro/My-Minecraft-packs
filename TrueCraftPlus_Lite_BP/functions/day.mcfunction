# TrueCraft+ LITE - resync time to DAYTIME
scoreboard players set #tod tc_meta 200
scoreboard players set #night tc_meta 0
tellraw @s {"rawtext":[{"text":"§2[TrueCraft+ LITE] §fTime synced to daytime. §7Nights now start in ~7 real minutes."}]}
