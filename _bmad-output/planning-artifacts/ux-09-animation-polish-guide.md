# UX Design Document 09: Animation & Polish Guide
**Author:** Sally (UX Designer)
**Date:** February 10, 2026
**Status:** Implementation-Ready
**Project:** MontessoriGame - Animation, Visual Effects, and Polish

---

## Overview

This document defines **key animation moments, visual effects (juice), and polish opportunities** that make the classroom gameplay feel alive, satisfying, and cozy.

**Design Goals:**
- Satisfying feedback (actions feel impactful)
- Cozy warmth (gentle, not flashy)
- Readable at-a-glance (clarity over complexity)
- Performance-conscious (12 children + effects must run smoothly)
- Stardew Valley aesthetic (chunky pixels, charming imperfection)

---

## Animation Priority Tiers

### Tier 1: MUST HAVE (Critical for MVP)

These animations are **essential for core gameplay** - without them, the game doesn't work or feels broken.

**Character Animations:**
1. Virginia walking (4-direction: up, down, left, right)
2. Virginia idle (standing still)
3. Virginia kneeling (presenting material to child)
4. Child walking (2-frame simple cycle)
5. Child sitting (working on rug)
6. Child sleeping (lying on mat)
7. Child sitting up (awake on mat during nap)
8. Child crying (upset state)

**UI Animations:**
9. Loading bar fill (material presentation, soothing, crafting)
10. Fade transitions (scene changes)
11. Notification slide-in/fade-out (messages)
12. Menu open/close (smooth overlay)

**Effect Animations:**
13. Sparkle burst (breakthrough moment, crafting complete, material placed)
14. Material sprite appear/disappear (presentation, placement)

**Total: 14 critical animations**

---

### Tier 2: SHOULD HAVE (High Priority for Polish)

These animations **significantly improve feel** - the game works without them, but feels flat.

**Character Polish:**
1. Child choosing work (pause at shelf, looking animation)
2. Child carrying material (holds item sprite)
3. Child returning material (places on shelf)
4. Virginia standing up (after kneeling)
5. Clingy child following Virginia (heart particles)

**Environmental:**
6. Z Z Z animation (floating above sleeping children)
7. Door open/close (children entering/leaving)
8. Playground equipment (swing motion, slide down)

**Feedback Effects:**
9. Material quality glow (Tier 3-4 materials shine)
10. Mood icon bob (gentle up/down float)
11. Breakthrough cutscene (child pop, sparkle burst, zoom)

**Total: 11 polish animations**

---

### Tier 3: NICE TO HAVE (Future Polish)

These animations are **optional enhancements** - add charm and depth over time.

1. Seasonal effects (snow on windows, leaves falling)
2. Weather (rain on playground, puddles)
3. Parent pickup (parent silhouette at door, child waves)
4. Virginia working at crafting table (hands moving, items appearing)
5. Children parallel play (looking at each other, smiling)
6. Virginia hair/clothing sway (wind effect on playground)
7. Day/night lighting shifts (morning bright, afternoon warm)
8. Material texture shine (wood grain, ceramic gloss)

**Total: 8 charm animations**

---

## Key Animation Details (Tier 1 - MVP Critical)

### 1. Virginia Walking Animation

**Type:** 4-directional walk cycle

**Frames:** 2 per direction (simple, Stardew-style)

**Directions:**
- **Walk Front:** Facing down (toward camera)
  - Frame 1: Left leg forward
  - Frame 2: Right leg forward
- **Walk Back:** Facing up (away from camera)
  - Frame 1: Left leg forward
  - Frame 2: Right leg forward
- **Walk Side:** Left/right (mirror sprite for right)
  - Frame 1: Leg mid-stride
  - Frame 2: Leg extended

**Frame Rate:** 8 FPS (same as existing cottage/village animations)

**Sprite Size:** 48x48 pixels (scaled 3x = 144x144 on screen)

**Visual Style:**
- Chunky, readable
- Bandana visible (head or neck, based on player choice)
- Simple, not detailed
- Matches existing Virginia sprites

**Already Implemented:** YES (existing in CottageScene, VillageScene)

---

### 2. Virginia Idle Animation

**Type:** Subtle breathing/sway

**Frames:** 2 frames (gentle movement)

**Animation:**
- Frame 1: Neutral pose
- Frame 2: Slight sway (1-2 pixels shift)
- Loop every 2 seconds

**Variants:**
- Idle Front
- Idle Back
- Idle Side

**Purpose:** Feels alive, not static

**Already Implemented:** Partially (idle sprite exists, but not animated yet)

**Implementation:** Simple tween (shift Y position by 1px up/down)

---

### 3. Virginia Kneeling Animation

**Type:** Transition from standing → kneeling

**Frames:** 3 frames (smooth squat)

**Animation:**
1. **Frame 1 (0ms):** Standing
2. **Frame 2 (150ms):** Mid-squat (knees bent)
3. **Frame 3 (300ms):** Kneeling (down at child's level)

**Duration:** 300ms (quick, not slow)

**Trigger:** When presenting material or comforting child

**Reverse:** Same animation reversed (kneeling → standing)

**Visual:** Virginia sprite shrinks vertically (~30% shorter when kneeling)

**New Asset:** Needs creation (simple edit of standing sprite)

---

### 4. Child Walking Animation

**Type:** 2-frame walk cycle (even simpler than Virginia)

**Frames:** 2 per direction

**Directions:** Same as Virginia (front, back, side)

**Frame Rate:** 8 FPS

**Sprite Size:** 32x32 pixels (children are smaller than Virginia)

**Visual Style:**
- Toddler proportions (large head, short legs)
- Color-coded outfits (each child unique color)
- Simple, charming

**Variation:** 12 children = 12 different colored sprites (same animation, different colors)

**New Asset:** Needs creation

---

### 5. Child Sitting (Working)

**Type:** Idle animation while on rug

**Frames:** 2-3 frames (subtle movement)

**Animation:**
- Frame 1: Sitting, hands on material
- Frame 2: Slight shift (leaning, looking down)
- Frame 3: Return to Frame 1
- Loop every 2 seconds

**Material Interaction (Optional Tier 2):**
- Pouring: Tilt animation (pour motion)
- Stacking: Hand raise (placing block)
- Matching: Hand move (picking card)

**For MVP:** Generic sitting animation (works for all materials)

**New Asset:** Needs creation

---

### 6. Child Sleeping (On Mat)

**Type:** Lying down, peaceful

**Frames:** 1 static frame (minimal animation)

**Visual:**
- Horizontal sprite (lying on side)
- Eyes closed
- Gentle breathing (optional 2-frame subtle chest rise)

**Accompaniment:** Z Z Z particle effect (floats upward)

**New Asset:** Needs creation

---

### 7. Child Awake (Sitting Up on Mat)

**Type:** Alert, fidgeting

**Frames:** 2 frames (fidget loop)

**Animation:**
- Frame 1: Sitting up, looking left
- Frame 2: Sitting up, looking right
- Loop every 1.5 seconds

**Visual Indicator:** ❗ icon above head (yellow)

**New Asset:** Needs creation (edit of sleeping sprite, vertical)

---

### 8. Child Crying (Upset)

**Type:** Distressed animation

**Frames:** 2-3 frames (shaking, tears)

**Animation:**
- Frame 1: Crying face, tear drops
- Frame 2: Shake (shift 2px left)
- Frame 3: Shake (shift 2px right)
- Rapid loop (4 FPS = fast shake)

**Visual:**
- Red face (flushed)
- Tears visible (blue drops)
- ❗ icon above head (red)

**Sound:** Soft crying (quiet, not jarring)

**New Asset:** Needs creation

---

### 9. Loading Bar Fill Animation

**Type:** Progress bar (horizontal)

**Visual:**
```
Presenting Material...
▓▓▓▓▓▓░░░░░░ (50%)
```

**Animation:**
- Smooth fill from left → right
- Fill color: Green (#5CBF54)
- Empty color: Gray (#CCCCCC)
- Border: Dark brown (#3E2C1E)

**Duration:** Variable (3-5 seconds for presentation, 3-5 for soothing, etc.)

**Position:** Above interacting characters (Virginia + child)

**Already Implemented:** Partially (loading bar UI exists in other contexts)

**Implementation:** Tween bar width from 0% → 100%

---

### 10. Fade Transition (Scene Changes)

**Type:** Screen fade (black overlay)

**Animation:**
- Fade OUT: Screen darkens from transparent → black (500ms)
- Load new scene
- Fade IN: Screen lightens from black → transparent (500ms)

**Total Duration:** ~1 second (including load time)

**Trigger:** Village → Classroom, Classroom → Playground, etc.

**Already Implemented:** YES (existing in scene transitions)

---

### 11. Notification Slide-In/Fade-Out

**Type:** Text box appearance

**Animation:**
1. **Slide In (200ms):**
   - Notification starts off-screen (top)
   - Slides down to position
   - Gentle ease-out
2. **Hold (3 seconds):**
   - Visible, readable
3. **Fade Out (1 second):**
   - Alpha 100% → 0%
   - Then destroy

**Position:** Top-center (below clock)

**Visual Style:** Stardew-style text box (brown border, cream background)

**Already Implemented:** Partially (notifications exist, may need animation polish)

---

### 12. Menu Open/Close Animation

**Type:** Overlay fade + slide

**Animation:**
1. **Open:**
   - Dark overlay fades in (100ms, 50% opacity)
   - Menu slides in from center (200ms, elastic ease)
2. **Close:**
   - Menu slides out to center (150ms)
   - Dark overlay fades out (100ms)

**Smooth Feel:** Elastic ease (gentle bounce on open)

**Already Implemented:** Partially (menu exists, may need animation polish)

---

### 13. Sparkle Burst (Multi-Purpose Effect)

**Type:** Particle effect

**Visual:**
- 8-12 small star particles
- Emit from center point
- Spread outward in circle (radial burst)
- Fade and shrink as they travel
- Colors: White, yellow, gold (sparkle colors)

**Duration:** 800ms (quick, satisfying)

**Uses:**
- Breakthrough moment (child)
- Crafting complete (crafting table)
- Material placed on shelf (shelf)
- Perfect nap achieved (nap area)

**Implementation:**
- Phaser particle emitter
- Burst mode (emit once, then stop)

**New Asset:** Small star sprite (8x8 pixels)

---

### 14. Material Sprite Appear/Disappear

**Type:** Sprite scale animation

**Animation:**
1. **Appear:**
   - Scale from 0 → 1 (200ms)
   - Gentle ease-out
   - Optional: Slight rotation (5° wobble)
2. **Disappear:**
   - Scale from 1 → 0 (150ms)
   - Quick fade (alpha 100% → 0%)

**Uses:**
- Material presentation (appears between Virginia and child)
- Material placement (appears on shelf)
- Crafting complete (appears on table)

**Feels:** Magical, satisfying

**Already Implemented:** NO (needs creation)

---

## Tier 2 Animations (High Priority Polish)

### Breakthrough Cutscene (Special Moment)

**Trigger:** Child has "aha moment" with material

**Animation Sequence:**

1. **Pause Gameplay (Optional):**
   - Slow down time (50% speed) OR pause entirely
   - Dim background slightly (child is spotlight)

2. **Child Pop (200ms):**
   - Child sprite "pops" upward (bounce 10px up)
   - Eyes widen, mouth opens (surprise sprite)
   - Scale 1.0 → 1.1 → 1.0 (gentle pump)

3. **Sparkle Burst (500ms):**
   - Major sparkle effect (more particles than normal)
   - Rainbow colors (not just yellow)
   - Radiates from child

4. **Text Appears (300ms):**
   - "[Name] had a breakthrough! ✨"
   - Slides in from top
   - Bright, celebratory

5. **Camera Zoom (Optional - Tier 3):**
   - Slight zoom in on child (1.0 → 1.2 scale)
   - Hold for 1 second
   - Zoom back out

6. **Resume Gameplay:**
   - Time returns to normal
   - Background brightens
   - Child continues working (now with satisfied expression)

**Total Duration:** 3-4 seconds (feels special, not too long)

**Sound:** Gentle chime + sparkle sound

**Frequency:** 1-3 times per day (if playing well)

---

### Material Quality Glow (Tier 3-4 Materials)

**Type:** Ambient glow effect

**Visual:**
- **Tier 3 (Heirloom):**
  - Gentle blue-white glow (aura around sprite)
  - Pulse animation (subtle, 2-second loop)
  - Soft, inviting
- **Tier 4 (Legacy):**
  - Radiant gold glow (more intense)
  - Faster pulse (1-second loop)
  - Occasional sparkle particle (1-2 per second)

**Implementation:**
- Phaser glow filter OR sprite overlay
- Low opacity (20-30%, not overwhelming)

**Purpose:**
- Visually distinguish quality
- Draw player's eye
- Feels special and valuable

---

### Z Z Z Floating Animation

**Type:** Particle effect (sleeping children)

**Visual:**
- 3 "Z" letters (pixel font)
- Float upward from child's head
- Fade as they rise
- Stagger timing (Z1, then Z2, then Z3)

**Animation:**
1. Z appears above head (alpha 0 → 100%, 200ms)
2. Floats upward (Y position -20px over 2 seconds)
3. Fades out (alpha 100% → 0%, last 500ms)
4. Destroy and spawn new Z (loop)

**Color:** White or light blue

**Frequency:** New Z every 1.5 seconds

**Feels:** Peaceful, cozy

---

## Visual Effects (Juice)

### Mood Icon Bob

**Type:** Gentle float animation

**Animation:**
- Icon (😊, 😐, 😢, etc.) floats above child's head
- Bob up/down by 2-3 pixels
- Sine wave motion (smooth)
- Loop every 2 seconds

**Purpose:** Draws attention, feels alive

**Already Implemented:** NO (static icons currently)

**Implementation:** Simple tween (Y position oscillate)

---

### Shelf Highlight (Material Placement)

**Type:** Glow outline

**Animation:**
- When hovering shelf during placement mode:
  - Yellow glow outline (2px thick)
  - Pulse animation (subtle brightness change)
- When material placed:
  - Flash bright (200ms)
  - Fade to normal (300ms)

**Purpose:** Clear affordance (where can I place this?)

---

### Door Open/Close

**Type:** Sprite animation

**Frames:** 3 frames (door opening)

**Animation:**
1. Frame 1: Closed door
2. Frame 2: Half-open (swinging)
3. Frame 3: Fully open

**Duration:** 300ms

**Reverse:** Frames 3 → 1 (closing)

**Uses:**
- Children entering/leaving classroom
- Transitions to playground

**Sound:** Soft creak (wood door)

**New Asset:** Needs creation (3-frame sprite)

---

## Sound Design Integration

### Key Sound Moments

**Positive Sounds:**
- Breakthrough moment: Gentle wind chime (high pitch, magical)
- Crafting complete: Soft "ding" (bell, satisfying)
- Material placed: Subtle "thunk" (wood on wood)
- All children asleep: Music swell (peaceful, accomplished)
- Child engaged with material: Soft sparkle (tiny, cute)

**Neutral Sounds:**
- Walking: Soft footsteps (grass, wood floor - context)
- Door open/close: Wooden creak (gentle)
- Menu open: Soft whoosh (page turn)

**Negative Sounds:**
- Child upset: Soft crying (quiet, not jarring)
- Time warning (5 min to nap): Gentle bell (not alarm)

**Ambient:**
- Classroom: Soft toddler babble, material sounds (blocks clacking, water pouring - very quiet)
- Playground: Birds, children laughing (distant), breeze
- Nap time: Soft lullaby, peaceful silence

---

## Performance Considerations

### Optimization Strategies

**Sprite Limits:**
- Max sprites on screen: ~30 (12 children + Virginia + materials + effects)
- Reuse animations (children share walk cycles, just different colors)
- Static sprites when off-screen or far from camera

**Particle Effects:**
- Limit particle count (sparkle burst = max 12 particles)
- Short lifespan (particles destroy after 800ms)
- No continuous emitters (only bursts when needed)

**Animation Pooling:**
- Reuse animation objects (don't create new each time)
- Destroy completed animations immediately

**Frame Rate Target:**
- 60 FPS on modern hardware
- 30 FPS acceptable on older hardware
- Test with 12 children + effects simultaneously

---

## Polish Priorities for MVP

### Must-Have Polish (Launch Day)

1. **Smooth transitions:** All scene fades polished
2. **Satisfying breakthroughs:** Sparkle + sound + text
3. **Clear feedback:** Loading bars, notifications
4. **Readable children:** Walk, sit, sleep animations working
5. **Material presentation feels good:** Kneeling, showing material

**Time Estimate:** 2-3 days of animation work + implementation

---

### Should-Have Polish (Week 2)

1. **Breakthrough cutscene:** Full animation sequence
2. **Material glow:** Tier 3-4 quality distinction
3. **Z Z Z sleep particles:** Nap time coziness
4. **Mood icon bob:** Visual polish
5. **Playground equipment animations:** Swings, slide

**Time Estimate:** 1-2 days polish pass

---

### Nice-to-Have Polish (Future Updates)

1. **Seasonal effects:** Snow, leaves, flowers
2. **Weather system:** Rain, sun
3. **Parent pickup animations:** Waves, hugs
4. **Virginia crafting animation:** Hands working
5. **Lighting shifts:** Day/night atmosphere

**Time Estimate:** Ongoing (post-launch polish)

---

## Animation Asset Checklist

### Sprites to Create (MVP)

**Virginia:**
- [x] Walk cycle (4 directions, 2 frames each) - EXISTING
- [x] Idle (front/back/side) - EXISTING
- [ ] Kneeling (3 frames) - NEW

**Children (x12 color variations):**
- [ ] Walk cycle (4 directions, 2 frames) - NEW
- [ ] Sitting (working, 2 frames) - NEW
- [ ] Sleeping (lying down, 1 frame) - NEW
- [ ] Awake on mat (sitting up, 2 frames) - NEW
- [ ] Crying (upset, 3 frames) - NEW

**Effects:**
- [ ] Sparkle particle (8x8 star sprite) - NEW
- [ ] Z Z Z letters (pixel font, 16x16 each) - NEW
- [ ] Loading bar (UI element) - EXISTING (needs polish)

**Environmental:**
- [ ] Door open/close (3 frames) - NEW (optional for MVP)

**Total NEW Assets:** ~25 sprite frames (manageable for MVP)

---

## Open Questions / Future Iteration

1. **Camera zoom for breakthroughs?**
   - Adds drama but may disorient
   - **Decision for MVP:** Skip (keep camera fixed)

2. **Children facial expressions change?**
   - Happy face when engaged, sad when upset?
   - **Decision for MVP:** Use icons above head (simpler)

3. **Seasonal sprite variants?**
   - Winter classroom, spring flowers?
   - **Decision for MVP:** Skip (one season)

4. **Advanced particle effects (rain, snow)?**
   - Requires weather system
   - **Decision for MVP:** Skip

---

**Next Document:** UX-10 Implementation Priorities & MVP Scope

---

*Sally, UX Designer*
*MontessoriGame Development Team*
