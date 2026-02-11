// Virginia's Cottage Interior Scene
// Player wakes up here, can move around, make coffee, and leave for school

import { generateVirginiaSprite, generateVirginiaWithHeadBandana } from '../utils/virginiaSprite.js';
import { generateVirginiaWalkingAnimations } from '../utils/virginiaWalkingAnimations.js';
import Clock from '../ui/Clock.js';
import EnergyMeter from '../ui/EnergyMeter.js';
import MissionTracker from '../ui/MissionTracker.js';
import InventoryMenu from '../ui/InventoryMenu.js';
import { preloadCottageSprites } from '../utils/cottageInteriorLoader.js';
import { generateStardewFloor } from '../utils/stardewFloor.js';
import {
    generateWoodenFloor,
    generateWallpaper,
    generateBed,
    generateDresser,
    generateTable,
    generateRug,
    generatePlant,
    generateWindow,
    generateCoffeeMaker,
    generateDoor
} from '../utils/cottageInterior.js';

export default class CottageScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CottageScene' });
    }

    init(data) {
        // Receive game time from previous scene (or start at 7:00 AM)
        this.gameTime = data.gameTime || { hour: 7, minute: 0 };
    }

    preload() {
        // Preload AI-generated Stardew Valley sprites
        preloadCottageSprites(this);

        // Preload morning music
        this.load.audio('morning_theme', 'assets/audio/morning_theme_nature.mp3');

        // Preload rooster crow sound effect
        this.load.audio('rooster_crow', 'assets/audio/dragon-studio-rooster-crowing-364473.mp3');
    }

    create() {
        // Controls disabled during wake-up sequence
        this.controlsEnabled = false;

        // === MORNING MUSIC ===
        // Play morning theme (looping)
        if (!this.sound.get('morning_theme')) {
            this.morningMusic = this.sound.add('morning_theme', {
                volume: 0.4,
                loop: true
            });
            this.morningMusic.play();
        }

        // === STARDEW VIEWPORT SYSTEM ===
        // Small 600x500 room centered in 1280x720 canvas with black borders

        // 1. Black background (fills entire canvas)
        this.add.rectangle(640, 360, 1280, 720, 0x000000).setDepth(-1000);

        // 2. Define room dimensions (small Stardew-style window)
        this.roomWidth = 600;
        this.roomHeight = 500;
        this.roomX = (1280 - this.roomWidth) / 2;  // 340 - centered horizontally
        this.roomY = (720 - this.roomHeight) / 2;   // 110 - centered vertically

        // 3. Create room container (all interior content goes here)
        this.roomContainer = this.add.container(this.roomX, this.roomY);
        this.roomContainer.setDepth(0);

        // 4. Adjust physics world bounds to room size
        this.physics.world.setBounds(this.roomX, this.roomY, this.roomWidth, this.roomHeight);

        // Create cottage interior (inside container)
        this.createCottageInterior();

        // Create Virginia player sprite
        this.createPlayer();

        // Create interactive objects
        this.createInteractables();

        // Set up controls
        this.setupControls();

        // Create collision
        this.setupCollision();

        // Create Stardew-style border around room
        this.createStardewBorder();

        // Create clock (starts at 7:00 AM on Monday)
        this.clock = new Clock(this, 7, 0, 0); // 0 = Monday

        // Create energy meter (starts at 100)
        this.energyMeter = new EnergyMeter(this, 100);

        // Create mission tracker
        this.missionTracker = new MissionTracker(this);

        // Add initial mission: Get to school by 7:45 AM
        this.missionTracker.addMission('Reach school by 7:45 AM', 'reach_school');

        // Create inventory menu (opened with ESC key)
        // Note: Must be created after player sprite exists
        this.time.delayedCall(100, () => {
            this.inventoryMenu = new InventoryMenu(this, this.player);
        });

        // Wake-up sequence
        this.startWakeUpSequence();
    }

    createCottageInterior() {
        // HYBRID APPROACH: AI for some, procedural for others

        // PROCEDURAL (for prototype speed and control)
        const floorKey = generateStardewFloor(this);  // NEW: Procedural with LARGE planks
        const wallpaperKey = generateWallpaper(this);  // Procedural vertical stripes
        const tableKey = generateTable(this);  // Procedural (will update to chunky style)
        const rugKey = generateRug(this);  // Procedural (will update to chunky style)
        const windowKey = generateWindow(this);  // Procedural (will update to chunky style)
        const coffeeMakerKey = generateCoffeeMaker(this);  // Procedural (will update to chunky style)

        // PROCEDURAL BED (switching from AI to procedural)
        const bedKey = generateBed(this);

        // AI-GENERATED (keeping the good ones)
        const doorKey = this.textures.exists('cottage_door_ai') ? 'cottage_door_ai' : generateDoor(this);
        const dresserKey = this.textures.exists('cottage_dresser_ai') ? 'cottage_dresser_ai' : generateDresser(this);
        const plantKey = this.textures.exists('cottage_plant_ai') ? 'cottage_plant_ai' : generatePlant(this);

        // === WALLPAPER (tiled background - UPPER WALL AREA ONLY) ===
        // 33% taller: 80 * 1.33 = 106px
        const wallHeight = 106;
        for (let y = 0; y < wallHeight; y += 128) {
            for (let x = 0; x < this.roomWidth; x += 128) {
                const wallTile = this.add.image(x, y, wallpaperKey).setOrigin(0, 0);

                // Crop tile if it extends beyond room boundaries
                const cropWidth = Math.min(128, this.roomWidth - x);
                const cropHeight = Math.min(128, wallHeight - y);
                if (cropWidth < 128 || cropHeight < 128) {
                    wallTile.setCrop(0, 0, cropWidth, cropHeight);
                }

                this.roomContainer.add(wallTile);
            }
        }

        // === WOODEN FLOOR (tiled - VERTICAL ORANGE PLANKS) ===
        // Floor starts below wall (at y=106)
        for (let y = wallHeight; y < this.roomHeight; y += 128) {
            for (let x = 0; x < this.roomWidth; x += 128) {
                const floorTile = this.add.image(x, y, floorKey).setOrigin(0, 0);

                // Crop tile if it extends beyond room boundaries
                const cropWidth = Math.min(128, this.roomWidth - x);
                const cropHeight = Math.min(128, this.roomHeight - y);
                if (cropWidth < 128 || cropHeight < 128) {
                    floorTile.setCrop(0, 0, cropWidth, cropHeight);
                }

                this.roomContainer.add(floorTile);
            }
        }

        // === WALLS (collision boundaries - adjusted for 600x500 room) ===
        this.walls = this.physics.add.staticGroup();

        // Top wall (invisible collision)
        const topWall = this.add.rectangle(this.roomX + this.roomWidth / 2, this.roomY + 20, this.roomWidth, 40, 0x8b6f47, 0);
        this.walls.add(topWall);

        // Left wall
        const leftWall = this.add.rectangle(this.roomX + 20, this.roomY + this.roomHeight / 2, 40, this.roomHeight, 0x8b6f47, 0);
        this.walls.add(leftWall);

        // Right wall
        const rightWall = this.add.rectangle(this.roomX + this.roomWidth - 20, this.roomY + this.roomHeight / 2, 40, this.roomHeight, 0x8b6f47, 0);
        this.walls.add(rightWall);

        // Bottom wall (partial - leave space for door)
        const bottomWallLeft = this.add.rectangle(this.roomX + 100, this.roomY + this.roomHeight - 20, 160, 40, 0x8b6f47, 0);
        this.walls.add(bottomWallLeft);

        const bottomWallRight = this.add.rectangle(this.roomX + this.roomWidth - 100, this.roomY + this.roomHeight - 20, 160, 40, 0x8b6f47, 0);
        this.walls.add(bottomWallRight);

        // === RUG (center of room, scaled down) ===
        const rug = this.add.image(this.roomWidth / 2, this.roomHeight / 2, rugKey)
            .setOrigin(0.5)
            .setScale(0.8);  // Scale down to 80% - rug was too large
        this.roomContainer.add(rug);

        // === BED (upper-right corner - Stardew style) ===
        const bedX = this.roomWidth - 120;
        const bedY = 130;  // Pushed tight against back wall (wall ends at 106)
        this.bed = this.add.image(this.roomX + bedX, this.roomY + bedY, bedKey).setOrigin(0.5).setScale(2);
        this.physics.add.existing(this.bed, true);
        this.bed.body.setSize(160, 120);  // Updated for 2x scaled bed (80x60 * 2)
        this.bed.body.setOffset(-80, -60);

        // === DRESSER/NIGHTSTAND (left of bed in upper right) ===
        const dresserX = this.roomWidth - 250;
        const dresserY = 125;  // Very close to back wall (wall ends at 106)
        this.dresser = this.add.image(this.roomX + dresserX, this.roomY + dresserY, dresserKey).setOrigin(0.5);
        this.physics.add.existing(this.dresser, true);
        this.dresser.body.setSize(48, 56);  // Updated for v2 dresser (48x56)
        this.dresser.body.setOffset(-24, -28);

        // === COFFEE TABLE (under coffee machine on back wall) ===
        const tableX = 180;  // Matches coffee machine X position
        const tableY = 110;  // Closer to coffee machine (just below wall at 106)
        const coffeeTable = this.add.image(this.roomX + tableX, this.roomY + tableY, tableKey).setOrigin(0.5);
        this.physics.add.existing(coffeeTable, true);
        coffeeTable.body.setSize(48, 32);  // Updated for v2 table (48x32)
        coffeeTable.body.setOffset(-24, -16);

        // === COFFEE MAKER (on back wall, next to window) ===
        const coffeeMakerX = 180;  // To the right of window
        const coffeeMakerY = 70;   // On the wall
        this.coffeeMaker = this.add.image(coffeeMakerX, coffeeMakerY, coffeeMakerKey).setOrigin(0.5);
        this.roomContainer.add(this.coffeeMaker);
        // Note: No physics body needed on wall

        // === POTTED PLANTS (decorative) ===
        const plant1 = this.add.image(60, 150, plantKey).setOrigin(0.5);
        plant1.setScale(1.5);
        this.roomContainer.add(plant1);

        const plant2 = this.add.image(this.roomWidth - 60, 250, plantKey).setOrigin(0.5);
        this.roomContainer.add(plant2);

        // === WINDOW (top left) ===
        const window = this.add.image(80, 50, windowKey).setOrigin(0.5).setScale(1.2);
        this.roomContainer.add(window);

        // === DOOR (bottom center - exit) ===
        const doorX = this.roomWidth / 2;
        const doorY = this.roomHeight - 35;
        this.door = this.add.image(this.roomX + doorX, this.roomY + doorY, doorKey).setOrigin(0.5).setScale(1.2);
        this.physics.add.existing(this.door, true);
        this.door.body.setSize(66, 90);  // 20% larger: 55*1.2=66, 75*1.2=90
        this.door.body.setOffset(-33, -45);

        // Robert removed - this is Virginia's single bedroom (Stardew style)
    }

    createPlayer() {
        // Check if player has bandana preference stored
        const bandanaOnHead = this.registry.get('bandanaOnHead') || false;
        this.bandanaOnHead = bandanaOnHead; // Store on scene for update loop

        // Generate Virginia idle sprite (for when standing still)
        const idleSpriteKey = bandanaOnHead ?
            generateVirginiaWithHeadBandana(this) :
            generateVirginiaSprite(this);

        // Generate walking animations with correct bandana style
        generateVirginiaWalkingAnimations(this, bandanaOnHead);

        // Determine correct texture names based on bandana position
        const frontTextureName = bandanaOnHead ? 'virginia_walk_front_headband' : 'virginia_walk_front';
        const backTextureName = bandanaOnHead ? 'virginia_walk_back_headband' : 'virginia_walk_back';
        const sideTextureName = bandanaOnHead ? 'virginia_walk_side_headband' : 'virginia_walk_side';

        // Manually add frames for each animation (Phaser requires this for generated textures)
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

        // Create player at bed position initially (she's sleeping)
        const bedX = this.roomWidth - 120;
        const bedY = 130;
        this.player = this.physics.add.sprite(
            this.roomX + bedX,
            this.roomY + bedY,
            idleSpriteKey
        );
        this.player.setCollideWorldBounds(true);
        this.player.setScale(3); // Make Virginia 3x bigger for visibility (48x48 → 144x144)

        // Set player body size (for collision)
        this.player.body.setSize(40, 40);
        this.player.body.setOffset(4, 4);

        // Hide player initially (she's in bed)
        this.player.setAlpha(0);
        this.player.body.enable = false; // Disable physics during wake-up

        // Store idle sprite key for later
        this.idleSpriteKey = idleSpriteKey;
    }

    createStardewBorder() {
        // Thick 3-tone beveled border around room (Stardew style)
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });

        const borderThickness = 10;
        const x = this.roomX;
        const y = this.roomY;
        const w = this.roomWidth;
        const h = this.roomHeight;

        // Stardew exact colors (3-tone bevel for depth)
        const outerDark = 0xA84028;   // Darkest outer edge
        const midOrange = 0xD87040;   // Middle tone
        const innerLight = 0xF0A070;  // Lightest inner edge

        // Draw beveled border (3 nested rectangles for 3D effect)

        // Outer dark layer (full border thickness)
        graphics.fillStyle(outerDark, 1);
        // Top
        graphics.fillRect(x - borderThickness, y - borderThickness, w + borderThickness * 2, borderThickness);
        // Bottom
        graphics.fillRect(x - borderThickness, y + h, w + borderThickness * 2, borderThickness);
        // Left
        graphics.fillRect(x - borderThickness, y, borderThickness, h);
        // Right
        graphics.fillRect(x + w, y, borderThickness, h);

        // Mid orange layer (6px from edge)
        const midOffset = 3;
        graphics.fillStyle(midOrange, 1);
        // Top
        graphics.fillRect(x - borderThickness + midOffset, y - borderThickness + midOffset,
                         w + borderThickness * 2 - midOffset * 2, 4);
        // Bottom
        graphics.fillRect(x - borderThickness + midOffset, y + h - midOffset + borderThickness - 4,
                         w + borderThickness * 2 - midOffset * 2, 4);
        // Left
        graphics.fillRect(x - borderThickness + midOffset, y, 4, h);
        // Right
        graphics.fillRect(x + w - midOffset + borderThickness - 4, y, 4, h);

        // Inner light highlight (3px from edge)
        const innerOffset = 6;
        graphics.fillStyle(innerLight, 1);
        // Top
        graphics.fillRect(x - borderThickness + innerOffset, y - borderThickness + innerOffset,
                         w + borderThickness * 2 - innerOffset * 2, 3);
        // Bottom
        graphics.fillRect(x - borderThickness + innerOffset, y + h - innerOffset + borderThickness - 3,
                         w + borderThickness * 2 - innerOffset * 2, 3);
        // Left
        graphics.fillRect(x - borderThickness + innerOffset, y, 3, h);
        // Right
        graphics.fillRect(x + w - innerOffset + borderThickness - 3, y, 3, h);

        // Generate texture and add as image
        graphics.generateTexture('room_border', 1280, 720);
        this.add.image(0, 0, 'room_border').setOrigin(0, 0).setDepth(999);
        graphics.destroy();
    }

    createInteractables() {
        // Door interaction zone (room-relative coordinates)
        const doorX = this.roomX + this.roomWidth / 2;
        const doorY = this.roomY + this.roomHeight - 50;
        this.doorZone = this.add.zone(doorX, doorY, 140, 100);
        this.physics.add.existing(this.doorZone);

        // Coffee maker interaction zone (on back wall, room-relative coordinates)
        const coffeeX = this.roomX + 180;  // Matches coffee maker position
        const coffeeY = this.roomY + 70;   // On the wall
        this.coffeeZone = this.add.zone(coffeeX, coffeeY, 80, 80);
        this.physics.add.existing(this.coffeeZone);

        // Interaction prompts (hidden by default, room-relative coordinates)
        this.doorPrompt = this.add.text(doorX, doorY - 40, 'Walk through door to leave', {
            fontSize: '18px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setVisible(false).setDepth(1000);

        this.coffeePrompt = this.add.text(coffeeX, coffeeY + 60, 'Press E for coffee', {
            fontSize: '16px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 8, y: 4 }
        }).setOrigin(0.5).setVisible(false).setDepth(1000);
    }

    setupControls() {
        // Arrow keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // WASD keys
        this.wasd = this.input.keyboard.addKeys({
            up: 'W',
            down: 'S',
            left: 'A',
            right: 'D'
        });

        // Interaction keys
        this.eKey = this.input.keyboard.addKey('E');

        // Menu key (ESC)
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // Key press handlers
        this.eKey.on('down', () => this.handleCoffeeInteraction());

        this.escKey.on('down', () => {
            if (this.inventoryMenu) {
                this.inventoryMenu.toggle();
            }
        });
    }

    setupCollision() {
        // Player collides with walls
        this.physics.add.collider(this.player, this.walls);

        // Player collides with furniture
        this.physics.add.collider(this.player, this.bed);
        this.physics.add.collider(this.player, this.dresser);
        // Coffee maker is on wall (no collision needed)

        // Overlap detection for interaction zones
        this.physics.add.overlap(this.player, this.doorZone, () => {
            this.doorPrompt.setVisible(true);
            this.handleDoorInteraction(); // Automatic entry
        });

        this.physics.add.overlap(this.player, this.coffeeZone, () => {
            this.coffeePrompt.setVisible(true);
        });
    }

    startWakeUpSequence() {
        // Play rooster crow sound
        this.sound.play('rooster_crow', { volume: 0.5 });

        // Get player's chosen name from registry
        const playerName = this.registry.get('playerName') || 'Virginia';

        // Simple wake-up text (centered in room)
        const centerX = this.roomX + this.roomWidth / 2;
        const centerY = this.roomY + this.roomHeight / 2;

        const wakeUpText = this.add.text(centerX, centerY - 60, `Wake up, ${playerName}!`, {
            fontSize: '32px',
            fill: '#ff0000',
            fontStyle: 'bold',
            backgroundColor: '#ffffff',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setDepth(1001);

        const instructionText = this.add.text(centerX, centerY, 'You must reach school by 7:45 AM!', {
            fontSize: '24px',
            fill: '#000000',
            backgroundColor: '#ffff00',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5).setDepth(1001);

        // Animate Virginia popping out of bed after 1.5 seconds
        this.time.delayedCall(1500, () => {
            // Make Virginia visible
            this.player.setAlpha(1);

            // Store bed position
            const bedX = this.roomWidth - 120;
            const bedY = 130;
            const startX = this.roomX + bedX;
            const startY = this.roomY + bedY;

            // Target position: to the left of the bed, on the floor
            const targetX = this.roomX + bedX - 80;
            const targetY = this.roomY + bedY + 100;

            // Pop animation: bounce up then down to standing position
            this.tweens.add({
                targets: this.player,
                y: startY - 80, // Jump up
                duration: 300,
                ease: 'Cubic.easeOut',
                onComplete: () => {
                    // Move to standing position next to bed
                    this.tweens.add({
                        targets: this.player,
                        x: targetX,
                        y: targetY,
                        duration: 400,
                        ease: 'Bounce.easeOut',
                        onComplete: () => {
                            // Enable controls after animation
                            this.player.body.enable = true;
                            this.controlsEnabled = true;
                        }
                    });
                }
            });
        });

        // Fade out text after 3 seconds
        this.time.delayedCall(3000, () => {
            this.tweens.add({
                targets: [wakeUpText, instructionText],
                alpha: 0,
                duration: 1000,
                onComplete: () => {
                    wakeUpText.destroy();
                    instructionText.destroy();
                }
            });
        });
    }

    handleDoorInteraction() {
        // Prevent multiple triggers
        if (this.isLeavingCottage) return;

        // Check if player is near door
        const distance = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            this.door.x, this.door.y
        );

        if (distance < 100) {
            this.isLeavingCottage = true;
            console.log('Leaving cottage for village...');

            // Fade to black
            this.cameras.main.fadeOut(500);

            this.cameras.main.once('camerafadeoutcomplete', () => {
                // Transition to Village Scene with time and energy
                this.scene.start('VillageScene', {
                    gameTime: this.clock.getTime(),
                    energy: this.energyMeter.getEnergy()
                });
            });
        }
    }

    handleCoffeeInteraction() {
        // Check if player is near coffee maker (convert container-relative to absolute coords)
        const coffeeMakerAbsX = this.roomX + this.coffeeMaker.x;
        const coffeeMakerAbsY = this.roomY + this.coffeeMaker.y;
        const distance = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            coffeeMakerAbsX, coffeeMakerAbsY
        );

        if (distance < 80) {
            console.log('Making coffee...');

            // Add energy
            this.energyMeter.addEnergy(20);

            // Coffee animation (room-relative)
            const coffeeTextX = this.roomX + 100;
            const coffeeTextY = this.roomY + 120;
            const coffeeText = this.add.text(coffeeTextX, coffeeTextY, '☕ Coffee!', {
                fontSize: '20px',
                fill: '#4CAF50',
                fontStyle: 'bold'
            }).setOrigin(0.5).setDepth(1000);

            // Float up and fade out
            this.tweens.add({
                targets: coffeeText,
                y: coffeeTextY - 40,
                alpha: 0,
                duration: 1500,
                onComplete: () => coffeeText.destroy()
            });
        }
    }

    update(time, delta) {
        // Update clock
        this.clock.update(delta);

        // Update energy meter
        this.energyMeter.update(delta);

        // Don't process input during wake-up sequence
        if (!this.controlsEnabled) {
            return;
        }

        // Reset velocity
        this.player.setVelocity(0);

        // Movement speed
        const speed = 160;

        // Track if player is moving
        let isMoving = false;
        let moveX = 0;
        let moveY = 0;

        // Handle input
        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            moveX = -speed;
            this.player.setFlipX(true); // Face left
            isMoving = true;
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            moveX = speed;
            this.player.setFlipX(false); // Face right
            isMoving = true;
        }

        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            moveY = -speed;
            isMoving = true;
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            moveY = speed;
            isMoving = true;
        }

        // Apply velocity
        this.player.setVelocityX(moveX);
        this.player.setVelocityY(moveY);

        // Normalize diagonal movement
        if (moveX !== 0 && moveY !== 0) {
            this.player.body.velocity.normalize().scale(speed);
        }

        // Play appropriate animation
        if (isMoving) {
            // Determine which animation to play based on direction
            if (Math.abs(moveY) > Math.abs(moveX)) {
                // Vertical movement dominates
                if (moveY < 0) {
                    this.player.play('walk_back', true);
                } else {
                    this.player.play('walk_front', true);
                }
            } else {
                // Horizontal movement dominates
                this.player.play('walk_side', true);
            }
        } else {
            // Not moving - stop animation and show idle sprite
            this.player.stop();
            this.player.setTexture(this.idleSpriteKey);
        }

        // Hide interaction prompts when not near objects
        const doorDistance = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            this.door.x, this.door.y
        );
        if (doorDistance > 100) {
            this.doorPrompt.setVisible(false);
        }

        // Coffee maker is in room container, need absolute coordinates
        const coffeeMakerAbsX = this.roomX + this.coffeeMaker.x;
        const coffeeMakerAbsY = this.roomY + this.coffeeMaker.y;
        const coffeeDistance = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            coffeeMakerAbsX, coffeeMakerAbsY
        );
        if (coffeeDistance > 80) {
            this.coffeePrompt.setVisible(false);
        }
    }
}
