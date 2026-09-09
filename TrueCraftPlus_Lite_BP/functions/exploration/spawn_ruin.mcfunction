# TrueCraft+ LITE - build an abandoned camp ~8 blocks ahead
execute at @s positioned ^ ^ ^8 run setblock ~ ~ ~ campfire
execute at @s positioned ^ ^ ^8 run setblock ~1 ~ ~ oak_log
execute at @s positioned ^ ^ ^8 run setblock ~-1 ~ ~ oak_log
execute at @s positioned ^ ^ ^8 run setblock ~ ~ ~1 barrel
execute at @s positioned ^ ^ ^8 run setblock ~ ~ ~-2 torch
execute at @s positioned ^ ^ ^8 run loot spawn ~ ~1 ~ loot old_storage
tellraw @s {"rawtext":[{"text":"§2[TrueCraft+ LITE] §fOld camp built ahead with a forgotten storage stash."}]}
