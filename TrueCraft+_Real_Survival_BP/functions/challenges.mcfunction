# TrueCraft+ - milestone / progression overview
# Live announcements run in scripts/challenges.js.
# Goals:
#   Day 1   - Build a shelter
#   Day 5   - Create a food source
#   Day 10  - Prepare equipment
#   Day 30  - Build a permanent home
#   Day 100 - Create a complete survival base

tellraw @s {"rawtext":[{"text":"§6=== Survival milestones ==="}]}
tellraw @s {"rawtext":[{"text":"§eDay 1: §fBuild a shelter §7(+5 pts on reach)"}]}
tellraw @s {"rawtext":[{"text":"§eDay 5: §fCreate a food source §7(+10 pts)"}]}
tellraw @s {"rawtext":[{"text":"§eDay 10: §fPrepare equipment §7(+15 pts)"}]}
tellraw @s {"rawtext":[{"text":"§eDay 30: §fBuild a permanent home §7(+30 pts)"}]}
tellraw @s {"rawtext":[{"text":"§eDay 100: §fCreate a complete survival base §7(+100 pts)"}]}
tellraw @s {"rawtext":[{"text":"§7Your day: §f"},{"score":{"name":"*","objective":"tc_days"}}]}
