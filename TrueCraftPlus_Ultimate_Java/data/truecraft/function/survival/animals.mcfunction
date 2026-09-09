# TrueCraft+ Ultimate - wildlife feels alive (every 10s)
# prey animals panic near open fires and lava (they avoid danger)
execute as @a[scores={tc_heat=2..}] at @s run effect give @e[type=minecraft:cow,distance=..6] minecraft:speed 2 1 true
execute as @a[scores={tc_heat=2..}] at @s run effect give @e[type=minecraft:sheep,distance=..6] minecraft:speed 2 1 true
execute as @a[scores={tc_heat=2..}] at @s run effect give @e[type=minecraft:pig,distance=..6] minecraft:speed 2 1 true
execute as @a[scores={tc_heat=2..}] at @s run effect give @e[type=minecraft:chicken,distance=..6] minecraft:speed 2 1 true
# wolves are more active at night (patrolling packs)
execute as @a at @s if predicate truecraft:env/night run effect give @e[type=minecraft:wolf,distance=..24] minecraft:speed 3 0 true
# tamed wolves near a safe camp stand guard (small resistance buff while you rest)
execute as @a[scores={tc_camp=2..}] at @s run effect give @e[type=minecraft:wolf,distance=..12,nbt={Owner:[I;0]}] minecraft:resistance 4 0 true
