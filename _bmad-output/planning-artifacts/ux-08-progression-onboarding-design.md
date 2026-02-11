# UX Design Document 08: Progression & Onboarding Design
**Author:** Sally (UX Designer)
**Date:** February 10, 2026
**Status:** Implementation-Ready
**Project:** MontessoriGame - Player Progression & Tutorial System

---

## Overview

This document defines **how players learn the game, progress over time, and experience satisfaction** from day 1 to mastery.

**Design Goals:**
- Gentle learning curve (not overwhelming)
- Discovery over tutorials (show, don't tell)
- Meaningful progression (visible growth)
- Long-term engagement (weeks of content)
- Cozy onboarding (encouraging, not punishing)

---

## First Day Experience (Day 1)

### Player's Journey - Detailed Flow

**Goal:** Teach core mechanics without overwhelming player

---

### Morning: Wake Up (7:00 AM)

**Existing System (Already Built):**
- Virginia wakes up in cottage
- "Wake up, [Name]! You must reach school by 7:45 AM!"
- Tutorial text fades
- Player can explore cottage, make coffee (optional)

**New Addition (First Day Only):**
- **Tooltip appears near coffee maker:**
  - "Press E for coffee - restores energy! ☕"
- **Tooltip near door:**
  - "Walk through door to leave for school"

**Learning:**
- Basic movement (WASD or arrows)
- Energy system (coffee restores energy)
- Time pressure (gentle - must arrive by 7:45)
- Interaction (press E)

---

### Village Walk (7:00-7:45 AM)

**Existing System:**
- Walk through village to school
- Buildings, trees, NPCs (future)
- Time ticking

**New Addition (First Day Only):**
- **Tooltip when passing trash can/bush:**
  - "Click on items to collect materials for crafting!"
- **Auto-collect tutorial:**
  - Player walks near pinecones → auto-collect 3x
  - Notification: "Collected 3x Pinecones! Check inventory (ESC) to view."

**Learning:**
- Collection mechanic (gathering materials)
- Inventory system (ESC to open)
- Exploration rewards (items in world)

---

### Arrival at School (7:45 AM)

**Transition:**
- Fade from village → classroom scene
- **First day special intro:**

```
┌─────────────────────────────────────────┐
│  Welcome to Little Sprouts Montessori!  │
│                                          │
│  You're the new toddler guide.          │
│  12 children (ages 18-36 months) will   │
│  arrive soon. Your job: observe their   │
│  needs, present materials, and help     │
│  them grow.                              │
│                                          │
│  Let's begin!                            │
│                                          │
│              [CONTINUE]                  │
└─────────────────────────────────────────┘
```

**No Overwhelming Tutorial:**
- Just 2-3 sentences of context
- Click [CONTINUE] to proceed

---

### Morning Arrival (7:45-8:00 AM)

**First Children Arrive:**

**When Emma enters (first child):**

**Tutorial Popup:**
```
┌─────────────────────────────────────────┐
│  👋 Your First Student!                 │
│                                          │
│  Emma (24 months, Cautious) has         │
│  arrived. Try clicking on her to        │
│  learn more!                             │
│                                          │
│             [GOT IT]                     │
└─────────────────────────────────────────┘
```

**Player clicks Emma:**

**Simplified Observation Window (First Time Only):**
```
┌──────────────────────────────────────────┐
│  Observing: Emma                         │
├──────────────────────────────────────────┤
│  Age: 24 months                          │
│  Temperament: Cautious (loves routine)   │
│  Mood: Neutral 😐 (new environment)      │
│                                          │
│  Sensitive Periods:                      │
│  • Order (organizing, sorting)           │
│  • Small Objects (tiny things)           │
│                                          │
│  TIP: Sensitive periods tell you what    │
│  materials will engage this child most!  │
│                                          │
│                [CLOSE]                   │
└──────────────────────────────────────────┘
```

**Learning:**
- Click children to observe
- Sensitive periods concept
- Temperament affects behavior
- Mood system

---

**When 3-4 Children Arrive:**

**No New Tutorial:**
- Player repeats observation (clicks children)
- Children naturally choose materials from shelves
- Player watches autonomous behavior

**Tooltip (Contextual):**
- When child walks to shelf: "Children choose work based on their sensitive periods!"
- When child works on rug: "Watch how long they concentrate - this is Montessori magic! ✨"

**Learning:**
- Children are autonomous (not helpless)
- Materials matter (quality affects engagement)
- Observation is key (Montessori principle)

---

### Morning Work Cycle (8:00-11:30 AM)

**First Material Presentation (Guided Moment):**

**When Marcus looks bored (wandering):**

**Tutorial Popup:**
```
┌─────────────────────────────────────────┐
│  🎯 Try Presenting a Material!          │
│                                          │
│  Marcus is wandering. Click on him and  │
│  select "Present Material" to offer     │
│  something engaging!                     │
│                                          │
│             [LET'S TRY IT]               │
└─────────────────────────────────────────┘
```

**Player clicks Marcus → "Present Material":**

**Material Selection Menu (First Time):**
```
┌─────────────────────────────────────────┐
│  Present Material to Marcus             │
├─────────────────────────────────────────┤
│                                          │
│  ✅ Pouring Set (Tier 1) ⭐              │
│  ✅ Nesting Boxes (Tier 1)              │
│  ✅ Nature Basket (Tier 1)              │
│                                          │
│  ⭐ = Matches sensitive period!          │
│  (Best choice for engagement)            │
│                                          │
│  TIP: Choose materials that match        │
│  the child's sensitive periods for       │
│  best results!                           │
└─────────────────────────────────────────┘
```

**Player Selects Pouring Set (matches Marcus's Movement period):**

**Presentation Animation:**
- Virginia walks to Marcus
- Kneels down, shows material
- Loading bar fills
- Marcus's eyes light up!
- Transitions to WORKING state

**Success Notification:**
```
┌─────────────────────────────────────────┐
│  ✨ Great choice! Marcus loves it!      │
│                                          │
│  Notice how long he's concentrating.    │
│  This is exactly what he needed!        │
└─────────────────────────────────────────┘
```

**Learning:**
- Present material action
- Sensitive period matching = better engagement
- Cause and effect (your choice matters!)
- Satisfaction (immediate positive feedback)

---

**Rest of Morning Cycle (Freeform):**

**No More Forced Tutorials:**
- Player can explore:
  - Observe other children
  - Present more materials
  - Walk around classroom
  - Watch children work

**Contextual Tooltips (Appear When Relevant):**
- First upset child: "This child needs comfort! Click and select 'Comfort.'"
- First clingy child: "Aww, [Name] is attached to you! You can redirect them to work or let them follow for a bit."
- First breakthrough: "[Child] had a breakthrough! ✨ This is Montessori magic - the right material at the right time!"

**No Pressure:**
- Can't fail morning cycle
- Even if player does nothing, children self-direct (realistic!)
- Gentle encouragement, not punishment

---

### Outdoor Playground (11:30 AM-12:15 PM)

**Automatic Transition:**
- Notification: "Time for outdoor play!"
- Fade to playground scene

**First Time in Playground:**

**Brief Intro:**
```
┌─────────────────────────────────────────┐
│  🌞 Outdoor Time!                       │
│                                          │
│  Children need movement and fresh air.  │
│  Your job: supervise and observe.       │
│                                          │
│  Notice who climbs, who's cautious,     │
│  who plays alone. This helps you        │
│  understand them better!                │
│                                          │
│             [GOT IT]                     │
└─────────────────────────────────────────┘
```

**No Complex Mechanics:**
- Just watch children play
- Click to observe (optional)
- Low pressure phase

**Learning:**
- Observation is continuous (not just classroom)
- Movement sensitive period (who's climbing?)
- Outdoor time is valuable (not filler)

---

### Nap Time (12:15-2:30 PM)

**THE BIG TUTORIAL MOMENT:**

**Transition to Classroom:**
- Fade from playground
- Nap mats visible
- Children on mats (some already asleep)

**Nap Minigame Tutorial:**
```
┌─────────────────────────────────────────────┐
│  💤 Nap Time Challenge!                     │
│                                              │
│  Your goal: Get all 12 children to sleep.   │
│                                              │
│  HOW TO PLAY:                                │
│  1. Click on awake children (marked with ❗) │
│  2. Hold to soothe them (loading bar fills) │
│  3. They'll fall asleep! (Z Z Z)            │
│                                              │
│  THE CHALLENGE:                              │
│  Some children wake up while you're         │
│  soothing others! Keep everyone asleep      │
│  at the same time.                           │
│                                              │
│  REWARD:                                     │
│  The faster you succeed, the more time      │
│  you have to craft materials!                │
│                                              │
│                   [START]                    │
└─────────────────────────────────────────────┘
```

**First Nap Minigame (Simplified):**
- **Day 1 only: Easier version**
  - Fewer difficult sleepers (Noah auto-sleeps, Emma/Liam easy)
  - Lower wakeup chances (10% instead of 20%)
  - More forgiving (builds confidence)

**After All Asleep:**

**Success Notification:**
```
┌─────────────────────────────────────────┐
│  🎉 Excellent! All children asleep!     │
│                                          │
│  You have 2 hours to craft materials.   │
│  Let's visit the crafting table!        │
│                                          │
│           [LEARN CRAFTING]               │
└─────────────────────────────────────────┘
```

**Guided Crafting Tutorial:**

**Player clicks crafting table:**

**Crafting Menu Tutorial:**
```
┌──────────────────────────────────────────────┐
│  🛠️ Welcome to Crafting!                    │
│                                              │
│  You can create Montessori materials for    │
│  the children using items you collect in    │
│  the village.                                │
│                                              │
│  HOW IT WORKS:                               │
│  1. Select a recipe (left panel)            │
│  2. Check if you have ingredients           │
│  3. Click [CRAFT]                            │
│  4. Wait for it to complete                  │
│  5. Place on shelf for children to use!     │
│                                              │
│  TIP: Higher quality materials = happier,   │
│  more engaged children!                      │
│                                              │
│                  [GOT IT]                    │
└──────────────────────────────────────────────┘
```

**Guided First Craft:**
- Recipe "Spooning Transfer Set" (Tier 1) is pre-highlighted
- Ingredients auto-checked (player collected items in village)
- Tooltip: "This is a Tier 1 craft - it's instant! Try it!"
- Player clicks [CRAFT]
- **Instant completion:**
  - Sparkle effect
  - "Spooning Transfer Set complete!"
  - Material in "Completed" section

**Shelf Placement Tutorial:**
- "Now let's place it on a shelf so children can use it!"
- Click [Place on Shelf]
- Cursor changes to material icon
- Shelves glow (highlight)
- Click shelf → material placed
- Sparkle confirmation

**Learning:**
- Crafting system basics
- Recipe selection
- Ingredient requirements
- Material placement
- Quality tiers (mentioned, not deep-dived)

---

**Free Crafting Time:**
- Remaining nap time (~1.5 hours)
- Player can craft more (or not - no pressure)
- Tooltip: "You can craft more or wait. Take your time!"

**No Forced Crafts:**
- Optional exploration
- Encourages experimentation

---

### Afternoon & Pickup (2:30-3:15 PM)

**No New Tutorials:**
- Children wake, gentle activities
- Parents pick up children (automatic)
- Observe natural end-of-day flow

---

### End-of-Day Summary (3:15 PM)

**First Day Summary (Special):**

```
┌──────────────────────────────────────────────┐
│           🎉 FIRST DAY COMPLETE! 🎉          │
│                                              │
│  You did it! Here's what happened:           │
│                                              │
│  📚 Children's Progress:                     │
│     • Marcus worked for 6 minutes straight!  │
│     • Emma explored 3 different materials    │
│     • All children played outside            │
│                                              │
│  🛠️ Materials Crafted:                       │
│     • Spooning Transfer Set (Tier 1)         │
│                                              │
│  ⭐ Stars Earned: +25 ⭐                      │
│  💙 Trust Gained: +5 (You're doing great!)   │
│                                              │
│  TIP FOR TOMORROW:                           │
│  Observe children to learn what materials    │
│  they need. Craft those materials during     │
│  nap time. Present them the next day!        │
│                                              │
│         [STAY AT SCHOOL]  [GO HOME]          │
└──────────────────────────────────────────────┘
```

**Encouragement:**
- Positive reinforcement (you succeeded!)
- Shows tangible progress (stars, trust)
- Hints at tomorrow (creates anticipation)
- Choice (stay or go home)

---

**If Player Stays (After School Crafting):**

**Optional Tooltip:**
- "You can craft more materials now or explore the village before going home!"

**No Pressure:**
- Completely optional
- Player can leave anytime

---

## Tutorial Philosophy

### Show, Don't Tell

**Principles:**

1. **Contextual Tutorials:**
   - Pop up when relevant (not all at once)
   - Example: Comfort tutorial appears when FIRST upset child appears
   - Not: Front-load everything in a 10-slide tutorial

2. **Discovery Encouraged:**
   - Players can click around and explore
   - Tooltips guide but don't force
   - Multiple paths to learning

3. **Gentle Hints, Not Hand-Holding:**
   - "Try clicking on Emma!" (suggestion)
   - Not: "YOU MUST CLICK ON EMMA NOW" (command)

4. **Mistakes Are Okay:**
   - No fail states (can't game over)
   - Wrong material? Child just loses interest (natural consequence)
   - Ignored upset child? Gentle hint, not punishment

5. **Progressive Complexity:**
   - Day 1: Learn observation, presentation, nap minigame, crafting basics
   - Day 2: Learn material quality tiers, sensitive period matching
   - Day 3: Learn trust system, recipe unlocking
   - Week 2: Advanced strategies (batch crafting, shelf organization)

---

## Progression Systems

### Short-Term Progression (Days 1-7)

**Daily Goals:**

**Day 1:**
- Survive first day (learn basics)
- Complete nap minigame
- Craft first material

**Day 2:**
- Present materials to specific children (mission-based)
- Observe all 12 children (learn names and needs)
- Craft 3 materials

**Day 3:**
- Achieve first breakthrough moment
- Get perfect nap (all asleep by 12:20 PM)
- Reach 25% trust (unlock Tier 2 recipes)

**Day 4-7:**
- Experiment with different materials
- Learn child personalities deeply
- Build trust to unlock new recipes

**Progression Markers:**
- Stars earned (currency)
- Trust % (unlocks)
- Children's breakthroughs (milestones)
- Observation journal entries (completeness)

---

### Mid-Term Progression (Weeks 2-4)

**Trust Levels:**

| Trust % | Title | Unlocks |
|---------|-------|---------|
| 0-24% | Observer | Tier 1 recipes (3 starting recipes) |
| 25-49% | Assistant | Tier 2 recipes (~10 new recipes), school storage |
| 50-74% | Guide-in-Training | Tier 3 recipes (~8 recipes), advanced materials |
| 75-100% | Lead Guide | Tier 4 recipes (~5 recipes), custom materials |

**Trust Gain:**
- Breakthrough moments: +5
- Perfect nap: +5
- All children engaged (no wandering) for 10+ min: +3
- Parent compliments: +2
- Director observation (special event): +10

**Milestone Events:**

**25% Trust (Assistant):**
```
┌─────────────────────────────────────────┐
│  🎉 Promotion: ASSISTANT GUIDE!         │
│                                          │
│  The director has noticed your work!    │
│  You've earned the trust of parents     │
│  and children.                           │
│                                          │
│  NEW UNLOCKS:                            │
│  • Tier 2 Recipe Book                   │
│  • Storage Room at School               │
│  • Lead Guide Mentorship (dialogue)     │
│                                          │
│             [CELEBRATE!]                 │
└─────────────────────────────────────────┘
```

**50% Trust (Guide-in-Training):**
- Similar celebration
- Tier 3 recipes unlocked (Pink Tower, Knobbed Cylinders)
- Special cutscene: Lead Guide teaches lesson

**75% Trust (Lead Guide):**
- Major celebration
- Tier 4 recipes unlocked (Legacy materials)
- Custom material design unlocked (child-specific crafts)
- Recognition from Montessori community

---

### Long-Term Progression (Months 1-3)

**Child Growth:**
- Children's skills increase over weeks
- Visible in observation journal
- Emma: Practical Life Level 1 → Level 5 (Proficient)
- Marcus: Movement Level 2 → Level 5
- Satisfaction: "I helped these children GROW!"

**Material Collection Completion:**
- Craft all materials in each tier
- Completionist goals (optional)
- "Material Designer" achievement

**School Improvements (Future):**
- Unlock second classroom (preschool 3-6 age group)
- Expand playground (new equipment)
- Seasonal events (harvest festival, winter celebration)

**Relationship Progression (Future - Post-MVP):**
- Build relationships with parents (trust per family)
- Romance with Robert (optional subplot)
- Friendship with Lead Guide (mentorship deepens)

---

## Feedback & Rewards

### What Players Earn

**Stars (⭐) - Primary Currency:**
- Earned from:
  - Children's breakthroughs: +10
  - High engagement work sessions: +5 per session
  - Perfect nap: +15
  - End-of-day completion: +25
  - Parent compliments: +5
- Spent on:
  - Purchasing materials at stores (village)
  - Special orders from Traveling Artisan
  - School improvements (future)

**Trust (💙) - Progression Currency:**
- Earned from quality teaching (see trust table above)
- NOT spent (just accumulates)
- Unlocks recipes, features, story moments

**Discovery Tokens (🎟️) - Rare Currency (Future):**
- Earned from special events (gacha system)
- Spent on rare/exclusive recipes
- **Decision for MVP:** Skip (keep it simple)

---

### Visual Progression Feedback

**In-Game:**

1. **Classroom Transformation:**
   - Day 1: Basic materials, sparse shelves
   - Week 2: Shelves full, beautiful Tier 2-3 materials
   - Month 2: Museum-quality setup, Legacy materials glowing

2. **Children's Visual Growth:**
   - Skill levels visible in observation journal
   - Children's behavior changes (longer concentration, more autonomous)
   - Breakthrough moments accumulate (journal shows history)

3. **Virginia's Appearance (Future):**
   - Unlock new outfits (Trust rewards)
   - Bandana color choices
   - Classroom decoration options

---

## Success & Failure States

### What Is "Success"?

**Daily Success:**
- Children generally happy (mood > 50)
- At least 1 breakthrough moment
- Successful nap (all asleep eventually)
- Materials crafted (1+)
- **Outcome:** Earn stars, trust, feel accomplished

**Perfect Day:**
- Multiple breakthroughs (3+)
- Perfect nap (asleep by 12:20)
- All children engaged (no wandering)
- 5+ materials crafted
- **Outcome:** Bonus stars (+50), trust (+20), special notification

---

### Can You "Fail"?

**Short Answer:** No.

**Design Philosophy:**
- **No Game Over:** Can't lose the game
- **No Punishments:** Only missed opportunities
- **Natural Consequences:** Ignored upset child = other children distressed (but day continues)

**Worst Case Scenario:**
- Player does NOTHING all day:
  - Children self-direct (choose own work)
  - Some get upset (no comfort)
  - Nap time challenging (some children don't sleep)
  - No materials crafted
  - **Outcome:** Low stars (+10), no trust gain, but can try again tomorrow

**Gentle Correction:**
- End-of-day summary: "Today was challenging. Remember to observe children's needs and respond to upsets. Tomorrow is a new day!"
- Encouraging tone, not punishing

---

## Onboarding for Different Player Types

### Player Archetypes

**1. Completionist:**
- Wants to craft ALL materials
- Fill observation journal 100%
- Achieve all milestones
- **Onboarding:** Show achievement lists, recipe completion %

**2. Cozy Gamer:**
- Just wants to relax and watch children grow
- Not min-maxing, just enjoying
- **Onboarding:** Emphasize "no pressure," "play your way"

**3. Montessori Educator:**
- Wants authentic experience
- Cares about pedagogy
- **Onboarding:** Provide educational tooltips, references to Maria Montessori

**4. Story-Focused:**
- Wants narrative, relationships
- Less interested in systems
- **Onboarding:** Hint at future story (Robert, Lead Guide, parents)

---

## Tutorial Toggles & Accessibility

### Settings Options

**Tutorial Intensity:**
- **Full Tutorials (Default):** All tooltips, hints, guided moments
- **Minimal Tutorials:** Only critical info (nap minigame, crafting basics)
- **No Tutorials:** For experienced players or second playthrough

**Hint Frequency:**
- **Frequent (Default):** Tooltips appear proactively
- **As Needed:** Tooltips only when player seems stuck (e.g., 2 minutes of inactivity)
- **Off:** No hints, pure discovery

---

## Open Questions / Future Iteration

1. **Second playthrough bonuses?**
   - New Game+ mode (start with more recipes?)
   - **Decision for MVP:** Skip (focus on first playthrough)

2. **Difficulty settings?**
   - Easier nap minigame? Relaxed mode?
   - **Decision for MVP:** One difficulty (balanced for cozy)

3. **Achievement system?**
   - Badges for milestones?
   - **Decision for MVP:** Minimal (just trust titles)

4. **Skip tutorial option (first screen)?**
   - For experienced players
   - **Decision for MVP:** Yes (checkbox at start: "Skip tutorials")

---

**Next Document:** UX-09 Animation & Polish Guide

---

*Sally, UX Designer*
*MontessoriGame Development Team*
