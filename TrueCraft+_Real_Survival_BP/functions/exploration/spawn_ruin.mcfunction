# TrueCraft+ - manually build a small old camp ~8 blocks ahead of you
# (the automatic explorer in scripts/exploration.js spawns similar locations)

execute at @s positioned ^ ^ ^8 run setblock ~ ~ ~ campfire
execute at @s positioned ^ ^ ^8 run setblock ~1 ~ ~ oak_log
execute at @s positioned ^ ^ ^8 run setblock ~-1 ~ ~ oak_log
execute at @s positioned ^ ^ ^8 run setblock ~ ~ ~1 barrel
execute at @s positioned ^ ^ ^8 run loot spawn ~ ~1 ~ loot old_storage
tellraw @s {"rawtext":[{"text":"§2[TrueCraft+] §fOld camp built ahead of you with a forgotten storage stash."}]}
