# Robert Boyfriend Mechanic (Future Feature)

**Status:** POST-PROTOTYPE - Not for 4-day MVP, document for later
**Purpose:** Valentine's Day gift feature, adds cozy relationship simulation layer
**Valentine's Day Theme:** This prototype is a Valentine's Day gift, so hearts and romantic elements should be present

---

## Core Concept

Virginia has a boyfriend named Robert (work-from-home) who lives with her in the cottage. Building a good relationship with Robert provides gameplay benefits (time-saving help) and adds cozy life-sim depth.

---

## Robert's Character

**Who is Robert:**
- Virginia's boyfriend (user is Robert in real life!)
- Work-from-home job (laptop desk in bedroom)
- Supportive partner who helps when relationship is strong
- Provides morning cuddles, coffee, and dinner when love is high

**Visual Presence:**
- Desk with laptop in bedroom corner
- Can be in bed in the morning (for cuddle time)
- Sits at desk during work hours
- (User will provide photo reference for sprite)

---

## Love Points System

### How to Earn Love Points:

1. **Morning Cuddles** (7:00-7:15 AM)
   - Stay in bed with Robert for a few extra minutes
   - Click/interact with Robert → cuddle animation
   - +5 love points per minute of cuddle time
   - Trade-off: Uses time (may be late to school!)

2. **Morning Kisses** (Before leaving)
   - Kiss Robert goodbye before leaving cottage
   - +3 love points
   - Takes 5 seconds

3. **Evening Quality Time** (After work)
   - Talk to Robert when you get home
   - Share stories about your day
   - +5 love points per conversation

4. **Bedtime Kisses** (Before sleep)
   - Kiss Robert goodnight
   - +5 love points

5. **Weekend Dates** (Future - not MVP)
   - Go on dates (coffee shop, park, etc.)
   - +20 love points per date
   - Costs money but builds relationship

### Love Points Tiers:

- **0-50:** Starting relationship - Robert works, no help
- **51-100:** Sweet boyfriend - Makes coffee some mornings
- **101-200:** Very supportive - Makes coffee + packs lunch
- **201+:** Amazing partner - Coffee + lunch + dinner ready when you get home

---

## Gameplay Benefits

### Tier 1: Coffee Helper (51-100 points)
**Benefit:** Robert makes coffee for you 50% of mornings
- Saves 10 seconds game time
- Auto +20 energy when you wake up
- Message: "Robert made you coffee! ☕❤️"

### Tier 2: Lunch Packer (101-200 points)
**Benefit:** Robert packs your lunch every day
- Saves having to pack lunch (future mechanic)
- Auto +30 energy at lunch time at school
- Message: "Robert packed your lunch! 🥪❤️"

### Tier 3: Dinner Chef (201+ points)
**Benefit:** Dinner is ready when you get home
- Saves 20 minutes game time in evening
- Auto +40 energy
- More free time for village exploration
- Message: "Robert made dinner! 🍝❤️"

---

## Time Management Trade-Off

**Strategic Choice:**
- Spending time with Robert in the morning = more love points = future time savings
- But may make you late to school if you cuddle too long!
- Risk/reward: Cuddle for 10 minutes → might be late, but +50 love points
- Eventually, high love = Robert saves you MORE time than you spent with him

**Example:**
- Spend 5 minutes cuddling (Day 1-3) → Late to school, lose trust
- But by Day 5, Robert makes coffee/lunch/dinner → Save 30+ minutes per day
- Net positive over time!

---

## Visual Indicators

### Love Meter UI
- Heart icon ❤️ in HUD (top left, under energy)
- Shows current love points (e.g., "❤️ 125 Love")
- Progress bar to next tier
- Sparkles/animation when gaining love points

### Robert's Mood
- Happy sprite when love is high (smiling, hearts float around)
- Neutral sprite at medium love
- Sad sprite at low love (you've been neglecting him!)

### Bed Interaction
- When love is high: Robert is in bed in morning, "Press E to cuddle ❤️"
- Cuddle animation: Hearts float up, Virginia and Robert close together
- Message: "+5 Love! Robert feels appreciated ❤️"

---

## Valentine's Day Theme Elements

**For Prototype (Visual Only):**
- Hearts decoration in cottage (on walls, above bed)
- Pink/red color accents
- Heart particle effects when interacting with Robert
- Valentine's Day card on desk (clickable, shows sweet message)

**Post-Prototype:**
- Special Valentine's Day event (if playing on Feb 14)
- Robert gives Virginia flowers (+50 love points auto)
- Special romantic cutscene
- Unlock "Valentine" achievement

---

## Implementation Notes (For Later)

### Prototype (4-Day MVP):
- ✅ Create Robert sprite (visual presence only)
- ✅ Place Robert at desk in cottage bedroom
- ✅ Add hearts decoration (Valentine's theme)
- ❌ NO mechanics yet (no interactions, no love system)
- ❌ Just show Robert exists, as visual foreshadowing

### Post-Prototype (After Demo):
1. Add Robert interactions (cuddle, kiss, talk)
2. Implement love points system
3. Add love meter UI
4. Create coffee/lunch/dinner auto-benefit system
5. Add Robert dialogue (sweet messages, encouragement)
6. Create date system for weekends
7. Add achievements (relationship milestones)

---

## Dialogue Examples (Future)

**Morning Cuddles:**
- Robert: "Good morning, beautiful. Stay a little longer?"
- Robert: "You're so warm... five more minutes?"
- Robert: "I love waking up next to you."

**Before Leaving:**
- Robert: "Have a great day at school! You're amazing with those kids."
- Robert: "I made you coffee! ☕ Grab it before you go."
- Robert: "Kiss me goodbye? ❤️"

**After Work:**
- Robert: "How was your day? Tell me everything!"
- Robert: "You look tired. Let me make dinner tonight."
- Robert: "I'm so proud of you."

**Bedtime:**
- Robert: "Ready for bed? I'll tuck you in."
- Robert: "Sweet dreams, love."
- Robert: "Tomorrow will be another great day."

---

## Why This Feature Works

1. **Adds Life-Sim Depth:** Not just work simulator, also relationship sim
2. **Emotional Connection:** User is Robert, so playing this feels personal
3. **Strategic Gameplay:** Trade time now for benefits later
4. **Cozy Vibes:** Stardew Valley has relationships, this feels similar
5. **Valentine's Gift:** Perfect for presenting as romantic surprise
6. **Replayability:** Players want to max out love meter

---

## Asset Needs (Post-Prototype)

### Robert Sprites:
- Idle at desk (typing on laptop)
- In bed (sleeping, cuddling)
- Standing/walking
- Portrait for dialogue
- Happy/neutral/sad expressions

### Animations:
- Cuddle animation (Virginia + Robert together, hearts)
- Kiss animation (heart particles)
- Coffee making (at coffee maker)
- Cooking (at stove, future)

### UI Elements:
- Love meter (heart icon + progress bar)
- Love points gain popup ("+5 Love! ❤️")
- Relationship tier notification ("Robert is now Very Supportive!")

### Decorations:
- Hearts on walls (Valentine's theme)
- Valentine's card on desk
- Romantic lighting (candles, warm colors)

---

## Technical Notes

### Save System:
- Love points persist across days
- Robert's current tier saves
- Last interaction timestamp (prevents spam)

### Balancing:
- Morning cuddles: 5 points/minute (max 10 minutes = 50 points)
- Kisses: 3-5 points each (cooldown: once per morning/night)
- Conversations: 5 points (cooldown: once per evening)
- Dates: 20 points (weekends only, costs $10-20)

### Time Costs:
- Cuddle: 1 minute game time per interaction
- Kiss: 5 seconds game time
- Conversation: 2 minutes game time
- Date: 1 hour game time

---

## Future Expansion Ideas

- Robert can watch the toddlers (babysitting side business!)
- Robert gives advice on lesson presentations
- Robert's own character arc (gets promotion, has bad days)
- Couple goals/milestones (move to bigger house, get engaged?)
- Photo album system (capture cute moments with Robert)

---

**Summary:** Robert boyfriend mechanic adds relationship simulation depth, provides strategic time-saving benefits, and makes the game feel more like Virginia's real life (she lives with her boyfriend!). For prototype, just visual presence + Valentine's theme. Full mechanic comes after demo.

---

**Last Updated:** 2026-02-08
**Status:** Documented for post-prototype implementation
**User Quote:** "This prototype is like my Valentine's Day gift to Virginia, so there should be like hearts and stuff right off the bat as well in the prototype."
