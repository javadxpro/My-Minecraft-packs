execute if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:light[level=14]
execute unless block ~ ~ ~ minecraft:light if block ~ ~1 ~ minecraft:air run setblock ~ ~1 ~ minecraft:light[level=14]
