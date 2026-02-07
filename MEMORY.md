# MEMORY.md — MontessoriGame Project

*Long-term memory for the MontessoriGame project workspace*

---

## Project Overview

**MontessoriGame** is a cozy mobile-first HTML5 video game where you play as a lead guide at a Montessori preschool.

**Genre:** Cozy management sim + life sim + collection/gacha
**Inspiration:** Stardew Valley meets classroom management
**Platform:** Mobile-first HTML5, deployable on Heroku

**Real-World Inspiration:** Virginia, Robert's girlfriend, is a lead guide at a Montessori toddler school. Many mechanics (nap time challenges, milestones, daily routines) are based on her authentic experiences.

---

## Key Decisions (Locked)

| Decision | Value | Date |
|----------|-------|------|
| Day length | 14 minutes (like Stardew) | 2026-02-07 |
| Max children | 12 in classroom | 2026-02-07 |
| Monetization | Free (maybe $10 one-time later) | 2026-02-07 |
| Team size | Solo dev | 2026-02-07 |
| Home life MVP | Minimal: wake 7am, walk to school, arrive 7:45am | 2026-02-07 |
| Town life | Unlock later, not in MVP | 2026-02-07 |
| Gacha mechanics | In-game earned, NOT real-money | 2026-02-07 |
| Age range | Toddler (18mo-3yr) - girlfriend works with toddlers, she's primary audience | 2026-02-07 |
| Art style | Cozy pixel art (Stardew Valley style) | 2026-02-07 |
| Narrative arc | Join as assistant, work up to lead guide | 2026-02-07 |
| Improvement mechanic | Notice non-Montessori practices, gain authority to fix them as you advance | 2026-02-07 |

---

## Target Audiences

**Primary:** Toddler educators and caregivers (like Robert's girlfriend)
**Secondary:**
1. Parents curious about Montessori toddler education
2. Cozy game fans who will learn about Montessori through play

---

## Completed Design Artifacts

All in `_bmad-output/planning-artifacts/`:

1. **mvp-progression-system.md** — 14 lessons, 4 tiers, ~15-20 day playthrough
2. **gacha-material-acquisition.md** — Multiple currency systems, acquisition methods
3. **child-personality-system.md** — 12 distinct toddlers with Montessori-based personalities
4. **montessori-milestones-and-mechanics.md** — Nap time mechanic, progression milestones, authentic Montessori moments (inspired by Virginia's experience)

## Technical Progress

### Prototype Built (Phaser 3)
- ✅ Project setup with Vite + Phaser 3
- ✅ Observation mechanic working (hover to see child details)
- ✅ 12 unique pixel art toddlers (Stardew Valley style)
- ✅ Diverse representation (skin tones, hair styles, clothing)
- ✅ Interactive UI with observation panel

**Tech Stack:**
- Phaser 3 (game framework)
- Vite (dev server, hot reload)
- JavaScript (ES6 modules)
- Pixel art rendering enabled

**Files Created:**
- `src/main.js` — Game initialization
- `src/scenes/ObservationScene.js` — Main game scene
- `src/data/children.js` — 12 children data
- `src/utils/spriteGenerator.js` — Procedural pixel art generation

**Run Game:** `npm run dev` → http://localhost:5173/

---

## Core Gameplay Loop

1. **Morning:** Wake up, morning routine (buffs?), walk to school
2. **Arrival:** Greet children and families, notice moods
3. **Work Cycle:** The strategic heart — observe, present lessons, prepare environment
4. **Circle/Outdoor Time:** Group activities
5. **Afternoon:** Rest, pickup, parent conversations
6. **After Hours:** Prep, journal, go home

---

## BMAD Workflow Status

- ✅ BMAD Method installed (v6.0.0-Beta.7)
- ✅ Mary (Business Analyst) introduced
- ✅ Brainstorm saved to `_bmad-output/planning-artifacts/brainstorming-initial-concept.md`
- 🔄 Product Brief started, ready for Step 2 (Vision Discovery)
- 📍 Next: Load Mary and continue `/product-brief` or type `CB`

---

## Session Log

### 2026-02-07 (First Session)
- Met Robert, established identity as Ziggy ⚡
- Set up Signal channel (+15129537588)
- Installed BMAD Method
- Switched workspace to ~/MontessoriGame
- Started product brief workflow with Mary (Business Analyst)
- Saved initial brainstorm document
- Made key decisions on day length, monetization, scope

### 2026-02-07 (Continuation - Decision Workshop)
- Locked in toddler age range (18mo-3yr) - girlfriend is primary audience
- Chose narrative: start as assistant, work up to lead guide
- Added mechanic: notice and fix non-Montessori practices as you advance
- Selected art style: cozy pixel art (Stardew Valley style)
- Working on MVP progression system design

### 2026-02-07 (Prototyping Session)
- Built observation mechanic prototype in Phaser 3
- Created 12 unique pixel art toddler sprites programmatically
- Stardew Valley-inspired chibi proportions (big heads, small bodies)
- Diverse skin tones, hair styles, clothing colors
- Interactive hover system shows child personality/state
- Fully documented in session logs and README
- **Next steps:** Add lesson presentation, movement/NPC behavior, material interactions

**Session Documentation:**
- ✅ README.md created (quick start guide)
- ✅ session-log-prototype-2026-02-07.md (complete technical notes)
- ✅ .gitignore added for version control
- ✅ All code commented and organized
- ✅ Future NPC requirements noted

---

*Last updated: 2026-02-07*
