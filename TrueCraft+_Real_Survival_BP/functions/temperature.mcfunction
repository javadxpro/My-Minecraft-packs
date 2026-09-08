# TrueCraft+ - temperature module (vanilla-side view)
# The live simulation runs in scripts/temperature.js.
# This shows each player's body temperature (0 freezing .. 100 heat exhaustion)
# on their action bar. Useful for debugging or playing with scripts disabled.

titleraw @a actionbar {"rawtext":[{"text":"§bTemperature: §f"},{"score":{"name":"*","objective":"tc_temp"}}," ",{"text":"§7(0 freezing / 50 comfy / 100 overheating)"}]}
