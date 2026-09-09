# TrueCraft+ LITE - DOCTOR: finds exactly what is not working on your client
# Run: /function lite/doctor  (run it twice, a few seconds apart)
tellraw @s {"rawtext":[{"text":"§e=== TrueCraft+ LITE Doctor ==="}]}
# 1) did the auto-setup (boot) run?
execute if score qinit tc_meta matches 1 run tellraw @s {"rawtext":[{"text":"§2[OK] §fAuto-setup ran."}]}
execute unless score qinit tc_meta matches 1 run tellraw @s {"rawtext":[{"text":"§c[PROBLEM] §fAuto-setup never ran. Fix: type §e/function setup"}]}
# 2) is the automatic per-second clock (tick.json) advancing? Compare this number
#    with the next doctor run: if it did not grow, your client is not running tick.json.
tellraw @s {"rawtext":[{"text":"§fClock counter: §e"},{"score":{"name":"qt","objective":"tc_meta"}},{"text":" §7(run doctor again - if this number grew, the clock works)"}]}
# 3) action bar rendering test
titleraw @s actionbar {"rawtext":[{"text":"§aACTIONBAR TEST §7- if you can read this above your hotbar, the HUD works"}]}
tellraw @s {"rawtext":[{"text":"§fDid the green ACTIONBAR TEST appear above your hotbar? §7If NO, run §e/function lite/hud_sidebar §fto use the sidebar HUD instead."}]}
# 4) your current survival values (blank = simulation not started yet)
tellraw @s {"rawtext":[{"text":"§fYour values - Temp: §b"},{"score":{"name":"*","objective":"tc_temp"}},{"text":" §fThirst: §9"},{"score":{"name":"*","objective":"tc_thirst"}},{"text":" §fWet: §7"},{"score":{"name":"*","objective":"tc_wet"}},{"text":" §fPoints: §a"},{"score":{"name":"*","objective":"tc_points"}},{"text":" §fZone: §6"},{"score":{"name":"*","objective":"tc_zone"}}]}
tellraw @s {"rawtext":[{"text":"§7If values are blank but setup is OK, walk around 5 seconds - the clock fills them in."}]}
