/**
 * Village Landscaping - Trees, Shrubs, Bushes
 * Stardew Valley style decorative elements
 */

/**
 * Generate a simple pine tree
 * Size: ~60x80 pixels
 */
export function generatePineTree(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Stardew colors
    const OUTLINE = 0x2C1C0C;
    const TRUNK_BROWN = 0x6F3810;
    const GREEN_DARK = 0x2D5016;
    const GREEN_MID = 0x4A7C2C;
    const GREEN_LIGHT = 0x68A040;

    const width = 60;
    const height = 80;

    // === TRUNK ===
    graphics.fillStyle(OUTLINE, 1);
    graphics.fillRect(23, 50, 14, 30);

    graphics.fillStyle(TRUNK_BROWN, 1);
    graphics.fillRect(25, 52, 10, 26);

    // === FOLIAGE (3 triangle layers) ===
    graphics.lineStyle(2, OUTLINE, 1);

    // Bottom layer (largest)
    graphics.fillStyle(GREEN_DARK, 1);
    graphics.beginPath();
    graphics.moveTo(5, 50);
    graphics.lineTo(30, 30);
    graphics.lineTo(55, 50);
    graphics.closePath();
    graphics.fillPath();
    graphics.strokePath();

    // Middle layer
    graphics.fillStyle(GREEN_MID, 1);
    graphics.beginPath();
    graphics.moveTo(10, 35);
    graphics.lineTo(30, 15);
    graphics.lineTo(50, 35);
    graphics.closePath();
    graphics.fillPath();
    graphics.strokePath();

    // Top layer (smallest)
    graphics.fillStyle(GREEN_LIGHT, 1);
    graphics.beginPath();
    graphics.moveTo(15, 20);
    graphics.lineTo(30, 2);
    graphics.lineTo(45, 20);
    graphics.closePath();
    graphics.fillPath();
    graphics.strokePath();

    graphics.generateTexture('village_pine_tree', width, height);
    graphics.destroy();

    return 'village_pine_tree';
}

/**
 * Generate a round leafy tree
 * Size: ~70x85 pixels
 */
export function generateLeafyTree(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Stardew colors
    const OUTLINE = 0x2C1C0C;
    const TRUNK_BROWN = 0x6F3810;
    const TRUNK_LIGHT = 0x8B5A2B;
    const GREEN_DARK = 0x3A6B2F;
    const GREEN_MID = 0x52884A;
    const GREEN_LIGHT = 0x6BA058;

    const width = 70;
    const height = 85;

    // === TRUNK ===
    graphics.lineStyle(2, OUTLINE, 1);
    graphics.fillStyle(TRUNK_BROWN, 1);
    graphics.fillRect(28, 55, 14, 30);
    graphics.strokeRect(28, 55, 14, 30);

    // Trunk highlight
    graphics.fillStyle(TRUNK_LIGHT, 1);
    graphics.fillRect(30, 57, 4, 26);

    // === FOLIAGE (chunky round shape) ===
    graphics.lineStyle(2, OUTLINE, 1);

    // Main foliage circle (dark base)
    graphics.fillStyle(GREEN_DARK, 1);
    graphics.fillCircle(35, 35, 28);
    graphics.strokeCircle(35, 35, 28);

    // Mid-tone puffs (overlapping circles)
    graphics.fillStyle(GREEN_MID, 1);
    graphics.fillCircle(25, 30, 18);
    graphics.fillCircle(45, 28, 20);
    graphics.strokeCircle(25, 30, 18);
    graphics.strokeCircle(45, 28, 20);

    // Light highlights (top puffs)
    graphics.fillStyle(GREEN_LIGHT, 1);
    graphics.fillCircle(35, 20, 15);
    graphics.strokeCircle(35, 20, 15);

    graphics.generateTexture('village_leafy_tree', width, height);
    graphics.destroy();

    return 'village_leafy_tree';
}

/**
 * Generate a small bush/shrub
 * Size: ~40x35 pixels
 */
export function generateBush(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Stardew colors
    const OUTLINE = 0x2C1C0C;
    const GREEN_DARK = 0x3A6B2F;
    const GREEN_MID = 0x52884A;
    const GREEN_LIGHT = 0x6BA058;

    const width = 40;
    const height = 35;

    graphics.lineStyle(2, OUTLINE, 1);

    // Base (dark)
    graphics.fillStyle(GREEN_DARK, 1);
    graphics.fillCircle(20, 22, 16);
    graphics.strokeCircle(20, 22, 16);

    // Left puff (mid-tone)
    graphics.fillStyle(GREEN_MID, 1);
    graphics.fillCircle(10, 18, 10);
    graphics.strokeCircle(10, 18, 10);

    // Right puff (mid-tone)
    graphics.fillCircle(30, 18, 10);
    graphics.strokeCircle(30, 18, 10);

    // Top highlight (light)
    graphics.fillStyle(GREEN_LIGHT, 1);
    graphics.fillCircle(20, 12, 8);
    graphics.strokeCircle(20, 12, 8);

    graphics.generateTexture('village_bush', width, height);
    graphics.destroy();

    return 'village_bush';
}

/**
 * Generate a small flower cluster
 * Size: ~24x24 pixels
 */
export function generateFlowers(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Stardew colors
    const OUTLINE = 0x2C1C0C;
    const PINK = 0xFF6B8A;
    const YELLOW = 0xFFD966;
    const PURPLE = 0xB57EDC;
    const GREEN = 0x52884A;

    const width = 24;
    const height = 24;

    // Stems
    graphics.lineStyle(2, GREEN, 1);
    graphics.beginPath();
    graphics.moveTo(8, 20);
    graphics.lineTo(8, 14);
    graphics.strokePath();

    graphics.beginPath();
    graphics.moveTo(16, 20);
    graphics.lineTo(16, 12);
    graphics.strokePath();

    // Flowers (simple circles with outlines)
    graphics.lineStyle(1, OUTLINE, 1);

    // Pink flower (left)
    graphics.fillStyle(PINK, 1);
    graphics.fillCircle(8, 10, 4);
    graphics.strokeCircle(8, 10, 4);

    // Yellow flower (right)
    graphics.fillStyle(YELLOW, 1);
    graphics.fillCircle(16, 8, 4);
    graphics.strokeCircle(16, 8, 4);

    // Purple flower (middle-back)
    graphics.fillStyle(PURPLE, 1);
    graphics.fillCircle(12, 12, 4);
    graphics.strokeCircle(12, 12, 4);

    // Grass tuft at base
    graphics.lineStyle(0);
    graphics.fillStyle(GREEN, 1);
    graphics.fillRect(4, 20, 16, 4);

    graphics.generateTexture('village_flowers', width, height);
    graphics.destroy();

    return 'village_flowers';
}
