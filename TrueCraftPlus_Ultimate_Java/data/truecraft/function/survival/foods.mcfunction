# TrueCraft+ Ultimate - realistic food handling (each stat has its own prev tracker)
# raw beef
execute as @a run scoreboard players operation @s tc_x = @s tc_rawbeef
execute as @a run scoreboard players operation @s tc_x -= @s tc_beefp
execute as @a run scoreboard players operation @s tc_beefp = @s tc_rawbeef
execute as @a[scores={tc_cd=0,tc_x=1..}] run function truecraft:survival/raw_meat
# raw porkchop
execute as @a run scoreboard players operation @s tc_x = @s tc_rawpork
execute as @a run scoreboard players operation @s tc_x -= @s tc_porkp
execute as @a run scoreboard players operation @s tc_porkp = @s tc_rawpork
execute as @a[scores={tc_cd=0,tc_x=1..}] run function truecraft:survival/raw_meat
# survivor's stew
execute as @a run scoreboard players operation @s tc_x = @s tc_stew
execute as @a run scoreboard players operation @s tc_x -= @s tc_stewp
execute as @a run scoreboard players operation @s tc_stewp = @s tc_stew
execute as @a[scores={tc_x=1..}] run function truecraft:survival/ate_stew
# canteen
execute as @a run scoreboard players operation @s tc_x = @s tc_canteen
execute as @a run scoreboard players operation @s tc_x -= @s tc_canp
execute as @a run scoreboard players operation @s tc_canp = @s tc_canteen
execute as @a[scores={tc_x=1..}] run function truecraft:survival/used_canteen
# bandage
execute as @a run scoreboard players operation @s tc_x = @s tc_bandage
execute as @a run scoreboard players operation @s tc_x -= @s tc_bandp
execute as @a run scoreboard players operation @s tc_bandp = @s tc_bandage
execute as @a[scores={tc_x=1..}] run function truecraft:survival/used_bandage
