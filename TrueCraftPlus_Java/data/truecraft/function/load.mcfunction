# TrueCraft+ Java - load (runs on world load / datapack reload)
tellraw @a {"text":"[TrueCraft+] Real Survival loaded! Type /function truecraft:help","color":"green"}
scoreboard objectives add truecraft dummy TC
scoreboard objectives add truecraft_cfg dummy CFG
scoreboard objectives add tc_temp dummy Temp
scoreboard objectives add tc_thirst dummy Thirst
scoreboard objectives add tc_wet dummy Wet
scoreboard objectives add tc_zone dummy Zone
scoreboard objectives add tc_zoneL dummy ZoneL
scoreboard objectives add tc_btgt dummy Tgt
scoreboard objectives add tc_heat dummy Heat
scoreboard objectives add tc_camp dummy Camp
scoreboard objectives add tc_ap dummy ArmorKg
scoreboard objectives add tc_lth dummy Lth
scoreboard objectives add tc_irn dummy Irn
scoreboard objectives add tc_chain dummy Chain
scoreboard objectives add tc_gold dummy Gold
scoreboard objectives add tc_pts dummy Points
scoreboard objectives add tc_x dummy X
scoreboard objectives add tc_sneak dummy Snk
scoreboard objectives add tc_sneakprev dummy SnkP
scoreboard objectives add tc_sneaktime minecraft.custom:minecraft.sneak_time
scoreboard objectives add tc_pot dummy Pot
scoreboard objectives add tc_potprev dummy PotP
scoreboard objectives add tc_potions minecraft.used:minecraft.potion
scoreboard objectives add tc_cd dummy CD
scoreboard objectives add tc_day dummy Day
scoreboard objectives add tc_m1 dummy m1
scoreboard objectives add tc_m5 dummy m5
scoreboard objectives add tc_m10 dummy m10
scoreboard objectives add tc_m30 dummy m30
scoreboard objectives add tc_m100 dummy m100
# zone temperature constants
scoreboard players set #z1 truecraft 82
scoreboard players set #z2 truecraft 12
scoreboard players set #z3 truecraft 70
scoreboard players set #z4 truecraft 36
scoreboard players set #z5 truecraft 52
scoreboard players set #z6 truecraft 54
scoreboard players set #z7 truecraft 40
scoreboard players set #z8 truecraft 46
scoreboard players set #z9 truecraft 56
scoreboard players set #z10 truecraft 32
scoreboard players set #z11 truecraft 95
scoreboard players set #z12 truecraft 22
scoreboard players set #two truecraft 2
scoreboard players set #cave truecraft 22
scoreboard players set #w1 truecraft 1
scoreboard players set #w2 truecraft 2
scoreboard players set #w3 truecraft 3
scoreboard players set #w4 truecraft 4
scoreboard players set #w5 truecraft 5
scoreboard players set #w6 truecraft 6
scoreboard players set #w7 truecraft 7
# module defaults (toggle with /scoreboard players set #<name> truecraft_cfg 0|1)
scoreboard players set #temp truecraft_cfg 1
scoreboard players set #thirst truecraft_cfg 1
scoreboard players set #light truecraft_cfg 1
scoreboard players set #trades truecraft_cfg 1
scoreboard players set #hud truecraft_cfg 1
scoreboard players set #discount truecraft_cfg 1
