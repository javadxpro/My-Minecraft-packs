# TrueCraft+ - manual weather control
# NOTE: if the TrueCraft+ weather manager is enabled it will keep driving natural
# weather cycles. For fully manual weather run first:
#   /scriptevent truecraft:cfg weatherManage off
weather rain
tellraw @s {"rawtext":[{"text":"§2[TrueCraft+] §fWeather set to rain. §7Cold biomes now get snow; rain makes you wet and cold."}]}
