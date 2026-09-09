# TrueCraft+ Java - configuration (module toggles)
# Each module has a fake-player flag in the truecraft_cfg objective. 1 = on, 0 = off.
# Examples:
#   /scoreboard players set #light truecraft_cfg 0      (dynamic torch light off)
#   /scoreboard players set #temp truecraft_cfg 0       (temperature off)
#   /scoreboard players set #thirst truecraft_cfg 0     (thirst off)
#   /scoreboard players set #trades truecraft_cfg 0     (premium merchant trades off)
#   /scoreboard players set #discount truecraft_cfg 0   (trade discount off)
#   /scoreboard players set #hud truecraft_cfg 0        (action bar HUD off)
# Per-player discount opt-out: /tag @s add tc_no_discount
tellraw @s {"text":"TrueCraft+ module flags (in objective truecraft_cfg):","color":"green"}
tellraw @s [{"text":"#light = ","color":"gray"},{"score":{"name":"#light","objective":"truecraft_cfg"}},{"text":"   #temp = ","color":"gray"},{"score":{"name":"#temp","objective":"truecraft_cfg"}},{"text":"   #thirst = ","color":"gray"},{"score":{"name":"#thirst","objective":"truecraft_cfg"}}]
tellraw @s [{"text":"#trades = ","color":"gray"},{"score":{"name":"#trades","objective":"truecraft_cfg"}},{"text":"   #discount = ","color":"gray"},{"score":{"name":"#discount","objective":"truecraft_cfg"}},{"text":"   #hud = ","color":"gray"},{"score":{"name":"#hud","objective":"truecraft_cfg"}}]
tellraw @s {"text":"Set any to 0 to disable that module. See /function truecraft:help","color":"gray"}
