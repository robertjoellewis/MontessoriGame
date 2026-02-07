# Prototyping Session Log — 2026-02-07

**Session Focus:** Build observation mechanic prototype with pixel art toddlers

---

## What We Built

### 1. Tech Stack Selection
**Decision:** Phaser 3 + Vite + JavaScript
- Robert is comfortable with JavaScript and Vue.js
- Phaser 3 is perfect for pixel art games (has built-in pixel art rendering)
- Vite provides hot reload for fast iteration
- Mobile-first HTML5 deployment (Heroku later)

### 2. Observation Mechanic Prototype
**Core Feature:** Hover over children to see their personality data

**Implementation:**
- 12 children placed in grid layout (3 rows x 4 columns)
- Interactive sprites with hover events
- Observation panel appears on hover showing:
  - Name and age
  - Temperament
  - Sensitive periods
  - Current mood
  - Current interests
- Scale animation on hover (1.0 → 1.3)

### 3. Pixel Art Character Generation
**Approach:** Procedural generation using Phaser Graphics API

**Character Features:**
- **Size:** 48x48 pixels
- **Proportions:** Chibi/toddler style (big head, small body) inspired by Stardew Valley
- **Diversity:** 12 unique children with distinct:
  - Skin tones (light to dark, various ethnic backgrounds)
  - Hair colors and styles (blonde, black, red, brown, curly, straight, braids, pigtails, afro)
  - Clothing colors (bright, varied palettes)
  - Facial features (different blush tones, expressive eyes)

**Character List:**
1. Emma (blonde pigtails, light skin, pink dress)
2. Marcus (black curly afro, dark skin, blue shirt)
3. Lily (red wavy hair, light skin, orange dress)
4. Aiden (black short hair, brown skin, green shirt)
5. Sofia (dark brown long hair, light-medium skin, purple dress)
6. Noah (light brown messy hair, light skin, yellow shirt)
7. Mia (black braids, dark skin, red dress)
8. Oliver (blonde baby hair, very light skin, green shirt)
9. Zoe (black bob cut, East Asian skin tone, cyan dress)
10. Elijah (black short hair, medium brown skin, orange shirt)
11. Ava (light brown curly ponytail, light skin, pink dress)
12. Liam (red short hair, very light skin, blue shirt)

---

## File Structure

```
/MontessoriGame
├── index.html              # Main HTML entry point
├── package.json            # Dependencies (phaser, vite)
├── src/
│   ├── main.js            # Game initialization & config
│   ├── scenes/
│   │   └── ObservationScene.js  # Main game scene
│   ├── data/
│   │   └── children.js    # 12 children personality data
│   └── utils/
│       └── spriteGenerator.js   # Procedural pixel art generation
└── _bmad-output/
    └── planning-artifacts/
        ├── mvp-progression-system.md
        ├── gacha-material-acquisition.md
        ├── child-personality-system.md
        └── session-log-prototype-2026-02-07.md (this file)
```

---

## Key Code Decisions

### Phaser Config (src/main.js)
```javascript
{
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#f5e6d3',  // Warm classroom color
    pixelArt: true,              // CRITICAL for crisp pixel art
    scale: {
        mode: Phaser.Scale.FIT,  // Responsive scaling
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}
```

### Sprite Generation Approach
- Used `scene.make.graphics()` to draw sprites programmatically
- `graphics.generateTexture()` creates reusable sprite textures
- Each child gets unique texture based on their data
- Allows easy modification without needing external art assets

### Data Structure (children.js)
Each child has:
- `name` (string)
- `ageMonths` (number, 18-34 months)
- `temperament` (Cautious | Bold | Social | Independent | Sensitive | Easy-Going)
- `sensitivePeriods` (array: Order, Language, Movement, Small Objects, Social Behavior, Toilet Learning)
- `currentMood` (string, will be dynamic later)
- `currentInterest` (string, will be dynamic later)

---

## What Works

✅ Children display correctly with unique pixel art
✅ Hover interaction feels responsive
✅ Observation panel shows all relevant child data
✅ Hot reload works (Vite auto-updates on code changes)
✅ Pixel art looks crisp (no blurriness)
✅ Diverse representation achieved
✅ Stardew Valley aesthetic captured

---

## Known Limitations (For Future)

### Current State: Static Prototype
- Children don't move (frozen in grid)
- No animations (standing pose only)
- Moods/interests are hardcoded (not dynamic)
- No materials or classroom environment
- No gameplay (can observe but not interact)

### Future Requirements (NPC Behavior)

**Robert's Note:** *"Remember in the future, in the actual game, they're going to have to have movement dynamics and stuff like that. They're going to have to be playing with Montessori toys and artifacts and things. They're going to have to be walking around. They're going to have to have their own actual sort of... They're basically NPCs in some sense."*

**To Implement Later:**

1. **Movement System**
   - Pathfinding (A* or simple grid-based)
   - Walk animations (sprite sheets with frames)
   - Idle animations (standing, looking around)
   - Speed variation based on age/temperament

2. **NPC AI Behavior**
   - Autonomous decision-making (choose materials, move around room)
   - State machine (Idle → Walking → Working → Eating → Resting)
   - Personality-driven choices (bold kids choose challenging materials, cautious kids observe first)
   - Sensitive period influence (drawn to materials matching their current sensitive period)

3. **Material Interaction**
   - Children "pick up" and "use" materials
   - Work cycle animations (pouring, stacking, sorting)
   - Concentration states (deep focus = long work cycle)
   - Completion behaviors (put material away, choose new one)

4. **Sprite Animations Needed**
   - Walking (4 directions: up, down, left, right)
   - Sitting/working
   - Reaching/picking up
   - Emotional expressions (happy, frustrated, curious, tired)
   - Eating
   - Sleeping/resting

5. **Dynamic State System**
   - Mood changes over time (affected by hunger, tiredness, social needs)
   - Energy levels (high energy → active, low energy → need rest)
   - Social interactions (children talk to each other, work together)
   - Needs tracking (hungry, tired, need bathroom, want attention)

6. **Classroom Environment**
   - Shelves with materials
   - Tables and chairs
   - Rug areas for floor work
   - Kitchen/snack area
   - Bathroom
   - Outdoor area
   - Reading corner

---

## Next Steps (Priority Order)

**Immediate (Next Session):**
1. Add lesson presentation mechanic (click child → select lesson → see result)
2. Create simple material objects (colored rectangles for now)
3. Add success/failure feedback system

**Short-term:**
4. Build day cycle timer (14-minute day with phases)
5. Add basic child movement (random walk or simple pathfinding)
6. Create more sprite animations (walking, sitting)

**Medium-term:**
7. Implement NPC AI (state machines, autonomous behavior)
8. Build material interaction system
9. Add classroom environment art
10. Implement progression system (tiers, unlocks)

**Long-term:**
11. Gacha material acquisition system
12. Trust meter and relationship progression
13. Parent conversations
14. Full day cycle with all phases
15. Polish and juice (particles, sound, music)

---

## Technical Notes

### Pixel Art Best Practices (For Future Art)
- Keep consistent pixel density (48x48 for characters works well)
- Use limited color palettes (Stardew Valley uses ~16 colors per sprite)
- Avoid anti-aliasing (keep it crisp)
- Use clear outlines for readability
- Animate on 2s or 3s (not every frame) for retro feel

### Performance Considerations
- 12 children + materials + environment = lots of sprites
- Phaser handles hundreds of sprites easily, but optimize:
  - Use sprite atlases (combine textures)
  - Cull off-screen objects
  - Limit particle effects
  - Pool frequently created/destroyed objects

### Mobile Optimization
- Touch events instead of hover (on mobile)
- Larger tap targets
- Simplified UI for smaller screens
- Consider portrait vs landscape modes

---

## Questions for Future Sessions

1. **Animation approach:** Sprite sheets (external) or procedural (code-based)?
2. **Material complexity:** How many materials in MVP? How detailed should interactions be?
3. **NPC intelligence depth:** Simple state machine or more complex behavior trees?
4. **Multiplayer:** Still considering co-op classroom or friend visits?
5. **Save system:** LocalStorage? Cloud save? Export/import?

---

## Resources for Future Reference

**Phaser 3 Docs:**
- https://photonstorm.github.io/phaser3-docs/
- https://phaser.io/examples (great examples)

**Pixel Art Tools:**
- Aseprite ($20) — industry standard
- Piskel (free, browser-based)
- LibreSprite (free, Aseprite fork)

**Montessori Resources:**
- Robert's girlfriend (primary domain expert)
- AMI website for curriculum accuracy
- Montessori materials catalogs for visual reference

---

*Session completed successfully. Prototype is functional and looks great. Foundation is solid for building full game mechanics.*
