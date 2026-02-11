/**
 * Village Buildings - Procedural Generation
 * Stardew Valley style building exteriors for the village street
 */

/**
 * Generate Virginia's Cottage Exterior
 * Rustic cozy cottage with detailed wood siding, shingled roof, stone chimney
 * Size: 200x180 pixels
 */
export function generateCottageExterior(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Stardew exact colors (expanded for detail)
    const OUTLINE = 0x2C1C0C;           // Thick black outline
    const WOOD_BROWN = 0x8B4513;        // Main house body (brown wood)
    const WOOD_MID = 0xA0522D;          // Mid-tone wood
    const WOOD_DARK = 0x6F3810;         // Darker wood (shadow/trim)
    const WOOD_LIGHT = 0xC8824F;        // Light wood highlights
    const ROOF_RED = 0xA03030;          // Red shingles
    const ROOF_DARK = 0x802020;         // Dark red shingles (alternating)
    const ROOF_SHADOW = 0x5A1818;       // Deep shadow
    const STONE_GRAY = 0x707070;        // Stone chimney
    const STONE_DARK = 0x4A4A4A;        // Dark stone
    const DOOR_BROWN = 0x654321;        // Door color
    const WINDOW_BLUE = 0x6BA5D8;       // Window glass (light blue)
    const SHUTTER_GREEN = 0x4A6741;     // Window shutters

    const width = 200;
    const height = 180;

    // === SHINGLED ROOF (rustic, simplified) ===
    // Main roof shape with solid fill
    graphics.fillStyle(ROOF_RED, 1);
    graphics.beginPath();
    graphics.moveTo(5, 65);            // Left overhang
    graphics.lineTo(100, 8);           // Peak
    graphics.lineTo(195, 65);          // Right overhang
    graphics.lineTo(180, 72);          // Right inner
    graphics.lineTo(100, 25);          // Peak inner
    graphics.lineTo(20, 72);           // Left inner
    graphics.closePath();
    graphics.fillPath();

    // Roof outline
    graphics.lineStyle(2, OUTLINE, 1);
    graphics.strokePath();

    // Simplified shingle rows (horizontal stripes without individual rectangles)
    graphics.lineStyle(0);
    for (let row = 0; row < 6; row++) {
        const y = 30 + row * 7;
        const leftX = 22 + row * 14;
        const rightX = 178 - row * 14;
        const stripeColor = row % 2 === 0 ? ROOF_DARK : ROOF_SHADOW;

        // Draw simple horizontal stripe
        graphics.fillStyle(stripeColor, 1);
        graphics.fillRect(leftX, y, rightX - leftX, 3);
    }

    // === STONE CHIMNEY (left side, more detailed) ===
    // Main chimney body
    graphics.fillStyle(STONE_GRAY, 1);
    graphics.fillRect(25, 20, 20, 50);
    graphics.lineStyle(2, OUTLINE, 1);
    graphics.strokeRect(25, 20, 20, 50);

    // Stone texture (individual stones)
    graphics.lineStyle(1, STONE_DARK, 1);
    graphics.strokeRect(27, 25, 8, 8);
    graphics.strokeRect(36, 25, 7, 8);
    graphics.strokeRect(27, 34, 7, 9);
    graphics.strokeRect(35, 34, 8, 9);
    graphics.strokeRect(27, 44, 9, 8);
    graphics.strokeRect(37, 44, 6, 8);
    graphics.strokeRect(27, 53, 6, 8);
    graphics.strokeRect(34, 53, 9, 8);

    // Chimney cap
    graphics.fillStyle(OUTLINE, 1);
    graphics.fillRect(22, 18, 26, 4);

    // === HOUSE BODY (detailed wood planks) ===
    // Foundation/base (darker)
    graphics.lineStyle(0);
    graphics.fillStyle(WOOD_DARK, 1);
    graphics.fillRect(18, 170, 164, 10);
    graphics.lineStyle(2, OUTLINE, 1);
    graphics.strokeRect(18, 170, 164, 10);

    // Main wall outline
    graphics.lineStyle(2, OUTLINE, 1);
    graphics.strokeRect(18, 68, 164, 102);

    // Vertical wood planks (individual boards)
    graphics.lineStyle(0);
    const plankWidth = 16;
    for (let x = 20; x < 180; x += plankWidth) {
        const plankColor = (x / plankWidth) % 3 === 0 ? WOOD_BROWN :
                          (x / plankWidth) % 3 === 1 ? WOOD_MID : WOOD_LIGHT;
        graphics.fillStyle(plankColor, 1);
        graphics.fillRect(x, 70, plankWidth - 2, 98);

        // Plank separators
        graphics.lineStyle(2, OUTLINE, 1);
        graphics.beginPath();
        graphics.moveTo(x + plankWidth - 2, 70);
        graphics.lineTo(x + plankWidth - 2, 168);
        graphics.strokePath();
        graphics.lineStyle(0);

        // Wood grain (horizontal lines)
        graphics.fillStyle(WOOD_DARK, 0.3);
        graphics.fillRect(x + 2, 85, plankWidth - 6, 1);
        graphics.fillRect(x + 3, 105, plankWidth - 8, 1);
        graphics.fillRect(x + 2, 125, plankWidth - 6, 1);
        graphics.fillRect(x + 4, 145, plankWidth - 10, 1);
    }

    // === DOOR (center-bottom, detailed wood) ===
    graphics.fillStyle(OUTLINE, 1);
    graphics.fillRect(84, 118, 32, 62);

    graphics.fillStyle(DOOR_BROWN, 1);
    graphics.fillRect(86, 120, 28, 58);

    // Door vertical planks
    graphics.lineStyle(1, OUTLINE, 1);
    for (let x = 88; x < 112; x += 7) {
        graphics.beginPath();
        graphics.moveTo(x, 120);
        graphics.lineTo(x, 178);
        graphics.strokePath();
    }

    // Door cross-brace (X pattern)
    graphics.lineStyle(2, WOOD_DARK, 1);
    graphics.beginPath();
    graphics.moveTo(88, 130);
    graphics.lineTo(110, 168);
    graphics.strokePath();
    graphics.beginPath();
    graphics.moveTo(110, 130);
    graphics.lineTo(88, 168);
    graphics.strokePath();

    // Door handle (ring)
    graphics.lineStyle(2, OUTLINE, 1);
    graphics.strokeCircle(107, 155, 4);

    // === WINDOWS WITH SHUTTERS (left and right) ===
    // Left window
    drawRusticWindow(graphics, 38, 95, OUTLINE, WINDOW_BLUE, SHUTTER_GREEN);

    // Right window
    drawRusticWindow(graphics, 130, 95, OUTLINE, WINDOW_BLUE, SHUTTER_GREEN);

    // === SMALL WINDOW (above door, attic) ===
    graphics.fillStyle(OUTLINE, 1);
    graphics.fillRect(90, 75, 20, 18);
    graphics.fillStyle(WINDOW_BLUE, 1);
    graphics.fillRect(92, 77, 16, 14);
    graphics.lineStyle(2, OUTLINE, 1);
    graphics.beginPath();
    graphics.moveTo(100, 77);
    graphics.lineTo(100, 91);
    graphics.strokePath();

    // === RUSTIC DETAILS ===
    // Eaves trim (under roof)
    graphics.lineStyle(0);
    graphics.fillStyle(WOOD_DARK, 1);
    graphics.fillRect(18, 68, 164, 4);

    // Window boxes (flower planters)
    graphics.fillStyle(WOOD_BROWN, 1);
    graphics.fillRect(36, 127, 32, 6);
    graphics.fillRect(128, 127, 32, 6);
    graphics.lineStyle(1, OUTLINE, 1);
    graphics.strokeRect(36, 127, 32, 6);
    graphics.strokeRect(128, 127, 32, 6);

    // Simple flowers in boxes
    graphics.fillStyle(0xFF6B8A, 1); // Pink flowers
    graphics.fillCircle(45, 126, 2);
    graphics.fillCircle(52, 125, 2);
    graphics.fillCircle(59, 126, 2);
    graphics.fillCircle(137, 126, 2);
    graphics.fillCircle(144, 125, 2);
    graphics.fillCircle(151, 126, 2);

    graphics.generateTexture('village_cottage_procedural', width, height);
    graphics.destroy();

    return 'village_cottage_procedural';
}

/**
 * Helper: Draw a rustic window with shutters
 */
function drawRusticWindow(graphics, x, y, outlineColor, glassColor, shutterColor) {
    // Window frame
    graphics.lineStyle(0);
    graphics.fillStyle(outlineColor, 1);
    graphics.fillRect(x, y, 32, 36);

    // Glass
    graphics.fillStyle(glassColor, 1);
    graphics.fillRect(x + 2, y + 2, 28, 32);

    // Window panes (4 panes, 2x2)
    graphics.lineStyle(2, outlineColor, 1);
    graphics.beginPath();
    graphics.moveTo(x + 16, y + 2);
    graphics.lineTo(x + 16, y + 34);
    graphics.strokePath();
    graphics.beginPath();
    graphics.moveTo(x + 2, y + 18);
    graphics.lineTo(x + 30, y + 18);
    graphics.strokePath();

    // Left shutter
    graphics.lineStyle(0);
    graphics.fillStyle(shutterColor, 1);
    graphics.fillRect(x - 8, y + 4, 6, 28);
    graphics.lineStyle(1, outlineColor, 1);
    graphics.strokeRect(x - 8, y + 4, 6, 28);
    // Shutter slats
    for (let sy = y + 8; sy < y + 28; sy += 6) {
        graphics.strokeRect(x - 7, sy, 4, 3);
    }

    // Right shutter
    graphics.lineStyle(0);
    graphics.fillStyle(shutterColor, 1);
    graphics.fillRect(x + 34, y + 4, 6, 28);
    graphics.lineStyle(1, outlineColor, 1);
    graphics.strokeRect(x + 34, y + 4, 6, 28);
    // Shutter slats
    for (let sy = y + 8; sy < y + 28; sy += 6) {
        graphics.strokeRect(x + 35, sy, 4, 3);
    }
}
