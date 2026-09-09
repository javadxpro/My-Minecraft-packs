# TrueCraft+ Java - dynamic light module (every 2 ticks)
# A) remove the light block at each carrier's current (old) position
execute as @e[type=minecraft:marker,tag=tc_light] at @s run function truecraft:light/cleanup_here
# B) carriers follow the nearest player holding a light source
execute as @a[predicate=truecraft:hold/any] at @s run tp @e[type=minecraft:marker,tag=tc_light,distance=..32,limit=1,sort=nearest] ~ ~ ~
# C) summon a carrier for holders that have none (lantern wins, then torch, then soul torch)
execute as @a[predicate=truecraft:hold/lantern] at @s unless entity @e[type=minecraft:marker,tag=tc_light,distance=..32] run summon minecraft:marker ~ ~ ~ {Tags:["tc_light","tc_l15"]}
execute as @a[predicate=truecraft:hold/torch] at @s unless entity @e[type=minecraft:marker,tag=tc_light,distance=..32] run summon minecraft:marker ~ ~ ~ {Tags:["tc_light","tc_l14"]}
execute as @a[predicate=truecraft:hold/soul_torch] at @s unless entity @e[type=minecraft:marker,tag=tc_light,distance=..32] run summon minecraft:marker ~ ~ ~ {Tags:["tc_light","tc_l10"]}
# D) place the light block at each carrier
execute as @e[type=minecraft:marker,tag=tc_l15] at @s run function truecraft:light/place15
execute as @e[type=minecraft:marker,tag=tc_l14] at @s run function truecraft:light/place14
execute as @e[type=minecraft:marker,tag=tc_l10] at @s run function truecraft:light/place10
