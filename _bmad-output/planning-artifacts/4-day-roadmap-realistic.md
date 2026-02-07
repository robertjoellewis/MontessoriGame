# 4-Day Realistic Development Roadmap

**Target:** Playable demo for Virginia on Day 5 (morning of 2026-02-12)
**Development Days:** Feb 8, 9, 10, 11 (4 full days)
**Current Status:** Have observation mechanic working, 12 toddler sprites

---

## Reality Check

You want to build:
- Full day cycle (7am-11pm game time)
- Multiple locations (cottage, village, school)
- Player movement & sprite
- 3 NPCs (Zach, Kiki, Virginia)
- Time system with events
- Dialogue system
- Lesson presentation mechanic
- **Nap time challenge** (the centerpiece!)
- Energy system
- Money/economy
- Village exploration

**Honest assessment:** This is 2-3 weeks of work for most solo devs.

**BUT** — We can do a compelling vertical slice in 4 days if we're smart about it.

---

## The Vertical Slice Strategy

Instead of building everything shallow, we build ONE perfect day:

**The Perfect Day Demo:**
1. Wake up (simple cutscene)
2. Walk to school (timed challenge)
3. Morning work (1-2 lesson presentations)
4. **NAP TIME** (the star of the show!)
5. Afternoon wrap-up (simplified)
6. End of day (fade to black, "Day Complete" screen)

**What this gives Virginia:**
- She experiences the full rhythm of a work day
- She sees the nap time mechanic (her real experience!)
- She sees herself as the character
- She feels the time pressure and energy management
- It's PLAYABLE end-to-end

**What we skip for now:**
- Village exploration (coming soon screen)
- Shops & economy (can add post-demo)
- Home decorating (not core)
- After-work activities (not core)

---

## Revised 4-Day Plan

### Day 1 (Feb 8 - Today): Foundation & Movement

**Goal:** Virginia can move around and time passes

**Tasks:**
1. ✅ Create Virginia sprite (green sweatshirt, light brown curly hair, green eyes)
   - Walk animations (4 directions) or simple 2-direction
   - 48x48 or 64x64 base size
2. ✅ Create simple cottage interior scene
   - Bed, door, maybe coffee maker
   - Collision with walls
3. ✅ Implement WASD/arrow movement with Phaser physics
4. ✅ Add clock UI (upper right corner)
5. ✅ Implement time system (starts at 7:00am, advances)
6. ✅ Wake-up alarm sequence (cutscene or simple popup)
7. ✅ Door interaction → transition to village/school

**End of Day 1 Test:**
"Virginia wakes up, walks around cottage, can see time passing, can leave through door"

**Time Estimate:** 6-8 hours

---

### Day 2 (Feb 9): Get to School & Meet NPCs

**Goal:** Full morning sequence through toddler arrival

**Tasks:**
1. ✅ Create school exterior or direct-to-classroom (skip village for now)
   - Option A: Simple village path with school building
   - Option B: Door teleports directly to classroom (faster!)
2. ✅ Transition: Cottage → School
3. ✅ Create/modify classroom scene to be explorable
   - Reuse existing toddler sprites
   - Add some furniture/shelves
   - Add Zach and Kiki NPCs
4. ✅ Create Zach & Kiki sprites (simple, can be similar to Virginia)
5. ✅ Implement basic dialogue system
   - Click NPC → text box appears
   - Show name, text, click to close
   - Portraits optional (can be just text for MVP)
6. ✅ Toddlers "arrive" at 7:45-8:00am
   - Simple fade-in or walk-in animation
7. ✅ Late penalty (if you arrive after 7:45am, Zach scolds you in dialogue)

**End of Day 2 Test:**
"Wake up → walk to school → arrive → meet Zach & Kiki → toddlers arrive"

**Time Estimate:** 6-8 hours

---

### Day 3 (Feb 10): Work Day Mechanics

**Goal:** Lesson presentation + NAP TIME (the big one!)

**Morning Work (8am-12:15pm) - EXPANDED MONTESSORI ACTIVITIES:**

Goal: Show that teaching is the core, not just nap time!

1. ✅ **Lesson Presentation Mechanic** (8:00-10:00am)
   - Click child → menu pops up showing available lessons
   - Choose from 3-4 lessons:
     - Handwashing (Practical Life)
     - Pouring (Practical Life)
     - Table Wiping (Practical Life)
     - Simple Puzzle (Fine Motor)
   - Success/failure based on child's sensitive periods + mood
   - Present 3-4 lessons during this period
   - Feedback: stars earned, trust gained, child happy animation

2. ✅ **Circle Time Mini-Game** (10:00-10:15am)
   - All children sit in circle
   - Quick rhythm game or song sequence
   - Click to the beat or follow simple pattern
   - Success = all children engaged and happy
   - Shows group management skill

3. ✅ **Free Choice Work Period** (10:15-11:30am)
   - Children choose their own materials
   - You observe and redirect as needed
   - Some children work independently (good!)
   - Some wander or get stuck (you must help)
   - Click wandering child → offer material choices
   - This shows observation skill (Montessori core!)

4. ✅ **Outdoor Time** (11:30am-12:00pm)
   - Simple supervised outdoor sequence
   - Children play, you watch for safety
   - Maybe 1-2 interactions (help child on climber, redirect conflict)
   - Quick, not complex, but shows full day rhythm

5. ✅ **Lunch/Cleanup** (12:00-12:15pm)
   - Children help set tables, eat snack
   - You supervise and model
   - Quick sequence, builds to nap time

**Result:** Morning feels FULL of teaching activities, nap time is one part of the day

**Nap Time (12:15pm-2:30pm) - THE CENTERPIECE:**
1. ✅ Transition to nap time
   - Cutscene or popup: "It's nap time!"
   - Toddlers move to mats (or fade to nap scene)
2. ✅ Nap Time Challenge Mechanic:
   - 1-2 toddlers are fussy (crying icon or red outline)
   - Click fussy child → choose action:
     - "Rub back" (takes 30 seconds, reliable)
     - "Whisper" (takes 10 seconds, less reliable)
   - Timer: You have 30 minutes game time (maybe 2 minutes real time?)
   - Goal: Get all children asleep
3. ✅ Success/Failure outcomes:
   - All asleep → +3 Discovery Tokens, "Perfect Nap!" message, trust +10
   - Some awake → +1 token, "Good effort" message, trust +5
   - Failed → Zach helps, -2 trust, no reward
4. ✅ Time advances to 2:30pm

**Afternoon Activities (2:30pm-4:15pm) - MORE MONTESSORI CONTENT:**

Goal: Show afternoon teaching is also meaningful, not just wrap-up!

1. ✅ **Gentle Wake-Up** (2:15-2:30pm)
   - Lights slowly brighten
   - Soft music
   - You help groggy children wake up
   - Some wake easily, some need comfort

2. ✅ **Snack Time** (2:30-3:00pm)
   - Children wash hands (practicing Practical Life!)
   - Sit at table, you model manners
   - 1-2 interactions (help child pour milk, wipe spill)
   - Quick but shows Practical Life integration

3. ✅ **Afternoon Work Cycle** (3:00-3:30pm)
   - Shorter than morning but still meaningful
   - Present 1-2 more lessons
   - Show children working independently
   - You guide and observe
   - Reinforces that teaching happens ALL DAY

4. ✅ **Pickup Time** (3:30-4:15pm)
   - Parents arrive
   - Quick dialogues with 2-3 parents
   - Zach gives you end-of-day feedback
   - Children leave (animations)

5. ✅ **End of Day Summary**
   - "Day Complete!" screen
   - Show:
     - Total lessons presented (e.g., "7 lessons today!")
     - Stars earned
     - Trust level (progress bar)
     - Discovery Tokens (if earned)
     - Highlight: "Nap Time: Perfect!" or "Nap Time: Good Effort"
   - "Press any key to continue" → fade to black

**Result:** Afternoon has teaching content too! Nap time is special but not the ONLY thing

**End of Day 3 Test:**
"Full work day playable: arrive → morning lessons (3-4) → circle time → free choice period → outdoor time → lunch → NAP TIME challenge → wake up → snack → afternoon lessons (1-2) → pickup → end of day summary"

**Perception Check:** Does it feel like teaching is the main activity and nap time is one special challenge? YES!

**Time Estimate:** 10-12 hours (lots of mechanics, but many can be simplified)

---

### Day 4 (Feb 11): Polish, Energy System, Juice

**Goal:** Make it feel good to play

**Core Polish:**
1. ✅ Add energy bar UI (upper left)
   - Starts at 100
   - Depletes slowly over time
   - Depletes faster when presenting lessons
   - If it hits 0, you move slower or can't present lessons
2. ✅ Coffee mechanic (if time)
   - Interact with coffee maker in cottage
   - Restores 20 energy
   - Takes 10 seconds game time
3. ✅ Better feedback on lesson success/failure
   - Particle effects (stars, sparkles)
   - Sound effects (if time)
   - Text popups ("+5 Trust!", "+10 Stars")
4. ✅ UI improvements
   - Make clock more visible
   - Add trust meter display
   - Better dialogue boxes
5. ✅ Bug fixes & playtesting
   - Walk through entire sequence 3-4 times
   - Fix collision issues
   - Fix timing issues
   - Make sure nothing breaks
6. ✅ Opening splash screen
   - Title: "MontessoriGame - Prototype V1"
   - "Press any key to start"
   - Simple title screen with Virginia sprite
7. ✅ Instruction popup at start
   - "Use WASD to move, Click to interact, You must reach school by 7:45am!"

**Nice-to-Haves if Time:**
- Background music (1-2 tracks)
- Sound effects (footsteps, clock tick, alarm)
- Particle effects (sparkles on success)
- Better toddler reactions (happy face when taught well)
- Zach walking around classroom (simple AI)

**End of Day 4 Test:**
"Full polished experience: Title screen → wake up → walk to school → work day → nap time → end. Feels good to play. Energy system working. Good feedback on actions."

**Time Estimate:** 6-8 hours

---

## Activity Balance (Perception Management)

**Goal:** Players should see teaching as the core, nap time as ONE challenge among many

**Work Day Breakdown:**
- **Morning Teaching** (8:00am-12:15pm): 4 hours, 15 minutes
  - 3-4 lesson presentations
  - Circle time
  - Free choice observation & guidance
  - Outdoor supervision
  - Total: ~60% of the work day

- **Nap Time** (12:15pm-2:30pm): 2 hours, 15 minutes
  - One focused challenge sequence
  - Total: ~30% of the work day

- **Afternoon Teaching** (2:30pm-4:15pm): 1 hour, 45 minutes
  - Snack time (Practical Life integration)
  - 1-2 more lessons
  - Parent conversations
  - Total: ~20% of the work day

**Player Experience:**
- Presents 5-6 total lessons throughout the day
- Manages multiple child interactions
- Nap time feels like "the challenging midday moment" not "the whole game"
- Teaching activities bookend nap time → proper context

**This fixes the perception issue!** Virginia will see it's a teaching game with nap time as a memorable challenge, not a nap time game with some teaching.

---

## What We're Cutting (For Now)

These are great ideas but not core to the demo:

❌ **Village exploration** - Can add post-demo
❌ **Shops & economy** - Can add post-demo
❌ **After-work content** - Not core to showing Virginia her day
❌ **Bedtime mechanic** - Not core
❌ **Bathroom/potty training** - Complex, can add later
❌ **Snack time & outdoor play** - Can simplify or skip
❌ **Home decorating** - Not core
❌ **Complex NPC AI** - They can be static for MVP
❌ **Parent conversations** - Auto-sequence is fine
❌ **Multiple lessons** - 2 lessons (handwashing, pouring) is enough
❌ **Portraits for everyone** - Virginia, Zach, Kiki only (optional)

**Why cut these?**
- You want Virginia to see NAP TIME (her lived experience)
- You want her to feel the rhythm of a teaching day
- You want to show movement, time pressure, and basic mechanics
- Everything else is "nice to have" but not core emotional experience

---

## Success Metrics for Virginia's Demo

**She should feel:**
1. ✅ "This is my day!" (morning → school → nap time → pickup)
2. ✅ "Nap time is so real!" (the challenge of settling toddlers)
3. ✅ "I'm actually IN the game!" (Virginia sprite)
4. ✅ "This is cozy and fun" (Stardew vibes, not stressful)
5. ✅ "I want to play more!" (leaves her wanting village, more lessons, more days)

**Technical goals:**
- No game-breaking bugs
- Smooth movement
- Clear UI
- Understandable mechanics
- Fun nap time challenge

---

## Risk Mitigation

**Biggest Risks:**
1. **Nap time mechanic too complex** → Simplify to "click fussy kid 3 times to settle"
2. **Time system bugs** → Test extensively on Day 2
3. **Sprite animations take too long** → Use 2-direction (left/right) + flip, not 4-direction
4. **Dialogue system complex** → Just text boxes, no portraits
5. **Running out of time** → Cut energy system if needed, focus on nap time

**Contingency Plans:**
- If Day 3 runs long → Cut energy system, focus on nap time
- If animations are slow → Reuse sprites, simple idle + walk
- If dialogue is complex → Text-only, no portraits
- If time system breaks → Fixed events at button press instead of time-based

---

## Daily Check-Ins

**End of Each Day, Ask:**
1. Can I play through what's built so far?
2. Does it feel fun yet?
3. What's the riskiest thing for tomorrow?
4. What can I cut if I'm behind?

**Stay flexible.** The goal is a vertical slice that shows Virginia her day, with nap time as the star.

---

## Asset Checklist

### Sprites Needed:
- [  ] Virginia (player) - walk animations (4 or 2 directions)
- [  ] Zach (lead guide) - idle sprite, maybe portrait
- [  ] Kiki (assistant) - idle sprite, maybe portrait
- [  ] 12 toddlers - **ALREADY DONE!** ✅
- [  ] Parents (optional) - can use generic sprites

### Scenes/Maps:
- [  ] Cottage interior (bedroom + door)
- [  ] School exterior OR direct entrance (optional)
- [  ] Classroom (explorable, with toddlers)

### UI:
- [  ] Clock display
- [  ] Energy bar
- [  ] Trust meter
- [  ] Dialogue box
- [  ] Lesson menu (simple list)
- [  ] End of day summary screen

### Sounds (Optional):
- [  ] Alarm clock beep
- [  ] Footstep sounds
- [  ] Success/failure jingles
- [  ] Background music (1 track)

---

## Final Thoughts

**This is ambitious but doable.**

**Keys to success:**
1. **Focus on nap time** - that's the emotional core
2. **Cut ruthlessly** - village can wait
3. **Playtest daily** - make sure it's fun
4. **Don't perfect art** - programmer art is fine for prototype
5. **Timebox tasks** - if something takes >2 hours, simplify it

**Virginia will love it because:**
- She'll see her actual daily challenge (nap time!)
- She'll recognize the rhythm of her job
- She'll see herself in the game
- It's a thoughtful, personal gift

Let's build this! 🎮

---

*Roadmap ready. Let's start Day 1!*
