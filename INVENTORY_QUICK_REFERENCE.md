# Inventory System - Quick Reference Card

A cheat sheet for using the inventory system in the Montessori Game.

## Files Overview

| File | Purpose | Size |
|------|---------|------|
| `src/systems/InventorySystem.js` | Core data & logic | 13KB |
| `src/ui/InventoryUI.js` | Visual interface | 18KB |
| `src/data/items.js` | Item definitions | 10KB |

## Essential Code Snippets

### Initialize System

```javascript
// In scene's create()
this.inventorySystem = new InventorySystem(this);
this.inventoryUI = new InventoryUI(this, this.inventorySystem);
this.inventoryUI.refreshDisplay();
```

### Add Items

```javascript
this.inventorySystem.addItem('apple', 5);
this.inventoryUI.refreshDisplay();
```

### Remove Items

```javascript
this.inventorySystem.removeItem('coffee', 1);
this.inventoryUI.refreshDisplay();
```

### Check Items

```javascript
if (this.inventorySystem.hasItem('wood', 10)) {
    console.log('Has enough wood');
}

const count = this.inventorySystem.countItem('apple');
console.log(`Has ${count} apples`);
```

### Use Selected Item

```javascript
const result = this.inventorySystem.useSelectedItem();
console.log(result.message);
```

### Debug Commands

```javascript
// In browser console
debugInventory.add('coffee', 10)
debugInventory.remove('apple', 5)
debugInventory.print()
debugInventory.clear()
```

## Player Controls

| Key | Action |
|-----|--------|
| `I` | Toggle inventory |
| `1-9, 0` | Select hotbar slot |
| `E` | Use selected item |
| `ESC` | Close inventory |

## Item Types

```javascript
ItemType.FOOD        // Restores energy
ItemType.MATERIAL    // Crafting materials
ItemType.TOOL        // Reusable tools
ItemType.CONSUMABLE  // Single-use items
ItemType.QUEST       // Quest items
```

## Available Items

### Food (Energy Restore)
- `coffee` - +20 energy
- `apple` - +10 energy
- `sandwich` - +30 energy
- `cookie` - +5 energy

### Materials
- `wood` - Building material
- `stone` - Building material
- `fabric` - Crafting material
- `paint` - Crafting material

### Tools
- `storybook` - Read to children
- `measuring_tape` - Measure objects
- `notebook` - Record observations

### Consumables
- `bandage` - First aid
- `tissue_box` - Help with runny noses

### Quest Items
- `parent_note` - Important notes
- `field_trip_permission` - Permission slips

## Creating New Items

```javascript
// In src/data/items.js
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
            return { success: true, message: 'Feeling relaxed! +15 Energy' };
        }
        return { success: false, message: 'Cannot use right now' };
    }
}),
```

## Common Patterns

### Give Starting Items
```javascript
create() {
    this.inventorySystem.addItem('coffee', 2);
    this.inventorySystem.addItem('apple', 5);
    this.inventoryUI.refreshDisplay();
}
```

### World Item Pickup
```javascript
placePickableItem(x, y, itemId, quantity) {
    const sprite = this.add.sprite(x, y, `item_${itemId}`);
    sprite.setInteractive();
    sprite.on('pointerdown', () => {
        if (this.inventorySystem.addItem(itemId, quantity)) {
            this.inventoryUI.showMessage(`Picked up ${itemId}!`, true);
            sprite.destroy();
        } else {
            this.inventoryUI.showMessage('Inventory full!', false);
        }
        this.inventoryUI.refreshDisplay();
    });
}
```

### Vending Machine
```javascript
buyItem(itemId, price) {
    const money = this.registry.get('playerMoney');
    if (money >= price) {
        if (this.inventorySystem.addItem(itemId, 1)) {
            this.registry.set('playerMoney', money - price);
            this.inventoryUI.showMessage(`Purchased!`, true);
        } else {
            this.inventoryUI.showMessage('Inventory full!', false);
        }
        this.inventoryUI.refreshDisplay();
    }
}
```

### Crafting Check
```javascript
canCraft(recipe) {
    for (const mat of recipe.materials) {
        if (!this.inventorySystem.hasItem(mat.itemId, mat.quantity)) {
            return false;
        }
    }
    return true;
}

craft(recipe) {
    if (!this.canCraft(recipe)) return;

    // Remove materials
    for (const mat of recipe.materials) {
        this.inventorySystem.removeItem(mat.itemId, mat.quantity);
    }

    // Add result
    this.inventorySystem.addItem(recipe.result.itemId, recipe.result.quantity);
    this.inventoryUI.refreshDisplay();
}
```

## Persistence

### Auto-Save (Default)
```javascript
// Automatically saves on every inventory change
// Uses localStorage key: 'montessori_inventory'
```

### Manual Save/Load
```javascript
// Save
this.inventorySystem.saveToStorage();
this.inventorySystem.saveToRegistry(this.game);

// Load
this.inventorySystem.loadFromStorage();
this.inventorySystem.loadFromRegistry(this.game);
```

### Clear Saved Data
```javascript
localStorage.removeItem('montessori_inventory');
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Items not visible | Check sprites loaded in preload() |
| Inventory not saving | Check localStorage enabled |
| Energy not restoring | Ensure scene.energyMeter exists |
| Controls not working | Check for key conflicts |
| Slots not updating | Call refreshDisplay() after changes |

## API Quick Reference

### InventorySystem Methods

```javascript
// Add/Remove
addItem(itemId, quantity) → boolean
removeItem(itemId, quantity) → boolean

// Query
hasItem(itemId, quantity) → boolean
countItem(itemId) → number
getSelectedItem() → ItemStack | null
getItemAt(slotIndex) → ItemStack | null

// Selection
selectSlot(slotIndex) → void

// Use
useSelectedItem() → { success, message }

// Movement
moveItem(fromIndex, toIndex) → boolean

// Persistence
saveToStorage() → void
loadFromStorage() → void
saveToRegistry(game) → void
loadFromRegistry(game) → void

// Utility
clearInventory() → void
debugPrintInventory() → void
getHotbarItems() → Array<ItemStack>
getAllItems() → Array<ItemStack>
getInventoryRows() → Array<Array<ItemStack>>
```

### InventoryUI Methods

```javascript
// Display
refreshDisplay() → void
update() → void

// Interaction
openInventory() → void
closeInventory() → void
toggleInventory() → void
useSelectedItem() → void
showMessage(message, isSuccess) → void

// Cleanup
destroy() → void
```

## Configuration Options

```javascript
new InventorySystem(scene, {
    hotbarSize: 10,        // Number of hotbar slots
    inventoryRows: 4,      // Total rows (including hotbar)
    inventoryCols: 10,     // Columns per row
    persistKey: 'montessori_inventory'  // localStorage key
})
```

## Default Layout

```
Total Slots: 40
Layout: 4 rows × 10 columns

Row 0 (Hotbar): Slots 0-9   (always visible)
Row 1:          Slots 10-19  (toggle with I)
Row 2:          Slots 20-29  (toggle with I)
Row 3:          Slots 30-39  (toggle with I)
```

## Performance Tips

1. Only call `refreshDisplay()` after changes, not every frame
2. Use `update()` in scene's update loop for tooltip tracking
3. Batch multiple `addItem()` calls before refreshing
4. Use sprite atlases for item icons
5. Clear references in `destroy()` methods

## Integration Checklist

- [ ] Import InventorySystem, InventoryUI, ITEMS
- [ ] Load item sprites in preload()
- [ ] Initialize in create()
- [ ] Call update() in scene update loop
- [ ] Add starting items
- [ ] Test controls (I, 1-9, E, ESC)
- [ ] Test persistence across scenes
- [ ] Add debug commands
- [ ] Create item pickup mechanics
- [ ] Integrate with energy system

## Getting Help

1. Read `INVENTORY_SYSTEM.md` for full documentation
2. See `INVENTORY_INTEGRATION_EXAMPLE.md` for integration guide
3. Check `INVENTORY_ARCHITECTURE.md` for system overview
4. Use `debugPrintInventory()` to inspect state
5. Check browser console for errors

---

**Version**: 1.0
**Created**: 2026-02-14
**Status**: ✅ Ready for Use
