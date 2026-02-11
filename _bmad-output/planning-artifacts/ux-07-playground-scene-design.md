# UX Design Document 07: Playground Scene Design
**Author:** Sally (UX Designer)
**Date:** February 10, 2026
**Status:** Implementation-Ready
**Project:** MontessoriGame - Outdoor Playground Gameplay

---

## Overview

This document defines the **outdoor playground scene** - the daily outdoor time from 11:30 AM - 12:15 PM where children engage in gross motor play while Virginia supervises and observes.

**Design Goals:**
- Breather phase (simpler than classroom)
- Observation-focused gameplay (minimal interaction)
- Visual variety (different environment)
- Authentic outdoor play behavior
- Cozy, joyful atmosphere

---

## Playground Overview

### Purpose & Role in Daily Flow

**Timeline Position:**
- **When:** 11:30 AM - 12:15 PM (45 game minutes = ~1 minute real time)
- **After:** Morning work cycle (intense teaching)
- **Before:** Nap time (intense minigame)
- **Function:** Palate cleanser, rhythm break, observation time

**Gameplay Intensity:**
- **Classroom:** High (managing 12 children, presenting materials, responding to needs)
- **Playground:** Low (supervising, watching, minimal intervention)
- **Nap Time:** Medium-High (nap minigame, then crafting decisions)

**Player Activities:**
- Watch children play (passive observation)
- Click children to check moods/energy
- Supervise safety (rare interventions)
- Notice movement patterns (who climbs, who's cautious)
- Appreciate outdoor joy (aesthetic moment)

---

## Playground Layout

### Scene Dimensions

**Viewport:** 900x650 pixels (same as classroom for consistency)

**Camera:** Fixed (no scrolling - see entire playground)

**Visual Style:** Bright, outdoor, natural

---

### Spatial Layout

```
┌─────────────────────────────────────────────────────────┐
│  [SKY - Blue gradient with fluffy clouds]              │
│                                                          │
│  [FENCE]──────[TREES BEYOND]──────[FENCE]───────[FENCE] │
│                                                          │
│    [Small           [Open Grass Area]      [Sandbox]    │
│     Climber]                                (2 kids)    │
│     (3 kids)         [Running children]                 │
│                                                          │
│                  [Virginia standing,                     │
│                   supervising]                           │
│                                                          │
│    [Slide]          [Garden Bed]           [Swings]     │
│    (2 kids)         (flowers)              (2 kids)     │
│                                                          │
│    [FENCE]─────────[DOOR to Classroom]──────[FENCE]     │
│                    (bottom center)                       │
└─────────────────────────────────────────────────────────┘
```

---

### Environmental Elements

**Sky (Background):**
- Blue gradient (light blue at top, slightly lighter at horizon)
- White fluffy clouds (2-4 clouds, gentle)
- Bright, cheerful atmosphere

**Grass (Ground):**
- Green textured ground (like village grass)
- Darker green patches for depth
- Fresh, vibrant color

**Fence (Perimeter):**
- Wooden slat fence around edges (brown, simple)
- ~96-128px tall
- Keeps children contained visually
- Gates at bottom center (door back to classroom)

**Trees Beyond Fence:**
- Visible above/beyond fence (depth)
- Leafy trees, pine trees (variety)
- Subtle parallax? (optional polish)

**Garden Bed (South Side, near door):**
- Small wooden frame with soil
- Flowers blooming (colorful)
- Maybe small vegetables (tomatoes, carrots)
- Montessori connection to nature

---

### Play Equipment

**Equipment Placement:**

| Equipment | Location | Size | Children Capacity |
|-----------|----------|------|------------------|
| **Small Climber** | Northwest | 96x96px | 3 children |
| **Slide** | Southwest | 64x96px | 1-2 children (1 sliding, 1 waiting) |
| **Sandbox** | Northeast | 96x96px | 2-3 children |
| **Swings** | Southeast | 96x128px | 2 children (2 bucket swings) |

**Equipment Sprites (Toddler-Safe):**

**1. Small Climber:**
- 3-step wooden structure (toddler-height)
- Chunky, safe design
- Bright primary colors (red, blue, yellow)
- Children can "climb" (sprite animation on structure)

**2. Slide:**
- Small toddler slide (short, gentle slope)
- Wide base (stable)
- Red slide surface, yellow sides
- Children "slide down" (animation down slope)

**3. Sandbox:**
- Wooden frame (natural wood color)
- Sand interior (tan/beige)
- Small toys visible (bucket, shovel)
- Children "dig" or sit inside

**4. Swings:**
- 2 bucket swings (toddler safety seats)
- Bright colors (one red, one blue)
- Chain suspension from top bar
- Children "swing" (gentle back-forth animation)

---

### Open Grass Area (Center)

**Purpose:**
- Space for running, free movement
- Represents Montessori "freedom of movement" principle

**Behavior:**
- Children run through this space
- No equipment, just open play
- Some children just wander here (independent play)

**Visual:**
- Mostly empty (emphasizes openness)
- Occasional child sprite running across
- Dynamic, energetic feel

---

## Children's Behavior in Playground

### Movement Patterns

**Faster Movement Speed:**
- Playground: 150 px/second (vs. classroom: 100 px/s)
- More energetic, running instead of walking
- Reflects outdoor energy release

**Free Roaming:**
- Children NOT tied to specific equipment
- Move between equipment and grass area
- More chaotic than classroom (authentic!)

**Equipment Preference Based on Temperament:**

| Temperament | Preferred Equipment | Behavior |
|-------------|-------------------|----------|
| **Bold** (Marcus, Mia, Ava) | Climber, Slide | High energy, constant movement |
| **Cautious** (Emma, Oliver, Liam) | Sandbox, near Virginia | Slower, observant, careful |
| **Social** (Lily, Elijah) | Any (prefers parallel play) | Plays near other children |
| **Independent** (Aiden, Zoe) | Sandbox, swings | Solitary focus, content alone |
| **Easy-Going** (Noah) | Anywhere | Adaptable, tries everything |

---

### Child States in Playground

**Simplified from Classroom:**

1. **PLAYING (on equipment):**
   - At climber, slide, sandbox, or swing
   - Engaged animation (climbing, sliding, digging, swinging)
   - Happy expression

2. **RUNNING:**
   - Moving across grass area
   - Fast walking animation
   - Energetic, joyful

3. **WANDERING:**
   - Slower walk, exploring
   - Looking around
   - Calm, curious

4. **NEAR VIRGINIA (clingy):**
   - Standing close to Virginia
   - Not playing with equipment
   - Same clingy mechanic as classroom (slows Virginia 50%)

5. **UPSET (rare):**
   - Fell? Got scared? (very rare)
   - Virginia must comfort
   - Minimal occurrence (outdoor time is happy!)

---

### Equipment Interaction (Automatic)

**Children Choose Equipment:**
- AI-driven (no player control)
- Walk to equipment when available
- Engage automatically (no click needed)

**Visual Feedback:**
- Child walks to climber → sprite changes to "climbing" pose
- Child reaches slide → sprite slides down (animated)
- Child enters sandbox → sprite sits, digging motion
- Child reaches swing → sprite sits in bucket, gentle swing motion

**Duration at Equipment:**
- 1-3 game minutes per activity
- Then move to different equipment or grass area
- Natural rotation

---

## Virginia's Role (Supervision)

### Minimal Interaction Design

**Virginia's Activities:**

1. **Standing/Walking (Supervision):**
   - Can walk anywhere in playground
   - No specific action required
   - Just presence (authentic supervision)

2. **Observing Children:**
   - Click child → Quick observation tooltip appears
   - Shows:
     - Mood
     - Current activity ("Playing on climber")
     - Energy level (outdoor play drains energy, then replenishes)
   - No detailed observation window (simpler than classroom)

3. **Responding to Clingy Children:**
   - Same mechanic as classroom
   - Child follows Virginia, slows her down
   - Can redirect to equipment (click child → "Encourage Play")
   - Child walks to nearby equipment

4. **Rare Interventions:**
   - If child upset (rare): Comfort action
   - If child "stuck" on equipment (very rare): Help down

**No Teaching:**
- No material presentations
- No detailed interactions
- Just supervision and observation

---

### What Virginia Learns (Observation Goals)

**Player Gains Information:**

1. **Movement Sensitive Period:**
   - Notice which children love climber/slide (Marcus, Mia, Ava)
   - Informs crafting decisions (movement-based materials)

2. **Temperament Confirmation:**
   - Cautious children stay near Virginia or sandbox
   - Bold children climb and run constantly
   - Reinforces personality understanding

3. **Energy Patterns:**
   - All children release pent-up energy
   - Makes nap time easier (tired children sleep faster)
   - Strategic benefit to outdoor time

4. **Social Dynamics:**
   - Who plays near whom (friendships)
   - Who prefers solitary play
   - Empathy moments (child comforts another)

**No Immediate Action Required:**
- This is observation for future planning
- Not urgent like classroom needs
- Relaxed, contemplative

---

## Visual & Audio Design

### Playground Aesthetic

**Color Palette:**
- **Sky:** Bright blue (#87CEEB)
- **Grass:** Vibrant green (#5CBF54)
- **Equipment:** Primary colors (red, blue, yellow)
- **Fence:** Natural brown (#8B6F47)
- **Flowers:** Pinks, purples, yellows (pops of color)

**Lighting:**
- Bright midday sun (no shadows for simplicity)
- Cheerful, energetic vibe
- Contrast to calm classroom

---

### Sound Design

**Ambient Sounds:**
- Birds chirping (gentle, background)
- Children laughing (distant, soft)
- Wind rustling leaves (subtle)
- Occasional "wheee!" from slide (cute!)

**Music:**
- Upbeat, playful (but still cozy, not chaotic)
- Lighter than classroom music
- Acoustic instruments (xylophone, ukulele?)

**Sound Effects:**
- Swing creaking (gentle)
- Slide "whoosh" when child slides
- Sandbox digging (soft scraping)

---

## Transition In/Out of Playground

### Transition FROM Classroom (11:30 AM)

**Trigger:** Time reaches 11:30 AM

**Notification:**
```
┌─────────────────────────────────┐
│  🌞 Time for outdoor play!      │
│     Let's go outside!           │
└─────────────────────────────────┘
```

**Transition:**
1. Notification appears
2. Brief pause (2 seconds) - Virginia can finish current action
3. **Fade to black (500ms)**
4. Load playground scene
5. **Fade in (500ms)**
6. All 12 children + Virginia now in playground
7. Children scatter to equipment/grass (animated)

**No Player Input Required:**
- Automatic transition (gentle rail)
- Cannot skip or delay (scheduled event)

---

### Transition TO Nap Time (12:15 PM)

**Trigger:** Time reaches 12:15 PM

**Notification:**
```
┌─────────────────────────────────┐
│  💤 Nap time!                   │
│     Time to go inside.          │
└─────────────────────────────────┘
```

**Transition:**
1. Notification appears
2. Children stop playing, walk toward door (animation)
3. **Fade to black (500ms)**
4. Load classroom scene (nap configuration)
5. **Fade in (500ms)**
6. Nap mats visible, children on mats
7. Nap minigame begins

**Automatic:**
- No player choice (scheduled)
- Natural flow to next phase

---

## Gameplay Pacing

### Why Playground is "Simple"

**Design Rationale:**

1. **Breather Between Intense Phases:**
   - Morning work cycle: High engagement (presenting, observing, responding)
   - Nap time: High engagement (minigame, crafting decisions)
   - Playground: LOW engagement (watching, minimal interaction)
   - Prevents player fatigue

2. **Reflects Real Teaching:**
   - Outdoor time IS simpler (children self-direct)
   - Teacher supervises, doesn't teach
   - Authentic Montessori outdoor experience

3. **Visual Variety:**
   - Different environment (indoor → outdoor)
   - Different colors, sounds, energy
   - Keeps game fresh

4. **Strategic Observation:**
   - Player learns about children's movement patterns
   - Informs evening crafting (what materials to make)
   - Valuable info without high effort

---

### What Players DO During 45 Game Minutes (~1 min real time)

**Typical Playground Session:**

**0:00-0:15 (Real time: 0-15 seconds):**
- Watch children scatter to equipment
- Click 2-3 children to observe moods
- Walk around playground (explore)

**0:15-0:45 (Real time: 15-45 seconds):**
- Watch children play (passive)
- Maybe redirect 1 clingy child
- Notice movement patterns
- Enjoy the moment (cozy vibe)

**0:45-1:00 (Real time: 45-60 seconds):**
- Notification: "Nap time coming soon!"
- Children start naturally slowing down (tired animations)
- Prepare mentally for nap minigame

**Player Experience:**
- Low pressure
- Satisfying to watch children happy and energetic
- Brief but meaningful

---

## Edge Cases & Special Situations

### Rainy Day (Future Feature)

**What if it rains?**

**Alternate Flow:**
- Skip playground entirely
- Stay inside classroom (11:30 AM - 12:15 PM)
- Indoor gross motor activities (dancing, climbing on indoor equipment?)
- Different energy (children more restless)

**Decision for MVP:** Skip weather system (always sunny)

---

### Safety Events (Very Rare)

**Child "Stuck" on Climber:**
- Random 2% chance while climbing
- Child sprite at top of climber, ! icon
- Virginia must walk over, click child → "Help Down"
- Brief interaction (3 seconds)
- Child returns to ground, continues playing

**Purpose:**
- Adds slight unpredictability
- Keeps player engaged (not totally passive)
- Teaches supervision importance

**Frequency:** Maybe once every 3-4 playground sessions

---

### Clingy Children in Playground

**Same Mechanic as Classroom:**
- Cautious children (Emma, Oliver, Liam) may follow Virginia
- Slows her movement by 50%
- Duration: 20-30 seconds, then child wanders off

**Redirect Action:**
- Click clingy child → "Encourage Play"
- Virginia gestures toward equipment
- Child walks to nearest equipment, engages
- Virginia's speed returns to normal

---

## UI Elements (Minimal)

### Playground HUD

**Visible Elements:**
- **Clock (Top-Right):** Shows time (11:30 AM → 12:15 PM)
- **Energy Meter (Top-Left):** Virginia's energy (optional visibility)
- **Notification Area (Top-Center):** Transition notifications

**Hidden Elements:**
- No mission tracker (no specific goals)
- No material inventory (not relevant outdoors)
- No crafting menu

**ESC Menu:**
- Still available (pause game)
- Inventory, settings, etc. accessible

---

### Child Hover Tooltips

**Simplified Tooltip (Mouseover):**

```
┌─────────────────────┐
│ Marcus (30 months)  │
│ Mood: Joyful 😄     │
│ Activity: Climbing  │
│ Energy: High        │
└─────────────────────┘
```

**No Detailed Observation:**
- Just quick info
- No interaction menu
- Observation window available if clicked (but simpler than classroom)

---

## Technical Specifications

### Scene Structure

**Scene Class:**
```javascript
export default class PlaygroundScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlaygroundScene' });
    }

    init(data) {
        this.gameTime = data.gameTime; // 11:30 AM
        this.children = data.children; // Array of 12 child objects
    }

    create() {
        // 1. Create sky background
        // 2. Create grass ground
        // 3. Create fence perimeter
        // 4. Place play equipment (climber, slide, sandbox, swings)
        // 5. Create garden bed
        // 6. Spawn 12 children (scatter to equipment)
        // 7. Create Virginia sprite
        // 8. Setup camera (fixed)
        // 9. Setup controls (walking)
        // 10. Setup timer (transition at 12:15 PM)
    }

    update(time, delta) {
        // 1. Update clock
        // 2. Update children AI (movement, equipment interaction)
        // 3. Update Virginia movement
        // 4. Check for 12:15 PM (transition to nap time)
    }
}
```

---

### Children AI (Simplified)

**State Machine (Playground-Specific):**

```
Choose Equipment → Walk to Equipment → Play (1-3 min) → Return to Center → Repeat
```

**Equipment Selection:**
- Based on temperament preference
- Weighted random (bold children prefer climber/slide)
- If equipment full: Choose different equipment or run in grass

**No Material Interaction:**
- Just movement and equipment engagement
- Simpler AI than classroom

---

## Open Questions / Future Iteration

1. **Weather system?**
   - Rain, snow, sunny?
   - **Decision for MVP:** Always sunny (skip weather)

2. **Outdoor materials?**
   - Water table? Chalk? Balls?
   - **Decision for MVP:** Just equipment (no materials)

3. **Playground customization?**
   - Add equipment over time?
   - **Decision for MVP:** Fixed equipment (no customization)

4. **Playground different seasons?**
   - Fall leaves, spring flowers?
   - **Decision for MVP:** Generic season (always green/blooming)

---

**Next Document:** UX-08 Progression & Onboarding Design

---

*Sally, UX Designer*
*MontessoriGame Development Team*
