# UX Design Summary: Toddler Classroom Gameplay
**Author:** Sally (UX Designer)
**Date:** February 10, 2026
**Status:** Complete - Ready for Implementation
**Project:** MontessoriGame - Comprehensive UX Design Package

---

## Executive Summary

This document package contains **10 comprehensive UX design documents** that define the complete classroom gameplay experience for MontessoriGame. All critical UX questions from the original brief have been answered with implementation-ready specifications.

**What's Designed:**
- Complete daily schedule and time flow
- Classroom and playground scene layouts
- Child behavior and interaction systems
- Crafting system UX and material presentation
- UI/HUD design and menu systems
- Progression, onboarding, and tutorial flow
- Animation and polish specifications
- Implementation priorities and MVP scope

---

## Document Index

### Core Design Documents

**[UX-01: Classroom Scene Design](/Users/robertlewis/MontessoriGame/_bmad-output/planning-artifacts/ux-01-classroom-scene-design.md)**
- Room layout and spatial design (900x650 viewport)
- Multi-room system (classroom + playground + nap area)
- Camera system (fixed, see whole room)
- Visual zones and Montessori areas
- Shelf system and material placement
- Nap area and crafting table design

**[UX-02: Daily Schedule & Time Flow](/Users/robertlewis/MontessoriGame/_bmad-output/planning-artifacts/ux-02-daily-schedule-time-flow.md)**
- Complete timeline (7:45 AM - 5:00 PM)
- Morning work cycle (core teaching phase)
- Outdoor playground time (11:30 AM - 12:15 PM)
- Nap time minigame (12:15-2:30 PM)
- Crafting windows (during nap, after school)
- Time progression system (14 minutes real time per day)
- ESC pause functionality

**[UX-03: Child Behavior & Interaction System](/Users/robertlewis/MontessoriGame/_bmad-output/planning-artifacts/ux-03-child-behavior-interaction-system.md)**
- Child state machine (9 states: choosing, working, wandering, upset, clingy, sleeping, etc.)
- AI decision-making (material selection, movement patterns)
- Context-sensitive interactions (observe, present, comfort, redirect)
- Visual feedback system (icons, animations, color-coding)
- Mood system (0-100 scale)
- Temperament influence on behavior
- Sensitive period mechanics

**[UX-04: UI/HUD Layout & Menus](/Users/robertlewis/MontessoriGame/_bmad-output/planning-artifacts/ux-04-ui-hud-layout-menus.md)**
- HUD elements (clock, energy meter, notifications)
- ESC menu system (inventory, journal, settings)
- Crafting menu interface
- Observation window design
- Child interaction menus
- Nap time UI (progress indicators)
- End-of-day summary screen
- Material placement interface

**[UX-05: Material Presentation & Feedback](/Users/robertlewis/MontessoriGame/_bmad-output/planning-artifacts/ux-05-material-presentation-feedback.md)**
- Material presentation flow (quick vs. breakthrough)
- Engagement loading bar system
- "Aha moment" cutscene design
- Quality tier visual differences (Tier 1-4)
- Child skill progression feedback
- Trust and relationship meters
- Success celebration vs. gentle failure handling
- Sound design integration

**[UX-06: Crafting UX Design](/Users/robertlewis/MontessoriGame/_bmad-output/planning-artifacts/ux-06-crafting-ux-design.md)**
- Crafting timeline (when/where it happens)
- Crafting menu interface (recipe book, ingredients)
- Time-based vs. instant crafting
- Material placement system
- Recipe discovery and unlocking
- Batch crafting (future feature)
- Strategic time management
- Quality tier crafting times

**[UX-07: Playground Scene Design](/Users/robertlewis/MontessoriGame/_bmad-output/planning-artifacts/ux-07-playground-scene-design.md)**
- Outdoor environment layout
- Play equipment design (climber, slide, sandbox, swings)
- Children's outdoor behavior
- Supervision gameplay (hands-off observation)
- Transition flow (classroom ↔ playground)
- Minimal interaction design (breather phase)
- Visual and audio design

**[UX-08: Progression & Onboarding Design](/Users/robertlewis/MontessoriGame/_bmad-output/planning-artifacts/ux-08-progression-onboarding-design.md)**
- First day experience (detailed tutorial flow)
- Tutorial philosophy (show, don't tell)
- Short/mid/long-term progression systems
- Trust levels (Observer → Assistant → Guide-in-Training → Lead Guide)
- Milestone events and unlocks
- Success/failure states (no game over, gentle corrections)
- Tutorial toggles and accessibility

**[UX-09: Animation & Polish Guide](/Users/robertlewis/MontessoriGame/_bmad-output/planning-artifacts/ux-09-animation-polish-guide.md)**
- Animation priority tiers (must-have, should-have, nice-to-have)
- Critical animations (14 MVP essentials)
- Breakthrough cutscene design
- Visual effects (sparkles, glows, particles)
- Sound design integration
- Performance considerations
- Asset creation checklist

**[UX-10: Implementation Priorities & MVP](/Users/robertlewis/MontessoriGame/_bmad-output/planning-artifacts/ux-10-implementation-priorities-mvp.md)**
- MVP definition (minimum viable product)
- Three-phase development plan (Weeks 1-6)
- Feature priority matrix
- Step-by-step implementation order
- Testing milestones
- Risk management strategies
- Post-MVP roadmap

---

## Key Design Decisions

### Answered from Original Brief

**1. Visual Layout & Scene Design ✅**
- **Decision:** 900x650 viewport (medium size), fixed camera, see whole room
- **Rationale:** Larger than cottage (more space for 12 children) but still intimate and cozy

**2. Daily Schedule & Time Flow ✅**
- **Decision:** 7:45 AM - 5:00 PM school day, 14 minutes real time, ESC pauses everywhere
- **Rationale:** Consistent time flow, gentle pacing, player control when needed

**3. Crafting Timing & Location ✅**
- **Decision:** Nap time (12:15-2:30 PM) in same room as sleeping children, optional after-school (3:00-5:00 PM)
- **Rationale:** Natural rhythm, adds strategic challenge (nap minigame first, then crafting reward)

**4. Interaction System ✅**
- **Decision:** Context-sensitive (click child → relevant actions appear based on state)
- **Rationale:** Simple for MVP, intuitive, avoids overwhelming menus

**5. Playground Gameplay ✅**
- **Decision:** Hands-off supervision, observation-focused, breather phase between intense classroom and nap time
- **Rationale:** Authentic Montessori outdoor time, rhythm variety, low-pressure moment

**6. Material Presentation ✅**
- **Decision:** Mix of quick action (loading bar) for standard presentations, short cutscene (3-4 seconds) for breakthrough moments
- **Rationale:** Balance efficiency and celebration, different feedback for different outcomes

**7. Child Behavior System ✅**
- **Decision:** 9-state machine, mood-driven, temperament-influenced, sensitive period-based material selection
- **Rationale:** Complex enough to feel alive, simple enough to implement and balance

**8. Nap Minigame ✅**
- **Decision:** Challenge to get all 12 children asleep (some wake while you're soothing others), timing matters (faster = more crafting time)
- **Rationale:** Unique mechanic, authentic toddler experience, gentle difficulty, satisfying when mastered

**9. Progression System ✅**
- **Decision:** Trust-based (0-100%), unlocks recipes and titles, earned through teaching quality
- **Rationale:** Meaningful long-term goal, ties to gameplay (breakthroughs, naps), feels like career growth

**10. Tutorial & Onboarding ✅**
- **Decision:** Contextual tooltips (appear when relevant), guided first day, progressive discovery
- **Rationale:** Show don't tell, gentle learning curve, respects player intelligence

---

## Core Gameplay Loop (Final)

### Minute-to-Minute (What You're DOING)

**Morning Work Cycle (8:00-11:30 AM):**
1. Observe children (click to see mood, needs, sensitive periods)
2. Present materials (select from inventory, match to child's needs)
3. Watch children work (see engagement, concentration, breakthrough moments)
4. Respond to upsets (comfort crying children)
5. Redirect clingy children (offer materials, encourage independence)
6. Mentally plan (what materials to craft during nap time)

**Playground Time (11:30 AM-12:15 PM):**
1. Supervise (watch children play on equipment)
2. Observe movement patterns (who climbs, who's cautious)
3. Check moods (click children for quick status)
4. Appreciate the moment (breather, cozy outdoor vibe)

**Nap Time Minigame (12:15-12:30 PM approx):**
1. Soothe awake children (click, hold for loading bar)
2. Monitor sleeping children (some may wake up)
3. Juggle priorities (who needs soothing most urgently)
4. Succeed when all asleep (satisfying moment)

**Crafting Time (12:30-2:30 PM):**
1. Open crafting menu (click crafting table)
2. Browse recipes (see what's available, check ingredients)
3. Select recipe (based on morning observations)
4. Craft materials (instant for Tier 1, timed for Tier 2+)
5. Place on shelves (make materials available for children)

**Afternoon & Pickup (2:30-3:15 PM):**
1. Gentle activities (children waking, calm play)
2. Parents arrive (watch pickups, optional dialogue)
3. End-of-day summary (celebrate successes)
4. Choice: stay and craft more OR go home

---

## Emotional Arc of a School Day

**7:45 AM (Arrival):** Anticipation - "What will today bring?"

**8:00-11:30 AM (Teaching):** Engagement - "I'm helping these children learn!"

**11:30 AM-12:15 PM (Playground):** Relaxation - "This is peaceful and joyful"

**12:15-12:30 PM (Nap Minigame):** Challenge - "Can I get everyone asleep?"

**12:30-2:30 PM (Crafting):** Creativity - "I'm building something beautiful"

**2:30-3:00 PM (Wakeup):** Calm - "Winding down, reflective"

**3:15 PM (Summary):** Accomplishment - "I did it! Look at what we achieved!"

**Overall Feeling:** Cozy productivity, gentle challenge, visible impact, satisfying growth

---

## What Makes This Design Cozy

**No Fail States:**
- Can't game over
- Mistakes have gentle consequences (child loses interest, not punishment)
- Always forward progress

**Gentle Time Pressure:**
- Deadlines exist (7:45 AM arrival, nap time, 5:00 PM cutoff)
- But missing them isn't catastrophic
- Encourages rhythm, not stress

**Positive Reinforcement:**
- Breakthrough moments celebrated (sparkles, cutscenes, notifications)
- Success amplified (end-of-day summary highlights wins)
- Failures minimized (gentle hints, no alarms)

**Player Agency:**
- Choose what to craft, when
- Choose which children to focus on
- Choose to stay after school or go home
- Observe at your own pace

**Visible Impact:**
- Children visibly happier when you help them
- Materials you craft appear on shelves
- Trust meter increases (visible career growth)
- Skills improve over time (journal shows progress)

**Authentic Montessori:**
- "Follow the child" (observe, then respond)
- "Prepared environment" (crafting creates space for learning)
- "Hands-on learning" (materials matter, quality affects engagement)
- Education through gameplay (learn by doing, not lectures)

---

## Technical Feasibility

### Implementation Complexity

**Low Complexity (Easy):**
- Time system (clock UI, event triggers)
- Scene layout (room, shelves, rugs)
- Basic UI (menus, notifications)
- Fade transitions

**Medium Complexity (Moderate):**
- Child AI (state machine, pathfinding)
- Material presentation flow
- Crafting system (recipe menu, ingredient checking)
- Save/load system

**High Complexity (Challenging):**
- 12 children AI running simultaneously (performance)
- Nap minigame (juggling wakeups, timing)
- Observation journal (data structure, persistence)
- Playground scene (separate environment, transitions)

**Overall Assessment:** Achievable in 4-6 weeks with existing Phaser foundation

---

## Asset Requirements Summary

### Sprites Needed (MVP)

**Characters:**
- Virginia: Walking (existing), Idle (existing), Kneeling (NEW - 3 frames)
- Children x12: Walking (NEW - 2 frames/direction), Sitting (NEW - 1 frame), Sleeping (NEW - 1 frame), Awake on mat (NEW - 2 frames), Crying (NEW - 3 frames)

**Environments:**
- Classroom: Floor tiles (procedural), Walls (procedural), Shelves (NEW - 3 types), Rugs (NEW - 6-8), Door (NEW or reuse cottage), Nap mats (NEW - 12), Crafting table (NEW)
- Playground: Grass (procedural), Sky (procedural), Fence (NEW), Climber (NEW), Slide (NEW), Sandbox (NEW), Swings (NEW)

**Materials:**
- 10 material sprites (24x24 icons): Pouring Set, Spooning Transfer, Nature Basket, Pink Tower, Color Tablets, etc.

**Effects:**
- Sparkle particle (8x8 star - NEW)
- Z Z Z letters (16x16 each - NEW)
- Loading bar (UI - existing, needs polish)

**Total NEW Assets:** ~40 sprite frames (manageable)

---

## Open Questions Resolved

### From Mary's Business Analysis

**1. Crafting Timing:**
- ✅ **Answer:** Tier 1 instant, Tier 2+ time-based (balance speed vs. reward)

**2. Recipe Discovery:**
- ✅ **Answer:** Story progression (trust unlocks) + observation-based (see sensitive period → recipe hints)

**3. Duplicate Materials:**
- ✅ **Answer:** Can use all 3 (shelf capacity limit keeps it balanced)

**4. Seasonal Materials:**
- ✅ **Answer:** Post-MVP feature (all seasons available in base game for simplicity)

**5. Failure States:**
- ✅ **Answer:** No crafting failure, no "bad day" fail (cozy, not punishing)

**6. Energy System:**
- ✅ **Answer:** Yes, but slower drain at school than village (teaching is energizing!)

**7. Time Pressure:**
- ✅ **Answer:** Gentle structure (rhythm, not stress), deadlines exist but missing them isn't catastrophic

---

## Success Criteria (How We Know It's Working)

### Playtest Metrics

**Engagement:**
- Session length: 10-15 minutes (one day)
- Return rate: 60%+ (want to play next day)
- Completion: 90%+ finish Day 1

**Fun:**
- "Nap minigame was fun": 70%+
- "I felt like a real teacher": 60%+
- "I want to craft more materials": 70%+

**Cozy:**
- "It felt relaxing": 90%+
- "I felt stressed": <10%
- "I felt accomplished": 70%+

**Educational:**
- "I learned about Montessori": 80%+
- "I understand sensitive periods": 60%+
- "I want to learn more about this approach": 50%+

---

## Next Steps (Immediate)

### For Developers

**Read These First:**
1. UX-10 (Implementation Priorities) - understand MVP scope
2. UX-01 (Classroom Scene) - start building room
3. UX-03 (Child Behavior) - implement child AI

**Then Reference As Needed:**
- UX-02 (Daily Schedule) - event triggers, time system
- UX-04 (UI/HUD) - menu implementation
- UX-05 (Material Presentation) - interaction flows
- UX-06 (Crafting) - crafting menu implementation

**Start Building:**
- Week 1: Classroom scene, children spawning, basic AI
- Week 2: Interactions, nap minigame, crafting, time system

### For User/Client

**Review Documents:**
- UX-00 (this summary) - overall vision
- UX-10 (Implementation) - timeline and priorities
- Any specific area of interest (playground, crafting, etc.)

**Provide Feedback On:**
- Does this feel like the game you envisioned?
- Any concerns about scope or complexity?
- Prioritization decisions (agree with MVP choices?)

---

## Design Philosophy Summary

**Core Principles:**

1. **Cozy, Not Stressful**
   - No fail states, gentle consequences
   - Positive reinforcement, minimal punishment
   - Player agency and control

2. **Meaningful Choices**
   - Crafting decisions matter (time management, quality)
   - Material selection affects child engagement
   - Observation informs strategy

3. **Visible Impact**
   - Children's behavior changes based on your actions
   - Breakthrough moments celebrated
   - Progress tracked (journal, trust meter)

4. **Authentic Montessori**
   - Follow the child (observe first, respond to needs)
   - Prepared environment (materials matter)
   - Hands-on learning (children choose, explore)
   - Mixed ages (18-36 months together)

5. **Easy to Learn, Depth to Master**
   - Simple controls (click, select, observe)
   - Contextual interactions (not overwhelming)
   - Strategic depth (material matching, time management)
   - Long-term progression (trust, skills, recipes)

---

## Final Thoughts from Sally

Hey! If you're reading this, you've made it through all 10 design documents. I hope this gives you everything you need to bring the toddler classroom to life!

**What I'm Most Excited About:**
- The nap time minigame (unique, authentic, fun challenge)
- Breakthrough moments (satisfying "aha!" celebrations)
- Material crafting loop (meaningful choices, visible impact)
- Watching 12 toddlers learn and grow (cozy magic!)

**What I Think Will Resonate:**
- Montessori educators: Authenticity, respect for the philosophy
- Cozy gamers: Relaxing, no-pressure, satisfying progression
- Teaching sim fans: Meaningful classroom management, child development
- Crafting enthusiasts: Recipe discovery, quality tiers, time strategy

**Biggest Risk:**
- Child AI complexity (12 characters is a lot!)
- **Mitigation:** Start simple (4 states MVP), add complexity later

**Biggest Opportunity:**
- This could introduce thousands of players to Montessori education through gameplay
- It fills a niche (no games like this exist!)
- Potential for expansion (preschool, elementary, homeschool)

**My Recommendation:**
Build the MVP (Phase 1) first. Playtest it. Make sure the core loop is fun. THEN add depth (Phase 2-3). Don't try to build everything at once - the magic is in the basics done well.

Good luck building this! I can't wait to see these toddlers come alive! ✨

---

*Sally, UX Designer*
*MontessoriGame Development Team*
*February 10, 2026*
