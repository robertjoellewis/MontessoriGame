// Montessori Materials Data
// Information about each material for classroom interactions

export const materialsData = [
    {
        id: 'pink_tower',
        name: 'Pink Tower',
        category: 'Sensorial',
        sprite: 'material_pink_tower.png',
        description: 'Children stack cubes by size to develop visual discrimination and fine motor skills.',
        mechanicsInfo: 'Teach this to help children learn size relationships and hand-eye coordination.',
        // Teaching hints
        difficulty: 'intermediate',
        energyCost: 8,
        ageRange: '2.5-4 years',
        prerequisites: ['nesting_boxes'], // Simpler size work first
        readinessHints: [
            'Child shows interest in stacking or ordering objects',
            'Can pick up and carry objects steadily',
            'Demonstrates focus for 5+ minutes'
        ],
        teachingTip: 'Start with just 3-4 cubes, then gradually add more as child masters the sequence.'
    },
    {
        id: 'knobbed_cylinders',
        name: 'Knobbed Cylinders',
        category: 'Sensorial',
        sprite: 'material_cylinders.png',
        description: 'Toddlers remove and replace cylinders using the knob to develop pincer grip.',
        mechanicsInfo: 'Present this work to build fine motor control and prepare for writing.',
        // Teaching hints
        difficulty: 'beginner',
        energyCost: 6,
        ageRange: '2-3 years',
        prerequisites: [], // Great first lesson!
        readinessHints: [
            'Uses pincer grip (thumb and finger) to pick up small objects',
            'Shows curiosity about fitting things together',
            'Can sit for simple activities'
        ],
        teachingTip: 'This is perfect for young toddlers! Model slow, deliberate movements.'
    },
    {
        id: 'color_tablets',
        name: 'Color Tablets',
        category: 'Sensorial',
        sprite: 'material_color_tablets.png',
        description: 'Children match and name primary colors to develop color recognition.',
        mechanicsInfo: 'Use this to teach color vocabulary and visual discrimination.',
        // Teaching hints
        difficulty: 'beginner',
        energyCost: 5,
        ageRange: '2-3 years',
        prerequisites: [],
        readinessHints: [
            'Points to or names at least one color',
            'Shows interest in sorting or matching',
            'Can follow simple instructions'
        ],
        teachingTip: 'Start with just 3 primary colors. Use the three-period lesson: "This is red."'
    },
    {
        id: 'nesting_boxes',
        name: 'Nesting Boxes',
        category: 'Sensorial',
        sprite: 'material_nesting_boxes.png',
        description: 'Toddlers nest boxes by size to understand graduated dimensions.',
        mechanicsInfo: 'Great for teaching size concepts and problem-solving skills.',
        // Teaching hints
        difficulty: 'beginner',
        energyCost: 5,
        ageRange: '18 months-3 years',
        prerequisites: [],
        readinessHints: [
            'Enjoys putting things inside containers',
            'Beginning to notice size differences',
            'Persistent when solving simple problems'
        ],
        teachingTip: 'Perfect first sensorial work! Start with just 2-3 boxes, then add more.'
    },
    {
        id: 'pouring_pitchers',
        name: 'Pouring Pitchers',
        category: 'Practical Life',
        sprite: 'material_pouring.png',
        description: 'Children pour water between pitchers to develop coordination and concentration.',
        mechanicsInfo: 'Present this to teach careful movement and self-care skills.',
        // Teaching hints
        difficulty: 'intermediate',
        energyCost: 7,
        ageRange: '2.5-4 years',
        prerequisites: ['spooning_tray'], // Master dry transfer first
        readinessHints: [
            'Can carry objects without dropping them',
            'Shows careful, deliberate movements',
            'Has practiced with dry materials first'
        ],
        teachingTip: 'Only teach after child masters dry pouring. Start with very little water!'
    },
    {
        id: 'spooning_tray',
        name: 'Spooning Tray',
        category: 'Practical Life',
        sprite: 'material_spooning.png',
        description: 'Toddlers transfer objects with a spoon to practice fine motor control.',
        mechanicsInfo: 'Use this to prepare children for self-feeding and utensil use.',
        // Teaching hints
        difficulty: 'beginner',
        energyCost: 5,
        ageRange: '2-3 years',
        prerequisites: [],
        readinessHints: [
            'Uses spoon during meals (even messily)',
            'Shows interest in transferring objects',
            'Can hold small objects with control'
        ],
        teachingTip: 'Great for building independence! Start with large objects like pompoms.'
    },
    {
        id: 'broom',
        name: 'Child-Sized Broom',
        category: 'Practical Life',
        sprite: 'material_broom.png',
        description: 'Children sweep to care for their environment and develop coordination.',
        mechanicsInfo: 'Teach this to build responsibility and gross motor skills.',
        // Teaching hints
        difficulty: 'beginner',
        energyCost: 6,
        ageRange: '2-4 years',
        prerequisites: [],
        readinessHints: [
            'Imitates cleaning or helping adults',
            'Has gross motor coordination to push/pull',
            'Shows interest in caring for environment'
        ],
        teachingTip: 'Children love this! Keep the area small at first - just one tile or mat.'
    },
    {
        id: 'books',
        name: 'Picture Books',
        category: 'Language',
        sprite: 'material_books.png',
        description: 'Toddlers look at realistic images to build vocabulary and language skills.',
        mechanicsInfo: 'Use books to teach new words and develop love of reading.',
        // Teaching hints
        difficulty: 'beginner',
        energyCost: 5,
        ageRange: '18 months-4 years',
        prerequisites: [],
        readinessHints: [
            'Shows interest in pictures or books',
            'Points to objects when named',
            'Can sit with an adult for a few minutes'
        ],
        teachingTip: 'Perfect for language building! Use realistic photos and name objects clearly.'
    },
    {
        id: 'puzzle',
        name: 'Knobbed Puzzle',
        category: 'Fine Motor',
        sprite: 'material_puzzle.png',
        description: 'Children remove and replace puzzle pieces using knobs to develop hand strength.',
        mechanicsInfo: 'Present this to build pincer grip and problem-solving abilities.',
        // Teaching hints
        difficulty: 'beginner',
        energyCost: 6,
        ageRange: '18 months-3 years',
        prerequisites: [],
        readinessHints: [
            'Uses pincer grip to pick up small objects',
            'Enjoys taking things apart and putting back',
            'Shows persistence with simple challenges'
        ],
        teachingTip: 'Start with single-shape puzzles, then progress to 3-5 piece puzzles.'
    }
];
