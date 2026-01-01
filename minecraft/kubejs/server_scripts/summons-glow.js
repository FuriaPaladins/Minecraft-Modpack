EntityEvents.spawned(event => {
    let entity = event.entity

    // check if the entity has "Summoned" in the name
    if (!entity.name.string.includes("Summoned")) { return; }

    entity.potionEffects.add('minecraft:glowing', 999999, 0, true, false)
})