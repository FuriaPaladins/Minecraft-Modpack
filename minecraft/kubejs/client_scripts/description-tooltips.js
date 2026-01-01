
ItemEvents.tooltip(event => {
    event.addAdvanced("*", (item, advanced, text) => {
        // Get the base translation key for the item
        let info = item.id.split(":");
        let itemName = info[1];
        let modName = info[0];
    
        let guideKeyJEI = `${modName}.jei.hint.${itemName}`;
        
        // See if a translation for guideKey exists
        let translationJEI = Text.translate(guideKeyJEI).string;
        if (translationJEI !== guideKeyJEI) {
            if (!event.shift) {
              text.add(1, [Text.darkGray("Hold ["), Text.gray("Shift"), Text.darkGray("] to view the Items' Information")])
            } else {
              text.add(1, [Text.gold(translationJEI)])

            }

            return;
        }

        let guideKeyEMI = `emi.tooltip.${modName}.${itemName}`;
        // text.add(1, `${Text.translate("spell.irons_spellbooks.burning_dash.guide").string}`);
        // // See if a translation for guideKey exists
        let translationEMI = Text.translate(guideKeyEMI).string;
        if (translationEMI !== guideKeyEMI) {
            if (!event.shift) {
              text.add(1, [Text.darkGray("Hold ["), Text.gray("Shift"), Text.darkGray("] to view the Items' Information")])
            } else {
              text.add(1, [Text.gold(translationEMI)])

            }
        }
    });
});