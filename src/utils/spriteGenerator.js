// Generate simple pixel art toddler sprites
// Each child has unique appearance based on their character data

export function generateChildSprite(scene, childData) {
    // Create a 48x48 texture for more detail
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Get colors based on child data
    const colors = getChildColors(childData);

    // Toddler proportions: BIG head, small body (like Stardew Valley)

    // === HEAD (bigger for toddler look) ===
    // Main head shape
    graphics.fillStyle(colors.skin, 1);
    graphics.fillRect(18, 8, 12, 12);  // Main head rectangle
    graphics.fillRect(17, 10, 14, 8);  // Wider middle section
    graphics.fillRect(19, 7, 10, 2);   // Top of head

    // Ears
    graphics.fillRect(16, 12, 2, 3);   // Left ear
    graphics.fillRect(30, 12, 2, 3);   // Right ear

    // === HAIR ===
    graphics.fillStyle(colors.hair, 1);
    drawHairStyle(graphics, childData.name, 24, 10, colors.hair);

    // === FACE ===
    // Eyes (Stardew style - bigger, more expressive)
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(20, 12, 3, 3);   // Left eye white
    graphics.fillRect(25, 12, 3, 3);   // Right eye white

    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(21, 13, 2, 2);   // Left pupil
    graphics.fillRect(26, 13, 2, 2);   // Right pupil

    // Cute blush
    graphics.fillStyle(colors.blush, 1);
    graphics.fillRect(18, 15, 2, 1);   // Left blush
    graphics.fillRect(28, 15, 2, 1);   // Right blush

    // Mouth (tiny smile)
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(22, 17, 1, 1);
    graphics.fillRect(23, 18, 2, 1);
    graphics.fillRect(25, 17, 1, 1);

    // === BODY (small, chibi proportions) ===
    // Shirt/dress
    graphics.fillStyle(colors.clothing, 1);
    graphics.fillRect(19, 21, 10, 8);  // Main body

    // Add clothing detail
    graphics.fillStyle(colors.clothingDetail, 1);
    graphics.fillRect(21, 22, 2, 1);   // Left shoulder
    graphics.fillRect(25, 22, 2, 1);   // Right shoulder

    // === ARMS (tiny toddler arms) ===
    graphics.fillStyle(colors.skin, 1);
    graphics.fillRect(17, 22, 2, 7);   // Left arm
    graphics.fillRect(29, 22, 2, 7);   // Right arm

    // Hands
    graphics.fillRect(17, 28, 2, 2);   // Left hand
    graphics.fillRect(29, 28, 2, 2);   // Right hand

    // === LEGS (short toddler legs) ===
    graphics.fillStyle(colors.pants, 1);
    graphics.fillRect(20, 29, 3, 6);   // Left leg
    graphics.fillRect(25, 29, 3, 6);   // Right leg

    // === SHOES ===
    graphics.fillStyle(colors.shoes, 1);
    graphics.fillRect(19, 35, 4, 3);   // Left shoe
    graphics.fillRect(25, 35, 4, 3);   // Right shoe

    // Generate texture from graphics
    graphics.generateTexture(childData.name + '_sprite', 48, 48);
    graphics.destroy();

    return childData.name + '_sprite';
}

function getChildColors(childData) {
    const colorMap = {
        'Emma': {
            skin: 0xffd7b5,          // Light skin
            hair: 0xf4d03f,          // Blonde
            clothing: 0xe91e63,      // Pink dress
            clothingDetail: 0xf48fb1, // Lighter pink
            pants: 0xffffff,         // White tights
            shoes: 0x795548,         // Brown
            blush: 0xffb6c1          // Pink blush
        },
        'Marcus': {
            skin: 0x8d5524,          // Dark brown skin
            hair: 0x2c1608,          // Black curly
            clothing: 0x2196f3,      // Blue shirt
            clothingDetail: 0x64b5f6, // Light blue
            pants: 0x424242,         // Gray shorts
            shoes: 0x212121,         // Black
            blush: 0xcd8b76          // Brown blush
        },
        'Lily': {
            skin: 0xf5cba7,          // Light skin
            hair: 0xd84315,          // Red/auburn
            clothing: 0xff9800,      // Orange dress
            clothingDetail: 0xffb74d, // Light orange
            pants: 0xffffff,         // White tights
            shoes: 0xffffff,         // White
            blush: 0xffb6c1          // Pink blush
        },
        'Aiden': {
            skin: 0x5d4037,          // Brown skin
            hair: 0x1a1a1a,          // Black
            clothing: 0x4caf50,      // Green shirt
            clothingDetail: 0x81c784, // Light green
            pants: 0x795548,         // Brown pants
            shoes: 0x424242,         // Dark gray
            blush: 0xbc8f8f          // Brown blush
        },
        'Sofia': {
            skin: 0xe8beac,          // Light-medium skin
            hair: 0x3e2723,          // Dark brown
            clothing: 0x9c27b0,      // Purple dress
            clothingDetail: 0xba68c8, // Light purple
            pants: 0xffffff,         // White tights
            shoes: 0xe91e63,         // Pink
            blush: 0xffb6c1          // Pink blush
        },
        'Noah': {
            skin: 0xf5e1d3,          // Light skin
            hair: 0xa1887f,          // Light brown
            clothing: 0xffeb3b,      // Yellow shirt
            clothingDetail: 0xfff176, // Light yellow
            pants: 0x1976d2,         // Blue shorts
            shoes: 0x607d8b,         // Blue-gray
            blush: 0xffb6c1          // Pink blush
        },
        'Mia': {
            skin: 0x6d4c41,          // Dark skin
            hair: 0x000000,          // Black
            clothing: 0xf44336,      // Red dress
            clothingDetail: 0xe57373, // Light red
            pants: 0x424242,         // Dark gray tights
            shoes: 0xffffff,         // White
            blush: 0xcd8b76          // Brown blush
        },
        'Oliver': {
            skin: 0xffe0bd,          // Very light skin
            hair: 0xffd54f,          // Light blonde
            clothing: 0x81c784,      // Light green shirt
            clothingDetail: 0xa5d6a7, // Very light green
            pants: 0x795548,         // Brown overalls
            shoes: 0x8d6e63,         // Brown
            blush: 0xffb6c1          // Pink blush
        },
        'Zoe': {
            skin: 0xf0c9a0,          // East Asian skin tone
            hair: 0x1a1a1a,          // Black
            clothing: 0x00bcd4,      // Cyan dress
            clothingDetail: 0x4dd0e1, // Light cyan
            pants: 0xffffff,         // White tights
            shoes: 0xe91e63,         // Pink
            blush: 0xffb6c1          // Pink blush
        },
        'Elijah': {
            skin: 0x8b6f47,          // Medium brown skin
            hair: 0x0d0d0d,          // Black
            clothing: 0xff5722,      // Deep orange shirt
            clothingDetail: 0xff8a65, // Light orange
            pants: 0x37474f,         // Dark gray pants
            shoes: 0x424242,         // Dark gray
            blush: 0xcd8b76          // Brown blush
        },
        'Ava': {
            skin: 0xfad7a0,          // Light skin
            hair: 0xc68642,          // Light brown/curly
            clothing: 0xff4081,      // Hot pink dress
            clothingDetail: 0xff80ab, // Light pink
            pants: 0xffffff,         // White tights
            shoes: 0x9c27b0,         // Purple
            blush: 0xffb6c1          // Pink blush
        },
        'Liam': {
            skin: 0xf8e1d2,          // Very light skin
            hair: 0xe74c3c,          // Red
            clothing: 0x1976d2,      // Dark blue shirt
            clothingDetail: 0x42a5f5, // Light blue
            pants: 0x616161,         // Gray pants
            shoes: 0x5d4037,         // Brown
            blush: 0xffb6c1          // Pink blush
        }
    };

    return colorMap[childData.name] || {
        skin: 0xffd7b5,
        hair: 0x8b4513,
        clothing: 0x2196f3,
        clothingDetail: 0x64b5f6,
        pants: 0x424242,
        shoes: 0x795548,
        blush: 0xffb6c1
    };
}

function drawHairStyle(graphics, name, x, y, hairColor) {
    // Different hair styles for different kids (scaled for 48x48)

    const hairStyles = {
        'Emma': () => {
            // Pigtails
            graphics.fillRect(x - 6, y - 3, 12, 4);  // Top
            graphics.fillCircle(x - 7, y + 1, 3);    // Left pigtail
            graphics.fillCircle(x + 7, y + 1, 3);    // Right pigtail
        },
        'Marcus': () => {
            // Short curly (afro style)
            graphics.fillCircle(x, y - 2, 8);
            graphics.fillRect(x - 6, y - 3, 12, 3);
        },
        'Lily': () => {
            // Medium length, wavy
            graphics.fillRect(x - 6, y - 3, 12, 6);
            graphics.fillRect(x - 7, y + 1, 2, 4);  // Left side
            graphics.fillRect(x + 5, y + 1, 2, 4);  // Right side
        },
        'Aiden': () => {
            // Short neat
            graphics.fillRect(x - 6, y - 3, 12, 4);
        },
        'Sofia': () => {
            // Long straight
            graphics.fillRect(x - 6, y - 3, 12, 8);
            graphics.fillRect(x - 7, y + 3, 2, 6);  // Left long
            graphics.fillRect(x + 5, y + 3, 2, 6);  // Right long
        },
        'Noah': () => {
            // Short messy
            graphics.fillRect(x - 6, y - 3, 12, 4);
            graphics.fillRect(x - 4, y - 4, 3, 2);  // Messy bits
            graphics.fillRect(x + 1, y - 4, 3, 2);
        },
        'Mia': () => {
            // Braids
            graphics.fillRect(x - 6, y - 3, 12, 4);
            graphics.fillRect(x - 7, y + 1, 3, 10); // Left braid
            graphics.fillRect(x + 4, y + 1, 3, 10); // Right braid
        },
        'Oliver': () => {
            // Baby fine hair
            graphics.fillRect(x - 5, y - 3, 10, 3);
        },
        'Zoe': () => {
            // Bob cut (neat, straight)
            graphics.fillRect(x - 6, y - 3, 12, 6);
        },
        'Elijah': () => {
            // Short fade
            graphics.fillRect(x - 6, y - 3, 12, 4);
        },
        'Ava': () => {
            // Curly ponytail
            graphics.fillCircle(x, y - 2, 7);
            graphics.fillCircle(x + 6, y, 4);       // Side puff
        },
        'Liam': () => {
            // Short straight
            graphics.fillRect(x - 6, y - 3, 12, 4);
        }
    };

    if (hairStyles[name]) {
        hairStyles[name]();
    } else {
        // Default hair
        graphics.fillRect(x - 6, y - 3, 12, 4);
    }
}
