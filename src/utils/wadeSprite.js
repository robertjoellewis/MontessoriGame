// Wade - Lead Guide / Virginia's supervisor
// Professional but warm Montessori guide
// Male adult, early 30s, calm demeanor

export function generateWadeSprite(scene) {
    const key = 'wade_idle_front';

    // Return existing texture if already generated
    if (scene.textures.exists(key)) {
        return key;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 48;
    canvas.height = 48;
    const ctx = canvas.getContext('2d');

    // Pixel art colors
    const SKIN = '#f5cfa0';
    const SKIN_SHADOW = '#d4a574';
    const HAIR = '#4a3428'; // Dark brown
    const BEARD = '#6b4e3d'; // Lighter brown beard
    const SHIRT = '#4a7c59'; // Professional green polo
    const SHIRT_DARK = '#3a5c44';
    const PANTS = '#5c4033'; // Khaki brown
    const PANTS_DARK = '#4a3020';
    const SHOES = '#2C1C0C';
    const OUTLINE = '#2C1C0C';
    const EYE_WHITE = '#ffffff';
    const EYE_PUPIL = '#3a2817';

    // Outline function
    function outline(x, y, w, h) {
        ctx.fillStyle = OUTLINE;
        ctx.fillRect(x - 1, y, w + 2, h);
        ctx.fillRect(x, y - 1, w, h + 2);
    }

    // === SHOES (bottom) ===
    ctx.fillStyle = SHOES;
    ctx.fillRect(15, 44, 6, 3);  // Left shoe
    ctx.fillRect(27, 44, 6, 3);  // Right shoe

    // === LEGS (khaki pants) ===
    outline(16, 32, 5, 12);
    ctx.fillStyle = PANTS;
    ctx.fillRect(16, 32, 5, 12);

    outline(27, 32, 5, 12);
    ctx.fillRect(27, 32, 5, 12);

    // Pants shadow/fold
    ctx.fillStyle = PANTS_DARK;
    ctx.fillRect(17, 36, 1, 6);
    ctx.fillRect(28, 36, 1, 6);

    // === TORSO (professional polo shirt) ===
    outline(14, 22, 20, 11);
    ctx.fillStyle = SHIRT;
    ctx.fillRect(14, 22, 20, 11);

    // Shirt collar (V-neck)
    ctx.fillStyle = SHIRT_DARK;
    ctx.fillRect(23, 22, 2, 3);

    // Shirt shadow/definition
    ctx.fillRect(14, 28, 2, 3);
    ctx.fillRect(32, 28, 2, 3);

    // === ARMS ===
    // Left arm
    outline(9, 24, 6, 10);
    ctx.fillStyle = SHIRT;
    ctx.fillRect(9, 24, 6, 10);

    // Hand (skin)
    ctx.fillStyle = SKIN;
    ctx.fillRect(10, 33, 4, 4);
    ctx.fillStyle = OUTLINE;
    ctx.fillRect(9, 33, 1, 4);
    ctx.fillRect(14, 33, 1, 4);

    // Right arm
    outline(33, 24, 6, 10);
    ctx.fillStyle = SHIRT;
    ctx.fillRect(33, 24, 6, 10);

    // Hand (skin)
    ctx.fillStyle = SKIN;
    ctx.fillRect(34, 33, 4, 4);
    ctx.fillStyle = OUTLINE;
    ctx.fillRect(33, 33, 1, 4);
    ctx.fillRect(38, 33, 1, 4);

    // === HEAD (rounded) ===
    outline(17, 8, 14, 14);
    ctx.fillStyle = SKIN;
    ctx.fillRect(17, 8, 14, 14);

    // Head rounding
    ctx.fillStyle = OUTLINE;
    ctx.fillRect(16, 8, 1, 1);
    ctx.fillRect(31, 8, 1, 1);

    // Skin shadow (jaw definition)
    ctx.fillStyle = SKIN_SHADOW;
    ctx.fillRect(18, 18, 12, 3);

    // === HAIR (short, professional) ===
    ctx.fillStyle = HAIR;
    // Top of head
    ctx.fillRect(17, 8, 14, 4);
    // Side hair
    ctx.fillRect(17, 12, 2, 4);
    ctx.fillRect(29, 12, 2, 4);

    // Hair texture
    ctx.fillStyle = OUTLINE;
    ctx.fillRect(19, 9, 1, 1);
    ctx.fillRect(22, 9, 1, 1);
    ctx.fillRect(25, 9, 1, 1);
    ctx.fillRect(28, 9, 1, 1);

    // === BEARD (short, trimmed) ===
    ctx.fillStyle = BEARD;
    // Beard along jawline
    ctx.fillRect(18, 19, 3, 2);  // Left
    ctx.fillRect(27, 19, 3, 2);  // Right
    ctx.fillRect(21, 20, 6, 1);  // Bottom

    // === EYES (calm, professional) ===
    // Eye whites
    ctx.fillStyle = EYE_WHITE;
    ctx.fillRect(20, 14, 3, 2);  // Left eye
    ctx.fillRect(25, 14, 3, 2);  // Right eye

    // Pupils
    ctx.fillStyle = EYE_PUPIL;
    ctx.fillRect(21, 14, 1, 2);  // Left pupil
    ctx.fillRect(26, 14, 1, 2);  // Right pupil

    // === EYEBROWS (defined) ===
    ctx.fillStyle = HAIR;
    ctx.fillRect(20, 12, 3, 1);  // Left eyebrow
    ctx.fillRect(25, 12, 3, 1);  // Right eyebrow

    // === MOUTH (slight professional smile) ===
    ctx.fillStyle = OUTLINE;
    ctx.fillRect(22, 17, 4, 1);  // Mouth line

    // Slight smile curve
    ctx.fillRect(21, 16, 1, 1);
    ctx.fillRect(26, 16, 1, 1);

    // Add texture to Phaser
    scene.textures.addCanvas(key, canvas);
    return key;
}

export function generateWadeSideSprite(scene) {
    const key = 'wade_idle_side';

    if (scene.textures.exists(key)) {
        return key;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 48;
    canvas.height = 48;
    const ctx = canvas.getContext('2d');

    const SKIN = '#f5cfa0';
    const SKIN_SHADOW = '#d4a574';
    const HAIR = '#4a3428';
    const BEARD = '#6b4e3d';
    const SHIRT = '#4a7c59';
    const SHIRT_DARK = '#3a5c44';
    const PANTS = '#5c4033';
    const PANTS_DARK = '#4a3020';
    const SHOES = '#2C1C0C';
    const OUTLINE = '#2C1C0C';
    const EYE_WHITE = '#ffffff';
    const EYE_PUPIL = '#3a2817';

    function outline(x, y, w, h) {
        ctx.fillStyle = OUTLINE;
        ctx.fillRect(x - 1, y, w + 2, h);
        ctx.fillRect(x, y - 1, w, h + 2);
    }

    // === SHOES ===
    ctx.fillStyle = SHOES;
    ctx.fillRect(20, 44, 7, 3);  // Visible shoe (side profile)

    // === LEGS ===
    outline(20, 32, 7, 12);
    ctx.fillStyle = PANTS;
    ctx.fillRect(20, 32, 7, 12);

    ctx.fillStyle = PANTS_DARK;
    ctx.fillRect(21, 36, 1, 6);

    // === TORSO ===
    outline(16, 22, 14, 11);
    ctx.fillStyle = SHIRT;
    ctx.fillRect(16, 22, 14, 11);

    ctx.fillStyle = SHIRT_DARK;
    ctx.fillRect(16, 28, 2, 3);

    // === ARM (front arm visible) ===
    outline(14, 24, 5, 10);
    ctx.fillStyle = SHIRT;
    ctx.fillRect(14, 24, 5, 10);

    ctx.fillStyle = SKIN;
    ctx.fillRect(14, 33, 4, 4);
    ctx.fillStyle = OUTLINE;
    ctx.fillRect(13, 33, 1, 4);

    // === HEAD (side profile) ===
    outline(19, 8, 12, 14);
    ctx.fillStyle = SKIN;
    ctx.fillRect(19, 8, 12, 14);

    // Nose
    ctx.fillStyle = OUTLINE;
    ctx.fillRect(30, 15, 2, 2);
    ctx.fillStyle = SKIN_SHADOW;
    ctx.fillRect(31, 15, 1, 2);

    // === HAIR ===
    ctx.fillStyle = HAIR;
    ctx.fillRect(19, 8, 12, 4);
    ctx.fillRect(19, 12, 2, 4);

    // === BEARD (side profile) ===
    ctx.fillStyle = BEARD;
    ctx.fillRect(27, 19, 4, 2);
    ctx.fillRect(30, 18, 1, 2);

    // === EYE (one visible) ===
    ctx.fillStyle = EYE_WHITE;
    ctx.fillRect(25, 14, 3, 2);

    ctx.fillStyle = EYE_PUPIL;
    ctx.fillRect(26, 14, 1, 2);

    // === EYEBROW ===
    ctx.fillStyle = HAIR;
    ctx.fillRect(25, 12, 3, 1);

    scene.textures.addCanvas(key, canvas);
    return key;
}

export function generateWadeBackSprite(scene) {
    const key = 'wade_idle_back';

    if (scene.textures.exists(key)) {
        return key;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 48;
    canvas.height = 48;
    const ctx = canvas.getContext('2d');

    const HAIR = '#4a3428';
    const SHIRT = '#4a7c59';
    const SHIRT_DARK = '#3a5c44';
    const PANTS = '#5c4033';
    const PANTS_DARK = '#4a3020';
    const SHOES = '#2C1C0C';
    const OUTLINE = '#2C1C0C';
    const SKIN = '#f5cfa0';

    function outline(x, y, w, h) {
        ctx.fillStyle = OUTLINE;
        ctx.fillRect(x - 1, y, w + 2, h);
        ctx.fillRect(x, y - 1, w, h + 2);
    }

    // === SHOES ===
    ctx.fillStyle = SHOES;
    ctx.fillRect(15, 44, 6, 3);
    ctx.fillRect(27, 44, 6, 3);

    // === LEGS ===
    outline(16, 32, 5, 12);
    ctx.fillStyle = PANTS;
    ctx.fillRect(16, 32, 5, 12);

    outline(27, 32, 5, 12);
    ctx.fillRect(27, 32, 5, 12);

    ctx.fillStyle = PANTS_DARK;
    ctx.fillRect(17, 36, 1, 6);
    ctx.fillRect(28, 36, 1, 6);

    // === TORSO (back of shirt) ===
    outline(14, 22, 20, 11);
    ctx.fillStyle = SHIRT;
    ctx.fillRect(14, 22, 20, 11);

    ctx.fillStyle = SHIRT_DARK;
    ctx.fillRect(14, 28, 2, 3);
    ctx.fillRect(32, 28, 2, 3);

    // === ARMS ===
    outline(9, 24, 6, 10);
    ctx.fillStyle = SHIRT;
    ctx.fillRect(9, 24, 6, 10);

    ctx.fillStyle = SKIN;
    ctx.fillRect(10, 33, 4, 4);
    ctx.fillStyle = OUTLINE;
    ctx.fillRect(9, 33, 1, 4);

    outline(33, 24, 6, 10);
    ctx.fillStyle = SHIRT;
    ctx.fillRect(33, 24, 6, 10);

    ctx.fillStyle = SKIN;
    ctx.fillRect(34, 33, 4, 4);
    ctx.fillStyle = OUTLINE;
    ctx.fillRect(38, 33, 1, 4);

    // === HEAD (back view - just hair) ===
    outline(17, 8, 14, 14);
    ctx.fillStyle = HAIR;
    ctx.fillRect(17, 8, 14, 14);

    // Hair texture
    ctx.fillStyle = OUTLINE;
    ctx.fillRect(19, 10, 1, 8);
    ctx.fillRect(24, 10, 1, 8);
    ctx.fillRect(28, 10, 1, 8);

    scene.textures.addCanvas(key, canvas);
    return key;
}
