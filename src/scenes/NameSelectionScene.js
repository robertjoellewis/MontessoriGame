/**
 * Name Selection Scene
 * Player enters their character name before starting the game
 * Default: "Virginia"
 */

export default class NameSelectionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'NameSelectionScene' });
    }

    preload() {
        // Load Virginia portrait
        this.load.image('virginia_portrait', 'assets/sprites/virginia_portrait.png');
    }

    create() {
        // === BLACK BACKGROUND ===
        this.add.rectangle(640, 360, 1280, 720, 0x000000).setDepth(-100);

        // === STARDEW STYLE BOX ===
        const boxWidth = 700; // Wider for right padding
        const boxHeight = 400;
        const boxX = 700; // Moved right
        const boxY = 360;

        // Outer border (dark brown)
        this.add.rectangle(boxX, boxY, boxWidth, boxHeight, 0x4A3020).setOrigin(0.5);

        // Middle border (medium brown)
        this.add.rectangle(boxX, boxY, boxWidth - 8, boxHeight - 8, 0x8B6F47).setOrigin(0.5);

        // Inner background (tan)
        this.add.rectangle(boxX, boxY, boxWidth - 16, boxHeight - 16, 0xF5DEB3).setOrigin(0.5);

        // === VIRGINIA PORTRAIT (LEFT SIDE) ===
        const portraitX = boxX - 220;
        const portraitY = boxY;

        const portraitSize = 1024 * 0.184; // Actual display size (20% smaller)

        // Portrait frame (Stardew style - 3 layers)
        // Outer border (dark brown)
        this.add.rectangle(portraitX, portraitY, portraitSize + 16, portraitSize + 16, 0x4A3020).setOrigin(0.5);
        // Middle border (medium brown)
        this.add.rectangle(portraitX, portraitY, portraitSize + 10, portraitSize + 10, 0x8B6F47).setOrigin(0.5);
        // Inner border (light tan)
        this.add.rectangle(portraitX, portraitY, portraitSize + 4, portraitSize + 4, 0xF5DEB3).setOrigin(0.5);

        const portrait = this.add.image(portraitX, portraitY, 'virginia_portrait');
        portrait.setScale(0.184); // Scaled down from 1024x1024 original (20% smaller)

        // === RIGHT SIDE - TITLE & INPUT ===
        const rightSideX = boxX + 100;

        // === TITLE ===
        this.add.text(rightSideX, boxY - 100, 'What is your name?', {
            fontSize: '36px',
            fontFamily: 'monospace',
            fill: '#2C1C0C',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // === NAME INPUT BOX ===
        const inputBoxY = boxY - 20;

        // Input box border
        this.add.rectangle(rightSideX, inputBoxY, 320, 60, 0x2C1C0C).setOrigin(0.5);
        // Input box background
        this.add.rectangle(rightSideX, inputBoxY, 314, 54, 0xFFFFFF).setOrigin(0.5);

        // === NAME TEXT (DEFAULT: Virginia) ===
        this.playerName = 'Virginia';
        this.nameText = this.add.text(rightSideX, inputBoxY, this.playerName, {
            fontSize: '28px',
            fontFamily: 'monospace',
            fill: '#000000'
        }).setOrigin(0.5);

        // Cursor blink effect
        this.cursor = this.add.text(
            this.nameText.x + this.nameText.width / 2 + 5,
            inputBoxY,
            '|',
            {
                fontSize: '28px',
                fontFamily: 'monospace',
                fill: '#000000'
            }
        ).setOrigin(0, 0.5);

        // Blink cursor
        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.cursor.setVisible(!this.cursor.visible);
            },
            loop: true
        });

        // === INSTRUCTION TEXT ===
        this.add.text(rightSideX, boxY + 35, 'Type to change', {
            fontSize: '18px',
            fontFamily: 'monospace',
            fill: '#666666'
        }).setOrigin(0.5);

        // === START BUTTON ===
        const buttonY = boxY + 100;

        // Button background
        const buttonBg = this.add.rectangle(rightSideX, buttonY, 200, 50, 0x4A7C2C).setOrigin(0.5);
        buttonBg.setInteractive({ useHandCursor: true });

        // Button border
        this.add.rectangle(rightSideX, buttonY, 200, 50, 0x2C1C0C).setStrokeStyle(3, 0x2C1C0C).setOrigin(0.5);

        // Button text
        const buttonText = this.add.text(rightSideX, buttonY, 'START GAME', {
            fontSize: '24px',
            fontFamily: 'monospace',
            fill: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Button hover effect
        buttonBg.on('pointerover', () => {
            buttonBg.setFillStyle(0x68A040);
        });

        buttonBg.on('pointerout', () => {
            buttonBg.setFillStyle(0x4A7C2C);
        });

        // Button click - start game
        buttonBg.on('pointerdown', () => {
            this.startGame();
        });

        // === KEYBOARD INPUT ===
        this.input.keyboard.on('keydown', (event) => {
            if (event.key === 'Enter') {
                this.startGame();
            } else if (event.key === 'Backspace') {
                this.playerName = this.playerName.slice(0, -1);
                this.updateNameText();
            } else if (event.key.length === 1 && this.playerName.length < 12) {
                // Only allow letters and spaces
                if (/^[a-zA-Z ]$/.test(event.key)) {
                    this.playerName += event.key;
                    this.updateNameText();
                }
            }
        });
    }

    updateNameText() {
        // Update name display
        this.nameText.setText(this.playerName || ' ');

        // Update cursor position
        this.cursor.setPosition(
            this.nameText.x + this.nameText.width / 2 + 5,
            this.nameText.y
        );
    }

    startGame() {
        // Save player name to registry for access in other scenes
        this.registry.set('playerName', this.playerName || 'Virginia');

        // CLEAR INVENTORY - Fresh game start
        // Remove any persisted inventory from previous sessions
        localStorage.removeItem('montessori_inventory');
        console.log('New game started - inventory cleared');

        // Set flag for new game session
        this.registry.set('isNewGame', true);

        // Fade out and start cottage scene
        this.cameras.main.fadeOut(500);

        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('CottageScene');
        });
    }
}
