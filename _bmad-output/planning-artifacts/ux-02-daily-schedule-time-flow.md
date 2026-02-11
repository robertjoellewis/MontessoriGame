# UX Design Document 02: Daily Schedule & Time Flow
**Author:** Sally (UX Designer)
**Date:** February 10, 2026
**Status:** Implementation-Ready
**Project:** MontessoriGame - Toddler Classroom Daily Rhythm

---

## Overview

This document defines the **daily schedule, time progression, and event flow** for Virginia's school day at Little Sprouts Montessori. The schedule is designed to feel authentic to Montessori toddler programs while creating engaging gameplay rhythms.

**Design Goals:**
- Authentic Montessori daily routine
- Natural pacing with variety (not repetitive)
- Clear gameplay phases (teaching, outdoor time, nap, crafting)
- Gentle time pressure (not stressful)
- Satisfying daily arc (arrival → growth → departure)

---

## Time System Specifications

### Time Progression

**Real-Time to Game-Time Ratio:**
- **14 minutes real time = 1 full game day**
- Consistent across ALL scenes (cottage, village, classroom, playground)
- ESC pauses time EVERYWHERE (global pause)

**Time Display:**
- Clock UI shows game time (7:00 AM format)
- Updates every game minute
- Visible at all times (top-right corner)

**Time Calculation:**
```
Game day length: 7:00 AM → 5:00 PM = 10 game hours
Real-time duration: 14 minutes
1 game hour = 84 seconds real time
1 game minute = 1.4 seconds real time
```

### Pause System

**ESC Key Behavior:**
- Pauses game time (clock stops)
- Opens inventory/menu
- Game world frozen (children stop moving, animations pause)
- Can unpause by pressing ESC again

**Other Pause Scenarios:**
- Opening crafting menu during nap time (optional pause)
- Material presentation cutscenes (time slows or pauses briefly)

---

## Complete Daily Timeline

### Full Day Overview

| Time | Event | Location | Duration (Real) | Gameplay Focus |
|------|-------|----------|-----------------|----------------|
| 7:00 AM | Wake up | Cottage | 1 min | Get ready, optional coffee |
| 7:00-7:45 AM | Walk to school | Village | 3-4 min | Collection, exploration |
| 7:45-8:00 AM | Arrival & Setup | Classroom | 1 min | Greet children, prepare |
| 8:00-11:30 AM | Morning Work Cycle | Classroom | 4.9 min | Core teaching gameplay |
| 11:30 AM-12:15 PM | Outdoor Playground | Playground | 1 min | Supervision, observation |
| 12:15-2:30 PM | Nap Time | Classroom | 3 min | Nap minigame + crafting |
| 2:30-3:00 PM | Afternoon Wakeup | Classroom | 42 sec | Gentle activities, circle time |
| 3:00-5:00 PM | Optional Stay | Classroom | 2.8 min | Crafting, organizing, OR go home |
| 5:00 PM | Hard Cutoff | - | - | Forced exit to cottage |

**Total School Day:** 7:45 AM - 5:00 PM (9 hours 15 minutes game time = ~13 minutes real time)

---

## Detailed Schedule Breakdown

### Phase 1: Morning Arrival (7:45-8:00 AM)

**Duration:** 15 game minutes (~21 seconds real time)

**What Happens:**
- Virginia arrives at classroom (transition from village scene)
- Classroom is empty at first
- Children arrive in **staggered waves** (realistic!)

**Child Arrival Pattern:**

| Time | Children Arriving | Notes |
|------|------------------|-------|
| 7:45 AM | Emma, Aiden, Liam | Early arrivals (routine-oriented kids) |
| 7:50 AM | Marcus, Lily, Noah, Mia | On-time arrivals (most children) |
| 7:55 AM | Sofia, Oliver, Zoe, Elijah, Ava | Late arrivals (younger or less structured) |
| 8:00 AM | All 12 present | Morning work cycle begins |

**Gameplay During Arrival:**
- Virginia can greet children (optional click interaction)
- Children enter door, walk to shelf/rug, begin choosing work
- Virginia can observe moods (some children arrive upset, tired, excited)
- No direct teaching yet (setup phase)

**Visual Feedback:**
- Door opens, child sprite enters
- Child walks to random shelf or rug
- Text notification: "[Name] has arrived!" (subtle, bottom-left corner)

**Player Choice:**
- Greet specific children (build relationship)
- Observe who needs extra attention today
- Mentally prepare for day (which children seem challenging today?)

---

### Phase 2: Morning Work Cycle (8:00-11:30 AM)

**Duration:** 3.5 game hours (~4.9 minutes real time)

**Core Gameplay Phase** - This is the heart of the game!

**What Happens:**
- All 12 children are present and active
- Children choose work from shelves (autonomous)
- Virginia observes, presents materials, responds to needs
- Free choice, uninterrupted work time (Montessori principle)

**Children's Behavior Cycles:**

Each child follows a loop:
1. **Choose work** (walk to shelf, select material based on sensitive period)
2. **Work on rug** (sit down, engage with material)
3. **Concentration period** (2-5 game minutes depending on engagement)
4. **Return material** (walk back to shelf, put it away)
5. **Repeat** (choose new work or wander)

**Virginia's Activities:**

1. **Observation:**
   - Click on child → view mood, engagement, needs
   - Take mental notes (or write in observation journal)
   - Identify who needs new materials

2. **Material Presentation:**
   - Approach child who's ready for new challenge
   - Context-sensitive interaction appears
   - Present material (quick action or loading bar animation)
   - Child begins using material

3. **Responding to Needs:**
   - Child upset → comfort/redirect
   - Child bored → offer new material
   - Child clingy → let them follow you briefly
   - Conflict between children → mediate

4. **Environment Maintenance:**
   - Check shelves (are materials organized?)
   - Notice which materials are popular (being chosen often)
   - Mental planning (what to craft during nap time)

**Time Pressure (Gentle):**
- No strict timer or fail state
- But: More observation/presentations = more child growth = better outcomes
- Goal: Visit as many children as possible during this window

**Events During Morning Cycle:**

| Time | Event | Description |
|------|-------|-------------|
| 8:30 AM | Bathroom break | 1-2 children may need bathroom (automatic, brief) |
| 9:00 AM | Snack time (optional) | Some children eat small snack (self-serve, minimal Virginia involvement) |
| 10:00 AM | Energy check | If Virginia's energy low, she moves slower (visual feedback) |

---

### Phase 3: Outdoor Playground (11:30 AM-12:15 PM)

**Duration:** 45 game minutes (~1 minute real time)

**Transition:**
- 11:30 AM: Notification appears "Time for outdoor play!"
- Automatic or semi-automatic transition:
  - **Option A:** Virginia walks to door, fade out, load playground
  - **Option B:** Automatic scene transition (simpler for MVP)
- All 12 children transition with Virginia

**Playground Gameplay:**

**What Happens:**
- Children run, climb, swing, play in sandbox
- Virginia supervises (hands-off, observational)
- Higher energy, faster movement than classroom
- Crucial observation time

**Virginia's Activities:**
1. **Supervision:**
   - Stand/walk around playground
   - Watch for safety issues (child stuck on climber? falling?)
   - Click children to observe moods/energy

2. **Observation Focus:**
   - Notice who climbs (Movement sensitive period)
   - Notice who's cautious vs. bold (temperament)
   - Notice social dynamics (who plays together?)

3. **Clingy Children:**
   - Some kids may stay near Virginia instead of playing
   - Gentle mechanic: they slow her down slightly
   - Shows individual personalities

**Children's Behavior:**
- More chaotic movement (running, not walking)
- Faster animations
- Some children go to equipment (climber, slide, swings)
- Some children wander in grass
- Some children stay near Virginia (clingy/cautious)

**Visual Style:**
- Bright, outdoor lighting
- Blue sky, green grass
- More energetic feel than calm classroom

**Gameplay Goal:**
- Simple, low-complexity (this is a breather phase)
- Observation more than action
- Appreciate children's outdoor joy
- Natural rhythm break before nap

**No Crafting, No Direct Teaching:**
- Just supervision and observation
- Cozy "watching children play" moment

---

### Phase 4: Nap Time (12:15-2:30 PM)

**Duration:** 2 hours 15 minutes game time (~3 minutes real time)

**THE BIG MINIGAME PHASE!**

#### Transition to Nap Time

**12:15 PM: Playground → Classroom**
- Notification: "Nap time! Let's go inside."
- Fade transition back to classroom
- Nap mats now visible in southeast corner

#### Part A: Nap Minigame (12:15-12:30 PM estimated)

**Goal:** Get all 12 children to fall asleep

**Challenge:** Children fall asleep at different rates, some wake up while you're soothing others

**Mechanics:**

1. **Initial State (12:15 PM):**
   - All 12 children on their assigned nap mats
   - Most are **awake** (sitting up, fidgeting)
   - A few easy-going children may fall asleep immediately (Noah, maybe 1-2 others)

2. **Visual Indicators:**
   - **Awake child:** Sitting up sprite, ! icon above head (needs soothing)
   - **Drowsy child:** Lying down, eyes half-closed (almost asleep, leave them alone)
   - **Asleep child:** Lying down, Z Z Z animation (peaceful, done!)

3. **Virginia's Actions:**
   - **Walk to awake child** (click mat or child)
   - **Soothe action:** Click to start soothing
     - Loading bar appears above child (fills over 3-5 seconds)
     - Virginia stands next to mat (idle animation, gentle hand on child)
     - When bar completes: child transitions to drowsy → asleep
   - **Move to next child** and repeat

4. **The Challenge:**
   - While you're soothing Child A in one corner...
   - Child B in opposite corner wakes up (!)
   - You must manage priorities (who's about to wake up? who's settling?)
   - Some children are **easier sleepers** (1 soothing = asleep)
   - Some children are **difficult sleepers** (require 2-3 soothings)

5. **Child Sleep Difficulty (Based on Temperament):**

| Child | Temperament | Sleep Difficulty |
|-------|-------------|------------------|
| Noah | Easy-Going | Auto-sleeps (no soothing needed) |
| Liam | Cautious | Easy (1 soothing) |
| Emma | Cautious | Easy (1 soothing) |
| Aiden | Independent | Medium (1 soothing, rare wakeup) |
| Zoe | Independent | Medium (1 soothing, rare wakeup) |
| Lily | Social | Medium (2 soothings) |
| Sofia | Sensitive | Hard (2-3 soothings, frequent wakeups) |
| Marcus | Bold | Hard (2-3 soothings, frequent wakeups) |
| Mia | Bold | Hard (2 soothings) |
| Ava | Bold | Medium (2 soothings) |
| Oliver | Cautious (but youngest) | Medium (1-2 soothings) |
| Elijah | Social | Medium (1-2 soothings) |

6. **Wakeup Mechanics:**
   - After being soothed to sleep, child has small chance to wake up (~10-20%)
   - Easy sleepers: 5% wakeup chance
   - Medium sleepers: 15% wakeup chance
   - Hard sleepers: 25% wakeup chance
   - Wakeup can happen while you're soothing another child (creates urgency)

7. **Success Condition:**
   - All 12 children asleep at the same time
   - Once achieved: minigame ends, Virginia has free time

8. **Time Cost:**
   - Faster you complete nap minigame = more crafting time
   - Slow completion = less crafting time
   - **Example:**
     - Perfect nap (all asleep by 12:20 PM): 2 hours 10 min crafting time
     - Good nap (all asleep by 12:30 PM): 2 hours crafting time
     - Challenging nap (all asleep by 12:45 PM): 1 hour 45 min crafting time

**Balancing Notes:**
- Not TOO hard (frustrating)
- Not TOO easy (boring)
- Should feel like gentle juggling, not panic
- Soft music, calming atmosphere
- Visual clarity (easy to see who needs help)

**Aesthetic:**
- Dim lighting (afternoon nap ambiance)
- Soft lullaby music (optional)
- Peaceful, cozy feel
- Satisfying moment when all are asleep (music swells, gentle sparkle effect?)

#### Part B: Crafting Time (After All Asleep - Until 2:30 PM)

**Trigger:** All 12 children asleep

**Notification:** "All children are asleep! You have [X minutes] to craft."

**Gameplay:**
- Virginia walks to crafting table (southwest corner)
- Click table → opens crafting menu (recipe book interface)
- Time continues during crafting (clock keeps ticking)
- Children remain asleep (sleeping animations, Z Z Z)

**Crafting Mechanics:**
1. **Select recipe** from available list
2. **Check ingredients** (green checkmarks if you have them)
3. **Craft material:**
   - **Tier 1 (Handmade):** Instant (no time cost)
   - **Tier 2 (Classic):** 10-15 game minutes (14-21 seconds real time)
   - **Tier 3 (Heirloom):** 20-30 game minutes (28-42 seconds real time)
   - **Tier 4 (Legacy):** 45-60 game minutes (1+ minute real time)
4. **Crafting animation:** Loading bar, Virginia working at table
5. **Completion:** Material added to inventory, can place on shelf immediately or save for later

**Time Management:**
- If nap time ends (2:30 PM) while crafting: work interrupted
- Partial progress saved? OR crafting auto-completes? (Design decision)
- **Suggested:** Auto-complete if 80%+ done, otherwise save progress

**Multiple Crafts:**
- Can craft multiple Tier 1 items (instant)
- Can queue one longer craft (Tier 2-4)
- Cannot craft multiple long items in one nap (not enough time)

**Strategic Depth:**
- Do I craft multiple simple items or one complex item?
- Which child needs what material most urgently?
- Balance immediate needs vs. long-term quality

---

### Phase 5: Afternoon Wakeup (2:30-3:00 PM)

**Duration:** 30 game minutes (~42 seconds real time)

**Transition:** 2:30 PM - Children begin waking up

**What Happens:**
- Children wake in staggered pattern (not all at once)
- Gentle wakeup animations (stretch, sit up, stand)
- Nap mats fade away (visually disappear)
- Soft afternoon activities

**Gameplay:**
- Light, low-pressure phase
- Virginia can:
  - Greet waking children
  - Offer simple activities (books, puzzles)
  - Prepare for pickup time
- Children are calmer, quieter (post-nap energy)

**Activities:**
- Circle time (optional - Virginia can gather children on rug for story/song)
- Free play (children choose light activities)
- Snack (optional self-serve)

**No Major Teaching:**
- This is winding-down time
- Focus on calm transition to pickup

---

### Phase 6: Pickup Time (3:00 PM)

**Event:** Parents begin arriving to pick up children

**Staggered Pickup:**

| Time | Children Leaving | Notes |
|------|-----------------|-------|
| 3:00 PM | Mia, Marcus, Ava | Early pickups (busy parents) |
| 3:05 PM | Emma, Lily, Noah, Zoe | On-time pickups |
| 3:10 PM | Aiden, Sofia, Oliver, Elijah, Liam | Late pickups |
| 3:15 PM | All gone | Classroom empty |

**Visual:**
- Door opens, parent silhouette appears
- Child walks to door, waves goodbye
- Text notification: "[Name] has been picked up!"

**Gameplay:**
- Virginia can click parent for brief dialogue (optional)
  - Parent comments on child's day
  - Builds trust/relationship (future mechanic)
- No pressure, just watching children leave

**End-of-Day Summary (3:15 PM):**
- Once all children gone, popup appears:
  - "All children picked up!"
  - Daily summary stats (optional):
    - Children who had breakthroughs today
    - Materials crafted
    - Stars earned
    - Trust gained

**Player Choice:**
- **Stay and craft** (continue to 5:00 PM)
- **Go home** (transition to cottage/free time)

---

### Phase 7: Optional After-School Time (3:15-5:00 PM)

**Duration:** 1 hour 45 minutes game time (~2.5 minutes real time)

**IF Virginia stays at school:**

**Activities Available:**
1. **Crafting:**
   - More time at crafting table
   - Can complete longer Tier 3-4 items
   - Quiet, peaceful crafting

2. **Organizing Classroom:**
   - Rearrange materials on shelves
   - Clean up (aesthetic satisfaction)
   - Prepare for tomorrow

3. **Observation Journal:**
   - Review notes from day
   - Plan which children need what materials
   - Strategic planning

4. **Professional Development (Future):**
   - Read Montessori books (unlock recipes)
   - Study child development

**No Children Present:**
- Classroom is empty and quiet
- Virginia has full freedom of movement
- Relaxing, meditative time

**5:00 PM Hard Cutoff:**
- Notification at 4:55 PM: "5 minutes until closing time"
- At 5:00 PM: Automatic transition to cottage (fade out)
- Cannot stay past 5:00 PM (school closes)

---

## Time-Based Event System

### Event Triggers

**Implementation:**
```javascript
// In ClassroomScene.update()
const currentTime = this.clock.getTime();
const currentMinutes = currentTime.hour * 60 + currentTime.minute;

// Check for scheduled events
if (currentMinutes === 8 * 60 + 0 && !this.morningCycleStarted) {
    this.startMorningWorkCycle();
    this.morningCycleStarted = true;
}

if (currentMinutes === 11 * 60 + 30 && !this.playgroundTriggered) {
    this.transitionToPlayground();
    this.playgroundTriggered = true;
}

// etc.
```

### Event Flags

**Track which events have occurred** (prevent duplicate triggers):
- `this.morningCycleStarted`
- `this.playgroundTriggered`
- `this.napTimeStarted`
- `this.pickupStarted`
- `this.dayEnded`

---

## Pacing & Player Agency

### Where Player Has Control

**High Agency:**
- Morning work cycle (choose who to interact with, when)
- Nap minigame (which child to soothe first, strategy)
- Crafting choices (what to make, when)
- After-school time (stay or go home)

**Low Agency:**
- Arrival times (children arrive on schedule)
- Playground transition (automatic at 11:30 AM)
- Nap time start (automatic at 12:15 PM)
- Pickup times (parents arrive on schedule)

**Rationale:**
- Automatic transitions create rhythm and structure (like real teaching)
- Player agency within phases (freedom during work cycle, nap, crafting)
- Gentle rails (not overwhelming with choices)

### Time Pressure Philosophy

**Avoid Stress:**
- No fail states for being slow
- No punishments for missing events
- Time limits create structure, not punishment

**Gentle Motivation:**
- More observation = better outcomes (children grow faster)
- Faster nap minigame = more crafting time (reward efficiency)
- But even slow players succeed (just different pace)

**Cozy Design:**
- If you're slow, that's okay! Children still grow, you still progress
- If you're efficient, you're rewarded with more crafting time
- Both playstyles valid

---

## Scene Transitions

### Transition Types

**Fade Out/Fade In (500ms each):**
- Village → Classroom (7:45 AM)
- Classroom → Playground (11:30 AM)
- Playground → Classroom (12:15 PM)
- Classroom → Cottage (5:00 PM)

**Data Passed Between Scenes:**
```javascript
this.scene.start('ClassroomScene', {
    gameTime: { hour: 7, minute: 45 },
    energy: this.energyMeter.getCurrentEnergy(),
    inventory: this.player.inventory
});
```

---

## Special Time Events

### Seasonal/Weekly Variations (Future)

**Monday:**
- Children arrive more slowly (weekend transition)
- Some children clingier than usual

**Friday:**
- Children more excited (weekend coming)
- Parents linger at pickup (chatty)

**Rainy Day:**
- No outdoor playground (stay inside)
- Extra indoor activities
- Different energy dynamic

**Sunny Day:**
- Longer playground time
- Children more energetic

---

## Open Questions / Future Iteration

1. **Can Virginia leave early?**
   - If all children picked up by 3:15 PM, can she leave before 5:00 PM?
   - **Decision for MVP:** Yes, optional to stay

2. **What if Virginia is late to school?**
   - Arrives after 8:00 AM (children already there)
   - Any consequences? Or just narrative flavor?
   - **Decision for MVP:** No punishment, just different arrival experience

3. **Bathroom breaks for Virginia?**
   - Does she need to leave classroom?
   - Energy cost if she doesn't?
   - **Decision for MVP:** Skip this (not essential)

4. **Lunch time?**
   - Current schedule skips 12:15 PM lunch (goes straight to nap)
   - Should there be lunch prep/eating phase?
   - **Decision for MVP:** Skip (nap time is enough complexity)

---

**Next Document:** UX-03 Child Behavior & Interaction System

---

*Sally, UX Designer*
*MontessoriGame Development Team*
