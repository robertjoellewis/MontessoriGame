# Classroom Features - Future Development

## Current Status (Completed)
- ✅ Toddlers walking around autonomously with animated legs
- ✅ Arrival notifications when children enter
- ✅ Material stations with clickable info panels
- ✅ Observation mechanic (track child activities)
- ✅ AI-generated Stardew-style material sprites

## Planned Features

### Priority 1: Teaching Interactions (CORE MECHANIC)
Implement the core Montessori teaching system:
- Click a material, then click a child to present the lesson
- Show animation/sequence of Virginia teaching the material
- Track which materials each child has been taught
- Children gain skills/knowledge from lessons
- Display notification: "[Child] has learned [Material]!"
- Track teaching progress per child

**Game Mechanics:**
- Materials must be taught before children can use them independently
- Different materials teach different skills (fine motor, language, sensorial, etc.)
- Children have preferences and learning speeds

### Priority 2: Autonomous Child Activities
Children interact with materials they've learned:
- Children autonomously choose materials they've been taught
- Walk to material location
- Perform activity animation for duration
- Gain skill points, concentration, satisfaction metrics
- Return to wandering when activity complete

**Game Mechanics:**
- Activity duration varies by material complexity
- Children choose based on interests and needs
- Repeat activities to master skills

### Priority 3: Needs/Care System
Add basic care needs Virginia must respond to:
- Energy meter (decreases during activities)
- Hunger (lunch time, snacks)
- Bathroom needs
- Emotional needs (comfort, attention)

**Game Mechanics:**
- Virginia must notice and respond to child cues
- Neglected needs affect child behavior
- Successful care builds trust and learning

### Priority 4: Skill Tracking & Progress
Visual system to track each child's development:
- Skill categories: Fine Motor, Gross Motor, Language, Sensorial, Practical Life
- Progress bars or badges for each category
- UI panel showing individual child progress
- End-of-day summary of learning achievements

### Priority 5: Daily Schedule & Routines
Implement Montessori daily structure:
- Morning circle time
- Work period (children choose activities)
- Snack time
- Outdoor play
- Lunch
- Afternoon work period
- Pickup time

## Technical Notes
- Material data structure in `/src/data/materials.js`
- Child walking animations in `/src/utils/childWalkingAnimations.js`
- Main classroom logic in `/src/scenes/ClassroomScene.js`
- AI sprite generation scripts in `/scripts/`

## Design Principles
- Stay true to Montessori philosophy (child-led, hands-on learning)
- Maintain Stardew Valley aesthetic
- Keep interactions simple and intuitive
- Focus on observation and guidance, not control
