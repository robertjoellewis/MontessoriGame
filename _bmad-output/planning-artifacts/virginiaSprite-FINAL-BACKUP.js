// Generate Virginia's player sprite
// Based on real Virginia: glasses, curly brown hair, bandana, green sweatshirt

export function generateVirginiaSprite(scene) {
    // Create a 48x48 texture for Virginia
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Colors
    const skinTone = 0xf5cba7;       // Light-medium skin
    const hairColor = 0x8b6f47;      // Light brown
    const hairHighlight = 0xa0826d;  // Lighter brown for curls
    const glassFrames = 0x4a3428;    // Dark brown frames
    const glassLenses = 0xe8f4f8;    // Light blue tint (subtle)
    const bandanaColor = 0xf0f0f0;   // White bandana
    const bandanaPattern = 0xe0e0e0; // Light gray pattern
    const shirtColor = 0xe8926f;     // Coral/peach shirt (complements her coloring)
    const shirtDark = 0xd17a58;      // Darker coral for shading
    const eyeGreen = 0x2e7d32;       // Green eyes
    const shortsColor = 0x5a7fa6;    // Blue denim
    const shortsDark = 0x4a6b8a;     // Darker denim for shading
    const camoGreen = 0x6b7d5a;      // Camo green
    const camoBrown = 0x8b7d6b;      // Camo brown
    const camoTan = 0xb5a89a;        // Camo tan

    // === HAIR FIRST (covers entire head, no bald spots!) ===
    graphics.fillStyle(hairColor, 1);

    // Full hair coverage - top of head
    graphics.fillRect(19, 6, 10, 5);    // Top coverage
    graphics.fillRect(20, 7, 8, 3);     // Extra top

    // Part in middle (lighter)
    graphics.fillStyle(hairHighlight, 1);
    graphics.fillRect(23, 7, 2, 1);

    graphics.fillStyle(hairColor, 1);

    // Left side curly hair
    graphics.fillRect(18, 8, 5, 10);    // Left bulk
    graphics.fillRect(17, 9, 2, 8);     // Left curl out

    // POOFY bottom left (shoulder-length curls)
    graphics.fillRect(17, 16, 5, 5);    // Left poof
    graphics.fillRect(16, 17, 2, 3);    // Extra left volume

    // Right side curly hair
    graphics.fillRect(25, 8, 5, 10);    // Right bulk
    graphics.fillRect(29, 9, 2, 8);     // Right curl out

    // POOFY bottom right (shoulder-length curls)
    graphics.fillRect(26, 16, 5, 5);    // Right poof
    graphics.fillRect(30, 17, 2, 3);    // Extra right volume

    // Curly highlights
    graphics.fillStyle(hairHighlight, 1);
    graphics.fillRect(19, 11, 1, 2);
    graphics.fillRect(28, 11, 1, 2);
    graphics.fillRect(18, 18, 1, 1);    // Left poof highlight
    graphics.fillRect(29, 18, 1, 1);    // Right poof highlight

    // === HEAD (narrower face) ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(20, 9, 8, 10);    // Main face (narrower)
    graphics.fillRect(21, 8, 6, 2);     // Forehead

    // Ears
    graphics.fillRect(19, 12, 1, 3);    // Left ear
    graphics.fillRect(28, 12, 1, 3);    // Right ear

    // === EYES (green, clearly visible!) ===
    // Whites
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(20, 13, 2, 2);    // Left eye white
    graphics.fillRect(26, 13, 2, 2);    // Right eye white

    // Green pupils (make sure they're visible!)
    graphics.fillStyle(eyeGreen, 1);
    graphics.fillRect(20, 14, 2, 1);    // Left pupil (wider)
    graphics.fillRect(26, 14, 2, 1);    // Right pupil (wider)

    // === GLASSES (very subtle - just thin outlines!) ===
    graphics.fillStyle(glassFrames, 1);

    // Left frame (just outline, not filled)
    graphics.fillRect(19, 12, 4, 1);    // Top edge
    graphics.fillRect(19, 15, 4, 1);    // Bottom edge
    graphics.fillRect(19, 12, 1, 4);    // Left edge
    graphics.fillRect(22, 12, 1, 4);    // Right edge

    // Right frame (just outline, not filled)
    graphics.fillRect(25, 12, 4, 1);    // Top edge
    graphics.fillRect(25, 15, 4, 1);    // Bottom edge
    graphics.fillRect(25, 12, 1, 4);    // Left edge
    graphics.fillRect(28, 12, 1, 4);    // Right edge

    // Bridge
    graphics.fillRect(23, 13, 2, 1);

    // === SMILE ===
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(22, 17, 1, 1);
    graphics.fillRect(23, 18, 2, 1);
    graphics.fillRect(25, 17, 1, 1);

    // === BANDANA (around neck, like in photo) ===
    graphics.fillStyle(bandanaColor, 1);
    graphics.fillRect(19, 20, 10, 3);   // Main bandana wrap

    // Bandana pattern/texture
    graphics.fillStyle(bandanaPattern, 1);
    graphics.fillRect(20, 20, 1, 1);
    graphics.fillRect(22, 21, 1, 1);
    graphics.fillRect(24, 20, 1, 1);
    graphics.fillRect(26, 21, 1, 1);

    // Bandana knot/bow (side)
    graphics.fillStyle(bandanaColor, 1);
    graphics.fillRect(29, 19, 3, 4);    // Knot puff

    // === BODY (coral/peach shirt, slim build) ===
    graphics.fillStyle(shirtColor, 1);
    graphics.fillRect(20, 23, 8, 7);    // Main torso (narrow for slim)

    // Shirt shading/detail
    graphics.fillStyle(shirtDark, 1);
    graphics.fillRect(21, 24, 2, 1);    // Left shoulder shadow
    graphics.fillRect(25, 24, 2, 1);    // Right shoulder shadow
    graphics.fillRect(23, 25, 2, 4);    // Center seam/shadow

    // === ARMS (slim) ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(18, 24, 2, 6);    // Left arm
    graphics.fillRect(28, 24, 2, 6);    // Right arm

    // Hands
    graphics.fillRect(18, 29, 2, 2);    // Left hand
    graphics.fillRect(28, 29, 2, 2);    // Right hand

    // === SHORTS (blue denim jean shorts) ===
    graphics.fillStyle(shortsColor, 1);
    graphics.fillRect(20, 30, 8, 4);    // Main shorts (shorter than pants)

    // Shorts shading/seams
    graphics.fillStyle(shortsDark, 1);
    graphics.fillRect(23, 30, 2, 4);    // Center seam
    graphics.fillRect(20, 33, 8, 1);    // Bottom hem

    // === LEGS (visible below shorts) ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(21, 34, 2, 3);    // Left leg
    graphics.fillRect(25, 34, 2, 3);    // Right leg

    // === CAMO CROCS ===
    // Left croc (camo pattern)
    graphics.fillStyle(camoGreen, 1);
    graphics.fillRect(20, 37, 3, 2);    // Base
    graphics.fillStyle(camoBrown, 1);
    graphics.fillRect(20, 37, 1, 1);    // Camo spot
    graphics.fillStyle(camoTan, 1);
    graphics.fillRect(22, 38, 1, 1);    // Camo spot

    // Right croc (camo pattern)
    graphics.fillStyle(camoGreen, 1);
    graphics.fillRect(25, 37, 3, 2);    // Base
    graphics.fillStyle(camoBrown, 1);
    graphics.fillRect(27, 37, 1, 1);    // Camo spot
    graphics.fillStyle(camoTan, 1);
    graphics.fillRect(25, 38, 1, 1);    // Camo spot

    // Generate texture
    graphics.generateTexture('virginia_player', 48, 48);
    graphics.destroy();

    return 'virginia_player';
}

// Generate Virginia with alternative bandana (on head like a veil)
export function generateVirginiaWithHeadBandana(scene) {
    // Similar to above but bandana on head instead of neck
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    const skinTone = 0xf5cba7;
    const hairColor = 0x8b6f47;
    const hairHighlight = 0xa0826d;
    const glassFrames = 0x4a3428;
    const glassLenses = 0xe8f4f8;
    const bandanaColor = 0xf0f0f0;
    const shirtColor = 0xe8926f;     // Coral/peach shirt
    const shirtDark = 0xd17a58;
    const eyeGreen = 0x2e7d32;
    const shortsColor = 0x5a7fa6;    // Blue denim
    const shortsDark = 0x4a6b8a;
    const camoGreen = 0x6b7d5a;
    const camoBrown = 0x8b7d6b;
    const camoTan = 0xb5a89a;

    // === BANDANA ON HEAD (veil style) ===
    graphics.fillStyle(bandanaColor, 1);
    graphics.fillRect(19, 7, 10, 5);    // Covers top of head
    graphics.fillRect(18, 10, 2, 6);    // Left side drape
    graphics.fillRect(28, 10, 2, 6);    // Right side drape

    // Pattern
    graphics.fillStyle(0xe0e0e0, 1);
    graphics.fillRect(21, 8, 1, 1);
    graphics.fillRect(24, 9, 1, 1);
    graphics.fillRect(26, 8, 1, 1);

    // === HAIR (visible at sides/bottom) ===
    graphics.fillStyle(hairColor, 1);

    // POOFY bottom hair showing under bandana
    graphics.fillRect(17, 15, 5, 5);    // Left poof
    graphics.fillRect(16, 16, 2, 3);    // Extra left
    graphics.fillRect(26, 15, 5, 5);    // Right poof
    graphics.fillRect(30, 16, 2, 3);    // Extra right

    // Highlights
    graphics.fillStyle(hairHighlight, 1);
    graphics.fillRect(18, 17, 1, 1);
    graphics.fillRect(29, 17, 1, 1);

    // === HEAD (narrower face) ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(20, 12, 8, 9);    // Main face
    graphics.fillRect(21, 11, 6, 2);    // Upper face

    // Ears
    graphics.fillRect(19, 14, 1, 3);
    graphics.fillRect(28, 14, 1, 3);

    // === EYES (green, clearly visible!) ===
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(20, 15, 2, 2);
    graphics.fillRect(26, 15, 2, 2);

    graphics.fillStyle(eyeGreen, 1);
    graphics.fillRect(20, 16, 2, 1);    // Left pupil (wider)
    graphics.fillRect(26, 16, 2, 1);    // Right pupil (wider)

    // === GLASSES (very subtle - just thin outlines!) ===
    graphics.fillStyle(glassFrames, 1);

    // Left frame (just outline)
    graphics.fillRect(19, 14, 4, 1);    // Top edge
    graphics.fillRect(19, 17, 4, 1);    // Bottom edge
    graphics.fillRect(19, 14, 1, 4);    // Left edge
    graphics.fillRect(22, 14, 1, 4);    // Right edge

    // Right frame (just outline)
    graphics.fillRect(25, 14, 4, 1);    // Top edge
    graphics.fillRect(25, 17, 4, 1);    // Bottom edge
    graphics.fillRect(25, 14, 1, 4);    // Left edge
    graphics.fillRect(28, 14, 1, 4);    // Right edge

    // Bridge
    graphics.fillRect(23, 15, 2, 1);

    // === SMILE ===
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(22, 19, 1, 1);
    graphics.fillRect(23, 20, 2, 1);
    graphics.fillRect(25, 19, 1, 1);

    // === BODY (coral shirt) ===
    graphics.fillStyle(shirtColor, 1);
    graphics.fillRect(20, 23, 8, 7);

    graphics.fillStyle(shirtDark, 1);
    graphics.fillRect(21, 24, 2, 1);
    graphics.fillRect(25, 24, 2, 1);
    graphics.fillRect(23, 25, 2, 4);

    // Arms
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(18, 24, 2, 6);
    graphics.fillRect(28, 24, 2, 6);
    graphics.fillRect(18, 29, 2, 2);
    graphics.fillRect(28, 29, 2, 2);

    // Shorts (blue denim)
    graphics.fillStyle(shortsColor, 1);
    graphics.fillRect(20, 30, 8, 4);

    graphics.fillStyle(shortsDark, 1);
    graphics.fillRect(23, 30, 2, 4);
    graphics.fillRect(20, 33, 8, 1);

    // Legs
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(21, 34, 2, 3);
    graphics.fillRect(25, 34, 2, 3);

    // Camo crocs
    graphics.fillStyle(camoGreen, 1);
    graphics.fillRect(20, 37, 3, 2);
    graphics.fillStyle(camoBrown, 1);
    graphics.fillRect(20, 37, 1, 1);
    graphics.fillStyle(camoTan, 1);
    graphics.fillRect(22, 38, 1, 1);

    graphics.fillStyle(camoGreen, 1);
    graphics.fillRect(25, 37, 3, 2);
    graphics.fillStyle(camoBrown, 1);
    graphics.fillRect(27, 37, 1, 1);
    graphics.fillStyle(camoTan, 1);
    graphics.fillRect(25, 38, 1, 1);

    graphics.generateTexture('virginia_player_headband', 48, 48);
    graphics.destroy();

    return 'virginia_player_headband';
}
