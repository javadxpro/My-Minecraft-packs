# drank from the canteen (+80, always purified) - hand back the empty canteen
execute if score #thirst truecraft_cfg matches 1 run scoreboard players add @s tc_thirst 80
tellraw @s {"text":"+ You drink from your canteen - clean, cold water (+80)","color":"aqua"}
give @s minecraft:bowl[minecraft:custom_name='{"text":"Canteen (Empty)","italic":false,"color":"#B8873B"}',minecraft:custom_data={tc_id:"canteen_empty"},minecraft:lore=['{"text":"Fill: craft with a water bottle","color":"gray","italic":false}']]
