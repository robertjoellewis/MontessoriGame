// Inventory UI - Stardew Valley-inspired inventory interface
// Handles hotbar display, full inventory grid, tooltips, and item interactions
// Works in conjunction with InventorySystem for data management

import { getItemDefinition } from '../data/items.js';
import {
    generateVirginiaSprite,
    generateVirginiaWithHeadBandana,
    generateVirginiaSide,
    generateVirginiaSideHeadBandana,
    generateVirginiaBack,
    generateVirginiaBackHeadBandana
} from '../utils/virginiaSprite.js';
import { generateVirginiaWalkingAnimations } from '../utils/virginiaWalkingAnimations.js';

/**
 * InventoryUI - Manages visual representation and interaction for inventory
 */
export default class InventoryUI {
    constructor(scene, inventorySystem) {
        this.scene = scene;
        this.inventorySystem = inventorySystem;

        // UI State
        this.isInventoryOpen = false;
        this.hoveredSlot = null;
        this.draggedItem = null;

        // Disable browser context menu on game canvas to allow right-click
        this.scene.input.mouse.disableContextMenu();

        // Hotbar configuration
        this.hotbarConfig = {
            x: 640, // Center of screen
            y: 680, // Near bottom
            slotSize: 48,
            slotSpacing: 52,
            bgColor: 0x3E2723,
            slotColor: 0x5D4037,
            selectedColor: 0xFFA726,
            emptySlotColor: 0x4E342E
        };

        // Full inventory configuration - ONLY shows hotbar (10 slots)
        this.inventoryConfig = {
            x: 640,
            y: 360,
            width: 600,
            height: 300,  // Reduced height for fewer slots
            slotSize: 48,
            slotSpacing: 52,
            rows: 1,  // Only 1 row (hotbar only)
            cols: 10, // 10 columns (hotbar slots)
            bgColor: 0x4A3020,
            borderColor: 0x8B6F47,
            innerColor: 0xF5DEB3
        };

        // Bandana toggle state
        this.bandanaOnHead = this.scene.registry.get('bandanaOnHead') || false;

        // Create UI elements
        this.createHotbar();
        this.createFullInventory();
        this.setupKeyboardControls();

        console.log('InventoryUI initialized');
    }

    /**
     * Create always-visible hotbar at bottom of screen
     */
    createHotbar() {
        const cfg = this.hotbarConfig;
        const hotbarSize = this.inventorySystem.hotbarSize;

        // Container for hotbar
        this.hotbarContainer = this.scene.add.container(0, 0);
        this.hotbarContainer.setScrollFactor(0);
        this.hotbarContainer.setDepth(1000);

        // Background panel
        const totalWidth = hotbarSize * cfg.slotSpacing + 20;
        const bgPanel = this.scene.add.rectangle(
            cfg.x, cfg.y,
            totalWidth, cfg.slotSize + 20,
            cfg.bgColor, 0.9
        );
        this.hotbarContainer.add(bgPanel);

        // Create hotbar slots
        this.hotbarSlots = [];
        const startX = cfg.x - (hotbarSize * cfg.slotSpacing) / 2 + cfg.slotSpacing / 2;

        for (let i = 0; i < hotbarSize; i++) {
            const x = startX + i * cfg.slotSpacing;
            const y = cfg.y;

            const slotObj = this.createSlot(x, y, i, true);
            this.hotbarSlots.push(slotObj);
            this.hotbarContainer.add([
                slotObj.bg,
                slotObj.border,
                slotObj.itemSprite,
                slotObj.quantityText,
                slotObj.keyText
            ]);
        }
    }

    /**
     * Create full inventory grid (toggleable with I key)
     */
    createFullInventory() {
        const cfg = this.inventoryConfig;

        // Container for full inventory (initially hidden)
        this.inventoryContainer = this.scene.add.container(0, 0);
        this.inventoryContainer.setScrollFactor(0);
        this.inventoryContainer.setDepth(2000);
        this.inventoryContainer.setVisible(false);

        // Semi-transparent overlay
        this.overlay = this.scene.add.rectangle(640, 360, 1280, 720, 0x000000, 0.7);
        this.overlay.setScrollFactor(0);
        this.overlay.setInteractive();
        this.overlay.on('pointerdown', () => this.closeInventory());
        this.inventoryContainer.add(this.overlay);

        // Stardew-style 3-layer border background
        const bgOuter = this.scene.add.rectangle(cfg.x, cfg.y, cfg.width, cfg.height, 0x4A3020);
        const bgMid = this.scene.add.rectangle(cfg.x, cfg.y, cfg.width - 8, cfg.height - 8, 0x8B6F47);
        const bgInner = this.scene.add.rectangle(cfg.x, cfg.y, cfg.width - 16, cfg.height - 16, 0xF5DEB3);

        // Make backgrounds interactive to block clicks from reaching overlay
        bgOuter.setInteractive();
        bgMid.setInteractive();
        bgInner.setInteractive();

        // Stop propagation so overlay doesn't close menu
        bgOuter.on('pointerdown', (pointer, x, y, event) => event.stopPropagation());
        bgMid.on('pointerdown', (pointer, x, y, event) => event.stopPropagation());
        bgInner.on('pointerdown', (pointer, x, y, event) => event.stopPropagation());

        this.inventoryContainer.add([bgOuter, bgMid, bgInner]);

        // Title
        const title = this.scene.add.text(cfg.x, cfg.y - cfg.height / 2 + 30, 'INVENTORY', {
            fontSize: '28px',
            fill: '#2C1C0C',
            fontStyle: 'bold',
            fontFamily: 'monospace'
        }).setOrigin(0.5);

        // Make title interactive to prevent clicks from closing menu
        title.setInteractive();
        title.on('pointerdown', (pointer, x, y, event) => event.stopPropagation());

        this.inventoryContainer.add(title);

        // Create inventory grid
        this.inventorySlots = [];
        const gridStartX = cfg.x - (cfg.cols * cfg.slotSpacing) / 2 + cfg.slotSpacing / 2;
        const gridStartY = cfg.y - cfg.height / 2 + 80;

        for (let row = 0; row < cfg.rows; row++) {
            for (let col = 0; col < cfg.cols; col++) {
                const slotIndex = row * cfg.cols + col;
                const x = gridStartX + col * cfg.slotSpacing;
                const y = gridStartY + row * cfg.slotSpacing;

                const slotObj = this.createSlot(x, y, slotIndex, false);
                this.inventorySlots.push(slotObj);
                this.inventoryContainer.add([
                    slotObj.bg,
                    slotObj.border,
                    slotObj.itemSprite,
                    slotObj.quantityText
                ]);
            }
        }

        // Bandana toggle section
        const toggleY = cfg.y + cfg.height / 2 - 100;

        // Bandana toggle label - also clickable to toggle
        const bandanaLabel = this.scene.add.text(cfg.x - 200, toggleY, 'BANDANA POSITION:', {
            fontSize: '18px',
            fill: '#2C1C0C',
            fontStyle: 'bold',
            fontFamily: 'monospace'
        }).setOrigin(0, 0.5);
        bandanaLabel.setInteractive({ useHandCursor: true });
        bandanaLabel.on('pointerover', () => toggleBg.setFillStyle(0xA08060));
        bandanaLabel.on('pointerout', () => toggleBg.setFillStyle(0x8B6F47));
        bandanaLabel.on('pointerdown', (pointer, x, y, event) => {
            event.stopPropagation();
            this.toggleBandana();
        });

        // Toggle button background
        const toggleBg = this.scene.add.rectangle(cfg.x + 80, toggleY, 200, 40, 0x8B6F47);
        toggleBg.setStrokeStyle(2, 0x4A3020);

        // NECK label - clickable to toggle
        const neckLabel = this.scene.add.text(cfg.x + 80 - 42, toggleY, 'NECK', {
            fontSize: '14px',
            fill: '#2C1C0C',
            fontFamily: 'monospace'
        }).setOrigin(0.5);
        neckLabel.setInteractive({ useHandCursor: true });
        neckLabel.on('pointerover', () => toggleBg.setFillStyle(0xA08060));
        neckLabel.on('pointerout', () => toggleBg.setFillStyle(0x8B6F47));
        neckLabel.on('pointerdown', (pointer, x, y, event) => {
            event.stopPropagation();
            this.toggleBandana();
        });

        // HEAD label - clickable to toggle
        const headLabel = this.scene.add.text(cfg.x + 80 + 42, toggleY, 'HEAD', {
            fontSize: '14px',
            fill: '#2C1C0C',
            fontFamily: 'monospace'
        }).setOrigin(0.5);
        headLabel.setInteractive({ useHandCursor: true });
        headLabel.on('pointerover', () => toggleBg.setFillStyle(0xA08060));
        headLabel.on('pointerout', () => toggleBg.setFillStyle(0x8B6F47));
        headLabel.on('pointerdown', (pointer, x, y, event) => {
            event.stopPropagation();
            this.toggleBandana();
        });

        // Current position indicator - clickable to toggle
        const indicatorX = this.bandanaOnHead ? cfg.x + 80 + 42 : cfg.x + 80 - 42;
        this.bandanaIndicator = this.scene.add.circle(indicatorX, toggleY - 15, 6, 0x4CAF50);
        this.bandanaIndicator.setInteractive({ useHandCursor: true });
        this.bandanaIndicator.on('pointerover', () => toggleBg.setFillStyle(0xA08060));
        this.bandanaIndicator.on('pointerout', () => toggleBg.setFillStyle(0x8B6F47));
        this.bandanaIndicator.on('pointerdown', (pointer, x, y, event) => {
            event.stopPropagation();
            this.toggleBandana();
        });

        // Make toggle button interactive with hover effects
        toggleBg.setInteractive({ useHandCursor: true });
        toggleBg.on('pointerover', () => toggleBg.setFillStyle(0xA08060)); // Lighter on hover
        toggleBg.on('pointerout', () => toggleBg.setFillStyle(0x8B6F47)); // Normal color
        toggleBg.on('pointerdown', (pointer, x, y, event) => {
            event.stopPropagation(); // Prevent overlay from closing menu
            this.toggleBandana();
        });

        this.inventoryContainer.add([
            bandanaLabel,
            toggleBg,
            neckLabel,
            headLabel,
            this.bandanaIndicator
        ]);

        // Close button
        const closeBtn = this.scene.add.rectangle(cfg.x, cfg.y + cfg.height / 2 - 30, 120, 40, 0x8B4513);
        closeBtn.setInteractive({ useHandCursor: true });
        closeBtn.on('pointerover', () => closeBtn.setFillStyle(0xA0522D));
        closeBtn.on('pointerout', () => closeBtn.setFillStyle(0x8B4513));
        closeBtn.on('pointerdown', (pointer, x, y, event) => {
            event.stopPropagation(); // Prevent double-close from overlay
            this.closeInventory();
        });

        const closeBtnText = this.scene.add.text(cfg.x, cfg.y + cfg.height / 2 - 30, 'CLOSE', {
            fontSize: '18px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            fontFamily: 'monospace'
        }).setOrigin(0.5);
        closeBtnText.setInteractive({ useHandCursor: true });
        closeBtnText.on('pointerover', () => closeBtn.setFillStyle(0xA0522D));
        closeBtnText.on('pointerout', () => closeBtn.setFillStyle(0x8B4513));
        closeBtnText.on('pointerdown', (pointer, x, y, event) => {
            event.stopPropagation();
            this.closeInventory();
        });

        this.inventoryContainer.add([closeBtn, closeBtnText]);

        // Tooltip (appears on hover)
        this.createTooltip();
    }

    /**
     * Create a single inventory slot
     * @param {number} x
     * @param {number} y
     * @param {number} slotIndex
     * @param {boolean} isHotbar
     * @returns {Object}
     */
    createSlot(x, y, slotIndex, isHotbar) {
        const cfg = this.hotbarConfig;

        // Background
        const bg = this.scene.add.rectangle(x, y, cfg.slotSize, cfg.slotSize, cfg.slotColor);
        bg.setScrollFactor(0);

        // Border
        const border = this.scene.add.rectangle(x, y, cfg.slotSize, cfg.slotSize);
        border.setStrokeStyle(2, 0x2C1C0C);
        border.setScrollFactor(0);
        border.setFillStyle(); // Transparent fill

        // Item sprite (placeholder, updated in refresh)
        const itemSprite = this.scene.add.image(x, y, '__MISSING');
        itemSprite.setScrollFactor(0);
        itemSprite.setVisible(false);
        itemSprite.setDisplaySize(cfg.slotSize - 8, cfg.slotSize - 8);

        // Quantity text (bottom-right corner)
        const quantityText = this.scene.add.text(x + cfg.slotSize / 2 - 4, y + cfg.slotSize / 2 - 4, '', {
            fontSize: '14px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3,
            fontFamily: 'monospace'
        }).setOrigin(1, 1).setScrollFactor(0).setVisible(false);

        // Hotbar number indicator (1-9, 0)
        let keyText = null;
        if (isHotbar) {
            const keyNumber = (slotIndex + 1) % 10; // 1-9, then 0
            keyText = this.scene.add.text(x - cfg.slotSize / 2 + 4, y - cfg.slotSize / 2 + 4, keyNumber.toString(), {
                fontSize: '12px',
                fill: '#FFEB3B',
                fontStyle: 'bold',
                stroke: '#000000',
                strokeThickness: 2,
                fontFamily: 'monospace'
            }).setOrigin(0, 0).setScrollFactor(0);
        }

        // Make interactive
        bg.setInteractive({ useHandCursor: true });
        bg.on('pointerover', () => this.onSlotHover(slotIndex, isHotbar));
        bg.on('pointerout', () => this.onSlotOut(slotIndex, isHotbar));
        bg.on('pointerdown', (pointer, x, y, event) => {
            event.stopPropagation(); // Prevent overlay from closing menu
            this.onSlotClick(slotIndex, isHotbar, pointer);
        });

        return {
            index: slotIndex,
            bg,
            border,
            itemSprite,
            quantityText,
            keyText,
            isHotbar
        };
    }

    /**
     * Create tooltip that appears when hovering over items
     */
    createTooltip() {
        this.tooltip = this.scene.add.container(0, 0);
        this.tooltip.setScrollFactor(0);
        this.tooltip.setDepth(3000);
        this.tooltip.setVisible(false);

        // Background
        this.tooltipBg = this.scene.add.rectangle(0, 0, 250, 120, 0x2C1C0C, 0.95);
        this.tooltipBorder = this.scene.add.rectangle(0, 0, 250, 120);
        this.tooltipBorder.setStrokeStyle(2, 0xFFA726);
        this.tooltipBorder.setFillStyle();

        // Text fields
        this.tooltipName = this.scene.add.text(0, -40, '', {
            fontSize: '18px',
            fill: '#FFA726',
            fontStyle: 'bold',
            fontFamily: 'monospace',
            wordWrap: { width: 230 }
        }).setOrigin(0.5, 0);

        this.tooltipType = this.scene.add.text(0, -20, '', {
            fontSize: '14px',
            fill: '#CCCCCC',
            fontFamily: 'monospace'
        }).setOrigin(0.5, 0);

        this.tooltipDesc = this.scene.add.text(0, 0, '', {
            fontSize: '12px',
            fill: '#FFFFFF',
            fontFamily: 'monospace',
            wordWrap: { width: 230 }
        }).setOrigin(0.5, 0);

        this.tooltipUse = this.scene.add.text(0, 40, '', {
            fontSize: '12px',
            fill: '#4CAF50',
            fontStyle: 'bold',
            fontFamily: 'monospace'
        }).setOrigin(0.5, 0);

        this.tooltip.add([
            this.tooltipBg,
            this.tooltipBorder,
            this.tooltipName,
            this.tooltipType,
            this.tooltipDesc,
            this.tooltipUse
        ]);
    }

    /**
     * Refresh all slot displays (call after inventory changes)
     */
    refreshDisplay() {
        const hotbarItems = this.inventorySystem.getHotbarItems();
        const allItems = this.inventorySystem.getAllItems();

        // Update hotbar
        for (let i = 0; i < this.hotbarSlots.length; i++) {
            this.updateSlotDisplay(this.hotbarSlots[i], hotbarItems[i], i === this.inventorySystem.selectedSlot);
        }

        // Update full inventory (if created)
        if (this.inventorySlots) {
            for (let i = 0; i < this.inventorySlots.length; i++) {
                this.updateSlotDisplay(this.inventorySlots[i], allItems[i], false);
            }
        }
    }

    /**
     * Update a single slot's visual display
     * @param {Object} slotObj
     * @param {ItemStack|null} itemStack
     * @param {boolean} isSelected
     */
    updateSlotDisplay(slotObj, itemStack, isSelected) {
        const cfg = this.hotbarConfig;

        // Update border color based on selection
        if (isSelected) {
            slotObj.border.setStrokeStyle(3, cfg.selectedColor);
        } else {
            slotObj.border.setStrokeStyle(2, 0x2C1C0C);
        }

        // Update item display
        if (itemStack && itemStack.definition) {
            const def = itemStack.definition;

            // Show item sprite (if texture exists)
            if (this.scene.textures.exists(def.iconKey)) {
                slotObj.itemSprite.setTexture(def.iconKey);
                slotObj.itemSprite.setVisible(true);
            } else {
                // Fallback: show first letter of item name
                slotObj.itemSprite.setVisible(false);
            }

            // Show quantity (if more than 1 or if stackable)
            if (itemStack.quantity > 1 || def.stackable) {
                slotObj.quantityText.setText(itemStack.quantity.toString());
                slotObj.quantityText.setVisible(true);
            } else {
                slotObj.quantityText.setVisible(false);
            }
        } else {
            // Empty slot
            slotObj.itemSprite.setVisible(false);
            slotObj.quantityText.setVisible(false);
        }
    }

    /**
     * Handle slot hover
     */
    onSlotHover(slotIndex, isHotbar) {
        this.hoveredSlot = slotIndex;

        const itemStack = this.inventorySystem.getItemAt(slotIndex);
        if (itemStack && itemStack.definition) {
            this.showTooltip(itemStack.definition);
        }

        // Highlight slot
        const slotObj = isHotbar ? this.hotbarSlots[slotIndex] : this.inventorySlots[slotIndex];
        if (slotObj && slotIndex !== this.inventorySystem.selectedSlot) {
            slotObj.bg.setFillStyle(0x6D4C41); // Lighter brown
        }
    }

    /**
     * Handle slot hover out
     */
    onSlotOut(slotIndex, isHotbar) {
        this.hoveredSlot = null;
        this.hideTooltip();

        // Remove highlight
        const slotObj = isHotbar ? this.hotbarSlots[slotIndex] : this.inventorySlots[slotIndex];
        if (slotObj && slotIndex !== this.inventorySystem.selectedSlot) {
            slotObj.bg.setFillStyle(this.hotbarConfig.slotColor);
        }
    }

    /**
     * Handle slot click
     */
    onSlotClick(slotIndex, isHotbar, pointer) {
        const itemStack = this.inventorySystem.getItemAt(slotIndex);

        // Right-click (button 2): Use/consume item
        if (pointer && pointer.button === 2) {
            console.log(`Right-click detected on slot ${slotIndex}`);
            if (itemStack && itemStack.definition && itemStack.definition.useFunction) {
                console.log(`Using item: ${itemStack.definition.name}`);
                // Use the item
                const result = this.inventorySystem.useItem(slotIndex);
                console.log(`Use result:`, result);
                if (result.message) {
                    this.showMessage(result.message, result.success);
                }
                this.refreshDisplay();
                return;
            } else if (itemStack) {
                console.log(`Item ${itemStack.definition.name} has no use function`);
                this.showMessage(`${itemStack.definition.name} cannot be used`, false);
            }
            return;
        }

        // Left-click behavior
        // If hotbar, select that slot
        if (isHotbar) {
            this.inventorySystem.selectSlot(slotIndex);
            this.refreshDisplay();
            return;
        }

        // If full inventory, use/interact with item
        if (itemStack) {
            console.log(`Clicked on ${itemStack.definition.name} in slot ${slotIndex}`);
            // Future: Implement drag & drop here
        }
    }

    /**
     * Show tooltip with item information
     */
    showTooltip(itemDef) {
        this.tooltipName.setText(itemDef.name);
        this.tooltipType.setText(`[${itemDef.type.toUpperCase()}]`);
        this.tooltipDesc.setText(itemDef.description);

        // Show usage hint
        let useHint = '';
        if (itemDef.useFunction) {
            useHint = 'Left-click to use';
        }
        if (itemDef.energyRestore > 0) {
            useHint += `\n+${itemDef.energyRestore} Energy`;
        }
        this.tooltipUse.setText(useHint);

        // Position tooltip near mouse (but keep on screen)
        const pointer = this.scene.input.activePointer;
        let tooltipX = pointer.x + 20;
        let tooltipY = pointer.y + 20;

        // Keep tooltip on screen
        if (tooltipX + 125 > 1280) tooltipX = pointer.x - 270;
        if (tooltipY + 60 > 720) tooltipY = pointer.y - 140;

        this.tooltip.setPosition(tooltipX, tooltipY);
        this.tooltip.setVisible(true);
    }

    /**
     * Hide tooltip
     */
    hideTooltip() {
        this.tooltip.setVisible(false);
    }

    /**
     * Open full inventory menu
     */
    openInventory() {
        if (this.isInventoryOpen) return;

        this.isInventoryOpen = true;
        this.inventoryContainer.setVisible(true);
        this.refreshDisplay();

        // Pause game physics
        if (this.scene.physics && this.scene.physics.world) {
            this.scene.physics.pause();
        }

        console.log('Inventory opened');
    }

    /**
     * Close full inventory menu
     */
    closeInventory() {
        if (!this.isInventoryOpen) return;

        this.isInventoryOpen = false;
        this.inventoryContainer.setVisible(false);
        this.hideTooltip();

        // Resume game physics
        if (this.scene.physics && this.scene.physics.world) {
            this.scene.physics.resume();
        }

        console.log('Inventory closed');
    }

    /**
     * Toggle inventory open/closed
     */
    toggleInventory() {
        if (this.isInventoryOpen) {
            this.closeInventory();
        } else {
            this.openInventory();
        }
    }

    /**
     * Setup keyboard controls
     */
    setupKeyboardControls() {
        // I key to toggle inventory
        this.scene.input.keyboard.on('keydown-I', () => {
            this.toggleInventory();
        });

        // ESC key to toggle inventory (in addition to I key)
        this.scene.input.keyboard.on('keydown-ESC', () => {
            this.toggleInventory();
        });

        // Number keys 1-9, 0 to select hotbar slots
        for (let i = 1; i <= 9; i++) {
            this.scene.input.keyboard.on(`keydown-${i}`, () => {
                this.inventorySystem.selectSlot(i - 1);
                this.refreshDisplay();
            });
        }
        this.scene.input.keyboard.on('keydown-ZERO', () => {
            this.inventorySystem.selectSlot(9);
            this.refreshDisplay();
        });

        // E key to use selected item
        this.scene.input.keyboard.on('keydown-E', () => {
            this.useSelectedItem();
        });
    }

    /**
     * Use the currently selected hotbar item
     */
    useSelectedItem() {
        const result = this.inventorySystem.useSelectedItem();
        if (result.message) {
            this.showMessage(result.message, result.success);
        }
        this.refreshDisplay();
    }

    /**
     * Show a temporary message to the player
     */
    showMessage(message, isSuccess = true) {
        const color = isSuccess ? '#4CAF50' : '#F44336';
        const messageText = this.scene.add.text(640, 550, message, {
            fontSize: '20px',
            fill: color,
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4,
            fontFamily: 'monospace',
            backgroundColor: '#000000AA',
            padding: { x: 12, y: 8 }
        }).setOrigin(0.5).setScrollFactor(0).setDepth(2500);

        // Fade out after 2 seconds
        this.scene.time.delayedCall(2000, () => {
            this.scene.tweens.add({
                targets: messageText,
                alpha: 0,
                duration: 500,
                onComplete: () => messageText.destroy()
            });
        });
    }

    /**
     * Toggle bandana position between neck and head
     */
    toggleBandana() {
        // Toggle state
        this.bandanaOnHead = !this.bandanaOnHead;

        // Update indicator position (NECK is at x-42, HEAD is at x+42)
        const cfg = this.inventoryConfig;
        const toggleX = cfg.x + 80;
        const indicatorX = this.bandanaOnHead ? toggleX + 42 : toggleX - 42;
        this.bandanaIndicator.setX(indicatorX);

        // Save bandana preference to registry (persists across scenes)
        this.scene.registry.set('bandanaOnHead', this.bandanaOnHead);

        // Update player sprite in the game world
        const newSpriteKey = this.bandanaOnHead ?
            generateVirginiaWithHeadBandana(this.scene) :
            generateVirginiaSprite(this.scene);

        // Update player sprite and animations
        if (this.scene.player && this.scene) {
            // Store the new idle sprite key on the scene
            this.scene.idleSpriteKey = newSpriteKey;
            this.scene.bandanaOnHead = this.bandanaOnHead;

            // Regenerate walking animations with the correct bandana style
            this.regenerateWalkingAnimations(this.bandanaOnHead);

            // Update player to idle sprite
            this.scene.player.stop();
            this.scene.player.setTexture(newSpriteKey);
        }

        console.log(`Bandana switched to: ${this.bandanaOnHead ? 'HEAD' : 'NECK'}`);
    }

    /**
     * Regenerate walking animations with correct bandana style
     */
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

    /**
     * Update (call from scene's update loop)
     */
    update() {
        // Update tooltip position if visible
        if (this.tooltip.visible && this.hoveredSlot !== null) {
            const pointer = this.scene.input.activePointer;
            let tooltipX = pointer.x + 20;
            let tooltipY = pointer.y + 20;

            // Keep tooltip on screen
            if (tooltipX + 125 > 1280) tooltipX = pointer.x - 270;
            if (tooltipY + 60 > 720) tooltipY = pointer.y - 140;

            this.tooltip.setPosition(tooltipX, tooltipY);
        }

        // Refresh display if inventory changed
        this.refreshDisplay();
    }

    /**
     * Destroy cleanup
     */
    destroy() {
        this.hotbarContainer.destroy();
        this.inventoryContainer.destroy();
        this.tooltip.destroy();
    }
}
