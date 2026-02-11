// Generate pixel art Montessori materials for toddler classroom
// Materials appropriate for 18 months - 3 years

export function generatePinkTower(scene) {
    const width = 32;
    const height = 32;
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Pink tower - stack of cubes getting smaller
    const pink = 0xffb3d9;
    const pinkDark = 0xd98fb5;

    // Largest cube (bottom)
    graphics.fillStyle(pink, 1);
    graphics.fillRect(8, 24, 10, 8);
    graphics.fillStyle(pinkDark, 1);
    graphics.fillRect(8, 31, 10, 1);

    // Medium cube
    graphics.fillStyle(pink, 1);
    graphics.fillRect(10, 18, 8, 6);
    graphics.fillStyle(pinkDark, 1);
    graphics.fillRect(10, 23, 8, 1);

    // Small cube
    graphics.fillStyle(pink, 1);
    graphics.fillRect(12, 13, 6, 5);
    graphics.fillStyle(pinkDark, 1);
    graphics.fillRect(12, 17, 6, 1);

    // Smallest cube (top)
    graphics.fillStyle(pink, 1);
    graphics.fillRect(14, 9, 4, 4);
    graphics.fillStyle(pinkDark, 1);
    graphics.fillRect(14, 12, 4, 1);

    graphics.generateTexture('material_pink_tower', width, height);
    graphics.destroy();
    return 'material_pink_tower';
}

export function generateCylinders(scene) {
    const width = 32;
    const height = 32;
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Knobbed cylinders in block
    const wood = 0xD2A679;
    const woodDark = 0xA0826D;
    const knob = 0xE8D4B0;

    // Block
    graphics.fillStyle(wood, 1);
    graphics.fillRect(6, 16, 20, 12);

    // Block outline
    graphics.lineStyle(1, woodDark, 1);
    graphics.strokeRect(6, 16, 20, 12);

    // Three cylinder holes with knobs
    for (let i = 0; i < 3; i++) {
        const x = 8 + (i * 6);

        // Hole (dark)
        graphics.fillStyle(woodDark, 1);
        graphics.fillRect(x, 18, 4, 8);

        // Knob
        graphics.fillStyle(knob, 1);
        graphics.fillCircle(x + 2, 15, 2);
    }

    graphics.generateTexture('material_cylinders', width, height);
    graphics.destroy();
    return 'material_cylinders';
}

export function generatePouringPitchers(scene) {
    const width = 32;
    const height = 32;
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Two small pitchers for water pouring
    const pitcher1 = 0x4FC3F7;
    const pitcher2 = 0xFFB74D;
    const dark = 0x2C1C0C;

    // Left pitcher (blue)
    graphics.fillStyle(pitcher1, 1);
    graphics.fillRect(6, 16, 8, 12);
    graphics.fillRect(5, 17, 2, 3); // Handle
    graphics.fillRect(12, 16, 2, 4); // Spout

    graphics.lineStyle(1, dark, 1);
    graphics.strokeRect(6, 16, 8, 12);

    // Right pitcher (orange)
    graphics.fillStyle(pitcher2, 1);
    graphics.fillRect(18, 16, 8, 12);
    graphics.fillRect(17, 17, 2, 3); // Handle
    graphics.fillRect(24, 16, 2, 4); // Spout

    graphics.lineStyle(1, dark, 1);
    graphics.strokeRect(18, 16, 8, 12);

    graphics.generateTexture('material_pouring', width, height);
    graphics.destroy();
    return 'material_pouring';
}

export function generateColorTablets(scene) {
    const width = 32;
    const height = 32;
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Color tablets in wooden box
    const wood = 0xD2A679;
    const red = 0xE57373;
    const blue = 0x64B5F6;
    const yellow = 0xFFF176;

    // Box
    graphics.fillStyle(wood, 1);
    graphics.fillRect(6, 14, 20, 14);
    graphics.lineStyle(1, 0xA0826D, 1);
    graphics.strokeRect(6, 14, 20, 14);

    // Tablets standing up
    graphics.fillStyle(red, 1);
    graphics.fillRect(8, 16, 5, 10);

    graphics.fillStyle(blue, 1);
    graphics.fillRect(14, 16, 5, 10);

    graphics.fillStyle(yellow, 1);
    graphics.fillRect(20, 16, 5, 10);

    graphics.generateTexture('material_color_tablets', width, height);
    graphics.destroy();
    return 'material_color_tablets';
}

export function generatePuzzle(scene) {
    const width = 32;
    const height = 32;
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Simple knobbed puzzle
    const wood = 0xD2A679;
    const knob = 0x8B6F47;
    const shapes = [0xE57373, 0x64B5F6, 0x81C784, 0xFFF176];

    // Puzzle board
    graphics.fillStyle(wood, 1);
    graphics.fillRect(6, 10, 20, 16);
    graphics.lineStyle(1, 0xA0826D, 1);
    graphics.strokeRect(6, 10, 20, 16);

    // Four shape pieces with knobs
    const positions = [
        { x: 8, y: 12 },
        { x: 16, y: 12 },
        { x: 8, y: 19 },
        { x: 16, y: 19 }
    ];

    positions.forEach((pos, i) => {
        graphics.fillStyle(shapes[i], 1);
        graphics.fillRect(pos.x, pos.y, 6, 6);

        graphics.fillStyle(knob, 1);
        graphics.fillCircle(pos.x + 3, pos.y + 3, 2);
    });

    graphics.generateTexture('material_puzzle', width, height);
    graphics.destroy();
    return 'material_puzzle';
}

export function generateBooks(scene) {
    const width = 32;
    const height = 32;
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Stack of colorful children's books
    const colors = [0xE57373, 0x64B5F6, 0x81C784];

    colors.forEach((color, i) => {
        graphics.fillStyle(color, 1);
        graphics.fillRect(8, 18 + (i * 4), 16, 4);

        graphics.lineStyle(1, 0x2C1C0C, 1);
        graphics.strokeRect(8, 18 + (i * 4), 16, 4);
    });

    graphics.generateTexture('material_books', width, height);
    graphics.destroy();
    return 'material_books';
}

export function generateBroom(scene) {
    const width = 32;
    const height = 32;
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Child-sized broom
    const handle = 0xA0826D;
    const bristles = 0xE8D4B0;

    // Handle
    graphics.fillStyle(handle, 1);
    graphics.fillRect(14, 6, 2, 18);

    // Broom head
    graphics.fillStyle(bristles, 1);
    graphics.fillRect(10, 24, 10, 6);

    graphics.lineStyle(1, 0x8B6F47, 1);
    graphics.strokeRect(10, 24, 10, 6);

    graphics.generateTexture('material_broom', width, height);
    graphics.destroy();
    return 'material_broom';
}

export function generateNestingBoxes(scene) {
    const width = 32;
    const height = 32;
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Nesting boxes
    const colors = [0xE57373, 0xFFB74D, 0xFFF176];

    // Largest box
    graphics.fillStyle(colors[0], 1);
    graphics.fillRect(8, 18, 16, 12);
    graphics.lineStyle(1, 0x2C1C0C, 1);
    graphics.strokeRect(8, 18, 16, 12);

    // Medium box (nested)
    graphics.fillStyle(colors[1], 1);
    graphics.fillRect(10, 20, 12, 10);
    graphics.lineStyle(1, 0x2C1C0C, 1);
    graphics.strokeRect(10, 20, 12, 10);

    // Small box (nested)
    graphics.fillStyle(colors[2], 1);
    graphics.fillRect(12, 22, 8, 8);
    graphics.lineStyle(1, 0x2C1C0C, 1);
    graphics.strokeRect(12, 22, 8, 8);

    graphics.generateTexture('material_nesting_boxes', width, height);
    graphics.destroy();
    return 'material_nesting_boxes';
}

export function generateSpooningTray(scene) {
    const width = 32;
    const height = 32;
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Tray with two bowls and spoon
    const tray = 0xD2A679;
    const bowl = 0xFFFFFF;
    const spoon = 0xC0C0C0;

    // Tray
    graphics.fillStyle(tray, 1);
    graphics.fillRect(4, 16, 24, 14);
    graphics.lineStyle(1, 0xA0826D, 1);
    graphics.strokeRect(4, 16, 24, 14);

    // Left bowl
    graphics.fillStyle(bowl, 1);
    graphics.fillCircle(10, 23, 4);
    graphics.lineStyle(1, 0x666666, 1);
    graphics.strokeCircle(10, 23, 4);

    // Right bowl
    graphics.fillStyle(bowl, 1);
    graphics.fillCircle(22, 23, 4);
    graphics.lineStyle(1, 0x666666, 1);
    graphics.strokeCircle(22, 23, 4);

    // Spoon
    graphics.fillStyle(spoon, 1);
    graphics.fillRect(14, 20, 2, 6);
    graphics.fillCircle(15, 19, 2);

    graphics.generateTexture('material_spooning', width, height);
    graphics.destroy();
    return 'material_spooning';
}
