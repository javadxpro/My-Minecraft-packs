# ate raw meat (beef/porkchop) - 1 in 3 chance of food poisoning
scoreboard players set @s tc_cd 3
execute store result score @s tc_y run random roll 1 3
execute if score @s tc_y matches 1 run function truecraft:survival/get_sick
