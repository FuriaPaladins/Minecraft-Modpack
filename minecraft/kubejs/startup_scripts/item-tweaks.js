ItemEvents.modification((event) => {
	
	event.modify("minecraft:glow_berries", (modify) => {
		modify.setFoodProperties((food) => {
			food.hunger(2)
				.saturation(0.4)
				.alwaysEdible()
				.fastToEat()
		})
	})
})


StartupEvents.registry('item', event => {
  event.create('nuggies')
    .displayName('Nuggies')
    .food(food => {
      food.hunger(2)           // Hunger points
          .saturation(0.5)     // Saturation modifier
          .alwaysEdible()
          .meat().fastToEat();
    })
})
