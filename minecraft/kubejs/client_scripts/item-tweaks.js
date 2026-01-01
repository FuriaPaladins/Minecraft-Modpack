ItemEvents.tooltip((tooltip) => {
    tooltip.addAdvanced('minecraft:glow_berries', (item, advanced, text) => {
        text.add(1, Text.of('Makes you glow for a minute after eating, and now can be eaten even when not hungry!').green())
    })

    tooltip.addAdvanced('bhc:soul_heart_canister'', (item, advanced, text) => {
        text.add(1, Text.of('Can only be used in the Soul Amulet. Acts like a Totem of Undying, and if consumed, converts back to a Blue Heart Canisters.').green())
    })
})
