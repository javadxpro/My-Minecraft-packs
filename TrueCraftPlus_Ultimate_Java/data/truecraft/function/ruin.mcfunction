# TrueCraft+ Ultimate - build an abandoned camp ~8 blocks ahead (loot chest)
execute at @s positioned ^ ^ ^8 run function truecraft:ruin_build
tellraw @s {"text":"An abandoned camp was built ahead - it has a forgotten storage chest.","color":"green"}
