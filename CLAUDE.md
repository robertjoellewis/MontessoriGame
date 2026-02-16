# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Game Overview

**Bluebonnet Montessori** is a cozy Montessori toddler classroom management simulation game built with Phaser 3. The player controls Virginia, a Montessori guide teaching 12 unique toddler characters in a warm, nurturing environment.

**Tech Stack:**
- Phaser 3.80.1 (game framework)
- Vite 5.0 (build tool)
- JavaScript ES6 modules
- Canvas: 1280x720 (desktop optimized)
- Stardew Valley-inspired pixel art aesthetic

## Development Commands

### Running the Game
```bash
npm install          # Install dependencies (first time)
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production (auto-runs check-prod first)
npm run preview      # Preview production build (http://localhost:4173/MontessoriGame/)
npm run check-prod   # Verify production readiness (assets, paths, config)
```

### Scene Jumping (Debug Mode)
Skip to specific scenes using URL parameters:
```
http://localhost:5173/?scene=cottage
http://localhost:5173/?scene=village
http://localhost:5173/?scene=classroom
http://localhost:5173/?scene=naproom
http://localhost:5173/?scene=name
```

### AI Asset Generation Scripts
```bash
npm run generate-sprites        # Generate character sprites via Replicate API
npm run generate-audio          # Generate audio assets via Replicate API
npm run cleanup-sprites         # Post-process sprites (remove bg, crop, resize)
```

**Important:** These scripts require `.env` file with `REPLICATE_API_TOKEN`. See `SPRITE_GENERATION_GUIDE.md` for details on the proven FLUX-schnell workflow.

## Architecture Overview

### Scene Flow & Lifecycle

**Scene Progression:**
```
NameSelectionScene → CottageScene → VillageScene → ClassroomScene ⇄ NapRoomScene
                                                            ↓
                                                   ObservationScene (legacy)
```

**Critical Scene Data Passing:**
- **Phaser Registry:** Used for cross-scene state (`playerName`, `bandanaOnHead`, `isNewGame`, etc.)
- **Scene init() data:** Time progression (`gameTime: { hour, minute }`)
- **localStorage:** Inventory persistence (`montessori_inventory` key)

**Scene Initialization Pattern:**
```javascript
// In each scene's init() method
init(data) {
    this.gameTime = data.gameTime || { hour: 7, minute: 0 };
}

// When transitioning to next scene
this.scene.start('NextScene', {
    gameTime: { hour: this.clock.hour, minute: this.clock.minute }
});
```

### Core Systems Architecture

#### 1. Inventory System (Stardew Valley-inspired)

**Separation of Concerns:**
```
InventorySystem (data layer)  ←→  InventoryUI (display layer)
        ↓                                ↓
   items.js (definitions)         Visual components
```

**Key Files:**
- `/src/systems/InventorySystem.js` - Data management, persistence, use functions
- `/src/ui/InventoryUI.js` - Hotbar (10 slots) + full inventory grid (10 slots), tooltips
- `/src/data/items.js` - `ItemDefinition` class, `ItemType` enum, all item data

**Critical Implementation Details:**
- **Hotbar:** Always visible at bottom, slots 1-9,0 keys for selection
- **Full Inventory:** Toggled with I/ESC keys, shows all 10 slots
- **Right-click:** Consumes items (calls `useFunction`)
- **Persistence:** `localStorage.setItem('montessori_inventory', ...)` on changes
- **New Game:** Cleared in `NameSelectionScene.startGame()` via `localStorage.removeItem()`

**Integration Pattern:**
```javascript
// In scene's create() method
this.inventorySystem = new InventorySystem(this, {
    hotbarSize: 10,
    inventoryRows: 1,
    inventoryCols: 10,
    persistKey: 'montessori_inventory'
});

this.inventoryUI = new InventoryUI(this, this.inventorySystem);

// Adding items
this.inventorySystem.addItem('gluten_free_bar', 1);
this.inventoryUI.refreshDisplay();
```

#### 2. Sprite Generation System

**Two Approaches Coexist:**

**A. Procedural (Runtime):**
- Functions like `generateVirginiaSprite(scene)` use Phaser Graphics API
- Generated once, cached as textures
- Used for Virginia, Robert, children, furniture
- See `/src/utils/virginiaSprite.js`, `/src/utils/robertSprite.js`

**B. AI-Generated (Build Time):**
- FLUX-schnell model via Replicate API
- Cleanup with Sharp (remove background, crop, resize)
- Stored in `/assets/sprites/` or `/assets/ai-generated/`
- See `SPRITE_GENERATION_GUIDE.md` for proven workflow

**Bandana Toggle System:**
Virginia has two appearance states (neck bandana vs. head bandana):
- Generates separate sprites: `virginia_idle` vs `virginia_idle_headband`
- Walking animations: `virginia_walk_front` vs `virginia_walk_front_headband`
- Stored in registry: `scene.registry.get('bandanaOnHead')`
- Toggled via `ClothingMenu.js` or `InventoryUI.js`

**Animation Regeneration Pattern:**
```javascript
// When bandana changes, MUST regenerate animations
regenerateWalkingAnimations(bandanaOnHead) {
    // 1. Remove old animations
    this.scene.anims.remove('walk_front');

    // 2. Destroy old textures
    this.scene.textures.remove('virginia_walk_front');

    // 3. Generate new textures
    generateVirginiaWalkingAnimations(this.scene, bandanaOnHead);

    // 4. Create new animations
    this.scene.anims.create({ key: 'walk_front', frames: [...] });
}
```

#### 3. Clock & Energy System

**Time Progression:**
- Classroom: 2x speed (fast-paced gameplay)
- Other scenes: 1x speed (normal)
- Pause/Resume: `clock.pause()`, `clock.resume()`

**Critical for Transitions:**
```javascript
// Before scene transition, ALWAYS pause clock
if (this.clock) this.clock.pause();

// In new scene, resume after fade-in
this.time.delayedCall(1000, () => {
    if (this.clock) this.clock.resume();
});
```

**Energy Depletion:**
- Managed by `EnergyMeter.js`
- Depletes over time, restored by items (coffee, snacks)
- Affects player movement speed when low

#### 4. UI Depth Layering

**Strict Depth Hierarchy:**
```
Game world: 0-999
HUD (Clock, Energy): 1000-1999
Modals (Inventory): 2000-2999
Tooltips: 3000-3999
Transitions/Overlays: 5000+
```

**When Creating UI:**
```javascript
this.menuContainer.setDepth(2000);  // Modal menu
this.tooltip.setDepth(3000);        // Tooltip above modal
this.fadeOverlay.setDepth(5000);    // Transition overlay above all
```

### Scene-Specific Architecture Notes

#### ClassroomScene.js
**Most Complex Scene - Teaching Mechanics:**
- Children arrive 7:45-8:00 AM (if Virginia late, children appear instantly)
- Wade dialogue: Check if late (>= 8:00 AM) for scolding message
- Teaching: Click material shelf → "Teach" button (hidden until 8:00 AM) → click child
- Success notifications: Small popups in top-right under mission tracker (1050, 350)
- Nap time triggers at 12:15 PM → smooth fade to NapRoomScene
- Clock runs at 2x speed for faster gameplay

**Critical Flags:**
- `this.controlsEnabled` - Prevents input during tutorials/animations
- `this.teachingNotificationActive` - Prevents overlapping popups
- `this.hasShownTutorial` - Tutorial shown once per session

**Teaching Success/Failure:**
```javascript
// Success condition
const timeDiff = Math.abs(targetTime - clickTime);
if (timeDiff < 100) { /* SUCCESS */ }
else { /* FAILURE */ }
```

#### CottageScene.js
**Morning Routine:**
- Virginia wakes up in bed (wake-up animation sequence)
- Robert interaction: Click → kiss → receive gluten-free energy bar
- Coffee maker: Restore energy
- Door: Exit to village (scene transition)

**Robert Sprite Versions:**
Multiple versions exist in `robertSprite.js`:
- V1: Detailed/refined (current default was V1)
- V2: Softer/friendlier
- V3: Angular/professional
- V4: Simple pixel art (NOW ACTIVE - user selected this)
- V5: Most detailed/premium

To change: Update import and call in `CottageScene.js:6,310`

#### NapRoomScene.js
**Whack-a-Mole Mechanic:**
- Children pop up randomly, click to put back down
- 5-minute timer (in-game time)
- Fade transitions in/out (smooth black overlay)

**Critical Transition Fix:**
Black overlay MUST be created at start of `create()` with high depth (10000+) to prevent flash of nap room before fade-in. Clock runs at 2x speed like classroom.

```javascript
create() {
    // BLACK OVERLAY FIRST (prevents visual flash)
    const fadeInOverlay = this.add.rectangle(640, 360, 1280, 720, 0x000000, 1)
        .setScrollFactor(0)
        .setDepth(10000);

    // ... build room content ...

    // Fade in from black
    this.tweens.add({
        targets: fadeInOverlay,
        alpha: 0,
        duration: 1000
    });
}
```

### Critical Configuration

**Phaser Config (main.js):**
```javascript
{
    pixelArt: true,  // CRITICAL - DO NOT REMOVE
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 } }  // Top-down game
    }
}
```

**Vite Config:**
- Base path: `/MontessoriGame/` (for GitHub Pages)
- Change if deploying elsewhere

### Common Patterns & Gotchas

#### Player Movement Pattern
```javascript
// WASD + Arrow keys, with controlsEnabled flag
update() {
    if (!this.controlsEnabled) return;

    const speed = 200;
    let velocityX = 0;
    let velocityY = 0;

    if (this.cursors.left.isDown || this.keys.A.isDown) velocityX = -speed;
    // ... handle all directions

    this.player.setVelocity(velocityX, velocityY);
}
```

#### Texture Generation Pattern
```javascript
// Generate once, reuse texture key
function generateSprite(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
    // ... draw sprite
    graphics.generateTexture('sprite_key', width, height);
    graphics.destroy();
    return 'sprite_key';
}

// Use in scene
const spriteKey = generateSprite(this);
this.player = this.physics.add.sprite(x, y, spriteKey);
```

#### Scene Transition with Fade
```javascript
// Create black overlay
const overlay = this.add.rectangle(640, 360, 1280, 720, 0x000000, 0)
    .setScrollFactor(0).setDepth(5000);

// Fade to black
this.tweens.add({
    targets: overlay,
    alpha: 1,
    duration: 1000,
    onComplete: () => {
        // DON'T destroy overlay here - keep screen black during transition
        this.scene.start('NextScene', { gameTime: {...} });
        // Cleanup happens in shutdown() automatically
    }
});
```

**Shutdown Handler Pattern:**
Every scene should implement `shutdown()` for cleanup:
```javascript
shutdown() {
    this.tweens.killAll();           // Stop all tweens
    this.time.removeAllEvents();     // Clear timers
    if (this.music?.isPlaying) {
        this.music.stop();           // Stop music
    }
}
```

#### localStorage Management
```javascript
// New game: Clear inventory
localStorage.removeItem('montessori_inventory');
this.registry.set('isNewGame', true);

// Load game: Check flag
const isNewGame = this.registry.get('isNewGame');
if (!isNewGame) {
    this.inventorySystem.loadFromStorage();
}
```

### Audio System

**Files:**
- `/assets/audio/morning_theme_nature.mp3` - Cottage music
- `/assets/audio/classroom_music.mp3` - Classroom music (100 BPM kalimba)
- `/assets/audio/naptime_music.mp3` - Nap time lullaby (55 BPM)
- `/assets/audio/teaching_success.mp3` - Success chime
- `/assets/audio/teaching_failure.mp3` - Failure sound

**Pattern:**
```javascript
// Load in preload()
this.load.audio('key', 'path.mp3');

// Play in create()
this.music = this.sound.add('key', { loop: true, volume: 0.5 });
this.music.play();

// Fade out before transition
this.tweens.add({ targets: this.music, volume: 0, duration: 2000 });
```

## Key Reference Documents

- **GAME_INFO.md** - Official game name, characters, audio specs
- **INVENTORY_ARCHITECTURE.md** - Visual diagrams of inventory system
- **SPRITE_GENERATION_GUIDE.md** - FLUX-schnell workflow, proven prompts
- **DEPLOYMENT.md** - GitHub Pages deployment setup
- **README.md** - Quick start, project structure, current status

## Visual Style Guidelines

**Stardew Valley Aesthetic:**
- Warm color palette (browns, oranges, yellows)
- Thick wooden UI frames (3-layer borders: dark → mid → light)
- Chunky furniture (3-5 colors max, thick outlines)
- 16px grid alignment
- Monospace fonts for UI text

**Approved Color Palette:**
```javascript
// UI Frames
FRAME_DARK: 0x805030
FRAME_MID: 0xC89060
FRAME_LIGHT: 0xE8B888
FRAME_BG: 0xF8E8C8

// Furniture outlines
OUTLINE_BLACK: 0x2C1C0C
```

## Testing & Debugging

**Debug Mode:**
- Set `debug: true` in arcade physics config to see collision boxes
- Use `console.log()` liberally - no formal test framework exists
- Scene jumping via URL params (see above)

**Common Issues:**
1. **Blank screen in production:** Assets not in `public/` folder → run `npm run check-prod`
2. **Sprites not appearing:** Check depth values, ensure texture generated before use
3. **Inventory not persisting:** Verify `persistKey` matches across scenes
4. **Animations not updating:** Must regenerate textures before recreating animations
5. **Physics not working:** Ensure `this.physics.add.existing()` called, check body size/offset
6. **Clock method error:** Use `clock.update(delta)` NOT `clock.tick()` in scene update()
7. **Flash during transitions:** Create black overlay FIRST in new scene's create() method
8. **Right-click not working:** Check `pointer.button === 2` AND disable context menu

## Production Deployment

### Critical Pre-Deployment Rule
**ALWAYS run `npm run check-prod` before pushing to production.**

This automated script prevents common production failures:
- ✅ Verifies all asset files exist in `public/` directory
- ✅ Checks assets are synced between `assets/` and `public/assets/`
- ✅ Validates Vite base path configuration
- ✅ Confirms build output is recent and valid
- ✅ Detects hardcoded localhost URLs
- ✅ Verifies all import paths resolve

The check runs automatically before `npm run build` via the `prebuild` hook.

### Asset Management Rules
**Critical:** Vite only serves files from `public/` in production builds.

**Correct Workflow:**
```bash
# When adding new assets (audio, sprites, etc.):
1. Add to public/assets/audio/ or public/assets/sprites/
2. OR: Copy from assets/ to public/assets/
   cp assets/audio/newSong.mp3 public/assets/audio/

3. Verify sync:
   npm run check-prod

4. Test production build:
   npm run build
   npm run preview  # Test at localhost:4173/MontessoriGame/
```

**Common Production Bug:**
Files in `assets/` but not `public/assets/` will cause blank screens in production (404 errors when loading). The check-prod script catches this automatically.

### Deployment Workflow
```bash
# 1. Verify production readiness
npm run check-prod

# 2. Test production build locally
npm run build && npm run preview

# 3. Push to deploy
git push origin main
# → GitHub Actions auto-deploys to: https://robertjoellewis.github.io/MontessoriGame/
```

See `DEPLOYMENT.md` for complete troubleshooting guide and asset sync procedures.
