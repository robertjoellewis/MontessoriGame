// Generate Robert's sprite (Virginia's boyfriend)
// Work-from-home boyfriend character
// TODO: Update with actual photo reference when provided

export function generateRobertSprite(scene) {
    // Create a 48x48 texture for Robert
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // TODO: Update these colors based on photo reference
    // Placeholder colors for now
    const skinTone = 0xf5cba7;       // Light-medium skin (adjust based on photo)
    const hairColor = 0x4a3428;      // Dark brown (adjust based on photo)
    const shirtColor = 0x4a7c8e;     // Blue shirt (adjust based on photo)
    const pantsColor = 0x424242;     // Dark gray pants
    const eyeColor = 0x4a3428;       // Dark brown eyes (adjust based on photo)

    // === HEAD ===
    // Face shape
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(19, 8, 10, 11);   // Main face
    graphics.fillRect(18, 10, 12, 7);   // Wider middle
    graphics.fillRect(20, 7, 8, 2);     // Top of head

    // Ears
    graphics.fillRect(17, 12, 2, 3);    // Left ear
    graphics.fillRect(29, 12, 2, 3);    // Right ear

    // === HAIR ===
    // TODO: Update hair style based on photo
    graphics.fillStyle(hairColor, 1);

    // Short hair (placeholder style)
    graphics.fillRect(18, 7, 12, 6);    // Top of head
    graphics.fillRect(17, 8, 2, 4);     // Left side
    graphics.fillRect(29, 8, 2, 4);     // Right side

    // === EYES ===
    // Whites
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(20, 13, 2, 2);    // Left eye white
    graphics.fillRect(26, 13, 2, 2);    // Right eye white

    // Pupils
    graphics.fillStyle(eyeColor, 1);
    graphics.fillRect(21, 14, 1, 1);    // Left pupil
    graphics.fillRect(27, 14, 1, 1);    // Right pupil

    // === SMILE ===
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(22, 17, 1, 1);
    graphics.fillRect(23, 18, 2, 1);    // Smile curve
    graphics.fillRect(25, 17, 1, 1);

    // === BODY (casual shirt) ===
    graphics.fillStyle(shirtColor, 1);
    graphics.fillRect(20, 23, 8, 9);    // Main torso

    // Shirt shading/detail
    const shirtDark = 0x3a5f6d;
    graphics.fillStyle(shirtDark, 1);
    graphics.fillRect(21, 24, 2, 1);    // Left shoulder shadow
    graphics.fillRect(25, 24, 2, 1);    // Right shoulder shadow

    // === ARMS ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(18, 24, 2, 8);    // Left arm
    graphics.fillRect(28, 24, 2, 8);    // Right arm

    // Hands
    graphics.fillRect(18, 31, 2, 2);    // Left hand
    graphics.fillRect(28, 31, 2, 2);    // Right hand

    // === PANTS ===
    graphics.fillStyle(pantsColor, 1);
    graphics.fillRect(21, 32, 3, 6);    // Left leg
    graphics.fillRect(24, 32, 3, 6);    // Right leg

    // === SHOES ===
    graphics.fillStyle(0x000000, 1);    // Black shoes
    graphics.fillRect(20, 37, 3, 2);    // Left shoe
    graphics.fillRect(25, 37, 3, 2);    // Right shoe

    // Generate texture
    graphics.generateTexture('robert_boyfriend', 48, 48);
    graphics.destroy();

    return 'robert_boyfriend';
}

// Generate Robert sitting at desk (work-from-home variant)
export function generateRobertAtDesk(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    const skinTone = 0xf5cba7;
    const hairColor = 0x4a3428;
    const shirtColor = 0x4a7c8e;
    const eyeColor = 0x4a3428;
    const laptopColor = 0x2c2c2c;

    // === ROBERT (upper body only, sitting) ===

    // Head
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(19, 12, 10, 11);
    graphics.fillRect(18, 14, 12, 7);

    // Hair
    graphics.fillStyle(hairColor, 1);
    graphics.fillRect(18, 11, 12, 6);
    graphics.fillRect(17, 12, 2, 4);
    graphics.fillRect(29, 12, 2, 4);

    // Eyes
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(20, 17, 2, 2);
    graphics.fillRect(26, 17, 2, 2);

    graphics.fillStyle(eyeColor, 1);
    graphics.fillRect(21, 18, 1, 1);
    graphics.fillRect(27, 18, 1, 1);

    // Smile
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(22, 21, 1, 1);
    graphics.fillRect(23, 22, 2, 1);
    graphics.fillRect(25, 21, 1, 1);

    // Body (shirt)
    graphics.fillStyle(shirtColor, 1);
    graphics.fillRect(16, 26, 16, 8);   // Torso (wider when sitting)

    // Arms (on desk)
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(14, 28, 4, 6);    // Left arm
    graphics.fillRect(30, 28, 4, 6);    // Right arm

    // === DESK ===
    graphics.fillStyle(0x8b6f47, 1);    // Brown desk
    graphics.fillRect(8, 34, 32, 4);    // Desk surface

    // === LAPTOP ===
    graphics.fillStyle(laptopColor, 1);
    graphics.fillRect(18, 30, 12, 8);   // Laptop screen
    graphics.fillRect(18, 36, 12, 2);   // Laptop keyboard

    // Screen glow
    graphics.fillStyle(0x87ceeb, 0.5);
    graphics.fillRect(19, 31, 10, 6);

    graphics.generateTexture('robert_at_desk', 48, 48);
    graphics.destroy();

    return 'robert_at_desk';
}

// Note: This is a placeholder sprite. Update with photo reference:
// - Hair color and style
// - Facial features
// - Skin tone
// - Clothing preferences
// - Any distinctive features (glasses, facial hair, etc.)
