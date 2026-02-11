# Virginia Sprite - Final Design (LOCKED)

**Status:** ✅ PERFECT - DO NOT CHANGE WITHOUT USER APPROVAL
**Date:** 2026-02-08
**Version:** 1.0 FINAL

---

## ⚠️ IMPORTANT: This Design is APPROVED

This sprite design has been refined through multiple iterations and approved by the user as "perfect." Do not modify these specifications without explicit user permission.

---

## Visual Specifications

### Overall Appearance
- **Size:** 48x48 pixels base
- **Style:** Pixel art, Stardew Valley inspired
- **Build:** Slim, feminine
- **Vibe:** Casual, cute, approachable

### Hair
- **Color:** Light brown (#8b6f47)
- **Highlights:** Lighter brown (#a0826d)
- **Style:** Curly, parted in middle, shoulder-length
- **Key Feature:** **POOFY at bottom** (shoulder-length curls with volume)
- **Coverage:** Full coverage on top of head (no bald spots!)
- **Dimensions:**
  - Top coverage: 10x5 pixels
  - Side bulk: 5x10 pixels each side
  - **Bottom poof:** 5x5 pixels + 2x3 extra volume on each side
  - Curl highlights scattered throughout

### Face
- **Shape:** Narrow (8 pixels wide)
- **Skin Tone:** Light-medium (#f5cba7)
- **Ears:** Small, 1x3 pixels each side
- **Position:** Centered, proportional

### Eyes (CRITICAL - GREEN MUST BE VISIBLE!)
- **Whites:** 2x2 pixels each eye (#ffffff)
- **Pupils:** 2x1 pixels each eye (**GREEN #2e7d32**)
- **Position:** Upper part of whites, clearly visible
- **Key:** Pupils are 2 pixels wide to ensure green is readable

### Glasses (SUBTLE - DO NOT BLOCK EYES!)
- **Style:** Thin outline only (1 pixel wide)
- **Color:** Dark brown frames (#4a3428)
- **Left Frame:** 4x4 pixel outline
- **Right Frame:** 4x4 pixel outline
- **Bridge:** 2x1 pixels connecting frames
- **Lenses:** **NO TINT** - completely clear so eyes are visible
- **Key:** Frames outline the eyes but don't cover them

### Smile
- **Style:** Simple, friendly
- **Size:** 3 pixels wide
- **Position:** Below eyes, centered

### Bandana (TWO VERSIONS)

#### Version 1: Neck Bandana (Default)
- **Color:** White (#f0f0f0)
- **Pattern:** Light gray dots (#e0e0e0)
- **Position:** Around neck (below chin)
- **Size:** 10x3 pixels main wrap
- **Knot:** 3x4 pixels on right side
- **Style:** Like in real photo

#### Version 2: Head Bandana (Alternative)
- **Color:** White (#f0f0f0)
- **Pattern:** Light gray dots (#e0e0e0)
- **Position:** On head like veil/headscarf
- **Coverage:** Top of head + drapes on sides
- **Hair Visible:** Poofy bottom curls show beneath
- **Style:** Elegant, different look

**Note:** Both bandana styles could be a cosmetic option in-game!

### Outfit

#### Shirt
- **Color:** Coral/peach (#e8926f)
- **Shading:** Darker coral (#d17a58)
- **Style:** Casual short-sleeve
- **Length:** 7 pixels (ends at waist)
- **Details:** Shoulder shadows, center seam

#### Arms
- **Color:** Skin tone (#f5cba7)
- **Length:** 6 pixels visible below shirt
- **Width:** 2 pixels (slim)
- **Hands:** 2x2 pixels each

#### Shorts
- **Color:** Blue denim (#5a7fa6)
- **Shading:** Darker denim (#4a6b8a)
- **Style:** Jean shorts (casual summer)
- **Length:** 4 pixels
- **Details:** Center seam, bottom hem

#### Legs
- **Color:** Skin tone (#f5cba7)
- **Length:** 3 pixels visible below shorts
- **Width:** 2 pixels each leg

#### Shoes (Camo Crocs!)
- **Style:** Crocs with camo pattern
- **Base Color:** Camo green (#6b7d5a)
- **Pattern Colors:**
  - Camo brown (#8b7d6b)
  - Camo tan (#b5a89a)
- **Size:** 3x2 pixels each shoe
- **Details:** Multi-color camo spots on each croc

---

## Color Palette (Complete List)

```
Skin: #f5cba7
Hair: #8b6f47
Hair Highlight: #a0826d
Glass Frames: #4a3428
Eye Green: #2e7d32
Bandana White: #f0f0f0
Bandana Pattern: #e0e0e0
Shirt Coral: #e8926f
Shirt Dark: #d17a58
Shorts Blue: #5a7fa6
Shorts Dark: #4a6b8a
Camo Green: #6b7d5a
Camo Brown: #8b7d6b
Camo Tan: #b5a89a
```

---

## Design Evolution

### What We Tried:
1. ❌ Original green sweatshirt ("Green Bean") - Changed to coral
2. ❌ Brown pants - Changed to jean shorts
3. ❌ Generic dark shoes - Changed to camo crocs
4. ❌ Filled-in glasses frames - Changed to thin outlines
5. ❌ Lens tint on glasses - Removed completely
6. ❌ 1-pixel green pupils - Widened to 2 pixels
7. ❌ Flat hair at bottom - Made poofy with volume
8. ❌ Bald spots showing through hair - Fixed with full coverage
9. ❌ Wide face (10-12 pixels) - Narrowed to 8 pixels

### What Worked (FINAL):
✅ **Narrower face** (8 pixels) - More feminine, delicate
✅ **Poofy curly hair at shoulders** - Distinctive, realistic
✅ **2-pixel wide green pupils** - Clearly visible green eyes
✅ **Thin outline glasses** - Present but subtle, don't block eyes
✅ **NO lens tint** - Eyes fully visible
✅ **Coral shirt** - Complements her coloring beautifully
✅ **Jean shorts** - Casual, cute summer look
✅ **Camo crocs** - Fun, distinctive footwear
✅ **Both bandana styles** - Versatile, both look great

---

## Multi-View Sprites ⭐ NEW

**Virginia now has 4 directional views for proper movement:**

### Available Views:
1. **Front View (Neck Bandana)** - Default, facing camera
2. **Front View (Head Bandana)** - Alternative cosmetic option
3. **Side View (Right-Facing)** - For left/right movement
4. **Back View** - For walking away/north

**Purpose:** Allows Virginia to move naturally in all 4 directions with proper sprite orientation. Essential for top-down gameplay.

**See:** `multi-view-sprite-requirement.md` for full multi-view specifications.

---

## Technical Implementation

**File:** `src/utils/virginiaSprite.js`

**Functions:**
1. `generateVirginiaSprite(scene)` → Returns 'virginia_player'
   - Front view with neck bandana (default)

2. `generateVirginiaWithHeadBandana(scene)` → Returns 'virginia_player_headband'
   - Front view with head bandana (alternative cosmetic)

3. `generateVirginiaSide(scene)` → Returns 'virginia_player_side'
   - Side view (right-facing profile)

4. `generateVirginiaBack(scene)` → Returns 'virginia_player_back'
   - Back view (facing away)

**Drawing Order (Critical!):**
1. Hair FIRST (covers entire head)
2. Face/skin
3. Eyes (whites + green pupils)
4. Glasses (thin outlines AFTER eyes)
5. Smile
6. Bandana
7. Body/outfit
8. Limbs
9. Shoes

**Key Principle:** Hair drawn first prevents bald spots. Glasses drawn after eyes ensures visibility.

---

## User Feedback (Approval)

**User Quote:** "Virginia looks perfect now."

**What Makes It Perfect:**
- Green eyes are clearly visible
- Hair is poofy and curly at bottom (realistic)
- Face is narrow and attractive
- Glasses are present but subtle
- Outfit is cute and complements her features
- Both bandana options look great
- Overall: Recognizable as Virginia!

---

## Asset Viewer Display

**Location:** http://localhost:5173/asset-viewer.html

**Tab:** Virginia (Player)

**Shows:**
- Neck bandana version at 4x scale (192x192)
- Head bandana version at 4x scale (192x192)
- Character info with full feature list
- Both variations clearly visible

---

## Future Cosmetic Options

**Bandana Selection:**
- Player could choose: "Neck" or "Head" bandana style
- Simple toggle in wardrobe/settings
- Both versions already implemented!

**Other Potential Cosmetics:**
- Different shirt colors
- Different short styles
- Different croc colors/patterns
- Hair accessories (clips, ribbons)

---

## DO NOT CHANGE

This design has been approved. Any changes require:
1. User explicitly requests modification
2. Clear reason for change
3. User approval of new version

**Refer back to this document if design needs to be restored.**

---

**Last Updated:** 2026-02-08
**Status:** LOCKED ✅
**Approved By:** User (Robert)
**Version:** 1.0 FINAL
