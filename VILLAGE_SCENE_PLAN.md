# Village Scene - Implementation Plan

## Overview
Virginia walks from her cottage down a single street to reach the Montessori school by 7:45 AM. The street has 6 other buildings (exteriors only) to create a living village atmosphere.

**Scene File:** `src/scenes/VillageScene.js` (to be created)

---

## Scene Layout & Dimensions

### Viewport System
- **Canvas Size:** 1280x720 pixels (full screen)
- **World Size:** Much larger than viewport (scrolling camera)
- **Camera:** Follows Virginia as she walks
- **Style:** Stardew Valley aesthetic (chunky pixel art, warm colors)

### Street Layout (Horizontal)
```
[Cottage] → [Path] → [Bar] → [Path] → [Stationary] → [Path] → [General Store] → [Path] → [Mystery House] → [Path] → [Rich House] → [Path] → [SCHOOL]
```

**Total Street Length:** ~2400 pixels (400px per building/segment)
**Street Width:** 300px (wide enough for Virginia + visual interest)

---

## Building List (7 Total)

### 1. Virginia's Cottage (Left Start)
- **Position:** X: 0-200
- **Type:** Procedural sprite
- **Features:**
  - Small cozy house
  - Brown wood exterior
  - Red/orange roof
  - Front door (center-bottom)
  - 1-2 windows
  - Chimney on side
- **Interaction:** Virginia exits from here (starts at door)
- **Size:** ~200x180 pixels

### 2. Honky Tonk Bar
- **Position:** X: 400-600
- **Type:** Procedural sprite
- **Features:**
  - Wooden saloon style
  - Swinging door design
  - Sign: "HONKY TONK" or "BAR"
  - Large front windows
  - Maybe a porch/awning
  - Western aesthetic
- **Interaction:** None (exterior only)
- **Size:** ~200x180 pixels

### 3. Stationary Store
- **Position:** X: 800-1000
- **Type:** Procedural sprite
- **Features:**
  - Clean shop front
  - Large window display
  - Sign: "STATIONARY" or "PAPER & PENS"
  - Maybe striped awning
  - Neat, organized look
- **Interaction:** None (exterior only)
- **Size:** ~200x180 pixels

### 4. General Store
- **Position:** X: 1200-1400
- **Type:** Procedural sprite
- **Features:**
  - Classic country store
  - Sign: "GENERAL STORE"
  - Larger than other shops
  - Multiple windows
  - Maybe barrels or goods outside
  - Friendly, welcoming
- **Interaction:** None (exterior only)
- **Size:** ~220x180 pixels (slightly larger)

### 5. Mystery Residential House
- **Position:** X: 1600-1800
- **Type:** Procedural sprite
- **Features:**
  - Standard house (not cottage)
  - Unique color (maybe blue or green)
  - Closed curtains
  - Normal door
  - Mysterious vibe (but not creepy)
- **Interaction:** None (exterior only)
- **Size:** ~200x180 pixels

### 6. Large Rich Person House
- **Position:** X: 2000-2240
- **Type:** Procedural sprite
- **Features:**
  - MUCH LARGER than others
  - 2 stories tall
  - Fancy architecture
  - Multiple windows
  - Ornate details
  - Maybe columns or fancy door
  - Expensive-looking
- **Interaction:** None (exterior only)
- **Size:** ~240x220 pixels (tallest building)

### 7. Montessori School (Right End)
- **Position:** X: 2400-2640
- **Type:** Procedural sprite
- **Features:**
  - School building design
  - Sign: "MONTESSORI SCHOOL"
  - Large double doors (center)
  - Multiple windows
  - Bell tower or flagpole
  - Welcoming entrance
  - Bright, educational look
- **Interaction:** **AUTOMATIC ENTRY** - Virginia walks through door
- **Size:** ~240x200 pixels (large, important)

---

## Street & Path Design

### Ground/Path
- **Type:** Procedural tiled texture
- **Style:** Dirt path or cobblestone
- **Colors:** Browns, tans (Stardew palette)
- **Width:** Full screen width
- **Tiling:** Seamless 128x128 tiles

### Background (Sky)
- **Type:** Simple gradient or solid color
- **Color:** Light blue (#87CEEB) or warm yellow/orange (morning)
- **Alternative:** Procedurally generated clouds (optional)

### Foreground Elements (Optional)
- Trees between buildings (simple chunky style)
- Lamp posts
- Benches
- Flowers/bushes
- Fence posts

---

## Player Spawn & Movement

### Virginia Spawn
- **Position:** In front of cottage door
- **Direction:** Facing right (toward school)
- **Scale:** Same as cottage (3x = 144x144 pixels)
- **Initial State:** Standing, controls enabled immediately

### Movement
- **Horizontal Only:** Left/Right arrow keys + A/D
- **Speed:** 160 pixels/second (same as cottage)
- **Camera:** Smooth follow (lerp-based tracking)
- **Boundaries:** Cannot walk off left edge, auto-enter school on right

---

## Automatic Door System

### Cottage Door (Exit from CottageScene)
**Change from current:**
- Remove "Press SPACE to leave" prompt
- Auto-transition when Virginia walks into door zone
- Trigger zone: 80x100 pixels at door position
- Fade out → Load VillageScene

### School Door (Enter SchoolScene)
**New implementation:**
- Auto-transition when Virginia enters door zone
- Trigger zone: 100x120 pixels at school doors
- Check time: Must be before 7:45 AM
- Success: Fade out → Load SchoolScene
- Failure: Show "Too late!" message, restart day

---

## Time System Integration

### Time Tracking
- **Start Time:** 7:00 AM (from cottage)
- **Walk Duration:** ~30 seconds (if walking continuously)
- **Deadline:** 7:45 AM (45 minutes in-game)
- **Time Speed:** 1 minute in-game = 1 second real-time

### Time Display
- Clock UI carries over from cottage scene
- Updates during walk
- Changes color when close to deadline (e.g., turns red at 7:40 AM)

### Consequences
- **On Time:** Enter school, start work day
- **Late:** Cannot enter, day fails, must restart
- **Too Early:** Can wait outside school (future feature)

---

## Camera System

### Smooth Follow Camera
```javascript
// Camera bounds
this.cameras.main.setBounds(0, 0, 2640, 720);

// Follow Virginia
this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

// Keep camera centered vertically
this.cameras.main.setFollowOffset(0, 0);
```

### Camera Constraints
- **Left Edge:** X=0 (cottage)
- **Right Edge:** X=2640 (school)
- **Vertical:** Locked at Y=360 (centered)

---

## Implementation Phases

### Phase 2A: Basic Scene Structure
1. Create `VillageScene.js`
2. Set up camera bounds (2640x720)
3. Add sky background (solid color)
4. Add ground/path (simple brown rectangle)
5. Test scene transition from cottage

### Phase 2B: Placeholder Buildings
1. Add 7 colored rectangles for buildings
2. Position at correct X coordinates
3. Label each with text (debug)
4. Test camera scrolling

### Phase 2C: Automatic Doors
1. Update cottage door (remove SPACE requirement)
2. Add auto-trigger on collision
3. Test cottage → village transition
4. Add school door auto-entry
5. Test village → school transition

### Phase 3: Building Sprites (One at a time)
1. Generate cottage exterior (RULES.md: update asset viewer)
2. User approval
3. Generate bar facade
4. User approval
5. Generate stationary store
6. User approval
7. Generate general store
8. User approval
9. Generate mystery house
10. User approval
11. Generate rich house
12. User approval
13. Generate school building
14. User approval

### Phase 4: Polish & Time System
1. Implement time tracking during walk
2. Add time-based school entry check
3. Add failure state (too late)
4. Add decorative elements (trees, lamps, etc.)
5. Test full flow: cottage → walk → school

---

## Technical Specifications

### Scene Class Structure
```javascript
export default class VillageScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VillageScene' });
    }

    init(data) {
        this.gameTime = data.gameTime || { hour: 7, minute: 0 };
    }

    create() {
        // Background
        // Ground/path
        // Buildings
        // Virginia
        // Camera setup
        // Clock UI
        // Door triggers
    }

    update(time, delta) {
        // Player movement
        // Time updates
        // Door checks
    }

    checkSchoolEntry() {
        // Time validation
        // Auto-transition logic
    }
}
```

---

## Collision & Physics

### No Building Collisions
- Buildings are visual only (Virginia walks in front of them)
- Depth sorting: Buildings at depth 1, Virginia at depth 10

### Path Boundaries
- Top boundary: Y=100 (prevent walking up)
- Bottom boundary: Y=600 (prevent walking down)
- Left boundary: X=0 (cottage)
- Right boundary: X=2640 (school)

---

## Asset Generation Guidelines

### Building Sprite Requirements (Stardew Style)
- Thick 2px black outlines
- 3-5 colors maximum per building
- Chunky, blocky architecture
- Simple details (windows, doors, signs)
- Warm color palette (browns, reds, oranges, yellows)
- No gradients or complex shading
- Buildings face forward (straight-on view)
- Size: ~200x180 pixels average

### Path/Ground Requirements
- Seamless 128x128 tiles
- Dirt or cobblestone pattern
- Browns and tans
- Simple texture (not detailed)

---

## Success Criteria

### Scene Must:
- [x] Load from cottage scene with fade transition
- [x] Display all 7 buildings in correct positions
- [x] Allow Virginia to walk left/right smoothly
- [x] Camera follows Virginia without jitter
- [x] Clock continues from cottage time
- [x] Auto-enter school when walking into door
- [x] Check time before allowing school entry
- [x] Match Stardew Valley aesthetic perfectly

---

## Future Enhancements (Post-MVP)
- NPCs walking around village
- Shop interiors (after school day)
- Day/night cycle visuals
- Weather effects
- Seasonal decorations
- More interactions with buildings
- Village events

---

## Estimated Effort

### Phase 2 (Basic Scene): ~2-3 hours
- Scene setup, camera, transitions

### Phase 3 (Building Sprites): ~4-6 hours
- 7 buildings × 30-45 minutes each (with review)

### Phase 4 (Polish): ~1-2 hours
- Time system, failure states, decorations

**Total:** ~7-11 hours of development time

---

## Dependencies

### New Files to Create
- `src/scenes/VillageScene.js` - Main scene
- `src/utils/villageBuildings.js` - Building generation functions
- `src/utils/villagePath.js` - Path/ground generation

### Existing Files to Modify
- `src/scenes/CottageScene.js` - Update door interaction
- `src/ui/Clock.js` - May need time color changes
- `src/main.js` - Add VillageScene to scene list

---

## User Decisions (CONFIRMED)

1. **Time pressure:** ✅ Virginia can stop, but time keeps ticking (risk of running out)
2. **Camera style:** ✅ Smooth follow (lerp-based with slight delay)
3. **Path style:** ✅ Cobblestone street
4. **Decorative elements:** ✅ Trees, shrubs, and landscaping between buildings
5. **Building signs:** ✅ Fun business names as text signs

## Building Names (FINAL)
1. **Virginia's Cottage** (starting point)
2. **"The Rusty Spur"** (Honky Tonk bar)
3. **"The Paper Trail"** (Stationary store)
4. **"Maple & Co. General"** (General store)
5. **"???"** (Mystery house - no sign!)
6. **"Harrington Manor"** (Rich person's house)
7. **"Little Sprouts Montessori"** (School)

---

Last Updated: 2026-02-08
Status: ✅ PHASE 2A COMPLETE - Testing ready
