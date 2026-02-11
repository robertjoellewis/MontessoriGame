// Cottage Interior - Stardew Valley Style
// Procedurally generated furniture and decor with pixel art aesthetic

// === WOODEN FLOOR TEXTURE (Stardew Style - VERTICAL Orange Planks) ===
export function generateWoodenFloor(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Stardew exact colors (bright orange, not muted tan)
    const plankOrange = 0xD8894C;    // Main plank color
    const plankDark = 0xC87038;      // Shadow/grain
    const plankLight = 0xE8A878;     // Highlight
    const outlineDark = 0xA85828;    // Plank outlines (1-2px)

    const width = 128;
    const height = 128;
    const plankWidth = 16;  // VERTICAL planks, 16px wide

    // Draw VERTICAL wood planks (running top to bottom)
    for (let x = 0; x < width; x += plankWidth) {
        // Left outline (1px dark border)
        graphics.fillStyle(outlineDark, 1);
        graphics.fillRect(x, 0, 1, height);

        // Main plank body (14px wide)
        graphics.fillStyle(plankOrange, 1);
        graphics.fillRect(x + 1, 0, 14, height);

        // Left highlight (2px for depth)
        graphics.fillStyle(plankLight, 1);
        graphics.fillRect(x + 1, 0, 2, height);

        // Horizontal grain lines (thin dark strokes across plank)
        graphics.fillStyle(plankDark, 1);
        for (let y = 8; y < height; y += 12) {
            graphics.fillRect(x + 2, y, 12, 1);  // 1px horizontal grain line
        }

        // Right outline (1px dark border)
        graphics.fillStyle(outlineDark, 1);
        graphics.fillRect(x + 15, 0, 1, height);
    }

    const textureKey = 'cottage_floor_v2';  // v2 = Stardew vertical planks
    graphics.generateTexture(textureKey, width, height);
    graphics.destroy();

    return textureKey;
}

// === WALLPAPER (Stardew Style - VERTICAL Yellow/Orange Stripes) ===
export function generateWallpaper(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Stardew exact colors (bold, bright!)
    const stripeYellow = 0xF8D878;   // Light yellow stripes
    const stripeOrange = 0xE8B850;   // Orange stripes (alternating)
    const stripeDark = 0xD8A840;     // Darker accent stripes

    const width = 128;
    const height = 128;
    const stripeWidth = 10;  // VERTICAL stripes, 10px wide

    // Draw VERTICAL stripes (bold alternating pattern)
    let stripeIndex = 0;
    for (let x = 0; x < width; x += stripeWidth) {
        // Alternate stripe colors
        let color;
        if (stripeIndex % 5 === 4) {
            // Every 5th stripe is darker (accent)
            color = stripeDark;
        } else if (stripeIndex % 2 === 0) {
            // Even stripes: yellow
            color = stripeYellow;
        } else {
            // Odd stripes: orange
            color = stripeOrange;
        }

        graphics.fillStyle(color, 1);
        graphics.fillRect(x, 0, stripeWidth, height);

        stripeIndex++;
    }

    const textureKey = 'cottage_wallpaper_v2';  // v2 = Stardew vertical stripes
    graphics.generateTexture(textureKey, width, height);
    graphics.destroy();

    return textureKey;
}

// === BED (Stardew Style - Chunky & Simple) ===
export function generateBed(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Stardew exact colors (5 colors MAX, thick outlines)
    const outlineBlack = 0x2C1C0C;    // Thick dark outline
    const woodBrown = 0x8B4513;       // Headboard main
    const woodDark = 0x6F3810;        // Headboard shadow
    const blanketRed = 0xC85050;      // Blanket main
    const blanketDark = 0xA03030;     // Blanket shadow
    const pillowWhite = 0xF8F8F8;     // Pillow

    const width = 80;
    const height = 60;

    // === HEADBOARD (chunky with simple detail) ===
    // Outline
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(0, 0, width, 18);

    // Main brown
    graphics.fillStyle(woodBrown, 1);
    graphics.fillRect(2, 2, width - 4, 14);

    // Shadow on right side
    graphics.fillStyle(woodDark, 1);
    graphics.fillRect(width - 6, 2, 4, 14);

    // Simple vertical slat lines
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(20, 4, 2, 10);
    graphics.fillRect(40, 4, 2, 10);
    graphics.fillRect(60, 4, 2, 10);

    // === MATTRESS BASE (white/cream under blanket) ===
    graphics.fillStyle(0xF0E8D0, 1);
    graphics.fillRect(2, 16, width - 4, 6);

    // === BLANKET (folded down from top) ===
    // Outline
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(4, 20, width - 8, height - 20);

    // Main red blanket
    graphics.fillStyle(blanketRed, 1);
    graphics.fillRect(6, 22, width - 12, height - 24);

    // Shadow/fold on right side
    graphics.fillStyle(blanketDark, 1);
    graphics.fillRect(width - 14, 22, 8, height - 24);

    // Simple horizontal fold lines
    graphics.fillStyle(blanketDark, 1);
    graphics.fillRect(6, 32, width - 12, 2);
    graphics.fillRect(6, 44, width - 12, 2);

    // === PILLOW (on mattress, before blanket) ===
    // Outline
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(18, 16, 44, 12);

    // White fill
    graphics.fillStyle(pillowWhite, 1);
    graphics.fillRect(20, 18, 40, 8);

    // Simple center indent
    graphics.fillStyle(0xE0E0E0, 1);
    graphics.fillRect(38, 20, 4, 4);

    graphics.generateTexture('cottage_bed_v3', width, height);
    graphics.destroy();

    return 'cottage_bed_v3';
}

// === DRESSER (Stardew Style - Chunky & Simple) ===
export function generateDresser(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Stardew exact colors (4 colors MAX, thick outlines)
    const outlineBlack = 0x2C1C0C;    // Thick dark outline
    const woodBrown = 0x8B4513;       // Body
    const woodDark = 0x6F3810;        // Drawer outlines
    const handleGold = 0xFFD700;      // Handles

    const width = 48;
    const height = 56;

    // Outer outline (thick 2px)
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(0, 0, width, height);

    // Main body fill
    graphics.fillStyle(woodBrown, 1);
    graphics.fillRect(2, 2, width - 4, height - 4);

    // === 3 SIMPLE DRAWERS ===

    // Drawer 1 (top) - simple rectangle
    graphics.fillStyle(woodDark, 1);
    graphics.fillRect(4, 6, width - 8, 14);

    // Gold handle (chunky)
    graphics.fillStyle(handleGold, 1);
    graphics.fillRect(width / 2 - 4, 12, 8, 3);

    // Drawer 2 (middle)
    graphics.fillStyle(woodDark, 1);
    graphics.fillRect(4, 22, width - 8, 14);

    graphics.fillStyle(handleGold, 1);
    graphics.fillRect(width / 2 - 4, 28, 8, 3);

    // Drawer 3 (bottom)
    graphics.fillStyle(woodDark, 1);
    graphics.fillRect(4, 38, width - 8, 14);

    graphics.fillStyle(handleGold, 1);
    graphics.fillRect(width / 2 - 4, 44, 8, 3);

    graphics.generateTexture('cottage_dresser_v2', width, height);
    graphics.destroy();

    return 'cottage_dresser_v2';
}

// === TABLE (Stardew Style - Chunky & Simple) ===
export function generateTable(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Stardew exact colors (3 colors MAX, thick outlines)
    const outlineBlack = 0x2C1C0C;    // Thick dark outline
    const woodTop = 0x8B5A28;         // Table top
    const woodLeg = 0x6F3810;         // Legs (darker)

    const width = 48;
    const height = 32;

    // === TABLE TOP (simple rectangle) ===
    // Thick outline
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(0, 0, width, 12);

    // Top fill (simple, no grain)
    graphics.fillStyle(woodTop, 1);
    graphics.fillRect(2, 2, width - 4, 8);

    // === TWO CHUNKY LEGS (8px wide blocks) ===

    // Left leg
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(6, 12, 10, 20);
    graphics.fillStyle(woodLeg, 1);
    graphics.fillRect(8, 13, 6, 18);

    // Right leg
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(32, 12, 10, 20);
    graphics.fillStyle(woodLeg, 1);
    graphics.fillRect(34, 13, 6, 18);

    graphics.generateTexture('cottage_table_v2', width, height);
    graphics.destroy();

    return 'cottage_table_v2';
}

// === RUG (Stardew Style - Simple & Chunky) ===
export function generateRug(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Stardew exact colors (3-4 colors MAX)
    const outlineBlack = 0x2C1C0C;    // Outline
    const rugRed = 0xC17A5A;          // Main color
    const rugDark = 0xA0604A;         // Border/pattern

    const width = 150;
    const height = 100;

    // Thick outline
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(0, 0, width, height);

    // Main rug fill
    graphics.fillStyle(rugRed, 1);
    graphics.fillRect(2, 2, width - 4, height - 4);

    // Simple border (chunky rectangles)
    graphics.fillStyle(rugDark, 1);
    graphics.fillRect(6, 6, width - 12, 8);        // Top border
    graphics.fillRect(6, height - 14, width - 12, 8); // Bottom border
    graphics.fillRect(6, 14, 8, height - 28);      // Left border
    graphics.fillRect(width - 14, 14, 8, height - 28); // Right border

    // Simple center pattern (chunky stripes)
    const centerX = width / 2;
    graphics.fillStyle(rugDark, 1);
    graphics.fillRect(centerX - 20, 25, 40, 8);
    graphics.fillRect(centerX - 20, 42, 40, 8);
    graphics.fillRect(centerX - 20, 59, 40, 8);

    graphics.generateTexture('cottage_rug_v2', width, height);
    graphics.destroy();

    return 'cottage_rug_v2';
}

// === POTTED PLANT (Stardew Style - Chunky & Simple) ===
export function generatePlant(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Stardew exact colors (3 colors MAX, thick outlines)
    const outlineBlack = 0x2C1C0C;    // Thick outline
    const potBrown = 0x8B4513;        // Pot
    const leafGreen = 0x4A7C4E;       // Leaves (simple)

    const width = 30;
    const height = 40;

    // === POT (simple chunky shape) ===
    // Thick outline
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(8, 26, 14, 14);

    // Pot fill (simple brown)
    graphics.fillStyle(potBrown, 1);
    graphics.fillRect(10, 28, 10, 10);

    // === PLANT LEAVES (simple chunky shapes) ===
    // Center stem
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(14, 16, 2, 12);

    // Left leaf (chunky rectangle)
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(6, 10, 8, 10);
    graphics.fillStyle(leafGreen, 1);
    graphics.fillRect(8, 12, 4, 6);

    // Right leaf (chunky rectangle)
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(16, 10, 8, 10);
    graphics.fillStyle(leafGreen, 1);
    graphics.fillRect(18, 12, 4, 6);

    // Top leaf (chunky rectangle)
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(10, 6, 10, 8);
    graphics.fillStyle(leafGreen, 1);
    graphics.fillRect(12, 8, 6, 4);

    graphics.generateTexture('cottage_plant_v2', width, height);
    graphics.destroy();

    return 'cottage_plant_v2';
}

// === WINDOW (Stardew Style - Chunky & Simple) ===
export function generateWindow(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Stardew exact colors (3 colors MAX)
    const frameBrown = 0x654321;      // Frame
    const glassSky = 0x87CEEB;        // Glass
    const glassLight = 0xE0F0FF;      // Simple reflection

    const width = 50;
    const height = 40;

    // Thick outer frame
    graphics.fillStyle(frameBrown, 1);
    graphics.fillRect(0, 0, width, height);

    // Simple glass (one piece, no fancy reflections)
    graphics.fillStyle(glassSky, 1);
    graphics.fillRect(4, 4, width - 8, height - 8);

    // Simple light reflection (top-left corner only)
    graphics.fillStyle(glassLight, 1);
    graphics.fillRect(6, 6, 12, 10);

    // Chunky cross dividers (4 panes)
    graphics.fillStyle(frameBrown, 1);
    graphics.fillRect(0, height / 2 - 2, width, 4);  // Horizontal (thicker)
    graphics.fillRect(width / 2 - 2, 0, 4, height);  // Vertical (thicker)

    graphics.generateTexture('cottage_window_v2', width, height);
    graphics.destroy();

    return 'cottage_window_v2';
}

// === COFFEE MAKER (Stardew Style - Drip Coffee Maker) ===
export function generateCoffeeMaker(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Stardew exact colors (5 colors MAX, thick outlines)
    const outlineBlack = 0x2C1C0C;    // Thick outline
    const machineGray = 0x707070;     // Main body (lighter gray)
    const machineDark = 0x4A4A4A;     // Shadow
    const coffeeBrown = 0x4E3524;     // Coffee liquid
    const potGlass = 0x88CCFF;        // Glass pot (light blue tint)

    const width = 36;
    const height = 48;

    // === MACHINE BACK (water reservoir) ===
    // Outline
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(4, 2, 28, 26);

    // Body
    graphics.fillStyle(machineGray, 1);
    graphics.fillRect(6, 4, 24, 22);

    // Dark side (shadow)
    graphics.fillStyle(machineDark, 1);
    graphics.fillRect(26, 4, 4, 22);

    // === BREW BASKET (top center - where filter goes) ===
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(12, 20, 12, 8);

    graphics.fillStyle(machineDark, 1);
    graphics.fillRect(14, 22, 8, 4);

    // === HEATING PLATE (base) ===
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(6, 28, 24, 4);

    graphics.fillStyle(machineGray, 1);
    graphics.fillRect(8, 29, 20, 2);

    // === COFFEE POT (glass carafe with coffee) ===
    // Pot outline
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(10, 30, 16, 16);

    // Glass with coffee inside
    graphics.fillStyle(potGlass, 1);
    graphics.fillRect(12, 32, 12, 12);

    // Coffee liquid (fills bottom half)
    graphics.fillStyle(coffeeBrown, 1);
    graphics.fillRect(12, 38, 12, 6);

    // Pot handle
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(26, 36, 4, 6);

    graphics.generateTexture('cottage_coffee_maker_v3', width, height);
    graphics.destroy();

    return 'cottage_coffee_maker_v3';
}

// === DOOR (Stardew Style - Chunky & Simple) ===
export function generateDoor(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Stardew exact colors (3 colors MAX, thick outlines)
    const outlineBlack = 0x2C1C0C;    // Thick dark outline
    const doorBrown = 0x654321;       // Main door
    const handleGold = 0xFFD700;      // Handle

    const width = 60;
    const height = 80;

    // Thick outer outline (2px)
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(0, 0, width, height);

    // Door fill (simple brown, no panels)
    graphics.fillStyle(doorBrown, 1);
    graphics.fillRect(2, 2, width - 4, height - 4);

    // Two simple panel outlines (no shading)
    graphics.fillStyle(outlineBlack, 1);
    // Top panel outline
    graphics.fillRect(8, 10, width - 16, 24);
    graphics.fillStyle(doorBrown, 1);
    graphics.fillRect(10, 12, width - 20, 20);

    // Bottom panel outline
    graphics.fillStyle(outlineBlack, 1);
    graphics.fillRect(8, 46, width - 16, 24);
    graphics.fillStyle(doorBrown, 1);
    graphics.fillRect(10, 48, width - 20, 20);

    // Chunky door handle (right side)
    graphics.fillStyle(handleGold, 1);
    graphics.fillRect(width - 10, height / 2 - 4, 6, 8);

    graphics.generateTexture('cottage_door_v2', width, height);
    graphics.destroy();

    return 'cottage_door_v2';
}
