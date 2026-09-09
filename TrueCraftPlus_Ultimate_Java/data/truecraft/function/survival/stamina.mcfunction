# TrueCraft+ Ultimate - stamina system (100 max)
# drains: sprinting (~4/s), jumping (3), swimming (3/s), combat | recovery: resting, campfires, comfort
# ---- activity deltas & flags ----
scoreboard players set @a tc_act 0
# sprinting
execute as @a run scoreboard players operation @s tc_y = @s tc_sprint
execute as @a run scoreboard players operation @s tc_y -= @s tc_sprintprev
execute as @a run scoreboard players operation @s tc_sprintprev = @s tc_sprint
execute as @a[scores={tc_y=140..}] run scoreboard players operation @s tc_y /= #d140 truecraft
execute as @a[scores={tc_y=1..}] run scoreboard players operation @s tc_sta -= @s tc_y
execute as @a[scores={tc_y=1..}] run scoreboard players set @s tc_act 1
# jumping
execute as @a run scoreboard players operation @s tc_y = @s tc_jump
execute as @a run scoreboard players operation @s tc_y -= @s tc_jumpprev
execute as @a run scoreboard players operation @s tc_jumpprev = @s tc_jump
execute as @a[scores={tc_y=1..}] run scoreboard players operation @s tc_y *= #w3 truecraft
execute as @a[scores={tc_y=1..}] run scoreboard players operation @s tc_sta -= @s tc_y
execute as @a[scores={tc_y=1..}] run scoreboard players set @s tc_act 1
# swimming
execute as @a run scoreboard players operation @s tc_y = @s tc_swim
execute as @a run scoreboard players operation @s tc_y -= @s tc_swimprev
execute as @a run scoreboard players operation @s tc_swimprev = @s tc_swim
execute as @a[scores={tc_y=100..}] run scoreboard players operation @s tc_y /= #d100 truecraft
execute as @a[scores={tc_y=1..}] run scoreboard players operation @s tc_sta -= @s tc_y
execute as @a[scores={tc_y=1..}] run scoreboard players set @s tc_act 1
# combat (damage dealt)
execute as @a run scoreboard players operation @s tc_y = @s tc_combat
execute as @a run scoreboard players operation @s tc_y -= @s tc_combatprev
execute as @a run scoreboard players operation @s tc_combatprev = @s tc_combat
execute as @a[scores={tc_y=10..}] run scoreboard players operation @s tc_y /= #d10 truecraft
execute as @a[scores={tc_y=1..}] run scoreboard players operation @s tc_sta -= @s tc_y
execute as @a[scores={tc_y=1..}] run scoreboard players set @s tc_act 1
# ---- recovery (only when not exerting yourself) ----
execute as @a[scores={tc_act=0,tc_sta=..99}] run scoreboard players add @s tc_sta 1
# resting (sneaking still) speeds recovery
execute as @a[scores={tc_act=0,tc_sta=..98,tc_sneak=1..}] run scoreboard players add @s tc_sta 1
# campfire rest (safe camp) restores fastest
execute as @a[scores={tc_act=0,tc_sta=..96,tc_camp=2}] run scoreboard players add @s tc_sta 2
execute as @a[scores={tc_act=0,tc_sta=..95,tc_camp=3}] run scoreboard players add @s tc_sta 1
# comfortable temperature helps recovery; extreme heat burns stamina
execute as @a[scores={tc_act=0,tc_sta=..98,tc_temp=30..70}] run scoreboard players add @s tc_sta 1
execute as @a[scores={tc_temp=85..}] run scoreboard players remove @s tc_sta 1
# ---- exhaustion ----
execute as @a[scores={tc_sta=..0}] run scoreboard players set @s tc_sta 0
execute as @a[scores={tc_sta=..5}] run effect give @s minecraft:slowness 3 2 true
execute as @a[scores={tc_sta=..5}] run effect give @s minecraft:weakness 3 0 true
execute as @a[scores={tc_sta=..5}] if score #m10 truecraft matches 0 run tellraw @s {"text":"You are exhausted! Stop and rest a moment.","color":"red"}
execute as @a[scores={tc_sta=6..19}] run effect give @s minecraft:slowness 3 1 true
