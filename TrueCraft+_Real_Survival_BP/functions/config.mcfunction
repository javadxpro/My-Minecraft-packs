# TrueCraft+ Real Survival - configuration
# Every module can be toggled at runtime with /scriptevent (works in chat or functions):
#
#   /scriptevent truecraft:cfg <module> <on|off>
#
# Modules:
#   temp          realistic body temperature system
#   thirst        hydration system
#   weight        equipment weight and encumbrance
#   camping       safe camp detection and effects
#   weatherManage let TrueCraft+ drive realistic weather cycles (/weather rain ... etc.)
#   ruins         abandoned camps, ruins and storage boxes
#   animals       natural animal behavior tweaks
#   ambient       fog, wind and ember particles
#   challenges    milestone announcements
#   hardMode      faster drains, harsher effects
#   hud           action bar status display
#
# Examples:
#   /scriptevent truecraft:cfg hud off
#   /scriptevent truecraft:cfg temp on
#
# Other script commands:
#   /scriptevent truecraft:status     print your survival status in chat
#   /scriptevent truecraft:weather clear|rain|thunder   set weather manually
#   /scriptevent truecraft:ruin       try to spawn a ruin near you (testing)
#   /scriptevent truecraft:reset      wipe ALL TrueCraft+ data in this world

tellraw @s {"rawtext":[{"text":"§2[TrueCraft+] §fConfig: run §e/scriptevent truecraft:cfg <module> <on|off>"}]}
tellraw @s {"rawtext":[{"text":"§7modules: temp thirst weight camping weatherManage ruins animals ambient challenges hardMode hud"}]}
tellraw @s {"rawtext":[{"text":"§7also: §e/scriptevent truecraft:status §7| §e/scriptevent truecraft:reset"}]}
