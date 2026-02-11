// Inventory Menu UI - Press ESC to open
// Shows item slots and clothing/appearance options

import {
    generateVirginiaSprite,
    generateVirginiaWithHeadBandana,
    generateVirginiaSide,
    generateVirginiaSideHeadBandana,
    generateVirginiaBack,
    generateVirginiaBackHeadBandana
} from '../utils/virginiaSprite.js';
import { generateVirginiaWalkingAnimations } from '../utils/virginiaWalkingAnimations.js';

export default class InventoryMenu {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.isOpen = false;

        // Player preferences
        this.bandanaOnHead = false; // Default: neck bandana

        // Create the menu (initially hidden)
        this.createMenu();
    }

    createMenu() {
        // Menu dimensions
        const menuWidth = 600;
        const menuHeight = 550; // Taller to prevent overlaps
        const menuX = 640; // Center of screen
        const menuY = 360;

        // Container for entire menu (for easy show/hide)
        this.menuContainer = this.scene.add.container(0, 0);
        this.menuContainer.setScrollFactor(0);
        this.menuContainer.setDepth(2000);
        this.menuContainer.setVisible(false);

        // Semi-transparent black overlay (dims the game behind menu)
        this.overlay = this.scene.add.rectangle(640, 360, 1280, 720, 0x000000, 0.7);
        this.overlay.setScrollFactor(0);
        this.overlay.setInteractive(); // Block clicks through

        // Click overlay to close menu
        this.overlay.on('pointerdown', () => {
            this.close();
        });

        this.menuContainer.add(this.overlay);

        // Menu background (Stardew style 3-layer border)
        const bgOuter = this.scene.add.rectangle(menuX, menuY, menuWidth, menuHeight, 0x4A3020);
        const bgMid = this.scene.add.rectangle(menuX, menuY, menuWidth - 8, menuHeight - 8, 0x8B6F47);
        const bgInner = this.scene.add.rectangle(menuX, menuY, menuWidth - 16, menuHeight - 16, 0xF5DEB3);

        this.menuContainer.add([bgOuter, bgMid, bgInner]);

        // Title
        const title = this.scene.add.text(menuX, menuY - menuHeight / 2 + 30, 'INVENTORY & CLOTHING', {
            fontSize: '28px',
            fill: '#2C1C0C',
            fontStyle: 'bold',
            fontFamily: 'monospace'
        }).setOrigin(0.5);
        this.menuContainer.add(title);

        // === ITEM SLOTS SECTION ===
        this.createItemSlots(menuX, menuY - 160);

        // === CLOTHING SECTION ===
        this.createClothingSection(menuX, menuY + 30);

        // Close button
        this.createCloseButton(menuX, menuY + menuHeight / 2 - 60);
    }

    createItemSlots(centerX, startY) {
        const slotSize = 50;
        const slotSpacing = 60;
        const slotsPerRow = 4;
        const totalSlots = 8;

        // Section title
        const itemsTitle = this.scene.add.text(centerX, startY - 20, 'ITEMS', {
            fontSize: '20px',
            fill: '#2C1C0C',
            fontStyle: 'bold',
            fontFamily: 'monospace'
        }).setOrigin(0.5);
        this.menuContainer.add(itemsTitle);

        this.itemSlots = [];

        for (let i = 0; i < totalSlots; i++) {
            const row = Math.floor(i / slotsPerRow);
            const col = i % slotsPerRow;

            const x = centerX - (slotsPerRow * slotSpacing) / 2 + col * slotSpacing + slotSpacing / 2;
            const y = startY + row * slotSpacing + 10;

            // Slot frame (dark border)
            const slotBorder = this.scene.add.rectangle(x, y, slotSize + 4, slotSize + 4, 0x2C1C0C);
            // Slot background (light tan)
            const slotBg = this.scene.add.rectangle(x, y, slotSize, slotSize, 0xE8D4B0);

            this.menuContainer.add([slotBorder, slotBg]);

            // Empty slot indicator
            const emptyText = this.scene.add.text(x, y, '—', {
                fontSize: '24px',
                fill: '#999999',
                fontFamily: 'monospace'
            }).setOrigin(0.5);
            this.menuContainer.add(emptyText);

            this.itemSlots.push({
                border: slotBorder,
                bg: slotBg,
                emptyText: emptyText,
                item: null
            });
        }
    }

    createClothingSection(centerX, startY) {
        // Section title
        const clothingTitle = this.scene.add.text(centerX, startY, 'APPEARANCE', {
            fontSize: '20px',
            fill: '#2C1C0C',
            fontStyle: 'bold',
            fontFamily: 'monospace'
        }).setOrigin(0.5);
        this.menuContainer.add(clothingTitle);

        // Character preview
        const previewSize = 80;
        const previewX = centerX - 150;
        const previewY = startY + 50;

        // Preview frame
        const previewBorder = this.scene.add.rectangle(previewX, previewY, previewSize + 8, previewSize + 8, 0x2C1C0C);
        const previewBg = this.scene.add.rectangle(previewX, previewY, previewSize, previewSize, 0xE8D4B0);
        this.menuContainer.add([previewBorder, previewBg]);

        // Generate current Virginia sprite
        const currentSpriteKey = this.bandanaOnHead ?
            generateVirginiaWithHeadBandana(this.scene) :
            generateVirginiaSprite(this.scene);

        this.previewSprite = this.scene.add.image(previewX, previewY, currentSpriteKey);
        this.previewSprite.setScale(1.5);
        this.menuContainer.add(this.previewSprite);

        // Bandana toggle option
        const toggleX = centerX + 80;
        const toggleY = startY + 50;

        // Toggle label (moved to be above the button, centered)
        const toggleLabel = this.scene.add.text(toggleX, toggleY - 30, 'Bandana:', {
            fontSize: '16px',
            fill: '#2C1C0C',
            fontFamily: 'monospace'
        }).setOrigin(0.5, 0);
        this.menuContainer.add(toggleLabel);

        // Toggle button background
        const btnWidth = 140;
        const btnHeight = 40;
        this.toggleBtn = this.scene.add.rectangle(toggleX, toggleY + 10, btnWidth, btnHeight, 0x4A7C2C);
        this.toggleBtn.setScrollFactor(0);
        this.toggleBtn.setDepth(2001); // Above container
        this.toggleBtn.setInteractive({ useHandCursor: true });

        const toggleBtnBorder = this.scene.add.rectangle(toggleX, toggleY + 10, btnWidth, btnHeight, 0x2C1C0C)
            .setStrokeStyle(3, 0x2C1C0C);
        toggleBtnBorder.setScrollFactor(0);
        toggleBtnBorder.setDepth(2001);

        // Toggle button text - shows current position with arrow to indicate toggle
        this.toggleBtnText = this.scene.add.text(toggleX, toggleY + 10, 'NECK ⟷ HEAD', {
            fontSize: '16px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            fontFamily: 'monospace'
        }).setOrigin(0.5);
        this.toggleBtnText.setScrollFactor(0);
        this.toggleBtnText.setDepth(2002);

        // Current selection indicator (underline showing which is active)
        this.currentIndicator = this.scene.add.text(toggleX - 42, toggleY + 24, '▲', {
            fontSize: '14px',
            fill: '#FFD700',
            fontStyle: 'bold',
            fontFamily: 'monospace'
        }).setOrigin(0.5);
        this.currentIndicator.setScrollFactor(0);
        this.currentIndicator.setDepth(2002);

        // DON'T add buttons to container - keep them separate so they're clickable
        // this.menuContainer.add([this.toggleBtn, toggleBtnBorder, this.toggleBtnText]);

        // Store references to hide/show with menu
        this.toggleBtnObjects = [this.toggleBtn, toggleBtnBorder, this.toggleBtnText, this.currentIndicator];

        // Hide initially (menu starts hidden)
        this.toggleBtnObjects.forEach(obj => obj.setVisible(false));

        // Toggle button hover effects
        this.toggleBtn.on('pointerover', () => {
            this.toggleBtn.setFillStyle(0x68A040); // Lighter green
        });

        this.toggleBtn.on('pointerout', () => {
            this.toggleBtn.setFillStyle(0x4A7C2C); // Normal green
        });

        // Toggle button click handler
        this.toggleBtn.on('pointerdown', () => {
            this.toggleBandana();
        });
    }

    createCloseButton(centerX, y) {
        const btnWidth = 120;
        const btnHeight = 40;

        this.closeBtn = this.scene.add.rectangle(centerX, y, btnWidth, btnHeight, 0x8B4513);
        this.closeBtn.setScrollFactor(0);
        this.closeBtn.setDepth(2001); // Above container
        this.closeBtn.setInteractive({ useHandCursor: true });

        const closeBtnBorder = this.scene.add.rectangle(centerX, y, btnWidth, btnHeight, 0x2C1C0C)
            .setStrokeStyle(3, 0x2C1C0C);
        closeBtnBorder.setScrollFactor(0);
        closeBtnBorder.setDepth(2001);

        const closeBtnText = this.scene.add.text(centerX, y, 'CLOSE', {
            fontSize: '18px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            fontFamily: 'monospace'
        }).setOrigin(0.5);
        closeBtnText.setScrollFactor(0);
        closeBtnText.setDepth(2002);

        // DON'T add buttons to container - keep them separate so they're clickable
        // this.menuContainer.add([this.closeBtn, closeBtnBorder, closeBtnText]);

        // Store references to hide/show with menu
        this.closeBtnObjects = [this.closeBtn, closeBtnBorder, closeBtnText];

        // Hide initially (menu starts hidden)
        this.closeBtnObjects.forEach(obj => obj.setVisible(false));

        // Close button hover effects
        this.closeBtn.on('pointerover', () => {
            this.closeBtn.setFillStyle(0xA0522D); // Lighter brown
        });

        this.closeBtn.on('pointerout', () => {
            this.closeBtn.setFillStyle(0x8B4513); // Normal brown
        });

        // Close button click handler
        this.closeBtn.on('pointerdown', () => {
            this.close();
        });
    }

    toggleBandana() {
        // Toggle state
        this.bandanaOnHead = !this.bandanaOnHead;

        // Update indicator position (NECK is at x-42, HEAD is at x+42)
        const toggleX = 640 + 80; // Match the button's x position
        const indicatorX = this.bandanaOnHead ? toggleX + 42 : toggleX - 42;
        this.currentIndicator.setX(indicatorX);

        // Save bandana preference to registry (persists across scenes)
        this.scene.registry.set('bandanaOnHead', this.bandanaOnHead);

        // Update preview sprite
        const newSpriteKey = this.bandanaOnHead ?
            generateVirginiaWithHeadBandana(this.scene) :
            generateVirginiaSprite(this.scene);

        this.previewSprite.setTexture(newSpriteKey);

        // Update player sprite in the game world and regenerate animations
        if (this.player && this.scene) {
            // Store the new idle sprite key on the scene
            this.scene.idleSpriteKey = newSpriteKey;
            this.scene.bandanaOnHead = this.bandanaOnHead;

            // Regenerate walking animations with the correct bandana style
            this.regenerateWalkingAnimations(this.bandanaOnHead);

            // Update player to idle sprite
            this.player.stop();
            this.player.setTexture(newSpriteKey);
        }

        console.log(`Bandana switched to: ${this.bandanaOnHead ? 'HEAD' : 'NECK'}`);
    }

    regenerateWalkingAnimations(bandanaOnHead) {
        // Remove old animations first (before destroying textures)
        if (this.scene.anims.exists('walk_front')) {
            this.scene.anims.remove('walk_front');
        }
        if (this.scene.anims.exists('walk_back')) {
            this.scene.anims.remove('walk_back');
        }
        if (this.scene.anims.exists('walk_side')) {
            this.scene.anims.remove('walk_side');
        }

        // Destroy ALL old animation textures (both neck and head versions)
        const texturesToRemove = [
            'virginia_walk_front',
            'virginia_walk_back',
            'virginia_walk_side',
            'virginia_walk_front_headband',
            'virginia_walk_back_headband',
            'virginia_walk_side_headband'
        ];

        texturesToRemove.forEach(textureName => {
            if (this.scene.textures.exists(textureName)) {
                this.scene.textures.remove(textureName);
            }
        });

        // Generate new walking animations with correct bandana style
        generateVirginiaWalkingAnimations(this.scene, bandanaOnHead);

        // Determine correct texture names based on bandana position
        const frontTextureName = bandanaOnHead ? 'virginia_walk_front_headband' : 'virginia_walk_front';
        const backTextureName = bandanaOnHead ? 'virginia_walk_back_headband' : 'virginia_walk_back';
        const sideTextureName = bandanaOnHead ? 'virginia_walk_side_headband' : 'virginia_walk_side';

        // Check if textures were created and add frames
        if (this.scene.textures.exists(frontTextureName)) {
            const frontTexture = this.scene.textures.get(frontTextureName);
            if (!frontTexture.has('frame0')) {
                frontTexture.add('frame0', 0, 0, 0, 48, 48);
            }
            if (!frontTexture.has('frame1')) {
                frontTexture.add('frame1', 0, 48, 0, 48, 48);
            }
        }

        if (this.scene.textures.exists(backTextureName)) {
            const backTexture = this.scene.textures.get(backTextureName);
            if (!backTexture.has('frame0')) {
                backTexture.add('frame0', 0, 0, 0, 48, 48);
            }
            if (!backTexture.has('frame1')) {
                backTexture.add('frame1', 0, 48, 0, 48, 48);
            }
        }

        if (this.scene.textures.exists(sideTextureName)) {
            const sideTexture = this.scene.textures.get(sideTextureName);
            if (!sideTexture.has('frame0')) {
                sideTexture.add('frame0', 0, 0, 0, 48, 48);
            }
            if (!sideTexture.has('frame1')) {
                sideTexture.add('frame1', 0, 48, 0, 48, 48);
            }
        }

        // Create new animations with correct texture keys
        if (this.scene.textures.exists(frontTextureName)) {
            this.scene.anims.create({
                key: 'walk_front',
                frames: [
                    { key: frontTextureName, frame: 'frame0' },
                    { key: frontTextureName, frame: 'frame1' }
                ],
                frameRate: 8,
                repeat: -1
            });
        }

        if (this.scene.textures.exists(backTextureName)) {
            this.scene.anims.create({
                key: 'walk_back',
                frames: [
                    { key: backTextureName, frame: 'frame0' },
                    { key: backTextureName, frame: 'frame1' }
                ],
                frameRate: 8,
                repeat: -1
            });
        }

        if (this.scene.textures.exists(sideTextureName)) {
            this.scene.anims.create({
                key: 'walk_side',
                frames: [
                    { key: sideTextureName, frame: 'frame0' },
                    { key: sideTextureName, frame: 'frame1' }
                ],
                frameRate: 8,
                repeat: -1
            });
        }

        console.log('Walking animations regenerated with bandana on ' + (bandanaOnHead ? 'head' : 'neck'));
    }

    open() {
        if (this.isOpen) return;

        this.isOpen = true;
        this.menuContainer.setVisible(true);

        // Show buttons (they're outside the container)
        if (this.toggleBtnObjects) {
            this.toggleBtnObjects.forEach(obj => obj.setVisible(true));
        }
        if (this.closeBtnObjects) {
            this.closeBtnObjects.forEach(obj => obj.setVisible(true));
        }

        // Pause game physics
        if (this.scene.physics && this.scene.physics.world) {
            this.scene.physics.pause();
        }

        console.log('Inventory menu opened');
    }

    close() {
        if (!this.isOpen) return;

        this.isOpen = false;
        this.menuContainer.setVisible(false);

        // Hide buttons (they're outside the container)
        if (this.toggleBtnObjects) {
            this.toggleBtnObjects.forEach(obj => obj.setVisible(false));
        }
        if (this.closeBtnObjects) {
            this.closeBtnObjects.forEach(obj => obj.setVisible(false));
        }

        // Resume game physics
        if (this.scene.physics && this.scene.physics.world) {
            this.scene.physics.resume();
        }

        console.log('Inventory menu closed');
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Add an item to inventory (future use)
     * @param {string} itemName - Name of the item
     * @param {string} itemTexture - Texture key for the item
     */
    addItem(itemName, itemTexture) {
        // Find first empty slot
        const emptySlot = this.itemSlots.find(slot => slot.item === null);

        if (emptySlot) {
            emptySlot.item = {
                name: itemName,
                texture: itemTexture
            };

            // Hide empty indicator
            emptySlot.emptyText.setVisible(false);

            // TODO: Add item sprite to slot
            console.log(`Added ${itemName} to inventory`);
        } else {
            console.log('Inventory full!');
        }
    }

    /**
     * Destroy the inventory menu (cleanup)
     */
    destroy() {
        // Destroy button objects (they're outside the container)
        if (this.toggleBtnObjects) {
            this.toggleBtnObjects.forEach(obj => obj.destroy());
        }
        if (this.closeBtnObjects) {
            this.closeBtnObjects.forEach(obj => obj.destroy());
        }

        this.menuContainer.destroy();
    }
}
