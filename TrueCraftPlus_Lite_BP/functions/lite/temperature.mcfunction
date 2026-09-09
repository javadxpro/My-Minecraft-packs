# TrueCraft+ LITE - temperature system (every second)
# zone base target
execute as @a[scores={tc_zone=0}] run scoreboard players operation @s tc_d = #z0 tc_meta
execute as @a[scores={tc_zone=1}] run scoreboard players operation @s tc_d = #z1 tc_meta
execute as @a[scores={tc_zone=2}] run scoreboard players operation @s tc_d = #z2 tc_meta
execute as @a[scores={tc_zone=3}] run scoreboard players operation @s tc_d = #z3 tc_meta
execute as @a[scores={tc_zone=4}] run scoreboard players operation @s tc_d = #z4 tc_meta
# night is colder
execute as @a if score #night tc_meta matches 1 run scoreboard players remove @s tc_d 10
# rain chill (sheltered zone 4 is safe)
execute as @a unless entity @s[scores={tc_zone=4}] if score #wstate tc_meta matches 1 run scoreboard players remove @s tc_d 8
# snowfall: extra cold in snowfields
execute as @a[scores={tc_zone=2}] if score #wstate tc_meta matches 1 run scoreboard players remove @s tc_d 6
# wet clothes steal warmth
execute as @a[scores={tc_wet=31..}] run scoreboard players remove @s tc_d 10
# leather insulation warms cold zones
execute as @a[scores={tc_zone=2..3}] run scoreboard players operation @s tc_d += @s tc_lth
# iron conducts: colder in snow, hotter in desert
execute as @a[scores={tc_zone=2..3}] run scoreboard players operation @s tc_d -= @s tc_irn
execute as @a[scores={tc_zone=2..3}] run scoreboard players operation @s tc_d -= @s tc_irn
execute as @a[scores={tc_zone=1}] run scoreboard players operation @s tc_d += @s tc_irn
execute as @a[scores={tc_zone=1}] run scoreboard players operation @s tc_d += @s tc_irn
execute as @a[scores={tc_zone=1}] run scoreboard players operation @s tc_d += @s tc_irn
# chain breathes: relief in deserts / gold absorbs sun
execute as @a[scores={tc_zone=1},hasitem={item=chainmail_chestplate,location=slot.armor.chest}] run scoreboard players remove @s tc_d 8
execute as @a[scores={tc_zone=1},hasitem={item=golden_chestplate,location=slot.armor.chest}] run scoreboard players add @s tc_d 8
# heat sources (campfire, torch in hand, lava, magma)
execute as @a run scoreboard players operation @s tc_d += @s tc_heat
execute as @a run scoreboard players operation @s tc_d += @s tc_heat
execute as @a run scoreboard players operation @s tc_d += @s tc_heat
# safe camp speeds recovery
execute as @a[scores={tc_camp=2}] run scoreboard players operation @s tc_d += @s tc_heat
# body moves toward the target
execute as @a run scoreboard players operation @s tc_e = @s tc_d
execute as @a run scoreboard players operation @s tc_e -= @s tc_temp
execute as @a[scores={tc_e=1..}] run scoreboard players add @s tc_temp 1
execute as @a[scores={tc_e=..-1}] run scoreboard players remove @s tc_temp 1
execute as @a[scores={tc_heat=3..,tc_e=2..}] run scoreboard players add @s tc_temp 1
execute as @a[scores={tc_heat=3..,tc_e=..-2}] run scoreboard players remove @s tc_temp 1
execute as @a[scores={tc_temp=101..}] run scoreboard players set @s tc_temp 100
execute as @a[scores={tc_temp=..-1}] run scoreboard players set @s tc_temp 0
