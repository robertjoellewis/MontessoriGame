// Generate walking animation frames for toddler children
// Creates sprite sheets with 2 frames for walking animations

export function generateChildWalkingAnimations(scene, childData) {
    const colors = getChildColors(childData);
    const name = childData.name;

    // Generate front walking animation (2 frames)
    generateFrontWalking(scene, colors, name);

    // Generate back walking animation (2 frames)
    generateBackWalking(scene, colors, name);

    // Generate side walking animation (2 frames)
    generateSideWalking(scene, colors, name);
}

function generateFrontWalking(scene, colors, name) {
    const frameWidth = 48;
    const frameHeight = 48;
    const frames = 2;

    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    for (let frame = 0; frame < frames; frame++) {
        const offsetX = frame * frameWidth;

        // Draw upper body (head, face, arms - same for both frames)
        drawUpperBodyFront(graphics, offsetX, colors, name);

        // Draw legs (alternating positions with Y offset like Virginia)
        graphics.fillStyle(colors.pants, 1);
        if (frame === 0) {
            // Frame 0: Left leg forward (lower), right leg back (higher)
            graphics.fillRect(offsetX + 20, 30, 3, 6);  // Left leg forward
            graphics.fillRect(offsetX + 25, 29, 3, 6);  // Right leg back
        } else {
            // Frame 1: Right leg forward (lower), left leg back (higher)
            graphics.fillRect(offsetX + 20, 29, 3, 6);  // Left leg back
            graphics.fillRect(offsetX + 25, 30, 3, 6);  // Right leg forward
        }

        // Draw feet with Y position shift
        graphics.fillStyle(colors.shoes, 1);
        if (frame === 0) {
            graphics.fillRect(offsetX + 19, 36, 4, 3);  // Left foot forward (lower)
            graphics.fillRect(offsetX + 25, 35, 4, 3);  // Right foot back (higher)
        } else {
            graphics.fillRect(offsetX + 19, 35, 4, 3);  // Left foot back (higher)
            graphics.fillRect(offsetX + 25, 36, 4, 3);  // Right foot forward (lower)
        }
    }

    const textureName = name + '_walk_front';
    graphics.generateTexture(textureName, frameWidth * frames, frameHeight);
    graphics.destroy();
}

function generateBackWalking(scene, colors, name) {
    const frameWidth = 48;
    const frameHeight = 48;
    const frames = 2;

    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    for (let frame = 0; frame < frames; frame++) {
        const offsetX = frame * frameWidth;

        // Draw upper body (back view)
        drawUpperBodyBack(graphics, offsetX, colors, name);

        // Draw legs (alternating positions with Y offset)
        graphics.fillStyle(colors.pants, 1);
        if (frame === 0) {
            graphics.fillRect(offsetX + 20, 30, 3, 6);  // Left leg forward
            graphics.fillRect(offsetX + 25, 29, 3, 6);  // Right leg back
        } else {
            graphics.fillRect(offsetX + 20, 29, 3, 6);  // Left leg back
            graphics.fillRect(offsetX + 25, 30, 3, 6);  // Right leg forward
        }

        // Draw feet with Y position shift
        graphics.fillStyle(colors.shoes, 1);
        if (frame === 0) {
            graphics.fillRect(offsetX + 19, 36, 4, 3);
            graphics.fillRect(offsetX + 25, 35, 4, 3);
        } else {
            graphics.fillRect(offsetX + 19, 35, 4, 3);
            graphics.fillRect(offsetX + 25, 36, 4, 3);
        }
    }

    const textureName = name + '_walk_back';
    graphics.generateTexture(textureName, frameWidth * frames, frameHeight);
    graphics.destroy();
}

function generateSideWalking(scene, colors, name) {
    const frameWidth = 48;
    const frameHeight = 48;
    const frames = 2;

    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    for (let frame = 0; frame < frames; frame++) {
        const offsetX = frame * frameWidth;

        // Draw upper body (side view)
        drawUpperBodySide(graphics, offsetX, colors, name);

        // Draw leg (single visible leg, alternating position)
        graphics.fillStyle(colors.pants, 1);
        if (frame === 0) {
            // Leg forward (extends lower)
            graphics.fillRect(offsetX + 22, 30, 4, 6);
        } else {
            // Leg back (shorter, higher)
            graphics.fillRect(offsetX + 22, 29, 4, 6);
        }

        // Draw foot with Y position shift
        graphics.fillStyle(colors.shoes, 1);
        if (frame === 0) {
            // Foot forward (lower)
            graphics.fillRect(offsetX + 21, 36, 5, 3);
        } else {
            // Foot back (higher)
            graphics.fillRect(offsetX + 21, 35, 5, 3);
        }
    }

    const textureName = name + '_walk_side';
    graphics.generateTexture(textureName, frameWidth * frames, frameHeight);
    graphics.destroy();
}

// Helper functions to draw body parts

function drawUpperBodyFront(graphics, offsetX, colors, name) {
    // === HAIR (draw first, behind head) ===
    graphics.fillStyle(colors.hair, 1);
    // Top of head
    graphics.fillRect(offsetX + 18, 6, 12, 6);
    graphics.fillRect(offsetX + 17, 8, 14, 4);
    // Sides
    graphics.fillRect(offsetX + 16, 10, 3, 8);
    graphics.fillRect(offsetX + 29, 10, 3, 8);

    // === HEAD ===
    graphics.fillStyle(colors.skin, 1);
    graphics.fillRect(offsetX + 18, 8, 12, 12);
    graphics.fillRect(offsetX + 17, 10, 14, 8);
    graphics.fillRect(offsetX + 19, 7, 10, 2);

    // Ears
    graphics.fillRect(offsetX + 16, 12, 2, 3);
    graphics.fillRect(offsetX + 30, 12, 2, 3);

    // === FACE ===
    // Eyes
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(offsetX + 20, 12, 3, 3);
    graphics.fillRect(offsetX + 25, 12, 3, 3);

    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(offsetX + 21, 13, 2, 2);
    graphics.fillRect(offsetX + 26, 13, 2, 2);

    // Blush
    graphics.fillStyle(colors.blush, 1);
    graphics.fillRect(offsetX + 18, 15, 2, 1);
    graphics.fillRect(offsetX + 28, 15, 2, 1);

    // Mouth
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(offsetX + 22, 17, 1, 1);
    graphics.fillRect(offsetX + 23, 18, 2, 1);
    graphics.fillRect(offsetX + 25, 17, 1, 1);

    // === BODY ===
    // Shirt/dress
    graphics.fillStyle(colors.clothing, 1);
    graphics.fillRect(offsetX + 19, 21, 10, 8);

    // Clothing detail
    graphics.fillStyle(colors.clothingDetail, 1);
    graphics.fillRect(offsetX + 21, 22, 2, 1);
    graphics.fillRect(offsetX + 25, 22, 2, 1);

    // === ARMS ===
    graphics.fillStyle(colors.skin, 1);
    graphics.fillRect(offsetX + 17, 22, 2, 7);
    graphics.fillRect(offsetX + 29, 22, 2, 7);

    // Hands
    graphics.fillRect(offsetX + 17, 28, 2, 2);
    graphics.fillRect(offsetX + 29, 28, 2, 2);
}

function drawUpperBodyBack(graphics, offsetX, colors, name) {
    // === HAIR (back view - covers entire head) ===
    graphics.fillStyle(colors.hair, 1);
    // Back of head - complete coverage
    graphics.fillRect(offsetX + 17, 6, 14, 10);
    graphics.fillRect(offsetX + 16, 8, 16, 8);
    graphics.fillRect(offsetX + 18, 14, 12, 6);

    // === BODY ===
    graphics.fillStyle(colors.clothing, 1);
    graphics.fillRect(offsetX + 19, 21, 10, 8);

    graphics.fillStyle(colors.clothingDetail, 1);
    graphics.fillRect(offsetX + 21, 22, 2, 1);
    graphics.fillRect(offsetX + 25, 22, 2, 1);

    // === ARMS ===
    graphics.fillStyle(colors.skin, 1);
    graphics.fillRect(offsetX + 17, 22, 2, 7);
    graphics.fillRect(offsetX + 29, 22, 2, 7);
}

function drawUpperBodySide(graphics, offsetX, colors, name) {
    // === HAIR (side view) ===
    graphics.fillStyle(colors.hair, 1);
    // Top and back of head
    graphics.fillRect(offsetX + 20, 6, 10, 8);
    graphics.fillRect(offsetX + 19, 8, 11, 6);
    graphics.fillRect(offsetX + 18, 10, 10, 8);

    // === HEAD ===
    graphics.fillStyle(colors.skin, 1);
    graphics.fillRect(offsetX + 22, 9, 8, 10);
    graphics.fillRect(offsetX + 23, 8, 5, 2);

    // Ear
    graphics.fillRect(offsetX + 21, 12, 2, 3);

    // === FACE ===
    // Eye
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(offsetX + 25, 12, 2, 3);

    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(offsetX + 25, 13, 2, 2);

    // Blush
    graphics.fillStyle(colors.blush, 1);
    graphics.fillRect(offsetX + 27, 15, 2, 1);

    // Mouth
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(offsetX + 27, 17, 2, 1);

    // === BODY ===
    graphics.fillStyle(colors.clothing, 1);
    graphics.fillRect(offsetX + 21, 21, 9, 8);

    graphics.fillStyle(colors.clothingDetail, 1);
    graphics.fillRect(offsetX + 23, 22, 2, 1);

    // === ARM (visible arm) ===
    graphics.fillStyle(colors.skin, 1);
    graphics.fillRect(offsetX + 28, 22, 2, 7);
    graphics.fillRect(offsetX + 28, 28, 2, 2);
}

// Get child colors from existing sprite generator
function getChildColors(childData) {
    const colorMap = {
        'Emma': {
            skin: 0xffd7b5,
            hair: 0xf4d03f,
            clothing: 0xe91e63,
            clothingDetail: 0xf48fb1,
            pants: 0xffffff,
            shoes: 0x795548,
            blush: 0xffb6c1
        },
        'Marcus': {
            skin: 0x8d5524,
            hair: 0x2c1608,
            clothing: 0x2196f3,
            clothingDetail: 0x64b5f6,
            pants: 0x424242,
            shoes: 0x212121,
            blush: 0xcd8b76
        },
        'Lily': {
            skin: 0xf5cba7,
            hair: 0xd84315,
            clothing: 0xff9800,
            clothingDetail: 0xffb74d,
            pants: 0xffffff,
            shoes: 0xffffff,
            blush: 0xffb6c1
        },
        'Aiden': {
            skin: 0x5d4037,
            hair: 0x1a1a1a,
            clothing: 0x4caf50,
            clothingDetail: 0x81c784,
            pants: 0x795548,
            shoes: 0x424242,
            blush: 0xbc8f8f
        },
        'Sofia': {
            skin: 0xe8beac,
            hair: 0x3e2723,
            clothing: 0x9c27b0,
            clothingDetail: 0xba68c8,
            pants: 0xffffff,
            shoes: 0xe91e63,
            blush: 0xffb6c1
        },
        'Noah': {
            skin: 0xf5e1d3,
            hair: 0xa1887f,
            clothing: 0xffeb3b,
            clothingDetail: 0xfff176,
            pants: 0x1976d2,
            shoes: 0x607d8b,
            blush: 0xffb6c1
        },
        'Mia': {
            skin: 0x6d4c41,
            hair: 0x000000,
            clothing: 0xf44336,
            clothingDetail: 0xe57373,
            pants: 0x424242,
            shoes: 0xffffff,
            blush: 0xcd8b76
        },
        'Oliver': {
            skin: 0xffe0bd,
            hair: 0xffd54f,
            clothing: 0x81c784,
            clothingDetail: 0xa5d6a7,
            pants: 0x795548,
            shoes: 0x8d6e63,
            blush: 0xffb6c1
        },
        'Zoe': {
            skin: 0xf0c9a0,
            hair: 0x1a1a1a,
            clothing: 0x00bcd4,
            clothingDetail: 0x4dd0e1,
            pants: 0xffffff,
            shoes: 0xe91e63,
            blush: 0xffb6c1
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
