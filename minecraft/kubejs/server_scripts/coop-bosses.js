const allowedTypes = {
    "mowziesmobs:ferrous_wroughtnaut": ["custom:combat/mowzies/wrought_kill"],
    "mowziesmobs:frostmaw": ["custom:combat/mowzies/frostmaw_kill"],
    "mowziesmobs:umvuthi": ["custom:combat/mowzies/umvuthi_kill"],
    "mowziesmobs:sculptor": ["custom:combat/mowzies/tongbi_kill"],
    
    "aquamirae:maze_mother": ["custom:combat/aquamirae/mother_of_the_maze_kill"],
    "aquamirae:captain_cornelia": ["custom:combat/aquamirae/cornelia_kill"],

    "darkdoppelganger:dark_doppelganger": ["custom:combat/darkdoppelganger/kill"],

    "block_factorys_bosses:sandworm": ["custom:combat/block_factorys_bosses/sandworm_kill"],
    "block_factorys_bosses:yeti": ["custom:combat/block_factorys_bosses/yeti_kill"],
    "block_factorys_bosses:infernal_dragon": ["custom:combat/block_factorys_bosses/dragon_kill"],
    "block_factorys_bosses:underworld_knight": ["custom:combat/block_factorys_bosses/knight_kill"],

    "cataclysm:aptrgangr": ["custom:combat/cataclysm/kill_aptrgangr"],    
    "cataclysm:clawdian": ["custom:combat/cataclysm/kill_clawdian"],    
    "cataclysm:ender_golem": ["custom:combat/cataclysm/kill_ender_golem"],    
    "cataclysm:ender_guardian": ["custom:combat/cataclysm/kill_ender_guardian"],    
    "cataclysm:the_harbinger": ["custom:combat/cataclysm/kill_harbinger"],    
    "cataclysm:ignis": ["custom:combat/cataclysm/kill_ignis"],    
    "cataclysm:the_leviathan": ["custom:combat/cataclysm/kill_leviathan"],    
    "cataclysm:maledictus": ["custom:combat/cataclysm/kill_maledictus"],    
    "cataclysm:netherite_monstrosity": ["custom:combat/cataclysm/kill_monstrosity"],    
    "cataclysm:ancient_remnant": ["custom:combat/cataclysm/kill_remnant"],    
    "cataclysm:ignited_revenant": ["custom:combat/cataclysm/kill_revenant"],    
    "cataclysm:scylla": ["custom:combat/cataclysm/kill_scylla"],

    "traveloptics:the_nightwarden": ["custom:combat/spellbooks/nightwarden_kill"],
    "traveloptics:enraged_dead_king": ["custom:combat/spellbooks/enraged_dead_king_kill"],
    "irons_spellbooks:dead_king": ["custom:combat/spellbooks/dead_king_kill"],

    "alexsmobs:warped_mosco": ["alexsmobs:alexsmobs/warped_mosco_kill"],
    "alexscaves:luxtructosaurus": ["alexscaves:alexscaves/defeat_luxtructosaurus"],
    "alexscaves:forsaken": ["alexscaves:alexscaves/defeat_forsaken"]

};


const damageHistory = new Map()


function fmt(n) {
    // Format number to string with at most one decimal place, removing trailing .0
    if (!isFinite(n)) return String(n);
    const rounded = Math.round(n);
    return Math.abs(n - rounded) < 1e-6 ? String(rounded) : n.toFixed(1);
}

function clearOldTags(entityUUID) {
    // Function to clear player tags if their last hit was more than 5 minutes ago
    // Is called whenever a player hits the entity so that the timer isn't running unnecessarily as it's not important enough to be running every tick.

    const FIVE_MINUTES = 5 * 60 * 1000; // 5 minutes in milliseconds
    const currentTime = Date.now();

    if (!damageHistory.has(entityUUID)) return;

    const entityDamageHistory = damageHistory.get(entityUUID);
    for (const [playerUUID, record] of entityDamageHistory.entries()) {
        if (currentTime - record.lastDamageTime > FIVE_MINUTES) {
            entityDamageHistory.delete(playerUUID);
        }
    }

    // If no players remain in the damage history, remove the entity's entry
    if (entityDamageHistory.size === 0) {
        damageHistory.delete(entityUUID);
    }
}

function getEntityHealth(entity) {
    // Function to get current health of an entity
    try {
        if (typeof entity.getHealth === 'function') return Number(entity.getHealth());
        if (typeof entity.health === 'number') return Number(entity.health);
    } catch (e) {}
    return undefined;

}

function reportDeath(entity, killer, position) {
    // Function to handle the death report
    const entityUUID = `${entity.uuid}`;
    if (!damageHistory.has(entityUUID)) return;

    const entityDamageHistory = damageHistory.get(entityUUID);
    const sortedDamage = Array.from(entityDamageHistory.entries()) .sort((a, b) => b[1].totalDamage - a[1].totalDamage);

    const totalDamage = sortedDamage.reduce((sum, [, record]) => sum + record.totalDamage, 0);
    if (totalDamage === 0) return;
    
    let message = [
        { text: `The `, color: "white" },
        { translate: `${entity.name.string}`, color: "gold", bold: true },
        { text: ` was killed`, color: "white" }
    ];

    if (killer) {
        message.push(
            {text: ` by `, color: "white"},
            {text: `${killer.player.name.string}`, bold: true, color: "gold"}
        );
    }

    message.push(
        {text: "\n Damage Breakdown:", color: "white"}
    )

    sortedDamage.forEach(([playerUUID, record], index) => {
        const player = entity.server.getPlayer(playerUUID);
        if (!player) return;

        const percentage = ((record.totalDamage / totalDamage) * 100);
        
        message.push(
            {text: `\n  - ${index + 1}. `, color: "white" },
            {text: `${player.name.string}`, bold: true, color: "gold" },
            {text: ` dealt `, color: "white" },
            {text: `${fmt(record.totalDamage)}`, bold: true, color: "gold" },
            {text: ` damage (${fmt(percentage)}%)`, color: "white" }
        );

        // Grant advancement
        for (const adv of allowedTypes[entity.type] || []) {
            entity.server.runCommandSilent(
                `advancement grant ${player.name.string} only ${adv}`
            );

        }
    });
    entity.server.runCommandSilent(`execute in ${entity.level.dimension} positioned ${position.x} ${position.y} ${position.z} run tellraw @a[distance=..48] ["",${JSON.stringify(message)}]`)
    damageHistory.delete(entityUUID);
}

EntityEvents.hurt(event => {
    const entity = event.entity
    if (!(String(entity.type) in allowedTypes)) return;
    entity.server.runCommandSilent(`say `)

    const player = event.source?.player
    if (!player) return;

    const position = entity.blockPosition();
    const currentTime = Date.now();

    const entityUUID = `${entity.uuid}`;
    const playerUUID = `${player.uuid}`;

    clearOldTags(entityUUID);

    const healthBefore = getEntityHealth(entity);
    
    // Schedule next tick to calculate actual health lost
    event.server.scheduleInTicks(1, () => {
        const healthAfter = getEntityHealth(entity);
        if (healthBefore == null || healthAfter == null) return;

        const actualDamage = Math.max(0, healthBefore - healthAfter);

        if (!damageHistory.has(entityUUID)) {
            damageHistory.set(entityUUID, new Map());
        }

        const entityDamageHistory = damageHistory.get(entityUUID);
        if (!entityDamageHistory.has(playerUUID)) {
            entityDamageHistory.set(playerUUID, { 
                totalDamage: actualDamage, 
                lastDamageTime: currentTime 
            });
        } else {
            const record = entityDamageHistory.get(playerUUID);
            record.totalDamage += actualDamage;
            record.lastDamageTime = currentTime;
            entityDamageHistory.set(playerUUID, record);
        }
        // If entity died, report death
        if (!entity.isAlive()) {
            reportDeath(entity, event.source, position);
        }
    });
});