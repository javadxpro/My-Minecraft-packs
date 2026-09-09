# drinking a water bottle (detected via minecraft.used:minecraft.potion)
scoreboard players set @s tc_pot 0
scoreboard players set @s tc_potprev 0
execute if score @s tc_heat matches 2.. run function truecraft:survival/drink_boiled
execute if score @s tc_heat matches ..1 run function truecraft:survival/drink_plain
