// Village Street Scene
// Virginia walks from her cottage to the Montessori school
// Must arrive before 7:45 AM

import { generateVirginiaSprite, generateVirginiaWithHeadBandana } from '../utils/virginiaSprite.js';
import { generateVirginiaWalkingAnimations } from '../utils/virginiaWalkingAnimations.js';
import { generateCobblestone } from '../utils/villagePath.js';
import { generatePineTree, generateLeafyTree, generateBush, generateFlowers } from '../utils/villageLandscaping.js';
import Clock from '../ui/Clock.js';
import EnergyMeter from '../ui/EnergyMeter.js';
import MissionTracker from '../ui/MissionTracker.js';
import InventoryMenu from '../ui/InventoryMenu.js';

export default class VillageScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VillageScene' });
    }

    preload() {
        // Load AI-generated building sprites
        this.load.image('cottage_exterior', 'src/assets/sprites/cottage_exterior_ai.png');
        this.load.image('rusty_spur', 'src/assets/sprites/rusty_spur_ai.png');
        this.load.image('paper_trail', 'src/assets/sprites/paper_trail_ai.png');
        this.load.image('maple_general', 'src/assets/sprites/maple_general_ai.png');
        this.load.image('mystery_house', 'src/assets/sprites/mystery_house_ai.png');
        this.load.image('harrington_manor', 'src/assets/sprites/harrington_manor_ai.png');
        this.load.image('school', 'src/assets/sprites/school_ai.png');

        // Preload morning music
        this.load.audio('morning_theme', 'src/assets/audio/morning_theme_nature.mp3');
    }

    init(data) {
        // Receive game time, energy, and spawn location from previous scene
        this.gameTime = data.gameTime || { hour: 7, minute: 0, dayOfWeek: 0 };
        this.playerEnergy = data.energy || 100;
        this.spawnLocation = data.spawnLocation || 'cottage'; // 'cottage' or 'school'
    }

    create() {
        // === MORNING MUSIC ===
        // Continue or start morning theme (looping)
        if (!this.sound.get('morning_theme')) {
            this.morningMusic = this.sound.add('morning_theme', {
                volume: 0.4,
                loop: true
            });
            this.morningMusic.play();
        }

        // === WORLD & CAMERA SETUP ===
        // World is much wider than screen (2640x720)
        const worldWidth = 2640;
        const worldHeight = 720;

        this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

        // === SKY BACKGROUND ===
        // Blue morning sky with gradient (Stardew style)
        const skyGraphics = this.add.graphics();
        skyGraphics.fillGradientStyle(0x87CEEB, 0x87CEEB, 0xB0E0F6, 0xB0E0F6, 1); // Sky blue to lighter blue
        skyGraphics.fillRect(0, 0, worldWidth, worldHeight);
        skyGraphics.setDepth(-100);

        // Simple chunky clouds
        this.createClouds(worldWidth, worldHeight);

        // === GRASS AREA BELOW PATH ===
        // Green grass background below the cobblestone path
        const grassGraphics = this.add.graphics();
        grassGraphics.fillStyle(0x5CBF54); // Bright green grass
        grassGraphics.fillRect(0, 560, worldWidth, 160); // Below path to bottom of screen
        grassGraphics.setDepth(-60);

        // Add texture to grass with darker green patches
        for (let x = 0; x < worldWidth; x += 40) {
            for (let y = 560; y < 720; y += 30) {
                if (Math.random() > 0.6) {
                    grassGraphics.fillStyle(0x4AA843, 0.3); // Darker green patches
                    grassGraphics.fillRect(x + Math.random() * 10, y + Math.random() * 10, 20 + Math.random() * 15, 15 + Math.random() * 10);
                }
            }
        }

        // === COBBLESTONE PATH ===
        // Generate cobblestone texture and tile it
        const cobblestoneKey = generateCobblestone(this);

        const pathY = 400; // Center vertically
        const pathHeight = 320;
        const tileSize = 128;

        // Tile cobblestone across the path
        for (let x = 0; x < worldWidth; x += tileSize) {
            for (let y = pathY - pathHeight / 2; y < pathY + pathHeight / 2; y += tileSize) {
                const tile = this.add.image(x, y, cobblestoneKey).setOrigin(0, 0);
                tile.setDepth(-50);
            }
        }

        // Path borders (darker edges)
        const pathTop = this.add.rectangle(worldWidth / 2, pathY - pathHeight / 2, worldWidth, 6, 0x4A3829);
        pathTop.setDepth(-49);
        const pathBottom = this.add.rectangle(worldWidth / 2, pathY + pathHeight / 2, worldWidth, 6, 0x4A3829);
        pathBottom.setDepth(-49);

        // === ROAD BOUNDARIES ===
        // Keep Virginia on the road/path area, prevent walking into sky or too far into grass

        // Top boundary - prevents walking up into building area
        this.topBoundary = this.add.rectangle(worldWidth / 2, 200, worldWidth, 40, 0x000000, 0);
        this.physics.add.existing(this.topBoundary, true); // true = static body

        // Bottom boundary - prevents walking too far into grass
        this.bottomBoundary = this.add.rectangle(worldWidth / 2, 660, worldWidth, 40, 0x000000, 0);
        this.physics.add.existing(this.bottomBoundary, true);

        // === BUILDINGS ===
        this.createPlaceholderBuildings();

        // === LANDSCAPING ===
        this.createLandscaping();

        // === VIRGINIA (PLAYER) ===
        this.createPlayer();

        // === BUILDING COLLISIONS ===
        // Add collision between player and building zones
        this.buildingCollisionZones.forEach(zone => {
            this.physics.add.collider(this.player, zone);
        });

        // === ROAD BOUNDARY COLLISIONS ===
        // Keep player on the road
        this.physics.add.collider(this.player, this.topBoundary);
        this.physics.add.collider(this.player, this.bottomBoundary);

        // === CAMERA SETUP ===
        this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1); // Smooth follow

        // Keep camera centered vertically
        this.cameras.main.setFollowOffset(-320, 0); // Offset to keep Virginia on left-third of screen

        // === CLOCK UI ===
        this.clock = new Clock(this, this.gameTime.hour, this.gameTime.minute, this.gameTime.dayOfWeek);

        // === ENERGY METER ===
        this.energyMeter = new EnergyMeter(this, this.playerEnergy);

        // === MISSION TRACKER ===
        this.missionTracker = new MissionTracker(this);

        // Add mission: Get to school by 7:45 AM
        this.missionTracker.addMission('Reach school by 7:45 AM', 'reach_school');

        // === INVENTORY MENU ===
        this.inventoryMenu = new InventoryMenu(this, this.player);

        // === CONTROLS ===
        this.setupControls();

        console.log('Village Scene loaded! Walk to school before 7:45 AM!');
    }

    createPlaceholderBuildings() {
        // Building positions (X coordinates) - SPREAD OUT more
        const buildings = [
            { x: 200, name: "Virginia's Cottage", sprite: 'cottage_exterior', scale: 0.51 }, // 15% smaller
            { x: 600, name: "The Rusty Spur", sprite: 'rusty_spur', scale: 0.4 },
            { x: 1000, name: "The Paper Trail", sprite: 'paper_trail', scale: 0.4 },
            { x: 1400, name: "Maple & Co. General", sprite: 'maple_general', scale: 0.4 },
            { x: 1800, name: "???", sprite: 'mystery_house', scale: 0.4 },
            { x: 2200, name: "Harrington Manor", sprite: 'harrington_manor', scale: 0.45 },
            { x: 2550, name: "Little Sprouts Montessori", sprite: 'school', scale: 0.4, interactive: true }
        ];

        // Store collision zones for cleanup
        this.buildingCollisionZones = [];

        buildings.forEach((building, index) => {
            const y = 220; // Higher up, well above path

            // Display building sprite - SCALED DOWN
            const sprite = this.add.image(building.x, y, building.sprite);
            sprite.setScale(building.scale);
            sprite.setDepth(1);

            // Create collision zone for each building
            // Buildings are AI-generated sprites, roughly 400-500px original size
            // After scaling: estimate based on scale
            let collisionWidth = 450 * building.scale; // Wider to cover sides
            let collisionHeight = 400 * building.scale; // Taller to cover full building

            // For school, create collision that leaves door accessible
            if (building.interactive) {
                // School collision: block most of building except door area at bottom-center

                // Left wall (full height)
                const leftZone = this.add.rectangle(
                    building.x - 100, // Left side
                    y,
                    140, // Wide enough to block side
                    collisionHeight,
                    0xff0000,
                    0 // Invisible
                );
                this.physics.add.existing(leftZone, true); // true = static body
                this.buildingCollisionZones.push(leftZone);

                // Right wall (full height)
                const rightZone = this.add.rectangle(
                    building.x + 100, // Right side
                    y,
                    140, // Wide enough to block side
                    collisionHeight,
                    0xff0000,
                    0 // Invisible
                );
                this.physics.add.existing(rightZone, true);
                this.buildingCollisionZones.push(rightZone);

                // Top zone (roof and upper portion, full width)
                const topZone = this.add.rectangle(
                    building.x,
                    y - 80, // Upper portion (roof area)
                    collisionWidth,
                    180, // Tall enough to cover roof
                    0xff0000,
                    0 // Invisible
                );
                this.physics.add.existing(topZone, true);
                this.buildingCollisionZones.push(topZone);

                // Interactive school door
                sprite.setInteractive({ useHandCursor: true });
                sprite.on('pointerdown', () => {
                    // Door is at bottom center of building, on steps
                    // Building sprite is at (2550, 220), door is roughly at y=350-380
                    const doorX = sprite.x;
                    const doorY = 360; // Approximate door position accounting for steps

                    // Check distance to door position (generous leeway)
                    const distance = Phaser.Math.Distance.Between(
                        this.player.x,
                        this.player.y,
                        doorX,
                        doorY
                    );

                    // Generous threshold - about 180 pixels
                    if (distance < 180) {
                        this.enterSchool();
                    } else {
                        // Show "too far" message
                        this.showTooFarMessage();
                    }
                });

                // Store reference to school sprite
                this.schoolSprite = sprite;
            } else {
                // Regular buildings: simple rectangular collision
                const collisionZone = this.add.rectangle(
                    building.x,
                    y,
                    collisionWidth,
                    collisionHeight,
                    0xff0000,
                    0 // Invisible (alpha = 0)
                );
                this.physics.add.existing(collisionZone, true); // true = static body
                this.buildingCollisionZones.push(collisionZone);
            }
        });
    }

    createLandscaping() {
        // Generate landscaping textures
        const pineTreeKey = generatePineTree(this);
        const leafyTreeKey = generateLeafyTree(this);
        const bushKey = generateBush(this);
        const flowersKey = generateFlowers(this);

        // REDUCED landscaping - just a few trees, minimal clutter
        const landscaping = [
            // One tree between each building pair (north side only)
            { x: 400, y: 180, type: pineTreeKey, scale: 0.8 },
            { x: 800, y: 170, type: leafyTreeKey, scale: 0.7 },
            { x: 1200, y: 175, type: pineTreeKey, scale: 0.75 },
            { x: 1600, y: 170, type: leafyTreeKey, scale: 0.8 },
            { x: 2000, y: 180, type: pineTreeKey, scale: 0.7 },
            { x: 2400, y: 175, type: leafyTreeKey, scale: 0.75 },

            // Bushes and flowers in grass area below path
            { x: 200, y: 610, type: bushKey, scale: 0.7 },
            { x: 350, y: 630, type: flowersKey, scale: 1.0 },
            { x: 500, y: 620, type: bushKey, scale: 0.6 },
            { x: 700, y: 640, type: flowersKey, scale: 1.0 },
            { x: 900, y: 615, type: bushKey, scale: 0.65 },
            { x: 1050, y: 635, type: flowersKey, scale: 1.0 },
            { x: 1250, y: 625, type: bushKey, scale: 0.7 },
            { x: 1450, y: 620, type: flowersKey, scale: 1.0 },
            { x: 1650, y: 630, type: bushKey, scale: 0.6 },
            { x: 1850, y: 615, type: flowersKey, scale: 1.0 },
            { x: 2050, y: 640, type: bushKey, scale: 0.65 },
            { x: 2250, y: 625, type: flowersKey, scale: 1.0 },
            { x: 2450, y: 620, type: bushKey, scale: 0.7 }
        ];

        landscaping.forEach(item => {
            const sprite = this.add.image(item.x, item.y, item.type);
            sprite.setScale(item.scale);
            sprite.setOrigin(0.5, 1); // Bottom-center origin for trees/bushes
            sprite.setDepth(0); // Behind player and buildings
        });
    }

    createClouds(worldWidth, worldHeight) {
        // Simple chunky clouds (Stardew style)
        const cloudColor = 0xFFFFFF;
        const cloudAlpha = 0.7;

        // Cloud positions (spread across sky)
        const clouds = [
            { x: 200, y: 80, w: 80, h: 30 },
            { x: 450, y: 120, w: 100, h: 35 },
            { x: 800, y: 60, w: 90, h: 32 },
            { x: 1100, y: 100, w: 110, h: 38 },
            { x: 1500, y: 70, w: 85, h: 30 },
            { x: 1850, y: 110, w: 95, h: 35 },
            { x: 2200, y: 85, w: 105, h: 33 }
        ];

        clouds.forEach(cloud => {
            const cloudGraphics = this.add.graphics();
            cloudGraphics.fillStyle(cloudColor, cloudAlpha);

            // Main cloud body (chunky rectangle)
            cloudGraphics.fillRect(cloud.x, cloud.y, cloud.w, cloud.h);

            // Add some chunky puffs (simple rectangles)
            cloudGraphics.fillRect(cloud.x + 10, cloud.y - 10, cloud.w * 0.4, 15);
            cloudGraphics.fillRect(cloud.x + cloud.w * 0.5, cloud.y - 8, cloud.w * 0.35, 12);

            cloudGraphics.setDepth(-90); // Above sky, below everything else
            cloudGraphics.setScrollFactor(0.5); // Parallax effect (clouds move slower)
        });
    }

    createPlayer() {
        // Check if player has bandana preference stored
        const bandanaOnHead = this.registry.get('bandanaOnHead') || false;
        this.bandanaOnHead = bandanaOnHead; // Store on scene for update loop

        // Generate Virginia idle sprite with correct bandana style
        const idleSpriteKey = bandanaOnHead ?
            generateVirginiaWithHeadBandana(this) :
            generateVirginiaSprite(this);

        // Generate walking animations with correct bandana style
        generateVirginiaWalkingAnimations(this, bandanaOnHead);

        // Determine correct texture names based on bandana position
        const frontTextureName = bandanaOnHead ? 'virginia_walk_front_headband' : 'virginia_walk_front';
        const backTextureName = bandanaOnHead ? 'virginia_walk_back_headband' : 'virginia_walk_back';
        const sideTextureName = bandanaOnHead ? 'virginia_walk_side_headband' : 'virginia_walk_side';

        // Manually add frames for each animation
        this.textures.get(frontTextureName).add('frame0', 0, 0, 0, 48, 48);
        this.textures.get(frontTextureName).add('frame1', 0, 48, 0, 48, 48);

        this.textures.get(backTextureName).add('frame0', 0, 0, 0, 48, 48);
        this.textures.get(backTextureName).add('frame1', 0, 48, 0, 48, 48);

        this.textures.get(sideTextureName).add('frame0', 0, 0, 0, 48, 48);
        this.textures.get(sideTextureName).add('frame1', 0, 48, 0, 48, 48);

        // Create animations
        this.anims.create({
            key: 'walk_front',
            frames: [
                { key: frontTextureName, frame: 'frame0' },
                { key: frontTextureName, frame: 'frame1' }
            ],
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_back',
            frames: [
                { key: backTextureName, frame: 'frame0' },
                { key: backTextureName, frame: 'frame1' }
            ],
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_side',
            frames: [
                { key: sideTextureName, frame: 'frame0' },
                { key: sideTextureName, frame: 'frame1' }
            ],
            frameRate: 8,
            repeat: -1
        });

        // Spawn Virginia based on spawn location
        let startX, startY;
        if (this.spawnLocation === 'school') {
            // Spawn outside school (near the door/steps)
            startX = 2480; // Just to the left of school entrance
            startY = 380; // Near the steps (door is around y=360)
        } else {
            // Default: spawn in front of cottage door
            startX = 200; // Match cottage position
            startY = 400; // On the path
        }

        this.player = this.physics.add.sprite(startX, startY, idleSpriteKey);
        this.player.setScale(3); // Same as cottage scene
        this.player.setDepth(10); // Above buildings

        // Collision
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(40, 40);
        this.player.body.setOffset(4, 4);

        // Store idle sprite key
        this.idleSpriteKey = idleSpriteKey;
    }

    setupControls() {
        // Arrow keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // WASD keys
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Menu key (ESC)
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.escKey.on('down', () => {
            if (this.inventoryMenu) {
                this.inventoryMenu.toggle();
            }
        });
    }

    enterSchool() {
        // Check if it's a weekend
        if (this.clock.isWeekend()) {
            this.showWeekendMessage();
            return;
        }

        // Check time
        const currentMinutes = this.gameTime.hour * 60 + this.gameTime.minute;
        const deadlineMinutes = 7 * 60 + 45; // 7:45 AM

        if (currentMinutes <= deadlineMinutes) {
            // SUCCESS - On time!
            console.log('Arrived on time! Entering school...');

            // Fade out
            this.cameras.main.fadeOut(500);

            this.cameras.main.once('camerafadeoutcomplete', () => {
                // Load Classroom Scene
                this.scene.start('ClassroomScene', { gameTime: this.gameTime });
            });
        } else {
            // FAILURE - Too late!
            console.log('Too late! School day failed.');

            const lateText = this.add.text(this.player.x, this.player.y - 100, 'TOO LATE!\nYou missed school.', {
                fontSize: '32px',
                fill: '#ff0000',
                fontStyle: 'bold',
                backgroundColor: '#000000',
                padding: { x: 20, y: 10 },
                align: 'center'
            }).setOrigin(0.5).setScrollFactor(1).setDepth(100);

            // Restart after 3 seconds
            this.time.delayedCall(3000, () => {
                this.scene.start('CottageScene', { gameTime: { hour: 7, minute: 0 } });
            });
        }
    }

    update(time, delta) {
        // Update clock (time keeps ticking even when stopped)
        this.clock.update(delta);
        this.gameTime = this.clock.getTime();

        // Update energy meter
        if (this.energyMeter) {
            this.energyMeter.update(delta);
        }

        // Movement (all directions)
        this.player.setVelocity(0);

        const speed = 200; // Slightly faster than cottage for urgency

        let isMoving = false;
        let velocityX = 0;
        let velocityY = 0;

        // Horizontal movement
        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            velocityX = -speed;
            isMoving = true;
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            velocityX = speed;
            isMoving = true;
        }

        // Vertical movement
        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            velocityY = -speed;
            isMoving = true;
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            velocityY = speed;
            isMoving = true;
        }

        // Set velocity
        this.player.setVelocity(velocityX, velocityY);

        // Play appropriate animation
        if (isMoving) {
            const absX = Math.abs(velocityX);
            const absY = Math.abs(velocityY);

            if (absY > absX) {
                // Vertical movement dominant
                if (velocityY < 0) {
                    this.player.play('walk_back', true); // Walking up
                } else {
                    this.player.play('walk_front', true); // Walking down
                }
            } else {
                // Horizontal movement dominant
                this.player.setFlipX(velocityX < 0); // Face left if moving left
                this.player.play('walk_side', true);
            }
        } else {
            // Stop animation when not moving
            this.player.stop();
            this.player.setTexture(this.idleSpriteKey);
        }

        // Check for time warning (5 minutes left)
        const currentMinutes = this.gameTime.hour * 60 + this.gameTime.minute;
        const deadlineMinutes = 7 * 60 + 45; // 7:45 AM
        const timeLeft = deadlineMinutes - currentMinutes;

        if (timeLeft <= 5 && timeLeft > 0 && !this.warningShown) {
            this.showTimeWarning();
            this.warningShown = true;
        }
    }

    showTimeWarning() {
        const warningText = this.add.text(this.player.x, this.player.y - 120, '⚠️ HURRY! 5 minutes left!', {
            fontSize: '24px',
            fill: '#ff0000',
            fontStyle: 'bold',
            backgroundColor: '#ffff00',
            padding: { x: 12, y: 6 }
        }).setOrigin(0.5).setScrollFactor(1).setDepth(100);

        // Fade out after 2 seconds
        this.time.delayedCall(2000, () => {
            this.tweens.add({
                targets: warningText,
                alpha: 0,
                duration: 500,
                onComplete: () => warningText.destroy()
            });
        });
    }

    showTooFarMessage() {
        // Don't show multiple messages
        if (this.tooFarMessage) return;

        this.tooFarMessage = this.add.text(this.player.x, this.player.y - 80, 'Get closer to enter', {
            fontSize: '18px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 },
            fontFamily: 'monospace'
        }).setOrigin(0.5).setScrollFactor(1).setDepth(100);

        // Fade out after 1.5 seconds
        this.time.delayedCall(1500, () => {
            this.tweens.add({
                targets: this.tooFarMessage,
                alpha: 0,
                duration: 300,
                onComplete: () => {
                    if (this.tooFarMessage) {
                        this.tooFarMessage.destroy();
                        this.tooFarMessage = null;
                    }
                }
            });
        });
    }

    showWeekendMessage() {
        // Don't show multiple messages
        if (this.weekendMessage) return;

        this.weekendMessage = this.add.text(this.player.x, this.player.y - 80, `School is closed on ${this.clock.getDayName()}!`, {
            fontSize: '20px',
            fill: '#ffff00',
            backgroundColor: '#000000',
            padding: { x: 12, y: 6 },
            fontFamily: 'monospace',
            fontStyle: 'bold'
        }).setOrigin(0.5).setScrollFactor(1).setDepth(100);

        // Fade out after 2.5 seconds
        this.time.delayedCall(2500, () => {
            this.tweens.add({
                targets: this.weekendMessage,
                alpha: 0,
                duration: 400,
                onComplete: () => {
                    if (this.weekendMessage) {
                        this.weekendMessage.destroy();
                        this.weekendMessage = null;
                    }
                }
            });
        });
    }
}
