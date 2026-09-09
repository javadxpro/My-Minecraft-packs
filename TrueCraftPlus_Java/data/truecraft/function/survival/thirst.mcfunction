# TrueCraft+ Java - thirst drain
execute if score #m15 truecraft matches 0 as @a[scores={tc_thirst=1..}] run scoreboard players remove @s tc_thirst 1
execute if score #m8 truecraft matches 0 as @a[scores={tc_thirst=1..,tc_zone=1}] unless predicate truecraft:env/night run scoreboard players remove @s tc_thirst 1
execute if score #m12 truecraft matches 0 as @a[scores={tc_thirst=1..,tc_ap=9..}] run scoreboard players remove @s tc_thirst 1
execute as @a[scores={tc_thirst=..0}] run scoreboard players set @s tc_thirst 0
