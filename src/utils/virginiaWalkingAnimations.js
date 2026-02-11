// Generate walking animation frames for Virginia
// Creates sprite sheets with multiple frames for walking animations

export function generateVirginiaWalkingAnimations(scene, bandanaOnHead = false) {
    const colors = {
        skinTone: 0xf5cba7,
        hairColor: 0x8b6f47,
        hairHighlight: 0xa0826d,
        glassFrames: 0x4a3428,
        bandanaColor: 0xf0f0f0,
        bandanaPattern: 0xe0e0e0,
        shirtColor: 0xe8926f,
        shirtDark: 0xd17a58,
        eyeGreen: 0x2e7d32,
        shortsColor: 0x5a7fa6,
        shortsDark: 0x4a6b8a,
        camoGreen: 0x6b7d5a,
        camoBrown: 0x8b7d6b,
        camoTan: 0xb5a89a
    };

    // Generate front walking animation (2 frames)
    generateFrontWalking(scene, colors, bandanaOnHead);

    // Generate back walking animation (2 frames)
    generateBackWalking(scene, colors, bandanaOnHead);

    // Generate side walking animation (2 frames)
    generateSideWalking(scene, colors, bandanaOnHead);
}

function generateFrontWalking(scene, colors, bandanaOnHead) {
    const frameWidth = 48;
    const frameHeight = 48;
    const frames = 2;

    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    for (let frame = 0; frame < frames; frame++) {
        const offsetX = frame * frameWidth;

        // Draw upper body (same for both frames)
        drawUpperBodyFront(graphics, offsetX, colors, bandanaOnHead);

        // Draw legs (different positions per frame)
        if (frame === 0) {
            // Frame 0: Left leg forward, right leg back
            drawLegsFront(graphics, offsetX, colors, -1, 1); // left forward, right back
        } else {
            // Frame 1: Right leg forward, left leg back
            drawLegsFront(graphics, offsetX, colors, 1, -1); // left back, right forward
        }

        // Draw feet
        drawFeetFront(graphics, offsetX, colors, frame);
    }

    const textureName = bandanaOnHead ? 'virginia_walk_front_headband' : 'virginia_walk_front';
    graphics.generateTexture(textureName, frameWidth * frames, frameHeight);
    graphics.destroy();
}

function generateBackWalking(scene, colors, bandanaOnHead) {
    const frameWidth = 48;
    const frameHeight = 48;
    const frames = 2;

    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    for (let frame = 0; frame < frames; frame++) {
        const offsetX = frame * frameWidth;

        // Draw upper body (same for both frames)
        drawUpperBodyBack(graphics, offsetX, colors, bandanaOnHead);

        // Draw legs (different positions per frame)
        if (frame === 0) {
            // Frame 0: Left leg forward, right leg back
            drawLegsBack(graphics, offsetX, colors, -1, 1);
        } else {
            // Frame 1: Right leg forward, left leg back
            drawLegsBack(graphics, offsetX, colors, 1, -1);
        }

        // Draw feet
        drawFeetBack(graphics, offsetX, colors, frame);
    }

    const textureName = bandanaOnHead ? 'virginia_walk_back_headband' : 'virginia_walk_back';
    graphics.generateTexture(textureName, frameWidth * frames, frameHeight);
    graphics.destroy();
}

function generateSideWalking(scene, colors, bandanaOnHead) {
    const frameWidth = 48;
    const frameHeight = 48;
    const frames = 2;

    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    for (let frame = 0; frame < frames; frame++) {
        const offsetX = frame * frameWidth;

        // Draw upper body (same for both frames)
        drawUpperBodySide(graphics, offsetX, colors, bandanaOnHead);

        // Draw leg (different position per frame)
        drawLegSide(graphics, offsetX, colors, frame);

        // Draw foot
        drawFootSide(graphics, offsetX, colors, frame);
    }

    const textureName = bandanaOnHead ? 'virginia_walk_side_headband' : 'virginia_walk_side';
    graphics.generateTexture(textureName, frameWidth * frames, frameHeight);
    graphics.destroy();
}

// Helper functions to draw body parts

function drawUpperBodyFront(graphics, offsetX, colors, bandanaOnHead) {
    if (bandanaOnHead) {
        // Bandana on head
        graphics.fillStyle(colors.bandanaColor, 1);
        graphics.fillRect(offsetX + 19, 7, 10, 5);
        graphics.fillRect(offsetX + 18, 10, 2, 6);
        graphics.fillRect(offsetX + 28, 10, 2, 6);

        graphics.fillStyle(colors.bandanaPattern, 1);
        graphics.fillRect(offsetX + 21, 8, 1, 1);
        graphics.fillRect(offsetX + 24, 9, 1, 1);
        graphics.fillRect(offsetX + 26, 8, 1, 1);

        // Hair poof below bandana
        graphics.fillStyle(colors.hairColor, 1);
        graphics.fillRect(offsetX + 17, 15, 5, 5);
        graphics.fillRect(offsetX + 16, 16, 2, 3);
        graphics.fillRect(offsetX + 26, 15, 5, 5);
        graphics.fillRect(offsetX + 30, 16, 2, 3);

        graphics.fillStyle(colors.hairHighlight, 1);
        graphics.fillRect(offsetX + 18, 17, 1, 1);
        graphics.fillRect(offsetX + 29, 17, 1, 1);
    } else {
        // Bandana on neck - draw full hair first
        graphics.fillStyle(colors.hairColor, 1);
        graphics.fillRect(offsetX + 19, 6, 10, 5);
        graphics.fillRect(offsetX + 20, 7, 8, 3);

        graphics.fillStyle(colors.hairHighlight, 1);
        graphics.fillRect(offsetX + 23, 7, 2, 1);

        graphics.fillStyle(colors.hairColor, 1);
        graphics.fillRect(offsetX + 18, 8, 5, 10);
        graphics.fillRect(offsetX + 17, 9, 2, 8);
        graphics.fillRect(offsetX + 17, 16, 5, 5);
        graphics.fillRect(offsetX + 16, 17, 2, 3);
        graphics.fillRect(offsetX + 25, 8, 5, 10);
        graphics.fillRect(offsetX + 29, 9, 2, 8);
        graphics.fillRect(offsetX + 26, 16, 5, 5);
        graphics.fillRect(offsetX + 30, 17, 2, 3);

        graphics.fillStyle(colors.hairHighlight, 1);
        graphics.fillRect(offsetX + 19, 11, 1, 2);
        graphics.fillRect(offsetX + 28, 11, 1, 2);
        graphics.fillRect(offsetX + 18, 18, 1, 1);
        graphics.fillRect(offsetX + 29, 18, 1, 1);
    }

    // Face
    graphics.fillStyle(colors.skinTone, 1);
    graphics.fillRect(offsetX + 20, 9, 8, 10);
    graphics.fillRect(offsetX + 21, 8, 6, 2);
    graphics.fillRect(offsetX + 19, 12, 1, 3);
    graphics.fillRect(offsetX + 28, 12, 1, 3);

    // Eyes
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(offsetX + 20, 13, 2, 2);
    graphics.fillRect(offsetX + 26, 13, 2, 2);

    graphics.fillStyle(colors.eyeGreen, 1);
    graphics.fillRect(offsetX + 20, 14, 2, 1);
    graphics.fillRect(offsetX + 26, 14, 2, 1);

    // Glasses
    graphics.fillStyle(colors.glassFrames, 1);
    graphics.fillRect(offsetX + 19, 12, 4, 1);
    graphics.fillRect(offsetX + 19, 15, 4, 1);
    graphics.fillRect(offsetX + 19, 12, 1, 4);
    graphics.fillRect(offsetX + 22, 12, 1, 4);
    graphics.fillRect(offsetX + 25, 12, 4, 1);
    graphics.fillRect(offsetX + 25, 15, 4, 1);
    graphics.fillRect(offsetX + 25, 12, 1, 4);
    graphics.fillRect(offsetX + 28, 12, 1, 4);
    graphics.fillRect(offsetX + 23, 13, 2, 1);

    // Smile
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(offsetX + 22, 17, 1, 1);
    graphics.fillRect(offsetX + 23, 18, 2, 1);
    graphics.fillRect(offsetX + 25, 17, 1, 1);

    if (!bandanaOnHead) {
        // Neck bandana
        graphics.fillStyle(colors.bandanaColor, 1);
        graphics.fillRect(offsetX + 19, 20, 10, 3);
        graphics.fillStyle(colors.bandanaPattern, 1);
        graphics.fillRect(offsetX + 20, 20, 1, 1);
        graphics.fillRect(offsetX + 22, 21, 1, 1);
        graphics.fillRect(offsetX + 24, 20, 1, 1);
        graphics.fillRect(offsetX + 26, 21, 1, 1);
    }

    // Body
    graphics.fillStyle(colors.shirtColor, 1);
    graphics.fillRect(offsetX + 20, 23, 8, 7);

    graphics.fillStyle(colors.shirtDark, 1);
    graphics.fillRect(offsetX + 21, 24, 2, 1);
    graphics.fillRect(offsetX + 25, 24, 2, 1);

    // Arms
    graphics.fillStyle(colors.skinTone, 1);
    graphics.fillRect(offsetX + 18, 24, 2, 6);
    graphics.fillRect(offsetX + 28, 24, 2, 6);
    graphics.fillRect(offsetX + 18, 29, 2, 2);
    graphics.fillRect(offsetX + 28, 29, 2, 2);

    // Shorts
    graphics.fillStyle(colors.shortsColor, 1);
    graphics.fillRect(offsetX + 20, 30, 8, 4);

    graphics.fillStyle(colors.shortsDark, 1);
    graphics.fillRect(offsetX + 23, 30, 2, 4);
    graphics.fillRect(offsetX + 20, 33, 8, 1);
}

function drawLegsFront(graphics, offsetX, colors, leftOffset, rightOffset) {
    graphics.fillStyle(colors.skinTone, 1);
    // Left leg
    graphics.fillRect(offsetX + 21, 34 + leftOffset, 2, 3);
    // Right leg
    graphics.fillRect(offsetX + 25, 34 + rightOffset, 2, 3);
}

function drawFeetFront(graphics, offsetX, colors, frame) {
    graphics.fillStyle(colors.camoGreen, 1);
    if (frame === 0) {
        // Left foot forward (lower)
        graphics.fillRect(offsetX + 20, 38, 3, 2);
        // Right foot back (higher)
        graphics.fillRect(offsetX + 25, 36, 3, 2);
    } else {
        // Left foot back (higher)
        graphics.fillRect(offsetX + 20, 36, 3, 2);
        // Right foot forward (lower)
        graphics.fillRect(offsetX + 25, 38, 3, 2);
    }

    graphics.fillStyle(colors.camoBrown, 1);
    if (frame === 0) {
        graphics.fillRect(offsetX + 20, 38, 1, 1);
        graphics.fillRect(offsetX + 27, 36, 1, 1);
    } else {
        graphics.fillRect(offsetX + 20, 36, 1, 1);
        graphics.fillRect(offsetX + 27, 38, 1, 1);
    }
}

function drawUpperBodyBack(graphics, offsetX, colors, bandanaOnHead) {
    if (bandanaOnHead) {
        // Bandana
        graphics.fillStyle(colors.bandanaColor, 1);
        graphics.fillRect(offsetX + 19, 7, 10, 5);
        graphics.fillRect(offsetX + 18, 10, 2, 6);
        graphics.fillRect(offsetX + 28, 10, 2, 6);

        graphics.fillStyle(colors.bandanaPattern, 1);
        graphics.fillRect(offsetX + 20, 8, 1, 1);
        graphics.fillRect(offsetX + 22, 9, 1, 1);
        graphics.fillRect(offsetX + 24, 8, 1, 1);
        graphics.fillRect(offsetX + 26, 9, 1, 1);

        graphics.fillStyle(colors.bandanaColor, 1);
        graphics.fillRect(offsetX + 22, 11, 4, 3);

        // Hair poof
        graphics.fillStyle(colors.hairColor, 1);
        graphics.fillRect(offsetX + 17, 15, 5, 5);
        graphics.fillRect(offsetX + 16, 16, 2, 3);
        graphics.fillRect(offsetX + 22, 15, 4, 5);
        graphics.fillRect(offsetX + 26, 15, 5, 5);
        graphics.fillRect(offsetX + 30, 16, 2, 3);

        graphics.fillStyle(colors.hairHighlight, 1);
        graphics.fillRect(offsetX + 18, 17, 1, 1);
        graphics.fillRect(offsetX + 24, 17, 1, 1);
        graphics.fillRect(offsetX + 29, 17, 1, 1);

        // Neck
        graphics.fillStyle(colors.skinTone, 1);
        graphics.fillRect(offsetX + 21, 20, 6, 3);
    } else {
        // Full hair
        graphics.fillStyle(colors.hairColor, 1);
        graphics.fillRect(offsetX + 19, 6, 10, 8);

        graphics.fillStyle(colors.hairHighlight, 1);
        graphics.fillRect(offsetX + 23, 7, 2, 1);

        graphics.fillStyle(colors.hairColor, 1);
        graphics.fillRect(offsetX + 18, 8, 5, 10);
        graphics.fillRect(offsetX + 17, 9, 2, 8);
        graphics.fillRect(offsetX + 17, 16, 5, 5);
        graphics.fillRect(offsetX + 16, 17, 2, 3);
        graphics.fillRect(offsetX + 25, 8, 5, 10);
        graphics.fillRect(offsetX + 29, 9, 2, 8);
        graphics.fillRect(offsetX + 26, 16, 5, 5);
        graphics.fillRect(offsetX + 30, 17, 2, 3);
        graphics.fillRect(offsetX + 20, 8, 8, 12);
        graphics.fillRect(offsetX + 22, 14, 4, 6);
        graphics.fillRect(offsetX + 21, 15, 6, 5);

        graphics.fillStyle(colors.hairHighlight, 1);
        graphics.fillRect(offsetX + 19, 11, 1, 2);
        graphics.fillRect(offsetX + 28, 11, 1, 2);
        graphics.fillRect(offsetX + 18, 18, 1, 1);
        graphics.fillRect(offsetX + 29, 18, 1, 1);

        // Bandana on neck
        graphics.fillStyle(colors.bandanaColor, 1);
        graphics.fillRect(offsetX + 19, 20, 10, 3);

        graphics.fillStyle(colors.bandanaPattern, 1);
        graphics.fillRect(offsetX + 20, 20, 1, 1);
        graphics.fillRect(offsetX + 22, 21, 1, 1);
        graphics.fillRect(offsetX + 24, 20, 1, 1);
        graphics.fillRect(offsetX + 26, 21, 1, 1);

        graphics.fillStyle(colors.bandanaColor, 1);
        graphics.fillRect(offsetX + 29, 19, 3, 4);
    }

    // Body
    graphics.fillStyle(colors.shirtColor, 1);
    graphics.fillRect(offsetX + 20, 23, 8, 7);

    graphics.fillStyle(colors.shirtDark, 1);
    graphics.fillRect(offsetX + 21, 24, 2, 1);
    graphics.fillRect(offsetX + 25, 24, 2, 1);

    // Arms
    graphics.fillStyle(colors.skinTone, 1);
    graphics.fillRect(offsetX + 18, 24, 2, 6);
    graphics.fillRect(offsetX + 28, 24, 2, 6);

    // Shorts
    graphics.fillStyle(colors.shortsColor, 1);
    graphics.fillRect(offsetX + 20, 30, 8, 4);

    graphics.fillStyle(colors.shortsDark, 1);
    graphics.fillRect(offsetX + 20, 33, 8, 1);
}

function drawLegsBack(graphics, offsetX, colors, leftOffset, rightOffset) {
    graphics.fillStyle(colors.skinTone, 1);
    // Left leg
    graphics.fillRect(offsetX + 21, 34 + leftOffset, 2, 3);
    // Right leg
    graphics.fillRect(offsetX + 25, 34 + rightOffset, 2, 3);
}

function drawFeetBack(graphics, offsetX, colors, frame) {
    graphics.fillStyle(colors.camoGreen, 1);
    if (frame === 0) {
        graphics.fillRect(offsetX + 20, 38, 3, 2);
        graphics.fillRect(offsetX + 25, 36, 3, 2);
    } else {
        graphics.fillRect(offsetX + 20, 36, 3, 2);
        graphics.fillRect(offsetX + 25, 38, 3, 2);
    }

    graphics.fillStyle(colors.camoBrown, 1);
    if (frame === 0) {
        graphics.fillRect(offsetX + 20, 38, 1, 1);
        graphics.fillRect(offsetX + 27, 36, 1, 1);
    } else {
        graphics.fillRect(offsetX + 20, 36, 1, 1);
        graphics.fillRect(offsetX + 27, 38, 1, 1);
    }
}

function drawUpperBodySide(graphics, offsetX, colors, bandanaOnHead) {
    if (bandanaOnHead) {
        // Bandana
        graphics.fillStyle(colors.bandanaColor, 1);
        graphics.fillRect(offsetX + 20, 7, 6, 4);
        graphics.fillRect(offsetX + 19, 8, 8, 3);
        graphics.fillRect(offsetX + 18, 10, 8, 5);

        graphics.fillStyle(colors.bandanaPattern, 1);
        graphics.fillRect(offsetX + 21, 8, 1, 1);
        graphics.fillRect(offsetX + 23, 9, 1, 1);
        graphics.fillRect(offsetX + 20, 12, 1, 1);

        // Hair
        graphics.fillStyle(colors.hairColor, 1);
        graphics.fillRect(offsetX + 18, 15, 6, 5);
        graphics.fillRect(offsetX + 17, 16, 2, 3);

        graphics.fillStyle(colors.hairHighlight, 1);
        graphics.fillRect(offsetX + 20, 17, 1, 1);
    } else {
        // Full hair
        graphics.fillStyle(colors.hairColor, 1);
        graphics.fillRect(offsetX + 20, 6, 6, 2);
        graphics.fillRect(offsetX + 19, 7, 8, 2);
        graphics.fillRect(offsetX + 18, 8, 9, 2);
        graphics.fillRect(offsetX + 18, 9, 8, 10);
        graphics.fillRect(offsetX + 26, 9, 3, 1);
        graphics.fillRect(offsetX + 26, 10, 3, 8);
        graphics.fillRect(offsetX + 18, 16, 6, 5);
        graphics.fillRect(offsetX + 17, 17, 2, 3);

        graphics.fillStyle(colors.hairHighlight, 1);
        graphics.fillRect(offsetX + 19, 11, 1, 2);
        graphics.fillRect(offsetX + 20, 18, 1, 1);
    }

    // Face
    graphics.fillStyle(colors.skinTone, 1);
    graphics.fillRect(offsetX + 24, 10, 5, 9);
    graphics.fillRect(offsetX + 25, 9, 3, 2);
    graphics.fillRect(offsetX + 28, 13, 2, 2);
    graphics.fillRect(offsetX + 19, 12, 2, 3);

    // Eye
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(offsetX + 25, 13, 2, 2);

    graphics.fillStyle(colors.eyeGreen, 1);
    graphics.fillRect(offsetX + 25, 14, 2, 1);

    // Glasses
    graphics.fillStyle(colors.glassFrames, 1);
    graphics.fillRect(offsetX + 24, 12, 4, 1);
    graphics.fillRect(offsetX + 24, 15, 4, 1);
    graphics.fillRect(offsetX + 24, 12, 1, 4);
    graphics.fillRect(offsetX + 27, 12, 1, 4);
    graphics.fillRect(offsetX + 27, 13, 2, 1);

    // Smile
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(offsetX + 27, 17, 2, 1);

    if (bandanaOnHead) {
        // Neck
        graphics.fillStyle(colors.skinTone, 1);
        graphics.fillRect(offsetX + 23, 20, 4, 3);
    } else {
        // Bandana on neck
        graphics.fillStyle(colors.bandanaColor, 1);
        graphics.fillRect(offsetX + 22, 20, 6, 3);
        graphics.fillRect(offsetX + 28, 19, 2, 4);
    }

    // Body
    graphics.fillStyle(colors.shirtColor, 1);
    graphics.fillRect(offsetX + 21, 23, 7, 7);

    graphics.fillStyle(colors.shirtDark, 1);
    graphics.fillRect(offsetX + 22, 24, 2, 1);

    // Arm
    graphics.fillStyle(colors.skinTone, 1);
    graphics.fillRect(offsetX + 28, 24, 2, 6);
    graphics.fillRect(offsetX + 28, 29, 2, 2);

    // Shorts
    graphics.fillStyle(colors.shortsColor, 1);
    graphics.fillRect(offsetX + 21, 30, 7, 4);
}

function drawLegSide(graphics, offsetX, colors, frame) {
    graphics.fillStyle(colors.skinTone, 1);
    if (frame === 0) {
        // Leg forward
        graphics.fillRect(offsetX + 23, 33, 3, 4);
    } else {
        // Leg back
        graphics.fillRect(offsetX + 23, 35, 3, 2);
    }
}

function drawFootSide(graphics, offsetX, colors, frame) {
    graphics.fillStyle(colors.camoGreen, 1);
    if (frame === 0) {
        // Foot forward
        graphics.fillRect(offsetX + 24, 37, 3, 2);
    } else {
        // Foot back
        graphics.fillRect(offsetX + 24, 37, 3, 2);
    }

    graphics.fillStyle(colors.camoBrown, 1);
    graphics.fillRect(offsetX + 26, 37, 1, 1);
}
