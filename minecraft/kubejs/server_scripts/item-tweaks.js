
ItemEvents.foodEaten("minecraft:glow_berries", event => {
    // Apply glowing for 60 seconds (20 ticks * 60 = 1200)
    event.entity.potionEffects.add("minecraft:glowing", 20 * 60, 0, false, true);
});


ServerEvents.recipes(event => {
  // Have to revert the enderchest recipe as it"s changed by another mod
  // event.shaped(
  //   Item.of("minecraft:ender_chest", 1),
  //   [
  //     "AAA",
  //     "ABA",
  //     "AAA"
  //   ],
  //   {
  //     A: "minecraft:obsidian",
  //     B: "minecraft:ender_eye",
  //   }
  // )


  // Way to summon the doppelganger cause you cannot do void items due to Spellunkery.
  event.shaped(
    Item.of("darkdoppelganger:summon_scroll", 1),
    [
      "ABA",
      "ACA",
      "AAA"
    ],
    {
      A: "avaritia:crystal_matrix_ingot",
      B: "minecraft:nether_star",
      C: "irons_spellbooks:scroll",
    }
  )

  // Crafting recipe for Iron"s stuff 

  event.shapeless(
    Item.of("irons_spellbooks:common_ink", 1),
    [
      "minecraft:glass_bottle",
      "minecraft:black_dye",
      "minecraft:feather"
    ]
  )

  event.shapeless(
    Item.of("irons_spellbooks:arcane_essence", 2),
    [
      "minecraft:amethyst_shard",
      "minecraft:lapis_lazuli"
    ]
  )
})


ServerEvents.recipes(event => {
  event.smelting(
    "3x kubejs:nuggies",
    "minecraft:cooked_chicken"
  ).xp(0.3)
   .cookingTime(40)
})

ServerEvents.recipes(event => {
  // Remove any recipe that uses OR produces items ending with "_vertical_planks"
  event.remove({ input: /.*azure_vertical_planks/ })
  event.remove({ output: /.*azure_vertical_planks/ })
})


ServerEvents.recipes(event => {
    // Loop through all recipes
    event.forEachRecipe({ input: "minecraft:ender_pearl" }, recipe => {
        // Replace all inputs that match the item with the Forge tag
        recipe.replaceInput("minecraft:ender_pearl", "#forge:ender_pearls");
    });
});


// Raw ore blocks to their full block variants
ServerEvents.recipes(event => {
  event.smelting(
    "caverns_and_chasms:silver_block",
    "caverns_and_chasms:raw_silver_block"
  ).xp(6.7)
   .cookingTime(200 * 9)
})

ServerEvents.recipes(event => {
  event.smelting(
    "minecraft:iron_block",
    "spelunkery:raw_magnetite_block"
  ).xp(6.7)
   .cookingTime(200 * 9)
})

ServerEvents.recipes(event => {
  event.smelting(
    "create:raw_zinc_block",
    "create:zinc_block"
  ).xp(6.7)
   .cookingTime(200 * 9)
})