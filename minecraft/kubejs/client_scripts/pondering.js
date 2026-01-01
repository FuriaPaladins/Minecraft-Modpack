Ponder.registry((event) => {
    event.create("alexscaves:submarine").scene("multiblock_submarine", "How to build the Submarine.", (scene, util) => {
        // Keyframe 1: Lay down a 3x3 of copper blocks
        scene.showStructure();
        scene.idle(10);

        scene.addKeyframe();

        const blocks_1 = [
            [3, 1, 3], [2, 1, 3], [1, 1, 3], 
            [3, 1, 2], [2, 1, 2], [1, 1, 2], 
            [3, 1, 1], [2, 1, 1], [1, 1, 1], 
        ]
        for (let block of blocks_1) {
            scene.world.setBlock(block, "minecraft:copper_block", true)
            scene.idle(2)
        }
        scene.text(60, "To create your submarine, you need to create a 3x3 of Copper Blocks", [2.5, 2, 2.5]).placeNearTarget();
        scene.idle(80);
        
        scene.addKeyframe();
        
        scene.world.setBlock([2, 2, 2], "alexscaves:enigmatic_engine", true)
        scene.text(40, "Then place an Enigmatic Engine in the center", [2.5, 3, 2.5]).placeNearTarget();
        scene.idle(60);

        scene.addKeyframe();
        const blocks_2 = [
            [3, 2, 1], [2, 2, 1], [1, 2, 1], 
        ]
        for (let block of blocks_2) {
            scene.world.setBlock(block, "alexscaves:depth_glass", true)
            scene.idle(2)
        }
        scene.text(40, "Then place Depth Glass in the front", [2.5, 3, 1.5]).placeNearTarget();
        scene.idle(60);

        scene.addKeyframe();

        const blocks_3 = [
            [3, 2, 3], [2, 2, 3], [1, 2, 3], 
            [3, 2, 2], [1, 2, 2], 
        ]
        for (let block of blocks_3) {
            scene.world.setBlock(block, "minecraft:copper_block", true)
            scene.idle(2)
        }
        scene.text(40, "... and fill the back with Copper Blocks", [2.5, 3, 2.5]).placeNearTarget();
        scene.idle(60);


        scene.addKeyframe();
        const blocks_4 = [
            [3, 3, 3], [2, 3, 3], [1, 3, 3], 
            [3, 3, 2], [2, 3, 2], [1, 3, 2], 
        ]
        for (let block of blocks_4) {
            scene.world.setBlock(block, "minecraft:copper_block", true)
            scene.idle(2)
        }
        const blocks_5 = [
            [3, 3, 1], [2, 3, 1], [1, 3, 1], 
        ]
        for (let block of blocks_5) {
            scene.world.setBlock(block, "alexscaves:depth_glass", true)
            scene.idle(2)
        }
        scene.text(40, "Finally, top it off with Depth Glass and Copper Blocks", [2.5, 4, 2.5]).placeNearTarget();
        scene.idle(60);

        
        // remove all the blocks
        scene.addKeyframe();
        scene.particles.simple(5, "explosion", [5, 5, 5]).density(10).area([0, 1, 0]);
        scene.idle(1);
        for (let block of blocks_1.concat(blocks_2).concat(blocks_3).concat(blocks_4).concat(blocks_5)) {
            scene.world.setBlock(block, "minecraft:air", false)
        }
        scene.idle(10);

        // summon a submarine entity
        const submarine = scene.world.createEntity("alexscaves:submarine", [2.5, 1, 2.5]);
        scene.text(40, "And Voila! Your very own Submarine!", [2.5, 2.5, 2.5]).placeNearTarget();
        scene.idle(60);

    });
});