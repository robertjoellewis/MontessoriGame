// Bluebonnet Montessori - Toddler Classroom Scene
// Main teaching gameplay happens here

import { generateVirginiaSprite, generateVirginiaWithHeadBandana } from '../utils/virginiaSprite.js';
import { generateVirginiaWalkingAnimations } from '../utils/virginiaWalkingAnimations.js';
import { generateChildSprite } from '../utils/spriteGenerator.js';
import { generateChildWalkingAnimations } from '../utils/childWalkingAnimations.js';
import { generateWadeSprite, generateWadeSideSprite, generateWadeBackSprite } from '../utils/wadeSprite.js';
import { childrenData } from '../data/children.js';
import { materialsData } from '../data/materials.js';
import { wadeData } from '../data/wade.js';
import { generateShelf, generateLargeRug, generateSmallTable } from '../utils/classroomFurniture.js';
import {
    generatePinkTower,
    generateCylinders,
    generateColorTablets,
    generatePouringPitchers,
    generateSpooningTray,
    generateBroom,
    generateBooks,
    generatePuzzle,
    generateNestingBoxes
} from '../utils/materialGenerator.js';
import Clock from '../ui/Clock.js';
import EnergyMeter from '../ui/EnergyMeter.js';
import MissionTracker from '../ui/MissionTracker.js';
import ExperienceSystem from '../ui/ExperienceSystem.js';
import ClothingMenu from '../ui/ClothingMenu.js';
import InventorySystem from '../systems/InventorySystem.js';
import InventoryUI from '../ui/InventoryUI.js';

export default class ClassroomScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ClassroomScene' });
    }

    init(data) {
        // Receive game time from previous scene
        this.gameTime = data.gameTime || { hour: 7, minute: 45, dayOfWeek: 0 };
    }

    preload() {
        // Load AI-generated material sprites
        materialsData.forEach(material => {
            this.load.image(material.id, `assets/sprites/${material.sprite}`);
        });

        // Load classroom audio
        this.load.audio('classroom_music', 'assets/audio/classroomSong2.mp3');
        this.load.audio('naptime_music', 'assets/audio/naptimeSong2.mp3');
        this.load.audio('teaching_success', 'assets/audio/teachingSuccess2.mp3');
        this.load.audio('teaching_failure', 'assets/audio/teachingFailure.mp3');
    }

    create() {
        console.log('Classroom Scene created!');

        // === CLASSROOM MUSIC ===
        // Stop all previous scene music first
        this.sound.stopAll();

        // Play looping classroom background music
        this.classroomMusic = this.sound.add('classroom_music', {
            loop: true,
            volume: 0.4
        });
        this.classroomMusic.play();

        // Controls enabled from start
        this.controlsEnabled = true;

        // Initialize arrival notifications array
        this.arrivalNotifications = [];

        // Initialize material click tracking
        this.selectedMaterial = null;
        this.materialClicked = false;

        // Initialize teaching mode
        this.teachingMode = false;
        this.teachingMaterial = null;

        // Initialize nap time trigger
        this.napTimeTriggered = false;
        this.teachingNotificationActive = false;

        // Initialize observation panel (will be created after UI)

        // === CLASSROOM VIEWPORT SYSTEM ===
        // Larger room than cottage: 900x650 centered in 1280x720 canvas with black borders

        // 1. Black background (fills entire canvas)
        this.add.rectangle(640, 360, 1280, 720, 0x000000).setDepth(-1000);

        // 2. Define room dimensions
        this.roomWidth = 900;
        this.roomHeight = 650;
        this.roomX = (1280 - this.roomWidth) / 2;  // 190 - centered horizontally
        this.roomY = (720 - this.roomHeight) / 2;   // 35 - centered vertically

        // 3. Adjust physics world bounds to room size
        this.physics.world.setBounds(this.roomX, this.roomY, this.roomWidth, this.roomHeight);

        // Create simple classroom interior (no container, draw directly)
        this.createClassroomInterior();

        // Add furniture and work areas
        this.addFurniture();

        // Add exit door
        this.createExitDoor();

        // Add nap room door/hallway
        this.createNapRoomDoor();

        // Create Virginia player sprite
        this.createPlayer();

        // Spawn Wade (Lead Guide) at his desk
        this.spawnWade();

        // Spawn 9 toddlers
        this.spawnChildren();

        // Set up controls
        this.setupControls();

        // Create Stardew-style border around room
        this.createStardewBorder();

        // Create clock (continues from village time, 2x speed for classroom)
        this.clock = new Clock(this, this.gameTime.hour, this.gameTime.minute, this.gameTime.dayOfWeek, 2);

        // Create energy meter (continues from previous scene)
        const currentEnergy = this.registry.get('playerEnergy') || 100;
        this.energyMeter = new EnergyMeter(this, currentEnergy);

        // Create experience/leveling system
        this.xpSystem = new ExperienceSystem(this);

        // Create mission tracker
        this.missionTracker = new MissionTracker(this);

        // Add starter mission: Teach 3 successful lessons
        this.successfulLessons = 0;
        this.missionTracker.addMission('Teach 3 successful lessons (0/3)', 'teach_three_lessons');

        // Initialize inventory system (shared across all scenes via localStorage)
        this.inventorySystem = new InventorySystem(this, {
            hotbarSize: 10,
            inventoryRows: 4,
            inventoryCols: 10,
            persistKey: 'montessori_inventory'
        });

        // Initialize inventory UI
        this.inventoryUI = new InventoryUI(this, this.inventorySystem);

        // Create clothing menu
        this.time.delayedCall(100, () => {
            this.clothingMenu = new ClothingMenu(this, this.player);
        });

        // Create observation panel for children
        this.createObservationPanel();

        // Create material info panel
        this.createMaterialInfoPanel();

        // Click anywhere to close panels
        this.input.on('pointerdown', () => {
            // Small delay to let click handlers run first
            this.time.delayedCall(10, () => {
                // If a child was clicked, don't close the observation panel
                if (this.childClicked) {
                    this.childClicked = false;
                    return;
                }

                // If a material was clicked, don't close the material panel
                if (this.materialClicked) {
                    this.materialClicked = false;
                    return;
                }

                // Otherwise, close both panels if open
                if (this.observedChild) {
                    this.hideObservation();
                    this.observedChild = null;
                }

                if (this.selectedMaterial) {
                    this.hideMaterialInfo();
                    this.selectedMaterial = null;
                }
            });
        });

        // Setup camera to view the room properly
        this.cameras.main.setBounds(0, 0, 1280, 720);
        this.cameras.main.centerOn(640, 360);
    }

    createClassroomInterior() {
        // Simple tan floor for now (draw directly, no container)
        const floor = this.add.rectangle(
            this.roomX + this.roomWidth / 2,
            this.roomY + this.roomHeight / 2,
            this.roomWidth,
            this.roomHeight,
            0xD2B48C // Tan color
        );
        floor.setDepth(-10); // Behind everything
    }

    addFurniture() {
        // Generate furniture sprites
        const shelfKey = generateShelf(this);
        const rugKey = generateLargeRug(this);
        const tableKey = generateSmallTable(this);

        // === SHELVES ALONG WALLS (7 total - reduced from 10) ===
        // Left wall - 2 shelves (PRACTICAL LIFE)
        this.add.image(this.roomX + 90, this.roomY + 120, shelfKey).setDepth(0);
        this.add.image(this.roomX + 90, this.roomY + 380, shelfKey).setDepth(0);

        // Right wall - 2 shelves (LANGUAGE & FINE MOTOR)
        this.add.image(this.roomX + this.roomWidth - 90, this.roomY + 120, shelfKey).setDepth(0);
        this.add.image(this.roomX + this.roomWidth - 90, this.roomY + 380, shelfKey).setDepth(0);

        // Back wall - 3 shelves (SENSORIAL)
        this.add.image(this.roomX + 300, this.roomY + 70, shelfKey).setDepth(0);
        this.add.image(this.roomX + 500, this.roomY + 70, shelfKey).setDepth(0);
        this.add.image(this.roomX + 700, this.roomY + 70, shelfKey).setDepth(0);

        // === ADD MONTESSORI MATERIALS ===
        this.addMaterials();

        // === ONE LARGE RUG IN CENTER ===
        // Centered in the middle of the room for group work/circle time
        this.add.image(
            this.roomX + this.roomWidth / 2,
            this.roomY + this.roomHeight / 2 + 20,
            rugKey
        ).setDepth(1);

        // === SMALL TABLES (work surfaces) ===
        this.add.image(this.roomX + 250, this.roomY + 200, tableKey).setDepth(2);
        this.add.image(this.roomX + 650, this.roomY + 200, tableKey).setDepth(2);

        console.log('Classroom furniture added: 7 shelves, 1 large rug, 2 tables');
    }

    addMaterials() {
        // Generate procedural material sprites for shelves
        const pinkTower = generatePinkTower(this);
        const cylinders = generateCylinders(this);
        const colorTablets = generateColorTablets(this);
        const pouring = generatePouringPitchers(this);
        const spooning = generateSpooningTray(this);
        const broom = generateBroom(this);
        const books = generateBooks(this);
        const puzzle = generatePuzzle(this);
        const nestingBoxes = generateNestingBoxes(this);

        // Store materials for interaction
        this.materials = [];

        // Helper function to add interactive material
        const addMaterial = (x, y, proceduralKey, materialId) => {
            const materialData = materialsData.find(m => m.id === materialId);
            if (!materialData) {
                console.warn(`Material data not found for: ${materialId}`);
                return;
            }

            // Use procedural sprite on shelf
            const sprite = this.add.image(x, y, proceduralKey);
            sprite.setDepth(3);
            sprite.setInteractive({ useHandCursor: true });

            // Store material data on sprite
            sprite.materialData = materialData;

            // Click handler
            sprite.on('pointerdown', () => {
                this.materialClicked = true;
                this.showMaterialInfo(materialData);
                this.selectedMaterial = sprite;
            });

            this.materials.push(sprite);
        };

        // === BACK WALL - SENSORIAL AREA ===
        // Left back shelf
        addMaterial(this.roomX + 280, this.roomY + 60, pinkTower, 'pink_tower');
        addMaterial(this.roomX + 320, this.roomY + 60, cylinders, 'knobbed_cylinders');

        // Center back shelf
        addMaterial(this.roomX + 480, this.roomY + 60, colorTablets, 'color_tablets');
        addMaterial(this.roomX + 520, this.roomY + 60, nestingBoxes, 'nesting_boxes');

        // Right back shelf
        addMaterial(this.roomX + 680, this.roomY + 60, puzzle, 'puzzle');
        addMaterial(this.roomX + 720, this.roomY + 60, cylinders, 'knobbed_cylinders');

        // === LEFT WALL - PRACTICAL LIFE AREA ===
        // Top left shelf
        addMaterial(this.roomX + 70, this.roomY + 110, pouring, 'pouring_pitchers');
        addMaterial(this.roomX + 110, this.roomY + 110, spooning, 'spooning_tray');

        // Bottom left shelf
        addMaterial(this.roomX + 70, this.roomY + 370, broom, 'broom');
        addMaterial(this.roomX + 110, this.roomY + 370, pouring, 'pouring_pitchers');

        // === RIGHT WALL - LANGUAGE & FINE MOTOR ===
        // Top right shelf
        addMaterial(this.roomX + this.roomWidth - 110, this.roomY + 110, books, 'books');
        addMaterial(this.roomX + this.roomWidth - 70, this.roomY + 110, books, 'books');

        // Bottom right shelf
        addMaterial(this.roomX + this.roomWidth - 110, this.roomY + 370, puzzle, 'puzzle');
        addMaterial(this.roomX + this.roomWidth - 70, this.roomY + 370, nestingBoxes, 'nesting_boxes');

        // Add area labels
        this.addAreaLabels();

        console.log('Montessori materials added to shelves (interactive)');
    }

    addAreaLabels() {
        const labelStyle = {
            fontSize: '14px',
            fontFamily: 'monospace',
            fill: '#4A3020',
            backgroundColor: '#F5DEB3',
            padding: { x: 6, y: 3 }
        };

        // Sensorial (back wall)
        this.add.text(this.roomX + 500, this.roomY + 20, 'SENSORIAL', labelStyle)
            .setOrigin(0.5)
            .setDepth(1001);

        // Practical Life (left wall)
        this.add.text(this.roomX + 90, this.roomY + 250, 'PRACTICAL\nLIFE', {
            ...labelStyle,
            align: 'center',
            lineSpacing: 2
        }).setOrigin(0.5).setDepth(1001);

        // Language & Fine Motor (right wall)
        this.add.text(this.roomX + this.roomWidth - 90, this.roomY + 250, 'LANGUAGE\n& MOTOR', {
            ...labelStyle,
            align: 'center',
            lineSpacing: 2
        }).setOrigin(0.5).setDepth(1001);
    }

    createExitDoor() {
        // Simple door at bottom center (where Virginia enters)
        const doorX = this.roomX + this.roomWidth / 2;
        const doorY = this.roomY + this.roomHeight - 30;

        // Draw door
        const graphics = this.add.graphics();
        graphics.fillStyle(0x8B4513, 1); // Brown door
        graphics.fillRect(doorX - 40, doorY, 80, 60);

        // Door frame
        graphics.lineStyle(4, 0x6F5539, 1);
        graphics.strokeRect(doorX - 40, doorY, 80, 60);

        // Door handle
        graphics.fillStyle(0xFFD700, 1); // Gold handle
        graphics.fillCircle(doorX + 20, doorY + 30, 6);

        graphics.setDepth(3);

        // Create interactive zone (click to exit)
        this.exitZone = this.add.zone(doorX, doorY + 30, 80, 60);
        this.exitZone.setInteractive({ useHandCursor: true });
        this.exitZone.setDepth(3);

        // Hover text
        this.doorText = this.add.text(doorX, doorY - 20, 'Click to exit', {
            fontSize: '16px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 },
            fontFamily: 'monospace'
        }).setOrigin(0.5).setDepth(100).setVisible(false);

        // Hover events
        this.exitZone.on('pointerover', () => {
            this.doorText.setVisible(true);
        });

        this.exitZone.on('pointerout', () => {
            this.doorText.setVisible(false);
        });

        // Click to exit
        this.exitZone.on('pointerdown', () => {
            // Check if Virginia is close enough to the door
            const distance = Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                this.exitZone.x,
                this.exitZone.y
            );

            if (distance < 100) {
                this.exitClassroom();
            } else {
                // Show "too far" message
                this.showTooFarMessage();
            }
        });

        console.log('Exit door created at bottom center (click to exit)');
    }

    createNapRoomDoor() {
        // Create hallway/door to nap room in the lower right corner
        // NOTE: Door is non-functional - nap time starts automatically at 12:30 PM
        const doorX = this.roomX + this.roomWidth - 60;
        const doorY = this.roomY + this.roomHeight - 80;

        // Draw hallway entrance (darker rectangle to indicate depth)
        const hallwayGraphics = this.add.graphics();
        hallwayGraphics.fillStyle(0x3a2817, 1); // Dark brown for hallway
        hallwayGraphics.fillRect(doorX - 30, doorY - 50, 60, 100);
        hallwayGraphics.setDepth(3);

        // Draw door frame
        hallwayGraphics.lineStyle(4, 0x6F5539, 1);
        hallwayGraphics.strokeRect(doorX - 30, doorY - 50, 60, 100);

        // Draw door (slightly ajar)
        hallwayGraphics.fillStyle(0x8B4513, 1); // Brown door
        hallwayGraphics.fillRect(doorX - 30, doorY - 50, 50, 100);

        // Door handle
        hallwayGraphics.fillStyle(0xFFD700, 1); // Gold handle
        hallwayGraphics.fillCircle(doorX - 10, doorY, 6);

        // Add label above door
        this.napRoomLabel = this.add.text(doorX, doorY - 70, 'NAP ROOM', {
            fontSize: '14px',
            fill: '#ffffff',
            backgroundColor: '#4a7c59',
            padding: { x: 8, y: 4 },
            fontFamily: 'monospace',
            fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(100);

        console.log('Nap room door created (non-functional - automatic nap time at 12:30)');
    }

    createPlayer() {
        // Check if player has bandana preference stored
        const bandanaOnHead = this.registry.get('bandanaOnHead') || false;
        this.bandanaOnHead = bandanaOnHead;

        // Generate Virginia idle sprite
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

        // Create player near the door (bottom center of room)
        const startX = this.roomX + this.roomWidth / 2;
        const startY = this.roomY + this.roomHeight - 100;

        this.player = this.physics.add.sprite(
            startX,
            startY,
            idleSpriteKey
        );
        this.player.setCollideWorldBounds(true);
        this.player.setScale(3);
        this.player.setDepth(this.player.y); // Depth based on Y position for sorting
        this.player.setVisible(true); // Ensure visible
        this.player.setAlpha(1); // Ensure fully opaque

        // Set player body size (for collision)
        this.player.body.setSize(40, 40);
        this.player.body.setOffset(4, 4);

        // Store idle sprite key
        this.idleSpriteKey = idleSpriteKey;

        console.log('Virginia created at:', this.player.x, this.player.y, 'with sprite:', idleSpriteKey);
    }

    spawnWade() {
        // Generate Wade's sprites
        const wadeIdleKey = generateWadeSprite(this);
        generateWadeSideSprite(this);
        generateWadeBackSprite(this);

        // Wade stands near the teacher's desk area (upper left of classroom)
        const wadeX = this.roomX + 150;
        const wadeY = this.roomY + 200;

        this.wade = this.add.sprite(wadeX, wadeY, wadeIdleKey);
        this.wade.setScale(2.5);
        this.wade.setDepth(wadeY); // Depth sorting
        this.wade.setInteractive({ useHandCursor: true });

        // Store Wade's data
        this.wade.npcData = wadeData;

        // Click to talk to Wade
        this.wade.on('pointerdown', () => {
            this.talkToWade();
        });

        // Check if Virginia arrived late and have Wade scold her, or early and greet her
        // Wade's dialogue now only appears when Virginia clicks on him
        // (No automatic greeting when entering classroom)
    }

    talkToWade() {
        if (this.wadeDialogueActive) return;

        this.wadeDialogueActive = true;

        // Check if Virginia is late (after 8:00 AM)
        const currentTime = this.clock.getTime();
        const currentMinutes = currentTime.hour * 60 + currentTime.minute;
        const eightAM = 8 * 60; // 480 minutes
        const isLate = currentMinutes >= eightAM;

        // Choose appropriate dialogue
        const dialogueText = isLate ? wadeData.dialogue.lateArrival : wadeData.dialogue.greeting;

        // Show dialogue bubble
        const bubble = this.add.rectangle(
            this.wade.x + 50,
            this.wade.y - 80,
            250,
            80,
            0xffffff,
            0.95
        ).setDepth(1500).setOrigin(0, 0.5);

        const bubbleBorder = this.add.rectangle(
            this.wade.x + 50,
            this.wade.y - 80,
            250,
            80
        ).setStrokeStyle(3, 0x2C1C0C).setDepth(1501).setOrigin(0, 0.5);

        const dialogue = this.add.text(
            this.wade.x + 60,
            this.wade.y - 80,
            `Wade: "${dialogueText}"`,
            {
                fontSize: '14px',
                fill: '#2C1C0C',
                fontFamily: 'monospace',
                wordWrap: { width: 230 }
            }
        ).setDepth(1502).setOrigin(0, 0.5);

        // Fade out after 4 seconds
        this.time.delayedCall(4000, () => {
            this.tweens.add({
                targets: [bubble, bubbleBorder, dialogue],
                alpha: 0,
                duration: 500,
                onComplete: () => {
                    bubble.destroy();
                    bubbleBorder.destroy();
                    dialogue.destroy();
                    this.wadeDialogueActive = false;
                }
            });
        });
    }

    wadeScoldVirginia() {
        console.log('Wade scolding Virginia for being late');

        // Disable player controls
        this.controlsEnabled = false;

        // Show scolding dialogue
        const scoldBubble = this.add.rectangle(
            640,
            300,
            500,
            120,
            0xffffcc,
            0.95
        ).setDepth(2000).setScrollFactor(0);

        const scoldBorder = this.add.rectangle(
            640,
            300,
            500,
            120
        ).setStrokeStyle(4, 0xff9800).setDepth(2001).setScrollFactor(0);

        const scoldText = this.add.text(
            640,
            300,
            `Wade: "${wadeData.dialogue.lateArrival}"`,
            {
                fontSize: '18px',
                fill: '#2C1C0C',
                fontFamily: 'monospace',
                wordWrap: { width: 460 },
                align: 'center'
            }
        ).setOrigin(0.5).setDepth(2002).setScrollFactor(0);

        // Fade out after 5 seconds
        this.time.delayedCall(5000, () => {
            this.tweens.add({
                targets: [scoldBubble, scoldBorder, scoldText],
                alpha: 0,
                duration: 500,
                onComplete: () => {
                    scoldBubble.destroy();
                    scoldBorder.destroy();
                    scoldText.destroy();
                    this.controlsEnabled = true;
                }
            });
        });
    }

    wadeGreetEarlyArrival() {
        console.log('Wade greeting Virginia for arriving early');

        // Disable player controls
        this.controlsEnabled = false;

        // Show early arrival greeting dialogue
        const greetBubble = this.add.rectangle(
            640,
            300,
            550,
            140,
            0xE8F5E9,
            0.95
        ).setDepth(2000).setScrollFactor(0);

        const greetBorder = this.add.rectangle(
            640,
            300,
            550,
            140
        ).setStrokeStyle(4, 0x4CAF50).setDepth(2001).setScrollFactor(0);

        const greetText = this.add.text(
            640,
            300,
            `Wade: "Good morning, Virginia! You're here early. Why don't you click on the materials to familiarize yourself with them before the children arrive?"`,
            {
                fontSize: '18px',
                fill: '#2C1C0C',
                fontFamily: 'monospace',
                wordWrap: { width: 510 },
                align: 'center'
            }
        ).setOrigin(0.5).setDepth(2002).setScrollFactor(0);

        // Fade out after 6 seconds
        this.time.delayedCall(6000, () => {
            this.tweens.add({
                targets: [greetBubble, greetBorder, greetText],
                alpha: 0,
                duration: 500,
                onComplete: () => {
                    greetBubble.destroy();
                    greetBorder.destroy();
                    greetText.destroy();
                    this.controlsEnabled = true;
                }
            });
        });
    }

    spawnChildren() {
        // Create array to store child sprites
        this.children = [];
        this.observedChild = null; // Track currently observed child
        this.childClicked = false; // Track if child was just clicked

        // Define positions in classroom (9 children - better spacing)
        const positions = [
            { x: 300, y: 150 },  // Upper left
            { x: 500, y: 150 },  // Upper center
            { x: 700, y: 150 },  // Upper right
            { x: 300, y: 300 },  // Middle left
            { x: 500, y: 300 },  // Middle center
            { x: 700, y: 300 },  // Middle right
            { x: 350, y: 450 },  // Lower left
            { x: 550, y: 450 },  // Lower center
            { x: 750, y: 450 },  // Lower right
        ];

        // Create arrival schedule (7:45 - 8:00 AM = 15 minutes)
        // Times in minutes after 7:45 (0-15)
        this.arrivalSchedule = [
            { childIndex: 0, arriveMinute: 0 },   // Emma - 7:45 (early!)
            { childIndex: 3, arriveMinute: 2 },   // Aiden - 7:47
            { childIndex: 5, arriveMinute: 4 },   // Noah - 7:49
            { childIndex: 1, arriveMinute: 6 },   // Marcus - 7:51
            { childIndex: 7, arriveMinute: 8 },   // Oliver - 7:53
            { childIndex: 2, arriveMinute: 9 },   // Lily - 7:54
            { childIndex: 4, arriveMinute: 11 },  // Sofia - 7:56
            { childIndex: 6, arriveMinute: 13 },  // Mia - 7:58
            { childIndex: 8, arriveMinute: 15 },  // Zoe - 8:00 (right on time!)
        ];

        this.arrivedChildren = new Set(); // Track who has arrived

        // Initialize all children but keep them hidden
        childrenData.slice(0, 9).forEach((childData, index) => {
            // Generate idle sprite
            const idleSpriteKey = generateChildSprite(this, childData);

            // Generate walking animations
            generateChildWalkingAnimations(this, childData);

            // Create Phaser animations for this child
            const animPrefix = childData.name;

            // Add frames manually
            ['front', 'back', 'side'].forEach(direction => {
                const textureName = `${animPrefix}_walk_${direction}`;
                this.textures.get(textureName).add('frame0', 0, 0, 0, 48, 48);
                this.textures.get(textureName).add('frame1', 0, 48, 0, 48, 48);
            });

            // Create animations
            this.anims.create({
                key: `${animPrefix}_walk_front`,
                frames: [
                    { key: `${animPrefix}_walk_front`, frame: 'frame0' },
                    { key: `${animPrefix}_walk_front`, frame: 'frame1' }
                ],
                frameRate: 6,
                repeat: -1
            });

            this.anims.create({
                key: `${animPrefix}_walk_back`,
                frames: [
                    { key: `${animPrefix}_walk_back`, frame: 'frame0' },
                    { key: `${animPrefix}_walk_back`, frame: 'frame1' }
                ],
                frameRate: 6,
                repeat: -1
            });

            this.anims.create({
                key: `${animPrefix}_walk_side`,
                frames: [
                    { key: `${animPrefix}_walk_side`, frame: 'frame0' },
                    { key: `${animPrefix}_walk_side`, frame: 'frame1' }
                ],
                frameRate: 6,
                repeat: -1
            });

            // Get position for this child
            const pos = positions[index];

            // Create sprite at final position but hidden
            const child = this.add.sprite(pos.x, pos.y, idleSpriteKey);
            child.setScale(2.5);
            child.setDepth(pos.y); // Depth based on Y position for sorting
            child.setVisible(false); // Hidden until arrival
            child.setAlpha(0); // Start transparent

            // Store final position and idle sprite
            child.finalX = pos.x;
            child.finalY = pos.y;
            child.idleSpriteKey = idleSpriteKey;
            child.isMoving = false;
            child.moveTimer = 0;
            child.targetX = pos.x;
            child.targetY = pos.y;

            // Make interactive for observation (will activate when visible)
            child.setInteractive({ useHandCursor: true });

            // Store reference with data
            child.childData = childData;
            child.childIndex = index;

            // Click to observe
            child.on('pointerdown', () => {
                this.childClicked = true;
                this.showObservation(childData);
                this.observedChild = child;
            });

            // Add to array
            this.children.push(child);
        });

        console.log('Children initialized (hidden, awaiting arrival times)');
    }

    createStardewBorder() {
        // Thick 3-tone beveled border around room (Stardew style)
        const borderThickness = 10;
        const graphics = this.add.graphics();
        graphics.setDepth(999);

        // Outer border (dark) - STROKE, not fill
        graphics.lineStyle(borderThickness, 0xA84028);
        graphics.strokeRect(
            this.roomX - borderThickness / 2,
            this.roomY - borderThickness / 2,
            this.roomWidth + borderThickness,
            this.roomHeight + borderThickness
        );

        // Middle border
        graphics.lineStyle(6, 0xD87040);
        graphics.strokeRect(
            this.roomX - 3,
            this.roomY - 3,
            this.roomWidth + 6,
            this.roomHeight + 6
        );

        // Inner border (light)
        graphics.lineStyle(2, 0xF0A070);
        graphics.strokeRect(
            this.roomX - 1,
            this.roomY - 1,
            this.roomWidth + 2,
            this.roomHeight + 2
        );
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

        // C key for clothing menu
        this.cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }

    update(time, delta) {
        // Update clock (always update time)
        if (this.clock) {
            this.clock.update(delta);
        }

        // Check if it's nap time (12:15 PM) and hasn't already transitioned
        // Use clock's current time, not stale gameTime from init
        const currentTime = this.clock ? this.clock.getTime() : this.gameTime;
        if (!this.napTimeTriggered && currentTime.hour === 12 && currentTime.minute >= 15) {
            // Don't trigger nap time if a teaching notification is currently showing
            // Wait for teaching notifications to complete first
            if (this.teachingNotificationActive) {
                return; // Wait for next frame
            }

            this.napTimeTriggered = true;
            this.gameTime = currentTime; // Update gameTime for transition
            this.triggerNapTime();
            return; // Stop other updates during nap time transition
        }

        if (!this.controlsEnabled) return;

        // Check for child arrivals based on time
        if (this.clock && this.arrivalSchedule) {
            this.checkArrivals();
        }

        // Update child movement
        this.updateChildMovement(delta);

        // Movement
        const speed = 200;
        let moveX = 0;
        let moveY = 0;

        // Check input
        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            moveX = -1;
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            moveX = 1;
        }

        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            moveY = -1;
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            moveY = 1;
        }

        // Apply movement
        this.player.setVelocity(moveX * speed, moveY * speed);

        // Update depth based on Y position (for proper layering with children)
        this.player.setDepth(this.player.y);

        // Handle sprite flipping for left/right
        if (moveX !== 0) {
            this.player.setFlipX(moveX < 0);
        }

        // Play appropriate animation
        const isMoving = moveX !== 0 || moveY !== 0;

        if (isMoving) {
            // Choose animation based on dominant direction
            if (Math.abs(moveY) > Math.abs(moveX)) {
                // Vertical movement dominant
                if (moveY < 0) {
                    this.player.play('walk_back', true);
                } else {
                    this.player.play('walk_front', true);
                }
            } else {
                // Horizontal movement dominant
                this.player.play('walk_side', true);
            }
        } else {
            // Idle
            this.player.stop();
            this.player.setTexture(this.idleSpriteKey);
        }

        // C key handling for clothing menu
        if (Phaser.Input.Keyboard.JustDown(this.cKey)) {
            if (this.clothingMenu) {
                this.clothingMenu.toggle();
            }
        }

        // Update inventory UI
        if (this.inventoryUI) {
            this.inventoryUI.update();
        }
    }

    updateChildMovement(delta) {
        if (!this.children) return;

        this.children.forEach(child => {
            // Only move children who have arrived
            if (!this.arrivedChildren.has(child.childIndex)) return;
            if (!child.visible) return;

            // Increment move timer
            child.moveTimer += delta;

            const speed = 40; // Toddlers walk slower than Virginia

            if (!child.isMoving) {
                // Decide when to start moving (every 3-8 seconds)
                if (child.moveTimer > Phaser.Math.Between(3000, 8000)) {
                    child.moveTimer = 0;
                    child.isMoving = true;

                    // Pick random target within classroom bounds
                    child.targetX = this.roomX + Phaser.Math.Between(100, this.roomWidth - 100);
                    child.targetY = this.roomY + Phaser.Math.Between(100, this.roomHeight - 100);
                }
            } else {
                // Move towards target
                const dx = child.targetX - child.x;
                const dy = child.targetY - child.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 5) {
                    // Reached target - stop moving
                    child.isMoving = false;
                    child.moveTimer = 0;
                    child.stop();
                    child.setTexture(child.idleSpriteKey);

                    // Update teaching glow position when stopped
                    if (child.isInTeachingMode && child.teachingGlow && child.teachingGlow.visible) {
                        child.teachingGlow.setPosition(child.x, child.y);
                    }
                } else {
                    // Move towards target
                    const moveX = (dx / distance) * speed * (delta / 1000);
                    const moveY = (dy / distance) * speed * (delta / 1000);

                    child.x += moveX;
                    child.y += moveY;

                    // Update depth based on Y position (for proper layering)
                    child.setDepth(child.y);

                    // Update teaching glow position if in teaching mode
                    if (child.isInTeachingMode && child.teachingGlow && child.teachingGlow.visible) {
                        child.teachingGlow.setPosition(child.x, child.y);
                    }

                    // Play appropriate animation based on direction
                    const animPrefix = child.childData.name;

                    if (Math.abs(dy) > Math.abs(dx)) {
                        // Vertical movement dominant
                        if (dy < 0) {
                            child.play(`${animPrefix}_walk_back`, true);
                        } else {
                            child.play(`${animPrefix}_walk_front`, true);
                        }
                    } else {
                        // Horizontal movement dominant
                        child.play(`${animPrefix}_walk_side`, true);
                        child.setFlipX(dx < 0); // Flip for left/right
                    }
                }
            }
        });
    }

    exitClassroom() {
        console.log('Exiting classroom, returning to village...');

        // Fade out
        this.cameras.main.fadeOut(500);

        this.cameras.main.once('camerafadeoutcomplete', () => {
            // Get current time from clock (not the stale gameTime from init)
            const currentTime = this.clock.getTime();

            // Return to village scene at school position
            this.scene.start('VillageScene', {
                gameTime: currentTime,
                energy: this.energyMeter.getEnergy(),
                spawnLocation: 'school' // Spawn Virginia outside school
            });
        });
    }

    showTooFarMessage() {
        // Don't show multiple messages
        if (this.tooFarMessage) return;

        this.tooFarMessage = this.add.text(this.player.x, this.player.y - 80, 'Get closer to the door', {
            fontSize: '18px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 },
            fontFamily: 'monospace'
        }).setOrigin(0.5).setDepth(2000);

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

    createObservationPanel() {
        // Position panel on right side outside the room border
        const panelX = 1050;
        const panelY = 360;
        const panelWidth = 400;
        const panelHeight = 350;

        // Background with Stardew-style border
        this.observationBg = this.add.rectangle(
            panelX, panelY,
            panelWidth, panelHeight,
            0xF5DEB3, 1 // Tan background
        );
        this.observationBg.setStrokeStyle(4, 0x4A3020); // Dark brown border
        this.observationBg.setDepth(1100);
        this.observationBg.setVisible(false);

        // Inner border
        this.observationInnerBorder = this.add.rectangle(
            panelX, panelY,
            panelWidth - 10, panelHeight - 10,
            0xF5DEB3, 0
        );
        this.observationInnerBorder.setStrokeStyle(2, 0x8B6F47); // Medium brown
        this.observationInnerBorder.setDepth(1101);
        this.observationInnerBorder.setVisible(false);

        // Child name
        this.observationName = this.add.text(panelX, panelY - 150, '', {
            fontSize: '24px',
            fontFamily: 'monospace',
            fill: '#2C1C0C',
            fontStyle: 'bold',
            wordWrap: { width: panelWidth - 40 }
        }).setOrigin(0.5, 0).setDepth(1102);
        this.observationName.setVisible(false);

        // Child age
        this.observationAge = this.add.text(panelX, panelY - 115, '', {
            fontSize: '16px',
            fontFamily: 'monospace',
            fill: '#4A3020',
            wordWrap: { width: panelWidth - 40 }
        }).setOrigin(0.5, 0).setDepth(1102);
        this.observationAge.setVisible(false);

        // Temperament
        this.observationTemp = this.add.text(panelX, panelY - 85, '', {
            fontSize: '16px',
            fontFamily: 'monospace',
            fill: '#4A3020',
            wordWrap: { width: panelWidth - 40 }
        }).setOrigin(0.5, 0).setDepth(1102);
        this.observationTemp.setVisible(false);

        // Sensitive periods
        this.observationPeriods = this.add.text(panelX, panelY - 45, '', {
            fontSize: '14px',
            fontFamily: 'monospace',
            fill: '#2a5599',
            wordWrap: { width: panelWidth - 40 },
            lineSpacing: 6
        }).setOrigin(0.5, 0).setDepth(1102);
        this.observationPeriods.setVisible(false);

        // Current mood
        this.observationMood = this.add.text(panelX, panelY + 50, '', {
            fontSize: '14px',
            fontFamily: 'monospace',
            fill: '#c2185b',
            wordWrap: { width: panelWidth - 40 },
            lineSpacing: 4
        }).setOrigin(0.5, 0).setDepth(1102);
        this.observationMood.setVisible(false);

        // Interests
        this.observationInterests = this.add.text(panelX, panelY + 95, '', {
            fontSize: '14px',
            fontFamily: 'monospace',
            fill: '#558b2f',
            wordWrap: { width: panelWidth - 40 },
            lineSpacing: 4
        }).setOrigin(0.5, 0).setDepth(1102);
        this.observationInterests.setVisible(false);
    }

    showObservation(childData) {
        // Show panel
        this.observationBg.setVisible(true);
        this.observationInnerBorder.setVisible(true);
        this.observationName.setVisible(true);
        this.observationAge.setVisible(true);
        this.observationTemp.setVisible(true);
        this.observationPeriods.setVisible(true);
        this.observationMood.setVisible(true);
        this.observationInterests.setVisible(true);

        // Update content
        this.observationName.setText(childData.name);
        this.observationAge.setText(`Age: ${childData.ageMonths} months`);
        this.observationTemp.setText(`Temperament: ${childData.temperament}`);
        this.observationPeriods.setText(`Sensitive to:\n${childData.sensitivePeriods.join(', ')}`);
        this.observationMood.setText(`Mood: ${childData.currentMood}`);
        this.observationInterests.setText(`Interested in:\n${childData.currentInterest}`);
    }

    hideObservation() {
        this.observationBg.setVisible(false);
        this.observationInnerBorder.setVisible(false);
        this.observationName.setVisible(false);
        this.observationAge.setVisible(false);
        this.observationTemp.setVisible(false);
        this.observationPeriods.setVisible(false);
        this.observationMood.setVisible(false);
        this.observationInterests.setVisible(false);
    }

    createMaterialInfoPanel() {
        // Position panel on left side
        const panelX = 230;
        const panelY = 360;
        const panelWidth = 420;
        const panelHeight = 400;

        // Background with Stardew-style border
        this.materialInfoBg = this.add.rectangle(
            panelX, panelY,
            panelWidth, panelHeight,
            0xF5DEB3, 1
        );
        this.materialInfoBg.setStrokeStyle(4, 0x4A3020);
        this.materialInfoBg.setDepth(1100);
        this.materialInfoBg.setVisible(false);

        // Inner border
        this.materialInfoInnerBorder = this.add.rectangle(
            panelX, panelY,
            panelWidth - 10, panelHeight - 10,
            0xF5DEB3, 0
        );
        this.materialInfoInnerBorder.setStrokeStyle(2, 0x8B6F47);
        this.materialInfoInnerBorder.setDepth(1101);
        this.materialInfoInnerBorder.setVisible(false);

        // Material sprite display (will be set when showing)
        this.materialInfoSprite = this.add.image(panelX, panelY - 120, '');
        this.materialInfoSprite.setDepth(1102);
        this.materialInfoSprite.setVisible(false);

        // Material name
        this.materialInfoName = this.add.text(panelX, panelY - 40, '', {
            fontSize: '24px',
            fontFamily: 'monospace',
            fill: '#2C1C0C',
            fontStyle: 'bold',
            wordWrap: { width: panelWidth - 40 },
            align: 'center'
        }).setOrigin(0.5, 0).setDepth(1102);
        this.materialInfoName.setVisible(false);

        // Material category
        this.materialInfoCategory = this.add.text(panelX, panelY - 10, '', {
            fontSize: '16px',
            fontFamily: 'monospace',
            fill: '#8B6F47',
            wordWrap: { width: panelWidth - 40 },
            align: 'center'
        }).setOrigin(0.5, 0).setDepth(1102);
        this.materialInfoCategory.setVisible(false);

        // Material description
        this.materialInfoDesc = this.add.text(panelX, panelY + 20, '', {
            fontSize: '14px',
            fontFamily: 'monospace',
            fill: '#4A3020',
            wordWrap: { width: panelWidth - 60 },
            lineSpacing: 4,
            align: 'center'
        }).setOrigin(0.5, 0).setDepth(1102);
        this.materialInfoDesc.setVisible(false);

        // Game mechanics info
        this.materialInfoMechanics = this.add.text(panelX, panelY + 100, '', {
            fontSize: '14px',
            fontFamily: 'monospace',
            fill: '#2a5599',
            fontStyle: 'bold',
            wordWrap: { width: panelWidth - 60 },
            lineSpacing: 4,
            align: 'center'
        }).setOrigin(0.5, 0).setDepth(1102);
        this.materialInfoMechanics.setVisible(false);

        // TEACH button (NEW!)
        const buttonWidth = 180;
        const buttonHeight = 50;
        const buttonY = panelY + panelHeight / 2 - 10; // Moved down for better spacing

        // Button background
        this.teachButtonBg = this.add.rectangle(
            panelX, buttonY,
            buttonWidth, buttonHeight,
            0x4CAF50
        );
        this.teachButtonBg.setStrokeStyle(3, 0x2C1C0C);
        this.teachButtonBg.setDepth(1103);
        this.teachButtonBg.setInteractive({ useHandCursor: true });
        this.teachButtonBg.setVisible(false);

        // Button text
        this.teachButtonText = this.add.text(panelX, buttonY, '[ TEACH ]', {
            fontSize: '24px',
            fontFamily: 'monospace',
            fill: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(1104);
        this.teachButtonText.setVisible(false);

        // Button hover effect
        this.teachButtonBg.on('pointerover', () => {
            this.teachButtonBg.setFillStyle(0x66BB6A); // Lighter green
        });
        this.teachButtonBg.on('pointerout', () => {
            this.teachButtonBg.setFillStyle(0x4CAF50); // Original green
        });

        // Button click handler (we'll implement this next)
        this.teachButtonBg.on('pointerdown', () => {
            this.startTeachingMode();
        });
    }

    showMaterialInfo(materialData) {
        // Show panel
        this.materialInfoBg.setVisible(true);
        this.materialInfoInnerBorder.setVisible(true);
        this.materialInfoSprite.setVisible(true);
        this.materialInfoName.setVisible(true);
        this.materialInfoCategory.setVisible(true);
        this.materialInfoDesc.setVisible(true);
        this.materialInfoMechanics.setVisible(true);

        // Only show TEACH button if it's 8:00 AM or later (kids have arrived)
        const currentTime = this.clock.getTime();
        const currentMinutes = currentTime.hour * 60 + currentTime.minute;
        const eightAM = 8 * 60; // 480 minutes
        const showTeachButton = currentMinutes >= eightAM;

        this.teachButtonBg.setVisible(showTeachButton);
        this.teachButtonText.setVisible(showTeachButton);

        // Update content
        this.materialInfoSprite.setTexture(materialData.id);

        // Scale sprite to fit nicely in panel (max 120px)
        const spriteWidth = this.materialInfoSprite.width;
        const spriteHeight = this.materialInfoSprite.height;
        const maxSize = 120;

        if (spriteWidth > maxSize || spriteHeight > maxSize) {
            const scale = Math.min(maxSize / spriteWidth, maxSize / spriteHeight);
            this.materialInfoSprite.setScale(scale);
        } else {
            this.materialInfoSprite.setScale(1);
        }

        this.materialInfoName.setText(materialData.name);
        this.materialInfoCategory.setText(`[${materialData.category}]`);
        this.materialInfoDesc.setText(materialData.description);
        this.materialInfoMechanics.setText(`🎮 ${materialData.mechanicsInfo}`);
    }

    hideMaterialInfo() {
        this.materialInfoBg.setVisible(false);
        this.materialInfoInnerBorder.setVisible(false);
        this.materialInfoSprite.setVisible(false);
        this.materialInfoName.setVisible(false);
        this.materialInfoCategory.setVisible(false);
        this.materialInfoDesc.setVisible(false);
        this.materialInfoMechanics.setVisible(false);
        this.teachButtonBg.setVisible(false);
        this.teachButtonText.setVisible(false);
    }

    startTeachingMode() {
        console.log('TEACH button clicked! Starting teaching mode...');

        // Store the selected material for teaching
        this.teachingMode = true;
        this.teachingMaterial = this.selectedMaterial.materialData;

        // Hide the material info panel
        this.hideMaterialInfo();

        // Change cursor to indicate teaching mode
        this.input.setDefaultCursor('crosshair');

        // Show instruction notification
        this.showTeachingInstruction();

        // Make children clickable for teaching
        this.enableChildTeachingMode();
    }

    showTeachingInstruction() {
        // Create instruction text if it doesn't exist
        if (!this.teachingInstructionText) {
            this.teachingInstructionText = this.add.text(
                640, 50,
                '',
                {
                    fontSize: '24px',
                    fontFamily: 'monospace',
                    fill: '#FFFFFF',
                    backgroundColor: '#4CAF50',
                    padding: { x: 20, y: 10 }
                }
            ).setOrigin(0.5).setDepth(1200).setScrollFactor(0);
        }

        this.teachingInstructionText.setText(`Click a child to teach ${this.teachingMaterial.name}`);
        this.teachingInstructionText.setVisible(true);
    }

    hideTeachingInstruction() {
        if (this.teachingInstructionText) {
            this.teachingInstructionText.setVisible(false);
        }
    }

    enableChildTeachingMode() {
        // Add glow effect to children to show they're clickable
        this.children.forEach(child => {
            if (!child.visible) return; // Skip children who haven't arrived yet

            // Make child interactive if not already
            if (!child.input) {
                child.setInteractive({ useHandCursor: true });
            }

            // Store original child click handler
            if (!child._originalClickHandler) {
                child._originalClickHandler = child.listeners('pointerdown');
            }

            // Add teaching mode click handler - bind the child to the callback
            child.on('pointerdown', () => {
                this.onChildClickedForTeaching(child);
            });

            // Add subtle glow/highlight (optional visual feedback)
            if (!child.teachingGlow) {
                child.teachingGlow = this.add.circle(0, 0, 30, 0x4CAF50, 0.3);
                child.teachingGlow.setDepth(child.depth - 1);
            }

            // Position glow at child's current position
            child.teachingGlow.setPosition(child.x, child.y);
            child.teachingGlow.setVisible(true);

            // Mark this child as in teaching mode so we update glow position
            child.isInTeachingMode = true;
        });
    }

    disableChildTeachingMode() {
        // Remove teaching mode from all children
        this.children.forEach(child => {
            // Remove all pointerdown handlers and re-add original ones if needed
            child.removeAllListeners('pointerdown');

            // Re-add the observation click handler
            child.on('pointerdown', () => {
                this.childClicked = true;
                this.showObservation(child.childData);
                this.observedChild = child;
            });

            // Hide glow
            if (child.teachingGlow) {
                child.teachingGlow.setVisible(false);
            }

            // Clear teaching mode flag on child
            child.isInTeachingMode = false;
        });

        // Reset cursor
        this.input.setDefaultCursor('default');

        // Hide instruction
        this.hideTeachingInstruction();

        // Reset teaching mode flag
        this.teachingMode = false;
        this.teachingMaterial = null;
    }

    onChildClickedForTeaching(childSprite) {
        // Prevent observation panel from opening
        this.childClicked = true;

        console.log(`Teaching ${this.teachingMaterial.name} to ${childSprite.childData.name}`);

        // Start the teaching sequence
        this.performTeachingSequence(childSprite);

        // Exit teaching mode
        this.disableChildTeachingMode();
    }

    performTeachingSequence(childSprite) {
        console.log('Teaching sequence started!');
        console.log('Material:', this.teachingMaterial.name);
        console.log('Child:', childSprite.childData.name);

        // Store material reference BEFORE anything else (it will be cleared)
        const materialToTeach = this.teachingMaterial;

        // Check if teaching will succeed
        const willSucceed = this.checkTeachingSuccess(childSprite);
        console.log('Will succeed?', willSucceed);

        // Disable player controls during teaching
        this.controlsEnabled = false;

        // STEP 1: Virginia walks to child
        const targetX = childSprite.x + 40; // Stand next to child
        const targetY = childSprite.y;

        this.tweens.add({
            targets: this.player,
            x: targetX,
            y: targetY,
            duration: 1000,
            ease: 'Power2',
            onStart: () => {
                // Play walking animation
                this.player.play('walk_side', true);
            },
            onComplete: () => {
                // Stop at child
                this.player.stop();
                this.player.setTexture(this.idleSpriteKey);

                // STEP 2: Show teaching animation (sparkles/hearts)
                this.showTeachingEffect(childSprite, willSucceed);

                // STEP 3: Wait 3 seconds, then complete teaching
                // Use materialToTeach from outer scope (captured at line 1237)
                this.time.delayedCall(3000, () => {
                    this.completeTeaching(childSprite, willSucceed, materialToTeach);
                });
            }
        });
    }

    showTeachingEffect(childSprite, willSucceed) {
        // Create sparkle/heart particles above child
        const effectX = childSprite.x;
        const effectY = childSprite.y - 40;

        // Create multiple sparkles
        const sparkleCount = willSucceed ? 5 : 2;

        for (let i = 0; i < sparkleCount; i++) {
            this.time.delayedCall(i * 600, () => {
                const sparkle = this.add.text(
                    effectX + Phaser.Math.Between(-20, 20),
                    effectY,
                    willSucceed ? '✨' : '?',
                    { fontSize: '32px' }
                ).setDepth(1500);

                // Float up and fade out
                this.tweens.add({
                    targets: sparkle,
                    y: effectY - 50,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Power2',
                    onComplete: () => sparkle.destroy()
                });
            });
        }
    }

    completeTeaching(childSprite, willSucceed, material) {
        const child = childSprite.childData;

        if (willSucceed) {
            // SUCCESS!
            // Update child's learned materials
            if (!child.learnedMaterials.includes(material.id)) {
                child.learnedMaterials.push(material.id);
            }

            // Deduct energy
            this.energyMeter.addEnergy(-material.energyCost);

            // Play success sound effect
            this.sound.play('teaching_success', { volume: 0.6 });

            // Show success notification with detailed feedback
            const successMessage = `✨ ${child.name} learned ${material.name}!\n\n${this.lastMatchType}\n${this.lastMatchReason}`;
            this.showTeachingNotification(successMessage, true);

            console.log(`✅ ${child.name} now knows:`, child.learnedMaterials);

            // Award XP for successful teaching
            this.xpSystem.addXP(10, 'Successful lesson!');

            // Update mission progress
            this.successfulLessons++;
            if (this.successfulLessons < 3) {
                // Update mission text to show progress
                this.missionTracker.removeMission('teach_three_lessons');
                this.missionTracker.addMission(
                    `Teach 3 successful lessons (${this.successfulLessons}/3)`,
                    'teach_three_lessons'
                );
            } else if (this.successfulLessons === 3) {
                // MISSION COMPLETE!
                this.missionTracker.completeMission('teach_three_lessons');

                // Award XP for completing mission
                this.xpSystem.addXP(50, 'Mission Complete!');

                // Show mission complete notification after the first notification fades
                // First notification takes 4s + 0.5s fade = 4.5s total
                // Add small buffer to ensure clean transition
                this.time.delayedCall(5000, () => {
                    this.showTeachingNotification(
                        '🎉 MISSION COMPLETE! You taught 3 successful lessons!',
                        true
                    );
                });
            }
        } else {
            // FAILURE - child wandered off
            // Play failure sound effect
            this.sound.play('teaching_failure', { volume: 0.6 });

            // Still deduct energy (you spent effort)
            this.energyMeter.addEnergy(-material.energyCost);

            // Show failure notification with detailed feedback
            const failureMessage = `😕 ${child.name} wasn't interested in ${material.name}.\n\n${this.lastMatchType}\n${this.lastMatchReason}\n\nTip: Check their sensitive periods and interests!`;
            this.showTeachingNotification(failureMessage, false);

            // Make child walk away
            this.makeChildWalkAway(childSprite);
        }

        // Re-enable player controls
        this.time.delayedCall(1500, () => {
            this.controlsEnabled = true;
        });
    }

    showTeachingNotification(message, isSuccess) {
        // Mark that a teaching notification is active
        this.teachingNotificationActive = true;

        // Create tiny notification in top-right under mission tracker
        // Mission tracker icon is at (1200, 80), popup at (1050, 130)
        const notifX = 1050;
        const notifY = 350; // Below mission popup
        const notifWidth = 280;
        const notifHeight = 100;

        const bgColor = isSuccess ? 0x4CAF50 : 0xFF9800;

        const notifBg = this.add.rectangle(notifX, notifY, notifWidth, notifHeight, bgColor, 0.95);
        notifBg.setStrokeStyle(2, 0x2C1C0C);
        notifBg.setDepth(1600);
        notifBg.setScrollFactor(0);

        const notifText = this.add.text(notifX, notifY, message, {
            fontSize: '13px',
            fontFamily: 'monospace',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            align: 'center',
            wordWrap: { width: 260 },
            lineSpacing: 2
        }).setOrigin(0.5).setDepth(1601).setScrollFactor(0);

        // Fade out after 4 seconds (longer to read feedback)
        this.time.delayedCall(4000, () => {
            this.tweens.add({
                targets: [notifBg, notifText],
                alpha: 0,
                duration: 500,
                onComplete: () => {
                    notifBg.destroy();
                    notifText.destroy();
                    // Clear the flag after notification is fully gone
                    this.teachingNotificationActive = false;
                }
            });
        });
    }

    makeChildWalkAway(childSprite) {
        // Make child walk to a random nearby position
        childSprite.targetX = childSprite.x + Phaser.Math.Between(-100, 100);
        childSprite.targetY = childSprite.y + Phaser.Math.Between(-100, 100);
        childSprite.isMoving = true;
        childSprite.moveTimer = 0;
    }

    checkTeachingSuccess(childSprite) {
        const material = this.teachingMaterial;
        const child = childSprite.childData;

        // Map SPECIFIC MATERIALS to their PRIMARY sensitive period
        const materialSensitivePeriods = {
            'pink_tower': ['Order', 'Small Objects'],
            'knobbed_cylinders': ['Small Objects', 'Order'],
            'color_tablets': ['Order'],
            'nesting_boxes': ['Order', 'Small Objects'],
            'pouring_pitchers': ['Movement', 'Order'],
            'spooning_tray': ['Movement'],
            'broom': ['Movement'],
            'books': ['Language'],
            'puzzle': ['Small Objects']
        };

        // Also consider child's mood - some temperaments are easier to teach
        const temperamentBonus = {
            'Easy-Going': 0.15,     // +15% to all attempts
            'Social': 0.1,          // +10% (likes interaction)
            'Independent': 0.05,    // +5% (focused)
            'Bold': 0,              // No modifier (balanced)
            'Cautious': -0.05,      // -5% (hesitant)
            'Sensitive': -0.1       // -10% (easily overwhelmed)
        };

        // Get material's ideal sensitive periods
        const idealPeriods = materialSensitivePeriods[material.id] || [];

        // Check for perfect match (child has ANY of the material's sensitive periods)
        const perfectMatch = idealPeriods.some(period => child.sensitivePeriods.includes(period));

        // Check for "up for anything" based on interest text
        const upForAnything = child.currentInterest && (
            child.currentInterest.toLowerCase().includes('willing to try anything') ||
            child.currentInterest.toLowerCase().includes('up for anything')
        );

        // Get temperament modifier
        const tempMod = temperamentBonus[child.temperament] || 0;

        let successChance = 0;
        let matchType = '';
        let matchReason = '';

        if (perfectMatch) {
            // PERFECT MATCH - 80% success (more forgiving!)
            successChance = 0.8 + tempMod;
            matchType = '✨ PERFECT MATCH';
            matchReason = `${child.name} is in a sensitive period for this material!`;
            console.log(`${matchType}! ${matchReason}`);
        } else if (upForAnything) {
            // UP FOR ANYTHING - 60% success (new!)
            successChance = 0.6 + tempMod;
            matchType = '😊 WILLING TO LEARN';
            matchReason = `${child.name} is open to trying new things!`;
            console.log(`${matchType}. ${matchReason}`);
        } else {
            // NO MATCH - 35% base success (more forgiving than before)
            successChance = 0.35 + tempMod;
            matchType = '🤔 CHALLENGING';
            matchReason = `${child.name} isn't particularly interested in this right now.`;
            console.log(`${matchType}. ${matchReason}`);
        }

        // Clamp between 0.05 and 1.0 (minimum 5% chance)
        successChance = Math.max(0.05, Math.min(1, successChance));

        const willSucceed = Math.random() < successChance;
        console.log(`Final success chance: ${(successChance * 100).toFixed(0)}% | Result: ${willSucceed ? 'SUCCESS' : 'FAILURE'}`);

        // Store match info for visual feedback
        this.lastMatchType = matchType;
        this.lastMatchReason = matchReason;
        this.lastSuccessChance = successChance;

        return willSucceed;
    }

    arriveChild(childIndex) {
        const child = this.children[childIndex];

        if (!child || this.arrivedChildren.has(childIndex)) {
            return; // Already arrived or doesn't exist
        }

        console.log(`${child.childData.name} is arriving!`);

        // Mark as arrived
        this.arrivedChildren.add(childIndex);

        // Show arrival notification
        this.showArrivalNotification(child.childData.name);

        // Door position (bottom center of room)
        const doorX = this.roomX + this.roomWidth / 2;
        const doorY = this.roomY + this.roomHeight - 60;

        // Place child at door
        child.setPosition(doorX, doorY);
        child.setVisible(true);

        // Initialize movement state
        child.isMoving = false;
        child.moveTimer = 0;
        child.targetX = child.finalX;
        child.targetY = child.finalY;

        // Fade in and walk to position
        this.tweens.add({
            targets: child,
            alpha: 1,
            duration: 500,
            ease: 'Power2'
        });

        // Play walking animation during arrival
        const animPrefix = child.childData.name;
        const dy = child.finalY - doorY;
        const dx = child.finalX - doorX;

        if (Math.abs(dy) > Math.abs(dx)) {
            if (dy < 0) {
                child.play(`${animPrefix}_walk_back`);
            } else {
                child.play(`${animPrefix}_walk_front`);
            }
        } else {
            child.play(`${animPrefix}_walk_side`);
            child.setFlipX(dx < 0);
        }

        // Walk to final position
        this.tweens.add({
            targets: child,
            x: child.finalX,
            y: child.finalY,
            duration: 2000,
            ease: 'Power1',
            delay: 300,
            onComplete: () => {
                // Stop animation when arrived at final spot
                child.stop();
                child.setTexture(child.idleSpriteKey);
            }
        });
    }

    checkArrivals() {
        // Get current time from clock
        const currentTime = this.clock.getTime();
        const hour = currentTime.hour;
        const minute = currentTime.minute;

        // Convert current time to minutes since midnight for easier comparison
        const currentMinutes = hour * 60 + minute;
        const arrivalStartMinutes = 7 * 60 + 45; // 7:45 AM = 465 minutes
        const arrivalEndMinutes = 8 * 60; // 8:00 AM = 480 minutes

        // Before arrival time - don't show children yet
        if (currentMinutes < arrivalStartMinutes) {
            return;
        }

        // After 8:00 AM - all children should already be here (Virginia is late!)
        if (currentMinutes >= arrivalEndMinutes) {
            // Instantly show all children who haven't arrived yet (no animation)
            this.arrivalSchedule.forEach(arrival => {
                if (!this.arrivedChildren.has(arrival.childIndex)) {
                    const child = this.children[arrival.childIndex];
                    if (child) {
                        this.arrivedChildren.add(arrival.childIndex);

                        // Place child at their final position (already there when Virginia arrives)
                        child.setPosition(child.finalX, child.finalY);
                        child.setVisible(true);
                        child.setAlpha(1); // Make fully visible (not transparent)
                        child.setTexture(child.idleSpriteKey); // Set idle sprite

                        // Set movement state
                        child.isMoving = false;
                        child.moveTimer = 0;
                        child.targetX = child.finalX;
                        child.targetY = child.finalY;
                        child.isIdle = true;
                        child.currentAnimation = 'idle';

                        // No arrival notification - they're already here
                        console.log(`${child.childData.name} already present (Virginia is late)`);
                    }
                }
            });
            return;
        }

        // During arrival window (7:45-8:00) - normal arrival animations
        const minutesSince745 = minute - 45;

        // Check each scheduled arrival
        this.arrivalSchedule.forEach(arrival => {
            if (minutesSince745 >= arrival.arriveMinute && !this.arrivedChildren.has(arrival.childIndex)) {
                this.arriveChild(arrival.childIndex);
            }
        });
    }

    showArrivalNotification(childName) {
        // Calculate Y position based on existing notifications
        const baseY = 680; // Bottom of screen
        const notificationHeight = 40;
        const spacing = 5;

        // Stack upwards from bottom
        const yOffset = this.arrivalNotifications.length * (notificationHeight + spacing);
        const yPos = baseY - yOffset;

        // Create background
        const bg = this.add.rectangle(150, yPos, 280, 35, 0xF5DEB3, 0.95);
        bg.setStrokeStyle(2, 0x4A3020);
        bg.setDepth(1200);
        bg.setScrollFactor(0);

        // Create text
        const text = this.add.text(150, yPos, `${childName} has arrived!`, {
            fontSize: '16px',
            fontFamily: 'monospace',
            fill: '#2C1C0C',
            fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(1201).setScrollFactor(0);

        // Store notification
        const notification = { bg, text, yPos };
        this.arrivalNotifications.push(notification);

        // Fade out and remove after 1.5 seconds
        this.time.delayedCall(1500, () => {
            // Fade out
            this.tweens.add({
                targets: [bg, text],
                alpha: 0,
                duration: 300,
                onComplete: () => {
                    bg.destroy();
                    text.destroy();

                    // Remove from array
                    const index = this.arrivalNotifications.indexOf(notification);
                    if (index > -1) {
                        this.arrivalNotifications.splice(index, 1);
                    }

                    // Reposition remaining notifications
                    this.repositionNotifications();
                }
            });
        });
    }

    repositionNotifications() {
        const baseY = 680;
        const notificationHeight = 40;
        const spacing = 5;

        this.arrivalNotifications.forEach((notification, index) => {
            const newY = baseY - (index * (notificationHeight + spacing));

            // Smooth transition to new position
            this.tweens.add({
                targets: [notification.bg, notification.text],
                y: newY,
                duration: 200,
                ease: 'Power2'
            });

            notification.yPos = newY;
        });
    }

    triggerNapTime() {
        console.log('🌙 [NAP TIME] Step 0: Triggered at', this.clock.getTime());

        // Fade out classroom music
        if (this.classroomMusic && this.classroomMusic.isPlaying) {
            console.log('🌙 [NAP TIME] Fading out classroom music...');
            this.tweens.add({
                targets: this.classroomMusic,
                volume: 0,
                duration: 2000,
                onComplete: () => {
                    console.log('🌙 [NAP TIME] Music stopped');
                    this.classroomMusic.stop();
                }
            });
        }

        // Disable player controls and stop player movement
        this.controlsEnabled = false;
        this.player.setVelocity(0, 0);
        console.log('🌙 [NAP TIME] Controls disabled, player stopped');

        // Stop time during transition
        if (this.clock) {
            this.clock.pause();
            console.log('🌙 [NAP TIME] Clock paused');
        }

        // Create black overlay (full screen, depth 5000) - starts transparent
        const blackOverlay = this.add.rectangle(640, 360, 1280, 720, 0x000000, 0)
            .setScrollFactor(0)
            .setDepth(5000);
        console.log('🌙 [NAP TIME] Black overlay created');

        // Create "Nap Time!" message
        const message = this.add.text(640, 360, '🌙 Nap Time! 🌙\nTime to help the children rest...', {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: 'monospace',
            align: 'center'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(5001).setAlpha(0);
        console.log('🌙 [NAP TIME] Message created');

        // STEP 1: Fade in message (show for 2-3 seconds)
        console.log('🌙 [NAP TIME] Step 1: Fading in message...');
        this.tweens.add({
            targets: message,
            alpha: 1,
            duration: 500,
            onComplete: () => {
                console.log('🌙 [NAP TIME] Step 1 Complete: Message visible');

                // STEP 2: After 2.5 seconds, fade message out and fade to black
                console.log('🌙 [NAP TIME] Step 2: Waiting 2.5 seconds...');
                this.time.delayedCall(2500, () => {
                    console.log('🌙 [NAP TIME] Step 2 Complete: Starting fade out');

                    // Fade out message
                    this.tweens.add({
                        targets: message,
                        alpha: 0,
                        duration: 500,
                        onComplete: () => {
                            console.log('🌙 [NAP TIME] Message faded out');
                        }
                    });

                    // STEP 3: Fade overlay to black (1 second)
                    console.log('🌙 [NAP TIME] Step 3: Fading to black...');
                    this.tweens.add({
                        targets: blackOverlay,
                        alpha: 1,
                        duration: 1000,
                        onComplete: () => {
                            console.log('🌙 [NAP TIME] Step 3 Complete: Screen is black');

                            // STEP 4: Transition to NapRoomScene (while screen is black)
                            console.log('🌙 [NAP TIME] Step 4: Transitioning to NapRoomScene...');
                            const currentTime = this.clock.getTime();
                            console.log('🌙 [NAP TIME] Passing time to NapRoomScene:', currentTime);

                            // DON'T destroy overlay - keep screen black during transition
                            // The shutdown() method will clean up when scene stops
                            console.log('🌙 [NAP TIME] Keeping black overlay (screen stays black)');

                            // Use scene.start which automatically stops the current scene
                            console.log('🌙 [NAP TIME] Calling scene.start(NapRoomScene)...');
                            this.scene.start('NapRoomScene', {
                                gameTime: currentTime,
                                childrenStates: this.children.map(c => c.childData)
                            });
                            console.log('🌙 [NAP TIME] Step 4 Complete: Scene transition initiated');
                        }
                    });
                });
            }
        });
    }

    /**
     * Shutdown handler - clean up when scene stops
     */
    shutdown() {
        console.log('🌙 [CLASSROOM] Shutdown called - cleaning up scene');

        // Stop all tweens
        this.tweens.killAll();

        // Stop all timers
        this.time.removeAllEvents();

        // Clean up music
        if (this.music && this.music.isPlaying) {
            this.music.stop();
        }

        console.log('🌙 [CLASSROOM] Shutdown complete');
    }
}
