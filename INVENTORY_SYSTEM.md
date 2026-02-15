# Inventory System Documentation

A comprehensive Stardew Valley-inspired inventory system for the Montessori Game, featuring hotbar management, full inventory grid, item stacking, tooltips, and persistence.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [File Structure](#file-structure)
- [Core Components](#core-components)
- [Usage Guide](#usage-guide)
- [Item System](#item-system)
- [Crafting System](#crafting-system)
- [Controls](#controls)
- [Extending the System](#extending-the-system)
- [Examples](#examples)

---

## Overview

The inventory system provides a complete item management solution with:

- **Always-visible hotbar** (10 slots) at bottom of screen
- **Full inventory grid** (40 slots: 4 rows x 10 columns) accessible via 'I' key
- **Smart item stacking** based on item properties
- **Item tooltips** showing name, type, description, and usage
- **Multiple item types**: Food, Materials, Tools, Consumables, Quest items
- **Use functions** for consumable items (eating food restores energy)
- **Persistence** via localStorage and Phaser registry
- **Extensible crafting system** ready for future implementation

### Research

This system is inspired by Stardew Valley's inventory mechanics:
- Hotbar is the primary row always visible at bottom
- Number keys (1-9, 0) select hotbar slots
- Full inventory opens with a key press ('I' in our implementation)
- Items stack based on type and max stack size
- Visual feedback for selected slot and hover states

*Source: [Stardew Valley Wiki - Inventory](https://stardewvalleywiki.com/Inventory)*

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         GAME SCENE                          │
│                                                             │
│  ┌────────────────┐         ┌──────────────────────┐       │
│  │ InventorySystem│◄────────│    InventoryUI       │       │
│  │                │         │                      │       │
│  │ - Data storage │         │ - Visual rendering   │       │
│  │ - Logic        │         │ - User interaction   │       │
│  │ - Persistence  │         │ - Tooltips           │       │
│  └────────┬───────┘         └──────────────────────┘       │
│           │                                                 │
│           │                                                 │
│  ┌────────▼─────────────────────────────────┐              │
│  │         Item Definitions                 │              │
│  │  (src/data/items.js)                    │              │
│  │  - Item properties                       │              │
│  │  - Use functions                         │              │
│  │  - Crafting recipes                      │              │
│  └──────────────────────────────────────────┘              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Design Principles

1. **Separation of Concerns**:
   - `InventorySystem` handles all data and logic
   - `InventoryUI` handles all visual representation and user input
   - `items.js` defines item properties and behaviors

2. **Data-Driven**:
   - Items are defined in data files, not hardcoded
   - Easy to add new items without modifying core systems

3. **Extensible**:
   - Crafting system structure in place for future expansion
   - Item use functions allow custom behaviors per item

4. **Persistent**:
   - Saves to localStorage for browser persistence
   - Can also save to Phaser registry for scene-to-scene persistence

---

## File Structure

```
src/
├── systems/
│   └── InventorySystem.js      # Core inventory logic and data management
├── ui/
│   └── InventoryUI.js           # Visual rendering and user interaction
└── data/
    └── items.js                 # Item definitions, types, and recipes
```

### InventorySystem.js

Core inventory management class that handles:
- Item storage in slots (array of ItemStack objects)
- Adding/removing items with smart stacking
- Item quantity tracking
- Selected slot management
- Persistence (localStorage and Phaser registry)
- Item use/consumption logic

**Key Methods**:
- `addItem(itemId, quantity)` - Add items to inventory
- `removeItem(itemId, quantity)` - Remove items from inventory
- `hasItem(itemId, quantity)` - Check if item exists
- `useSelectedItem()` - Use/consume selected item
- `moveItem(fromIndex, toIndex)` - Move/swap items between slots
- `saveToStorage()` / `loadFromStorage()` - Persistence

### InventoryUI.js

Visual interface and user interaction layer:
- Hotbar rendering (always visible)
- Full inventory grid (toggleable)
- Item sprites and quantity display
- Tooltips on hover
- Click/keyboard interaction handling
- Visual feedback (selection, hover)

**Key Methods**:
- `refreshDisplay()` - Update all slot visuals
- `openInventory()` / `closeInventory()` - Toggle inventory
- `showTooltip(itemDef)` - Display item information
- `useSelectedItem()` - Trigger item use with visual feedback

### items.js

Item definitions and configurations:
- `ItemType` enum (FOOD, MATERIAL, TOOL, CONSUMABLE, QUEST)
- `ItemDefinition` class structure
- `ITEMS` object containing all game items
- Helper functions to query items
- Crafting recipe definitions

---

## Core Components

### ItemStack

Represents a single stack of items in a slot.

```javascript
class ItemStack {
    itemId: string          // Unique item identifier
    quantity: number        // Current stack size
    definition: ItemDefinition  // Reference to item definition
}
```

**Methods**:
- `canStack()` - Check if more items can be added
- `addToStack(amount)` - Add items, return overflow
- `removeFromStack(amount)` - Remove items, return amount removed
- `isEmpty()` - Check if stack is depleted

### ItemDefinition

Defines properties and behavior of an item type.

```javascript
class ItemDefinition {
    id: string              // Unique identifier
    name: string            // Display name
    type: ItemType          // Category (food, material, etc.)
    description: string     // Tooltip description
    iconKey: string         // Phaser texture key
    stackable: boolean      // Can multiple stack in one slot?
    maxStack: number        // Maximum stack size
    useFunction: function   // What happens when used
    energyRestore: number   // Energy restored (food items)
    sellPrice: number       // Sale value
    craftable: boolean      // Can be crafted?
    craftingRecipe: object  // Recipe if craftable
}
```

---

## Usage Guide

### Basic Integration

1. **Import the systems**:

```javascript
import InventorySystem from './systems/InventorySystem.js';
import InventoryUI from './ui/InventoryUI.js';
import { ITEMS } from './data/items.js';
```

2. **Initialize in your scene's `create()` method**:

```javascript
create() {
    // Create inventory system (data)
    this.inventorySystem = new InventorySystem(this, {
        hotbarSize: 10,
        inventoryRows: 4,
        inventoryCols: 10,
        persistKey: 'montessori_inventory'
    });

    // Create inventory UI (visuals)
    this.inventoryUI = new InventoryUI(this, this.inventorySystem);

    // Add some starting items
    this.inventorySystem.addItem('coffee', 3);
    this.inventorySystem.addItem('apple', 10);
    this.inventorySystem.addItem('notebook', 1);

    // Refresh display
    this.inventoryUI.refreshDisplay();
}
```

3. **Update in your scene's `update()` method**:

```javascript
update(time, delta) {
    // Update UI (handles tooltips, etc.)
    this.inventoryUI.update();
}
```

### Adding Items

```javascript
// Add items during gameplay
this.inventorySystem.addItem('apple', 5);  // Add 5 apples
this.inventorySystem.addItem('coffee', 1);  // Add 1 coffee

// Check if successful
const success = this.inventorySystem.addItem('wood', 100);
if (!success) {
    console.log('Inventory full!');
}
```

### Removing Items

```javascript
// Remove items
this.inventorySystem.removeItem('apple', 3);  // Remove 3 apples

// Check if player has item before removing
if (this.inventorySystem.hasItem('wood', 10)) {
    this.inventorySystem.removeItem('wood', 10);
    console.log('Crafted item using 10 wood');
}
```

### Using Items

```javascript
// Player can use selected item with E key (default)
// Or programmatically:
const result = this.inventorySystem.useSelectedItem();
console.log(result.message);  // "You feel more awake! +20 Energy"
```

### Checking Inventory

```javascript
// Check if player has item
if (this.inventorySystem.hasItem('coffee', 1)) {
    console.log('Player has coffee');
}

// Count total quantity
const appleCount = this.inventorySystem.countItem('apple');
console.log(`Player has ${appleCount} apples`);

// Get selected item
const selectedItem = this.inventorySystem.getSelectedItem();
if (selectedItem) {
    console.log(`Selected: ${selectedItem.definition.name}`);
}
```

---

## Item System

### Item Types

```javascript
export const ItemType = {
    FOOD: 'food',           // Consumables that restore energy
    MATERIAL: 'material',   // Raw materials for crafting
    TOOL: 'tool',          // Usable tools with special functions
    CONSUMABLE: 'consumable', // Other consumables (not food)
    QUEST: 'quest'         // Quest-related items
};
```

### Creating New Items

Add to `src/data/items.js`:

```javascript
export const ITEMS = {
    // ... existing items ...

    HERBAL_TEA: new ItemDefinition({
        id: 'herbal_tea',
        name: 'Herbal Tea',
        type: ItemType.FOOD,
        description: 'A calming cup of tea. Restores 15 energy.',
        iconKey: 'item_tea',
        stackable: true,
        maxStack: 10,
        energyRestore: 15,
        sellPrice: 8,
        useFunction: (scene, inventorySystem) => {
            if (scene.energyMeter) {
                scene.energyMeter.addEnergy(15);
                return {
                    success: true,
                    message: 'Feeling relaxed! +15 Energy'
                };
            }
            return { success: false, message: 'Cannot use right now' };
        }
    }),

    CHALK: new ItemDefinition({
        id: 'chalk',
        name: 'Classroom Chalk',
        type: ItemType.TOOL,
        description: 'White chalk for writing on blackboards.',
        iconKey: 'item_chalk',
        stackable: true,
        maxStack: 50,
        sellPrice: 1,
        useFunction: (scene, inventorySystem) => {
            // Custom behavior - open drawing interface, etc.
            return {
                success: true,
                message: 'Ready to write on the board!'
            };
        }
    })
};
```

### Item Use Functions

Use functions receive the scene and inventory system as parameters:

```javascript
useFunction: (scene, inventorySystem) => {
    // Access scene properties
    if (scene.energyMeter) {
        scene.energyMeter.addEnergy(20);
    }

    // Access other systems
    if (scene.soundManager) {
        scene.soundManager.play('item_use');
    }

    // Return result
    return {
        success: true,
        message: 'Item used successfully!'
    };
}
```

---

## Crafting System

The inventory system includes foundational support for crafting. Recipes are defined in `items.js`:

```javascript
export const CRAFTING_RECIPES = {
    SIMPLE_SHELF: {
        id: 'simple_shelf',
        name: 'Simple Shelf',
        materials: [
            { itemId: 'wood', quantity: 10 },
            { itemId: 'stone', quantity: 2 }
        ],
        result: { itemId: 'simple_shelf', quantity: 1 }
    }
};
```

### Implementing Crafting (Future)

To implement crafting functionality:

1. **Check if player has materials**:

```javascript
function canCraft(recipe) {
    for (const material of recipe.materials) {
        if (!inventorySystem.hasItem(material.itemId, material.quantity)) {
            return false;
        }
    }
    return true;
}
```

2. **Execute crafting**:

```javascript
function craft(recipe) {
    // Check materials
    if (!canCraft(recipe)) {
        return { success: false, message: 'Not enough materials' };
    }

    // Remove materials
    for (const material of recipe.materials) {
        inventorySystem.removeItem(material.itemId, material.quantity);
    }

    // Add result
    inventorySystem.addItem(recipe.result.itemId, recipe.result.quantity);

    return { success: true, message: `Crafted ${recipe.name}!` };
}
```

3. **Create Crafting UI** (future enhancement):
   - Display available recipes
   - Show required materials
   - Highlight craftable items
   - Click to craft button

---

## Controls

### Keyboard Controls

| Key | Action |
|-----|--------|
| **I** | Toggle full inventory open/closed |
| **1-9** | Select hotbar slots 1-9 |
| **0** | Select hotbar slot 10 |
| **E** | Use/consume selected hotbar item |
| **ESC** | Close inventory (if open) |

### Mouse Controls

| Action | Effect |
|--------|--------|
| **Hover over slot** | Show item tooltip |
| **Click hotbar slot** | Select that slot |
| **Click inventory slot** | Interact with item (future: drag & drop) |
| **Click overlay** | Close inventory |

---

## Extending the System

### Adding Item Sprites

1. Create or generate item icons (recommended size: 32x32 or 48x48 pixels)
2. Place in `assets/sprites/` directory with naming: `item_[itemId].png`
3. Load in scene's `preload()`:

```javascript
preload() {
    this.load.image('item_coffee', 'assets/sprites/item_coffee.png');
    this.load.image('item_apple', 'assets/sprites/item_apple.png');
    // ... load other items
}
```

4. Reference in item definition via `iconKey` property

### Custom Item Categories

Add new types to `ItemType` enum:

```javascript
export const ItemType = {
    FOOD: 'food',
    MATERIAL: 'material',
    TOOL: 'tool',
    CONSUMABLE: 'consumable',
    QUEST: 'quest',
    FURNITURE: 'furniture',  // NEW
    SEED: 'seed'             // NEW
};
```

### Advanced Use Functions

```javascript
MAGIC_WAND: new ItemDefinition({
    id: 'magic_wand',
    name: 'Magic Wand',
    type: ItemType.TOOL,
    description: 'A mysterious wand with special powers.',
    iconKey: 'item_wand',
    stackable: false,
    maxStack: 1,
    useFunction: (scene, inventorySystem) => {
        // Complex behavior
        const nearbyChildren = scene.getAllChildrenInRange(100);

        if (nearbyChildren.length > 0) {
            nearbyChildren.forEach(child => {
                child.happiness += 10;
            });

            scene.playAnimation('sparkle_effect');
            scene.sound.play('magic_sound');

            return {
                success: true,
                message: `Made ${nearbyChildren.length} children happier!`
            };
        }

        return {
            success: false,
            message: 'No children nearby'
        };
    }
}),
```

### Item Rarities & Quality

Add rarity/quality system:

```javascript
class ItemStack {
    constructor(itemId, quantity = 1, quality = 'normal') {
        this.itemId = itemId;
        this.quantity = quantity;
        this.quality = quality; // 'normal', 'silver', 'gold', 'iridium'
        this.definition = getItemDefinition(itemId);
    }
}

// Update UI to show star icons for quality
```

### Drag & Drop

Implement in `InventoryUI.js`:

```javascript
onSlotClick(slotIndex, isHotbar) {
    if (!this.draggedItem) {
        // Start drag
        const item = this.inventorySystem.getItemAt(slotIndex);
        if (item) {
            this.draggedItem = { slotIndex, item };
        }
    } else {
        // End drag - move item
        this.inventorySystem.moveItem(this.draggedItem.slotIndex, slotIndex);
        this.draggedItem = null;
        this.refreshDisplay();
    }
}
```

---

## Examples

### Example 1: Reward Player with Items

```javascript
// After completing a task
function rewardPlayer() {
    this.inventorySystem.addItem('cookie', 5);
    this.inventorySystem.addItem('apple', 3);

    this.inventoryUI.showMessage('Quest Complete! Received items!', true);
    this.inventoryUI.refreshDisplay();
}
```

### Example 2: Vending Machine / Shop

```javascript
function buyItem(itemId, price) {
    const playerMoney = this.registry.get('playerMoney');

    if (playerMoney >= price) {
        const success = this.inventorySystem.addItem(itemId, 1);
        if (success) {
            this.registry.set('playerMoney', playerMoney - price);
            this.inventoryUI.showMessage(`Purchased ${itemId}!`, true);
        } else {
            this.inventoryUI.showMessage('Inventory full!', false);
        }
    } else {
        this.inventoryUI.showMessage('Not enough money!', false);
    }
}
```

### Example 3: Gift System

```javascript
function giveGiftToNPC(npcName) {
    const selectedItem = this.inventorySystem.getSelectedItem();

    if (!selectedItem) {
        this.inventoryUI.showMessage('No item selected', false);
        return;
    }

    // Remove item from inventory
    this.inventorySystem.removeItem(selectedItem.itemId, 1);

    // NPC reacts based on item
    const reaction = npcReactions[npcName][selectedItem.itemId];
    this.showNPCDialogue(npcName, reaction);

    this.inventoryUI.refreshDisplay();
}
```

### Example 4: Energy Food System

```javascript
// All food items automatically work with energy system
// When player uses food item:
this.inventoryUI.useSelectedItem();
// -> Calls item's useFunction()
// -> useFunction adds energy via scene.energyMeter.addEnergy()
// -> Item is consumed (quantity decreases by 1)
// -> Display updates automatically
```

### Example 5: Debug Commands

```javascript
// Debug console commands for testing
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
    }
};

// Usage in browser console:
// debugInventory.add('coffee', 10)
// debugInventory.print()
```

---

## Persistence

The inventory system supports two persistence methods:

### LocalStorage (Default)

Persists across browser sessions:

```javascript
// Automatic - saves on every change
this.inventorySystem.addItem('apple', 5);  // Auto-saves

// Manual save/load
this.inventorySystem.saveToStorage();
this.inventorySystem.loadFromStorage();

// Clear saved data
localStorage.removeItem('montessori_inventory');
```

### Phaser Registry

Persists across scenes in same game session:

```javascript
// In scene where inventory is created
this.inventorySystem.saveToRegistry(this.game);

// In different scene
this.inventorySystem.loadFromRegistry(this.game);
```

### Hybrid Approach

Use both for maximum persistence:

```javascript
create() {
    this.inventorySystem = new InventorySystem(this);

    // Try loading from localStorage first (browser persistence)
    this.inventorySystem.loadFromStorage();

    // If empty, try loading from registry (scene-to-scene)
    if (this.inventorySystem.getAllItems().every(slot => !slot)) {
        this.inventorySystem.loadFromRegistry(this.game);
    }
}

// Save to both on changes
onInventoryChange() {
    this.inventorySystem.saveToStorage();
    this.inventorySystem.saveToRegistry(this.game);
}
```

---

## Performance Considerations

- **Refresh Display**: Only call `refreshDisplay()` after inventory changes, not every frame
- **Tooltips**: Only one tooltip visible at a time
- **Item Sprites**: Use sprite atlas for better performance with many items
- **Event Listeners**: Properly cleaned up in `destroy()` methods

---

## Troubleshooting

### Items not appearing visually

1. Check that item sprite is loaded in `preload()`:
   ```javascript
   this.load.image('item_apple', 'assets/sprites/item_apple.png');
   ```

2. Verify `iconKey` in item definition matches loaded texture:
   ```javascript
   iconKey: 'item_apple'  // Must match load.image key
   ```

3. Call `refreshDisplay()` after adding items:
   ```javascript
   this.inventorySystem.addItem('apple', 5);
   this.inventoryUI.refreshDisplay();
   ```

### Inventory not persisting

1. Check localStorage is enabled in browser
2. Verify `persistKey` is set correctly
3. Check browser console for errors
4. Test with `localStorage.getItem('montessori_inventory')`

### Items not stacking properly

1. Verify item has `stackable: true` in definition
2. Check `maxStack` value is appropriate
3. Ensure same item ID is used consistently

---

## Future Enhancements

Potential additions to the system:

1. **Drag & Drop**: Full drag-and-drop item movement
2. **Quick Stack**: Button to auto-stack all items
3. **Sort**: Auto-sort inventory by type/name/quantity
4. **Item Filters**: Filter view by item type
5. **Trash Can**: Delete items from inventory
6. **Crafting UI**: Full crafting interface with recipe book
7. **Item Durability**: Tools that wear down with use
8. **Item Sets**: Bonuses for having multiple related items
9. **Inventory Upgrades**: Expand total slots through gameplay
10. **Item Favorites**: Pin items to specific hotbar slots

---

## Credits

System design inspired by:
- **Stardew Valley** - Hotbar and inventory mechanics
- **Terraria** - Item tooltips and quick-use system
- **Minecraft** - Hotbar selection and stacking logic

Created for the Montessori Game project.

---

## Quick Reference

### Essential Code Snippets

**Initialize System:**
```javascript
this.inventorySystem = new InventorySystem(this);
this.inventoryUI = new InventoryUI(this, this.inventorySystem);
```

**Add Item:**
```javascript
this.inventorySystem.addItem('apple', 5);
this.inventoryUI.refreshDisplay();
```

**Use Item:**
```javascript
this.inventorySystem.useSelectedItem();
```

**Check Item:**
```javascript
if (this.inventorySystem.hasItem('coffee', 1)) { /* ... */ }
```

**Debug:**
```javascript
this.inventorySystem.debugPrintInventory();
```

---

**End of Documentation**
