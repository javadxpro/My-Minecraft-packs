# Give every wandering trader 8 premium trades + a merchant name (1.21 trade NBT)
tag @s add tc_bt
data modify entity @s Offers.Recipes append value {buy:{id:"minecraft:emerald",count:5},sell:{id:"minecraft:saddle",count:1},maxUses:3,rewardExp:1b,priceMultiplier:0.0f}
data modify entity @s Offers.Recipes append value {buy:{id:"minecraft:emerald",count:4},sell:{id:"minecraft:name_tag",count:1},maxUses:4,rewardExp:1b,priceMultiplier:0.0f}
data modify entity @s Offers.Recipes append value {buy:{id:"minecraft:emerald",count:6},sell:{id:"minecraft:golden_apple",count:1},maxUses:3,rewardExp:1b,priceMultiplier:0.0f}
data modify entity @s Offers.Recipes append value {buy:{id:"minecraft:emerald",count:1},sell:{id:"minecraft:ender_pearl",count:4},maxUses:6,rewardExp:1b,priceMultiplier:0.0f}
data modify entity @s Offers.Recipes append value {buy:{id:"minecraft:emerald",count:1},sell:{id:"minecraft:torch",count:24},maxUses:8,rewardExp:1b,priceMultiplier:0.0f}
data modify entity @s Offers.Recipes append value {buy:{id:"minecraft:emerald",count:1},sell:{id:"minecraft:cooked_beef",count:12},maxUses:8,rewardExp:1b,priceMultiplier:0.0f}
data modify entity @s Offers.Recipes append value {buy:{id:"minecraft:emerald",count:2},sell:{id:"minecraft:experience_bottle",count:3},maxUses:5,rewardExp:1b,priceMultiplier:0.0f}
data modify entity @s Offers.Recipes append value {buy:{id:"minecraft:emerald",count:1},sell:{id:"minecraft:arrow",count:24},maxUses:8,rewardExp:1b,priceMultiplier:0.0f}
data modify entity @s CustomName set value '{"text":"Traveling Merchant","color":"gold","italic":false}'
execute as @a[distance=..48] run tellraw @a[distance=..48] {"text":"A Traveling Merchant with premium trades is nearby!","color":"gold"}
