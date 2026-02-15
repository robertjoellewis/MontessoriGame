// Generate Robert's sprite (Virginia's boyfriend)
// Based on reference photos: brown hair, fair skin, plaid shirt, friendly smile

export function generateRobertSprite(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Colors based on reference photos
    const skinTone = 0xf4d5b5;       // Fair skin tone
    const hairColor = 0x6b4423;      // Medium brown hair
    const shirtLight = 0x6b8ca3;     // Blue-gray plaid (light)
    const shirtDark = 0x4a657a;      // Blue-gray plaid (dark)
    const pantsColor = 0x3d3d3d;     // Dark gray/black pants
    const eyeColor = 0x4a3428;       // Dark brown eyes

    // === HEAD ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(19, 8, 10, 11);   // Main face
    graphics.fillRect(18, 10, 12, 7);   // Wider middle
    graphics.fillRect(20, 7, 8, 2);     // Top of head

    // Ears
    graphics.fillRect(17, 12, 2, 3);    // Left ear
    graphics.fillRect(29, 12, 2, 3);    // Right ear

    // === HAIR (short, styled upward) ===
    graphics.fillStyle(hairColor, 1);
    graphics.fillRect(18, 6, 12, 4);    // Top of head (styled up)
    graphics.fillRect(17, 8, 2, 5);     // Left side
    graphics.fillRect(29, 8, 2, 5);     // Right side
    graphics.fillRect(19, 7, 10, 2);    // Front hair

    // === EYES ===
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(20, 13, 2, 2);    // Left eye white
    graphics.fillRect(26, 13, 2, 2);    // Right eye white

    graphics.fillStyle(eyeColor, 1);
    graphics.fillRect(21, 14, 1, 1);    // Left pupil
    graphics.fillRect(27, 14, 1, 1);    // Right pupil

    // === FRIENDLY SMILE ===
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(21, 17, 6, 1);    // Smile line
    graphics.fillRect(20, 17, 1, 1);    // Left corner
    graphics.fillRect(27, 17, 1, 1);    // Right corner

    // === NECK ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(21, 19, 6, 3);

    // === BODY (plaid shirt) ===
    // Base shirt color
    graphics.fillStyle(shirtLight, 1);
    graphics.fillRect(17, 22, 14, 10);  // Main torso

    // Plaid pattern (checkered)
    graphics.fillStyle(shirtDark, 1);
    // Vertical stripes
    graphics.fillRect(19, 22, 2, 10);
    graphics.fillRect(23, 22, 2, 10);
    graphics.fillRect(27, 22, 2, 10);
    // Horizontal stripes
    graphics.fillRect(17, 24, 14, 2);
    graphics.fillRect(17, 28, 14, 2);

    // === ARMS ===
    graphics.fillStyle(shirtLight, 1);
    graphics.fillRect(15, 23, 3, 9);    // Left arm (shirt sleeve)
    graphics.fillRect(30, 23, 3, 9);    // Right arm (shirt sleeve)

    // Hands
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(15, 31, 3, 2);    // Left hand
    graphics.fillRect(30, 31, 3, 2);    // Right hand

    // === PANTS ===
    graphics.fillStyle(pantsColor, 1);
    graphics.fillRect(20, 32, 4, 6);    // Left leg
    graphics.fillRect(24, 32, 4, 6);    // Right leg

    // === SHOES ===
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(20, 37, 4, 2);    // Left shoe
    graphics.fillRect(24, 37, 4, 2);    // Right shoe

    graphics.generateTexture('robert_boyfriend', 48, 48);
    graphics.destroy();

    return 'robert_boyfriend';
}

// VERSION 1: Current improved version (detailed, refined)
export function generateRobertAtDesk(scene) {
    return generateRobertAtDeskV1(scene);
}

// Generate Robert sitting at desk facing LEFT - V1 (Current/Refined)
export function generateRobertAtDeskV1(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Enhanced color palette for more attractive rendering
    const skinTone = 0xf4d5b5;          // Fair skin base
    const skinShadow = 0xe3c4a4;        // Skin shadow for definition
    const skinHighlight = 0xffeedd;     // Skin highlight
    const hairColor = 0x6b4423;         // Medium brown
    const hairHighlight = 0x8b6443;     // Brown highlight for depth
    const shirtLight = 0x6b8ca3;        // Blue-gray plaid (light)
    const shirtDark = 0x4a657a;         // Blue-gray plaid (dark)
    const shirtAccent = 0x8fadc0;       // Lighter accent for plaid
    const eyeColor = 0x4a3428;          // Dark brown eyes
    const eyeShine = 0xffffff;          // Eye shine
    const laptopColor = 0x2c2c2c;
    const deskColor = 0x8b6f47;

    // === ROBERT (upper body, facing LEFT with attractive features) ===

    // === HEAD (better proportions and defined jawline) ===
    graphics.fillStyle(skinTone, 1);
    // Better head shape with more defined structure
    graphics.fillRect(22, 10, 9, 9);    // Main face area
    graphics.fillRect(23, 9, 7, 2);     // Forehead
    graphics.fillRect(24, 8, 5, 1);     // Top of forehead

    // Defined jawline (stronger, more attractive)
    graphics.fillRect(22, 17, 7, 2);    // Jaw base
    graphics.fillRect(23, 19, 5, 1);    // Chin definition

    // Jawline shadow for definition
    graphics.fillStyle(skinShadow, 1);
    graphics.fillRect(22, 18, 1, 1);    // Jaw shadow
    graphics.fillRect(28, 18, 1, 1);    // Jaw shadow right

    // Cheekbone highlight
    graphics.fillStyle(skinHighlight, 1);
    graphics.fillRect(24, 13, 2, 1);    // Cheekbone

    // Ear (well-placed for side profile)
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(29, 13, 2, 4);    // Ear
    graphics.fillStyle(skinShadow, 1);
    graphics.fillRect(30, 14, 1, 2);    // Ear inner detail

    // === HAIR (messy but styled upward - attractive) ===
    graphics.fillStyle(hairColor, 1);
    // Messy, textured hair styled upward
    graphics.fillRect(22, 6, 8, 3);     // Top volume (styled up)
    graphics.fillRect(21, 7, 2, 5);     // Back of head
    graphics.fillRect(23, 5, 6, 2);     // Hair peak (messy top)
    graphics.fillRect(20, 8, 3, 4);     // Side/back extension
    graphics.fillRect(24, 9, 6, 2);     // Front hair coverage

    // Hair highlights for texture and depth
    graphics.fillStyle(hairHighlight, 1);
    graphics.fillRect(24, 6, 2, 1);     // Top highlight
    graphics.fillRect(26, 7, 2, 1);     // Side highlight
    graphics.fillRect(23, 8, 1, 1);     // Texture detail

    // === EYE (detailed, attractive) ===
    // Eye white with better shape
    graphics.fillStyle(eyeShine, 1);
    graphics.fillRect(24, 13, 3, 2);    // Eye white (larger, better shaped)

    // Iris and pupil
    graphics.fillStyle(eyeColor, 1);
    graphics.fillRect(25, 13, 2, 2);    // Iris
    graphics.fillRect(26, 14, 1, 1);    // Pupil

    // Eye shine for life and warmth
    graphics.fillStyle(eyeShine, 1);
    graphics.fillRect(25, 13, 1, 1);    // Eye shine dot

    // Eye detail (eyelid/lash)
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(24, 13, 3, 1);    // Upper eyelid line

    // === NOSE (defined profile) ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(22, 14, 2, 3);    // Nose bridge
    graphics.fillRect(21, 16, 2, 2);    // Nose tip (prominent)

    // Nose shadow for definition
    graphics.fillStyle(skinShadow, 1);
    graphics.fillRect(22, 16, 1, 1);    // Nose shadow

    // === SMILE (warm, friendly with visible teeth) ===
    // Mouth shape
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(22, 18, 4, 1);    // Smile line
    graphics.fillRect(21, 18, 1, 1);    // Smile corner

    // Visible teeth for friendly smile
    graphics.fillStyle(eyeShine, 1);
    graphics.fillRect(23, 18, 2, 1);    // Teeth showing

    // Lip definition
    graphics.fillStyle(skinShadow, 1);
    graphics.fillRect(23, 19, 2, 1);    // Lower lip shadow

    // === NECK (proper proportion) ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(24, 20, 5, 3);    // Neck

    // Neck shadow for definition
    graphics.fillStyle(skinShadow, 1);
    graphics.fillRect(24, 22, 1, 1);    // Neck shadow

    // === BODY (refined plaid shirt) ===
    // Shirt base with better structure
    graphics.fillStyle(shirtLight, 1);
    graphics.fillRect(18, 23, 15, 12);  // Torso

    // Refined plaid pattern (more detailed)
    graphics.fillStyle(shirtDark, 1);
    // Vertical stripes
    graphics.fillRect(19, 23, 2, 12);
    graphics.fillRect(24, 23, 2, 12);
    graphics.fillRect(29, 23, 2, 12);
    // Horizontal stripes
    graphics.fillRect(18, 25, 15, 2);
    graphics.fillRect(18, 29, 15, 2);
    graphics.fillRect(18, 33, 15, 2);

    // Plaid accent/highlights for depth
    graphics.fillStyle(shirtAccent, 1);
    graphics.fillRect(20, 24, 1, 1);    // Plaid intersection highlight
    graphics.fillRect(25, 28, 1, 1);
    graphics.fillRect(30, 32, 1, 1);
    graphics.fillRect(21, 30, 1, 1);

    // Collar detail
    graphics.fillStyle(shirtLight, 1);
    graphics.fillRect(24, 23, 5, 1);    // Collar line
    graphics.fillStyle(shirtDark, 1);
    graphics.fillRect(25, 23, 1, 2);    // Collar fold

    // === ARMS (reaching toward laptop on LEFT) ===
    graphics.fillStyle(shirtLight, 1);
    graphics.fillRect(12, 26, 7, 4);    // Left arm extended
    graphics.fillRect(27, 28, 6, 4);    // Right arm

    // Arm plaid pattern
    graphics.fillStyle(shirtDark, 1);
    graphics.fillRect(13, 26, 2, 4);    // Left arm stripe
    graphics.fillRect(16, 27, 1, 2);    // Left arm horizontal
    graphics.fillRect(28, 28, 2, 4);    // Right arm stripe

    // === HANDS (detailed) ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(10, 29, 3, 3);    // Left hand
    graphics.fillRect(27, 31, 3, 2);    // Right hand

    // Hand shadows for depth
    graphics.fillStyle(skinShadow, 1);
    graphics.fillRect(10, 31, 1, 1);    // Left hand shadow
    graphics.fillRect(27, 32, 1, 1);    // Right hand shadow

    // === DESK ===
    graphics.fillStyle(deskColor, 1);
    graphics.fillRect(4, 35, 40, 4);    // Desk surface

    // Desk wood grain detail
    graphics.fillStyle(0x9b7f57, 1);
    graphics.fillRect(6, 36, 36, 1);    // Wood grain highlight

    // === LAPTOP (positioned on LEFT side) ===
    graphics.fillStyle(laptopColor, 1);
    graphics.fillRect(8, 28, 10, 10);   // Laptop screen (angled)
    graphics.fillRect(6, 34, 14, 3);    // Laptop keyboard

    // Screen glow
    graphics.fillStyle(0x87ceeb, 0.5);
    graphics.fillRect(9, 29, 8, 8);

    // Screen reflection/detail
    graphics.fillStyle(0xa0d8ef, 0.3);
    graphics.fillRect(10, 30, 6, 3);

    // Keyboard keys detail
    graphics.fillStyle(0x1a1a1a, 1);
    graphics.fillRect(7, 35, 2, 1);
    graphics.fillRect(10, 35, 2, 1);
    graphics.fillRect(13, 35, 2, 1);
    graphics.fillRect(16, 35, 2, 1);

    graphics.generateTexture('robert_at_desk_v1', 48, 48);
    graphics.destroy();

    return 'robert_at_desk_v1';
}

// VERSION 2: Softer, rounder features (friendly/approachable)
export function generateRobertAtDeskV2(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    const skinTone = 0xf4d5b5;
    const skinShadow = 0xe8cab0;        // Softer shadow
    const hairColor = 0x7a5436;         // Lighter, warmer brown
    const shirtLight = 0x7a9fb3;        // Lighter blue
    const shirtDark = 0x5a7f93;
    const eyeColor = 0x5d4a3a;
    const laptopColor = 0x2c2c2c;
    const deskColor = 0x8b6f47;

    // === ROUNDER HEAD ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(21, 9, 10, 10);   // Wider, rounder face
    graphics.fillRect(22, 8, 8, 2);     // Rounded top
    graphics.fillRect(20, 11, 12, 6);   // Full cheeks

    // Softer jawline
    graphics.fillRect(22, 17, 8, 2);
    graphics.fillRect(23, 19, 6, 2);    // Rounded chin

    // Ear
    graphics.fillRect(30, 13, 2, 3);

    // === SOFTER HAIR (less angular) ===
    graphics.fillStyle(hairColor, 1);
    graphics.fillRect(21, 6, 10, 3);    // Rounded top
    graphics.fillRect(20, 8, 4, 4);     // Side
    graphics.fillRect(23, 5, 6, 2);     // Soft peak
    graphics.fillRect(24, 9, 7, 2);     // Front

    // === LARGER, FRIENDLIER EYES ===
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(23, 12, 4, 3);    // Larger eye white

    graphics.fillStyle(eyeColor, 1);
    graphics.fillRect(24, 13, 3, 2);    // Larger iris
    graphics.fillRect(25, 14, 1, 1);    // Pupil

    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(24, 13, 1, 1);    // Eye shine

    // === SMALLER, ROUNDER NOSE ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(22, 15, 2, 2);    // Smaller nose
    graphics.fillRect(21, 16, 2, 1);    // Rounded tip

    // === WIDER SMILE ===
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(21, 18, 6, 1);    // Wide smile
    graphics.fillRect(20, 18, 1, 1);    // Corner
    graphics.fillRect(27, 18, 1, 1);    // Corner

    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(22, 18, 4, 1);    // Visible teeth

    // === NECK ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(24, 20, 5, 3);

    // === BODY (simpler plaid) ===
    graphics.fillStyle(shirtLight, 1);
    graphics.fillRect(18, 23, 15, 12);

    graphics.fillStyle(shirtDark, 1);
    graphics.fillRect(20, 23, 2, 12);
    graphics.fillRect(25, 23, 2, 12);
    graphics.fillRect(18, 26, 15, 2);
    graphics.fillRect(18, 30, 15, 2);

    // === ARMS ===
    graphics.fillStyle(shirtLight, 1);
    graphics.fillRect(12, 26, 7, 4);
    graphics.fillRect(27, 28, 6, 4);

    graphics.fillStyle(shirtDark, 1);
    graphics.fillRect(13, 26, 2, 4);
    graphics.fillRect(28, 28, 2, 4);

    // === HANDS ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(10, 29, 3, 3);
    graphics.fillRect(27, 31, 3, 2);

    // === DESK ===
    graphics.fillStyle(deskColor, 1);
    graphics.fillRect(4, 35, 40, 4);
    graphics.fillStyle(0x9b7f57, 1);
    graphics.fillRect(6, 36, 36, 1);

    // === LAPTOP ===
    graphics.fillStyle(laptopColor, 1);
    graphics.fillRect(8, 28, 10, 10);
    graphics.fillRect(6, 34, 14, 3);

    graphics.fillStyle(0x87ceeb, 0.5);
    graphics.fillRect(9, 29, 8, 8);

    graphics.fillStyle(0x1a1a1a, 1);
    graphics.fillRect(7, 35, 2, 1);
    graphics.fillRect(10, 35, 2, 1);
    graphics.fillRect(13, 35, 2, 1);
    graphics.fillRect(16, 35, 2, 1);

    graphics.generateTexture('robert_at_desk_v2', 48, 48);
    graphics.destroy();

    return 'robert_at_desk_v2';
}

// VERSION 3: Angular, defined features (professional/sharp)
export function generateRobertAtDeskV3(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    const skinTone = 0xf4d5b5;
    const skinShadow = 0xd4b595;        // Stronger shadows
    const hairColor = 0x5a3620;         // Darker brown
    const hairHighlight = 0x7a5640;
    const shirtLight = 0x5a7a8a;        // Darker, more professional
    const shirtDark = 0x3a4a5a;
    const eyeColor = 0x3a2818;
    const laptopColor = 0x2c2c2c;
    const deskColor = 0x8b6f47;

    // === ANGULAR HEAD ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(23, 9, 8, 9);     // Narrower face
    graphics.fillRect(24, 8, 6, 1);     // Angular top

    // Strong, defined jawline
    graphics.fillRect(22, 16, 8, 2);
    graphics.fillRect(23, 18, 6, 1);    // Sharp chin

    // Strong shadows for definition
    graphics.fillStyle(skinShadow, 1);
    graphics.fillRect(22, 17, 1, 1);
    graphics.fillRect(29, 17, 1, 1);
    graphics.fillRect(23, 16, 1, 2);    // Cheek shadow

    // Ear
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(30, 13, 2, 4);

    // === SLEEK HAIR (professional) ===
    graphics.fillStyle(hairColor, 1);
    graphics.fillRect(22, 5, 9, 4);     // Sleek top
    graphics.fillRect(21, 7, 2, 5);     // Side
    graphics.fillRect(23, 4, 6, 2);     // Sharp peak
    graphics.fillRect(24, 9, 7, 2);     // Front

    // Sharp highlights
    graphics.fillStyle(hairHighlight, 1);
    graphics.fillRect(25, 5, 3, 1);
    graphics.fillRect(26, 6, 2, 1);

    // === FOCUSED EYES ===
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(24, 13, 3, 2);    // Eye white

    graphics.fillStyle(eyeColor, 1);
    graphics.fillRect(25, 13, 2, 2);    // Dark iris
    graphics.fillRect(26, 14, 1, 1);    // Pupil

    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(25, 13, 1, 1);    // Shine

    // Strong eyebrow
    graphics.fillStyle(hairColor, 1);
    graphics.fillRect(24, 12, 3, 1);

    // === DEFINED NOSE ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(22, 14, 2, 4);    // Strong nose bridge
    graphics.fillRect(21, 17, 2, 2);    // Prominent tip

    graphics.fillStyle(skinShadow, 1);
    graphics.fillRect(22, 17, 1, 1);    // Nose shadow

    // === SUBTLE SMILE ===
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(22, 18, 4, 1);
    graphics.fillRect(21, 18, 1, 1);

    // === NECK ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(24, 19, 5, 4);    // Longer neck

    graphics.fillStyle(skinShadow, 1);
    graphics.fillRect(24, 22, 1, 1);

    // === BODY (professional shirt) ===
    graphics.fillStyle(shirtLight, 1);
    graphics.fillRect(18, 23, 15, 12);

    graphics.fillStyle(shirtDark, 1);
    // Refined plaid
    graphics.fillRect(19, 23, 1, 12);
    graphics.fillRect(22, 23, 1, 12);
    graphics.fillRect(25, 23, 1, 12);
    graphics.fillRect(28, 23, 1, 12);
    graphics.fillRect(31, 23, 1, 12);
    graphics.fillRect(18, 25, 15, 1);
    graphics.fillRect(18, 28, 15, 1);
    graphics.fillRect(18, 31, 15, 1);
    graphics.fillRect(18, 34, 15, 1);

    // === ARMS ===
    graphics.fillStyle(shirtLight, 1);
    graphics.fillRect(12, 26, 7, 4);
    graphics.fillRect(27, 28, 6, 4);

    graphics.fillStyle(shirtDark, 1);
    graphics.fillRect(13, 26, 1, 4);
    graphics.fillRect(15, 27, 1, 2);
    graphics.fillRect(28, 28, 1, 4);

    // === HANDS ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(10, 29, 3, 3);
    graphics.fillRect(27, 31, 3, 2);

    // === DESK ===
    graphics.fillStyle(deskColor, 1);
    graphics.fillRect(4, 35, 40, 4);
    graphics.fillStyle(0x9b7f57, 1);
    graphics.fillRect(6, 36, 36, 1);

    // === LAPTOP ===
    graphics.fillStyle(laptopColor, 1);
    graphics.fillRect(8, 28, 10, 10);
    graphics.fillRect(6, 34, 14, 3);

    graphics.fillStyle(0x87ceeb, 0.5);
    graphics.fillRect(9, 29, 8, 8);

    graphics.fillStyle(0x1a1a1a, 1);
    graphics.fillRect(7, 35, 2, 1);
    graphics.fillRect(10, 35, 2, 1);
    graphics.fillRect(13, 35, 2, 1);
    graphics.fillRect(16, 35, 2, 1);

    graphics.generateTexture('robert_at_desk_v3', 48, 48);
    graphics.destroy();

    return 'robert_at_desk_v3';
}

// VERSION 4: Simpler pixel art style (clean/retro)
export function generateRobertAtDeskV4(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    const skinTone = 0xf4d5b5;
    const hairColor = 0x6b4423;
    const shirtBlue = 0x6b8ca3;
    const shirtDark = 0x4a657a;
    const eyeColor = 0x000000;
    const laptopColor = 0x2c2c2c;
    const deskColor = 0x8b6f47;

    // === SIMPLE HEAD (minimal detail) ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(22, 9, 9, 10);    // Simple oval head
    graphics.fillRect(23, 8, 7, 1);     // Top

    // Ear
    graphics.fillRect(30, 13, 2, 3);

    // === SIMPLE HAIR (blocky) ===
    graphics.fillStyle(hairColor, 1);
    graphics.fillRect(22, 6, 9, 3);     // Top block
    graphics.fillRect(21, 8, 3, 4);     // Side block
    graphics.fillRect(23, 5, 6, 1);     // Peak
    graphics.fillRect(24, 9, 7, 1);     // Front

    // === SIMPLE EYES ===
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(24, 13, 2, 2);    // Eye white

    graphics.fillStyle(eyeColor, 1);
    graphics.fillRect(25, 14, 1, 1);    // Pupil

    // === SIMPLE NOSE ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(22, 15, 1, 2);    // Simple line nose

    // === SIMPLE SMILE ===
    graphics.fillStyle(eyeColor, 1);
    graphics.fillRect(22, 17, 4, 1);    // Smile line

    // === NECK ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(24, 19, 5, 4);

    // === BODY (simple plaid) ===
    graphics.fillStyle(shirtBlue, 1);
    graphics.fillRect(18, 23, 15, 12);

    // Simple plaid (fewer lines)
    graphics.fillStyle(shirtDark, 1);
    graphics.fillRect(21, 23, 2, 12);   // Vertical
    graphics.fillRect(27, 23, 2, 12);   // Vertical
    graphics.fillRect(18, 26, 15, 2);   // Horizontal
    graphics.fillRect(18, 31, 15, 2);   // Horizontal

    // === ARMS ===
    graphics.fillStyle(shirtBlue, 1);
    graphics.fillRect(12, 27, 7, 4);
    graphics.fillRect(27, 29, 6, 3);

    // === HANDS ===
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(10, 30, 3, 2);
    graphics.fillRect(27, 31, 3, 2);

    // === DESK ===
    graphics.fillStyle(deskColor, 1);
    graphics.fillRect(4, 35, 40, 4);

    // === LAPTOP (simple) ===
    graphics.fillStyle(laptopColor, 1);
    graphics.fillRect(8, 29, 9, 9);     // Screen
    graphics.fillRect(6, 34, 13, 3);    // Keyboard

    graphics.fillStyle(0x87ceeb, 1);
    graphics.fillRect(9, 30, 7, 7);     // Screen glow (solid)

    graphics.fillStyle(0x1a1a1a, 1);
    graphics.fillRect(7, 35, 11, 1);    // Simple keyboard

    graphics.generateTexture('robert_at_desk_v4', 48, 48);
    graphics.destroy();

    return 'robert_at_desk_v4';
}

// VERSION 5: Most detailed/refined (premium quality)
export function generateRobertAtDeskV5(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    const skinBase = 0xf4d5b5;
    const skinLight = 0xffeedd;
    const skinMid = 0xf0cab0;
    const skinDark = 0xe0b595;
    const skinShadow = 0xd0a585;
    const hairDark = 0x5a3620;
    const hairMid = 0x6b4423;
    const hairLight = 0x8b6443;
    const hairHighlight = 0xab8463;
    const shirtLight = 0x8fadc0;
    const shirtMid = 0x6b8ca3;
    const shirtDark = 0x4a657a;
    const shirtDarker = 0x3a4a5a;
    const eyeWhite = 0xffffff;
    const eyeBrown = 0x4a3428;
    const eyeDark = 0x2a1818;
    const laptopColor = 0x2c2c2c;
    const deskColor = 0x8b6f47;

    // === DETAILED HEAD (multi-tone shading) ===
    graphics.fillStyle(skinBase, 1);
    graphics.fillRect(22, 10, 9, 9);
    graphics.fillRect(23, 9, 7, 2);
    graphics.fillRect(24, 8, 5, 1);

    // Forehead highlight
    graphics.fillStyle(skinLight, 1);
    graphics.fillRect(24, 9, 4, 1);

    // Cheek structure
    graphics.fillStyle(skinMid, 1);
    graphics.fillRect(22, 14, 2, 3);
    graphics.fillRect(27, 14, 3, 2);

    // Jawline (multi-tone)
    graphics.fillStyle(skinBase, 1);
    graphics.fillRect(22, 17, 7, 2);
    graphics.fillRect(23, 19, 5, 1);

    graphics.fillStyle(skinDark, 1);
    graphics.fillRect(22, 18, 1, 1);
    graphics.fillRect(28, 18, 1, 1);

    graphics.fillStyle(skinShadow, 1);
    graphics.fillRect(23, 18, 1, 1);

    // Cheekbone highlight
    graphics.fillStyle(skinLight, 1);
    graphics.fillRect(24, 13, 2, 1);
    graphics.fillRect(25, 14, 1, 1);

    // Detailed ear
    graphics.fillStyle(skinBase, 1);
    graphics.fillRect(29, 13, 2, 4);
    graphics.fillStyle(skinMid, 1);
    graphics.fillRect(30, 14, 1, 2);
    graphics.fillStyle(skinDark, 1);
    graphics.fillRect(30, 15, 1, 1);

    // === DETAILED HAIR (layered, textured) ===
    graphics.fillStyle(hairDark, 1);
    graphics.fillRect(22, 6, 8, 3);
    graphics.fillRect(21, 7, 2, 5);
    graphics.fillRect(20, 8, 3, 4);

    graphics.fillStyle(hairMid, 1);
    graphics.fillRect(23, 5, 6, 2);
    graphics.fillRect(24, 7, 5, 2);
    graphics.fillRect(24, 9, 6, 2);

    graphics.fillStyle(hairLight, 1);
    graphics.fillRect(24, 6, 3, 1);
    graphics.fillRect(25, 7, 3, 1);
    graphics.fillRect(26, 8, 2, 1);

    graphics.fillStyle(hairHighlight, 1);
    graphics.fillRect(25, 6, 2, 1);
    graphics.fillRect(26, 7, 1, 1);

    // === DETAILED EYE ===
    graphics.fillStyle(eyeWhite, 1);
    graphics.fillRect(24, 13, 3, 2);

    // Layered iris
    graphics.fillStyle(eyeBrown, 1);
    graphics.fillRect(25, 13, 2, 2);

    graphics.fillStyle(eyeDark, 1);
    graphics.fillRect(26, 14, 1, 1);

    // Multiple eye shines
    graphics.fillStyle(eyeWhite, 1);
    graphics.fillRect(25, 13, 1, 1);
    graphics.fillRect(26, 13, 1, 1);

    // Upper eyelid with shadow
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(24, 13, 3, 1);
    graphics.fillStyle(skinDark, 1);
    graphics.fillRect(24, 12, 3, 1);

    // Eyebrow (detailed)
    graphics.fillStyle(hairMid, 1);
    graphics.fillRect(24, 11, 3, 1);
    graphics.fillStyle(hairDark, 1);
    graphics.fillRect(25, 11, 2, 1);

    // === DETAILED NOSE ===
    graphics.fillStyle(skinBase, 1);
    graphics.fillRect(22, 14, 2, 3);
    graphics.fillRect(21, 16, 2, 2);

    graphics.fillStyle(skinMid, 1);
    graphics.fillRect(22, 15, 1, 2);

    graphics.fillStyle(skinDark, 1);
    graphics.fillRect(22, 16, 1, 1);
    graphics.fillRect(21, 17, 1, 1);

    // === DETAILED SMILE ===
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(22, 18, 4, 1);
    graphics.fillRect(21, 18, 1, 1);

    graphics.fillStyle(eyeWhite, 1);
    graphics.fillRect(23, 18, 2, 1);

    // Lip detail
    graphics.fillStyle(skinMid, 1);
    graphics.fillRect(22, 17, 4, 1);
    graphics.fillStyle(skinDark, 1);
    graphics.fillRect(23, 19, 2, 1);

    // === NECK (multi-tone) ===
    graphics.fillStyle(skinBase, 1);
    graphics.fillRect(24, 20, 5, 3);

    graphics.fillStyle(skinMid, 1);
    graphics.fillRect(24, 21, 1, 2);

    graphics.fillStyle(skinDark, 1);
    graphics.fillRect(24, 22, 1, 1);

    // === DETAILED PLAID SHIRT ===
    graphics.fillStyle(shirtMid, 1);
    graphics.fillRect(18, 23, 15, 12);

    // Complex plaid pattern
    graphics.fillStyle(shirtDark, 1);
    graphics.fillRect(19, 23, 2, 12);
    graphics.fillRect(24, 23, 2, 12);
    graphics.fillRect(29, 23, 2, 12);
    graphics.fillRect(18, 25, 15, 2);
    graphics.fillRect(18, 29, 15, 2);
    graphics.fillRect(18, 33, 15, 2);

    graphics.fillStyle(shirtDarker, 1);
    graphics.fillRect(19, 25, 2, 2);
    graphics.fillRect(24, 25, 2, 2);
    graphics.fillRect(29, 25, 2, 2);
    graphics.fillRect(19, 29, 2, 2);
    graphics.fillRect(24, 29, 2, 2);
    graphics.fillRect(29, 29, 2, 2);
    graphics.fillRect(19, 33, 2, 2);
    graphics.fillRect(24, 33, 2, 2);
    graphics.fillRect(29, 33, 2, 2);

    graphics.fillStyle(shirtLight, 1);
    graphics.fillRect(20, 24, 1, 1);
    graphics.fillRect(22, 26, 1, 1);
    graphics.fillRect(25, 28, 1, 1);
    graphics.fillRect(27, 30, 1, 1);
    graphics.fillRect(30, 32, 1, 1);

    // Detailed collar
    graphics.fillStyle(shirtMid, 1);
    graphics.fillRect(24, 23, 5, 1);
    graphics.fillStyle(shirtDark, 1);
    graphics.fillRect(25, 23, 1, 2);
    graphics.fillRect(27, 23, 1, 1);

    // === ARMS ===
    graphics.fillStyle(shirtMid, 1);
    graphics.fillRect(12, 26, 7, 4);
    graphics.fillRect(27, 28, 6, 4);

    graphics.fillStyle(shirtDark, 1);
    graphics.fillRect(13, 26, 2, 4);
    graphics.fillRect(16, 27, 1, 2);
    graphics.fillRect(28, 28, 2, 4);

    // === DETAILED HANDS ===
    graphics.fillStyle(skinBase, 1);
    graphics.fillRect(10, 29, 3, 3);
    graphics.fillRect(27, 31, 3, 2);

    graphics.fillStyle(skinMid, 1);
    graphics.fillRect(10, 30, 1, 2);
    graphics.fillRect(27, 31, 1, 1);

    graphics.fillStyle(skinDark, 1);
    graphics.fillRect(10, 31, 1, 1);
    graphics.fillRect(27, 32, 1, 1);

    // === DESK ===
    graphics.fillStyle(deskColor, 1);
    graphics.fillRect(4, 35, 40, 4);

    graphics.fillStyle(0x9b7f57, 1);
    graphics.fillRect(6, 36, 36, 1);
    graphics.fillRect(5, 37, 2, 1);
    graphics.fillRect(10, 37, 2, 1);
    graphics.fillRect(20, 37, 2, 1);
    graphics.fillRect(30, 37, 2, 1);

    // === LAPTOP ===
    graphics.fillStyle(laptopColor, 1);
    graphics.fillRect(8, 28, 10, 10);
    graphics.fillRect(6, 34, 14, 3);

    graphics.fillStyle(0x87ceeb, 0.6);
    graphics.fillRect(9, 29, 8, 8);

    graphics.fillStyle(0xa0d8ef, 0.4);
    graphics.fillRect(10, 30, 6, 3);

    graphics.fillStyle(0xc0e8ff, 0.2);
    graphics.fillRect(11, 31, 4, 2);

    graphics.fillStyle(0x1a1a1a, 1);
    graphics.fillRect(7, 35, 2, 1);
    graphics.fillRect(10, 35, 2, 1);
    graphics.fillRect(13, 35, 2, 1);
    graphics.fillRect(16, 35, 2, 1);
    graphics.fillRect(8, 36, 1, 1);
    graphics.fillRect(11, 36, 1, 1);
    graphics.fillRect(14, 36, 1, 1);
    graphics.fillRect(17, 36, 1, 1);

    graphics.generateTexture('robert_at_desk_v5', 48, 48);
    graphics.destroy();

    return 'robert_at_desk_v5';
}

// Generate Robert facing side view (for interactions)
export function generateRobertSide(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    const skinTone = 0xf4d5b5;
    const hairColor = 0x6b4423;
    const shirtLight = 0x6b8ca3;
    const shirtDark = 0x4a657a;

    // Side profile implementation
    // (Similar to above but standing)

    graphics.generateTexture('robert_side', 48, 48);
    graphics.destroy();

    return 'robert_side';
}
