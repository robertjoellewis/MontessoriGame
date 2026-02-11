# UX Design Document 01: Classroom Scene Design
**Author:** Sally (UX Designer)
**Date:** February 10, 2026
**Status:** Implementation-Ready
**Project:** MontessoriGame - Toddler Classroom Scene

---

## Overview

This document defines the visual layout, spatial design, and camera system for the **Toddler Classroom Scene** - the core gameplay environment where Virginia teaches 12 toddlers aged 18-36 months.

**Design Goals:**
- Cozy, inviting Montessori environment
- All 12 children visible and distinguishable
- Clear spatial organization (Montessori areas)
- Room for Virginia to move and interact
- Authentic prepared environment feel

---

## Scene Structure

### Multi-Room System

The toddler classroom consists of **three connected environments:**

1. **Main Classroom** (primary play area)
2. **Outdoor Playground** (pre-nap outdoor time)
3. **Nap Room** (integrated into main classroom OR separate)

**Design Rule:** "One guide per room" - Virginia can only be in one space at a time. When she transitions (e.g., classroom → playground), all children transition with her.

---

## Main Classroom Layout

### Room Dimensions

**Viewport Size:** 900x650 pixels (medium)
- Larger than cottage (600x500) for more space
- Smaller than full screen for cozy intimacy
- Fits 12 toddlers + Virginia comfortably

**Room Geometry:**
- **Width:** 900px (wall to wall)
- **Height:** 650px (wall to wall)
- **Centered in canvas** with black borders and Stardew-style beveled frame
- **Fixed camera** (no scrolling - see entire room at once)

**Visual Style:**
- Warm wooden floors (like cottage, but classroom-appropriate)
- Soft neutral walls with windows
- Natural light aesthetic (morning sunlight)
- Montessori-typical earth tones (creams, tans, soft greens)

### Spatial Zones

The classroom is divided into **functional Montessori areas:**

```
┌─────────────────────────────────────────────────────────┐
│  [Window]    [Window]       [Shelves: Sensorial]        │ NORTH WALL
│                                                          │
│  [Plant]   [Rug]  [Rug]                    [Plant]      │
│                                                          │
│  [Shelves:      [Work        [Work                      │
│   Practical      Table]       Rug]                       │ WEST
│   Life]                                                  │ WALL
│              [Virginia walking space]                    │
│                                                          │
│  [Low         [Rug]    [Child]   [Child]     [Shelves:  │
│   Shelf]                                      Language]  │ EAST
│                                                          │ WALL
│  [Crafting    [Nap Mats Area - back corner]             │
│   Table]                                                 │
│                                                          │
│              [DOOR - Entry/Exit]                         │ SOUTH WALL
└─────────────────────────────────────────────────────────┘
```

**Key Zones:**

1. **Practical Life Area (West Wall)**
   - Shelves with pouring sets, spooning activities, dressing frames
   - Low child-height shelves (sprite-appropriate)
   - 2-3 work rugs in front for children to work

2. **Sensorial Area (North Wall - Back)**
   - Pink Tower, Knobbed Cylinders, Color Tablets
   - Higher-tier materials displayed beautifully
   - Work rug in front

3. **Language Area (East Wall)**
   - Vocabulary baskets, picture cards, books
   - Cozy corner feel (maybe small rug, cushions)

4. **Movement/Open Space (Center)**
   - Large open area for children to walk, carry materials
   - Work rugs spread throughout (6-8 rugs total)
   - Space for Virginia to navigate freely

5. **Nap Area (Back Corner - Southeast)**
   - 12 small nap mats arranged in rows
   - Only active during nap time (12:15-2:30 PM)
   - Otherwise invisible/tucked away

6. **Crafting Table (Southwest Corner)**
   - Virginia's workspace during nap time
   - Small table with materials storage beneath
   - Only interactable during nap time

7. **Door (South Wall - Center)**
   - Entry/exit for arriving children and pickup
   - Transition point to playground

### Visual Landmarks

**Windows (North Wall):**
- 2-3 large windows showing outdoor scenery
- Natural light effect (soft glow)
- Changes based on time of day (brighter morning, softer afternoon)

**Plants:**
- Potted plants in corners (decorative, Montessori aesthetic)
- Living environment feel

**Walls:**
- Soft cream or light tan color
- Maybe subtle texture (like cottage wallpaper)
- Clean, calm, uncluttered

**Floor:**
- Warm wooden planks (procedurally generated, similar to cottage)
- Light oak or birch color
- Clean and polished

---

## Outdoor Playground Layout

### Playground Dimensions

**Viewport Size:** 900x650 pixels (same as classroom for consistency)

**Environment Type:** Outdoor enclosed play yard

**Visual Style:**
- Grass ground (green, textured)
- Blue sky background
- Wooden fence enclosure
- Trees visible beyond fence
- Natural, open-air feel

### Playground Equipment & Zones

```
┌─────────────────────────────────────────────────────────┐
│    [Sky - Blue gradient with clouds]                    │
│  [Fence - Wooden slats]  [Trees beyond]  [Fence]        │
│                                                          │
│     [Climber]        [Open Grass]         [Sandbox]     │
│                                                          │
│                  [Children running/playing]             │
│                                                          │
│     [Slide]       [Virginia standing]     [Swings]      │
│                                                          │
│              [Garden Bed with flowers]                   │
│                                                          │
│                  [DOOR - Back to classroom]              │
└─────────────────────────────────────────────────────────┘
```

**Equipment (Simple Sprites):**

1. **Small Climber** (Northwest)
   - 3-step climbing structure
   - Toddler-safe height
   - Children can "climb" (sprite animation)

2. **Slide** (Southwest)
   - Small toddler slide
   - Children can "slide down" (animation)

3. **Sandbox** (Northeast)
   - Wooden frame with sand
   - Children can "dig" or sit

4. **Swings** (Southeast)
   - 2 toddler bucket swings
   - Children can "swing" (gentle animation)

5. **Garden Bed** (South - by door)
   - Small flower/vegetable garden
   - Observation opportunity (nature connection)

**Open Grass Area (Center):**
- Large space for running
- Children move more freely here than classroom
- Faster movement speed, more chaotic energy

**Fence:**
- Wooden slat fence around perimeter
- Keeps children contained visually
- Trees/nature visible beyond (depth)

### Playground Gameplay

**Virginia's Role:**
- Stands/walks in supervision mode
- Watches children (no direct interaction unless emergency)
- Click on children to observe moods/energy
- Hands-off, observational

**Children's Behavior:**
- More energetic, faster movement
- Running, climbing, exploring
- Some clingy kids may stay near Virginia
- Visual indicators show who's playing vs. struggling

**Duration:**
- 11:30 AM - 12:15 PM (45 minutes game time)
- Automatic transition to nap time

---

## Camera System

### Main Classroom Camera

**Type:** Fixed (no scrolling)

**View:** Entire room visible at all times

**Rationale:**
- You need to see all 12 children simultaneously
- Observational gameplay requires full room view
- Reduces "where is that child?" frustration
- Mimics real teacher experience (scanning whole room)

**Implementation:**
- Camera bounds = room bounds (900x650)
- No camera follow (Virginia moves, camera stays fixed)
- Room centered in 1280x720 canvas with black borders

### Playground Camera

**Type:** Fixed (same as classroom)

**View:** Entire playground visible

**Consistency:** Same viewport size (900x650) for visual consistency

---

## Room Transitions

### Classroom ↔ Playground

**Trigger:** Time-based automatic transition

**Flow:**
1. 11:30 AM: "Time for outdoor play!" notification appears
2. Virginia walks to door (automatic or player-controlled?)
3. Fade out (500ms black transition)
4. Load playground scene
5. Fade in - Virginia and all 12 children now outside
6. 12:15 PM: "Nap time!" notification
7. Reverse transition back to classroom (now in nap mode)

**Alternative (MVP Simpler):**
- Playground is a separate scene entirely
- No walking transition, just scene change on timer
- Children "teleport" with Virginia (acceptable for cozy game)

---

## Visual Depth & Layers

### Z-Index / Depth System

**Background (-100 to -50):**
- Sky/walls
- Floor tiles
- Windows (background elements)

**Room Elements (-49 to 0):**
- Shelves
- Furniture (tables, plants)
- Nap mats (when active)

**Interactive Objects (1-9):**
- Work rugs
- Materials on shelves
- Crafting table
- Door interaction zones

**Characters (10-19):**
- Children sprites (depth 10)
- Virginia sprite (depth 15 - slightly above children so she's always visible)

**UI/Overlays (100+):**
- Child status icons (above heads)
- Interaction prompts
- Tooltips

**Rationale:**
- Virginia always visible above children (prevents "lost in crowd")
- Children visible above furniture
- Clear visual hierarchy

---

## Collision & Movement

### Virginia's Movement

**Speed:** 160 pixels/second (same as cottage)

**Collision:**
- Collides with walls (room boundaries)
- Collides with furniture (shelves, tables)
- Does NOT collide with children (can walk through them)
  - **Exception:** Clingy children create temporary slow zones

**Clingy Mechanic:**
- When child is clingy, Virginia's speed reduced by 50% when near them
- Visual indicator (child sprite follows Virginia, small hearts icon?)
- Lasts 3-5 seconds, then child lets go
- Can happen randomly or based on child's mood/temperament

### Children's Movement

**States:**
- **Seated/Working:** On rug, not moving (sprite idle animation)
- **Walking:** Moving to shelf or rug (walk animation, 100 px/s)
- **Wandering:** Slow random walk (80 px/s)
- **Following Virginia:** Clingy state (matches Virginia's position)

**Collision:**
- Children do NOT collide with each other (pass through)
- Children do NOT collide with Virginia (pass through)
- Children stay within room bounds

**Pathfinding:**
- Simple A* or direct line movement (not complex)
- Children walk to target (shelf, rug, Virginia)
- Acceptable if they clip through objects (toddlers are small, low fidelity OK)

---

## Material Placement & Shelves

### Shelf System

**Shelf Types:**
1. **Low Shelf Units** (child-height)
   - 3-5 materials displayed per shelf
   - Grid layout (items evenly spaced)
   - Organized by Montessori area

2. **Material Sprites on Shelves:**
   - Each material = individual sprite
   - Clicking shelf opens material selection menu (for Virginia to grab)
   - Children auto-select materials based on needs/sensitive periods

**Material Display:**
- Materials have visual quality (Tier 1-4 affects sprite appearance)
- Empty shelf slots visible (shows room for more materials)
- Legacy materials have subtle glow/sparkle effect

### Placing Crafted Materials

**Flow:**
1. Virginia crafts material during nap time
2. Material goes to "Completed" inventory
3. During free time, Virginia can:
   - Walk to shelf
   - Open material placement menu (right-click shelf?)
   - Drag material from inventory to shelf slot
   - Material now available for children

**Shelf Organization:**
- Materials auto-sort by area (Practical Life, Sensorial, Language)
- OR player manually organizes (drag-and-drop)
- "Shelf Appeal" rating (visual indicator of how inviting shelves look)

---

## Nap Area Design

### Nap Mats Layout

**Arrangement:**
- 12 small nap mats (48x24 pixel sprites each?)
- Arranged in 3 rows of 4 (or 2 rows of 6, flexible)
- Back corner of classroom (southeast)
- Only visible during nap time (12:15-2:30 PM)

**Mat Sprites:**
- Each child has assigned mat (color-coded or labeled?)
- When child is asleep: sprite lies down on mat (sleeping animation)
- When child is awake: sprite sits up (alert animation)

**Minigame Visual Design:**
- Awake children have icon above head (! or small alert symbol)
- Asleep children have Z Z Z animation (peaceful)
- Virginia walks to awake child, clicks to soothe (loading bar fills)
- Goal: Get all 12 children asleep

---

## Crafting Table Design

### Location & Appearance

**Position:** Southwest corner (near nap area for proximity)

**Sprite:**
- Small wooden table with drawer/shelf underneath
- Crafting supplies visible (jars, tools, materials)
- Warm, inviting workspace

**Interaction:**
- Only active during nap time (after all children asleep)
- Click table → opens crafting menu (recipe book interface)
- Virginia stands at table while crafting (idle animation)

---

## Accessibility & Readability

### Child Differentiation

**Challenge:** 12 toddlers on screen - how do you tell them apart?

**Solutions:**

1. **Color-Coded Clothing:**
   - Each child has unique shirt/outfit color
   - Consistent across all scenes
   - Easy visual identification

2. **Name Tags (Optional Toggle):**
   - Small name label above head (toggle on/off in settings)
   - Helpful for learning children's names

3. **Hover Tooltips:**
   - Mouse over child → shows name, mood, current activity
   - Doesn't clutter screen when not needed

4. **Size Variation:**
   - Younger toddlers (18-24 months) slightly smaller sprites
   - Older toddlers (30-36 months) slightly taller
   - Subtle but helps convey age range

### UI Minimalism

**On-Screen During Classroom Play:**
- Clock (top-right corner)
- Energy meter (top-left corner) - OR hidden during school hours?
- Mission tracker (optional - may hide during calm classroom time)
- Child status icons (only when relevant, above heads)

**Hidden/Minimized:**
- Inventory menu (press ESC to open)
- Crafting menu (only during nap time)
- Observation journal (separate keybind, like J for Journal?)

---

## Visual Style & Aesthetic

### Montessori Prepared Environment

**Key Principles:**
- **Order:** Everything has a place, visually organized
- **Beauty:** Warm colors, natural materials, plants
- **Simplicity:** Uncluttered, calm, not overstimulating
- **Child-Centered:** Low shelves, child-sized furniture, accessible

**Color Palette:**
- Warm wood tones (oak, birch)
- Soft neutrals (cream, tan, sage green)
- Pops of color from materials (Pink Tower, Color Tablets)
- Natural light (warm morning glow)

**Stardew Influence:**
- Chunky pixel art (not ultra-detailed)
- Cozy, handmade feel
- Readable at small scale
- Charming imperfection

---

## Technical Specifications

### Scene Class Structure

```javascript
export default class ClassroomScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ClassroomScene' });
    }

    init(data) {
        this.gameTime = data.gameTime; // From village scene
    }

    create() {
        // 1. Setup viewport (900x650 centered)
        // 2. Create room (floor, walls, windows)
        // 3. Create shelves and furniture
        // 4. Spawn 12 children
        // 5. Create Virginia sprite
        // 6. Setup camera (fixed)
        // 7. Setup UI (clock, etc.)
        // 8. Setup controls
        // 9. Start morning routine
    }

    update(time, delta) {
        // 1. Update clock
        // 2. Update children AI (movement, state)
        // 3. Update Virginia movement
        // 4. Check for time-based events (nap time, pickup)
        // 5. Handle interactions
    }
}
```

### Room Container System

**Like CottageScene:**
- Use `this.add.container(roomX, roomY)` for all room elements
- Keeps coordinates relative to room (not canvas)
- Easy to position and adjust

### Physics World Bounds

```javascript
this.physics.world.setBounds(roomX, roomY, roomWidth, roomHeight);
```

---

## Asset Requirements (For Future Planning)

### Sprites Needed

**Room Elements:**
- Wooden floor tiles (128x128, tileable)
- Wall texture (128x128, tileable)
- Window (sprite, 128x96)
- Door (sprite, 64x96)
- Potted plant (sprite, 48x64)

**Furniture:**
- Low shelf unit (sprite, 160x64)
- Work rug (sprite, 96x64, various colors)
- Crafting table (sprite, 64x48)
- Nap mat (sprite, 48x24, various colors)
- Work table (sprite, 64x48)

**Playground:**
- Grass tile (128x128, tileable)
- Fence section (sprite, 64x128)
- Climber (sprite, 96x96)
- Slide (sprite, 64x96)
- Sandbox (sprite, 96x96)
- Swing set (sprite, 96x128)

**Characters:**
- Virginia sprite (48x48 idle, walking animations)
- 12 toddler sprites (32x32 each, idle/walking/sitting/sleeping animations)

**Materials (on shelves):**
- Pouring set, Pink Tower, Color Tablets, etc. (16x16 or 24x24 small sprites)

---

## Open Questions / Future Iteration

1. **Nap Room Separation:**
   - Should nap area be separate scene/room?
   - OR integrated into main classroom (back corner)?
   - **Decision for MVP:** Integrated (simpler, fewer transitions)

2. **Multiple Classrooms (Post-MVP):**
   - Infant room (0-18 months)?
   - Preschool room (3-6 years)?
   - Each follows "one guide per room" rule

3. **Playground Complexity:**
   - MVP: Simple supervision
   - Future: Interactive playground activities (push swings, help climbers?)

4. **Classroom Customization:**
   - Can player rearrange furniture?
   - Move shelves, rugs, etc.?
   - **Decision for MVP:** Fixed layout (player only places materials on shelves)

---

**Next Document:** UX-02 Daily Schedule & Time Flow

---

*Sally, UX Designer*
*MontessoriGame Development Team*
