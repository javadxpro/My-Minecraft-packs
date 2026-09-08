# TrueCraft+ Real Survival - world setup
# Runs automatically from scripts/main.js on world load, but can also be run by hand.
# Safe to run any time (re-adding an existing objective is harmless).

scoreboard objectives add tc_temp dummy "Temp"
scoreboard objectives add tc_thirst dummy "Thirst"
scoreboard objectives add tc_weight dummy "Weight"
scoreboard objectives add tc_wet dummy "Wetness"
scoreboard objectives add tc_points dummy "Exploration"
scoreboard objectives add tc_days dummy "Days"
scoreboard objectives add tc_camp dummy "Camp"
scoreboard objectives add tc_meta dummy TC

tellraw @a {"rawtext":[{"text":"§2[TrueCraft+] §fSetup complete. Type §e/function help §ffor the survival guide."}]}
