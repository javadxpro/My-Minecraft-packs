# TrueCraft+ Ultimate - environment scan (armor/clothes, biome, heat, camp, wet, drinks)
# ---------- stamina init ----------
execute as @a[tag=!tc_stinit] run scoreboard players set @s tc_sta 100
execute as @a[tag=!tc_stinit] run tag @s add tc_stinit
# ---------- armor weight & clothing stats ----------
scoreboard players set @a tc_ap 0
scoreboard players set @a tc_lth 0
scoreboard players set @a tc_irn 0
scoreboard players set @a tc_chain 0
scoreboard players set @a tc_gold 0
# leather 1/3/2/1 + insulation
execute as @a store success score @s tc_x if predicate truecraft:armor/leather_head
execute as @a run scoreboard players operation @s tc_x *= #w1 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a run scoreboard players operation @s tc_lth += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:armor/leather_chest
execute as @a run scoreboard players operation @s tc_x *= #w3 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a run scoreboard players operation @s tc_lth += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:armor/leather_legs
execute as @a run scoreboard players operation @s tc_x *= #w2 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a run scoreboard players operation @s tc_lth += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:armor/leather_feet
execute as @a run scoreboard players operation @s tc_x *= #w1 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a run scoreboard players operation @s tc_lth += @s tc_x
# iron 2/5/4/2 + conduction
execute as @a store success score @s tc_x if predicate truecraft:armor/iron_head
execute as @a run scoreboard players operation @s tc_x *= #w2 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a run scoreboard players operation @s tc_irn += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:armor/iron_chest
execute as @a run scoreboard players operation @s tc_x *= #w5 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a run scoreboard players operation @s tc_irn += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:armor/iron_legs
execute as @a run scoreboard players operation @s tc_x *= #w4 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a run scoreboard players operation @s tc_irn += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:armor/iron_feet
execute as @a run scoreboard players operation @s tc_x *= #w2 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a run scoreboard players operation @s tc_irn += @s tc_x
# chainmail 1/4/3/1 + breathability
execute as @a store success score @s tc_x if predicate truecraft:armor/chain_head
execute as @a run scoreboard players operation @s tc_x *= #w1 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a run scoreboard players operation @s tc_chain += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:armor/chain_chest
execute as @a run scoreboard players operation @s tc_x *= #w4 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a run scoreboard players operation @s tc_chain += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:armor/chain_legs
execute as @a run scoreboard players operation @s tc_x *= #w3 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a run scoreboard players operation @s tc_chain += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:armor/chain_feet
execute as @a run scoreboard players operation @s tc_x *= #w1 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a run scoreboard players operation @s tc_chain += @s tc_x
# gold 1/3/2/1 + absorption
execute as @a store success score @s tc_x if predicate truecraft:armor/gold_head
execute as @a run scoreboard players operation @s tc_x *= #w1 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a run scoreboard players operation @s tc_gold += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:armor/gold_chest
execute as @a run scoreboard players operation @s tc_x *= #w3 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a run scoreboard players operation @s tc_gold += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:armor/gold_legs
execute as @a run scoreboard players operation @s tc_x *= #w2 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a run scoreboard players operation @s tc_gold += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:armor/gold_feet
execute as @a run scoreboard players operation @s tc_x *= #w1 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a run scoreboard players operation @s tc_gold += @s tc_x
# diamond 3/6/5/2
execute as @a store success score @s tc_x if predicate truecraft:armor/diamond_head
execute as @a run scoreboard players operation @s tc_x *= #w3 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:armor/diamond_chest
execute as @a run scoreboard players operation @s tc_x *= #w6 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:armor/diamond_legs
execute as @a run scoreboard players operation @s tc_x *= #w5 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:armor/diamond_feet
execute as @a run scoreboard players operation @s tc_x *= #w2 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
# netherite 3/7/5/3
execute as @a store success score @s tc_x if predicate truecraft:armor/netherite_head
execute as @a run scoreboard players operation @s tc_x *= #w3 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:armor/netherite_chest
execute as @a run scoreboard players operation @s tc_x *= #w7 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:armor/netherite_legs
execute as @a run scoreboard players operation @s tc_x *= #w5 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:armor/netherite_feet
execute as @a run scoreboard players operation @s tc_x *= #w3 truecraft
execute as @a run scoreboard players operation @s tc_ap += @s tc_x
# ---------- custom clothing (Ultimate) ----------
# fur set: warm clothing - counts as strong insulation
execute as @a store success score @s tc_x if predicate truecraft:item/fur_hood
execute as @a run scoreboard players operation @s tc_lth += @s tc_x
execute as @a run scoreboard players operation @s tc_lth += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:item/fur_coat
execute as @a run scoreboard players operation @s tc_lth += @s tc_x
execute as @a run scoreboard players operation @s tc_lth += @s tc_x
execute as @a run scoreboard players operation @s tc_lth += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:item/fur_boots
execute as @a run scoreboard players operation @s tc_lth += @s tc_x
execute as @a run scoreboard players operation @s tc_lth += @s tc_x
# desert set: light breathable fabric
execute as @a store success score @s tc_x if predicate truecraft:item/desert_hood
execute as @a run scoreboard players operation @s tc_chain += @s tc_x
execute as @a run scoreboard players operation @s tc_chain += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:item/desert_robes
execute as @a run scoreboard players operation @s tc_chain += @s tc_x
execute as @a run scoreboard players operation @s tc_chain += @s tc_x
execute as @a run scoreboard players operation @s tc_chain += @s tc_x
execute as @a store success score @s tc_x if predicate truecraft:item/desert_boots
execute as @a run scoreboard players operation @s tc_chain += @s tc_x
# backpack: lightens your load (its own weight does not count)
execute as @a store success score @s tc_x if predicate truecraft:item/backpack
execute as @a[scores={tc_ap=3..}] if score @s tc_x matches 1 run scoreboard players remove @s tc_ap 3
# ---------- biome zone ----------
execute as @a at @s run scoreboard players set @s tc_zone 6
execute as @a at @s if biome ~ ~ ~ #minecraft:is_forest run scoreboard players set @s tc_zone 5
execute as @a at @s if biome ~ ~ ~ #minecraft:is_taiga run scoreboard players set @s tc_zone 4
execute as @a at @s if biome ~ ~ ~ #minecraft:is_jungle run scoreboard players set @s tc_zone 3
execute as @a at @s if biome ~ ~ ~ #minecraft:is_ocean run scoreboard players set @s tc_zone 7
execute as @a at @s if biome ~ ~ ~ #minecraft:is_river run scoreboard players set @s tc_zone 8
execute as @a at @s if biome ~ ~ ~ #minecraft:is_beach run scoreboard players set @s tc_zone 9
execute as @a at @s if biome ~ ~ ~ #minecraft:is_mountain run scoreboard players set @s tc_zone 10
execute as @a at @s if biome ~ ~ ~ #truecraft:hot_biomes run scoreboard players set @s tc_zone 1
execute as @a at @s if biome ~ ~ ~ #truecraft:cold_biomes run scoreboard players set @s tc_zone 2
execute as @a at @s if biome ~ ~ ~ #minecraft:is_nether run scoreboard players set @s tc_zone 11
execute as @a at @s if biome ~ ~ ~ #minecraft:is_end run scoreboard players set @s tc_zone 12
# ---------- heat sources ----------
execute as @a at @s run scoreboard players set @s tc_heat 0
execute as @a at @s if block ~ ~ ~ minecraft:campfire run scoreboard players add @s tc_heat 3
execute as @a at @s if block ~ ~-1 ~ minecraft:campfire run scoreboard players add @s tc_heat 2
execute as @a at @s if block ~1 ~ ~ minecraft:campfire run scoreboard players add @s tc_heat 2
execute as @a at @s if block ~-1 ~ ~ minecraft:campfire run scoreboard players add @s tc_heat 2
execute as @a at @s if block ~ ~ ~1 minecraft:campfire run scoreboard players add @s tc_heat 2
execute as @a at @s if block ~ ~ ~-1 minecraft:campfire run scoreboard players add @s tc_heat 2
execute as @a at @s if block ~2 ~ ~ minecraft:campfire run scoreboard players add @s tc_heat 1
execute as @a at @s if block ~-2 ~ ~ minecraft:campfire run scoreboard players add @s tc_heat 1
execute as @a at @s if block ~ ~ ~2 minecraft:campfire run scoreboard players add @s tc_heat 1
execute as @a at @s if block ~ ~ ~-2 minecraft:campfire run scoreboard players add @s tc_heat 1
execute as @a at @s if block ~ ~-1 ~ minecraft:magma run scoreboard players add @s tc_heat 2
execute as @a at @s if block ~ ~-1 ~ minecraft:lava run scoreboard players add @s tc_heat 3
execute as @a at @s if block ~ ~ ~ minecraft:lava run scoreboard players add @s tc_heat 3
execute as @a[predicate=truecraft:hold/torch] at @s run scoreboard players add @s tc_heat 1
execute as @a at @s if block ~1 ~ ~ minecraft:torch run scoreboard players add @s tc_heat 1
execute as @a at @s if block ~-1 ~ ~ minecraft:torch run scoreboard players add @s tc_heat 1
execute as @a at @s if block ~ ~ ~1 minecraft:torch run scoreboard players add @s tc_heat 1
execute as @a at @s if block ~ ~ ~-1 minecraft:torch run scoreboard players add @s tc_heat 1
execute as @a[scores={tc_heat=6..}] run scoreboard players set @s tc_heat 5
# ---------- camp levels ----------
# 1 = campfire warmth | 2 = campfire + bed (safe camp) | 3 = permanent base (fire+bed+chest+furnace)
execute as @a at @s run scoreboard players set @s tc_camp 0
execute as @a at @s if score @s tc_heat matches 1.. run scoreboard players set @s tc_camp 1
execute as @a at @s if block ~1 ~ ~ #minecraft:beds if score @s tc_heat matches 1.. run scoreboard players set @s tc_camp 2
execute as @a at @s if block ~-1 ~ ~ #minecraft:beds if score @s tc_heat matches 1.. run scoreboard players set @s tc_camp 2
execute as @a at @s if block ~ ~ ~1 #minecraft:beds if score @s tc_heat matches 1.. run scoreboard players set @s tc_camp 2
execute as @a at @s if block ~ ~ ~-1 #minecraft:beds if score @s tc_heat matches 1.. run scoreboard players set @s tc_camp 2
execute as @a at @s if block ~1 ~ ~1 #minecraft:beds if score @s tc_heat matches 1.. run scoreboard players set @s tc_camp 2
execute as @a at @s if block ~-1 ~ ~-1 #minecraft:beds if score @s tc_heat matches 1.. run scoreboard players set @s tc_camp 2
execute as @a at @s if block ~1 ~ ~-1 #minecraft:beds if score @s tc_heat matches 1.. run scoreboard players set @s tc_camp 2
execute as @a at @s if block ~-1 ~ ~1 #minecraft:beds if score @s tc_heat matches 1.. run scoreboard players set @s tc_camp 2
execute as @a at @s if score @s tc_camp matches 2 run function truecraft:survival/camp3
# camp benefits
execute as @a[scores={tc_camp=2}] run effect give @s minecraft:regeneration 3 0 true
execute as @a[scores={tc_camp=3}] run effect give @s minecraft:regeneration 3 0 true
# ---------- wetness ----------
execute as @a at @s if block ~ ~ ~ minecraft:water run scoreboard players add @s tc_wet 10
execute as @a[scores={tc_wet=101..}] run scoreboard players set @s tc_wet 100
execute as @a[scores={tc_wet=1..}] if predicate truecraft:env/raining if predicate truecraft:env/open_sky run scoreboard players add @s tc_wet 2
execute as @a[scores={tc_wet=101..}] run scoreboard players set @s tc_wet 100
execute as @a[scores={tc_heat=1..}] run scoreboard players remove @s tc_wet 8
execute as @a[scores={tc_wet=1..,tc_zone=1}] unless predicate truecraft:env/night if predicate truecraft:env/open_sky run scoreboard players remove @s tc_wet 3
execute as @a[scores={tc_wet=1..}] run scoreboard players remove @s tc_wet 1
execute as @a[scores={tc_wet=..0}] run scoreboard players set @s tc_wet 0
# ---------- drinking (sneak interactions) ----------
execute as @a[scores={tc_sneak=10..,tc_cd=0}] at @s if block ~ ~ ~ minecraft:water run function truecraft:survival/drink_raw
execute as @a[scores={tc_sneak=10..,tc_cd=0}] at @s if block ~ ~-1 ~ minecraft:snow run function truecraft:survival/eat_snow
execute as @a[scores={tc_sneak=10..,tc_cd=0}] at @s if block ~ ~-1 ~ minecraft:snow_block run function truecraft:survival/eat_snow
execute as @a[scores={tc_pot=1..}] run function truecraft:survival/drink_bottle
# ---------- fall injuries ----------
execute as @a run scoreboard players operation @s tc_x = @s tc_fall
execute as @a run scoreboard players operation @s tc_x -= @s tc_fallprev
execute as @a run scoreboard players operation @s tc_fallprev = @s tc_fall
execute as @a[scores={tc_x=300..,tc_cd=0}] run function truecraft:survival/fall_injury
