# UX Design Document 10: Implementation Priorities & MVP Scope
**Author:** Sally (UX Designer)
**Date:** February 10, 2026
**Status:** Implementation-Ready
**Project:** MontessoriGame - Development Roadmap & Feature Prioritization

---

## Overview

This document defines **what to build first (MVP), what can wait, and how to prioritize** the classroom gameplay features for successful implementation.

**Goals:**
- Ship playable MVP quickly (prove concept)
- Iterative development (add features over time)
- Clear priorities (no scope creep)
- Technical feasibility (achievable milestones)

---

## MVP Definition (Minimum Viable Product)

### Core Question: What's the MINIMUM to make this FUN?

**Answer:**
A single school day loop where you:
1. Arrive at classroom (children present)
2. Observe children and present materials
3. Experience nap time minigame
4. Craft 1-2 basic materials
5. See end-of-day summary
6. Feel satisfied and want to play tomorrow

**MVP Scope:**
- One complete day cycle (7:45 AM - 3:15 PM)
- 12 children with basic AI (choosing work, working, wandering, upset states)
- 3-5 starting materials (Tier 1 only)
- Nap minigame (simplified)
- Basic crafting (3 recipes, instant crafts)
- Minimal tutorial (contextual tooltips only)
- Breakthrough moments (basic sparkle + notification)

**NOT in MVP:**
- Multiple days (no save system yet - can add later)
- Playground (skip for MVP, go straight classroom → nap time)
- Tier 2-4 materials (Tier 1 only)
- Advanced crafting (no time-based crafts, all instant)
- Trust/progression system (no unlocks, all recipes available)
- Detailed observation journal (basic notes only)
- Clingy children mechanic (can add later)

**Development Time Estimate:** 1-2 weeks (with existing foundation)

---

## Three-Phase Development Plan

### Phase 1: Core Loop (MVP) - Week 1-2

**Goal:** Prove the gameplay loop is fun

**Features:**

1. **Classroom Scene (Basic)**
   - Room layout (900x650, fixed camera)
   - Shelves (3 areas: Practical Life, Sensorial, Language)
   - Work rugs (6-8 rugs on floor)
   - Door (entry/exit)
   - Nap mats (appear at nap time)
   - Crafting table (southwest corner)

2. **Children AI (Simplified)**
   - 12 children spawn at start (no staggered arrival)
   - States: CHOOSING, WORKING, WANDERING, UPSET
   - Simple pathfinding (walk to shelf, walk to rug)
   - Material selection (based on sensitive period, 80% match)
   - Mood system (0-100, affects behavior)

3. **Virginia Interactions (Basic)**
   - Click child → Observation tooltip (name, mood, activity)
   - Click child → "Present Material" menu (select from 3 materials)
   - Presentation animation (simple: walk to child, loading bar, child works)
   - Comfort action (click upset child, loading bar, mood increases)

4. **Materials (Tier 1 Only)**
   - Starting materials on shelves:
     - Basic Pouring Set
     - Spooning Transfer Set
     - Nature Vocabulary Basket
   - Sprites: Simple 24x24 icons on shelves
   - Engagement system: Children work 1-3 minutes based on match

5. **Nap Minigame (Simplified)**
   - All children on mats at 12:15 PM (automatic transition)
   - Visual indicators: Awake (! icon), Asleep (Z Z Z)
   - Soothe action: Click child, loading bar fills, child sleeps
   - Success: All asleep = crafting time unlocked
   - Easier version: Fewer wakeups, no difficult sleepers

6. **Crafting (Instant Only)**
   - Crafting menu (recipe list + selected recipe panel)
   - 3 recipes available (all Tier 1, instant crafts):
     - Basic Pouring Set
     - Spooning Transfer Set
     - Nature Vocabulary Basket
   - Ingredients: Pre-populated (assume player has items)
   - Crafting: Click [CRAFT] → instant completion → Completed section
   - Placement: Click [Place on Shelf] → material added to shelf

7. **Time System**
   - Clock UI (shows game time)
   - Time progression (14 min real time = full day)
   - Event triggers:
     - 12:15 PM: Nap time (transition to nap phase)
     - 2:30 PM: Wakeup (children wake, brief freeplay)
     - 3:00 PM: End of day (summary screen)

8. **UI (Minimal)**
   - Clock (top-right)
   - Energy meter (top-left, optional)
   - Notifications (top-center, text only)
   - ESC menu (inventory, resume, quit)
   - End-of-day summary (simple stats)

9. **Animations (Essential Only)**
   - Virginia walking (existing)
   - Children walking (simple 2-frame)
   - Children sitting (static sprite)
   - Loading bars (presentation, soothing)
   - Sparkle effect (breakthrough, crafting complete)
   - Fade transitions (scene changes)

10. **Tutorial (Minimal)**
    - First child arrival: "Click Emma to observe!"
    - First material presentation: "Try presenting a material!"
    - Nap minigame: Brief instructions popup
    - Crafting: "Welcome to crafting!" popup
    - Contextual tooltips (appear when relevant)

**Deliverable:**
- Playable day loop (arrive → teach → nap → craft → summary)
- Core mechanics functional
- Satisfying enough to want to replay

**Success Criteria:**
- Player can complete one full day
- Nap minigame is fun (not frustrating)
- Crafting feels satisfying (instant feedback)
- Want to play another day

---

### Phase 2: Depth & Variety - Week 3-4

**Goal:** Add replayability and progression

**Features:**

1. **Playground Scene**
   - Outdoor environment (sky, grass, fence)
   - Play equipment (climber, slide, sandbox, swings)
   - Children play autonomously (run, climb, swing)
   - Virginia supervises (click children to observe)
   - Transition at 11:30 AM (classroom → playground)
   - Transition at 12:15 PM (playground → nap time)

2. **Advanced Crafting**
   - Time-based crafting (Tier 2 materials take 10-15 game minutes)
   - Crafting timer (progress bar, time remaining)
   - Multiple recipes (add 5 Tier 2 recipes):
     - Polished Pouring Set
     - Color Tablets
     - Object-to-Picture Matching Set
     - Knobbed Cylinders (beginner)
     - Dressing Frame
   - Ingredient system (collect items from village, check inventory)

3. **Collection System (Village Integration)**
   - Collectible items in village scene (pinecones, jars, buttons)
   - Click to collect (add to inventory)
   - Inventory display (items with quantities)
   - Crafting checks inventory (green/red checkmarks)

4. **Expanded Child States**
   - CLINGY state (follows Virginia, slows her 50%)
   - Redirect action (offer material to clingy child)
   - Child-to-child conflict (rare, simple: one child upset)
   - Parallel play (children work near each other, no interaction yet)

5. **Material Quality Tiers**
   - Tier 1-2 materials available
   - Visual distinction (Tier 2 has subtle glow)
   - Quality affects engagement (Tier 2 = longer concentration)
   - Breakthrough moments (more likely with Tier 2)

6. **Trust System (Basic)**
   - Trust meter (0-100%)
   - Gain trust from breakthroughs, good naps
   - Unlock Tier 2 recipes at 25% trust
   - Simple progression (Observer → Assistant)

7. **Observation Journal**
   - Simple notes page (ESC → Journal)
   - Auto-generated entries (when you observe child)
   - Shows sensitive periods, suggested materials
   - Historical log (previous days)

8. **Enhanced Animations**
   - Virginia kneeling (material presentation)
   - Children crying (upset state)
   - Z Z Z particles (sleeping children)
   - Breakthrough cutscene (child pop, sparkles, text)
   - Material quality glow (Tier 2)

9. **After-School Time**
   - Optional stay (3:00-5:00 PM)
   - Craft more materials (no children present)
   - 5:00 PM hard cutoff (forced exit to cottage)
   - Choice prompt: [Stay] or [Go Home]

10. **Day Persistence (Save System)**
    - Save game state at end of day
    - Load game state on next play
    - Track trust, crafted materials, child progress over days
    - Multiple day progression (Day 1, Day 2, etc.)

**Deliverable:**
- Replayable multi-day experience
- Progression system (trust unlocks)
- Depth (playground, collection, crafting strategy)

**Success Criteria:**
- Players return for multiple days
- Progression feels meaningful (unlocks)
- Crafting decisions matter (time management)

---

### Phase 3: Polish & Content - Week 5-6

**Goal:** Make it feel complete and cozy

**Features:**

1. **Tier 3-4 Materials**
   - Heirloom quality (Tier 3): Pink Tower, advanced materials
   - Legacy quality (Tier 4): Museum-quality, rare crafts
   - Full quality visual distinction (glow, sparkle, aura)
   - Long crafting times (30-90 game minutes)

2. **Full Trust Progression**
   - All 4 trust levels (Observer → Assistant → Guide-in-Training → Lead Guide)
   - Unlock events (director observation, lead guide mentorship)
   - Tier 3-4 recipe unlocks (at 50%, 75% trust)
   - Progression cutscenes (promotions celebrated)

3. **Advanced Child AI**
   - Breakthrough intelligence (children remember materials)
   - Skill levels (track progress over weeks)
   - Personality-driven behavior (bold vs. cautious differences)
   - Social interactions (children comfort each other)

4. **Arrival & Pickup Animations**
   - Staggered child arrival (7:45-8:00 AM)
   - Parent pickup (3:00-3:15 PM)
   - Parent dialogue (optional, brief comments)
   - Door animations (open/close)

5. **Full Tutorial System**
   - First-day guided experience (step-by-step)
   - Progressive tutorials (Day 2 teaches tiers, Day 3 teaches trust)
   - Settings toggle (full/minimal/off)
   - Hint system (appears when stuck)

6. **Material Placement Customization**
   - Drag-and-drop materials on shelves
   - Reorganize classroom (move materials between shelves)
   - Shelf appeal rating (visual indicator)
   - Remove materials (return to inventory)

7. **Seasonal Variations (Optional)**
   - Fall, winter, spring, summer
   - Visual changes (classroom decorations, playground foliage)
   - Seasonal crafts (fall acorn basket, spring flower arrangement)

8. **Sound & Music**
   - Full audio design (ambient sounds, effects, music)
   - Morning classroom music (gentle, energetic)
   - Nap time lullaby (peaceful)
   - Breakthrough chime (satisfying)
   - Ambient toddler sounds (babbling, laughing)

9. **Achievements & Milestones**
   - Achievement list (craft all Tier 1 materials, etc.)
   - Milestones (first breakthrough, perfect nap, etc.)
   - Unlockable content (new recipes, customization options)
   - Completionist goals (optional, for engaged players)

10. **End-Game Content**
    - Second classroom (preschool 3-6 age group)
    - Expanded playground (new equipment)
    - Relationship system (parents, director, Robert)
    - Montessori conference event (special rewards)

**Deliverable:**
- Complete, polished experience
- Long-term engagement (weeks of content)
- Cozy, satisfying endgame

**Success Criteria:**
- Players reach Lead Guide (75%+ trust)
- Craft Tier 4 materials
- Feel sense of mastery and accomplishment

---

## Feature Priority Matrix

### Must-Have (MVP - Phase 1)

| Feature | Priority | Complexity | Time Estimate |
|---------|----------|------------|---------------|
| Classroom scene layout | CRITICAL | Medium | 1 day |
| 12 children spawning | CRITICAL | Medium | 1 day |
| Basic child AI (4 states) | CRITICAL | High | 2 days |
| Click to observe | CRITICAL | Low | 0.5 day |
| Present material action | CRITICAL | Medium | 1 day |
| Nap minigame (simple) | CRITICAL | Medium | 1 day |
| Crafting menu (instant) | CRITICAL | Medium | 1 day |
| Time system + events | CRITICAL | Low | 0.5 day |
| End-of-day summary | CRITICAL | Low | 0.5 day |
| Basic animations | CRITICAL | Medium | 2 days |
| **TOTAL** | | | **~10 days** |

---

### Should-Have (Phase 2)

| Feature | Priority | Complexity | Time Estimate |
|---------|----------|------------|---------------|
| Playground scene | HIGH | Medium | 1.5 days |
| Time-based crafting | HIGH | Low | 0.5 day |
| Tier 2 materials | HIGH | Low | 0.5 day |
| Collection system | HIGH | Medium | 1 day |
| Trust system | HIGH | Low | 0.5 day |
| Clingy children | HIGH | Low | 0.5 day |
| Observation journal | HIGH | Medium | 1 day |
| Save system | HIGH | High | 2 days |
| Enhanced animations | HIGH | Medium | 1.5 days |
| After-school time | HIGH | Low | 0.5 day |
| **TOTAL** | | | **~9 days** |

---

### Nice-to-Have (Phase 3)

| Feature | Priority | Complexity | Time Estimate |
|---------|----------|------------|---------------|
| Tier 3-4 materials | MEDIUM | Low | 0.5 day |
| Full trust progression | MEDIUM | Low | 0.5 day |
| Advanced child AI | MEDIUM | High | 2 days |
| Arrival/pickup animations | MEDIUM | Medium | 1 day |
| Full tutorial system | MEDIUM | Medium | 1.5 days |
| Material customization | LOW | Medium | 1 day |
| Seasonal variations | LOW | High | 3 days |
| Full sound design | MEDIUM | Medium | 2 days |
| Achievements | LOW | Low | 0.5 day |
| End-game content | LOW | High | 5+ days |
| **TOTAL** | | | **~17 days** |

---

## Implementation Order (Step-by-Step)

### Week 1: Foundation

**Day 1: Classroom Scene**
- Create ClassroomScene.js
- Room layout (walls, floor, shelves, rugs)
- Camera setup (fixed, 900x650)
- Virginia sprite (spawn, walking works)

**Day 2: Children Basics**
- Spawn 12 children (color-coded)
- Simple walking animation (2-frame)
- Children walk to random rug (pathfinding)

**Day 3: Child AI (Part 1)**
- State machine (CHOOSING, WORKING, WANDERING)
- Material selection logic (random for now)
- Work duration (1-3 minutes)

**Day 4: Child AI (Part 2)**
- UPSET state (trigger when mood < 20)
- Crying animation
- Comfort action (Virginia clicks, loading bar, mood increases)

**Day 5: Material Presentation**
- Click child → menu appears (Observe, Present Material)
- Observation tooltip (name, mood, activity)
- Present Material menu (3 materials listed)
- Select material → presentation animation (loading bar)

---

### Week 2: Core Gameplay

**Day 6: Nap Minigame**
- 12:15 PM transition → nap mats appear
- Children on mats (some asleep, some awake)
- Soothe action (click awake child, loading bar, they sleep)
- Success condition (all asleep)

**Day 7: Crafting System**
- Crafting table sprite (clickable)
- Crafting menu UI (recipe list, selected recipe panel)
- 3 instant recipes (Tier 1)
- Craft → Completed section
- Place on shelf (material added to shelf sprite)

**Day 8: Time & Events**
- Clock UI (top-right)
- Time progression (14 min day)
- Event triggers (12:15 nap, 2:30 wakeup, 3:00 end)
- End-of-day summary screen (simple stats)

**Day 9: Polish & Testing**
- Bug fixes (pathfinding, state machine)
- Animations polish (sparkle effects, loading bars)
- Notifications (text appears/fades)
- Fade transitions (scene changes)

**Day 10: Tutorial & Onboarding**
- First-day tooltips (click Emma, present material, etc.)
- Nap tutorial popup
- Crafting tutorial popup
- Playtesting (does it feel fun?)

---

### Week 3-4: Depth (Phase 2)

*(Follow similar day-by-day plan for Phase 2 features)*

---

## Testing Milestones

### Milestone 1: Playable Day Loop (End of Week 2)

**Test:**
- Can player complete one full day?
- Is nap minigame fun (not frustrating)?
- Does crafting feel satisfying?
- Do children behave believably?

**Success Criteria:**
- Day completes without crashes
- Nap minigame completable in < 2 minutes
- Crafting intuitive (no confusion)
- Children's behavior makes sense

---

### Milestone 2: Multi-Day Progression (End of Week 4)

**Test:**
- Can player play multiple days?
- Does progression feel meaningful?
- Is trust system clear?
- Does playground add value (not boring)?

**Success Criteria:**
- Save/load works (progress persists)
- Trust unlocks feel rewarding
- Playground is relaxing breather phase
- Players want to continue to Day 3+

---

### Milestone 3: Complete Experience (End of Week 6)

**Test:**
- Can player reach Lead Guide (75% trust)?
- Are Tier 3-4 materials worth the effort?
- Does game feel complete (not unfinished)?
- Is it cozy and satisfying?

**Success Criteria:**
- Long-term progression satisfying (weeks of play)
- Tier 4 materials feel special
- No major bugs or frustrations
- Players feel accomplished (mastery)

---

## Risk Management

### Potential Risks & Mitigation

**Risk 1: Child AI Too Complex (Overwhelming)**
- **Mitigation:** Start simple (4 states MVP), add complexity in Phase 2
- **Fallback:** If AI too buggy, reduce to 3 states (WORKING, WANDERING, UPSET)

**Risk 2: Nap Minigame Frustrating (Not Fun)**
- **Mitigation:** Playtest early (Week 2), adjust difficulty
- **Fallback:** Make it easier (auto-soothe after timeout, or skip minigame entirely → all children auto-sleep)

**Risk 3: Crafting Grindy (Tedious)**
- **Mitigation:** Start with instant crafts (MVP), add time-based in Phase 2 only if fun
- **Fallback:** Keep all crafts instant, focus on material variety not time management

**Risk 4: Performance Issues (12 Children + Effects)**
- **Mitigation:** Test performance early (Week 1), optimize sprites/animations
- **Fallback:** Reduce children to 8, or simplify animations (static sprites)

**Risk 5: Scope Creep (Too Many Features)**
- **Mitigation:** Strict MVP definition, resist adding "just one more thing"
- **Fallback:** Cut Phase 3 features, ship Phase 2 as "complete" game

---

## Post-MVP Roadmap (Future Updates)

### Update 1: Playground & Collection (Month 2)
- Add playground scene
- Village collection integration
- Time-based crafting

### Update 2: Progression & Depth (Month 3)
- Full trust system (4 levels)
- Tier 3-4 materials
- Advanced child AI

### Update 3: Polish & Content (Month 4)
- Seasonal variations
- Full sound design
- End-game content (second classroom)

### Update 4: Community Features (Month 5+)
- Achievements
- Leaderboards? (optional)
- User-created materials? (mod support?)

---

## Success Metrics

### MVP Success (Week 2)

**Quantitative:**
- Playtesters complete Day 1: 90%+
- Average session length: 10-15 minutes
- Crash rate: <5%

**Qualitative:**
- "I want to play another day": 80%+
- "Nap minigame was fun": 70%+
- "I felt like a real teacher": 60%+

---

### Full Release Success (Week 6)

**Quantitative:**
- Average playtime: 5+ hours (multiple days)
- Retention (return next day): 60%+
- Completion (reach Lead Guide): 30%+

**Qualitative:**
- "This taught me about Montessori": 80%+
- "It felt cozy and relaxing": 90%+
- "I felt accomplished": 70%+

---

## Final Recommendations

### What to Build FIRST (This Week)

1. **Classroom scene layout** (foundation)
2. **12 children spawning and walking** (core mechanic)
3. **Click to observe** (basic interaction)
4. **Present material action** (core teaching loop)
5. **Nap minigame (simple version)** (unique mechanic)

**Why:** These prove the core loop is fun before investing in depth

---

### What Can WAIT (Phase 2-3)

1. **Playground** (nice, but not essential to core loop)
2. **Time-based crafting** (instant crafts work for MVP)
3. **Trust progression** (can add after proving fun)
4. **Advanced child AI** (4 states enough for MVP)
5. **Full tutorial** (tooltips sufficient initially)

**Why:** These add depth and replayability AFTER core is proven

---

### What to CUT if Time is Short

1. **After-school time** (optional extension, not critical)
2. **Observation journal** (notes can be mental for MVP)
3. **Clingy children** (cute, but adds complexity)
4. **Material customization** (placement is enough)
5. **Seasonal variations** (polish, not core)

**Why:** These are polish, not gameplay essentials

---

## Next Steps (Immediate Action Plan)

### This Week (Implementation Starts)

**Day 1-2:**
- Set up ClassroomScene.js (copy structure from CottageScene)
- Create room layout (walls, floor, shelves, rugs, door)
- Spawn Virginia sprite
- Test walking in classroom

**Day 3-4:**
- Create 12 child sprites (color-coded, simple walk animation)
- Spawn children on rugs
- Implement basic pathfinding (walk to rug, walk to shelf)

**Day 5:**
- Implement state machine (CHOOSING, WORKING, WANDERING)
- Material selection logic (random for now)
- Children sit on rugs and "work" for 1-3 minutes

**Day 6-7:**
- Click child → observation tooltip
- Click child → present material menu
- Presentation animation (loading bar, child transitions to WORKING)

**Sprint Review (End of Week):**
- Playtest core loop (observe → present → children work)
- Does it feel fun? Adjust before continuing

---

**This is the roadmap. Let's build the classroom!**

---

*Sally, UX Designer*
*MontessoriGame Development Team*
