# UX Design Document 03: Child Behavior & Interaction System
**Author:** Sally (UX Designer)
**Date:** February 10, 2026
**Status:** Implementation-Ready
**Project:** MontessoriGame - Child AI & Interaction Design

---

## Overview

This document defines **how the 12 toddlers behave, move, and interact** with Virginia, materials, and each other. It also specifies the interaction system for how players engage with children.

**Design Goals:**
- Toddlers feel alive and individual (not robotic)
- Behavior reflects age, temperament, and sensitive periods
- Interactions feel meaningful and responsive
- Clear visual feedback for child states/needs
- Authentic Montessori observation experience

---

## Child State Machine

### Core States

Each child exists in one of these states at any time:

```
┌─────────────────────────────────────────────────────────┐
│                    CHILD STATE MACHINE                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────┐    Choose     ┌──────────┐              │
│  │ CHOOSING │──────Work─────▶│ CARRYING │              │
│  │   WORK   │                │ MATERIAL │              │
│  └──────────┘                └──────────┘              │
│       ▲                            │                    │
│       │                            │                    │
│       │                     ┌──────▼────────┐          │
│       │                     │   WORKING     │          │
│       │                     │  (on rug)     │          │
│       │                     └───────────────┘          │
│       │                            │                    │
│       │                            │                    │
│  ┌────┴────────┐                  │                    │
│  │  RETURNING  │◀──────Done────────┘                   │
│  │  MATERIAL   │                                        │
│  └─────────────┘                                        │
│                                                          │
│  ┌──────────┐        ┌──────────┐     ┌──────────┐    │
│  │ WANDERING│◀──────▶│  UPSET   │◀───▶│  CLINGY  │    │
│  └──────────┘        └──────────┘     └──────────┘    │
│                                                          │
│  ┌──────────┐        ┌──────────┐                      │
│  │ SLEEPING │◀──────▶│  AWAKE   │  (Nap time only)    │
│  └──────────┘        └──────────┘                      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### State Descriptions

#### 1. CHOOSING WORK
**What:** Child is at shelf, deciding which material to use

**Visual:**
- Standing at shelf sprite
- Looking/touching materials animation (subtle)
- Brief pause (1-3 seconds)

**Behavior:**
- Walks to shelf
- Selects material based on:
  - Sensitive period (80% chance)
  - Random interest (20% chance)
- Transitions to CARRYING

**Duration:** 2-5 seconds

---

#### 2. CARRYING MATERIAL
**What:** Child is carrying chosen material to work rug

**Visual:**
- Walking animation
- Material sprite visible in hands (small icon)
- Moving toward empty rug

**Behavior:**
- Pathfinding to nearest available rug
- Slow walking speed (careful, not rushing)
- If all rugs occupied: wanders briefly, then tries again

**Duration:** 3-8 seconds (depends on distance)

---

#### 3. WORKING (Engaged)
**What:** Child is actively using material on rug

**Visual:**
- Sitting sprite on rug
- Material in front of child
- **Engagement animation** based on material type:
  - Pouring: tilt animation (pouring motion)
  - Pink Tower: stacking animation
  - Color Tablets: matching animation
  - Language Basket: holding/examining objects

**Behavior:**
- **Concentration period:** 1-8 game minutes (based on factors)
- Factors affecting concentration:
  - **Material quality:** Higher tier = longer focus
  - **Sensitive period match:** Perfect match = 2x longer focus
  - **Child's mood:** Happy = longer, upset = shorter
  - **Temperament:** Independent kids focus longer

**Concentration Formula:**
```
Base time: 2 minutes
+ Material quality bonus: Tier 1 = +0, Tier 2 = +1, Tier 3 = +2, Tier 4 = +4
+ Sensitive period match: +2 minutes
+ Mood bonus: Happy = +1, Neutral = 0, Upset = -1
+ Temperament: Independent = +1, Cautious = +1, Bold = 0, Social = -1
= Total concentration time
```

**Visual Feedback During Work:**
- **High engagement:** Sparkle effect, focused expression
- **Medium engagement:** Normal, steady work
- **Low engagement:** Fidgeting, looking around

**Breakthrough Moments:**
- If concentration > 5 minutes AND material matches sensitive period:
  - **"Aha moment" cutscene** (3-second animation)
  - Child's face lights up, star/sparkle effect
  - Skill increase notification
  - Satisfying player feedback

**Duration:** Variable (1-8 game minutes)

---

#### 4. RETURNING MATERIAL
**What:** Child finished work, walking back to shelf to put material away

**Visual:**
- Walking animation
- Carrying material (small icon in hands)
- Moving toward shelf

**Behavior:**
- Walks to correct shelf (where material came from)
- Places material back (animation)
- Transitions to CHOOSING WORK or WANDERING

**Duration:** 3-8 seconds

---

#### 5. WANDERING
**What:** Child is not engaged, walking around aimlessly

**Visual:**
- Slow walking animation
- No material in hands
- Random direction changes
- Neutral or bored expression

**Behavior:**
- Occurs when:
  - No interesting materials available
  - Child's needs not met (hungry, tired, upset)
  - All rugs occupied
  - Just arrived (settling in)
- Random walk pattern (changes direction every 2-5 seconds)
- May transition to:
  - CHOOSING WORK (if sees interesting material)
  - UPSET (if needs not met for too long)
  - CLINGY (if temperament + mood align)

**Duration:** Variable (10 seconds - 2 minutes)

**Player Response:**
- Virginia can observe (click child → see why they're wandering)
- Present new material (offer something engaging)
- Comfort (if upset is brewing)

---

#### 6. UPSET
**What:** Child is crying, frustrated, or distressed

**Visual:**
- Crying animation (tears, red face)
- ! icon above head (red exclamation mark)
- Standing or sitting (not moving)
- Sound effect (optional soft crying)

**Triggers:**
- Needs not met (tired, hungry)
- Conflict with another child (rare)
- Failed at material (couldn't complete task)
- Separation anxiety (bold/sensitive children)
- No engaging materials available for too long

**Behavior:**
- Stands in place, crying
- Does not work or move (stuck in state)
- Other children may react (Social children approach to comfort)

**Player Response Required:**
- **Virginia must intervene:**
  - Click child → "Comfort" action appears
  - Virginia walks to child, kneels down (animation)
  - Loading bar (3-5 seconds of comforting)
  - Child transitions to CALM/WANDERING

**Duration:** Until Virginia intervenes (can last indefinitely if ignored)

**Consequences of Ignoring:**
- Other children become distressed (empathy)
- Energy drain for Virginia (emotional labor)
- Trust decrease (parent concern)

---

#### 7. CLINGY
**What:** Child is attached to Virginia, following her around

**Visual:**
- Following Virginia sprite (stays close)
- Small heart icon above head (affection)
- Happy or neutral expression (not upset)

**Triggers:**
- Temperament (Cautious children more likely)
- Low mood (needs comfort)
- Sensitive period: Social Behavior (seeks connection)
- New child (first few days)

**Behavior:**
- Follows Virginia's position (with slight delay)
- Stays within 50px of Virginia
- Does not engage with materials while clingy
- **Virginia's movement slowed by 50%** while child is clingy

**Mechanic:**
- Gentle obstacle (not punishing, just slower pace)
- Shows individual child needs
- Requires Virginia to "detach" child:
  - **Option A:** Redirect to material (present engaging work)
  - **Option B:** Comfort, then walk away (child stays put)
  - **Option C:** Let them follow for ~30 seconds (then auto-detach)

**Duration:** 30 seconds - 2 minutes (unless Virginia intervenes)

**Player Experience:**
- Adorable (toddler holding your leg!)
- Slightly inconvenient (slows you down)
- Requires gentle response (redirect with care)

---

#### 8. SLEEPING (Nap Time Only)
**What:** Child is asleep on nap mat

**Visual:**
- Lying down sprite on mat
- Eyes closed
- Z Z Z animation floating above (peaceful)
- Gentle breathing animation (optional)

**Behavior:**
- Completely still (no movement)
- Cannot be interacted with (except to observe)

**Wakeup Triggers:**
- Time-based (small % chance per game minute)
- Wakeup chance based on temperament (see nap minigame doc)

**Duration:** Until nap time ends (2:30 PM) or child wakes

---

#### 9. AWAKE (Nap Time Only)
**What:** Child is awake on nap mat (should be sleeping)

**Visual:**
- Sitting up sprite on mat
- ! icon above head (needs soothing)
- Fidgeting animation (moving, looking around)

**Behavior:**
- Waits for Virginia to soothe
- Does not leave mat (stays in place)
- May transition to SLEEPING if soothed

**Player Response:**
- Virginia must walk to mat
- Click child → soothe action (loading bar)
- Child lies down, falls asleep

**Duration:** Until Virginia soothes them

---

## Child AI Decision-Making

### Material Selection Logic

When child is in CHOOSING WORK state, how do they pick a material?

**Selection Algorithm:**

1. **Gather available materials** on nearby shelf
2. **Filter by age appropriateness** (child's age in months)
3. **Score each material:**
   ```
   Score = 0
   + Matches sensitive period: +100
   + Quality tier bonus: Tier * 10 (Tier 4 = +40)
   + Novelty bonus: New material = +50
   + Random interest: +0 to 20 (randomness)
   ```
4. **Select highest-scoring material**
5. **Transition to CARRYING**

**Example:**
- **Zoe** (29 months, Small Objects sensitive period)
- Materials available: Pouring Set (Tier 2), Spooning Transfer (Tier 1, matches Small Objects)
- Scores:
  - Pouring Set: 0 + 20 + 0 + 10 = 30
  - Spooning Transfer: 100 + 10 + 0 + 15 = 125
- **Zoe chooses Spooning Transfer** (clear winner)

---

### Movement & Pathfinding

**Simple Pathfinding (Not Complex):**
- Direct line to target (shelf, rug, Virginia)
- Acceptable if children clip through objects (low fidelity)
- Avoid complex A* unless necessary

**Speed:**
- Walking: 100 px/second (slower than Virginia's 160 px/s)
- Toddler pace (authentic!)

**Collision:**
- Children pass through each other (no child-child collision)
- Children pass through Virginia (except clingy state)

---

### Mood System

Each child has a **mood value** (0-100):

| Mood Value | State | Visual |
|-----------|-------|--------|
| 80-100 | Happy | Smiling face, sparkle |
| 50-79 | Neutral | Normal face |
| 20-49 | Discontent | Slight frown, dim |
| 0-19 | Upset | Crying, red ! icon |

**Mood Factors:**

**Increases Mood:**
- Working with material (+5 per minute)
- Material matches sensitive period (+10 per minute)
- Virginia presents material (+15 immediate)
- Virginia comforts (+20 immediate)
- Breakthrough moment (+30 immediate)

**Decreases Mood:**
- Wandering too long (-2 per minute)
- No Virginia interaction (-1 per minute)
- Tired (before nap) (-5 per minute after 11:00 AM)
- Poor quality materials (-3 per minute while working)

**Mood affects:**
- Concentration time (happy = longer focus)
- Clingy likelihood (low mood = more clingy)
- Upset trigger (mood < 20 = upset state)

---

## Interaction System (Virginia → Child)

### Context-Sensitive Interactions

When Virginia clicks on a child, the game shows **contextual actions** based on child's current state:

**Interaction Menu (Radial or Popup):**

| Child State | Actions Available |
|-------------|------------------|
| CHOOSING WORK | "Observe", "Suggest Material" |
| WORKING | "Observe", "Encourage" |
| WANDERING | "Observe", "Present Material", "Comfort" |
| UPSET | "Comfort" (only option) |
| CLINGY | "Redirect to Work", "Comfort" |
| SLEEPING | "Observe" (no actions) |
| AWAKE (nap) | "Soothe" (only option) |

### Interaction Details

#### 1. OBSERVE
**What:** Virginia watches child and takes mental note

**Flow:**
1. Click child → "Observe" action
2. Observation window appears (popup or sidebar):
   - Child's name
   - Current mood (emoji + text)
   - Current activity
   - Sensitive periods highlighted
   - Suggested materials (based on needs)
3. Information added to journal (persistent)
4. No time cost (instant action)

**Visual:**
- Magnifying glass icon appears briefly over child
- Text box with observation notes

**Example:**
```
┌─────────────────────────────────┐
│ Observing: Zoe (29 months)      │
├─────────────────────────────────┤
│ Mood: Happy 😊 (85/100)          │
│ Activity: Working with Spooning │
│           Transfer Set          │
│ Concentration: High ✨           │
│                                  │
│ Sensitive Periods:               │
│ • Small Objects (active!)       │
│ • Language                       │
│                                  │
│ Suggested Materials:             │
│ • Knobbed Cylinders (pincer)    │
│ • Sorting Tray (small objects)  │
└─────────────────────────────────┘
```

**Player Benefit:**
- Learn child's needs
- Plan what to craft
- Understand personalities
- Educational (learn about development)

---

#### 2. PRESENT MATERIAL
**What:** Virginia offers new material to child

**Flow:**
1. Click child → "Present Material" action
2. Material selection menu appears:
   - Shows Virginia's crafted materials (inventory)
   - Highlights materials matching child's sensitive period
   - Grayed-out if child not ready (too young, not interested)
3. Select material → confirmation
4. **Presentation animation:**
   - Virginia walks to child (if not already nearby)
   - Kneels down (sprite animation)
   - Shows material (material sprite appears between them)
   - **Loading bar fills** (3-5 seconds = lesson duration)
   - Child nods, takes material
   - Child transitions to WORKING state
5. Virginia stands, child begins using material

**Time Cost:** 5-10 seconds real time

**Visual Feedback:**
- Loading bar labeled "Presenting [Material Name]..."
- Soft glow around Virginia and child during presentation
- Material appears in child's hands after completion

**Outcome:**
- Child immediately engaged with material
- Mood boost (+15)
- If material matches sensitive period: breakthrough potential

**Restrictions:**
- Cannot present material if child is UPSET or SLEEPING
- Cannot present material child is too young for
- Cannot present duplicate material (child already using it)

---

#### 3. COMFORT
**What:** Virginia soothes upset or discontent child

**Flow:**
1. Click child → "Comfort" action
2. Virginia walks to child
3. Kneels down (sprite animation)
4. **Comforting animation:**
   - Loading bar fills (3-5 seconds)
   - Gentle glow, heart particles
   - Child's expression changes (tears → calm)
5. Child's mood increases (+20)
6. Child transitions to WANDERING or CHOOSING WORK

**Time Cost:** 5-8 seconds real time

**Visual Feedback:**
- Heart particles float upward
- Child's ! icon disappears
- Smile appears on child's face

**When to Use:**
- Child is UPSET (required)
- Child is CLINGY (optional, helps detach)
- Child's mood is low (proactive care)

---

#### 4. SUGGEST MATERIAL (CHOOSING WORK state)
**What:** Virginia points out material on shelf

**Flow:**
1. Click child at shelf → "Suggest Material"
2. Quick action (no animation)
3. Child immediately selects suggested material
4. Transitions to CARRYING

**Time Cost:** Instant (no time penalty)

**Use Case:**
- Child is taking too long to choose
- You want specific child to use specific material
- Gentle guidance (Montessori-appropriate)

---

#### 5. REDIRECT TO WORK (CLINGY state)
**What:** Virginia gently guides clingy child to activity

**Flow:**
1. Click clingy child → "Redirect to Work"
2. Virginia presents material (same as PRESENT MATERIAL)
3. Child detaches, goes to rug
4. Virginia's movement speed returns to normal

**Time Cost:** 5-8 seconds

**Outcome:**
- Child no longer clingy
- Child engaged with work
- Virginia can move freely again

---

#### 6. SOOTHE (NAP TIME only)
**What:** Virginia helps child fall asleep

**Flow:**
1. Click awake child on mat → "Soothe"
2. Virginia walks to mat
3. Stands beside mat (gentle animation)
4. **Loading bar fills** (3-5 seconds)
5. Child lies down, closes eyes
6. Z Z Z animation appears
7. Child transitions to SLEEPING

**Time Cost:** 5-8 seconds per child

**Nap Minigame Core Mechanic!**

---

## Visual Feedback System

### Icons Above Child Heads

**Icon Types:**

| Icon | Meaning | When Shown |
|------|---------|-----------|
| 😊 | Happy | Mood > 80 |
| 😐 | Neutral | Mood 50-79 |
| 😢 | Discontent | Mood 20-49 |
| ❗ (red) | Upset | State = UPSET |
| 💗 | Clingy | State = CLINGY |
| ✨ | Breakthrough | During aha moment |
| 💤 | Sleeping | State = SLEEPING |
| ❗ (yellow) | Needs soothing | State = AWAKE (nap time) |

**Icon Behavior:**
- Floats 20px above child's head
- Gentle bob animation (moves up/down 2px)
- Fades in/out based on state changes
- Only shows most important icon (priority: Upset > Clingy > Mood)

---

### Animations

**Child Animations Needed:**

1. **Idle (standing):** Gentle sway, occasional look around
2. **Walking:** Simple 2-frame walk cycle
3. **Sitting (working):** Focused, slight movement
4. **Crying (upset):** Tears, red face, shaking
5. **Sleeping:** Lying down, gentle breathing
6. **Sitting up (awake on mat):** Alert, fidgeting
7. **Carrying material:** Walking with object in hands
8. **Breakthrough moment:** Jump, sparkle, excited face (3-second cutscene)

**Virginia Animations (interacting with children):**

1. **Kneeling:** Crouch down to child's level
2. **Presenting material:** Hands extended, showing object
3. **Comforting:** Gentle hand on shoulder, soft expression
4. **Observing:** Standing, watching, clipboard? (optional)

---

### Color-Coding Children

**For Easy Identification:**

Each child has unique **outfit color**:

| Child | Outfit Color | Why |
|-------|-------------|-----|
| Emma | Soft Pink | Cautious, gentle |
| Marcus | Bright Red | Bold, energetic |
| Lily | Yellow | Social, sunny |
| Aiden | Navy Blue | Independent, calm |
| Sofia | Lavender | Sensitive, creative |
| Noah | Sage Green | Easy-going, steady |
| Mia | Orange | Bold, confident |
| Oliver | Light Blue | Cautious, youngest |
| Zoe | Teal | Independent, precise |
| Elijah | Brown | Social, grounded |
| Ava | Coral | Bold, talkative |
| Liam | Gray | Cautious, routine |

**Visual Consistency:**
- Same color across all scenes (classroom, playground)
- Helps player learn names quickly
- Authentic (toddler classrooms often use color-coding)

---

## Child-to-Child Interactions (Simple)

**MVP: Minimal Complexity**

**Interactions:**

1. **Parallel Play:**
   - Two children work near each other (on adjacent rugs)
   - No direct interaction (authentic toddler behavior!)
   - Visual: children side-by-side, independent work

2. **Conflict (Rare):**
   - Two children want same material
   - One child becomes upset
   - Virginia must intervene (comfort, offer alternative)
   - **Trigger:** Random 5% chance when choosing work

3. **Comfort (Social children):**
   - If Elijah or Lily see upset child
   - They walk over, stand nearby (empathy)
   - Visual: social child near upset child, small heart icon
   - Does not solve problem (Virginia still needs to comfort)

**Post-MVP:**
- More complex social interactions
- Sharing materials
- Cooperative work
- Friendships forming

---

## Temperament Influence on Behavior

Each child's **temperament** affects behavior patterns:

### Cautious (Emma, Oliver, Liam)
- Slower to choose materials (longer at shelf)
- Prefer familiar materials (lower novelty bonus)
- Higher clingy likelihood (seek Virginia's presence)
- Longer concentration when engaged
- Upset trigger: loud noises, changes to routine

### Bold (Marcus, Mia, Ava)
- Faster material selection
- Higher movement speed
- Shorter concentration (unless perfect material match)
- Lower clingy likelihood
- Upset trigger: boredom, no challenging materials

### Social (Lily, Elijah)
- Prefer materials near other children (parallel play)
- Approach upset children (empathy)
- Moderate concentration
- Talk to Virginia more (click interaction has more dialogue)
- Upset trigger: isolation, no social interaction

### Independent (Aiden, Zoe)
- Longest concentration periods
- Rarely clingy
- Self-soothing (lower upset likelihood)
- Prefer working alone (away from others)
- Upset trigger: interruption, forced interaction

### Easy-Going (Noah)
- Balanced behavior (no extremes)
- Adapts to any material
- Moderate concentration
- Rarely upset
- Auto-sleeps during nap time (blessing!)

---

## Sensitive Period Influence

Each child has **2 active sensitive periods** (see children.js data):

**Sensitive Period Effects:**

1. **Material Preference:**
   - Child prioritizes materials matching sensitive period
   - 80% of material choices align with sensitive period

2. **Concentration Boost:**
   - If material matches: +2 minutes concentration
   - Higher likelihood of breakthrough moment

3. **Mood Boost:**
   - Working with matching material: +10 mood per minute (vs. +5 normal)

4. **Visual Indicator:**
   - When observing child, sensitive periods highlighted in UI
   - Helps player know what to craft

**Sensitive Period Types:**

- **Order:** Loves organizing, sorting, routine (Knobbed Cylinders, nesting boxes)
- **Small Objects:** Fascinated by tiny things (spooning, pincer work)
- **Movement:** Needs gross motor (playground equipment, carrying heavy items)
- **Language:** Vocabulary explosion (language baskets, picture cards)
- **Social Behavior:** Seeks interaction (parallel play, group activities)
- **Toilet Learning:** (Liam only - not deeply implemented in MVP)

---

## Player Feedback & Learning

### How Player Learns Child Behavior

**Through Observation:**
1. **Visual cues:** Icons, animations, colors
2. **Hover tooltips:** Quick info on mouseover
3. **Observation action:** Detailed notes
4. **Patterns over time:** Players notice Marcus always chooses movement materials

**Through Consequences:**
1. **Ignored upset child:** Other children become distressed
2. **Wrong material:** Child abandons work quickly
3. **Right material:** Breakthrough moment, long concentration
4. **Clingy child:** Slows Virginia down (teaches you to redirect)

**Through UI Hints:**
- First time child is upset: tooltip appears ("This child needs comfort!")
- First time child is clingy: tooltip explains mechanic
- Observation window suggests materials (teaches matching)

**Montessori Education:**
- Players learn "follow the child" principle
- Observation before action
- Prepared environment importance
- Individual needs matter

---

## Open Questions / Future Iteration

1. **Child hunger/bathroom needs?**
   - MVP: Skip (too complex)
   - Future: Add basic needs meter

2. **Child-to-child conflict resolution?**
   - MVP: Simple (one child upset, Virginia comforts)
   - Future: Teach children to resolve conflicts

3. **Children remember Virginia's actions?**
   - MVP: No memory (each day resets)
   - Future: Trust/bond builds over time

4. **Different arrival moods each day?**
   - MVP: Random mood on arrival (50-80 range)
   - Future: Influenced by previous day's experience

---

**Next Document:** UX-04 UI/HUD Layout & Menus

---

*Sally, UX Designer*
*MontessoriGame Development Team*
