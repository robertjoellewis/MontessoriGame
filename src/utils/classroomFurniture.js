// Classroom Furniture - Shelves, Rugs, Tables for Toddler Classroom
// Detailed Montessori-style furniture

export function generateShelf(scene) {
    const width = 140;
    const height = 100;

    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Back panel (darker wood)
    graphics.fillStyle(0xA0826D, 1);
    graphics.fillRect(0, 0, width, height);

    // Side panels (3D effect)
    graphics.fillStyle(0x8B6F47, 1);
    graphics.fillRect(0, 0, 8, height); // Left side
    graphics.fillRect(width - 8, 0, 8, height); // Right side

    // Top and bottom edges
    graphics.fillStyle(0x6F5539, 1);
    graphics.fillRect(0, 0, width, 6); // Top
    graphics.fillRect(0, height - 6, width, 6); // Bottom

    // 4 shelf levels (light wood)
    const shelfY = [20, 38, 56, 74];
    shelfY.forEach(y => {
        graphics.fillStyle(0xD2A679, 1);
        graphics.fillRect(8, y, width - 16, 6);

        // Wood grain detail
        graphics.lineStyle(1, 0xC4A57B, 0.5);
        for (let i = 10; i < width - 10; i += 8) {
            graphics.beginPath();
            graphics.moveTo(i, y + 1);
            graphics.lineTo(i + 6, y + 5);
            graphics.strokePath();
        }

        // Shadow under shelf
        graphics.fillStyle(0x6F5539, 0.3);
        graphics.fillRect(8, y + 6, width - 16, 2);
    });

    // Vertical dividers (2 sections)
    graphics.fillStyle(0x8B6F47, 1);
    graphics.fillRect(width / 2 - 2, 20, 4, 60);

    // Front frame highlights
    graphics.lineStyle(2, 0x6F5539, 1);
    graphics.strokeRect(0, 0, width, height);

    graphics.generateTexture('classroom_shelf', width, height);
    graphics.destroy();
    return 'classroom_shelf';
}

export function generateLargeRug(scene) {
    const width = 400;
    const height = 300;

    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Main rug body (warm earth tone)
    graphics.fillStyle(0xB89968, 1);
    graphics.fillRect(0, 0, width, height);

    // Outer border (dark brown, thick)
    graphics.fillStyle(0x6F5539, 1);
    graphics.fillRect(0, 0, width, 12); // Top
    graphics.fillRect(0, height - 12, width, 12); // Bottom
    graphics.fillRect(0, 0, 12, height); // Left
    graphics.fillRect(width - 12, 0, 12, height); // Right

    // Middle border (medium brown)
    graphics.fillStyle(0x8B6F47, 1);
    graphics.fillRect(12, 12, width - 24, 8); // Top
    graphics.fillRect(12, height - 20, width - 24, 8); // Bottom
    graphics.fillRect(12, 12, 8, height - 24); // Left
    graphics.fillRect(width - 20, 12, 8, height - 24); // Right

    // Inner decorative border (light tan)
    graphics.fillStyle(0xD2A679, 1);
    graphics.fillRect(20, 20, width - 40, 4); // Top
    graphics.fillRect(20, height - 24, width - 40, 4); // Bottom
    graphics.fillRect(20, 20, 4, height - 40); // Left
    graphics.fillRect(width - 24, 20, 4, height - 40); // Right

    // Texture/pattern in center (subtle diamonds)
    graphics.fillStyle(0xA0826D, 0.2);
    for (let y = 40; y < height - 40; y += 40) {
        for (let x = 40; x < width - 40; x += 40) {
            graphics.fillRect(x - 3, y, 6, 2);
            graphics.fillRect(x, y - 3, 2, 6);
        }
    }

    // Corner accents
    graphics.fillStyle(0x6F5539, 1);
    [
        { x: 25, y: 25 },
        { x: width - 35, y: 25 },
        { x: 25, y: height - 35 },
        { x: width - 35, y: height - 35 }
    ].forEach(corner => {
        graphics.fillRect(corner.x, corner.y, 10, 10);
    });

    graphics.generateTexture('classroom_large_rug', width, height);
    graphics.destroy();
    return 'classroom_large_rug';
}

export function generateSmallTable(scene) {
    const width = 80;
    const height = 60;

    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Table top (light wood with detail)
    graphics.fillStyle(0xD2A679, 1);
    graphics.fillRect(0, 0, width, height - 20);

    // Wood grain on table top
    graphics.lineStyle(1, 0xC4A57B, 0.6);
    for (let i = 5; i < width - 5; i += 12) {
        graphics.beginPath();
        graphics.moveTo(i, 2);
        graphics.lineTo(i + 8, height - 22);
        graphics.strokePath();
    }

    // Table edge highlight (3D effect)
    graphics.fillStyle(0xE8D4B0, 1);
    graphics.fillRect(0, 0, width, 3);
    graphics.fillRect(0, 0, 3, height - 20);

    // Table edge shadow
    graphics.fillStyle(0x8B6F47, 1);
    graphics.fillRect(0, height - 23, width, 3);

    // Table top outline
    graphics.lineStyle(2, 0x6F5539, 1);
    graphics.strokeRect(0, 0, width, height - 20);

    // Four legs with detail
    const legPositions = [
        { x: 8, y: height - 20 },
        { x: width - 16, y: height - 20 },
        { x: 8, y: height - 20 },
        { x: width - 16, y: height - 20 }
    ];

    legPositions.forEach(leg => {
        // Leg body
        graphics.fillStyle(0xA0826D, 1);
        graphics.fillRect(leg.x, leg.y, 10, 20);

        // Leg highlight
        graphics.fillStyle(0xB89968, 1);
        graphics.fillRect(leg.x, leg.y, 2, 20);

        // Leg shadow
        graphics.fillStyle(0x8B6F47, 1);
        graphics.fillRect(leg.x + 8, leg.y, 2, 20);
    });

    graphics.generateTexture('classroom_table', width, height);
    graphics.destroy();
    return 'classroom_table';
}
