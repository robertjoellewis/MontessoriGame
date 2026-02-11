# UX Design Document 06: Crafting UX Design
**Author:** Sally (UX Designer)
**Date:** February 10, 2026
**Status:** Implementation-Ready
**Project:** MontessoriGame - Crafting System User Experience

---

## Overview

This document defines the **crafting system user experience** - when crafting happens, where it happens, how the interface works, and how it integrates with classroom gameplay.

**Design Goals:**
- Seamless integration with teaching flow
- Clear, intuitive recipe selection
- Satisfying crafting moments
- Strategic depth (what to craft when)
- Cozy, not grindy

---

## Crafting Timeline

### When Crafting Happens

**Primary Crafting Windows:**

1. **Nap Time (12:15-2:30 PM)** - MAIN WINDOW
   - After nap minigame completes (all children asleep)
   - Duration: Variable based on nap success
     - Perfect nap (asleep by 12:20): ~2 hours crafting time
     - Good nap (asleep by 12:30): ~2 hours crafting time
     - Slow nap (asleep by 12:45): ~1.75 hours crafting time
   - Location: Crafting table in classroom
   - Children sleeping in background (peaceful)

2. **After School (3:15-5:00 PM)** - OPTIONAL WINDOW
   - After all children picked up
   - Duration: Fixed 1 hour 45 minutes
   - Location: Same crafting table in classroom
   - Classroom empty and quiet
   - Player CHOICE to stay or go home

3. **Early Morning (6:30-7:00 AM)** - FUTURE FEATURE
   - At home in cottage before school
   - Duration: 30 minutes
   - Location: Home workshop? Kitchen table?
   - **Decision for MVP:** Skip (keep it simple)

**When Crafting is NOT Available:**
- During work cycles (8:00-11:30 AM, 2:30-3:00 PM)
- During playground time (11:30 AM-12:15 PM)
- During nap minigame (until all children asleep)
- While walking in village

---

## Crafting Location

### Crafting Table in Classroom

**Physical Location:**
- Southwest corner of classroom
- Near nap area (convenient during nap time)
- Small wooden table with supplies visible

**Visual Design:**
- Sprite: Simple wooden table with drawer underneath
- Items on table: Jars, tools, materials (decorative)
- Warm, inviting workspace
- Matches Stardew aesthetic (cozy workshop)

**Interaction:**
- Click table during available times → Crafting menu opens
- During unavailable times: No interaction (or tooltip: "Crafting available during nap time")

**Virginia's Animation:**
- Walks to table
- Stands/sits at table while crafting
- Working animation (hands moving, placing items)
- Idle between crafts (waiting for player input)

---

## Crafting Menu Interface

### Opening the Crafting Menu

**Trigger:**
- Click crafting table (when children asleep OR after school)
- Menu appears as full-screen overlay

**Menu State:**
- Time continues (clock keeps ticking!)
- Children remain asleep (background visible but dimmed)
- ESC closes menu (returns to classroom)
- **Optional:** ESC pauses time while in crafting menu (toggle in settings)

---

### Menu Layout

```
┌──────────────────────────────────────────────────────────────┐
│                      CRAFTING MENU                            │
│                  Time Remaining: 1h 45m                       │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  [RECIPE BOOK]              [SELECTED RECIPE]                 │
│  ┌─────────────────┐       ┌─────────────────────────────┐  │
│  │ Available       │       │ Polished Pouring Set         │  │
│  │ Recipes:        │       │ (Tier 2 - Classic)           │  │
│  │                 │       │                              │  │
│  │ ✅ Basic Pour   │       │ [Material Sprite Preview]    │  │
│  │ ✅ Spooning     │       │                              │  │
│  │ ✅ Polish Pour  │       │ Ingredients:                 │  │
│  │ 🔒 Pink Tower   │       │ ✅ 2x Ceramic Pitchers       │  │
│  │ 🔒 Knobbed Cyl  │       │ ✅ 1x Wooden Tray            │  │
│  │ ✅ Nature Bask  │       │ ✅ 1x Sandpaper              │  │
│  │ 🔒 Color Tabs   │       │ ❌ 1x Paint (missing!)       │  │
│  │                 │       │                              │  │
│  │ [Filter: All]   │       │ Crafting Time: 15 minutes    │  │
│  └─────────────────┘       │ Quality: Classic             │  │
│                            │                              │  │
│  [IN PROGRESS]             │ Description:                 │  │
│  • None                    │ A polished ceramic pouring   │  │
│                            │ set for hand-eye coord.      │  │
│  [COMPLETED]               │                              │  │
│  • Nature Basket           │ [CRAFT]  [CANCEL]            │  │
│    (Tier 1) ✨             └─────────────────────────────┘  │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

### Recipe Book Panel (Left Side)

**Recipe List:**
- Scrollable list of all recipes (unlocked + locked)
- Visual indicators:
  - ✅ **Green checkmark:** Can craft now (have all ingredients)
  - ⚠️ **Yellow warning:** Missing some ingredients (but recipe unlocked)
  - 🔒 **Lock icon:** Recipe not yet unlocked (grayed out)

**Recipe Sorting/Filtering:**
- **Tabs/Filters:**
  - All Recipes
  - Practical Life
  - Sensorial
  - Language
  - Available Now (only craftable)

**Hover Tooltip on Locked Recipe:**
```
┌─────────────────────────────┐
│ Pink Tower (Tier 3)         │
│ 🔒 Locked                    │
│                              │
│ Unlock Requirement:          │
│ • Trust Level 50% (Guide-   │
│   in-Training)               │
│ • Complete "First Three-    │
│   Period Lesson" milestone  │
└─────────────────────────────┘
```

**Clicking Recipe:**
- Highlights recipe in list
- Shows details in Selected Recipe panel (right side)

---

### Selected Recipe Panel (Right Side)

**Recipe Preview:**

1. **Material Sprite Preview:**
   - Large 96x96 pixel sprite of finished material
   - Shows quality tier visually (glow, sparkle)

2. **Recipe Name & Tier:**
   - Bold text: "Polished Pouring Set"
   - Subtitle: "Tier 2 - Classic Quality 🌿"

3. **Ingredient Checklist:**
   - List of required items with status:
     - ✅ Green checkmark = have in inventory
     - ❌ Red X = missing from inventory
   - Quantity shown (e.g., "2x Ceramic Pitchers")
   - Hover ingredient → tooltip shows where to find it:
     ```
     Ceramic Pitchers
     ─────────────
     Available at:
     • Maple & Co. General Store (⭐15 each)
     • Donated by parents (random)
     ```

4. **Crafting Details:**
   - **Crafting Time:** "15 game minutes" (translated to real time: ~21 seconds)
   - **Quality Tier:** Visual indicator (color + icon)
   - **Effects:** "Moderate engagement, appeals to Movement sensitive period"

5. **Description:**
   - Short flavor text (2-3 sentences)
   - Educational (explains Montessori purpose)
   - Example: "A polished ceramic pouring set for toddlers. Encourages hand-eye coordination, concentration, and care of environment. Perfect for children in Movement or Order sensitive periods."

6. **Action Buttons:**
   - **[CRAFT]** button:
     - Enabled (green) if all ingredients available
     - Disabled (grayed out) if missing ingredients
   - **[CANCEL]** button:
     - Returns to recipe list without crafting

---

### In Progress Section (Bottom-Left)

**Shows materials currently being crafted:**

**If Crafting:**
```
In Progress:
• Polished Pouring Set
  ▓▓▓▓▓▓░░░░ (60%)
  6 minutes remaining
```

**If Nothing in Progress:**
```
In Progress:
• None
```

**Features:**
- Progress bar shows completion %
- Time remaining (game time)
- Can only craft ONE item at a time (MVP limitation)
- **Future:** Queue system (craft multiple items sequentially)

---

### Completed Section (Bottom-Left)

**Shows finished materials ready to place:**

```
Completed:
• Nature Basket (Tier 1) ✨
• Basic Pouring Set (Tier 1)

[Place on Shelf] [View All]
```

**Actions:**
- Click material → opens inventory
- [Place on Shelf] button → exits crafting menu, enters shelf placement mode
- [View All] → opens full inventory menu

---

## Crafting Flow

### Step-by-Step Crafting Process

**1. Player Opens Crafting Menu:**
- Clicks crafting table during nap time or after school
- Menu appears, time continues ticking

**2. Player Browses Recipes:**
- Scrolls through recipe book
- Clicks recipes to view details
- Checks ingredient availability

**3. Player Selects Recipe:**
- Clicks ✅ available recipe
- Recipe details appear on right panel
- Ingredients highlighted (green checkmarks)

**4. Player Clicks [CRAFT]:**
- Confirmation (optional): "Craft Polished Pouring Set? (15 minutes)"
- Click "Confirm"

**5. Crafting Begins:**
- Ingredients removed from inventory
- Recipe moves to "In Progress" section
- Progress bar appears
- Virginia's sprite at table begins working animation
- **Time starts counting down** (game time, not real time)

**6. Crafting Completes:**
- Progress bar reaches 100%
- **Notification appears:**
  ```
  ┌─────────────────────────────┐
  │ ✅ Polished Pouring Set      │
  │    complete!                 │
  └─────────────────────────────┘
  ```
- **Visual effects:**
  - Sparkle burst from crafting table
  - Soft chime sound
  - Material sprite appears on table briefly
- **Material moves to "Completed" section**
- **Virginia's animation returns to idle**

**7. Player Places Material (Optional):**
- Clicks [Place on Shelf] button
- Exits crafting menu
- Enters shelf placement mode (see Material Placement section)

**8. Player Continues Crafting OR Exits:**
- Can craft another item (repeat steps 2-7)
- OR close menu (ESC) and return to classroom

---

## Material Placement System

### Placing Crafted Materials on Shelves

**When:** After crafting OR from inventory menu

**Flow:**

**Method 1: From Crafting Menu**
1. Click [Place on Shelf] in Completed section
2. Crafting menu closes
3. **Shelf Placement Mode activates:**
   - Cursor changes to material sprite (dragging icon)
   - Shelves highlight with glow (yellow outline)
   - Tooltip: "Click shelf to place material"
4. Click on shelf → material placed in next available slot
5. Confirmation sparkle, material now visible on shelf
6. Can place more OR press ESC to exit placement mode

**Method 2: From Inventory**
1. Open inventory (ESC → Inventory)
2. Select crafted material
3. Click "Place on Shelf" button
4. Same as Method 1 (steps 3-6)

**Visual Feedback:**
- Shelf slots glow when hovering (available slots)
- Material snaps to slot (grid-based placement)
- Occupied slots grayed out (can't place duplicate in same slot)
- Confirmation sparkle + sound when placed

---

### Shelf Organization

**Auto-Organization:**
- Materials auto-sort by Montessori area:
  - Practical Life shelves (west wall)
  - Sensorial shelves (north wall)
  - Language shelves (east wall)
- Player can only place material on appropriate shelf type

**Manual Organization (Future Feature):**
- Drag-and-drop materials between slots
- Customize shelf arrangement
- **Decision for MVP:** Skip (auto-sort is simpler)

---

## Crafting Strategy & Time Management

### Player Decision-Making

**Strategic Questions:**

1. **What to craft during limited time?**
   - Quick Tier 1 items (instant, multiple crafts)
   - OR slow Tier 3-4 items (one craft, higher quality)

2. **Which child needs what?**
   - Observed needs during morning work cycle
   - Sensitive period matches
   - Urgent vs. long-term planning

3. **Inventory management:**
   - Do I have ingredients?
   - Should I craft now or collect more items first?

**Example Scenarios:**

**Scenario 1: Perfect Nap (2 hours crafting time)**
- Player could craft:
  - 1x Tier 3 Heirloom (60 minutes) + 1x Tier 2 Classic (30 minutes) + 3x Tier 1 Handmade (instant)
  - OR 2x Tier 3 Heirlooms (2 hours total)
  - Decision depends on classroom needs

**Scenario 2: Challenging Nap (1 hour crafting time)**
- Player has less time, must prioritize:
  - 2x Tier 2 Classic materials (30 min each)
  - OR 1x Tier 2 (30 min) + 6x Tier 1 instant crafts
  - Focus on immediate needs vs. quality

**Scenario 3: After School (optional)**
- Player already crafted during nap, now has extra time:
  - Craft experimental materials
  - Stock up on Tier 1 basics
  - Prepare for tomorrow

---

### Tier Time Breakdown

**Crafting Duration by Tier:**

| Tier | Quality | Crafting Time (Game) | Crafting Time (Real) | Strategy |
|------|---------|----------------------|----------------------|----------|
| **1** | Handmade 🪵 | Instant | 0 seconds | Quick needs, bulk crafting |
| **2** | Classic 🌿 | 10-15 minutes | ~14-21 seconds | Balanced quality/time |
| **3** | Heirloom ✨ | 30-45 minutes | ~42-63 seconds | High quality, special children |
| **4** | Legacy 🌟 | 60-90 minutes | ~84-126 seconds | Masterwork, rare occasions |

**Time Management Tips (In-Game Tutorial):**
- "Tier 1 materials craft instantly - perfect for trying new activities!"
- "Tier 2 materials take 10-15 minutes - great for daily staples."
- "Tier 3-4 materials take longer but create breakthrough moments!"

---

## Recipe Discovery & Unlocking

### How Players Unlock New Recipes

**Starting Recipes (Day 1):**
- Basic Pouring Set (Tier 1)
- Spooning Transfer Set (Tier 1)
- Nature Vocabulary Basket (Tier 1)

**Unlock Methods:**

**1. Trust Level Progression:**
- Reach 25% trust → Unlock Tier 2 recipes
- Reach 50% trust → Unlock Tier 3 recipes
- Reach 75% trust → Unlock Tier 4 recipes

**2. Observation-Based Unlocking:**
- Observe child with specific sensitive period → Recipe unlocks
- Example: Observe Marcus (Movement period) → Unlock "Climbing Equipment" recipe
- Example: Observe Zoe (Small Objects) → Unlock "Tweezers Transfer Set"

**3. Story Progression:**
- Director/Lead Guide teaches recipe (cutscene)
- Example: "Let me show you how to make a proper Pink Tower."
- Unlocks immediately after conversation

**4. Experimentation (Future Feature):**
- Combine ingredients without recipe → Discover new material
- **Decision for MVP:** Skip (too complex)

**Visual Feedback on Unlock:**
```
┌─────────────────────────────────┐
│  🎉 New Recipe Unlocked!        │
│     Polished Pouring Set        │
│     (Tier 2 - Classic)          │
│                                  │
│  Check the Crafting Menu!        │
└─────────────────────────────────┘
```

---

## Crafting Interruptions & Edge Cases

### What Happens If...

**Nap Time Ends During Crafting:**
- **2:30 PM arrives, children wake up**
- **If crafting is 80%+ complete:**
  - Auto-completes (generous grace period)
  - Material added to Completed section
  - Notification: "Rushed to finish! Polished Pouring Set complete."
- **If crafting is < 80% complete:**
  - Progress saved
  - Crafting pauses
  - Can resume after school (if player stays)

**School Day Ends During After-School Crafting:**
- **5:00 PM hard cutoff**
- Same 80% rule applies
- If incomplete: Progress saved, can finish tomorrow morning (future feature)

**Player Leaves Crafting Menu Mid-Craft:**
- Progress continues in background
- Returns to classroom, time keeps ticking
- Material completes automatically when timer finishes
- Notification appears when done

---

## Material Storage & Inventory

### Where Crafted Materials Go

**Crafting Flow:**
1. Recipe crafted → Material added to "Completed" section in crafting menu
2. Player can:
   - **Option A:** Place on shelf immediately (via [Place on Shelf])
   - **Option B:** Leave in Completed section (access later from inventory)
   - **Option C:** Move to general inventory (Materials tab)

**Inventory Limits:**
- **Crafted Materials:** No limit (can craft as many as you want)
- **Collectibles:** Bag limit (20 items at a time, see village collection doc)
- **Placed Materials:** Shelf space limit (5-8 materials per shelf)

**Shelf Capacity:**
- Each shelf unit holds 5-8 materials (visible slots)
- If shelf full: Cannot place more materials (must remove old ones first)
- Removed materials return to inventory

---

## Batch Crafting (Future Feature)

**Post-MVP Enhancement:**

**Concept:** Craft multiple identical items at once

**UI Addition:**
```
Crafting:
Basic Pouring Set (Tier 1)

Quantity: [1] [3] [5] [10]

Total Time: Instant
Total Ingredients:
• 6x Small Jars
• 3x Trays

[CRAFT ALL]
```

**When Unlocked:**
- Trust Level 50%+ (Guide-in-Training)
- Only for Tier 1 materials (instant crafts)

**Use Case:**
- Stocking up on basics
- Preparing for multiple children
- Less tedious clicking

---

## Visual & Audio Feedback

### Crafting Animations

**At Crafting Table:**
1. **Virginia working:**
   - Hands moving (sanding, painting, assembling)
   - Items appearing on table
   - Focused expression

2. **Material completion:**
   - Finished item appears on table
   - Sparkle burst
   - Virginia smiles, holds up material

**Sound Effects:**
1. **Crafting in progress:**
   - Gentle ambient sounds (sanding, tapping)
   - Soft background music
2. **Crafting complete:**
   - Satisfying chime
   - Sparkle sound effect
3. **Material placed on shelf:**
   - Soft "thunk" (wood on wood)
   - Confirmation ding

---

## Educational Value

### Teaching Montessori Through Crafting

**Recipe Descriptions:**
- Explain Montessori purpose of each material
- Example: "The Pink Tower teaches size gradation, visual discrimination, and early algebraic thinking. Maria Montessori specifically chose pink as the most appealing color to children."

**Crafting Process:**
- Mirrors real Montessori material preparation
- Example: Sanding smooth (care and beauty)
- Example: Choosing natural materials (authentic Montessori)

**Player Learning Outcomes:**
- Understand why materials matter
- Learn about sensitive periods
- Appreciate prepared environment concept
- Connect crafting effort to child growth

---

## Open Questions / Future Iteration

1. **Can you craft at home (cottage)?**
   - **Decision for MVP:** No (keep it simple, school-only)
   - **Future:** Home workshop, different materials available

2. **Crafting failure states?**
   - Can crafting fail if rushed?
   - **Decision for MVP:** No failure (cozy, not punishing)

3. **Material durability/wear?**
   - Do materials need repair over time?
   - **Decision for MVP:** No (avoid tedium)

4. **Gifted materials from parents?**
   - Random donations at pickup time?
   - **Decision for MVP:** Yes (simple notification, random item added to inventory)

---

**Next Document:** UX-07 Playground Scene Design

---

*Sally, UX Designer*
*MontessoriGame Development Team*
