import Phaser from 'phaser';
import NameSelectionScene from './scenes/NameSelectionScene.js';
import CottageScene from './scenes/CottageScene.js';
import VillageScene from './scenes/VillageScene.js';
import ClassroomScene from './scenes/ClassroomScene.js';
import ObservationScene from './scenes/ObservationScene.js';

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    backgroundColor: '#f5e6d3', // Warm classroom color
    pixelArt: true, // Critical for pixel art games!
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // Top-down game, no gravity
            debug: false // Set to true to see collision boxes
        }
    },
    scene: [NameSelectionScene, CottageScene, VillageScene, ClassroomScene, ObservationScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    callbacks: {
        postBoot: function(game) {
            // DEBUG: URL parameter scene selection
            // Usage: http://localhost:5173/?scene=classroom
            const params = new URLSearchParams(window.location.search);
            const sceneParam = params.get('scene');

            if (sceneParam) {
                const sceneMap = {
                    'name': 'NameSelectionScene',
                    'cottage': 'CottageScene',
                    'village': 'VillageScene',
                    'classroom': 'ClassroomScene',
                    'observation': 'ObservationScene'
                };

                const sceneName = sceneMap[sceneParam.toLowerCase()];

                if (sceneName) {
                    console.log(`DEBUG MODE: Jumping to ${sceneParam} scene`);

                    // Initialize default registry values for debug mode
                    game.registry.set('playerName', 'Virginia');
                    game.registry.set('playerEnergy', 100);
                    game.registry.set('bandanaOnHead', false);

                    // Stop the default starting scene
                    game.scene.stop('NameSelectionScene');

                    // Start the requested scene with default data
                    const sceneData = {
                        gameTime: { hour: 7, minute: 45 }
                    };

                    game.scene.start(sceneName, sceneData);
                } else {
                    console.warn(`Unknown scene parameter: ${sceneParam}. Starting normally.`);
                }
            }
        }
    }
};

const game = new Phaser.Game(config);
