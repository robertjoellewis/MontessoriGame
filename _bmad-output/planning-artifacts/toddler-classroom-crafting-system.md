# Toddler Classroom Crafting System - Core Gameplay Design

**Date:** 2026-02-09
**Author:** Mary (Business Analyst)
**Status:** Planning Phase - Ready for Implementation
**Context:** Core gameplay mechanic for Virginia's teaching experience at Little Sprouts Montessori

---

## Executive Summary

This document outlines the **core gameplay loop** for MontessoriGame: a crafting-based system where Virginia collects items from the village and creates authentic Montessori materials for her toddler classroom. This combines:

- **Collection mechanics** (exploring the village, finding items)
- **Recipe-based crafting** (creating educational materials)
- **Toddler engagement** (using materials to support development)
- **Progression system** (unlocking new recipes and capabilities)

The system focuses on **well-established, non-controversial Montessori materials** appropriate for toddlers aged 18-36 months, based on research and consultation with a lead Montessori guide.

---

## The 12 Toddlers - Quick Reference

Based on `/Users/robertlewis/MontessoriGame/src/data/children.js`:

| Name | Age | Temperament | Sensitive Periods | Key Traits |
|------|-----|-------------|-------------------|------------|
| **Emma** | 24mo | Cautious | Order, Small Objects | Quiet observer, needs routine |
| **Marcus** | 30mo | Bold | Movement, Language | Climbs everything, high energy |
| **Lily** | 28mo | Social | Language, Social Behavior | Narrates constantly, loves peers |
| **Aiden** | 22mo | Independent | Order, Small Objects | Deep focus, prefers solitude |
| **Sofia** | 33mo | Sensitive | Language, Social Behavior | Big emotions, creative |
| **Noah** | 26mo | Easy-Going | Movement, Language | Adaptable, steady progress |
| **Mia** | 31mo | Bold | Social Behavior, Movement | Natural leader, confident |
| **Oliver** | 20mo | Cautious | Order, Movement | Youngest, needs comfort |
| **Zoe** | 29mo | Independent | Small Objects, Language | Collects tiny things, precise |
| **Elijah** | 34mo | Social | Language, Social Behavior | Class mediator, empathetic |
| **Ava** | 25mo | Bold | Language, Movement | Talks nonstop, asks questions |
| **Liam** | 27mo | Cautious | Order, Toilet Learning | Everything "just so", routine-oriented |

---

## Core Montessori Materials for Toddlers (Ages 1-3)

Based on research and Montessori best practices, here are **10 popular, well-established materials** perfect for our crafting system:

### 1. **Practical Life Materials**

#### **Pouring Set** (Water/Dry Transfer)
- **What it is:** Two small pitchers for practicing pouring liquid or dry materials (beans, rice)
- **Age:** 18+ months
- **Skills:** Hand-eye coordination, concentration, independence
- **Why it's safe:** Universal Montessori staple, no controversy
- **Toddler appeal:** Especially appeals to children in Movement & Order sensitive periods

#### **Spooning Transfer Set**
- **What it is:** Two bowls and a spoon for transferring items (pompoms, beans, etc.)
- **Age:** 18+ months
- **Skills:** Fine motor, concentration, left-to-right progression (pre-reading)
- **Why it's safe:** Classic practical life activity
- **Toddler appeal:** Great for Small Objects sensitive period

#### **Dressing Frame (Buttons)**
- **What it is:** Wooden frame with fabric panels featuring large buttons
- **Age:** 24+ months
- **Skills:** Fine motor, self-care, independence
- **Why it's safe:** Traditional Montessori self-care material
- **Toddler appeal:** Appeals to children seeking independence

### 2. **Sensorial Materials**

#### **Pink Tower**
- **What it is:** Ten pink wooden cubes graduated from 1cm to 10cm
- **Age:** 24+ months (after Knobbed Cylinders)
- **Skills:** Visual discrimination, size gradation, early algebra concepts
- **Why it's safe:** Iconic Montessori material, widely recognized
- **Toddler appeal:** Pink color attracts children, satisfying to stack
- **Special note:** Maria Montessori specifically chose pink as most appealing to children

#### **Knobbed Cylinders** (Beginner Set)
- **What it is:** Wooden block with 10 cylinders that vary in height/diameter, each with a knob
- **Age:** 24+ months (first sensorial material introduced)
- **Skills:** Visual discrimination, pincer grasp (pre-writing), size comparison
- **Why it's safe:** Foundational sensorial material, universally used
- **Toddler appeal:** Satisfying puzzle-like quality, clear control of error

#### **Color Tablets (Primary Colors)**
- **What it is:** Pairs of wooden tablets in red, blue, yellow for matching
- **Age:** 24+ months
- **Skills:** Color recognition, visual discrimination, matching
- **Why it's safe:** Simple, clear concept, no complexity
- **Toddler appeal:** Bright colors, simple success

### 3. **Language Materials**

#### **Object-to-Picture Matching Cards**
- **What it is:** Real objects paired with picture cards (e.g., small toy apple + card with apple)
- **Age:** 18+ months
- **Skills:** Vocabulary building, concrete-to-abstract thinking, classification
- **Why it's safe:** Fundamental language work, adaptable to any theme
- **Toddler appeal:** Connects real world to symbols (huge for Language sensitive period)

#### **Vocabulary Basket (Themed Objects)**
- **What it is:** Basket with 5-8 real objects from one category (farm animals, fruits, etc.)
- **Age:** 18+ months
- **Skills:** Vocabulary explosion, naming, categorization
- **Why it's safe:** Core language activity, teacher-selected themes
- **Toddler appeal:** Real objects are fascinating to toddlers

### 4. **Infant/Toddler Specific**

#### **Object Permanence Box**
- **What it is:** Wooden box with hole on top; child drops ball, retrieves from drawer/tray
- **Age:** 12-24 months
- **Skills:** Object permanence, hand-eye coordination, cause-effect
- **Why it's safe:** Classic infant Montessori material
- **Toddler appeal:** Youngest toddlers (Oliver, Aiden) still love this

#### **Nesting Boxes/Cups**
- **What it is:** Set of boxes or cups that nest inside each other by size
- **Age:** 18+ months
- **Skills:** Size gradation, spatial reasoning, problem-solving
- **Why it's safe:** Simple, tactile, self-correcting
- **Toddler appeal:** Satisfying puzzle, multiple uses (stacking, nesting, hiding)

---

## Crafting System Design

### Overview

Virginia collects **raw materials** from the village during her walk to/from school and **crafts Montessori materials** using recipes. This creates a satisfying gameplay loop that:

1. Encourages exploration of the village
2. Teaches players about Montessori pedagogy through crafting
3. Creates meaningful progression (unlocking recipes)
4. Ties directly to toddler development (materials affect children)

### Collection Sources

#### **The Village Street** (Walk to School)
- **Natural items:** Leaves, pinecones, acorns, pebbles, sticks, flowers
- **Found items:** Lost buttons, fabric scraps, bottle caps
- **Trash cans:** Cardboard boxes, jars, plastic containers (upcycling theme)

#### **The Paper Trail** (Stationery Store)
- **Purchase with Stars:** Card stock, laminating sheets, markers, glue
- **Special orders:** Specific colored paper, stickers

#### **Maple & Co. General Store**
- **Purchase with Stars:** Small baskets, wooden blocks, paint, brushes, sandpaper
- **Bulk items:** Dried beans, rice, pompoms, buttons

#### **The Rusty Spur** (Bar - Post-MVP)
- **Unexpected source:** Clean glass bottles, cork coasters (upcycling)

#### **Mystery House** (Unlocked Later)
- **Special items:** Rare materials for advanced crafts

#### **School Storage Room** (Unlocked at Tier 2+)
- **Base supplies:** Wood scraps, fabric remnants, donated items from parents

### Crafting Recipes

Each recipe has:
- **Name:** The Montessori material being created
- **Required Items:** List of collectibles + purchased supplies
- **Crafting Time:** In-game minutes (crafted during free time, nap time, or after school)
- **Quality Tier:** Determines effectiveness (🪵 Handmade, 🌿 Classic, ✨ Heirloom, 🌟 Legacy)
- **Unlocked By:** Observation, trust level, or story progression

#### **Example Recipes**

**TIER 1 (Handmade Quality) - Available from Start**

```
🪵 Basic Pouring Set
Ingredients:
- 2x Small Jars (found in trash or bought at General Store)
- 1x Tray (found or purchased)
- Cleaning supplies (wipe, soap)

Crafting Time: 15 minutes
Effect: Toddlers can practice pouring water/beans, moderate engagement
Notes: "Virginia cleans the jars and arranges them on a tray. Simple, but functional."
```

```
🪵 Spooning Transfer Set
Ingredients:
- 2x Small Bowls (purchased at General Store)
- 1x Wooden Spoon (purchased at General Store)
- 1x Tray (found or purchased)
- Transfer items: Dried beans OR pompoms (purchased)

Crafting Time: 10 minutes
Effect: Fine motor practice, appeals to Small Objects sensitive period
Notes: "A humble beginning. The children will learn, even with simple tools."
```

```
🪵 Nature Vocabulary Basket
Ingredients:
- 1x Small Basket (purchased or found)
- 5x Natural Objects (pinecones, acorns, leaves, pebbles, sticks - collected)

Crafting Time: 5 minutes
Effect: Language development, naming objects, outdoor connection
Notes: "Virginia gathers natural treasures. Perfect for a nature walk vocabulary lesson."
```

**TIER 2 (Classic Quality) - Unlocked at Assistant Level (Tier 2)**

```
🌿 Polished Pouring Set
Ingredients:
- 2x Small Ceramic Pitchers (purchased at General Store)
- 1x Wooden Tray (purchased at General Store)
- Sandpaper (for smoothing tray edges)
- Paint (optional, for color-coding)

Crafting Time: 30 minutes
Effect: Higher toddler engagement, longer concentration periods
Notes: "Virginia sands the tray smooth and selects beautiful pitchers. This feels professional."
```

```
🌿 Color Tablets (Primary Set)
Ingredients:
- 6x Wooden Blocks (small, purchased)
- Red, Blue, Yellow Paint (purchased at Paper Trail)
- Varnish (purchased at General Store)
- Sandpaper (for smoothing)

Crafting Time: 1 hour (must dry)
Effect: Color recognition, visual discrimination
Notes: "Virginia carefully paints and varnishes each tablet. Two of each color - red, blue, yellow."
Unlocked By: Trust Meter 25% + Lead Guide teaches you about sensorial materials
```

```
🌿 Object-to-Picture Matching Set (Farm Animals)
Ingredients:
- 5x Small Toy Animals (purchased at General Store or found)
- Card stock (purchased at Paper Trail)
- Markers or Printer Access (purchased)
- Laminating sheets (purchased at Paper Trail)

Crafting Time: 45 minutes
Effect: Language explosion, concrete-to-abstract thinking
Notes: "Virginia draws or prints pictures of each animal, then laminates them for durability."
Unlocked By: Observe a child in Language sensitive period
```

**TIER 3 (Heirloom Quality) - Unlocked at Guide-in-Training (Tier 3)**

```
✨ Handcrafted Pink Tower (Simplified)
Ingredients:
- 10x Wooden Blocks (graduated sizes - special order from Traveling Artisan)
- Pink Paint (purchased)
- Fine Sandpaper (purchased)
- Wood Varnish (purchased)

Crafting Time: 2 hours (spread over multiple sessions)
Effect: Iconic sensorial material, toddlers drawn to it, deep concentration
Notes: "Virginia sands each cube to silky smoothness, paints them perfectly pink, and varnishes with care. This is the work of a true guide."
Unlocked By: Trust Meter 50% + Complete "First Successful Three-Period Lesson" milestone
```

```
✨ Knobbed Cylinders (Single Block Set)
Ingredients:
- 1x Wooden Block with Holes (special order from Traveling Artisan OR crafted from wood scraps + drill)
- 10x Wooden Dowels (graduated diameters)
- 10x Wooden Knobs (purchased or hand-carved)
- Sandpaper, Wood Glue, Varnish

Crafting Time: 3 hours (complex, requires precision)
Effect: First sensorial material for toddlers, develops pincer grasp, visual discrimination
Notes: "This is meticulous work. Each cylinder must fit perfectly in its hole - no too tight, not too loose."
Unlocked By: Trust Meter 60% + Lead Guide mentors you on sensorial progression
```

```
✨ Dressing Frame (Large Buttons)
Ingredients:
- Wooden Frame (purchased or crafted from wood scraps)
- 2x Fabric Panels (donated from parents or purchased)
- 6x Large Buttons (found or purchased)
- Thread, Needle, Sewing Skills

Crafting Time: 1.5 hours
Effect: Self-care skills, fine motor, independence
Notes: "Virginia sews each button with care, ensuring they're secure but easy for small hands to manipulate."
Unlocked By: Observe a child struggling with buttons on their coat
```

**TIER 4 (Legacy Quality) - Unlocked at Lead Guide (Tier 4) OR Special Events**

```
🌟 Museum-Quality Pink Tower (Full Set)
Ingredients:
- 10x Perfectly Graduated Wooden Cubes (commissioned from Master Woodworker)
- Premium Pink Paint (special order)
- Professional Wood Varnish (special order)
- Love and 5+ hours of work

Crafting Time: 5 hours (spread over a week)
Effect: Children have "aha moments," parents comment on its beauty, increases school reputation
Notes: "This isn't just a material - it's a work of art. Each cube is perfectly weighted, silky smooth, and the exact shade of Montessori pink."
Unlocked By: Trust Meter 75% + Complete "Child's First Independent Work Cycle" with all 12 children
```

```
🌟 Custom Sensorial Material (Child-Specific)
Ingredients:
- Varies based on child's interest (e.g., dinosaur-themed counting, train-themed sorting)
- Wooden base or tray
- Paint, small objects, creative materials
- Research time (observe child for 3+ days)

Crafting Time: 2-4 hours
Effect: Targeted child has breakthrough moment, significant development leap
Notes: "Virginia designs a material just for [Child Name], perfectly aligned with their sensitive period and interests."
Unlocked By: Trust Meter 80% + "Material Designer" achievement path
```

---

## Crafting Mechanics (Implementation Details)

### Crafting Interface

**When Virginia has time to craft:**
- During nap time (12:15pm - 2:30pm) if all children are asleep
- After school (3:00pm - 5:00pm) - optional evening work
- At home in the morning (6:30am - 7:00am) - early riser optional

**Crafting Menu:**
- **Available Recipes:** Shows unlocked recipes with ingredient check (green = have, red = missing)
- **In Progress:** Materials currently being crafted (with timer)
- **Completed:** Finished materials ready to place in classroom
- **Recipe Book:** Browse locked recipes (shows unlock requirements)

### Inventory System

**Virginia's Bag (Collection Limit):**
- Can carry 20 items at a time
- Items stack (10x pinecones = 1 stack)
- Special "Rare Find" items don't count against limit (to avoid frustration)

**Storage at School:**
- Unlocked at Tier 2
- Can store 50+ items
- Organize by category (Natural, Purchased, Crafted, Donated)

**Currency:**
- **Stars ⭐:** Primary currency for purchasing supplies
- **Discovery Tokens 🎟️:** Secondary currency for rare/special orders (from gacha system)
- **Trust 💙:** Relationship currency, unlocks mentorship and gifts

### Quality & Effectiveness

**Quality Tiers affect:**
1. **Toddler Engagement:** Higher quality = children choose it more often
2. **Concentration Time:** Better materials = longer focus periods
3. **"Aha Moment" Potential:** Legacy materials can trigger special cutscenes
4. **Aesthetic Appeal:** Better sprites, animations, visual effects
5. **Parent Perception:** Parents notice beautiful materials (affects trust/reputation)

**Player can improve quality by:**
- Using better ingredients (ceramic vs. plastic pitchers)
- Spending more time on crafting (sanding, painting, varnishing)
- Unlocking advanced techniques through mentorship
- Receiving gifts from Lead Guide (special tools, rare materials)

---

## Gameplay Loop Integration

### Daily Rhythm (7:00 AM - 3:00 PM)

**Morning (7:00 - 7:45 AM)**
- Wake up, optional crafting time at home
- **Walk to school** → **COLLECTION OPPORTUNITY** (find items on street, in trash, etc.)
- Arrive at school by 7:45 AM

**School Day (7:45 AM - 3:00 PM)**
- Morning Arrival (7:45 - 8:00 AM) - greet children, observe moods
- **Morning Work Cycle (8:00 AM - 11:30 AM)** → **CORE TEACHING GAMEPLAY**
  - Present materials to children based on sensitive periods
  - Observe children using materials (quality affects engagement)
  - Handle disruptions, conflicts, needs
- Lunch (11:30 AM - 12:15 PM) - assist with meal prep, eating, cleanup
- **Nap Time (12:15 - 2:30 PM)** → **CRAFTING OPPORTUNITY** (if children settle well)
  - Perfect nap = 1hr 15min free time to craft
  - Good nap = 30-45min partial time
  - Challenging nap = no free time
- **Afternoon Work Cycle (2:30 - 3:00 PM)** - gentle wake-up, light activities
- Pickup Time (3:00 PM) - parents arrive, conversations

**Evening (3:00 - 5:00 PM) - Optional**
- **Crafting time** at school or home
- Errands in village (shop for supplies, visit traveling artisan)
- Professional development (read Montessori books, unlock recipes)
- Relationship time (Robert, Lead Guide, etc. - post-MVP)

### How Crafting Integrates with Teaching

**Observation → Identification → Crafting → Presentation → Growth**

1. **Observe:** Virginia notices Zoe is in "Small Objects" sensitive period (constantly collecting pebbles)
2. **Identify Need:** Zoe would benefit from Spooning Transfer work (fine motor, Small Objects focus)
3. **Check Materials:** Virginia doesn't have a Spooning Transfer set yet
4. **Craft:** During nap time, Virginia crafts a 🪵 Basic Spooning Transfer Set
5. **Present:** Next morning, Virginia presents the material to Zoe
6. **Growth:** Zoe becomes deeply engaged, concentration increases, fine motor skills develop
7. **Feedback:** Virginia earns Stars, Trust, and potentially unlocks new recipes based on success

**This loop teaches players:**
- To observe children carefully (Montessori "Follow the Child" principle)
- That materials matter (prepared environment concept)
- The satisfaction of seeing children thrive with the right tools
- Montessori pedagogy through gameplay, not lectures

---

## Progression System

### Recipe Unlocks

**Starting Recipes (Tier 1 - Observer):**
- Basic Pouring Set
- Spooning Transfer Set
- Nature Vocabulary Basket

**Tier 2 (Assistant) Unlocks:**
- Polished Pouring Set
- Color Tablets (Primary)
- Object-to-Picture Matching Sets
- Nesting Boxes
- Object Permanence Box (for younger toddlers)

**Tier 3 (Guide-in-Training) Unlocks:**
- Pink Tower (Simplified)
- Knobbed Cylinders (Single Set)
- Dressing Frame (Buttons)
- Advanced Vocabulary Baskets (themed)

**Tier 4 (Lead Guide) Unlocks:**
- Museum-Quality Pink Tower
- Full Knobbed Cylinder Sets (4 blocks)
- Custom Sensorial Materials (child-specific)
- Advanced Practical Life (pouring with funnels, spooning with tweezers, etc.)

**Special Event Unlocks:**
- Parent donations (receive materials/ingredients as gifts)
- Lead Guide mentorship (she teaches you a traditional recipe)
- Traveling Artisan (commission rare materials)
- Montessori Conference (Discovery Token pull for rare recipe book)

### Motivations for Crafting

**Short-term:**
- "Zoe needs fine motor work TODAY, I need to craft something NOW"
- "Nap time is going well, I have 45 minutes to make something"
- "Marcus is bored with current materials, I need novelty"

**Mid-term:**
- "I want to unlock the Pink Tower recipe (requires Trust 50%)"
- "I'm collecting pinecones all week to make a nature sensory basket"
- "The Traveling Artisan is coming Friday, I need Stars to buy that wooden block set"

**Long-term:**
- "I want to have all Classic-quality materials in my classroom by Month 2"
- "I'm working toward the 'Material Designer' achievement (craft 50 materials)"
- "I want to create a Legacy material for each of the 12 children before they graduate"

---

## Balancing & Engagement

### Avoiding Grind

**Problems to avoid:**
- Tedious collection (running back and forth for one item)
- Frustrating RNG (can't find the one item you need)
- Waiting (materials take too long to craft, blocking gameplay)
- Repetition (making the same material over and over)

**Solutions:**
1. **Multiple sources for common items** (beans available at store AND findable in village)
2. **Generous drop rates** for basic materials (pinecones, sticks, etc.)
3. **Instant crafting for Tier 1 materials** (no waiting, craft on the spot)
4. **Batch crafting unlocks** at Tier 3+ ("Craft 3x Pouring Sets" option)
5. **Storage upgrades** reduce backtracking
6. **Traveling Artisan** offers "material kits" (all ingredients bundled for one recipe)

### Rewarding Exploration

**Village exploration should feel rewarding:**
- **Daily route variation** (different items spawn on different days)
- **Seasonal changes** (fall = more acorns, spring = more flowers)
- **Hidden spots** (check behind buildings, in alleyways for rare finds)
- **Trash can treasures** (upcycling theme = finding gold in "garbage")
- **NPCs give hints** ("I saw some beautiful pinecones by the school this morning!")

**Player should think:**
- "I wonder what I'll find today?"
- "Oh, I should check that spot, I found something rare there before"
- "I'm taking the long route today to explore more"

NOT:
- "Ugh, I have to find 5 more pinecones, this is tedious"

---

## Educational Value (Teaching Players about Montessori)

### Embedded Learning

**Players learn Montessori philosophy through:**

1. **Recipe descriptions** (e.g., "The Pink Tower teaches size gradation and early algebraic concepts")
2. **Crafting process** (sanding materials smooth, choosing the right size, testing durability)
3. **Toddler reactions** (children naturally drawn to well-made materials, ignore poorly made ones)
4. **Lead Guide dialogue** ("Remember, the material should be beautiful - beauty invites respect")
5. **Observation notes** ("Aiden spent 20 minutes with the Knobbed Cylinders - this is the concentration we're looking for")

**Key Concepts Taught:**
- **Prepared Environment:** The right materials at the right time matter
- **Control of Error:** Materials should be self-correcting (child can see when they make a mistake)
- **Isolation of Difficulty:** Each material teaches ONE concept clearly
- **Beauty and Order:** Beautiful, well-organized materials invite engagement
- **Follow the Child:** Observation first, then respond with the right material

### Avoiding Didacticism

**DO:**
- Show through gameplay (child thrives with right material = player learns)
- Use natural dialogue (Lead Guide casually mentions Montessori principles)
- Reward discovery (player experiments and succeeds)

**DON'T:**
- Pop-up tutorials explaining Montessori theory at length
- Force players to read before crafting
- Make it feel like a quiz or test

**Players should finish the game thinking:**
- "I understand why Montessori teachers care so much about materials now"
- "I want to learn more about this approach"
- "I see how observation and preparation work together"

---

## Visual & UI Design Notes

### Crafting Interface Aesthetic

**Stardew Valley-inspired pixel art:**
- Cozy, hand-drawn recipe cards
- Ingredient icons with charming pixel art (pinecone, jar, button, etc.)
- Progress bar for crafting time (hourglass animation)
- Satisfying "ding!" and sparkle effect when material is complete

### Material Sprites

**Quality tiers should be visually distinct:**

**🪵 Handmade:**
- Simple sprites, minimal detail
- Muted colors, basic outlines
- No special effects

**🌿 Classic:**
- Polished sprites, clean lines
- Vibrant colors, shading
- Subtle shine or glow

**✨ Heirloom:**
- Detailed sprites, beautiful textures
- Rich colors, gradients, highlights
- Sparkle effect when child uses it
- Gentle glow aura

**🌟 Legacy:**
- Stunning pixel art, frame-worthy
- Perfect color harmony, intricate details
- Full animation when in use (petals fall, stars twinkle, etc.)
- Radiant glow, children visibly drawn to it

### Classroom Organization

**Virginia can:**
- Place materials on shelves (drag-and-drop)
- Organize by area (Practical Life, Sensorial, Language)
- Rotate materials (swap in new ones, store old ones)
- See "shelf appeal" rating (visual indicator of how inviting the environment is)

**Children react:**
- Gravitate toward beautiful, well-organized shelves
- Ignore messy or cluttered areas
- Show preferences based on sensitive periods + material quality

---

## Open Questions for User

1. **Crafting Timing:** Should Tier 1 crafts be instant, or should ALL crafts take time (more realistic but potentially frustrating)?

2. **Recipe Discovery:** Should players unlock recipes through:
   - Story progression only (guided, linear)
   - Observation + experimentation (discover recipes by observing toddler needs)
   - Both (some guaranteed, some hidden)?

3. **Duplicate Materials:** If Virginia crafts 3x Pouring Sets, can she:
   - Use all 3 in the classroom (variety)
   - Only use 1 (limit realism)
   - Trade extras to other teachers for ingredients?

4. **Seasonal Materials:** Should some materials only be craftable in certain seasons (e.g., acorn sensory basket in fall)?

5. **Failure States:** Can crafting fail if rushed or missing steps, or is it always successful (avoiding frustration)?

6. **Multiplayer Future:** If multiplayer is added, should players trade materials/recipes or keep it solo?

---

## Next Steps (Implementation Readiness)

**This document is ready for:**

1. **Game Design Review:** Confirm core loop feels engaging and balanced
2. **Technical Scoping:** Assess complexity of crafting system implementation
3. **Art Asset Planning:** Determine which material sprites to create first (prioritize Tier 1)
4. **Prototype Development:** Build a vertical slice (1-2 recipes, collection, crafting, classroom use)
5. **Playtesting:** Test if crafting feels rewarding or tedious

**Dependencies:**
- Classroom scene (partially built, needs materials placement system)
- Toddler AI (children need to interact with materials based on sensitive periods)
- Inventory/storage UI (collection and crafting menus)
- Village exploration (walking scene exists, needs collectibles)

**Estimated Scope (Development Time):**
- **MVP (3 recipes, basic crafting):** 2-3 days
- **Full Tier 1-2 (10 recipes, polished system):** 1 week
- **Complete System (all tiers, events, progression):** 2-3 weeks

---

## Research Sources

- [Montessori Practical Life Materials](https://themontessoriroom.com/collections/montessori-materials-practical-life)
- [Montessori Activities for 2.5-Year-Olds](https://www.homeandontheway.com/blog/montessori-activities-for-25-year-olds-30-36-months)
- [100+ Montessori Practical Life Skills](https://www.mamashappyhive.com/100-montessori-practical-life-skills/)
- [Montessori Practical Life Activities by Age](https://reachformontessori.com/montessori-practical-life-activities-by-age/)
- [Pink Tower - Montessori From The Heart](https://montessorifromtheheart.com/2015/11/10/pink-tower-2nd-sensorial-material-to-introduce-to-a-2-year-old-toddler/)
- [Montessori Knobbed Cylinders](https://amshq.org/blog/uncategorized/2023-01-20-montessori-knobbed-cylinders-introduction/)
- [Montessori Object Permanence Box](https://www.montessori-theory.com/montessori-object-permanence-box/)
- [5 Essential Montessori Materials For Toddlers](https://www.thinkamajigs.com/blog/5-essential-montessori-materials-for-toddlers/)

---

**Ready for feedback and iteration!**

---

*Mary, Business Analyst*
*MontessoriGame Development Team*
