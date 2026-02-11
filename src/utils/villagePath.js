/**
 * Village Path - Cobblestone Procedural Generation
 * Stardew Valley style cobblestone street
 */

/**
 * Generate cobblestone path texture
 * Creates a seamless 128x128 tile with chunky stones
 */
export function generateCobblestone(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Stardew exact colors
    const BASE_GRAY = 0x8B7355;      // Base path color (warm gray-brown)
    const STONE_LIGHT = 0xA08968;    // Light stones
    const STONE_MID = 0x75644E;      // Mid-tone stones
    const STONE_DARK = 0x5C4A3A;     // Dark stones
    const GROUT_DARK = 0x4A3829;     // Dark grout between stones
    const OUTLINE = 0x3A2819;        // Stone outlines

    const tileSize = 128;

    // Fill base (grout/dirt between stones)
    graphics.fillStyle(BASE_GRAY, 1);
    graphics.fillRect(0, 0, tileSize, tileSize);

    // Draw chunky cobblestones (irregular grid pattern)
    // Stardew style: blocky, varied sizes, thick outlines

    // Row 1 (top)
    drawStone(graphics, 2, 2, 28, 22, STONE_MID, OUTLINE);
    drawStone(graphics, 34, 2, 32, 24, STONE_LIGHT, OUTLINE);
    drawStone(graphics, 70, 2, 26, 20, STONE_DARK, OUTLINE);
    drawStone(graphics, 100, 2, 26, 22, STONE_MID, OUTLINE);

    // Row 2
    drawStone(graphics, 2, 28, 30, 26, STONE_LIGHT, OUTLINE);
    drawStone(graphics, 36, 30, 28, 24, STONE_DARK, OUTLINE);
    drawStone(graphics, 68, 26, 30, 28, STONE_MID, OUTLINE);
    drawStone(graphics, 102, 28, 24, 26, STONE_LIGHT, OUTLINE);

    // Row 3
    drawStone(graphics, 2, 58, 32, 24, STONE_DARK, OUTLINE);
    drawStone(graphics, 38, 58, 26, 22, STONE_MID, OUTLINE);
    drawStone(graphics, 68, 58, 28, 24, STONE_LIGHT, OUTLINE);
    drawStone(graphics, 100, 58, 26, 24, STONE_DARK, OUTLINE);

    // Row 4 (bottom)
    drawStone(graphics, 2, 86, 28, 22, STONE_LIGHT, OUTLINE);
    drawStone(graphics, 34, 84, 30, 26, STONE_MID, OUTLINE);
    drawStone(graphics, 68, 86, 26, 24, STONE_DARK, OUTLINE);
    drawStone(graphics, 98, 84, 28, 26, STONE_LIGHT, OUTLINE);

    // Row 5 (for seamless tiling)
    drawStone(graphics, 2, 112, 28, 20, STONE_MID, OUTLINE);
    drawStone(graphics, 34, 114, 32, 18, STONE_LIGHT, OUTLINE);
    drawStone(graphics, 70, 112, 26, 20, STONE_DARK, OUTLINE);
    drawStone(graphics, 100, 114, 26, 18, STONE_MID, OUTLINE);

    // Add subtle texture/cracks to some stones (optional detail)
    graphics.fillStyle(GROUT_DARK, 0.3);
    graphics.fillRect(15, 10, 8, 2);   // Small crack
    graphics.fillRect(45, 38, 2, 10);  // Vertical crack
    graphics.fillRect(80, 65, 10, 2);  // Horizontal crack

    graphics.generateTexture('village_cobblestone', tileSize, tileSize);
    graphics.destroy();

    return 'village_cobblestone';
}

/**
 * Helper function to draw a single cobblestone
 * Uses chunky rectangular shapes with thick outlines
 */
function drawStone(graphics, x, y, width, height, fillColor, outlineColor) {
    // 2px thick outline (Stardew style)
    graphics.fillStyle(outlineColor, 1);
    graphics.fillRect(x, y, width, height);

    // Stone fill (inset by 2px)
    graphics.fillStyle(fillColor, 1);
    graphics.fillRect(x + 2, y + 2, width - 4, height - 4);

    // Subtle highlight on top-left (makes it look slightly 3D)
    graphics.fillStyle(0xFFFFFF, 0.15);
    graphics.fillRect(x + 2, y + 2, width - 4, 2); // Top edge
    graphics.fillRect(x + 2, y + 2, 2, height - 4); // Left edge
}
