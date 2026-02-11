/**
 * Stardew Valley Floor - Procedural Generation
 * LARGE vertical planks with thick outlines and simple grain
 */

/**
 * Generate floor with 2-3 LARGE vertical planks
 * Creates a seamless 128x128 tile
 */
export function generateStardewFloor(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Stardew exact colors
    const PLANK_ORANGE = 0xD8894C;    // Main plank color (warm orange)
    const PLANK_LIGHT = 0xE8A878;     // Highlight
    const PLANK_DARK = 0xC87038;      // Shadow/grain
    const OUTLINE_BLACK = 0x8B4513;   // Dark outline (2px thick)

    const tileSize = 128;
    const plankWidth = 42;  // LARGE planks (3 planks per tile = 42px each)

    // Draw 3 LARGE vertical planks
    for (let i = 0; i < 3; i++) {
        const x = i * plankWidth;

        // THICK LEFT OUTLINE (2px)
        graphics.fillStyle(OUTLINE_BLACK, 1);
        graphics.fillRect(x, 0, 2, tileSize);

        // MAIN PLANK BODY (38px wide)
        graphics.fillStyle(PLANK_ORANGE, 1);
        graphics.fillRect(x + 2, 0, 38, tileSize);

        // LEFT HIGHLIGHT (lighter strip, 6px)
        graphics.fillStyle(PLANK_LIGHT, 1);
        graphics.fillRect(x + 2, 0, 6, tileSize);

        // SIMPLE HORIZONTAL GRAIN LINES (every 20px)
        graphics.fillStyle(PLANK_DARK, 1);
        for (let y = 10; y < tileSize; y += 20) {
            graphics.fillRect(x + 4, y, 34, 2);  // 2px thick grain line
        }

        // THICK RIGHT OUTLINE (2px) - unless it's the last plank
        if (i < 2) {
            graphics.fillStyle(OUTLINE_BLACK, 1);
            graphics.fillRect(x + 40, 0, 2, tileSize);
        }
    }

    // Final right edge outline to complete the tile
    graphics.fillStyle(OUTLINE_BLACK, 1);
    graphics.fillRect(126, 0, 2, tileSize);

    const textureKey = 'stardew_floor_procedural';
    graphics.generateTexture(textureKey, tileSize, tileSize);
    graphics.destroy();

    return textureKey;
}
