# Day 1 Implementation Roadmap

**Date:** 2026-02-08
**Goal:** Virginia can move around cottage and time passes
**Status:** In Progress

---

## ✅ Completed Tasks

### 1. Virginia Player Sprite
**File:** `src/utils/virginiaSprite.js`

Created two sprite variants based on real photo:
- **Neck Bandana Version** (`virginia_player`) - Default, bandana around neck like in photo
- **Head Bandana Version** (`virginia_player_headband`) - Alternative, bandana worn like veil

**Features Implemented:**
- Glasses (round dark brown frames)
- Curly light brown hair, parted in middle, shoulder-length
- Green eyes
- White bandana with pattern
- Green sweatshirt (#4caf50 - "Green Bean")
- Slim build
- Brown pants
- Dark gray shoes
- 48x48 base size

**Key Functions:**
```javascript
generateVirginiaSprite(scene) → 'virginia_player'
generateVirginiaWithHeadBandana(scene) → 'virginia_player_headband'
```

### 2. Asset Viewer Component System
**File:** `asset-viewer.html`

Created browser-based component viewer with:
- Tab navigation (Virginia, Toddlers, NPCs, Locations, UI)
- Virginia sprite showcase (both variants at 4x scale: 192x192)
- Character info panels
- Toddler sprite grid (12 children)
- Placeholders for upcoming assets

**Access:** http://localhost:5173/asset-viewer.html

---

## 🚀 Next Tasks (Remaining Day 1)

### 3. Cottage Interior Scene
**File:** `src/scenes/CottageScene.js` (NEW)

**Requirements:**
- Simple bedroom background (warm, cozy colors)
- **Bed** - Interactive, shows "zzz" or resting state
- **Coffee maker** - Interactive, restores +20 energy
- **Door** - Interactive, transitions to village/school
- **Walls** - Collision boundaries
- **Floor** - Wooden planks or simple texture

**Size:** 1280x720 canvas
**Style:** Pixel art, warm palette (#f5e6d3 beige/cream tones)

**Minimal Furniture:**
- Bed: top-left or top-right area
- Coffee maker: small table/counter
- Door: bottom of screen (exit down)

### 4. WASD/Arrow Key Movement System
**File:** `src/scenes/CottageScene.js`

**Implementation:**
1. Add Virginia sprite to scene using `generateVirginiaSprite()`
2. Enable Phaser Arcade Physics: `this.physics.add.sprite()`
3. Set up colliders with walls/furniture
4. Add keyboard input handlers:
   ```javascript
   this.cursors = this.input.keyboard.createCursorKeys();
   this.wasd = this.input.keyboard.addKeys({
       up: 'W',
       down: 'S',
       left: 'A',
       right: 'D'
   });
   ```
5. Update player velocity in `update()` loop
6. Add basic animation (flip sprite left/right) or use simple position updates

**Movement Speed:** 160 pixels/second (Stardew-like pace)

**Collision:**
- Create static physics group for walls
- Use `this.physics.add.collider(player, walls)`

### 5. Clock UI System
**File:** `src/ui/Clock.js` (NEW)

**Requirements:**
- Display current game time (format: "7:00 AM")
- Position: Upper right corner (x: 1200, y: 30)
- Update every game minute
- Color changes based on urgency:
  - White: Normal (7:00-7:39)
  - Yellow: Getting late (7:40-7:44)
  - Red: Very late (7:45+)

**Implementation:**
```javascript
class Clock {
    constructor(scene) {
        this.scene = scene;
        this.gameTime = { hour: 7, minute: 0 };
        this.text = scene.add.text(1200, 30, '7:00 AM', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(1, 0);
    }

    update(delta) {
        // Advance time based on delta
        // 10 real seconds = 10 game minutes
    }

    getFormattedTime() {
        // Return "7:00 AM" format
    }
}
```

### 6. Time Advancement System
**File:** `src/systems/TimeManager.js` (NEW)

**Time Scale:**
- 1 real second = 1 game minute
- Start time: 7:00 AM
- Target arrival time: 7:45 AM (45 real seconds to get to school)

**Features:**
- Global time that persists across scenes
- Event system for time-triggered events
- Pause/resume capability

**Key Events:**
- 7:00 AM - Alarm goes off (wake up)
- 7:45 AM - Must be at school (deadline)
- 8:00 AM - Toddlers arrive
- 12:15 PM - Nap time starts
- 4:15 PM - School day ends
- 11:00 PM - Must be in bed

### 7. Wake-Up Alarm Sequence
**File:** `src/scenes/CottageScene.js`

**Sequence:**
1. Scene starts with "ZZZ" animation over bed
2. After 2 seconds: "RING RING!" text appears
3. Simple popup or text: "Time to start your day!"
4. Tutorial text: "You must reach school by 7:45 AM!"
5. Clock starts at 7:00 AM
6. Player gains control

**Optional Audio:**
- Alarm beep sound effect (if time permits)

### 8. Door Interaction → Scene Transition
**File:** `src/scenes/CottageScene.js`

**Implementation:**
1. When player overlaps door hitbox, show "Press SPACE to leave" prompt
2. On SPACE key:
   ```javascript
   this.scene.start('VillageScene'); // or 'SchoolScene' if skipping village
   ```
3. Pass current game time to next scene

**For MVP:** Can skip village and go directly to school entrance

---

## 🎯 End of Day 1 Test

**Success Criteria:**
- ✅ Can see Virginia sprite in asset viewer (looks like the photo)
- ✅ Asset viewer shows all 12 toddlers organized by tabs
- ⏳ Game loads cottage interior scene
- ⏳ Virginia can move around cottage with WASD/arrows
- ⏳ Clock is visible and time advances from 7:00 AM
- ⏳ Collision works (can't walk through walls)
- ⏳ Can interact with door to leave cottage
- ⏳ Wake-up sequence plays at start

**Quote from Roadmap:** "Virginia wakes up, walks around cottage, can see time passing, can leave through door"

---

## 📦 File Structure After Day 1

```
/MontessoriGame
├── src/
│   ├── main.js (updated - add CottageScene)
│   ├── scenes/
│   │   ├── ObservationScene.js (existing)
│   │   └── CottageScene.js (NEW)
│   ├── systems/
│   │   └── TimeManager.js (NEW)
│   ├── ui/
│   │   └── Clock.js (NEW)
│   ├── utils/
│   │   ├── spriteGenerator.js (existing)
│   │   └── virginiaSprite.js (NEW - ✅ done)
│   └── data/
│       └── children.js (existing)
├── asset-viewer.html (✅ updated)
└── _bmad-output/
    └── planning-artifacts/
        ├── 4-day-roadmap-realistic.md (✅ done)
        ├── prototype-v1-full-vision-2026-02-08.md (✅ done)
        └── day-1-implementation-roadmap.md (✅ this file)
```

---

## ⚠️ Simplification Strategies (If Running Behind)

**Priority Order:**
1. **Must Have:** Virginia sprite ✅, movement, cottage scene, clock UI
2. **Important:** Time advancement, collision detection
3. **Nice to Have:** Wake-up alarm animation, door interaction polish
4. **Can Cut:** Coffee maker interaction (can add Day 2), elaborate cottage decor

**Fallback Options:**
- **Movement:** If animations are slow, just flip sprite left/right (not full 4-direction)
- **Cottage:** Can be very simple - just colored rectangles for furniture
- **Time System:** If complex, can use simple counter instead of full TimeManager
- **Wake-up:** Can skip alarm animation, just start with control immediately

---

## 🔄 Development Order

**Recommended sequence:**

1. ✅ Create Virginia sprite → `virginiaSprite.js`
2. ✅ Create asset viewer → `asset-viewer.html`
3. **Create CottageScene** with basic background
4. **Add Virginia to scene** with physics
5. **Add WASD movement** (no collision yet)
6. **Add walls as physics objects** and enable collision
7. **Create Clock UI** class
8. **Integrate TimeManager** to advance time
9. **Add wake-up sequence** at scene start
10. **Add door interaction** for scene transition
11. **Test full sequence** 3-4 times

**Time Estimate:** 4-6 hours remaining for Day 1

---

## 💡 Key Technical Notes

### Virginia Sprite Usage
```javascript
import { generateVirginiaSprite } from '../utils/virginiaSprite.js';

// In scene create():
const spriteKey = generateVirginiaSprite(this);
this.player = this.physics.add.sprite(640, 500, spriteKey);
this.player.setCollideWorldBounds(true);
```

### Time System Pattern
```javascript
// In scene create():
this.time.addEvent({
    delay: 1000, // 1 real second
    callback: () => this.clock.advanceTime(1), // 1 game minute
    loop: true
});
```

### Collision Pattern
```javascript
// Create wall group
this.walls = this.physics.add.staticGroup();
this.walls.create(x, y, 'wall_sprite');

// Add collider
this.physics.add.collider(this.player, this.walls);
```

---

## ✅ Today's Achievements

- Created authentic Virginia sprite based on real photo (2 variants)
- Built component viewer system for all game assets
- Organized asset viewer with tab navigation
- Documented complete Day 1 roadmap
- Ready to implement movement and time systems

---

**Next Step:** Implement cottage scene with WASD movement

**Reminder:** "Virginia will love it because she'll see her actual daily challenge (nap time!), she'll recognize the rhythm of her job, she'll see herself in the game, it's a thoughtful, personal gift."

Let's keep building! 🎮
