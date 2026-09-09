# roll for a heat wave (1 in 3 chance per check, lasts 60s)
execute store result score #wave truecraft run random roll 1 3
execute if score #wave truecraft matches 1 run scoreboard players set #wave truecraft 60
