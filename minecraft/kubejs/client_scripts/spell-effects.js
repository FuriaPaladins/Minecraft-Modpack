
ItemEvents.tooltip(event => {
    event.addAdvanced("irons_spellbooks:scroll", (item, advanced, text) => {
        // Get the base translation key for the item
        let info = item.nbt.get("ISB_Spells").get("data")[0].getString("id").split(":");
        let itemName = info[1];
        let modName = info[0];
    
        let guideKey = `spell.${modName}.${itemName}.guide`;
        // text.add(1, `${Text.translate("spell.irons_spellbooks.burning_dash.guide").string}`);
        // // See if a translation for guideKey exists
        let translation = Text.translate(guideKey).string;
        if (translation !== guideKey) {
            if (!event.shift) {
              text.add(1, [Text.darkGray("Hold ["), Text.gray("Shift"), Text.darkGray("] to view the Spell's Effect")])
            } else {
              text.add(1, [Text.gold(translation)])

            }
        }
    });
});