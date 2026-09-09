# TrueCraft+ LITE - survival milestones (play-time days)
execute if score qday tc_meta matches 1.. if score qf1 tc_meta matches 0 run tellraw @a {"rawtext":[{"text":"§6Milestone - Day 1: §fBuild a shelter §7(+5 pts to everyone)"}]}
execute if score qday tc_meta matches 1.. if score qf1 tc_meta matches 0 run scoreboard players add @a tc_points 5
execute if score qday tc_meta matches 1.. if score qf1 tc_meta matches 0 run scoreboard players set qf1 tc_meta 1
execute if score qday tc_meta matches 5.. if score qf5 tc_meta matches 0 run tellraw @a {"rawtext":[{"text":"§6Milestone - Day 5: §fCreate a food source §7(+10 pts)"}]}
execute if score qday tc_meta matches 5.. if score qf5 tc_meta matches 0 run scoreboard players add @a tc_points 10
execute if score qday tc_meta matches 5.. if score qf5 tc_meta matches 0 run scoreboard players set qf5 tc_meta 1
execute if score qday tc_meta matches 10.. if score qf10 tc_meta matches 0 run tellraw @a {"rawtext":[{"text":"§6Milestone - Day 10: §fPrepare equipment §7(+15 pts)"}]}
execute if score qday tc_meta matches 10.. if score qf10 tc_meta matches 0 run scoreboard players add @a tc_points 15
execute if score qday tc_meta matches 10.. if score qf10 tc_meta matches 0 run scoreboard players set qf10 tc_meta 1
execute if score qday tc_meta matches 30.. if score qf30 tc_meta matches 0 run tellraw @a {"rawtext":[{"text":"§6Milestone - Day 30: §fBuild a permanent home §7(+30 pts)"}]}
execute if score qday tc_meta matches 30.. if score qf30 tc_meta matches 0 run scoreboard players add @a tc_points 30
execute if score qday tc_meta matches 30.. if score qf30 tc_meta matches 0 run scoreboard players set qf30 tc_meta 1
execute if score qday tc_meta matches 100.. if score qf100 tc_meta matches 0 run tellraw @a {"rawtext":[{"text":"§6Milestone - Day 100: §fComplete survival base! §7(+100 pts)"}]}
execute if score qday tc_meta matches 100.. if score qf100 tc_meta matches 0 run scoreboard players add @a tc_points 100
execute if score qday tc_meta matches 100.. if score qf100 tc_meta matches 0 run scoreboard players set qf100 tc_meta 1
