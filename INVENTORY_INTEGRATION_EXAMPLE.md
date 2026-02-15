# Inventory System Integration Example

This guide shows how to integrate the inventory system into your existing Montessori game scenes.

## Quick Start Integration

### Step 1: Import the Systems

Add these imports to your scene file (e.g., `ClassroomScene.js`):

```javascript
import InventorySystem from '../systems/InventorySystem.js';
import InventoryUI from '../ui/InventoryUI.js';
import { ITEMS } from '../data/items.js';
```

### Step 2: Preload Item Sprites

In your scene's `preload()` method, load item icons:

```javascript
preload() {
    // Load all item sprites
    // For now, you can use placeholder textures or create simple colored squares

    // Food items
    this.load.image('item_coffee', 'assets/sprites/item_coffee.png');
    this.load.image('item_apple', 'assets/sprites/item_apple.png');
    this.load.image('item_sandwich', 'assets/sprites/item_sandwich.png');
    this.load.image('item_cookie', 'assets/sprites/item_cookie.png');

    // Material items
    this.load.image('item_wood', 'assets/sprites/item_wood.png');
    this.load.image('item_stone', 'assets/sprites/item_stone.png');
    this.load.image('item_fabric', 'assets/sprites/item_fabric.png');
    this.load.image('item_paint', 'assets/sprites/item_paint.png');

    // Tool items
    this.load.image('item_storybook', 'assets/sprites/item_storybook.png');
    this.load.image('item_measuring_tape', 'assets/sprites/item_measuring_tape.png');
    this.load.image('item_notebook', 'assets/sprites/item_notebook.png');

    // Consumable items
    this.load.image('item_bandage', 'assets/sprites/item_bandage.png');
    this.load.image('item_tissue', 'assets/sprites/item_tissue.png');

    // Quest items
    this.load.image('item_note', 'assets/sprites/item_note.png');
    this.load.image('item_permission', 'assets/sprites/item_permission.png');

    // ... rest of your preload code
}
```

### Step 3: Initialize in Create

In your scene's `create()` method, after creating other UI elements:

```javascript
create() {
    // ... existing scene setup code (floor, walls, player, etc.)

    // Create energy meter (if not already created)
    if (!this.energyMeter) {
        this.energyMeter = new EnergyMeter(this, 100);
    }

    // === INVENTORY SYSTEM ===
    // Create inventory system (handles data and logic)
    this.inventorySystem = new InventorySystem(this, {
        hotbarSize: 10,
        inventoryRows: 4,
        inventoryCols: 10,
        persistKey: 'montessori_inventory'
    });

    // Create inventory UI (handles visuals and interaction)
    this.inventoryUI = new InventoryUI(this, this.inventorySystem);

    // Add starting items for testing
    this.inventorySystem.addItem('coffee', 3);
    this.inventorySystem.addItem('apple', 10);
    this.inventorySystem.addItem('sandwich', 2);
    this.inventorySystem.addItem('wood', 50);
    this.inventorySystem.addItem('notebook', 1);

    // Refresh display
    this.inventoryUI.refreshDisplay();

    // ... rest of your create code
}
```

### Step 4: Update in Update Loop

In your scene's `update()` method:

```javascript
update(time, delta) {
    // ... existing update code (player movement, etc.)

    // Update inventory UI (handles tooltips, animations)
    if (this.inventoryUI) {
        this.inventoryUI.update();
    }

    // ... rest of your update code
}
```

### Step 5: Clean Up on Scene Shutdown

In your scene's `shutdown()` or when switching scenes:

```javascript
shutdown() {
    // Save inventory before leaving scene
    if (this.inventorySystem) {
        this.inventorySystem.saveToStorage();
        this.inventorySystem.saveToRegistry(this.game);
    }

    // Clean up UI
    if (this.inventoryUI) {
        this.inventoryUI.destroy();
    }
}
```

## Example: Full ClassroomScene Integration

Here's a complete example showing integration in ClassroomScene:

```javascript
// ClassroomScene.js
import Phaser from 'phaser';
import InventorySystem from '../systems/InventorySystem.js';
import InventoryUI from '../ui/InventoryUI.js';
import { ITEMS } from '../data/items.js';
import EnergyMeter from '../ui/EnergyMeter.js';

export default class ClassroomScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ClassroomScene' });
    }

    preload() {
        // Load inventory item sprites
        Object.values(ITEMS).forEach(item => {
            this.load.image(item.iconKey, `assets/sprites/${item.iconKey}.png`);
        });

        // ... other preload code
    }

    create() {
        // Create room, player, etc.
        this.createRoom();
        this.createPlayer();

        // Create UI systems
        this.energyMeter = new EnergyMeter(this, 100);

        // Create inventory system
        this.inventorySystem = new InventorySystem(this);
        this.inventoryUI = new InventoryUI(this, this.inventorySystem);

        // Give player starting items
        this.giveStartingItems();

        // Refresh display
        this.inventoryUI.refreshDisplay();

        // Set up interactions
        this.setupItemPickups();
    }

    giveStartingItems() {
        // Check if this is first time (no saved inventory)
        const hasItems = this.inventorySystem.getAllItems().some(slot => slot !== null);

        if (!hasItems) {
            // Give starting items
            this.inventorySystem.addItem('coffee', 2);
            this.inventorySystem.addItem('apple', 5);
            this.inventorySystem.addItem('notebook', 1);
            console.log('Gave starting items');
        }
    }

    setupItemPickups() {
        // Example: Place pickable items in the world
        this.placeWorldItem(500, 300, 'apple', 3);
        this.placeWorldItem(600, 300, 'coffee', 1);
    }

    placeWorldItem(x, y, itemId, quantity) {
        const item = this.add.sprite(x, y, ITEMS[itemId.toUpperCase()].iconKey);
        item.setInteractive({ useHandCursor: true });
        item.setScale(1.5);

        // Add floating animation
        this.tweens.add({
            targets: item,
            y: y - 10,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Pickup on click
        item.on('pointerdown', () => {
            const success = this.inventorySystem.addItem(itemId, quantity);
            if (success) {
                this.inventoryUI.showMessage(`Picked up ${quantity} ${itemId}!`, true);
                this.inventoryUI.refreshDisplay();

                // Remove from world
                this.tweens.add({
                    targets: item,
                    alpha: 0,
                    scale: 2,
                    duration: 300,
                    onComplete: () => item.destroy()
                });
            } else {
                this.inventoryUI.showMessage('Inventory full!', false);
            }
        });
    }

    update(time, delta) {
        // Update player, energy, etc.
        this.energyMeter.update(delta);

        // Update inventory UI
        this.inventoryUI.update();
    }

    shutdown() {
        // Save before leaving
        this.inventorySystem.saveToStorage();
        this.inventorySystem.saveToRegistry(this.game);
    }
}
```

## Creating Placeholder Item Sprites

If you don't have item sprites yet, you can generate simple colored squares programmatically:

```javascript
// Add this helper function to your scene
generatePlaceholderItemSprites() {
    const colors = {
        food: 0x4CAF50,      // Green
        material: 0x795548,   // Brown
        tool: 0x2196F3,      // Blue
        consumable: 0xFFEB3B, // Yellow
        quest: 0x9C27B0      // Purple
    };

    Object.values(ITEMS).forEach(item => {
        if (!this.textures.exists(item.iconKey)) {
            const graphics = this.add.graphics();
            graphics.fillStyle(colors[item.type], 1);
            graphics.fillRect(0, 0, 32, 32);
            graphics.generateTexture(item.iconKey, 32, 32);
            graphics.destroy();
        }
    });
}

// Call in create() before creating inventory UI
create() {
    this.generatePlaceholderItemSprites();
    this.inventorySystem = new InventorySystem(this);
    this.inventoryUI = new InventoryUI(this, this.inventorySystem);
}
```

## Example: Vending Machine / Item Pickup Interaction

```javascript
// In your scene
createVendingMachine() {
    const machine = this.add.rectangle(400, 300, 80, 100, 0x0077BE);
    machine.setInteractive({ useHandCursor: true });

    machine.on('pointerdown', () => {
        this.showVendingMenu();
    });
}

showVendingMenu() {
    // Simple vending machine - buy coffee for energy
    const playerMoney = this.registry.get('playerMoney') || 100;
    const coffeeCost = 5;

    if (playerMoney >= coffeeCost) {
        const success = this.inventorySystem.addItem('coffee', 1);
        if (success) {
            this.registry.set('playerMoney', playerMoney - coffeeCost);
            this.inventoryUI.showMessage(`Purchased coffee for $${coffeeCost}!`, true);
            this.inventoryUI.refreshDisplay();
        } else {
            this.inventoryUI.showMessage('Inventory full!', false);
        }
    } else {
        this.inventoryUI.showMessage('Not enough money!', false);
    }
}
```

## Example: Daily Energy Snack

```javascript
// Give player a daily snack when they arrive
create() {
    // ... setup code

    this.checkDailySnack();
}

checkDailySnack() {
    const lastSnackDate = localStorage.getItem('lastSnackDate');
    const today = new Date().toDateString();

    if (lastSnackDate !== today) {
        // New day! Give snack
        this.inventorySystem.addItem('cookie', 2);
        this.inventorySystem.addItem('apple', 1);
        this.inventoryUI.showMessage('Daily snack received!', true);
        this.inventoryUI.refreshDisplay();

        localStorage.setItem('lastSnackDate', today);
    }
}
```

## Testing the System

Add debug commands to browser console:

```javascript
// In create()
if (window.location.hostname === 'localhost') {
    window.debugInventory = {
        add: (itemId, qty) => {
            this.inventorySystem.addItem(itemId, qty);
            this.inventoryUI.refreshDisplay();
        },
        remove: (itemId, qty) => {
            this.inventorySystem.removeItem(itemId, qty);
            this.inventoryUI.refreshDisplay();
        },
        clear: () => {
            this.inventorySystem.clearInventory();
            this.inventoryUI.refreshDisplay();
        },
        print: () => {
            this.inventorySystem.debugPrintInventory();
        },
        give: (itemId) => {
            this.inventorySystem.addItem(itemId, 10);
            this.inventoryUI.refreshDisplay();
        }
    };

    console.log('Debug commands available: debugInventory.add(), .remove(), .clear(), .print(), .give()');
}
```

Then in browser console:
```javascript
debugInventory.add('coffee', 5)
debugInventory.print()
debugInventory.give('apple')
```

## Controls Reference

Once integrated, players can:

- **Press I** - Open/close full inventory
- **Press 1-9, 0** - Select hotbar slots
- **Press E** - Use selected item (eat food, use tool, etc.)
- **Press ESC** - Close inventory
- **Click slots** - Select or interact with items
- **Hover over items** - See tooltips with info

## Next Steps

1. Generate or download item sprite images
2. Place them in `assets/sprites/` directory
3. Integrate into desired scenes (Classroom, Cottage, Village, etc.)
4. Test with debug commands
5. Connect to gameplay systems (vending machines, chests, NPCs, etc.)
6. Implement crafting UI (future enhancement)

## Troubleshooting

**Problem**: Items not showing in slots
- **Solution**: Check that sprites are loaded in preload() and iconKey matches

**Problem**: Inventory not saving between scenes
- **Solution**: Make sure to call saveToStorage() and saveToRegistry() before scene transitions

**Problem**: Energy not restored when eating food
- **Solution**: Ensure energyMeter exists on the scene before creating inventory system

**Problem**: Keyboard controls not working
- **Solution**: Check that no other systems are capturing the same key inputs

---

Happy coding! The inventory system is ready to use.
