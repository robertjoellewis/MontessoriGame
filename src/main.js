import Phaser from 'phaser';
import ObservationScene from './scenes/ObservationScene.js';

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    backgroundColor: '#f5e6d3', // Warm classroom color
    pixelArt: true, // Critical for pixel art games!
    scene: [ObservationScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);
