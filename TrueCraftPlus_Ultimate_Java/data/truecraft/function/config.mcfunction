# TrueCraft+ Ultimate - configuration
# Toggle modules: /scoreboard players set #<flag> truecraft_cfg 0|1
#   #temp #thirst #stamina #light #trades #discount #hud #foods
tellraw @s [{"text":"#temp = ","color":"gray"},{"score":{"name":"#temp","objective":"truecraft_cfg"}},{"text":"   #thirst = ","color":"gray"},{"score":{"name":"#thirst","objective":"truecraft_cfg"}},{"text":"   #stamina = ","color":"gray"},{"score":{"name":"#stamina","objective":"truecraft_cfg"}}]
tellraw @s [{"text":"#light = ","color":"gray"},{"score":{"name":"#light","objective":"truecraft_cfg"}},{"text":"   #trades = ","color":"gray"},{"score":{"name":"#trades","objective":"truecraft_cfg"}},{"text":"   #discount = ","color":"gray"},{"score":{"name":"#discount","objective":"truecraft_cfg"}}]
tellraw @s [{"text":"#hud = ","color":"gray"},{"score":{"name":"#hud","objective":"truecraft_cfg"}},{"text":"   #foods = ","color":"gray"},{"score":{"name":"#foods","objective":"truecraft_cfg"}}]
tellraw @s {"text":"Set any flag to 0 to disable that module, 1 to enable. Per-player discount opt-out: /tag @s add tc_no_discount","color":"gray"}
