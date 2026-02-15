# Inventory System Architecture

Visual overview of the Stardew Valley-inspired inventory system for the Montessori Game.

## System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                         MONTESSORI GAME                          │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐     │
│  │                    GAME SCENE                          │     │
│  │  (ClassroomScene, CottageScene, VillageScene, etc.)   │     │
│  │                                                        │     │
│  │  ┌──────────────────┐        ┌──────────────────┐     │     │
│  │  │ InventorySystem  │◄───────│  InventoryUI     │     │     │
│  │  │                  │        │                  │     │     │
│  │  │ • Data Storage   │        │ • Hotbar (10)    │     │     │
│  │  │ • Item Logic     │        │ • Full Grid (40) │     │     │
│  │  │ • Stacking       │        │ • Tooltips       │     │     │
│  │  │ • Persistence    │        │ • Input Handling │     │     │
│  │  │ • Use Functions  │        │ • Visual Effects │     │     │
│  │  └────────┬─────────┘        └──────────────────┘     │     │
│  │           │                                            │     │
│  │           │                                            │     │
│  │  ┌────────▼──────────────────────────────────┐        │     │
│  │  │        Item Definitions (items.js)        │        │     │
│  │  │                                            │        │     │
│  │  │  • ItemType Enum                          │        │     │
│  │  │  • ItemDefinition Class                   │        │     │
│  │  │  • ITEMS Object (all game items)          │        │     │
│  │  │  • Crafting Recipes                       │        │     │
│  │  │  • Helper Functions                       │        │     │
│  │  └───────────────────────────────────────────┘        │     │
│  │                                                        │     │
│  └────────────────────────────────────────────────────────┘     │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐     │
│  │              PERSISTENCE LAYER                         │     │
│  │                                                        │     │
│  │  ┌──────────────────┐      ┌──────────────────┐       │     │
│  │  │  localStorage    │      │ Phaser Registry  │       │     │
│  │  │  (browser-wide)  │      │ (session-wide)   │       │     │
│  │  └──────────────────┘      └──────────────────┘       │     │
│  └────────────────────────────────────────────────────────┘     │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### 1. InventorySystem (Data & Logic Layer)

**File**: `src/systems/InventorySystem.js`

**Responsibilities**:
- Manage item slots (array of ItemStack objects)
- Handle item addition/removal with smart stacking
- Track selected hotbar slot
- Execute item use functions
- Save/load inventory state
- Provide inventory queries (hasItem, countItem, etc.)

**Key Data Structures**:
```javascript
// Main inventory storage
slots: Array<ItemStack | null>  // Length: hotbarSize + (rows * cols)

// Item stack structure
class ItemStack {
    itemId: string
    quantity: number
    definition: ItemDefinition
}
```

**Public API**:
- `addItem(itemId, quantity)` - Add items with stacking
- `removeItem(itemId, quantity)` - Remove items
- `hasItem(itemId, quantity)` - Check existence
- `countItem(itemId)` - Count total quantity
- `useSelectedItem()` - Use/consume item
- `moveItem(fromIndex, toIndex)` - Move/swap items
- `getSelectedItem()` - Get current hotbar selection
- `saveToStorage()` / `loadFromStorage()` - Persistence

### 2. InventoryUI (Presentation Layer)

**File**: `src/ui/InventoryUI.js`

**Responsibilities**:
- Render always-visible hotbar (bottom of screen)
- Render toggleable full inventory grid
- Display item sprites and quantities
- Show tooltips on hover
- Handle keyboard and mouse input
- Visual feedback (selection highlight, hover effects)
- Display messages to player

**UI Components**:
```
Hotbar (always visible, depth 1000):
┌─────────────────────────────────────────────────────┐
│ [1] [2] [3] [4] [5] [6] [7] [8] [9] [0]            │
│  🍎  ☕  📖  🪵  🪵  □   □   □   □   □              │
│  x5  x3  x1  x50 x50                                │
└─────────────────────────────────────────────────────┘

Full Inventory (toggle with I, depth 2000):
┌────────────────── INVENTORY ──────────────────────┐
│                                                   │
│  [🍎x5] [☕x3] [📖x1] [🪵x50] [🪵x50] [ ] [ ] [ ] [ ] [ ]  │
│  [ ]   [ ]   [ ]   [ ]   [ ]   [ ] [ ] [ ] [ ] [ ]  │
│  [ ]   [ ]   [ ]   [ ]   [ ]   [ ] [ ] [ ] [ ] [ ]  │
│  [ ]   [ ]   [ ]   [ ]   [ ]   [ ] [ ] [ ] [ ] [ ]  │
│                                                   │
│                    [CLOSE]                        │
└───────────────────────────────────────────────────┘

Tooltip (on hover, depth 3000):
┌──────────────────────┐
│ Apple                │
│ [FOOD]              │
│ A crisp, fresh       │
│ apple. Restores      │
│ 10 energy.           │
│                      │
│ Left-click to use    │
│ +10 Energy           │
└──────────────────────┘
```

### 3. Item Definitions (Data Layer)

**File**: `src/data/items.js`

**Responsibilities**:
- Define all game items
- Specify item properties and behaviors
- Define crafting recipes
- Provide item query helpers

**Structure**:
```javascript
// Item type categories
ItemType {
    FOOD: 'food',
    MATERIAL: 'material',
    TOOL: 'tool',
    CONSUMABLE: 'consumable',
    QUEST: 'quest'
}

// Item definition template
ItemDefinition {
    id: string              // 'apple'
    name: string            // 'Apple'
    type: ItemType          // ItemType.FOOD
    description: string     // 'A crisp, fresh apple...'
    iconKey: string         // 'item_apple'
    stackable: boolean      // true
    maxStack: number        // 50
    energyRestore: number   // 10
    sellPrice: number       // 5
    useFunction: function   // (scene, inventory) => {...}
    craftable: boolean      // false
    craftingRecipe: object  // { materials: [...], result: {...} }
}

// All items in game
ITEMS {
    COFFEE: ItemDefinition {...},
    APPLE: ItemDefinition {...},
    SANDWICH: ItemDefinition {...},
    // ... 15+ items defined
}
```

## Data Flow

### Adding an Item

```
Player picks up item
        │
        ▼
  inventorySystem.addItem('apple', 5)
        │
        ├──► Try to stack with existing apples
        │
        ├──► If overflow, create new stack
        │
        ├──► Update slots array
        │
        ├──► saveToStorage()
        │
        ▼
  inventoryUI.refreshDisplay()
        │
        ├──► Update hotbar visuals
        │
        ├──► Update full inventory visuals
        │
        ▼
  Player sees item in hotbar
```

### Using an Item

```
Player presses E key
        │
        ▼
  inventoryUI.useSelectedItem()
        │
        ▼
  inventorySystem.useSelectedItem()
        │
        ├──► Get selected ItemStack
        │
        ├──► Get ItemDefinition
        │
        ├──► Execute useFunction(scene, inventory)
        │    │
        │    ├──► scene.energyMeter.addEnergy(10)
        │    │
        │    └──► return { success: true, message: '...' }
        │
        ├──► If consumable, removeItem(1)
        │
        ├──► saveToStorage()
        │
        ▼
  inventoryUI.showMessage(result.message)
        │
        ▼
  inventoryUI.refreshDisplay()
        │
        ▼
  Player sees energy increase
```

### Persistence Flow

```
Inventory changes
        │
        ▼
  inventorySystem.saveToStorage()
        │
        ├──► Serialize all slots to JSON
        │
        ├──► Save to localStorage
        │    (key: 'montessori_inventory')
        │
        └──► Save to Phaser registry
             (for scene-to-scene persistence)

On scene load:
        │
        ▼
  inventorySystem.loadFromStorage()
        │
        ├──► Read from localStorage
        │
        ├──► Deserialize JSON to ItemStack objects
        │
        ├──► Restore slots array
        │
        └──► Restore selectedSlot
```

## Item Type Categories

```
┌─────────────────────────────────────────────────────────────┐
│                      ITEM TYPES                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🍎 FOOD                                                    │
│     • Consumable items that restore energy                 │
│     • Auto-consumed on use                                 │
│     • Examples: Coffee, Apple, Sandwich, Cookie            │
│                                                             │
│  🪵 MATERIAL                                                │
│     • Raw materials for crafting                           │
│     • High stack limits (999)                              │
│     • Examples: Wood, Stone, Fabric, Paint                 │
│                                                             │
│  🔧 TOOL                                                    │
│     • Reusable items with special functions                │
│     • Usually not stackable                                │
│     • Examples: Storybook, Measuring Tape, Notebook        │
│                                                             │
│  💊 CONSUMABLE                                              │
│     • Single-use items (not food)                          │
│     • Auto-consumed on use                                 │
│     • Examples: Bandage, Tissue Box                        │
│                                                             │
│  📜 QUEST                                                   │
│     • Quest-related items                                  │
│     • Cannot be used directly                              │
│     • Examples: Parent Note, Permission Slip               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Hotbar vs Full Inventory

```
┌──────────────────────────────────────────────────────────┐
│                  INVENTORY STRUCTURE                     │
│                                                          │
│  Total Slots: 40 (default)                              │
│  Layout: 4 rows x 10 columns                            │
│                                                          │
│  ┌──────────────────────────────────────┐               │
│  │  ROW 0: HOTBAR (always visible)      │               │
│  │  [0] [1] [2] [3] [4] [5] [6] [7] [8] [9]            │
│  │   ↑                                                  │
│  │   Selected slot (yellow border)                     │
│  └──────────────────────────────────────┘               │
│                                                          │
│  ┌──────────────────────────────────────┐               │
│  │  ROW 1-3: Storage (visible when I pressed)          │
│  │  [10] [11] [12] ... [19]                            │
│  │  [20] [21] [22] ... [29]                            │
│  │  [30] [31] [32] ... [39]                            │
│  └──────────────────────────────────────┘               │
│                                                          │
│  Selection: Only hotbar slots can be selected          │
│  Number keys 1-0 select hotbar slots 0-9               │
│  E key uses selected hotbar item                        │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

## Extension Points

The system is designed for easy expansion:

### 1. Crafting System (Future)

```javascript
// Already structured in items.js
CRAFTING_RECIPES = {
    SIMPLE_SHELF: {
        materials: [
            { itemId: 'wood', quantity: 10 },
            { itemId: 'stone', quantity: 2 }
        ],
        result: { itemId: 'simple_shelf', quantity: 1 }
    }
}

// Implementation would add:
class CraftingUI {
    showRecipes()
    checkCanCraft(recipe)
    executeCraft(recipe)
}
```

### 2. Drag & Drop (Future)

```javascript
// In InventoryUI
onSlotPointerDown(slotIndex) {
    this.draggedItem = { slotIndex, item: this.getItemAt(slotIndex) };
    // Show dragging cursor
}

onSlotPointerUp(targetSlotIndex) {
    this.inventorySystem.moveItem(this.draggedItem.slotIndex, targetSlotIndex);
    this.draggedItem = null;
}
```

### 3. Item Quality/Rarity (Future)

```javascript
class ItemStack {
    constructor(itemId, quantity = 1, quality = 'normal') {
        this.quality = quality; // 'normal', 'silver', 'gold', 'iridium'
        // ...
    }
}

// Display stars based on quality
```

### 4. Item Durability (Future)

```javascript
class ItemStack {
    constructor(itemId, quantity = 1, durability = null) {
        this.durability = durability; // null for non-degradable
        this.maxDurability = itemId.maxDurability;
    }
}
```

## Performance Characteristics

- **Memory**: ~40 slots x small object = minimal memory usage
- **Updates**: Only refreshes display when inventory changes (not every frame)
- **Persistence**: Saves on every change (negligible with small inventory size)
- **UI Rendering**: Efficient Phaser container/sprite system
- **Tooltips**: Single shared tooltip, repositioned on hover

## Integration Checklist

- [ ] Import InventorySystem and InventoryUI
- [ ] Import ITEMS from items.js
- [ ] Preload item sprites in scene's preload()
- [ ] Initialize in scene's create()
- [ ] Update in scene's update() loop
- [ ] Add starting items
- [ ] Test keyboard controls (I, 1-9, E, ESC)
- [ ] Test item pickup/usage
- [ ] Verify persistence across scenes
- [ ] Add debug commands for testing

## File Dependencies

```
InventoryUI.js
    └─► InventorySystem.js
            └─► items.js
                    └─► (no dependencies)

Scene integration:
    └─► InventoryUI.js
    └─► InventorySystem.js
    └─► items.js
```

## Quick Reference

**Files Created**:
- `src/systems/InventorySystem.js` - Core logic (13KB)
- `src/ui/InventoryUI.js` - Visual interface (18KB)
- `src/data/items.js` - Item definitions (10KB)
- `INVENTORY_SYSTEM.md` - Full documentation (22KB)
- `INVENTORY_INTEGRATION_EXAMPLE.md` - Integration guide (12KB)
- `INVENTORY_ARCHITECTURE.md` - This file

**Total Lines of Code**: ~1,500 lines
**Item Types Supported**: 5 (Food, Material, Tool, Consumable, Quest)
**Items Defined**: 15 items ready to use
**Crafting Recipes**: 3 example recipes defined

---

**System Status**: ✅ Complete and ready for integration
