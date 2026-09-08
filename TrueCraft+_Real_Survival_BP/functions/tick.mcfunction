# TrueCraft+ Real Survival - master clock (registered in functions/tick.json)
#
# The full survival simulation (temperature, thirst, weight, camping, exploration,
# weather, ambience) runs in scripts/main.js through the Script API. One script
# interval per second costs a fraction of the CPU of command-based ticking, which
# keeps mobile FPS stable and RAM low.
#
# This function intentionally stays lightweight. It is a safe vanilla-side hook
# point for your own extensions and keeps a world clock score for other modules.

scoreboard players add #tc_clock tc_meta 1

# --- module hooks (extend here) ---
# function temperature/status
# function thirst/status
