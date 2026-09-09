# TrueCraft+ Java - clean uninstall
kill @e[type=minecraft:marker,tag=tc_light]
scoreboard objectives remove truecraft
scoreboard objectives remove truecraft_cfg
scoreboard objectives remove tc_temp
scoreboard objectives remove tc_thirst
scoreboard objectives remove tc_wet
scoreboard objectives remove tc_zone
scoreboard objectives remove tc_zoneL
scoreboard objectives remove tc_btgt
scoreboard objectives remove tc_heat
scoreboard objectives remove tc_camp
scoreboard objectives remove tc_ap
scoreboard objectives remove tc_lth
scoreboard objectives remove tc_irn
scoreboard objectives remove tc_chain
scoreboard objectives remove tc_gold
scoreboard objectives remove tc_pts
scoreboard objectives remove tc_x
scoreboard objectives remove tc_sneak
scoreboard objectives remove tc_sneakprev
scoreboard objectives remove tc_sneaktime
scoreboard objectives remove tc_pot
scoreboard objectives remove tc_potprev
scoreboard objectives remove tc_potions
scoreboard objectives remove tc_cd
scoreboard objectives remove tc_day
scoreboard objectives remove tc_m1
scoreboard objectives remove tc_m5
scoreboard objectives remove tc_m10
scoreboard objectives remove tc_m30
scoreboard objectives remove tc_m100
effect clear @a[tag=!tc_no_discount] minecraft:hero_of_the_village
tellraw @a {"text":"[TrueCraft+] Uninstalled. Remove the datapack from the world's datapacks folder.","color":"green"}
