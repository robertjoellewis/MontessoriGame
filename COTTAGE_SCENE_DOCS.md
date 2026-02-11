# Cottage Scene - Complete Documentation

## Overview
Virginia's bedroom where the game starts each day. Player wakes up, can make coffee for energy, and leaves through the door to go to school.

**Scene File:** `src/scenes/CottageScene.js`

---

## Scene Dimensions & Layout

### Viewport System
- **Canvas Size:** 1280x720 pixels (full screen)
- **Room Size:** 600x500 pixels (Stardew-style small window)
- **Room Position:** Centered at (340, 110)
- **Black Borders:** Surround the room on all sides
- **10px Beveled Border:** 3-tone brown border (Stardew style)

### Wall & Floor Division
- **Back Wall (Wallpaper):** 0-106px height (33% taller than original)
- **Floor Area:** 106-500px height
- **Colors:** Yellow/orange vertical striped wallpaper, warm orange vertical plank floor

---

## Furniture & Objects

### Bed (Upper Right Corner)
- **Type:** Procedural sprite
- **Size:** 80x60 pixels (displayed at 2x scale = 160x120)
- **Position:** (bedX: roomWidth-120, bedY: 130) - tight against back wall
- **Features:**
  - Wood headboard with vertical slats
  - Red blanket with fold lines
  - White pillow
  - Chunky Stardew style with thick outlines

### Dresser/Nightstand
- **Type:** AI-generated (FLUX)
- **Size:** 48x56 pixels
- **Position:** (dresserX: roomWidth-250, dresserY: 125) - left of bed, against back wall
- **Features:** 3 drawers with gold handles

### Coffee Machine (Back Wall)
- **Type:** Procedural sprite
- **Size:** 36x48 pixels
- **Position:** (180, 70) - on back wall next to window
- **Features:**
  - Drip coffee maker style
  - Water reservoir at back
  - Brew basket in middle
  - Glass carafe with coffee liquid
  - Heating plate at base

### Table (Under Coffee Machine)
- **Type:** Procedural sprite
- **Size:** 48x32 pixels
- **Position:** (180, 110) - directly under coffee machine
- **Features:** Simple chunky wood table with two legs

### Window (Back Wall)
- **Type:** Procedural sprite
- **Size:** 50x40 pixels (displayed at 1.2x scale = 60x48)
- **Position:** (80, 50) - top left on back wall
- **Features:** Simple 4-pane window with blue glass

### Door (Bottom Center)
- **Type:** AI-generated (FLUX)
- **Size:** 60x80 pixels (displayed at 1.2x scale = 72x96)
- **Position:** (roomWidth/2, roomHeight-35) - bottom center
- **Features:** Wooden door with panels, gold doorknob

### Plants (Decorative)
- **Type:** AI-generated (FLUX)
- **Count:** 2 potted plants
- **Positions:**
  - Plant 1: (60, 150) - scaled 1.5x
  - Plant 2: (roomWidth-60, 250)

### Rug (Center Floor)
- **Type:** Procedural sprite
- **Size:** 150x100 pixels (displayed at 0.8x scale)
- **Position:** Center of room

---

## Player Character (Virginia)

### Sprite Details
- **Type:** Procedural sprite (generated from data)
- **Base Size:** 48x48 pixels
- **Display Scale:** 3x (144x144 pixels on screen)
- **Features:**
  - Round glasses
  - Curly light brown hair (shoulder-length, poofy)
  - Green eyes
  - White bandana around neck
  - Coral/peach shirt
  - Blue denim shorts
  - Camo crocs
  - Slim build

### Spawn & Animation
- **Initial Position:** In bed (hidden with alpha=0)
- **Wake-up Animation:**
  1. Alarm text appears (1.5 second delay)
  2. Virginia pops up 80px (300ms ease-out)
  3. Moves to standing position left of bed with bounce (400ms)
  4. Lands at (bedX-80, bedY+100)
  5. Controls enabled after animation

### Movement
- **Speed:** 160 pixels/second
- **Controls:** Arrow keys + WASD
- **Collisions:** World bounds + furniture (bed, dresser)

---

## UI Elements

### Clock (Upper Right)
- **Position:** (1050, 20)
- **Size:** 220x120px frame
- **Features:**
  - Thick wooden frame (Stardew style)
  - Displays time (starts at 7:00 AM)
  - Shows day number
  - Updates in real-time

### Energy Meter (Upper Left)
- **Position:** Label at (70, 35), Bar at (145, 30)
- **Size:** 250x30px bar
- **Features:**
  - "⚡ Energy:" label
  - Green bar (changes to yellow/red when low)
  - Number display showing current energy
  - Starts at 100, depletes over time
  - Coffee restores +20 energy

---

## Interactions

### Coffee Machine
- **Trigger Zone:** 80x80 pixels at coffee machine position
- **Prompt:** "Press E for coffee"
- **Effect:** +20 energy, coffee animation
- **Note:** Player can walk through coffee machine (no collision)

### Door (Exit)
- **Trigger Zone:** 140x100 pixels at door position
- **Prompt:** "Press SPACE to leave"
- **Effect:** Fade out, transition to next scene
- **Current:** Requires SPACE key
- **Planned:** Automatic entry (walk into door)

---

## Collision & Physics

### Walls (Invisible Boundaries)
- **Top Wall:** (roomX+roomWidth/2, roomY+20) - 600x40px
- **Left Wall:** (roomX+20, roomY+roomHeight/2) - 40x500px
- **Right Wall:** (roomX+roomWidth-20, roomY+roomHeight/2) - 40x500px
- **Bottom Wall Left:** (roomX+100, roomY+roomHeight-20) - 160x40px
- **Bottom Wall Right:** (roomX+roomWidth-100, roomY+roomHeight-20) - 160x40px
- **Gap:** Center bottom for door exit

### Furniture Collisions
- Bed: 160x120px collision body
- Dresser: 48x56px collision body
- Table: 48x32px collision body
- Coffee machine: No collision (on wall)

### Physics World Bounds
- Matches room dimensions: 600x500px
- Player cannot leave room boundaries

---

## Textures & Asset Keys

### Procedural (Generated by code)
- `stardew_floor_procedural` - Floor with 3 large vertical planks
- `cottage_wallpaper_v2` - Yellow/orange vertical stripes
- `cottage_bed_v3` - Bed with headboard, blanket, pillow
- `cottage_table_v2` - Simple wooden table
- `cottage_window_v2` - 4-pane window
- `cottage_rug_v2` - Patterned rug
- `cottage_coffee_maker_v3` - Drip coffee maker

### AI-Generated (FLUX model)
- `cottage_door_ai` - Wooden door (kept)
- `cottage_dresser_ai` - 3-drawer dresser (kept)
- `cottage_plant_ai` - Potted plant (kept)

### Character Sprites
- `virginia_sprite` - Virginia front view
- Generated procedurally from `src/data/children.js` character data

---

## Code Structure

### Main Methods

#### `create()`
- Sets up entire scene
- Creates room container with mask
- Generates all sprites
- Creates player
- Sets up interactions
- Starts wake-up sequence

#### `createCottageInterior()`
- Generates wallpaper and floor tiles
- Creates furniture objects
- Adds decorative elements
- Sets up collision bodies

#### `createPlayer()`
- Generates Virginia sprite
- Spawns at bed position (hidden)
- Sets scale to 3x
- Configures collision body

#### `createInteractables()`
- Creates door interaction zone
- Creates coffee interaction zone
- Creates interaction prompt text

#### `createStardewBorder()`
- Generates 3-tone beveled border
- Draws around room perimeter

#### `startWakeUpSequence()`
- Shows alarm text
- Animates Virginia pop-out from bed
- Enables controls after animation

#### `update(time, delta)`
- Updates clock and energy meter
- Processes player movement (if controls enabled)
- Handles WASD + Arrow keys
- Checks interaction prompts visibility

#### `handleCoffeeInteraction()`
- Triggered by E key
- Checks distance to coffee machine
- Adds energy and shows animation

#### `handleDoorInteraction()`
- Triggered by SPACE key
- Checks distance to door
- Fades out and transitions to next scene

---

## Scene Flow

1. **Scene Loads** → Black background + room container created
2. **Interior Generated** → Floor, walls, furniture placed
3. **Player Created** → Virginia spawned at bed (hidden)
4. **UI Created** → Clock and energy meter added
5. **Wake-up Starts** → Alarm text appears
6. **Animation Plays** → Virginia pops out of bed
7. **Controls Enabled** → Player can move around
8. **Interactions Available** → Can make coffee, can exit door
9. **Exit Door** → Fade out, transition to next scene

---

## Dependencies

### Utilities
- `src/utils/virginiaSprite.js` - Virginia character generation
- `src/utils/stardewFloor.js` - Floor tile generation
- `src/utils/cottageInterior.js` - All furniture generation
- `src/utils/cottageInteriorLoader.js` - AI sprite preloading

### UI Components
- `src/ui/Clock.js` - Time display
- `src/ui/EnergyMeter.js` - Energy bar and management

### Data
- `src/data/children.js` - Character definitions (for Virginia)

---

## Performance Notes

- Room container uses crop for tiles (prevents bleeding outside boundaries)
- All procedural textures generated once in `create()`
- AI textures preloaded in `preload()`
- Interaction zones use simple distance checks (optimized)

---

## Known Issues / Future Improvements

- [ ] Door requires SPACE key (planned: automatic entry)
- [ ] No scene after door exit yet (placeholder message)
- [ ] Coffee machine interaction feels basic (could add animation)
- [ ] Energy depletion may be too fast/slow (needs balancing)
- [ ] No sound effects yet

---

## Style Guidelines (Stardew Valley)

### Visual Requirements
- Chunky, blocky shapes (not detailed/realistic)
- Thick 2px black outlines on all objects
- 3-5 colors maximum per sprite
- Simple, clean pixel art
- No gradients or complex shading
- Warm orange/brown color palette
- Vertical patterns (floor planks, wallpaper stripes)

### These rules are enforced in `RULES.md`

---

Last Updated: 2026-02-08
Scene Status: ✅ LOCKED IN - Ready for production
