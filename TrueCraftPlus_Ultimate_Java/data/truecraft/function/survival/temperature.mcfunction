# TrueCraft+ Ultimate - temperature (0-100, new thresholds)
# 0-10 critical freezing | 10-30 cold | 30-70 comfort | 70-90 hot | 90-100 heat stroke
# ---- zone base ----
execute as @a[scores={tc_zone=1}] run scoreboard players operation @s tc_btgt = #z1 truecraft
execute as @a[scores={tc_zone=2}] run scoreboard players operation @s tc_btgt = #z2 truecraft
execute as @a[scores={tc_zone=3}] run scoreboard players operation @s tc_btgt = #z3 truecraft
execute as @a[scores={tc_zone=4}] run scoreboard players operation @s tc_btgt = #z4 truecraft
execute as @a[scores={tc_zone=5}] run scoreboard players operation @s tc_btgt = #z5 truecraft
execute as @a[scores={tc_zone=6}] run scoreboard players operation @s tc_btgt = #z6 truecraft
execute as @a[scores={tc_zone=7}] run scoreboard players operation @s tc_btgt = #z7 truecraft
execute as @a[scores={tc_zone=8}] run scoreboard players operation @s tc_btgt = #z8 truecraft
execute as @a[scores={tc_zone=9}] run scoreboard players operation @s tc_btgt = #z9 truecraft
execute as @a[scores={tc_zone=10}] run scoreboard players operation @s tc_btgt = #z10 truecraft
execute as @a[scores={tc_zone=11}] run scoreboard players operation @s tc_btgt = #z11 truecraft
execute as @a[scores={tc_zone=12}] run scoreboard players operation @s tc_btgt = #z12 truecraft
# ---- shelter: enclosed spaces blend toward cave temperature ----
execute as @a unless predicate truecraft:env/open_sky run scoreboard players operation @s tc_btgt /= #two truecraft
execute as @a unless predicate truecraft:env/open_sky run scoreboard players operation @s tc_btgt += #cave truecraft
# ---- underground bases: deep = stable temperature year-round ----
execute as @a[y=..30] unless predicate truecraft:env/open_sky at @s run function truecraft:survival/underground
# ---- night is colder ----
execute as @a if predicate truecraft:env/night run scoreboard players remove @s tc_btgt 10
# mountains extra cold at night
execute as @a[scores={tc_zone=10}] if predicate truecraft:env/night run scoreboard players remove @s tc_btgt 6
# ---- rain chill when exposed (snow biomes freeze harder) ----
execute as @a if predicate truecraft:env/raining if predicate truecraft:env/open_sky run scoreboard players remove @s tc_btgt 8
execute as @a[scores={tc_zone=2}] if predicate truecraft:env/raining run scoreboard players remove @s tc_btgt 6
# ---- heat wave ----
execute as @a[scores={tc_zone=1}] if score #wave truecraft matches 1.. run scoreboard players add @s tc_btgt 8
# ---- wet clothes steal warmth ----
execute as @a[scores={tc_wet=31..}] run scoreboard players remove @s tc_btgt 10
# ---- clothing physics ----
# leather + fur set: insulation in cold zones
execute as @a[scores={tc_zone=2}] run scoreboard players operation @s tc_btgt += @s tc_lth
execute as @a[scores={tc_zone=4}] run scoreboard players operation @s tc_btgt += @s tc_lth
execute as @a[scores={tc_zone=10}] run scoreboard players operation @s tc_btgt += @s tc_lth
# iron conducts: colder in cold, hotter in heat
execute as @a[scores={tc_zone=2}] run scoreboard players operation @s tc_btgt -= @s tc_irn
execute as @a[scores={tc_zone=2}] run scoreboard players operation @s tc_btgt -= @s tc_irn
execute as @a[scores={tc_zone=4}] run scoreboard players operation @s tc_btgt -= @s tc_irn
execute as @a[scores={tc_zone=4}] run scoreboard players operation @s tc_btgt -= @s tc_irn
execute as @a[scores={tc_zone=10}] run scoreboard players operation @s tc_btgt -= @s tc_irn
execute as @a[scores={tc_zone=10}] run scoreboard players operation @s tc_btgt -= @s tc_irn
execute as @a[scores={tc_zone=1}] run scoreboard players operation @s tc_btgt += @s tc_irn
execute as @a[scores={tc_zone=1}] run scoreboard players operation @s tc_btgt += @s tc_irn
execute as @a[scores={tc_zone=1}] run scoreboard players operation @s tc_btgt += @s tc_irn
execute as @a[scores={tc_zone=3}] run scoreboard players operation @s tc_btgt += @s tc_irn
execute as @a[scores={tc_zone=11}] run scoreboard players operation @s tc_btgt += @s tc_irn
# chainmail + desert robes breathe in heat
execute as @a[scores={tc_zone=1}] run scoreboard players operation @s tc_btgt -= @s tc_chain
execute as @a[scores={tc_zone=1}] run scoreboard players operation @s tc_btgt -= @s tc_chain
execute as @a[scores={tc_zone=1}] run scoreboard players operation @s tc_btgt -= @s tc_chain
execute as @a[scores={tc_zone=3}] run scoreboard players operation @s tc_btgt -= @s tc_chain
execute as @a[scores={tc_zone=3}] run scoreboard players operation @s tc_btgt -= @s tc_chain
execute as @a[scores={tc_zone=3}] run scoreboard players operation @s tc_btgt -= @s tc_chain
# gold absorbs the sun
execute as @a[scores={tc_zone=1}] unless predicate truecraft:env/night if predicate truecraft:env/open_sky run scoreboard players operation @s tc_btgt += @s tc_gold
execute as @a[scores={tc_zone=1}] unless predicate truecraft:env/night if predicate truecraft:env/open_sky run scoreboard players operation @s tc_btgt += @s tc_gold
# ---- nearby heat ----
execute as @a run scoreboard players operation @s tc_btgt += @s tc_heat
execute as @a run scoreboard players operation @s tc_btgt += @s tc_heat
execute as @a run scoreboard players operation @s tc_btgt += @s tc_heat
execute as @a[scores={tc_camp=2..}] run scoreboard players operation @s tc_btgt += @s tc_heat
# ---- body drifts toward target ----
execute as @a run scoreboard players operation @s tc_x = @s tc_btgt
execute as @a run scoreboard players operation @s tc_x -= @s tc_temp
execute as @a[scores={tc_x=1..}] run scoreboard players add @s tc_temp 1
execute as @a[scores={tc_x=..-1}] run scoreboard players remove @s tc_temp 1
execute as @a[scores={tc_heat=3..,tc_x=2..}] run scoreboard players add @s tc_temp 1
execute as @a[scores={tc_heat=3..,tc_x=..-2}] run scoreboard players remove @s tc_temp 1
execute as @a[scores={tc_temp=101..}] run scoreboard players set @s tc_temp 100
execute as @a[scores={tc_temp=..-1}] run scoreboard players set @s tc_temp 0
