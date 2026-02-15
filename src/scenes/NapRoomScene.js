// Nap Room Scene - Where children take their afternoon nap
// Features whack-a-mole style gameplay where Virginia soothes fussy children

import Clock from '../ui/Clock.js';
import EnergyMeter from '../ui/EnergyMeter.js';
import MissionTracker from '../ui/MissionTracker.js';
import ExperienceSystem from '../ui/ExperienceSystem.js';
import { generateWoodenFloor, generateWallpaper } from '../utils/cottageInterior.js';
import { childrenData } from '../data/children.js';

export default class NapRoomScene extends Phaser.Scene {
    constructor() {
        super({ key: 'NapRoomScene' });
    }

    init(data) {
        // Receive data from ClassroomScene
        this.gameTime = data.gameTime || { hour: 12, minute: 15, dayOfWeek: 1 };
        this.childrenStates = data.childrenStates || []; // Array of child data with their learned materials
    }

    preload() {
        // Load naptime music
        this.load.audio('naptime_music', 'assets/audio/naptimeSong2.mp3');
    }

    create() {
        console.log('🌙 [NAP ROOM] Scene Starting...');
        console.log('🌙 [NAP ROOM] Scene key:', this.scene.key);
        console.log('🌙 [NAP ROOM] Scene is active:', this.scene.isActive());
        console.log('🌙 [NAP ROOM] Scene is visible:', this.scene.isVisible());
        console.log('🌙 [NAP ROOM] Received gameTime:', this.gameTime);
        console.log('🌙 [NAP ROOM] Received childrenStates:', this.childrenStates ? this.childrenStates.length : 0);

        // Add wake event listener to confirm scene is active
        this.events.once('wake', () => {
            console.log('🌙 [NAP ROOM] Scene WAKE event fired');
        });

        // === BLACK OVERLAY (CREATE FIRST!) ===
        // Create black overlay IMMEDIATELY to prevent flash of nap room
        console.log('🌙 [NAP ROOM] Creating fade-in overlay FIRST...');
        const fadeInOverlay = this.add.rectangle(640, 360, 1280, 720, 0x000000, 1)
            .setScrollFactor(0)
            .setDepth(10000); // Very high depth to ensure it's on top
        console.log('🌙 [NAP ROOM] Fade-in overlay created (screen should stay black)');

        // === NAPTIME MUSIC ===
        // Stop all previous scene music first
        console.log('🌙 [NAP ROOM] Stopping all previous music...');
        this.sound.stopAll();

        // Play soothing naptime lullaby
        console.log('🌙 [NAP ROOM] Starting nap time music...');
        this.naptimeMusic = this.sound.add('naptime_music', {
            loop: true,
            volume: 0.3
        });
        this.naptimeMusic.play();
        console.log('🌙 [NAP ROOM] Music playing');

        // === NAP ROOM VIEWPORT SYSTEM ===
        // Same as classroom: centered viewport with black borders
        // 1. Black background (fills entire canvas)
        console.log('🌙 [NAP ROOM] Creating background...');
        this.add.rectangle(640, 360, 1280, 720, 0x1a1a2e).setDepth(-1000);

        // 2. Define room dimensions - centered in 1280x720 canvas
        this.roomWidth = 900;
        this.roomHeight = 650;
        this.roomX = (1280 - this.roomWidth) / 2;  // 190 - centered horizontally
        this.roomY = (720 - this.roomHeight) / 2;   // 35 - centered vertically
        console.log('🌙 [NAP ROOM] Room dimensions set:', this.roomWidth, 'x', this.roomHeight);

        // 3. Adjust physics world bounds to room position and size
        this.physics.world.setBounds(this.roomX, this.roomY, this.roomWidth, this.roomHeight);
        console.log('🌙 [NAP ROOM] Physics world bounds set');

        // Create nap room environment
        console.log('🌙 [NAP ROOM] Creating nap room environment...');
        this.createNapRoom();
        console.log('🌙 [NAP ROOM] Nap room created');

        // Continue time/energy from classroom
        console.log('🌙 [NAP ROOM] Creating clock...');
        this.clock = new Clock(this, this.gameTime.hour, this.gameTime.minute, this.gameTime.dayOfWeek, 2); // 2x speed
        console.log('🌙 [NAP ROOM] Clock created with 2x speed');

        console.log('🌙 [NAP ROOM] Creating energy meter...');
        const currentEnergy = this.registry.get('playerEnergy') || 100;
        this.energyMeter = new EnergyMeter(this, currentEnergy);
        console.log('🌙 [NAP ROOM] Energy meter created');

        console.log('🌙 [NAP ROOM] Creating XP system...');
        this.xpSystem = new ExperienceSystem(this);
        console.log('🌙 [NAP ROOM] XP system created');

        console.log('🌙 [NAP ROOM] Creating mission tracker...');
        this.missionTracker = new MissionTracker(this);
        console.log('🌙 [NAP ROOM] Mission tracker created');

        // Add nap time mission
        console.log('🌙 [NAP ROOM] Adding nap time mission...');
        this.missionTracker.addMission('Get all 12 children to sleep', 'naptime_mission');
        console.log('🌙 [NAP ROOM] Mission added');

        // Create Virginia (player)
        console.log('🌙 [NAP ROOM] Creating Virginia...');
        this.createVirginia();
        console.log('🌙 [NAP ROOM] Virginia created');

        // Create nap mats and children
        console.log('🌙 [NAP ROOM] Creating nap mats...');
        this.createNapMats();
        console.log('🌙 [NAP ROOM] Nap mats created');

        console.log('🌙 [NAP ROOM] Placing children on mats...');
        this.placeChildrenOnMats();
        console.log('🌙 [NAP ROOM] Children placed');

        // Pause controls during fade-in
        this.controlsEnabled = false;

        // Fade in from black (overlay was created at the start of create())
        console.log('🌙 [NAP ROOM] Starting fade-in tween...');
        this.tweens.add({
            targets: fadeInOverlay,
            alpha: 0,
            duration: 1000,
            onComplete: () => {
                console.log('🌙 [NAP ROOM] Fade-in complete! Destroying overlay...');
                fadeInOverlay.destroy();
                console.log('🌙 [NAP ROOM] Overlay destroyed');

                // Enable controls after fade-in
                this.controlsEnabled = true;
                console.log('🌙 [NAP ROOM] Controls enabled');

                // Resume time after fade-in completes
                if (this.clock) {
                    console.log('🌙 [NAP ROOM] Resuming clock...');
                    this.clock.resume();
                }

                // Start the whack-a-mole nap time mechanic after fade-in
                console.log('🌙 [NAP ROOM] Starting nap time mechanic in 1 second...');
                this.time.delayedCall(1000, () => {
                    console.log('🌙 [NAP ROOM] Starting nap time mechanic NOW');
                    this.startNapTime();
                });
            }
        });

        // Track nap time progress
        this.childrenAsleep = 0;
        this.napTimeActive = true;
        this.napTimeStartTime = this.time.now;
        this.napTimeDuration = 60000; // 60 seconds to get them all to sleep

        console.log('🌙 [NAP ROOM] Scene create() complete!');
    }

    createNapRoom() {
        // Create floor (same as classroom but darker)
        const floorTexture = generateWoodenFloor(this);
        const floor = this.add.tileSprite(this.roomX, this.roomY + 80, this.roomWidth, this.roomHeight - 80, floorTexture)
            .setOrigin(0, 0)
            .setDepth(0)
            .setTint(0x666666); // Darker tint for nap time

        // Create walls
        const wallTexture = generateWallpaper(this);
        const wall = this.add.tileSprite(this.roomX, this.roomY, this.roomWidth, 80, wallTexture)
            .setOrigin(0, 0)
            .setDepth(0)
            .setTint(0x888888); // Slightly darker walls

        // Room border
        const borderThickness = 8;
        const borderGraphics = this.add.graphics();
        borderGraphics.lineStyle(borderThickness, 0x2C1C0C, 1);
        borderGraphics.strokeRect(0, 0, this.roomWidth, this.roomHeight);
        borderGraphics.setDepth(999);

        // Add soft ambient dim overlay for nap atmosphere
        const dimOverlay = this.add.rectangle(
            this.roomWidth / 2,
            this.roomHeight / 2,
            this.roomWidth,
            this.roomHeight,
            0x000033,
            0.4
        ).setDepth(5);

        // Add a small window with moonlight (decorative)
        this.createWindow();
    }

    createWindow() {
        // Simple window in upper right - OFFSET BY ROOM POSITION
        const windowX = this.roomX + this.roomWidth - 150;
        const windowY = this.roomY + 30;
        const windowWidth = 80;
        const windowHeight = 40;

        // Window frame (dark brown wood)
        const windowFrame = this.add.rectangle(windowX, windowY, windowWidth, windowHeight, 0x5C4033)
            .setDepth(1);

        // Window pane (daytime sky blue - it's afternoon, not night!)
        const windowPane = this.add.rectangle(windowX, windowY, windowWidth - 8, windowHeight - 8, 0x87CEEB)
            .setDepth(2);

        // Bright afternoon sun
        const sun = this.add.circle(windowX - 15, windowY - 5, 10, 0xFFD700)
            .setDepth(3);

        // Sun glow effect
        const sunGlow = this.add.circle(windowX - 15, windowY - 5, 14, 0xFFEB3B, 0.3)
            .setDepth(3);

        // A few fluffy white clouds
        const cloud1 = this.add.ellipse(windowX + 15, windowY + 8, 20, 10, 0xFFFFFF, 0.8)
            .setDepth(3);
        const cloud2 = this.add.ellipse(windowX + 25, windowY + 10, 16, 8, 0xFFFFFF, 0.7)
            .setDepth(3);
    }

    createVirginia() {
        // Spawn soothing movement indicator at the entrance (left side)
        const spawnX = this.roomX + 100;
        const spawnY = this.roomY + this.roomHeight - 100;

        // Create a soothing glowing orb instead of Virginia sprite
        // This is more appropriate for the calm nap time atmosphere

        // Outer glow (soft lavender with transparency)
        this.playerGlow = this.add.circle(spawnX, spawnY, 25, 0xB19CD9, 0.4);
        this.playerGlow.setDepth(9);

        // Middle layer (brighter purple)
        this.playerMid = this.add.circle(spawnX, spawnY, 18, 0xD1C4E9, 0.7);
        this.playerMid.setDepth(10);

        // Inner core (bright white center)
        this.playerCore = this.add.circle(spawnX, spawnY, 10, 0xFFFFFF, 0.9);
        this.playerCore.setDepth(11);

        // Create physics sprite (invisible) for collision detection
        this.player = this.physics.add.sprite(spawnX, spawnY, null);
        this.player.setVisible(false);
        this.player.setCollideWorldBounds(true);
        this.player.setSize(30, 30); // Hitbox for mat clicking

        // Add gentle pulsing animation for soothing effect
        this.tweens.add({
            targets: [this.playerGlow, this.playerMid, this.playerCore],
            scale: 1.15,
            alpha: 0.6,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Player controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.input.keyboard.addKey('W'),
            down: this.input.keyboard.addKey('S'),
            left: this.input.keyboard.addKey('A'),
            right: this.input.keyboard.addKey('D')
        };

        this.controlsEnabled = true;
    }

    createNapMats() {
        this.napMats = [];

        // Arrange 12 mats in 3 rows of 4 - OFFSET BY ROOM POSITION
        const rows = 3;
        const cols = 4;
        const matWidth = 80;
        const matHeight = 100;
        const startX = this.roomX + 150;
        const startY = this.roomY + 180;
        const spacingX = 150;
        const spacingY = 150;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const matX = startX + (col * spacingX);
                const matY = startY + (row * spacingY);

                // Create simple nap mat (rectangle with outline)
                const mat = this.add.rectangle(matX, matY, matWidth, matHeight, 0x4a7c59)
                    .setDepth(6);

                // Mat border
                const matBorder = this.add.rectangle(matX, matY, matWidth, matHeight)
                    .setStrokeStyle(2, 0x2C1C0C)
                    .setDepth(6);

                // Small pillow at top of mat
                const pillow = this.add.ellipse(matX, matY - 30, 30, 20, 0xf0e6d2)
                    .setDepth(7);

                this.napMats.push({
                    x: matX,
                    y: matY,
                    mat: mat,
                    border: matBorder,
                    pillow: pillow,
                    childSprite: null,
                    childData: null,
                    isAsleep: false
                });
            }
        }
    }

    placeChildrenOnMats() {
        // Place each child on a mat
        this.children = [];

        for (let i = 0; i < Math.min(12, this.napMats.length); i++) {
            const matData = this.napMats[i];
            const childData = childrenData[i];

            // Create child sprite (lying down on mat)
            const childSprite = this.add.circle(matData.x, matData.y + 10, 20, 0xffdbac)
                .setDepth(8);

            // Child's head
            const childHead = this.add.circle(matData.x, matData.y - 20, 15, 0xffdbac)
                .setDepth(8);

            // Simple hair
            const childHair = this.add.circle(matData.x, matData.y - 25, 12, 0x4a3020)
                .setDepth(9);

            // Eyes (closed initially, will open if fussy)
            const eyesOpen = this.add.text(matData.x, matData.y - 20, '👀', {
                fontSize: '16px'
            }).setOrigin(0.5).setDepth(10).setVisible(false);

            const eyesClosed = this.add.text(matData.x, matData.y - 20, '😴', {
                fontSize: '16px'
            }).setOrigin(0.5).setDepth(10).setVisible(true);

            // Name label
            const nameLabel = this.add.text(matData.x, matData.y + 40, childData.name, {
                fontSize: '12px',
                fill: '#ffffff',
                fontFamily: 'monospace'
            }).setOrigin(0.5).setDepth(10);

            // Store references
            matData.childSprite = {
                body: childSprite,
                head: childHead,
                hair: childHair,
                eyesOpen: eyesOpen,
                eyesClosed: eyesClosed,
                nameLabel: nameLabel
            };
            matData.childData = childData;

            this.children.push(matData);
        }
    }

    startNapTime() {
        console.log('💤 Nap time mechanic starting...');

        // Every 2-5 seconds, a random child becomes fussy
        this.napTimeInterval = this.time.addEvent({
            delay: Phaser.Math.Between(2000, 5000),
            callback: this.makeFussyChild,
            callbackScope: this,
            loop: true
        });
    }

    makeFussyChild() {
        if (!this.napTimeActive) return;

        // Find children who are not asleep
        const awakeChildren = this.children.filter(c => !c.isAsleep);
        if (awakeChildren.length === 0) {
            this.completeNapTime(true);
            return;
        }

        // Pick a random awake child to become fussy
        const fussyChild = Phaser.Utils.Array.GetRandom(awakeChildren);

        // Make them fussy (eyes open, bouncing)
        fussyChild.childSprite.eyesClosed.setVisible(false);
        fussyChild.childSprite.eyesOpen.setVisible(true);
        fussyChild.isFussy = true;

        // Bounce animation
        this.tweens.add({
            targets: [
                fussyChild.childSprite.body,
                fussyChild.childSprite.head,
                fussyChild.childSprite.hair,
                fussyChild.childSprite.eyesOpen
            ],
            y: '-=10',
            duration: 300,
            yoyo: true,
            repeat: -1 // Keep bouncing until soothed
        });

        // Make clickable to soothe
        fussyChild.childSprite.head.setInteractive({ useHandCursor: true });
        fussyChild.childSprite.head.on('pointerdown', () => {
            this.sootheChild(fussyChild);
        });
    }

    sootheChild(childMatData) {
        if (!childMatData.isFussy) return;

        console.log(`Soothing ${childMatData.childData.name}`);

        // Stop bouncing
        this.tweens.killTweensOf([
            childMatData.childSprite.body,
            childMatData.childSprite.head,
            childMatData.childSprite.hair,
            childMatData.childSprite.eyesOpen
        ]);

        // Close eyes, mark as asleep
        childMatData.childSprite.eyesOpen.setVisible(false);
        childMatData.childSprite.eyesClosed.setVisible(true);
        childMatData.isFussy = false;
        childMatData.isAsleep = true;

        // Reset position from bounce
        childMatData.childSprite.head.y = childMatData.y - 20;
        childMatData.childSprite.body.y = childMatData.y + 10;
        childMatData.childSprite.hair.y = childMatData.y - 25;
        childMatData.childSprite.eyesClosed.y = childMatData.y - 20;

        // Remove interactivity
        childMatData.childSprite.head.disableInteractive();

        // Show "Zzz" animation
        const zzz = this.add.text(childMatData.x + 30, childMatData.y - 30, 'Zzz', {
            fontSize: '20px',
            fill: '#ffffff',
            fontFamily: 'monospace'
        }).setDepth(15).setAlpha(0);

        this.tweens.add({
            targets: zzz,
            alpha: 1,
            y: '-=30',
            duration: 2000,
            onComplete: () => zzz.destroy()
        });

        // Increment sleep counter
        this.childrenAsleep++;
        console.log(`${this.childrenAsleep}/12 children asleep`);

        // Check if all asleep
        if (this.childrenAsleep >= 12) {
            this.completeNapTime(true);
        }
    }

    completeNapTime(success) {
        this.napTimeActive = false;

        // Stop the fussy child spawning
        if (this.napTimeInterval) {
            this.napTimeInterval.remove();
        }

        if (success) {
            // SUCCESS! All children asleep
            console.log('✅ Nap time SUCCESS!');

            // Complete mission
            this.missionTracker.completeMission('naptime_mission');

            // Award XP
            this.xpSystem.addXP(100, 'Nap Time Success!');

            // Restore some energy
            this.energyMeter.addEnergy(30);

            // Show success message
            this.showNapTimeResult(
                '🌙 Perfect Nap Time!',
                'All children are sleeping peacefully.\n+30 Energy Restored',
                true
            );
        } else {
            // FAILURE - time ran out or too many fussy children
            console.log('❌ Nap time FAILED');

            this.showNapTimeResult(
                '😓 Nap Time Struggle',
                'Some children stayed awake.\nBetter luck next time!',
                false
            );
        }

        // Return to classroom after 4 seconds
        this.time.delayedCall(4000, () => {
            this.returnToClassroom();
        });
    }

    showNapTimeResult(title, message, isSuccess) {
        // Create result overlay
        const overlay = this.add.rectangle(
            this.roomWidth / 2,
            this.roomHeight / 2,
            this.roomWidth,
            this.roomHeight,
            0x000000,
            0.8
        ).setDepth(1000);

        const titleText = this.add.text(
            this.roomWidth / 2,
            this.roomHeight / 2 - 50,
            title,
            {
                fontSize: '48px',
                fill: isSuccess ? '#4CAF50' : '#FF9800',
                fontStyle: 'bold',
                fontFamily: 'monospace'
            }
        ).setOrigin(0.5).setDepth(1001);

        const messageText = this.add.text(
            this.roomWidth / 2,
            this.roomHeight / 2 + 30,
            message,
            {
                fontSize: '24px',
                fill: '#ffffff',
                fontFamily: 'monospace',
                align: 'center'
            }
        ).setOrigin(0.5).setDepth(1001);
    }

    returnToClassroom() {
        console.log('Returning to classroom...');

        // Pass updated game state back to classroom
        this.scene.start('ClassroomScene', {
            gameTime: this.gameTime,
            afterNapTime: true
        });
    }

    update(time, delta) {
        // Update clock (runs at double speed - configured in constructor)
        if (this.clock) {
            this.clock.update(delta);
        }

        // Player movement
        if (this.controlsEnabled && this.player) {
            this.updatePlayerMovement();
        }

        // Check for nap time timeout (60 seconds)
        if (this.napTimeActive && this.time.now - this.napTimeStartTime > this.napTimeDuration) {
            this.completeNapTime(false);
        }

        // Check if it's 2:30 PM - nap time is over
        const currentTime = this.clock ? this.clock.getTime() : { hour: 12, minute: 15 };
        if (currentTime.hour === 14 && currentTime.minute >= 30) {
            // Nap time over, return to classroom
            console.log('⏰ Nap time over at 2:30 PM');
            this.completeNapTime(true);
        }
    }

    updatePlayerMovement() {
        const speed = 160;
        let moving = false;

        this.player.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            this.player.setVelocityX(-speed);
            moving = true;
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            this.player.setVelocityX(speed);
            moving = true;
        }

        // Vertical movement
        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            this.player.setVelocityY(-speed);
            moving = true;
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            this.player.setVelocityY(speed);
            moving = true;
        }

        // Sync visual orb layers with invisible physics sprite
        if (this.playerGlow && this.playerMid && this.playerCore) {
            this.playerGlow.setPosition(this.player.x, this.player.y);
            this.playerMid.setPosition(this.player.x, this.player.y);
            this.playerCore.setPosition(this.player.x, this.player.y);
        }
    }
}
