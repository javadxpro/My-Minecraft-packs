# TrueCraft+ LITE - world scan (every 4 seconds)
# ---------- zone detection (ground material = biome proxy) ----------
execute as @a at @s run scoreboard players set @s tc_zone 0
execute as @a at @s unless block ~ ~4 ~ air unless block ~ ~6 ~ air unless block ~ ~8 ~ air run scoreboard players set @s tc_zone 4
execute as @a at @s if block ~ ~-1 ~ sand run scoreboard players set @s tc_zone 1
execute as @a at @s if block ~ ~-1 ~ red_sand run scoreboard players set @s tc_zone 1
execute as @a at @s if block ~ ~-1 ~ snow run scoreboard players set @s tc_zone 2
execute as @a at @s if block ~ ~-1 ~ snow_layer run scoreboard players set @s tc_zone 2
execute as @a at @s if block ~ ~-1 ~ ice run scoreboard players set @s tc_zone 2
execute as @a at @s if block ~ ~-1 ~ packed_ice run scoreboard players set @s tc_zone 2
execute as @a at @s if block ~ ~-1 ~ blue_ice run scoreboard players set @s tc_zone 2
execute as @a at @s if block ~ ~-1 ~ podzol run scoreboard players set @s tc_zone 3
# ---------- armor weight & clothing stats ----------
execute as @a run scoreboard players set @s tc_ap 0
execute as @a run scoreboard players set @s tc_lth 0
execute as @a run scoreboard players set @s tc_irn 0
execute as @a[hasitem={item=leather_helmet,location=slot.armor.head}] run scoreboard players add @s tc_ap 1
execute as @a[hasitem={item=leather_helmet,location=slot.armor.head}] run scoreboard players add @s tc_lth 2
execute as @a[hasitem={item=leather_chestplate,location=slot.armor.chest}] run scoreboard players add @s tc_ap 3
execute as @a[hasitem={item=leather_chestplate,location=slot.armor.chest}] run scoreboard players add @s tc_lth 6
execute as @a[hasitem={item=leather_leggings,location=slot.armor.legs}] run scoreboard players add @s tc_ap 2
execute as @a[hasitem={item=leather_leggings,location=slot.armor.legs}] run scoreboard players add @s tc_lth 4
execute as @a[hasitem={item=leather_boots,location=slot.armor.feet}] run scoreboard players add @s tc_ap 1
execute as @a[hasitem={item=leather_boots,location=slot.armor.feet}] run scoreboard players add @s tc_lth 2
execute as @a[hasitem={item=iron_helmet,location=slot.armor.head}] run scoreboard players add @s tc_ap 2
execute as @a[hasitem={item=iron_helmet,location=slot.armor.head}] run scoreboard players add @s tc_irn 1
execute as @a[hasitem={item=iron_chestplate,location=slot.armor.chest}] run scoreboard players add @s tc_ap 5
execute as @a[hasitem={item=iron_chestplate,location=slot.armor.chest}] run scoreboard players add @s tc_irn 3
execute as @a[hasitem={item=iron_leggings,location=slot.armor.legs}] run scoreboard players add @s tc_ap 4
execute as @a[hasitem={item=iron_leggings,location=slot.armor.legs}] run scoreboard players add @s tc_irn 2
execute as @a[hasitem={item=iron_boots,location=slot.armor.feet}] run scoreboard players add @s tc_ap 2
execute as @a[hasitem={item=iron_boots,location=slot.armor.feet}] run scoreboard players add @s tc_irn 1
execute as @a[hasitem={item=golden_helmet,location=slot.armor.head}] run scoreboard players add @s tc_ap 1
execute as @a[hasitem={item=golden_chestplate,location=slot.armor.chest}] run scoreboard players add @s tc_ap 3
execute as @a[hasitem={item=golden_leggings,location=slot.armor.legs}] run scoreboard players add @s tc_ap 2
execute as @a[hasitem={item=golden_boots,location=slot.armor.feet}] run scoreboard players add @s tc_ap 1
execute as @a[hasitem={item=chainmail_chestplate,location=slot.armor.chest}] run scoreboard players add @s tc_ap 4
execute as @a[hasitem={item=diamond_helmet,location=slot.armor.head}] run scoreboard players add @s tc_ap 3
execute as @a[hasitem={item=diamond_chestplate,location=slot.armor.chest}] run scoreboard players add @s tc_ap 6
execute as @a[hasitem={item=diamond_leggings,location=slot.armor.legs}] run scoreboard players add @s tc_ap 5
execute as @a[hasitem={item=diamond_boots,location=slot.armor.feet}] run scoreboard players add @s tc_ap 2
execute as @a[hasitem={item=netherite_helmet,location=slot.armor.head}] run scoreboard players add @s tc_ap 3
execute as @a[hasitem={item=netherite_chestplate,location=slot.armor.chest}] run scoreboard players add @s tc_ap 7
execute as @a[hasitem={item=netherite_leggings,location=slot.armor.legs}] run scoreboard players add @s tc_ap 5
execute as @a[hasitem={item=netherite_boots,location=slot.armor.feet}] run scoreboard players add @s tc_ap 3
# ---------- heat sources ----------
execute as @a at @s run scoreboard players set @s tc_heat 0
execute as @a at @s if block ~ ~ ~ campfire run scoreboard players add @s tc_heat 3
execute as @a at @s if block ~1 ~ ~ campfire run scoreboard players add @s tc_heat 2
execute as @a at @s if block ~-1 ~ ~ campfire run scoreboard players add @s tc_heat 2
execute as @a at @s if block ~ ~ ~1 campfire run scoreboard players add @s tc_heat 2
execute as @a at @s if block ~ ~ ~-1 campfire run scoreboard players add @s tc_heat 2
execute as @a at @s if block ~2 ~ ~ campfire run scoreboard players add @s tc_heat 1
execute as @a at @s if block ~-2 ~ ~ campfire run scoreboard players add @s tc_heat 1
execute as @a at @s if block ~ ~ ~2 campfire run scoreboard players add @s tc_heat 1
execute as @a at @s if block ~ ~ ~-2 campfire run scoreboard players add @s tc_heat 1
execute as @a at @s if block ~ ~-1 ~ magma run scoreboard players add @s tc_heat 2
execute as @a at @s if block ~ ~-1 ~ lava run scoreboard players add @s tc_heat 3
execute as @a at @s if block ~ ~ ~ lava run scoreboard players add @s tc_heat 3
execute as @a at @s[hasitem={item=torch,location=slot.weapon.mainhand}] run scoreboard players add @s tc_heat 1
execute as @a at @s if block ~1 ~ ~ torch run scoreboard players add @s tc_heat 1
execute as @a at @s if block ~-1 ~ ~ torch run scoreboard players add @s tc_heat 1
execute as @a at @s if block ~ ~ ~1 torch run scoreboard players add @s tc_heat 1
execute as @a at @s if block ~ ~ ~-1 torch run scoreboard players add @s tc_heat 1
execute as @a[scores={tc_heat=6..}] run scoreboard players set @s tc_heat 5
# ---------- camp level (campfire + bed = Safe Camp) ----------
execute as @a at @s run scoreboard players set @s tc_camp 0
execute as @a at @s if score @s tc_heat matches 1.. run scoreboard players set @s tc_camp 1
execute as @a at @s if block ~1 ~ ~ bed if score @s tc_heat matches 1.. run scoreboard players set @s tc_camp 2
execute as @a at @s if block ~-1 ~ ~ bed if score @s tc_heat matches 1.. run scoreboard players set @s tc_camp 2
execute as @a at @s if block ~ ~ ~1 bed if score @s tc_heat matches 1.. run scoreboard players set @s tc_camp 2
execute as @a at @s if block ~ ~ ~-1 bed if score @s tc_heat matches 1.. run scoreboard players set @s tc_camp 2
execute as @a at @s if block ~1 ~ ~1 bed if score @s tc_heat matches 1.. run scoreboard players set @s tc_camp 2
execute as @a at @s if block ~-1 ~ ~-1 bed if score @s tc_heat matches 1.. run scoreboard players set @s tc_camp 2
execute as @a at @s if block ~1 ~ ~-1 bed if score @s tc_heat matches 1.. run scoreboard players set @s tc_camp 2
execute as @a at @s if block ~-1 ~ ~1 bed if score @s tc_heat matches 1.. run scoreboard players set @s tc_camp 2
# ---------- drying ----------
execute as @a[scores={tc_heat=1..}] run scoreboard players remove @s tc_wet 8
execute as @a[scores={tc_wet=1..,tc_zone=1}] if score qnight tc_meta matches 0 run scoreboard players remove @s tc_wet 3
execute as @a[scores={tc_wet=1..}] run scoreboard players remove @s tc_wet 1
execute as @a[scores={tc_wet=..-1}] run scoreboard players set @s tc_wet 0
# ---------- drinking: stand IN fresh water ----------
execute as @a at @s if block ~ ~ ~ water if score @s tc_thirst matches ..95 run scoreboard players add @s tc_thirst 5
execute as @a at @s if block ~ ~ ~ water run scoreboard players add @s tc_wet 10
execute as @a[scores={tc_wet=101..}] run scoreboard players set @s tc_wet 100
# raw water sickness (unless warming by a fire)
execute as @a at @s if block ~ ~ ~ water if score qm11 tc_meta matches 4 if score @s tc_heat matches ..0 run effect @s nausea 9 0 true
execute as @a at @s if block ~ ~ ~ water if score qm11 tc_meta matches 4 if score @s tc_heat matches ..0 run effect @s hunger 9 0 true
execute as @a at @s if block ~ ~ ~ water if score qm11 tc_meta matches 4 if score @s tc_heat matches ..0 run tellraw @s {"rawtext":[{"text":"§7That water tasted dirty... boil your drinks near a campfire."}]}
# eat snow (cold zones): small sip, chills you
execute as @a at @s if block ~ ~-1 ~ snow if score @s tc_thirst matches ..97 run scoreboard players add @s tc_thirst 2
execute as @a at @s if block ~ ~-1 ~ snow_layer if score @s tc_thirst matches ..97 run scoreboard players add @s tc_thirst 2
execute as @a at @s if block ~ ~-1 ~ snow run scoreboard players remove @s tc_temp 1
execute as @a at @s if block ~ ~-1 ~ snow_layer run scoreboard players remove @s tc_temp 1
# ---------- discovery messages ----------
# zone changed? (tc_x = new zone - old zone; avoids the != operator for old parsers)
execute as @a run scoreboard players operation @s tc_x = @s tc_zone
execute as @a run scoreboard players operation @s tc_x -= @s tc_zoneL
execute as @a[scores={tc_zone=1}] if score @s tc_x matches ..-1 run tellraw @s {"rawtext":[{"text":"§6New area discovered: Desert §7(+3 pts)"}]}
execute as @a[scores={tc_zone=1}] if score @s tc_x matches ..-1 run scoreboard players add @s tc_points 3
execute as @a[scores={tc_zone=2}] if score @s tc_x matches ..-1 run tellraw @s {"rawtext":[{"text":"§bNew area discovered: Snowfields §7(+3 pts)"}]}
execute as @a[scores={tc_zone=2}] if score @s tc_x matches ..-1 run scoreboard players add @s tc_points 3
execute as @a[scores={tc_zone=3}] if score @s tc_x matches ..-1 run tellraw @s {"rawtext":[{"text":"§2New area discovered: Cold Forest §7(+3 pts)"}]}
execute as @a[scores={tc_zone=3}] if score @s tc_x matches ..-1 run scoreboard players add @s tc_points 3
execute as @a[scores={tc_zone=4}] if score @s tc_x matches ..-1 run tellraw @s {"rawtext":[{"text":"§7New area discovered: Shelter/Cave §7(+3 pts)"}]}
execute as @a[scores={tc_zone=4}] if score @s tc_x matches ..-1 run scoreboard players add @s tc_points 3
execute as @a[scores={tc_zone=0}] if score @s tc_x matches ..-1 run tellraw @s {"rawtext":[{"text":"§aNew area discovered: Open Plains §7(+3 pts)"}]}
execute as @a[scores={tc_zone=0}] if score @s tc_x matches ..-1 run scoreboard players add @s tc_points 3
execute as @a run scoreboard players operation @s tc_zoneL = @s tc_zone
