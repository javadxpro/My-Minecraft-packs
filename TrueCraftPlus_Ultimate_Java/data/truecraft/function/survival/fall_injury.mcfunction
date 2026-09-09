# fall injury: big falls strain your legs (tc_x = fall distance in cm this second)
execute as @a[scores={tc_x=300..599}] run function truecraft:survival/injury_minor
execute as @a[scores={tc_x=600..}] run function truecraft:survival/injury_major
