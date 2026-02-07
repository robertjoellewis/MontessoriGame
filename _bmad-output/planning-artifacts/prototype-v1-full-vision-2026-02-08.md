# Prototype V1 - Full Day Cycle Vision

**Date:** 2026-02-08
**Target:** Playable demo for Virginia in 5 days (4 days of development)
**Goal:** Complete morning → work → evening cycle with core mechanics

---

## Player Character: Virginia

**Visual Description:**
- Green eyes
- Shoulder-length hair, parted in middle, slightly curly
- Light brown hair color
- Green sweatshirt (ideally says "Green Bean" if readable)
- Beautiful/appealing character design

**Sprite Needs:**
- Idle animation
- Walk animations (4 directions: up, down, left, right)
- Size: 48x48 or 64x64 base

---

## Full Day Cycle (7am - 11pm)

### Phase 1: Morning at Home (7:00am - 7:45am)
**Location:** Virginia's tiny cottage in village

**Sequence:**
1. **Wake up** - Alarm clock goes off at 7:00am
2. **Tutorial popup** - "Time to start your day! Make coffee and head to school. You must arrive by 7:45am!"
3. **Make coffee** (optional but gives energy buff)
   - Interact with coffee maker
   - Animation/sound
   - +20 energy or morning buff
4. **Leave house** - Walk out door to village

**House Interior:**
- Bed
- Coffee maker (interactive)
- Door (exit to world map)
- Simple cozy decor

---

### Phase 2: Commute to School (7:00am - 7:45am)
**Location:** Village map

**Mechanics:**
- WASD/Arrow keys to move
- Must reach school by 7:45am
- If late → reprimand from Zach (lead guide), maybe -trust or -wage
- Village has paths, houses, maybe a few NPCs walking around

**Clock UI:**
- Upper right corner
- Shows current time (7:15am, etc.)
- Color changes when getting close to deadline (yellow at 7:40, red at 7:43)

---

### Phase 3: School Arrival (7:45am - 8:00am)
**Location:** School entrance/classroom

**Sequence:**
1. **Arrive at school** - Enter building
2. **Meet co-workers:**
   - **Zach** (lead guide) - your supervisor, gives assignments
   - **Kiki** (assistant) - peer, friendly
3. **Parents arrive with toddlers** (7:45-8:00am)
   - Stardew Valley-style dialogue system
   - Portrait + name + text box
   - Parents drop off kids (some quick, some chatty)
   - Option to talk to each parent or auto-greet
4. **All 12 toddlers arrive** by 8:00am

**NPCs:**
- Zach (portrait needed)
- Kiki (portrait needed)
- 12 toddler parents (portraits optional for MVP, could reuse generic parent sprites)

---

### Phase 4: Morning Work Cycle (8:00am - 12:15pm)
**Location:** Classroom

**Core Mechanics Needed:**

#### A. Energy System
- Energy bar (0-100)
- Depletes slowly over time
- Depletes faster with active tasks (presenting lessons, handling disruptions)
- Coffee/snacks restore energy
- Low energy = can't do certain tasks, slower movement

#### B. Observation & Lesson Presentation
**Already built:** Hover to observe children

**New mechanic:** Click child → Lesson Menu
- Menu shows available lessons based on:
  - Your tier (Assistant can only do Practical Life)
  - Child's sensitive periods
  - Child's current mood/readiness
- Select lesson → Mini-animation or cutscene
- Success/Failure based on:
  - Right lesson for right child
  - Child's mood
  - Your energy level
  - Timing (not interrupting another child)

**Lessons Available (Tier 1 - Assistant):**
1. Handwashing
2. Pouring (water)

**Outcome:**
- Success: +trust with Zach, child happy, +stars (currency)
- Failure: Child frustrated, -energy, no reward

#### C. Bathroom/Potty Training
**Context:** Some toddlers (18-24mo) are still potty training

**Mechanic:**
- Child shows "need bathroom" indicator (icon above head)
- You must escort them to bathroom
- Takes 2-3 minutes game time
- If ignored → accident → cleanup required, child upset, -trust

**Bathrooms:**
- 2 child-sized toilets in bathroom area
- Can only help 2 kids at once

#### D. Child Needs System (Simplified)
Each child has meters/states:
- **Engagement** (working, wandering, bored)
- **Energy** (awake, tired, needs rest)
- **Bathroom** (fine, needs to go, accident)
- **Mood** (happy, neutral, frustrated, crying)

**Player's Job:**
- Keep children engaged (present lessons, redirect wanderers)
- Notice when they need bathroom
- Comfort upset children (click → soothe action)

#### E. Co-worker AI
- **Zach** (lead guide) - also presenting lessons, managing class
- **Kiki** (assistant) - helping with bathroom, comforting kids
- They help, but you need to pull your weight
- If you slack off → Zach notices, -trust

---

### Phase 5: Nap Time (12:15pm - 2:30pm)
**Location:** Classroom (nap area)

**The Challenge Mechanic (Virginia's experience!):**

**Setup:**
- All 12 toddlers on mats
- Lights dimmed, soft music
- 1-2 children will be disruptive (crying, talking, wandering)

**Player Actions:**
1. **Identify disruptive child** (they have indicator)
2. **Choose intervention:**
   - Rub back (slow, reliable, ties you up)
   - Whisper reassurance (quick, less effective)
   - Move mat (risky, might wake others)
3. **Settle all children within 30 minutes** (by 12:45pm)

**Success Tiers:**
- ⭐⭐⭐ All asleep by 12:45pm: +3 Discovery Tokens, +10 Trust, 1hr 30min free time
- ⭐⭐ 10-11 asleep: +1 Discovery Token, +5 Trust, 30min free time
- ⭐ 8-9 asleep: +5 Stars, +2 Trust, minimal free time
- ❌ Fewer than 8: Zach steps in, -2 Trust, no free time

**Free Time (if successful):**
- If you got kids to sleep early, you get time to:
  - Prep materials for afternoon
  - Journal (reflection, +XP)
  - Talk to Zach/Kiki (build relationships)
  - Eat lunch (+energy)

---

### Phase 6: Afternoon (2:30pm - 4:15pm)
**Location:** Classroom

**Activities:**
- Wake children gently (2:15-2:30pm)
- Snack time (2:30-3:00pm) - children eat, you supervise
- Outdoor time (3:00-3:30pm) - children play outside, you supervise
- Pickup time (3:30-4:15pm) - parents arrive, you chat briefly

**Simplified for MVP:**
- Snack time: Automatic scene, maybe 1-2 interactions
- Outdoor time: Could be cut for MVP or simple "children play, you watch" scene
- Pickup: Quick dialogues with 2-3 parents (others auto-leave)

---

### Phase 7: After Work (4:15pm - 11:00pm)
**Location:** Village

**What You Can Do:**
1. **Explore village** - Walk around, discover locations
2. **Talk to townspeople** - Learn about them, get hints
3. **Visit shops:**
   - **Coffee shop** - Buy coffee (+energy items)
   - **General store** - Household items, decorations for your cottage
   - **Artisan/Woodworker** - Montessori materials (gacha pool or direct purchase)
4. **Go home** - Decorate cottage, go to bed

**Wage System:**
- You earn $50/day (base wage as assistant)
- More if you did well (bonuses)
- Spend on:
  - Coffee/food: $2-5
  - Cottage decorations: $10-50
  - Montessori materials: $20-100

**Village NPCs (MVP - 3-4):**
- Shopkeeper (general store)
- Barista (coffee shop)
- Woodworker (materials)
- Friendly neighbor (hints/lore)

**Bedtime Mechanic:**
- Must be in bed by 11:00pm
- If not → pass out wherever you are
- Wake up in bed next morning with -30 energy, -$10 (village tax)

---

## UI Elements Needed

### HUD (Always Visible):
1. **Clock** (upper right) - Current time
2. **Energy bar** (top left) - 0-100
3. **Money** (top left) - $XXX
4. **Date** (optional) - Day 1, Day 2, etc.

### Menus:
1. **Lesson Menu** (when clicking child) - List of lessons, select one
2. **Dialogue Box** (Stardew style) - Portrait + name + text, click to advance
3. **Pause Menu** (ESC key) - Resume, Options, Quit

---

## Currency & Progression Systems

### 1. Stars ⭐ (Daily Earnings)
- Earn from successful lessons
- Earn from good nap time
- Spend on... (TBD, maybe materials later)

### 2. Discovery Tokens 🎟️ (Rare)
- Earn from perfect nap time
- Earn from milestones
- Spend on gacha pulls (materials)

### 3. US Dollars 💵 (Wage)
- Earn $50/day base
- +bonuses for good performance
- Spend in village shops

### 4. Trust Meter (Relationship with Zach)
- 0-100 scale
- Increases with good work
- Decreases with mistakes/lateness
- Gates progression (eventually become lead guide)

---

## Stardew Valley Inspirations to Implement

### 1. Movement & Controls
- WASD or arrow keys
- Smooth 8-directional movement (or 4-directional for simpler)
- Pixel-perfect collision with walls/objects

### 2. Dialogue System
- Click NPC → dialogue box appears
- Portrait on left, name at top, text in box
- Click or press key to advance
- Option to skip or speed up

### 3. Time System
- Time always advancing (10 seconds real time = 10 minutes game time?)
- Clock in UI
- Certain events happen at certain times
- Day ends at 11pm (forced sleep)

### 4. Energy Management
- Energy bar depletes
- Food/drinks restore it
- Running out prevents actions

### 5. Calendar/Schedule
- Each day follows same schedule (for now)
- Later: weekends, special events, seasons

### 6. NPC Schedules
- Zach and Kiki have routines
- Parents arrive/leave at set times
- Villagers walk around village

---

## Toddler Montessori Activities (Research Needed)

**Age Range: 18mo-3yr**

### Core Activities to Implement:
1. **Practical Life:**
   - Handwashing (already in design)
   - Pouring (already in design)
   - Table wiping
   - Food prep (spreading, peeling)
   - Dressing frames (buttons, zippers)

2. **Gross Motor:**
   - Walking on line
   - Climbing
   - Outdoor play

3. **Fine Motor:**
   - Puzzles
   - Stacking
   - Threading
   - Transferring (tongs, spoons)

4. **Language:**
   - Naming objects
   - Books
   - Songs/fingerplays

5. **Sensorial:**
   - Color matching
   - Texture boards
   - Sound matching

6. **Care of Self:**
   - Potty training (already in design)
   - Putting on shoes
   - Hanging up coat

### For MVP, Focus On:
- 2-3 Practical Life lessons (handwashing, pouring, table wiping)
- Potty training mechanic
- Simple needs (bathroom, energy, mood)
- Observation system (already built)

---

## Art Assets Needed

### Sprites:
1. **Virginia (player)** - Walk animations (4 directions), idle, interact
2. **Zach (lead guide)** - Idle, walk, portrait
3. **Kiki (assistant)** - Idle, walk, portrait
4. **12 toddlers** - Already have! (may need walk animations)
5. **Parents** - Generic sprites, optional portraits
6. **Villagers** - 3-4 generic NPCs

### Locations:
1. **Virginia's cottage interior** - Bedroom, kitchen area, simple
2. **Village map** - Paths, houses, trees, school building
3. **School exterior** - Building entrance
4. **Classroom** - Already have layout concept, need:
   - Shelves with materials
   - Tables
   - Nap mats area
   - Bathroom (2 toilets)
   - Door
5. **Village shops** - Simple interiors (1-2 for MVP)

### UI:
1. Clock display
2. Energy bar
3. Money counter
4. Dialogue box frame
5. Lesson menu frame
6. Portraits (Virginia, Zach, Kiki minimum)

---

## Sound (Optional for MVP, but Nice)
- Background music (calm, cozy)
- Sound effects:
  - Alarm clock beep
  - Coffee brewing
  - Footsteps
  - Children laughing/crying
  - Success/failure jingles
  - Clock ticking

---

## Technical Challenges

### 1. Pathfinding
- Virginia walking around cottage, village, classroom
- Collision detection with walls, furniture
- **Solution:** Phaser has Arcade Physics, use colliders

### 2. NPC Schedules
- Parents, Zach, Kiki need timed behaviors
- **Solution:** Simple state machines triggered by time

### 3. Time System
- Game clock always running
- Events fire at specific times
- **Solution:** Phaser time events

### 4. Dialogue System
- Text display, portraits, click to advance
- **Solution:** Build custom dialogue manager

### 5. Save System
- Player progress needs to save
- **Solution:** LocalStorage for now

---

## 4-Day Development Plan (Rough)

This is AMBITIOUS. Will need to prioritize ruthlessly.

### Day 1 (Today): Core Movement & Time System
- Virginia sprite (walk animations)
- Cottage interior (basic)
- WASD movement with collision
- Clock UI
- Time system (7am start)
- Alarm clock wake-up

**Goal:** Walk around cottage, see time passing

---

### Day 2: Commute & School Arrival
- Village map (simple)
- Path from cottage to school
- School exterior
- Walk to school mechanic (arrive by 7:45)
- Classroom scene (reuse existing toddler sprites)
- Zach & Kiki sprites/portraits
- Basic dialogue system

**Goal:** Full morning sequence (wake → commute → arrive → meet NPCs)

---

### Day 3: Work Day Mechanics
- Lesson presentation mechanic (click child → menu → present lesson)
- Energy bar system
- Bathroom need indicator & mechanic
- Nap time challenge (THE BIG ONE)
- Afternoon sequence (simplified)
- Pickup time

**Goal:** Full work day playthrough (8am-4:15pm)

---

### Day 4: After Work & Polish
- Village exploration after work
- 1-2 shops (coffee, general store)
- Buy/spend money
- Bedtime mechanic (11pm or pass out)
- Energy restoration (coffee, food)
- Polish UI, fix bugs, playtest
- Add juice (particles, sounds if time)

**Goal:** Full 7am-11pm day cycle, loop back to next morning

---

## MVP Scope (What to Cut if Needed)

### Must-Have (Core Experience):
✅ Virginia sprite & movement
✅ Cottage wake-up sequence
✅ Commute to school (timed)
✅ Meet Zach & Kiki
✅ Toddlers arrive
✅ Present 1-2 lessons
✅ Nap time mechanic (Virginia's highlight!)
✅ Basic pickup sequence
✅ Clock & time system

### Nice-to-Have (Add if Time):
- Energy bar (adds depth)
- Bathroom mechanic (authentic but complex)
- Village exploration (can be simplified)
- Shops & economy (can be 1 shop instead of 3)
- After-work content (can be "coming soon" area)
- Portraits for all NPCs (can use text-only dialogues)
- Sound/music

### Can Cut for MVP:
- Home decorating
- Multiple shops
- Complex village NPCs
- Outdoor time at school
- Detailed parent conversations
- Snack time complexity
- Co-worker AI behaviors

---

## Success Criteria for Virginia Demo

**What makes this impressive:**
1. ✅ She sees herself (Virginia sprite, green sweatshirt)
2. ✅ Full day cycle (morning to evening)
3. ✅ Nap time mechanic (she'll recognize the challenge!)
4. ✅ Real Montessori activities (handwashing, pouring)
5. ✅ Cozy pixel art style
6. ✅ Stardew Valley vibes (movement, time, dialogue)

**She'll love it if:**
- The nap time mechanic feels real
- The toddlers have personality
- It captures the daily rhythm of her job
- It's cozy and stress-free (not punishing)

---

## Questions to Resolve

1. **Time scale:** How fast does time pass? (10 real seconds = 10 game minutes?)
2. **Animation complexity:** Full 4-direction sprites or simplified 2-direction (left/right + flip)?
3. **Toddler AI:** Do they move around or stay in grid for MVP?
4. **Dialogue length:** Full conversations or short interactions?
5. **Village size:** How big? 5 buildings or 15?

---

*This is the full vision. Now let's prioritize what's achievable in 4 days...*
