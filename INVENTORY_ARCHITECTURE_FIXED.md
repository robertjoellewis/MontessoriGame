# Inventory System Architecture (Fixed)

## Before Fix (Dual System - BROKEN)

```
┌─────────────────────────────────────────────────────────────────┐
│                         COTTAGE SCENE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐        ┌──────────────────┐              │
│  │ InventorySystem │◄───────│  InventoryUI     │              │
│  │  (Data Layer)   │        │  (Hotbar + Grid) │              │
│  │  - 40 slots     │        │  - Toggle with I │              │
│  │  - localStorage │        │  - Tooltips      │              │
│  └─────────────────┘        └──────────────────┘              │
│         ▲                                                       │
│         │ Connected                                            │
│         │                                                       │
│  [Gluten-free bar appears here ✓]                             │
│                                                                 │
│  ┌──────────────────┐                                          │
│  │  InventoryMenu   │  ◄─── NOT CONNECTED!                    │
│  │  (ESC menu)      │                                          │
│  │  - 8 slots       │                                          │
│  │  - Toggle ESC    │                                          │
│  │  - Bandana       │                                          │
│  └──────────────────┘                                          │
│                                                                 │
│  [Gluten-free bar MISSING here ✗]                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    CLASSROOM SCENE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐                                          │
│  │  InventoryMenu   │  ◄─── NOT CONNECTED!                    │
│  │  (ESC menu)      │                                          │
│  │  - 8 slots       │                                          │
│  │  - Toggle ESC    │                                          │
│  │  - Bandana       │                                          │
│  └──────────────────┘                                          │
│                                                                 │
│  [Gluten-free bar MISSING ✗]                                  │
│  [NO InventorySystem or InventoryUI]                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      VILLAGE SCENE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐                                          │
│  │  InventoryMenu   │  ◄─── NOT CONNECTED!                    │
│  │  (ESC menu)      │                                          │
│  │  - 8 slots       │                                          │
│  │  - Toggle ESC    │                                          │
│  │  - Bandana       │                                          │
│  └──────────────────┘                                          │
│                                                                 │
│  [Gluten-free bar MISSING ✗]                                  │
│  [NO InventorySystem or InventoryUI]                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Problem**: InventoryMenu showed empty slots because it wasn't reading from InventorySystem!

---

## After Fix (Unified System - WORKING)

```
┌─────────────────────────────────────────────────────────────────┐
│                         ALL SCENES                              │
│              (Cottage, Village, Classroom)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────┐          │
│  │           InventorySystem (Data Layer)           │          │
│  │                                                  │          │
│  │  - 40 slots (10 hotbar + 30 inventory)          │          │
│  │  - Persists to localStorage                     │          │
│  │  - Shared across ALL scenes                     │          │
│  │  - Single source of truth                       │          │
│  └───────────────────┬──────────────────────────────┘          │
│                      │                                          │
│                      │ Connected                                │
│                      ▼                                          │
│  ┌──────────────────────────────────────────────────┐          │
│  │           InventoryUI (Visual Layer)             │          │
│  │                                                  │          │
│  │  Always Visible:                                │          │
│  │  ┌─────────────────────────────────────────┐   │          │
│  │  │  [1] [2] [3] [4] [5] [6] [7] [8] [9] [0]│   │          │
│  │  │   Hotbar (bottom of screen)             │   │          │
│  │  └─────────────────────────────────────────┘   │          │
│  │                                                  │          │
│  │  Press I or ESC to open:                        │          │
│  │  ┌─────────────────────────────────────────┐   │          │
│  │  │     Full Inventory Grid (4x10)          │   │          │
│  │  │  [1] [2] [3] [4] [5] [6] [7] [8] [9] [0]│   │          │
│  │  │  [x] [x] [x] [x] [x] [x] [x] [x] [x] [x]│   │          │
│  │  │  [x] [x] [x] [x] [x] [x] [x] [x] [x] [x]│   │          │
│  │  │  [x] [x] [x] [x] [x] [x] [x] [x] [x] [x]│   │          │
│  │  │  - Tooltips on hover                    │   │          │
│  │  │  - Click to use/select                  │   │          │
│  │  │  - Shows quantities                     │   │          │
│  │  └─────────────────────────────────────────┘   │          │
│  └──────────────────────────────────────────────────┘          │
│                                                                 │
│  [Gluten-free bar appears in ALL scenes ✓]                    │
│                                                                 │
│                                                                 │
│  ┌──────────────────────────────────────────────────┐          │
│  │        ClothingMenu (Appearance Layer)           │          │
│  │                                                  │          │
│  │  Press C to open:                                │          │
│  │  ┌─────────────────────────────────────────┐   │          │
│  │  │        APPEARANCE MENU                  │   │          │
│  │  │                                         │   │          │
│  │  │  [Preview]    Bandana:                 │   │          │
│  │  │     🧍       [NECK ⟷ HEAD]            │   │          │
│  │  │              ▲                          │   │          │
│  │  │             (toggle)                    │   │          │
│  │  │                                         │   │          │
│  │  │  Future: Outfits, accessories, etc.    │   │          │
│  │  └─────────────────────────────────────────┘   │          │
│  └──────────────────────────────────────────────────┘          │
│                                                                 │
│  [Bandana position persists via Phaser registry]              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Adding Items

```
Robert gives energy bar
        │
        ▼
inventorySystem.addItem('gluten_free_bar', 1)
        │
        ├──► Adds to first empty slot
        ├──► Saves to localStorage
        └──► Returns success
                │
                ▼
        inventoryUI.refreshDisplay()
                │
                ▼
        Item appears in hotbar slot
```

### Using Items

```
Player presses E key
        │
        ▼
inventoryUI.useSelectedItem()
        │
        ▼
inventorySystem.useSelectedItem()
        │
        ├──► Gets selected item definition
        ├──► Calls item.useFunction(scene, inventorySystem)
        │       │
        │       └──► energyMeter.addEnergy(20)
        │
        ├──► Removes 1 from quantity (consumables)
        ├──► Saves to localStorage
        └──► Returns { success: true, message: '...' }
                │
                ▼
        inventoryUI.showMessage('Healthy and delicious! +20 Energy')
```

### Cross-Scene Persistence

```
CottageScene
    │
    └──► inventorySystem.saveToStorage()
            │ (writes to localStorage: 'montessori_inventory')
            │
            ▼ [Scene Change]
            │
VillageScene
    │
    └──► inventorySystem.loadFromStorage()
            │ (reads from localStorage: 'montessori_inventory')
            │
            ▼
        Same items appear!
```

---

## Key Components

### InventorySystem (`/src/systems/InventorySystem.js`)
- **Role**: Data management
- **Responsibilities**:
  - Store item slots (40 ItemStack objects)
  - Add/remove items with stacking logic
  - Handle item usage
  - Persist to localStorage
  - Track selected hotbar slot
- **State**: slots[], selectedSlot, config

### InventoryUI (`/src/ui/InventoryUI.js`)
- **Role**: Visual representation
- **Responsibilities**:
  - Display hotbar (always visible)
  - Display full inventory grid (toggle I/ESC)
  - Show tooltips on hover
  - Handle slot clicks and interactions
  - Animate item usage feedback
- **Controls**:
  - I or ESC: Toggle inventory
  - 1-9, 0: Select hotbar slots
  - E: Use selected item
  - Click: Select/use items

### ClothingMenu (`/src/ui/ClothingMenu.js`)
- **Role**: Appearance customization
- **Responsibilities**:
  - Display character preview
  - Toggle bandana position
  - Regenerate player animations
  - Save preferences to registry
- **Controls**:
  - C: Toggle menu
  - Click button: Toggle bandana

### ItemDefinition (`/src/data/items.js`)
- **Role**: Item templates
- **Properties**:
  - id, name, type, description
  - iconKey (Phaser texture)
  - stackable, maxStack
  - useFunction (callback)
  - energyRestore, sellPrice
- **Example**: GLUTEN_FREE_BAR definition

---

## Benefits of Unified System

✓ **Single Source of Truth**: All scenes read from InventorySystem
✓ **Persistence**: Items saved to localStorage, survive page refresh
✓ **Consistency**: Same UI in all scenes
✓ **Separation of Concerns**: Items vs Appearance
✓ **Scalability**: Easy to add new scenes
✓ **Maintainability**: One system to debug/update
✓ **User Experience**: Inventory persists across game world

---

## Controls Reference

| Key | Action | Where |
|-----|--------|-------|
| **I** | Toggle full inventory | All scenes |
| **ESC** | Toggle full inventory | All scenes |
| **C** | Toggle clothing menu | All scenes |
| **1-9, 0** | Select hotbar slot | All scenes |
| **E** | Use selected item | All scenes |
| **Click item** | View tooltip, select | Inventory UI |
| **Click slot** | Select hotbar slot | Hotbar |

---

## Integration Pattern for New Scenes

```javascript
// 1. Import
import InventorySystem from '../systems/InventorySystem.js';
import InventoryUI from '../ui/InventoryUI.js';
import ClothingMenu from '../ui/ClothingMenu.js';

// 2. In create()
this.inventorySystem = new InventorySystem(this, {
    hotbarSize: 10,
    inventoryRows: 4,
    inventoryCols: 10,
    persistKey: 'montessori_inventory'
});

this.inventoryUI = new InventoryUI(this, this.inventorySystem);

this.time.delayedCall(100, () => {
    this.clothingMenu = new ClothingMenu(this, this.player);
});

// 3. Setup C key for clothing
this.cKey = this.input.keyboard.addKey('C');
this.cKey.on('down', () => {
    if (this.clothingMenu) {
        this.clothingMenu.toggle();
    }
});

// 4. In update()
if (this.inventoryUI) {
    this.inventoryUI.update();
}
```

Done! New scene now has full inventory + clothing support.
