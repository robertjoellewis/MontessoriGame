# Multi-View Sprite Requirement

**Date:** 2026-02-08
**Status:** ⚠️ REQUIRED FOR ALL CHARACTER SPRITES
**Applies To:** All player and NPC characters that move

---

## Requirement Overview

**All character sprites MUST have 4 directional views:**
1. **Front View** - Facing camera (south)
2. **Back View** - Facing away (north)
3. **Side View (Right)** - Facing right (east)
4. **Side View (Left)** - Can be mirrored from right OR drawn separately (west)

This allows characters to move naturally in all 4 cardinal directions with proper sprite orientation.

---

## Why This Is Required

### Movement Realism:
- Top-down games need 4-directional sprites for believable movement
- Players expect characters to turn and face the direction they're walking
- Without this, characters would slide sideways (looks terrible)

### Stardew Valley Standard:
- Our inspiration (Stardew Valley) uses 4-directional character sprites
- This is industry standard for top-down pixel art games
- Maintains visual consistency with the aesthetic we're targeting

### Gameplay Clarity:
- Players can instantly see which direction a character is facing
- NPCs look more alive when they turn to face different directions
- Important for dialogue interactions (face the person you're talking to)

---

## Implementation Details

### Sprite Views Required:

#### 1. Front View (Default)
**Direction:** Facing camera / south
**Shows:**
- Full face (eyes, nose, mouth visible)
- Front of hair
- Front of clothing
- Both hands/arms visible at sides
- Both feet visible

**Used When:**
- Walking down/south
- Idle facing player
- Default spawn orientation

#### 2. Back View
**Direction:** Facing away / north
**Shows:**
- Back of head (hair visible)
- Back of clothing
- Both arms visible at sides (back view)
- Both feet visible

**Used When:**
- Walking up/north
- Walking away from player
- Facing away in scenes

**Key Details:**
- NO FACE VISIBLE
- Hair is primary identifier
- Clothing details from behind
- Bandana/accessories visible from back

#### 3. Side View (Right-Facing)
**Direction:** Facing right / east
**Shows:**
- Profile of face (one eye, nose, mouth from side)
- Side of hair
- One arm visible (right arm)
- One leg visible (right leg)
- Profile of clothing

**Used When:**
- Walking right/east
- Facing right in dialogue

**Key Details:**
- Profile perspective
- One eye visible (right eye)
- Glasses visible from side
- Hair shows profile (curls, volume)
- Depth/thickness visible

#### 4. Side View (Left-Facing)
**Direction:** Facing left / west
**Shows:**
- Profile of face (left side)
- Side of hair (left profile)
- One arm visible (left arm)
- One leg visible (left leg)

**Used When:**
- Walking left/west
- Facing left in dialogue

**Implementation Options:**
- **Option A:** Mirror the right-facing sprite (faster, works for symmetric characters)
- **Option B:** Draw separately (better for asymmetric details like bandana knots)

---

## Character Sprite Checklist

For each character, create functions for:

```javascript
// Example for Virginia:
export function generate[Character]Front(scene)  // Required
export function generate[Character]Back(scene)   // Required
export function generate[Character]Side(scene)   // Required (right-facing)
// Left side can be mirrored or separate function
```

---

## Characters Requiring Multi-View Sprites

### ✅ Completed:
- **Virginia (Player)**
  - ✅ Front view (neck bandana)
  - ✅ Front view (head bandana variant)
  - ✅ Side view (right-facing)
  - ✅ Back view

### 🔄 To Do:
- **Zach (Lead Guide)**
  - ⏳ Front view
  - ⏳ Back view
  - ⏳ Side view

- **Kiki (Assistant)**
  - ⏳ Front view
  - ⏳ Back view
  - ⏳ Side view

- **Robert (Boyfriend)** - May not need (sits at desk)
  - ❓ Front view (already have seated version)
  - ❓ Optional walking views if he moves

- **12 Toddlers**
  - ✅ Front views (already have)
  - ⏳ Back views (needed if toddlers walk around)
  - ⏳ Side views (needed if toddlers walk around)

- **Parents (Generic NPCs)**
  - ⏳ Front view
  - ⏳ Back view
  - ⏳ Side view

---

## Technical Implementation

### Sprite Key Naming Convention:
```javascript
'[character]_front'     // e.g., 'virginia_front'
'[character]_back'      // e.g., 'virginia_back'
'[character]_side'      // e.g., 'virginia_side' (right-facing)
'[character]_side_left' // e.g., 'virginia_side_left' (if not mirrored)
```

### In Phaser Game Code:
```javascript
// In scene create():
const frontKey = generateVirginiaFront(this);
const backKey = generateVirginiaBack(this);
const sideKey = generateVirginiaSide(this);

// Create sprite
this.player = this.physics.add.sprite(x, y, frontKey);

// Change texture based on direction:
if (movingUp) {
    this.player.setTexture(backKey);
} else if (movingDown) {
    this.player.setTexture(frontKey);
} else if (movingRight) {
    this.player.setTexture(sideKey);
    this.player.setFlipX(false);
} else if (movingLeft) {
    this.player.setTexture(sideKey);
    this.player.setFlipX(true); // Mirror
}
```

### Asset Viewer Display:
- Show all 4 views for each character
- Display at 4x scale (192x192) for visibility
- Label each view clearly
- Organize in character showcase sections

---

## Design Considerations

### Consistency Across Views:
- **Hair** must look consistent in all views
  - Front: Full curls visible
  - Side: Profile of curls
  - Back: Full back of hair
- **Clothing** must match in all views
  - Same colors
  - Same style
  - Details visible from each angle
- **Accessories** (glasses, bandana) must be recognizable in all views

### Scale & Proportions:
- All 4 views must use same 48x48 base size
- Character should appear same height in all views
- Width may vary slightly (side view narrower than front)
- Maintain recognizability across all angles

### Detail Level:
- Front view: Most detail (face features visible)
- Side view: Medium detail (profile visible)
- Back view: Less detail (no face, but hair/clothing distinct)

### Personality:
- Each view should still convey the character's personality
- Hair style is key identifier from behind
- Clothing style helps recognition
- Posture/build consistent across views

---

## Virginia Example (Reference)

### Front View Features:
- Curly brown hair with poof at shoulders
- Green eyes through subtle glasses
- Smiling
- White bandana around neck
- Coral shirt, jean shorts, camo crocs
- Slim build

### Side View Features:
- Curly hair profile (poofy at bottom)
- One green eye visible in profile
- Glasses visible from side
- Bandana visible at neck
- Coral shirt in profile
- One leg visible

### Back View Features:
- Full back of curly hair (poofy shoulders)
- Bandana knot visible from behind
- Back of coral shirt
- Back of jean shorts
- Both legs visible from behind
- No face (back of head only)

**All views clearly recognizable as same character!**

---

## When NOT to Create Multi-View Sprites

Some characters may not need all views:

### Static NPCs:
- **Robert** (sits at desk) - May only need seated front view
- **Shopkeepers** (behind counters) - May only need front view
- **Background characters** (non-interactive) - May only need front view

### Criteria for Skipping:
- Character never moves from fixed position
- Character only appears in cutscenes (specific angle)
- Character is far background detail (too small to matter)

**Default:** If unsure, create all 4 views. Better to have them than need them later.

---

## Development Workflow

### For Each New Character:

1. **Design front view first** (most detailed)
   - Get approval on design
   - Lock colors, proportions, features

2. **Create side view** (profile)
   - Maintain same colors
   - Show character in profile
   - Ensure recognizable

3. **Create back view** (from behind)
   - Show distinctive features (hair, clothing)
   - Ensure recognizable from behind
   - Match front/side proportions

4. **Test left-facing** (mirrored or separate)
   - Try mirroring right-facing sprite
   - If asymmetric details look wrong, draw separately

5. **Add to asset viewer**
   - Display all 4 views together
   - Verify consistency
   - Get user approval

6. **Implement in game**
   - Add texture switching logic
   - Test movement in all directions
   - Ensure smooth transitions

---

## Quality Checklist

Before marking character sprites as "complete":

- [ ] All 4 views created (front, back, side right, side left/mirrored)
- [ ] Same 48x48 base size for all views
- [ ] Colors consistent across all views
- [ ] Hair recognizable from all angles
- [ ] Clothing consistent in all views
- [ ] Character clearly identifiable from any angle
- [ ] All views displayed in asset viewer
- [ ] User has approved all views
- [ ] Sprites generated and tested in game
- [ ] Movement looks natural in all directions

---

## Files Updated

### Virginia (Example Implementation):
- **Code:** `src/utils/virginiaSprite.js`
  - `generateVirginiaSprite()` - Front (neck bandana)
  - `generateVirginiaWithHeadBandana()` - Front (head bandana)
  - `generateVirginiaSide()` - Side (right-facing)
  - `generateVirginiaBack()` - Back view

- **Asset Viewer:** `asset-viewer.html`
  - Updated to show all 4 Virginia views
  - Imports all 4 generation functions
  - Displays in character showcase

- **Documentation:** `virginia-sprite-final-design.md`
  - Should be updated to reflect multi-view requirement

---

## Future Enhancements

### Animation:
- Walk animations (2-3 frame cycles per direction)
- Idle animations (breathing, blinking)
- Action animations (interacting with objects)

### For Now:
- Static sprites in 4 directions is sufficient
- Can add animation later if time permits

---

## Summary

**Every character that moves MUST have:**
1. Front view
2. Back view
3. Side view (right)
4. Left view (can mirror or separate)

**Exceptions:** Only for completely static NPCs

**Virginia Example:** ✅ Complete with all 4 views

**Next Characters:** Zach, Kiki, toddlers (if they walk)

---

**Last Updated:** 2026-02-08
**Status:** DOCUMENTED & REQUIRED
**First Implementation:** Virginia (completed)
