# UX Design Document 05: Material Presentation & Feedback Systems
**Author:** Sally (UX Designer)
**Date:** February 10, 2026
**Status:** Implementation-Ready
**Project:** MontessoriGame - Material Interaction & Player Feedback

---

## Overview

This document defines **how materials are presented to children, how player receives feedback, and how progression feels satisfying**.

**Design Goals:**
- Clear cause-and-effect (player action → visible child growth)
- Multiple feedback types (quick actions, big moments, long-term progress)
- Satisfying animations and effects (juice!)
- Educational value (player learns Montessori principles)
- Cozy feel (celebrate growth, not punish failure)

---

## Material Presentation System

### Quick Presentation (Standard Materials)

**When:** Virginia presents a material to a child during work cycle

**Flow:**

1. **Virginia clicks child → "Present Material"**
2. **Material selection menu appears:**
   ```
   ┌─────────────────────────────────┐
   │  Present Material to Emma       │
   ├─────────────────────────────────┤
   │                                 │
   │  ✅ Nesting Boxes (Tier 1)      │
   │  ✅ Pouring Set (Tier 2) ⭐      │
   │  ✅ Spooning Transfer (Tier 1)  │
   │  ❌ Pink Tower (not ready)      │
   │                                 │
   │  ⭐ = Matches sensitive period   │
   └─────────────────────────────────┘
   ```
3. **Player selects material**
4. **Presentation animation begins:**
   - Virginia walks to child (if not already nearby)
   - Virginia kneels down (sprite change)
   - Material sprite appears between them
   - **Loading bar fills above them:**
     ```
     Presenting Pouring Set...
     ▓▓▓▓▓▓▓▓░░░░ (60%)
     ```
   - Duration: 3-5 seconds real time
5. **Completion:**
   - Loading bar finishes
   - Virginia stands up
   - Child transitions to WORKING state
   - Material now visible in child's hands/rug
   - **Success feedback:**
     - Soft sparkle effect
     - Gentle "ding" sound
     - Child's mood increases (+15)

**Visual Style:**
- Warm glow around Virginia and child during presentation
- Soft, gentle animations (not flashy)
- Material sprite grows from small → full size (zoom effect)
- Cozy, intimate moment

---

### Breakthrough Presentation (Perfect Match)

**When:** Material PERFECTLY matches child's sensitive period + child is ready for challenge

**Special Conditions:**
- Material quality Tier 3+ (Heirloom or Legacy)
- Child's sensitive period is highly active
- Child's mood is high (80+)
- First time seeing this material

**Enhanced Presentation:**

1. **Same flow as quick presentation, BUT:**
2. **Enhanced visual effects:**
   - Brighter glow (golden instead of white)
   - More sparkles
   - Star particles float upward
3. **Extended animation (5-7 seconds instead of 3-5)**
4. **Special dialogue/text:**
   - "Emma's eyes light up! This is exactly what she needed." (subtitle appears)
5. **Immediate breakthrough potential:**
   - Child's concentration time doubled
   - Higher chance of "aha moment" during work

**Player Feedback:**
- Feels special and significant
- Reinforces "this is the RIGHT material at the RIGHT time" concept
- Teaches Montessori "follow the child" principle

---

### Material Quality Visual Differences

**How quality tier affects presentation:**

| Tier | Presentation Feel | Visual Effects | Duration |
|------|------------------|----------------|----------|
| **Tier 1 (Handmade)** | Simple, functional | Minimal sparkle, soft glow | 3 seconds |
| **Tier 2 (Classic)** | Polished, professional | Moderate sparkle, warm glow | 4 seconds |
| **Tier 3 (Heirloom)** | Beautiful, special | Rich sparkle, golden glow | 5 seconds |
| **Tier 4 (Legacy)** | Magnificent, transformative | Abundant sparkle, radiant glow, particles | 6-7 seconds |

**Rationale:**
- Higher quality materials FEEL more valuable
- Player is rewarded for investing time in crafting
- Visual distinction teaches player to prioritize quality

---

## Child Engagement Feedback (During Work)

### Engagement Loading Bar

**When child is working with material:**

**Visible above child's head (optional toggle):**

```
Emma - Pouring Set
▓▓▓▓▓▓▓▓░░░░ (60% complete)
```

**Behavior:**
- Bar fills gradually as child works
- Fill rate based on:
  - Material quality (higher tier = faster fill)
  - Sensitive period match (match = faster fill)
  - Child's mood (happy = faster fill)
- When bar reaches 100%:
  - **Skill increase** (child "masters" this material)
  - Small celebration (sparkle, soft chime)
  - Bar resets, can fill again (repeated practice)

**Visual Feedback Levels:**

| Fill % | Visual | Meaning |
|--------|--------|---------|
| 0-25% | Empty bar, neutral glow | Just started |
| 26-50% | Filling, soft sparkle | Engaged |
| 51-75% | Filling faster, moderate sparkle | Deep concentration |
| 76-99% | Almost full, bright sparkle | Nearing mastery |
| 100% | FULL, burst of sparkles! | Skill mastered! |

**Implementation:**
- Bar only visible when hovering over child (not cluttered)
- OR always visible with toggle in settings
- Small, unobtrusive (20px tall max)

---

### "Aha Moment" Cutscene

**When:** Child has breakthrough while working (rare, special event)

**Trigger Conditions:**
- Child has worked with material for 5+ game minutes
- Material matches sensitive period
- Material quality Tier 3+ (OR perfect Tier 2 match)
- Random chance: 20% per eligible work session

**Cutscene Flow:**

1. **Child's sprite changes:**
   - Eyes widen, mouth opens (surprise/delight expression)
   - Sprite "pops" slightly (bounce animation)
2. **Screen focuses on child:**
   - Slight zoom in (camera moves closer)
   - Background dims slightly (child is spotlight)
3. **Visual effects:**
   - Sparkles burst from child
   - Star particles float upward
   - Rainbow shimmer effect (optional, subtle)
4. **Text appears above child:**
   - "Emma had an 'aha moment'!" (Stardew-style text box)
   - Material name: "Pouring Set mastered!"
5. **Sound effect:**
   - Gentle chime (like Stardew "level up" sound)
   - NOT jarring, cozy and warm
6. **Duration:** 3-4 seconds total
7. **Return to normal:**
   - Zoom out, child continues working (now with satisfied expression)

**Player Reward:**
- Satisfying moment (you helped this child grow!)
- Notification added to end-of-day summary
- Stars/trust earned
- Child's skill increases (visible in observation journal)

**Frequency:**
- Rare enough to feel special (not every work session)
- Common enough to occur 1-3 times per day (if playing well)
- Tied to player actions (presenting right materials)

---

## Progression Feedback (Long-Term Growth)

### Child Skill Levels

**Each child has skill levels in each material type:**

**Example: Emma's Skills**
- **Practical Life:** Level 3 (Novice)
- **Sensorial:** Level 1 (Beginner)
- **Language:** Level 2 (Learning)
- **Movement:** Level 4 (Developing)

**Skill Level Chart:**

| Level | Name | Description |
|-------|------|-------------|
| 1 | Beginner | Just introduced, needs support |
| 2 | Learning | Understands basics, building confidence |
| 3 | Novice | Can work independently for short periods |
| 4 | Developing | Strong concentration, mastering skills |
| 5 | Proficient | Confident, can help others (older toddlers) |

**How Skills Increase:**
- Working with materials (gradual increase)
- Completing loading bar (small boost)
- Breakthrough moments (large boost)
- Repeated practice over days (cumulative)

**Visible in Observation Journal:**
- Player can track each child's progress
- See which areas need more support
- Plan which materials to craft next

---

### Trust & Relationship Feedback

**Trust Meter (School-Level):**
- Represents parents' and director's confidence in Virginia
- Increases based on:
  - Children's breakthroughs
  - High engagement during work cycles
  - Successful nap times
  - Positive interactions with parents at pickup

**Trust Levels:**

| Trust % | Title | Unlocks |
|---------|-------|---------|
| 0-24% | Observer | Starting tier, basic recipes |
| 25-49% | Assistant | Tier 2 recipes, storage at school |
| 50-74% | Guide-in-Training | Tier 3 recipes, advanced materials |
| 75-100% | Lead Guide | Tier 4 recipes, custom materials |

**Visual Display:**
- Small meter in ESC menu (not always visible)
- Progress bar with title
- Notification when leveling up:
  ```
  ┌─────────────────────────────────┐
  │  🎉 Trust Level Increased!      │
  │  You are now an ASSISTANT!      │
  │  New recipes unlocked!          │
  └─────────────────────────────────┘
  ```

**Trust Gain Events:**
- Child breakthrough: +5 trust
- All children engaged (no wandering) for 10+ minutes: +3 trust
- Perfect nap time (all asleep quickly): +5 trust
- Parent compliment at pickup: +2 trust
- Director observes class (special event): +10 trust

---

## Material Effectiveness Feedback

### How Player Knows Material is Working

**During Work Session:**

1. **Visual Cues:**
   - Child's expression (focused, happy)
   - Loading bar filling (progress visible)
   - Sparkles/glow intensity (higher quality = more sparkle)
   - Concentration time (longer = better match)

2. **Hover Tooltip:**
   - Shows engagement level:
     - "High engagement ✨"
     - "Moderate engagement"
     - "Low engagement 😐"

3. **Child Behavior:**
   - High engagement: child sits still, focused
   - Low engagement: child fidgets, looks around
   - Wrong material: child abandons quickly (< 1 minute)

**After Work Session:**

1. **Observation Notes:**
   - Auto-generated note: "Emma worked with Pouring Set for 6 minutes - excellent concentration!"
   - Suggests next step: "Try presenting Spooning Transfer next"

2. **End-of-Day Summary:**
   - Lists which materials were most popular
   - Highlights breakthroughs
   - Celebrates growth

---

## Crafting Completion Feedback

### When Material Finishes Crafting

**During Nap Time (or After School):**

1. **Crafting finishes:**
   - Material moves from "In Progress" to "Completed"
2. **Notification appears:**
   ```
   ┌─────────────────────────────────┐
   │  ✅ Polished Pouring Set         │
   │     complete!                    │
   └─────────────────────────────────┘
   ```
3. **Visual effect:**
   - Sparkle burst from crafting table
   - Soft chime sound
4. **Material ready to place:**
   - Appears in inventory
   - Player can place on shelf immediately

**Satisfying Moment:**
- Immediate reward for time investment
- Anticipation of presenting to children
- Visible progress (shelf gets fuller)

---

### Quality Tier Visual Distinction

**When viewing crafted material in inventory or on shelf:**

**Tier 1 (Handmade) 🪵:**
- Simple sprite, muted colors
- No special effects
- Basic outline

**Tier 2 (Classic) 🌿:**
- Polished sprite, vibrant colors
- Subtle shine/highlight
- Clean edges

**Tier 3 (Heirloom) ✨:**
- Detailed sprite, rich colors
- Gentle glow aura
- Occasional sparkle

**Tier 4 (Legacy) 🌟:**
- Stunning sprite, perfect colors
- Radiant glow aura
- Constant gentle sparkle
- Draws the eye (visually distinct)

**Player Experience:**
- Pride in creating beautiful materials
- Visual reward for effort
- Children drawn to higher-tier materials (authentic Montessori beauty principle)

---

## Failure States & Gentle Corrections

### When Things Go Wrong (Cozy, Not Punishing)

**Problem:** Virginia presents wrong material (doesn't match child's needs)

**Feedback:**
- Child works for < 1 minute, then abandons material
- No upset state (just disinterest)
- Child returns material to shelf, wanders
- **Gentle hint notification:**
  - "Emma seems uninterested in the Pink Tower right now. Try observing her needs first."

**No Punishment:**
- No energy drain
- No trust loss
- Just natural consequence (child not engaged)

---

**Problem:** Child is upset for too long (ignored)

**Feedback:**
- Child's ! icon grows larger (more urgent)
- Other children become distressed (empathy)
- **Hint notification after 2 minutes:**
  - "Marcus needs comfort. Click on him to help."

**Consequences:**
- Other children's moods decrease slightly
- Slight energy drain for Virginia (emotional labor)
- BUT: No fail state, no game over, just harder day

---

**Problem:** Nap time fails (children won't sleep)

**Feedback:**
- Time runs out (2:30 PM arrives)
- Some children still awake
- **Auto-resolution:**
  - Awake children fall asleep anyway (realistic - they're tired!)
  - Virginia has LESS crafting time (but still some)
- **Message:**
  - "Nap time was challenging today. You have 30 minutes to craft." (instead of 2 hours)

**No Failure:**
- Day still succeeds
- Just less optimal outcome
- Encourages trying again tomorrow

---

## Positive Reinforcement Philosophy

### Celebrate Successes, Downplay Failures

**Successes (Amplified):**
- Breakthrough moments: cutscene, sparkles, sound
- Perfect nap: big celebration notification
- All children engaged: subtle glow, warm music
- End-of-day summary: highlights wins

**Failures (Minimized):**
- Ignored upset child: gentle hint, no alarm
- Wrong material: child just loses interest, no drama
- Slow nap time: just less crafting time, still progress

**Design Goal:**
- Player feels motivated, not stressed
- Mistakes are learning opportunities
- Always forward progress (no game over)

---

## Sound Design (Brief Notes)

### Audio Feedback

**Positive Sounds:**
- Breakthrough moment: Gentle chime (like wind chime)
- Material complete: Soft "ding"
- Child engaged: Subtle sparkle sound
- All children asleep: Peaceful music swell

**Neutral Sounds:**
- Walking: Soft footsteps
- Material placement: Gentle "thunk"
- Menu open: Soft whoosh

**Negative Sounds:**
- Child upset: Soft crying (quiet, not jarring)
- Time warning: Gentle bell (not alarm)

**Ambient:**
- Classroom: Soft toddler babble, gentle activity sounds
- Playground: Birds chirping, children laughing (distant)
- Nap time: Soft lullaby, peaceful ambiance

**Music:**
- Morning: Gentle, energetic
- Afternoon: Calm, contemplative
- Nap time: Soft, sleepy
- End of day: Warm, accomplished

---

## Animation & Polish Moments

### Key Moments That Deserve Special Treatment

**High Priority (Must Have):**

1. **Breakthrough cutscene:**
   - Child sprite pop
   - Sparkle burst
   - Text appearance
   - Zoom in/out

2. **Material presentation:**
   - Virginia kneeling
   - Material appearing
   - Loading bar fill
   - Completion sparkle

3. **All children asleep:**
   - Peaceful glow over nap area
   - Gentle Z Z Z animations
   - Music transition

4. **Crafting completion:**
   - Sparkle burst from table
   - Material sprite appearance
   - Notification slide-in

**Medium Priority (Nice to Have):**

5. **Child choosing material:**
   - Walk to shelf
   - Slight pause (thinking)
   - Pick up material (hands extend)

6. **Child returning material:**
   - Carry material back
   - Place on shelf (gentle animation)
   - Satisfied expression

7. **Clingy child following Virginia:**
   - Small hearts floating
   - Child sprite stays near Virginia
   - Detach animation (child walks away)

**Low Priority (Polish for Later):**

8. **Seasonal effects:**
   - Snow on windows (winter)
   - Flowers blooming outside (spring)
   - Leaves falling (autumn)

9. **Parent pickup:**
   - Parent silhouette at door
   - Child waves goodbye
   - Door close animation

---

## Open Questions / Future Iteration

1. **Engagement bar always visible?**
   - Or only on hover?
   - **Decision for MVP:** Only on hover (less clutter)

2. **Breakthrough frequency?**
   - Too rare = frustrating, too common = not special
   - **Decision:** ~20% chance when conditions met (1-3 per day)

3. **Skill level visibility?**
   - Should child's level show in-game or only in journal?
   - **Decision for MVP:** Journal only (keeps classroom clean)

4. **Material durability?**
   - Do materials wear out over time (need re-crafting)?
   - **Decision for MVP:** No durability (avoid tedium)

---

**Next Document:** UX-06 Crafting UX Design

---

*Sally, UX Designer*
*MontessoriGame Development Team*
