# Inventory System Testing Guide

## Quick Verification Tests

### Test 1: Gluten-Free Bar Appears in Cottage
**Goal**: Verify the bar appears in the unified inventory system

1. Start game in CottageScene
2. Walk to Robert (lower left corner)
3. Click on Robert
4. **Expected**: Heart animation, dialogue, "+20 Energy" message
5. **Look at hotbar** (bottom of screen)
   - ✓ Gluten-free bar icon should appear in first empty slot
   - ✓ Should show quantity "1"
6. Press **I** or **ESC** to open full inventory
   - ✓ Bar should appear in same position in grid
   - ✓ Hover over bar should show tooltip:
     - Name: "Gluten-Free Energy Bar"
     - Type: "[FOOD]"
     - Description: "A healthy snack from Robert"
     - "+20 Energy"
7. Press **I** or **ESC** again to close inventory
   - ✓ Hotbar remains visible with bar

**PASS**: Bar appears in both hotbar and full inventory ✓

---

### Test 2: Inventory Persists Across Scenes
**Goal**: Verify inventory saves and loads correctly

1. In CottageScene, receive gluten-free bar from Robert
2. Verify bar is in hotbar (slot 1 or first empty)
3. Walk to door (bottom center)
4. Click door to leave cottage
5. **Scene transition to VillageScene**
6. **Look at hotbar** in VillageScene
   - ✓ Bar should still be visible in same slot
7. Press **I** or **ESC** to open inventory
   - ✓ Bar should be in same position
8. Walk to school (far right)
9. Enter school
10. **Scene transition to ClassroomScene**
11. **Look at hotbar** in ClassroomScene
    - ✓ Bar should still be visible in same slot
12. Press **I** or **ESC** to open inventory
    - ✓ Bar should be in same position

**PASS**: Inventory persists across all scene changes ✓

---

### Test 3: Using Items from Inventory
**Goal**: Verify item consumption works

1. Make sure you have gluten-free bar in inventory
2. Check current energy level (top right)
3. Click hotbar slot containing the bar (or press number key 1-9)
   - ✓ Slot should highlight with orange border
4. Press **E** key
5. **Expected**:
   - ✓ Message appears: "Healthy and delicious! +20 Energy"
   - ✓ Energy meter increases by 20
   - ✓ Bar disappears from hotbar (quantity reduced to 0)
   - ✓ Slot becomes empty

**Alternative Method**:
1. Press **I** or **ESC** to open full inventory
2. Click on the gluten-free bar slot
3. **Expected**: Same as above

**PASS**: Item consumption works correctly ✓

---

### Test 4: Clothing Menu (Former InventoryMenu Feature)
**Goal**: Verify clothing customization still works

1. In any scene, press **C** key
2. **Expected**:
   - ✓ Appearance menu opens
   - ✓ Shows character preview
   - ✓ Shows "Bandana: NECK ⟷ HEAD" toggle
   - ✓ Triangle indicator shows current position (NECK by default)
3. Click the toggle button
4. **Expected**:
   - ✓ Triangle indicator moves to HEAD
   - ✓ Preview sprite updates (bandana on head)
   - ✓ Player sprite in game world updates
   - ✓ Walking animations update
5. Press **C** again to close menu
6. Walk around
   - ✓ Virginia has bandana on head while walking
7. Change scenes (cottage → village → classroom)
   - ✓ Bandana position persists

**PASS**: Clothing menu works independently ✓

---

### Test 5: Keyboard Controls
**Goal**: Verify all keyboard shortcuts work

| Key | Expected Action | Test Result |
|-----|-----------------|-------------|
| **I** | Toggle full inventory | ☐ |
| **ESC** | Toggle full inventory | ☐ |
| **C** | Toggle clothing menu | ☐ |
| **1** | Select hotbar slot 1 | ☐ |
| **2** | Select hotbar slot 2 | ☐ |
| **3** | Select hotbar slot 3 | ☐ |
| **4** | Select hotbar slot 4 | ☐ |
| **5** | Select hotbar slot 5 | ☐ |
| **6** | Select hotbar slot 6 | ☐ |
| **7** | Select hotbar slot 7 | ☐ |
| **8** | Select hotbar slot 8 | ☐ |
| **9** | Select hotbar slot 9 | ☐ |
| **0** | Select hotbar slot 10 | ☐ |
| **E** | Use selected item | ☐ |

**Instructions**:
1. Press each number key 1-9, 0
   - ✓ Corresponding hotbar slot should highlight (orange border)
2. With item selected, press **E**
   - ✓ Item should be consumed (if consumable)
3. Press **I** then **ESC**
   - ✓ Both should toggle inventory open/closed
4. Press **C**
   - ✓ Should open clothing menu

**PASS**: All keyboard controls work ✓

---

### Test 6: Multiple Items
**Goal**: Verify hotbar/inventory handles multiple items

**Setup**: Add code to get more items (temporarily, for testing):

```javascript
// In CottageScene, after receiving gluten-free bar:
this.inventorySystem.addItem('coffee', 3);
this.inventorySystem.addItem('apple', 5);
this.inventorySystem.addItem('cookie', 10);
this.inventoryUI.refreshDisplay();
```

**Tests**:
1. **Hotbar Display**
   - ✓ Multiple items visible in different slots
   - ✓ Quantities shown on stackable items
2. **Slot Selection**
   - ✓ Can select different slots with number keys
   - ✓ Orange border moves to selected slot
3. **Item Usage**
   - ✓ Using coffee restores 20 energy
   - ✓ Using apple restores 10 energy
   - ✓ Using cookie restores 5 energy
   - ✓ Quantities decrease after use
4. **Full Inventory View**
   - ✓ All items visible in grid
   - ✓ Tooltips show correct info for each item

**PASS**: Multiple items handled correctly ✓

---

### Test 7: UI Layout (No Overlaps)
**Goal**: Verify UIs don't overlap or conflict

**Test in each scene**:
1. Open inventory (I or ESC)
   - ✓ Inventory appears centered, doesn't block important UI
   - ✓ Clock visible (top left)
   - ✓ Energy meter visible (top right)
   - ✓ Mission tracker visible (right side)
2. Close inventory, open clothing menu (C)
   - ✓ Clothing menu appears centered
   - ✓ Doesn't overlap with other UI elements
3. Try to open both at once
   - ✓ Should NOT be possible (one or the other)
   - ✓ If inventory open, ESC closes it (doesn't open clothing)
   - ✓ If clothing open, C closes it

**PASS**: No UI conflicts ✓

---

### Test 8: Hotbar Always Visible
**Goal**: Verify hotbar persists across different states

1. Start in CottageScene
   - ✓ Hotbar visible at bottom
2. Open inventory (I or ESC)
   - ✓ Hotbar still visible
   - ✓ Full inventory grid appears above/overlaying scene
3. Close inventory
   - ✓ Hotbar still visible
4. Open clothing menu (C)
   - ✓ Hotbar still visible (behind semi-transparent overlay)
5. Close clothing menu
   - ✓ Hotbar still visible
6. Move to different scene
   - ✓ Hotbar visible in new scene

**PASS**: Hotbar always visible ✓

---

### Test 9: Edge Cases
**Goal**: Test unusual scenarios

1. **Empty Inventory**
   - Start new game (clear localStorage)
   - ✓ Hotbar shows empty slots
   - ✓ Opening inventory shows all empty slots
   - ✓ Pressing E with no item selected shows "No item selected"

2. **Full Inventory** (40 slots filled)
   - Add 40 different items
   - Try to add one more
   - ✓ Console shows "Inventory full!" warning
   - ✓ Item not added

3. **Stackable Items**
   - Add 3 coffee items
   - ✓ Should stack in one slot showing "3"
   - Use one coffee (E key)
   - ✓ Quantity decreases to "2"
   - Use another
   - ✓ Quantity decreases to "1"
   - Use last one
   - ✓ Slot becomes empty

4. **Non-Stackable Items**
   - Add 2 storybooks (non-stackable)
   - ✓ Should occupy 2 separate slots
   - ✓ Each shows quantity "1" or no quantity

**PASS**: Edge cases handled correctly ✓

---

### Test 10: Browser Refresh (Persistence)
**Goal**: Verify localStorage persistence

1. Start game, receive gluten-free bar from Robert
2. Open inventory to verify bar is there
3. **Refresh browser page** (F5 or Cmd+R)
4. Game restarts
5. Check hotbar
   - ✓ Gluten-free bar should still be there!
6. Open inventory
   - ✓ Bar in same position

**Note**: Inventory persists via localStorage key `montessori_inventory`

**PASS**: Inventory survives browser refresh ✓

---

## Console Testing Commands

Open browser console (F12) and try these:

```javascript
// Check current inventory state
this.scene.scenes[0].inventorySystem.debugPrintInventory();

// Add test items
this.scene.scenes[0].inventorySystem.addItem('coffee', 5);
this.scene.scenes[0].inventorySystem.addItem('apple', 10);
this.scene.scenes[0].inventorySystem.addItem('sandwich', 3);
this.scene.scenes[0].inventoryUI.refreshDisplay();

// Remove items
this.scene.scenes[0].inventorySystem.removeItem('coffee', 2);
this.scene.scenes[0].inventoryUI.refreshDisplay();

// Clear entire inventory
this.scene.scenes[0].inventorySystem.clearInventory();
this.scene.scenes[0].inventoryUI.refreshDisplay();

// Check if has item
this.scene.scenes[0].inventorySystem.hasItem('gluten_free_bar', 1);

// Count item
this.scene.scenes[0].inventorySystem.countItem('apple');

// Select specific hotbar slot
this.scene.scenes[0].inventorySystem.selectSlot(3); // Slot 4 (0-indexed)
this.scene.scenes[0].inventoryUI.refreshDisplay();

// Use selected item
this.scene.scenes[0].inventorySystem.useSelectedItem();
```

---

## Known Issues to Test

### Issue: Items Not Appearing
**Symptoms**: Added item doesn't show up
**Check**:
1. Was `inventoryUI.refreshDisplay()` called after adding item?
2. Is item definition in items.js?
3. Does item have valid iconKey texture?
4. Check console for errors

### Issue: Inventory Not Persisting
**Symptoms**: Items disappear on scene change
**Check**:
1. All scenes using same persistKey: `'montessori_inventory'`
2. All scenes call `new InventorySystem()` with same config
3. Check localStorage in browser dev tools (Application → Local Storage)

### Issue: ESC Key Not Working
**Symptoms**: ESC doesn't open/close inventory
**Check**:
1. InventoryUI initialized in scene?
2. No other UI stealing ESC key focus?
3. Check console for keyboard event errors

### Issue: Clothing Menu Missing
**Symptoms**: C key doesn't work
**Check**:
1. ClothingMenu imported in scene?
2. `this.clothingMenu` initialized in create()?
3. C key event listener set up in setupControls()?

---

## Success Criteria

All tests should pass with these results:

- ✓ Gluten-free bar appears immediately when received from Robert
- ✓ Bar visible in hotbar (always visible bottom UI)
- ✓ Bar visible in full inventory (press I or ESC)
- ✓ Bar persists across all scenes (Cottage → Village → Classroom)
- ✓ Bar can be consumed with E key
- ✓ Consuming bar restores 20 energy
- ✓ Inventory saves to localStorage (survives refresh)
- ✓ Clothing menu works with C key (bandana toggle)
- ✓ All keyboard controls work (1-9, 0, I, ESC, E, C)
- ✓ No UI overlaps or conflicts
- ✓ Hotbar always visible
- ✓ Tooltips show correct item information

---

## Regression Testing

After any future changes to inventory system, re-run:

1. Test 1 (Gluten-free bar appears)
2. Test 2 (Persistence across scenes)
3. Test 3 (Item consumption)
4. Test 10 (Browser refresh)

These 4 tests cover the core functionality.

---

## Performance Testing

Monitor console for any warnings:
- Item loading times
- Texture generation times
- localStorage write/read times
- UI refresh performance

**Expected**: No lag, smooth 60fps gameplay with inventory open.

---

## Accessibility Testing

- ✓ Tooltips appear on hover (helpful for new players)
- ✓ Keyboard shortcuts listed in UI
- ✓ Clear visual feedback (selected slot highlighting)
- ✓ Messages for all actions (item used, inventory full, etc.)
- ✓ Consistent UI across all scenes

---

## Final Checklist

Before marking issue as resolved:

- [ ] All 10 tests pass
- [ ] Gluten-free bar appears in all scenes
- [ ] No console errors
- [ ] No duplicate InventoryMenu code running
- [ ] ClothingMenu works independently
- [ ] Code cleanup (removed old InventoryMenu imports where needed)
- [ ] Documentation updated (this guide, architecture docs)

---

**Status**: Ready for testing! 🎮
