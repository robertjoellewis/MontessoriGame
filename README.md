# MontessoriGame

A cozy Montessori toddler classroom management game built with Phaser 3.

**Genre:** Management sim + Life sim + Collection/Gacha
**Platform:** Mobile-first HTML5
**Art Style:** Pixel art (Stardew Valley inspired)
**Target Audience:** Toddler educators, Montessori enthusiasts, cozy game fans

---

## Current Status: Prototype

**What's Working:**
- ✅ Observation mechanic (hover over children to see their personality)
- ✅ 12 unique pixel art toddler characters
- ✅ Diverse representation (skin tones, hair styles, clothing)
- ✅ Interactive UI with observation panel

**What's Next:**
- Lesson presentation mechanic
- Child movement and NPC behavior
- Material interaction system
- Day cycle timer

---

## Quick Start

### Install
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Then open: **http://localhost:5173/**

### Build for Production
```bash
npm run build
```

---

## Project Structure

```
/MontessoriGame
├── index.html                    # Entry point
├── package.json                  # Dependencies
├── src/
│   ├── main.js                   # Game config & initialization
│   ├── scenes/
│   │   └── ObservationScene.js   # Main game scene (observation mechanic)
│   ├── data/
│   │   └── children.js           # 12 children with personalities
│   └── utils/
│       └── spriteGenerator.js    # Procedural pixel art generation
├── _bmad-output/
│   └── planning-artifacts/       # Design docs, session logs
│       ├── mvp-progression-system.md
│       ├── gacha-material-acquisition.md
│       ├── child-personality-system.md
│       └── session-log-prototype-2026-02-07.md
└── MEMORY.md                     # Project memory & decisions
```

---

## The 12 Children

Each child has unique personality based on Montessori developmental theory:

1. **Emma** (24mo, Cautious) - Blonde pigtails, loves order
2. **Marcus** (30mo, Bold) - Curly afro, high energy
3. **Lily** (28mo, Social) - Red hair, always chatting
4. **Aiden** (22mo, Independent) - Focused, detail-oriented
5. **Sofia** (33mo, Sensitive) - Big emotions, creative
6. **Noah** (26mo, Easy-Going) - Chill, adaptable
7. **Mia** (31mo, Bold/Social) - Natural leader, braids
8. **Oliver** (20mo, Cautious) - Youngest, needs reassurance
9. **Zoe** (29mo, Independent) - Obsessed with small objects
10. **Elijah** (34mo, Social) - Oldest, class mediator
11. **Ava** (25mo, Bold) - Talks nonstop, curly ponytail
12. **Liam** (27mo, Cautious) - Needs routine, organized

---

## Key Design Documents

**Planning Artifacts** (in `_bmad-output/planning-artifacts/`):
- **mvp-progression-system.md** - 14 lessons, 4 career tiers, progression design
- **gacha-material-acquisition.md** - Material collection mechanics, currencies
- **child-personality-system.md** - Full personality system based on Montessori theory
- **session-log-prototype-2026-02-07.md** - Technical session notes

**Core Decisions** (in `MEMORY.md`):
- Toddler age range (18mo-3yr)
- 14-minute day cycle
- Free game with optional $10 purchase
- Cozy pixel art style
- Start as assistant, work up to lead guide
- Fix non-Montessori practices as you advance

---

## Tech Stack

- **Game Framework:** Phaser 3.80.1
- **Build Tool:** Vite 5.0
- **Language:** JavaScript (ES6 modules)
- **Deployment Target:** HTML5 (Heroku)
- **Art:** Procedural pixel art (48x48 sprites)

**Important Config:**
- `pixelArt: true` in Phaser config (critical for crisp rendering)
- Mobile-responsive scaling with `Phaser.Scale.FIT`

---

## Development Notes

### Running the Game
1. Make sure Node.js is installed
2. `npm install` (first time only)
3. `npm run dev`
4. Open http://localhost:5173/
5. Hover over children to see observation panel

### Hot Reload
Vite automatically reloads when you change code. Just save and the browser updates instantly.

### Future NPC Behavior Requirements
Children will eventually need:
- Movement and pathfinding
- Animations (walking, sitting, working)
- Autonomous AI (state machines)
- Material interactions
- Dynamic moods/needs

See `session-log-prototype-2026-02-07.md` for full technical notes.

---

## Next Session Goals

1. Build lesson presentation mechanic
2. Add basic child movement
3. Create material objects (prototype with simple shapes)
4. Implement success/failure feedback

---

**Last Updated:** 2026-02-07
**Current Phase:** Prototyping
**Next Milestone:** Core gameplay loop (observe → present → succeed/fail)
