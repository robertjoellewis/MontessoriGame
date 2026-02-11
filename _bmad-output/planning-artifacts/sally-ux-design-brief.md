# UX Design Brief for Sally
## Montessori Toddler Classroom - Core Gameplay Design

**Date:** February 9, 2026
**Project:** Montessori Game - School Scene Implementation
**Previous Work:** Business Analysis by Mary (completed)
**Your Role:** UX Designer - Define how the classroom gameplay actually FEELS and PLAYS

---

## PROJECT CONTEXT

### What We're Building
The **core mechanic** of the game - Virginia arrives at Little Sprouts Montessori school and teaches in a toddler classroom (ages 18-36 months, 12 children). This is the main gameplay loop that players will experience daily.

### Game Style
- **Visual:** Stardew Valley pixel art aesthetic
- **Genre:** Cozy teaching simulation with crafting elements
- **Philosophy:** Authentic Montessori education (prepared environment, following the child, hands-on learning)
- **Audience:** Players interested in Montessori education, teaching sims, cozy games

### Current Game Flow
1. Wake up at 7:00 AM in cottage
2. Walk through village to school
3. **[NEW]** Teach toddlers at school (7:45 AM - ?)
4. **[NEW]** Craft materials, interact with students, manage classroom

---

## WHAT MARY (BUSINESS ANALYST) COMPLETED

### ✅ Toddler Roster (Already in codebase)
12 children with names, ages, personalities, and sensitive periods:
- Emma (24mo, Cautious) - Order & Small Objects
- Marcus (30mo, Bold) - Movement & Language
- Lily (28mo, Social) - Language & Social Behavior
- Aiden (22mo, Independent) - Order & Small Objects
- Sofia (33mo, Sensitive) - Language & Social Behavior
- Noah (26mo, Easy-Going) - Movement & Language
- Mia (31mo, Bold) - Social Behavior & Movement
- Oliver (20mo, Cautious) - Order & Movement
- Zoe (29mo, Independent) - Small Objects & Language
- Elijah (34mo, Social) - Language & Social Behavior
- Ava (25mo, Bold) - Language & Movement
- Liam (27mo, Cautious) - Order & Toilet Learning

### ✅ Crafting System Design
**Core Loop:**
1. **Observe** toddlers → identify needs/sensitive periods
2. **Collect** items during village walks (stores, street, trash cans)
3. **Craft** Montessori materials (during nap time or after school)
4. **Present** materials to children based on development
5. **Watch them grow** with appropriate tools

**Quality Tiers:**
- **Tier 1:** Handmade (basic function, quick crafts)
- **Tier 2:** Classic Montessori (polished, proper materials)
- **Tier 3:** Heirloom (beautiful, high engagement)
- **Tier 4:** Legacy (museum-quality, guaranteed growth)

### ✅ Verified Montessori Materials
**Safe for Toddlers (18-36 months):**
- Pouring Set
- Dressing Frame (buttons)
- Object-to-Picture Matching Cards
- Language Basket
- Nesting Boxes/Cups
- Spooning Transfer (with safety progression)
- Color Tablets (older toddlers 24+)
- Pink Tower (simplified version or late-game)
- Knobbed Cylinders (with safety requirements)

**Starter Classroom Inventory (Day 1):**
- Basic pouring set
- Simple language baskets
- Nesting boxes
- Basic dressing frame
- Washing/cleaning materials
- Simple puzzles

**What Virginia Crafts:**
- New themed language baskets
- Additional pouring activities
- More complex dressing frames
- Advanced sensorial materials

### ✅ Documentation
- Full research report with sources
- Material verification and age appropriateness
- Starter classroom design
- Crafting system structure

**Reference Document:** `/Users/robertlewis/MontessoriGame/_bmad-output/planning-artifacts/toddler-classroom-crafting-system.md`

---

## YOUR MISSION (SALLY - UX DESIGNER)

You need to design **HOW THIS ACTUALLY PLAYS**. Mary figured out WHAT we're building. You need to figure out HOW it feels minute-to-minute.

---

## CRITICAL UX QUESTIONS YOU MUST ANSWER

### 1. Visual Layout & Scene Design
**Questions:**
- What does the classroom look like?
  - Stardew-style small viewport (like cottage) with black borders?
  - Or full scrolling scene (like village)?
- How big is the classroom?
- Where are the shelves, tables, rugs, door?
- How does the camera work?
- Can Virginia walk around freely?
- Do children move around or stay in zones?

**Design Deliverable:**
- Classroom layout sketch/description
- Camera system specification
- Movement/navigation design

---

### 2. Minute-to-Minute Gameplay Loop
**Questions:**
- What is the player DOING second-to-second?
- How do you interact with a child?
  - Click on them? Walk up to them? Automatic?
- What happens when you interact?
  - Dialogue box? Observation notes? Material presentation menu?
- How does "observation" work?
  - Is there an observation UI? Do you take notes?
  - How do you identify what a child needs?
- What does "presenting a material" look like?
  - Do you drag materials from inventory?
  - Is there an animation/cutscene?
  - Does the child immediately start working?

**Design Deliverable:**
- Interaction flow diagram (player → child → material → growth)
- UI mockup descriptions for each interaction type
- Animation/feedback moments

---

### 3. Daily Schedule & Time Flow
**Questions:**
- What time does school start? (Arrival time: 7:45 AM?)
- What's the daily schedule?
  - Circle time? Free work period? Snack? Outdoor time? Nap?
- How fast does time move in the classroom?
  - Real-time? Accelerated? Pausable?
- When do specific events happen?
  - Children arriving (staggered or all at once?)
  - Nap time (when does Virginia craft?)
  - End of day (when do parents pick up?)
- Can Virginia leave the classroom during the day?
  - Bathroom? Supply closet? Outdoor area?

**Design Deliverable:**
- Daily schedule timeline (7:45 AM → school end)
- Time progression system design
- Event trigger timing

---

### 4. Child State & Behavior System
**Questions:**
- What states can children be in?
  - Working with material? Wandering? Upset? Tired? Hungry?
- How do you know what a child needs?
  - Visual indicators (icons, animations, colors)?
  - Observation UI with notes?
  - Automatic tooltips?
- How do children move around the classroom?
  - Free roaming? Fixed stations? Path-based?
- Do children interact with each other?
  - Conflicts? Cooperation? Sharing materials?
- What happens if Virginia ignores a child's needs?
  - Tantrum? Disengagement? Energy cost?

**Design Deliverable:**
- Child state machine (states and transitions)
- Visual feedback system for child needs
- Behavior and consequence design

---

### 5. Crafting Integration
**Questions:**
- WHEN does crafting happen?
  - During nap time (in classroom)?
  - After school (at home)?
  - Early morning before school?
- WHERE does crafting happen?
  - Crafting table in classroom?
  - Workshop at home?
  - Both?
- What's the crafting UI/UX?
  - Recipe book menu?
  - Drag-and-drop ingredients?
  - One-click craft with confirmation?
- How long does crafting take?
  - Instant (Tier 1)?
  - Real-time waiting (Tier 2-4)?
  - Skip time forward?
- Can you craft multiple items?
  - Queue system?
  - Batch crafting?

**Design Deliverable:**
- Crafting timing and location design
- Crafting UI mockup description
- Time management integration

---

### 6. Material Placement & Storage
**Questions:**
- Where do crafted materials go?
  - Automatically on shelves?
  - Inventory first, then place manually?
- How do you organize the classroom?
  - Drag materials to shelf positions?
  - Fixed shelf slots?
  - Auto-organize by Montessori areas?
- Can you rearrange the classroom?
  - Move furniture?
  - Customize layout?
- Is there a limit to materials?
  - Shelf space constraints?
  - Unlimited storage?

**Design Deliverable:**
- Material storage and placement system
- Classroom organization mechanics
- Inventory vs. placed materials design

---

### 7. Progression & Feedback
**Questions:**
- How does the player know they're succeeding?
  - Child happiness meter?
  - Learning progress bars?
  - Milestones notifications?
- What are the win/loss conditions?
  - Can you fail a day?
  - What happens if children are unhappy?
- How do you unlock new recipes?
  - Level up? Story progression? Experimentation?
- What's the long-term goal?
  - Become Lead Guide?
  - All children reach milestones?
  - Build perfect classroom?

**Design Deliverable:**
- Feedback and reward system design
- Progression mechanics
- Success/failure states

---

### 8. UI/HUD Design
**Questions:**
- What's on screen during classroom gameplay?
  - Clock (time of day)?
  - Energy meter?
  - Mission tracker?
  - Child status indicators?
- Where are these elements positioned?
  - Fixed HUD (Stardew style)?
  - Minimalist (only show when needed)?
- How do you access menus?
  - Crafting menu (key? button? clock?)
  - Child observation notes (automatic? manual?)
  - Material inventory (ESC menu? separate key?)
- Is there an end-of-day summary screen?
  - What info is shown?
  - Rewards? Feedback? Next day preview?

**Design Deliverable:**
- HUD layout mockup description
- Menu navigation flow
- Screen transition design

---

### 9. Animation & Polish Moments
**Questions:**
- What moments deserve special animations/effects?
  - Child has "aha moment" with material?
  - Virginia presents material to child?
  - Crafting completion?
  - Child reaches milestone?
- What's the visual language for success?
  - Sparkles? Hearts? Stars?
  - Sound effects?
- How do you show child growth over time?
  - Before/after sprites?
  - Ability unlocks?
  - Visual indicators?

**Design Deliverable:**
- Key animation moments list
- Visual feedback language guide
- Polish and juice opportunities

---

### 10. Player Onboarding
**Questions:**
- How does the player learn the classroom mechanics?
  - Tutorial on first day?
  - Mentor/colleague guides you?
  - Trial and error?
- What's explained vs. discovered?
  - Crafting system (taught or explored)?
  - Child needs (obvious or subtle)?
- Is there a difficulty curve?
  - Start with fewer children?
  - Simpler needs first?

**Design Deliverable:**
- Onboarding flow design
- Tutorial vs. discovery balance
- First-day experience design

---

## OPEN DESIGN QUESTIONS FROM MARY

These need UX input to answer:

1. **Crafting Timing:** Should Tier 1 crafts be instant, or should everything take time?
2. **Recipe Discovery:** Unlock through story only, or let players experiment with ingredients?
3. **Seasonal Materials:** Should some crafts only be available in certain seasons?
4. **Failure States:** Can crafting fail if rushed? Can you have a "bad day" teaching?
5. **Duplicate Materials:** If Virginia makes 3 pouring sets, can she use all 3 or just 1?
6. **Energy System:** Does teaching drain energy? Do you need breaks/coffee?
7. **Time Pressure:** Is there pressure to complete tasks, or is it relaxed/cozy?

---

## DESIGN PRINCIPLES TO FOLLOW

### Montessori Philosophy
- **Prepared Environment:** Virginia creates the space for learning
- **Follow the Child:** Observe first, respond to needs (not impose agenda)
- **Hands-On Learning:** Children learn by doing, not being told
- **Mixed Ages:** Children learn from each other (20mo and 34mo together)

### Game Design Goals
- **Cozy, Not Stressful:** Like Stardew Valley, relaxing gameplay
- **Meaningful Choices:** Crafting decisions matter
- **Visible Impact:** See children grow because of your actions
- **Educational:** Players learn about Montessori through play
- **Satisfying Progression:** Start simple, unlock complexity

### Technical Constraints
- **Pixel Art:** Stardew Valley aesthetic, procedurally generated sprites
- **Phaser 3:** Game engine, scene-based architecture
- **Performance:** 12 children on screen, needs to run smoothly
- **Existing Systems:** Clock, energy meter, mission tracker, inventory menu already built

---

## YOUR DELIVERABLES

Please create UX design documents covering:

1. **Classroom Scene Design Document**
   - Visual layout, camera system, navigation
   - Dimensions, zones, furniture placement

2. **Interaction Design Document**
   - Player → child interaction flows
   - Material presentation system
   - Observation and note-taking mechanics

3. **Daily Schedule & Time Management Design**
   - Timeline of events
   - Time progression system
   - Crafting timing and location

4. **UI/UX Specification**
   - HUD layout
   - Menu navigation
   - Child status indicators
   - Feedback systems

5. **Child Behavior System Design**
   - State machine for children
   - Visual feedback for needs
   - Interaction outcomes

6. **Crafting UX Design**
   - Where/when crafting happens
   - UI for recipe selection and creation
   - Material storage and placement

7. **Progression & Onboarding Design**
   - First day experience
   - Tutorial flow
   - Success/failure states

8. **Animation & Polish Guide**
   - Key moments that need special treatment
   - Visual feedback language

9. **Answers to Open Questions**
   - Decisions on Mary's open questions
   - Rationale for each choice

10. **Implementation Priority**
    - What to build first (MVP)
    - What can wait for later versions

---

## RESOURCES AVAILABLE TO YOU

### Existing Codebase
- `/Users/robertlewis/MontessoriGame/src/scenes/` - Existing scenes (CottageScene, VillageScene)
- `/Users/robertlewis/MontessoriGame/src/ui/` - UI components (Clock, EnergyMeter, InventoryMenu, MissionTracker)
- `/Users/robertlewis/MontessoriGame/src/data/children.js` - Toddler data
- `/Users/robertlewis/MontessoriGame/asset-viewer.html` - Visual asset reference

### Planning Documents
- `/Users/robertlewis/MontessoriGame/_bmad-output/planning-artifacts/toddler-classroom-crafting-system.md` - Mary's full business analysis

### Game Files
- All markdown files in `_bmad/` folder
- Existing scene code for reference

---

## SUCCESS CRITERIA

Your designs should:
1. ✅ Feel cozy and relaxing (not stressful or grindy)
2. ✅ Make sense to non-Montessori players (approachable)
3. ✅ Feel authentic to Montessori educators (accurate)
4. ✅ Create satisfying gameplay loops (minute-to-minute fun)
5. ✅ Support long-term progression (days/weeks of play)
6. ✅ Be technically feasible to implement in Phaser 3
7. ✅ Integrate smoothly with existing game systems
8. ✅ Provide clear answers for developers to start building

---

## NEXT STEPS AFTER YOUR WORK

Once you complete the UX design:
1. User reviews and approves design decisions
2. Technical planning (file structure, data models)
3. Visual asset planning (sprite list, UI mockups)
4. MVP development begins

---

## QUESTIONS TO ASK THE USER

Feel free to ask clarifying questions about:
- Their vision for the classroom "feel"
- What excites them most about the teaching gameplay
- Any specific Montessori moments they want to include
- Technical constraints or preferences
- Timeline and scope priorities

---

**Remember:** Mary figured out WHAT we're building. You need to figure out HOW it plays, feels, and flows. Focus on the player experience, moment-to-moment interactions, and making the teaching gameplay feel meaningful and fun.

Good luck, Sally! 🎮✨
