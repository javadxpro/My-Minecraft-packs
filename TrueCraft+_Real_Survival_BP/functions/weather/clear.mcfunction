# TrueCraft+ - manual weather control
# NOTE: if the TrueCraft+ weather manager is enabled it will keep driving natural
# weather cycles. For fully manual weather run first:
#   /scriptevent truecraft:cfg weatherManage off
weather clear
tellraw @s {"rawtext":[{"text":"§2[TrueCraft+] §fWeather set to clear. §7Deserts will heat up again."}]}
