# UX Design Document 04: UI/HUD Layout & Menus
**Author:** Sally (UX Designer)
**Date:** February 10, 2026
**Status:** Implementation-Ready
**Project:** MontessoriGame - User Interface Design

---

## Overview

This document defines **all UI elements, HUD layout, menus, and screen overlays** for the classroom gameplay experience.

**Design Goals:**
- Minimal clutter (cozy, not overwhelming)
- Information when needed, hidden when not
- Stardew Valley-inspired aesthetic
- Clear visual hierarchy
- Accessible and readable

---

## HUD Layout (During Classroom Play)

### Screen Layout Overview

```
┌────────────────────────────────────────────────────────────┐
│ [Energy] 🌟75        [Top-Left]     [Top-Right] ⏰ 8:45 AM │
│                                                             │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                                                      │  │
│  │                 CLASSROOM VIEWPORT                   │  │
│  │                 (900x650 pixels)                     │  │
│  │                                                      │  │
│  │         [Virginia + 12 Children visible]            │  │
│  │         [Shelves, rugs, furniture]                  │  │
│  │                                                      │  │
│  │                                                      │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│ [Mission: Observe Emma]                   [ESC for Menu]   │
└────────────────────────────────────────────────────────────┘
   Bottom-Left                              Bottom-Right
```

### Permanent HUD Elements

**Always Visible During Gameplay:**

1. **Clock (Top-Right Corner)**
   - Shows current game time (8:45 AM format)
   - Small, unobtrusive
   - Same style as existing Clock UI component

2. **Energy Meter (Top-Left Corner)**
   - Shows Virginia's energy (0-100)
   - Star icon + number
   - Color changes: Green (75-100), Yellow (40-74), Red (0-39)
   - **Question:** Should energy be visible during school hours?
     - **Decision for MVP:** Yes, but energy drains slower at school (less strenuous than village walking)

3. **ESC Menu Hint (Bottom-Right Corner)**
   - Small text: "ESC for Menu"
   - Fades out after 30 seconds (players learn it)

**Contextual HUD Elements (Show When Relevant):**

4. **Mission Tracker (Bottom-Left Corner)**
   - Shows current mission/goal (optional)
   - Examples:
     - "Observe Emma's needs"
     - "Present material to Marcus"
     - "Get all children to nap"
   - Can be hidden in settings (some players prefer no guidance)

5. **Notification Area (Top-Center, Below Clock)**
   - Temporary notifications (fade after 3-5 seconds)
   - Examples:
     - "Marcus has arrived!"
     - "Time for outdoor play!"
     - "All children are asleep!"
   - Non-intrusive, small text box

---

## Menu System

### Primary Menu (ESC Key)

**When ESC Pressed:**
- Game pauses (time stops)
- Screen dims (dark overlay, 50% opacity)
- Menu appears (centered overlay)

**Menu Options:**

```
┌─────────────────────────────────┐
│        MENU                      │
├─────────────────────────────────┤
│                                  │
│  📦 Inventory                    │
│  📖 Observation Journal          │
│  🎯 Missions (if active)         │
│  ⚙️ Settings                     │
│  ↩️ Resume                        │
│  🏠 Go Home (end day early)      │
│                                  │
└─────────────────────────────────┘
```

**Keyboard Shortcuts (Optional):**
- ESC: Resume (close menu)
- I: Inventory
- J: Journal
- S: Settings

---

### Inventory Menu

**Opened via ESC → Inventory OR Press I**

**Layout:**

```
┌──────────────────────────────────────────────────────────┐
│                    INVENTORY                              │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  [TABS]  Materials | Collectibles | Crafted Items        │
│                                                           │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Grid of Items (48x48 icons each)                  │  │
│  │                                                     │  │
│  │  [Pouring Set]  [Pink Tower]  [Beans]  [Acorns]   │  │
│  │   Tier 2        Tier 3        x15       x8        │  │
│  │                                                     │  │
│  │  [Empty Slot]   [Empty Slot]  [Empty Slot]        │  │
│  │                                                     │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  SELECTED ITEM:                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Pouring Set (Tier 2 - Classic)                    │   │
│  │ A polished ceramic pouring set for toddlers.      │   │
│  │ Encourages concentration and hand-eye coordination│   │
│  │                                                    │   │
│  │ [Place on Shelf] [Drop] [Cancel]                  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

**Features:**

1. **Tabs:**
   - **Materials:** Crafted Montessori materials
   - **Collectibles:** Items gathered from village (beans, acorns, jars)
   - **Crafted Items:** Completed materials ready to place

2. **Grid Display:**
   - Icons with quantity (if stackable)
   - Color-coded by quality tier (Tier 1 = brown, Tier 2 = green, Tier 3 = blue, Tier 4 = gold)
   - Hover shows tooltip with name

3. **Item Details Panel:**
   - Shows selected item info
   - Description
   - Actions available:
     - "Place on Shelf" (if in classroom)
     - "Drop" (remove from inventory)
     - "Cancel" (close panel)

**Existing Component:**
- Already built: `src/ui/InventoryMenu.js`
- May need expansion for material-specific features

---

### Observation Journal

**Opened via ESC → Observation Journal OR Press J**

**Purpose:**
- Record notes on children
- Track sensitive periods
- Plan materials to craft
- Educational reference for player

**Layout:**

```
┌──────────────────────────────────────────────────────────┐
│              OBSERVATION JOURNAL                          │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  [CHILDREN LIST]          [NOTES AREA]                    │
│                                                           │
│  Emma (24mo) 😊            Emma - February 10             │
│  Marcus (30mo) 😐          ─────────────────────          │
│  Lily (28mo) ✨            • Worked with nesting boxes    │
│  Aiden (22mo) 😊             for 6 minutes (excellent!)  │
│  Sofia (33mo) 💗           • Sensitive periods: Order,    │
│  Noah (26mo) 😊              Small Objects                │
│  Mia (31mo) 😐             • Suggestion: Try Knobbed      │
│  Oliver (20mo) 😐            Cylinders next               │
│  Zoe (29mo) ✨                                            │
│  Elijah (34mo) 😊          Recent breakthroughs:          │
│  Ava (25mo) 😐             • Feb 9: Mastered pouring!     │
│  Liam (27mo) 😊            • Feb 8: Completed Pink Tower  │
│                                                           │
│                            [Previous Days] [Next]         │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

**Features:**

1. **Children List (Left Panel):**
   - All 12 children with current mood icon
   - Click child to view their notes

2. **Notes Area (Right Panel):**
   - Auto-generated notes based on observations
   - Shows:
     - Materials used today
     - Concentration time
     - Sensitive periods
     - Suggested materials (based on AI analysis)
     - Breakthrough moments
   - Historical log (previous days)

3. **Auto-Population:**
   - Notes generated when Virginia observes child
   - Records material interactions
   - Tracks progress over time

**Implementation Notes:**
- New component (not yet built)
- Simple data structure: JSON per child per day
- Stores in game save file

---

### Crafting Menu

**Opened During Nap Time:**
- Click crafting table → Crafting Menu appears
- Time continues (clock ticks) while menu is open
- **Optional:** ESC pauses time even in crafting menu

**Layout:**

```
┌──────────────────────────────────────────────────────────┐
│                   CRAFTING MENU                           │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  [RECIPE BOOK]            [SELECTED RECIPE]               │
│                                                           │
│  Available Recipes:       Polished Pouring Set (Tier 2)   │
│                          ─────────────────────            │
│  ✅ Basic Pouring Set     Ingredients:                     │
│  ✅ Spooning Transfer     ✅ 2x Ceramic Pitchers           │
│  🔒 Pink Tower (Tier 3)   ✅ 1x Wooden Tray                │
│  ✅ Polished Pouring Set  ✅ 1x Sandpaper                  │
│  🔒 Knobbed Cylinders     ❌ 1x Paint (missing!)           │
│                                                           │
│                          Crafting Time: 15 minutes        │
│                          Quality: Classic (Tier 2)        │
│                                                           │
│                          [CRAFT] [CANCEL]                 │
│                                                           │
│  In Progress:             Completed:                      │
│  • None                   • Nature Basket (Tier 1)        │
│                          • Basic Pouring Set (Tier 1)    │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

**Features:**

1. **Recipe Book (Left Panel):**
   - Lists all recipes (unlocked and locked)
   - ✅ Green checkmark = can craft now (have ingredients)
   - 🔒 Locked = not yet unlocked (shows unlock requirement on hover)
   - Click recipe to view details

2. **Selected Recipe (Right Panel):**
   - Shows recipe details
   - Ingredient checklist (✅ have, ❌ missing)
   - Crafting time
   - Quality tier
   - [CRAFT] button (if ingredients available)

3. **In Progress Section:**
   - Shows materials currently being crafted
   - Progress bar (if applicable)
   - Time remaining

4. **Completed Section:**
   - Shows finished materials ready to place
   - Click to move to inventory

**Crafting Flow:**
1. Select recipe
2. Click [CRAFT] button
3. **Crafting begins:**
   - **Tier 1:** Instant (material immediately in "Completed")
   - **Tier 2-4:** Loading bar appears, time passes
4. Virginia animates at table (working sprite)
5. When complete: Notification + material moves to "Completed"

**Time Management:**
- Crafting time is game time (not real time)
- If nap time ends (2:30 PM) during crafting:
  - **Option A:** Auto-complete if 80%+ done
  - **Option B:** Save progress, complete later
  - **Decision for MVP:** Auto-complete (simpler)

---

### Material Placement Interface

**When Virginia places crafted material on shelf:**

**Flow:**
1. Open Inventory → Select crafted material → Click "Place on Shelf"
2. Cursor changes to material icon (dragging)
3. Hover over shelf → shelf slots highlight (show available spaces)
4. Click shelf slot → material placed
5. Material now visible on shelf, available for children

**Visual Feedback:**
- Shelf slots glow when hovering (yellow outline)
- Material snaps to slot (grid-based placement)
- Confirmation animation (sparkle effect)

**Alternative (Simpler for MVP):**
- Click material in inventory → Click shelf → material auto-places in next available slot
- No drag-and-drop, just click-to-place

---

## Child Interaction UI

### Hover Tooltip (Mouseover Child)

**When mouse hovers over child sprite:**

```
┌─────────────────────────┐
│ Emma (24 months)        │
│ Mood: Happy 😊          │
│ Activity: Working with  │
│          Nesting Boxes  │
└─────────────────────────┘
```

**Features:**
- Appears after 0.5 second hover
- Small, unobtrusive
- Quick info at a glance

---

### Interaction Menu (Click Child)

**When Virginia clicks on child:**

**Context-Sensitive Radial Menu:**

```
         [Observe]
              │
              │
[Comfort] ────●──── [Present Material]
              │
              │
         [Encourage]
```

**Menu Behavior:**
- Appears centered on child
- Mouse moves to option, clicks to select
- ESC cancels menu

**Alternative (Simpler for MVP):**
- Simple button list (vertical):
  - [Observe]
  - [Present Material]
  - [Comfort]
- Click button to perform action

**Implementation:**
- New UI component (not yet built)
- Shows only relevant actions based on child state (see UX-03 doc)

---

### Observation Window (After Clicking "Observe")

**Large popup with detailed info:**

```
┌──────────────────────────────────────────────────────┐
│               OBSERVING: Emma                        │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Age: 24 months                                      │
│  Temperament: Cautious                               │
│  Mood: Happy 😊 (85/100)                             │
│                                                      │
│  Current Activity:                                   │
│  • Working with Nesting Boxes                        │
│  • Concentration: High ✨ (5 minutes so far)         │
│                                                      │
│  Sensitive Periods:                                  │
│  • Order (highly active!)                            │
│  • Small Objects                                     │
│                                                      │
│  Suggested Materials:                                │
│  • Knobbed Cylinders (matches Small Objects)         │
│  • Color Tablets (matches Order)                     │
│  • Pink Tower (matches Order, but needs Tier 3)      │
│                                                      │
│  Notes:                                              │
│  Emma loves routine and organization. She works      │
│  best when materials are orderly and predictable.    │
│                                                      │
│                     [CLOSE]                          │
└──────────────────────────────────────────────────────┘
```

**Features:**
- Educational for player (learn about child development)
- Actionable (suggests materials to craft)
- Adds to observation journal automatically
- Can be opened anytime (no cooldown)

---

## Nap Time UI

### Nap Minigame HUD

**During nap minigame (12:15-12:30 PM):**

**Additional HUD Elements:**

1. **Nap Progress Indicator (Top-Center):**
   ```
   ┌─────────────────────────────────┐
   │  💤 Nap Time                    │
   │  Asleep: 8 / 12 children        │
   │  ▓▓▓▓▓▓▓▓░░░░ (67%)             │
   └─────────────────────────────────┘
   ```

2. **Awake Child Indicators:**
   - Children who are awake have ❗ icon above head (yellow)
   - Clear visual priority (who needs soothing)

3. **Soothing Action UI:**
   - When soothing child, loading bar appears above child:
   ```
   Soothing Emma...
   ▓▓▓▓▓▓▓░░░░░░ (50%)
   ```

4. **Completion Notification:**
   - When all asleep:
   ```
   ┌─────────────────────────────────┐
   │  🎉 All children are asleep!    │
   │  You have 2 hours to craft.     │
   └─────────────────────────────────┘
   ```

---

## End-of-Day Summary Screen

**Appears at 3:15 PM (after all children picked up):**

**Full-Screen Overlay:**

```
┌──────────────────────────────────────────────────────────┐
│                    DAY SUMMARY                            │
│                  February 10, 2026                        │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  📚 Children's Progress:                                  │
│     • Lily had a breakthrough with Color Tablets! ✨      │
│     • Marcus worked for 8 minutes straight (record!)      │
│     • Emma mastered nesting boxes                         │
│                                                           │
│  🛠️ Materials Crafted:                                    │
│     • Polished Pouring Set (Tier 2)                       │
│     • Nature Vocabulary Basket (Tier 1)                   │
│                                                           │
│  ⭐ Stars Earned: +45 ⭐                                   │
│  💙 Trust Gained: +12                                     │
│                                                           │
│  🎯 Missions Completed:                                   │
│     ✅ Observe Emma's needs                               │
│     ✅ Get all children to nap                            │
│                                                           │
│                                                           │
│         [STAY AT SCHOOL]    [GO HOME]                     │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

**Features:**
- Celebrates player's accomplishments (positive feedback!)
- Shows tangible progress (stars, trust, breakthroughs)
- Choice: stay and craft more OR go home
- Can be skipped (ESC to dismiss)

**Data Tracked:**
- Breakthrough moments (child + material)
- Total concentration time
- Materials crafted
- Stars/trust earned
- Missions completed

---

## Notification System

### Notification Types

**1. Child Arrival/Departure:**
- "Emma has arrived!" (bottom-left corner)
- "Marcus has been picked up!" (bottom-left corner)
- Fades after 3 seconds

**2. Time Events:**
- "Time for outdoor play!" (top-center)
- "Nap time!" (top-center)
- "5 minutes until closing time" (top-center, yellow background)

**3. Breakthroughs:**
- "Lily had a breakthrough! ✨" (center screen, larger text)
- 5-second display with sparkle animation

**4. Material Crafted:**
- "Polished Pouring Set complete!" (bottom-right corner)
- Small icon of material + text

**5. Warning/Alert:**
- "Child is upset!" (if ignoring upset child too long)
- "Virginia is exhausted" (if energy < 10)
- Red background, urgent tone

---

## Settings Menu

**Accessed via ESC → Settings**

**Options:**

```
┌─────────────────────────────────┐
│          SETTINGS                │
├─────────────────────────────────┤
│                                  │
│  🔊 Music Volume:  ████░░  80%   │
│  🔊 SFX Volume:    ███░░░  60%   │
│                                  │
│  📛 Show Name Tags: [X] Yes      │
│     (Above children's heads)     │
│                                  │
│  🎯 Show Missions:  [X] Yes      │
│     (Bottom-left HUD)            │
│                                  │
│  ⚡ Game Speed:     [Normal]     │
│     (Normal / Fast)              │
│                                  │
│  💾 Save & Quit                  │
│  ↩️ Back to Menu                 │
│                                  │
└─────────────────────────────────┘
```

**Features:**
- Simple toggles for player preference
- Sliders for audio
- Save & quit option

---

## Visual Style Guide

### Color Palette

**UI Colors (Stardew-Inspired):**
- **Background:** Warm cream (#F5F1E8)
- **Text:** Dark brown (#3E2C1E)
- **Accent:** Soft orange (#D87040)
- **Borders:** Medium brown (#8B6F47)
- **Highlights:** Light yellow (#FFF8DC)

**Status Colors:**
- **Positive:** Green (#5CBF54)
- **Neutral:** Yellow (#FFD700)
- **Negative:** Red (#D83838)
- **Info:** Blue (#5D9CFF)

### Typography

**Font:** Pixel font (Stardew-style)
- **Headings:** 24px, bold
- **Body text:** 16px, regular
- **Small text:** 12px, regular

### UI Components Style

**Buttons:**
- Rounded rectangle with 3-tone bevel (like cottage border)
- Hover: lighter color, subtle glow
- Click: darker color, pressed effect

**Panels/Windows:**
- Cream background
- Brown border (thick, beveled)
- Drop shadow for depth

**Icons:**
- 48x48 pixels for inventory items
- 24x24 pixels for status icons (mood, state)
- Simple, readable at small scale

---

## Accessibility Considerations

### Readability

**Text Contrast:**
- Dark text on light background (minimum 4.5:1 ratio)
- Backgrounds have subtle texture (not distracting)

**Icon Clarity:**
- Large enough to distinguish (minimum 24px for UI icons)
- Unique shapes (not relying on color alone)

**Tooltips:**
- Always show name on hover (not just icon)
- Keyboard shortcuts listed in menus

### Colorblind Support

**Icon + Text:**
- Never rely on color alone (e.g., mood icons have different shapes, not just colors)
- Red/green states also have symbols (✓ vs. ✗)

**Future Enhancement:**
- Colorblind mode (adjusts palette)

---

## Screen Transitions & Overlays

### Fade Transitions

**Scene Changes:**
- Fade to black (500ms)
- Load new scene
- Fade in (500ms)

**Menu Open/Close:**
- Fade in overlay (200ms)
- Menu slides in (300ms)

### Pause Overlay

**When ESC Pressed:**
- Screen dims (dark overlay, 50% opacity)
- Slight blur effect (optional, if performance allows)
- Menu appears in center

---

## Open Questions / Future Iteration

1. **Energy visibility at school:**
   - Should energy meter be hidden during school hours?
   - Or visible but drain slower?
   - **Decision for MVP:** Visible, slow drain

2. **Mission tracker toggle:**
   - Some players may find it hand-holdy
   - Option to hide in settings?
   - **Decision for MVP:** Yes, toggleable

3. **Observation journal auto-vs-manual:**
   - Should notes auto-generate OR player writes notes?
   - **Decision for MVP:** Auto-generate (less work for player)

4. **Material quality visual difference:**
   - How distinct should Tier 1 vs. Tier 4 look?
   - **Decision:** Use color coding + subtle effects (glow, sparkle)

---

**Next Document:** UX-05 Material Presentation & Feedback Systems

---

*Sally, UX Designer*
*MontessoriGame Development Team*
