# TrueCraft+ Ultimate - survival driver (every second)
# per-player stat deltas (sneak, potions)
execute as @a run scoreboard players operation @s tc_sneak = @s tc_sneaktime
execute as @a run scoreboard players operation @s tc_sneak -= @s tc_sneakprev
execute as @a run scoreboard players operation @s tc_sneakprev = @s tc_sneaktime
execute as @a run scoreboard players operation @s tc_pot = @s tc_potions
execute as @a run scoreboard players operation @s tc_pot -= @s tc_potprev
execute as @a run scoreboard players operation @s tc_potprev = @s tc_potions
execute as @a[scores={tc_cd=1..}] run scoreboard players remove @s tc_cd 1
# despawn orphan light carriers
execute as @e[type=minecraft:marker,tag=tc_light] at @s unless entity @a[predicate=truecraft:hold/any,distance=..64] run function truecraft:light/despawn
# staggered counters
scoreboard players add #m5 truecraft 1
execute if score #m5 truecraft matches 5.. run scoreboard players set #m5 truecraft 0
scoreboard players add #m8 truecraft 1
execute if score #m8 truecraft matches 8.. run scoreboard players set #m8 truecraft 0
scoreboard players add #m10 truecraft 1
execute if score #m10 truecraft matches 10.. run scoreboard players set #m10 truecraft 0
scoreboard players add #m12 truecraft 1
execute if score #m12 truecraft matches 12.. run scoreboard players set #m12 truecraft 0
scoreboard players add #m15 truecraft 1
execute if score #m15 truecraft matches 15.. run scoreboard players set #m15 truecraft 0
scoreboard players add #m30 truecraft 1
execute if score #m30 truecraft matches 30.. run scoreboard players set #m30 truecraft 0
# weather state machine (heat waves, thunder warnings)
function truecraft:survival/weather
# systems
function truecraft:survival/scan
execute if score #temp truecraft_cfg matches 1 run function truecraft:survival/temperature
execute if score #thirst truecraft_cfg matches 1 run function truecraft:survival/thirst
execute if score #stamina truecraft_cfg matches 1 run function truecraft:survival/stamina
function truecraft:survival/effects
function truecraft:survival/foods
execute if score #hud truecraft_cfg matches 1 run function truecraft:survival/hud
function truecraft:survival/explore
# animal behavior every 10s
execute if score #m10 truecraft matches 0 run function truecraft:survival/animals
