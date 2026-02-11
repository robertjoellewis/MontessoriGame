/**
 * Very aggressive background removal for material sprites
 * Removes ALL light-colored pixels
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const materials = [
    'material_pink_tower.png',
    'material_nesting_boxes.png',
    'material_broom.png'
];

async function aggressiveRemoveBackground(filename) {
    console.log(`\n🎨 Processing ${filename}...`);

    const inputPath = path.join(__dirname, '../src/assets/sprites', filename);

    if (!fs.existsSync(inputPath)) {
        console.log(`❌ File not found: ${filename}`);
        return false;
    }

    try {
        const image = sharp(inputPath);
        const { data, info } = await image
            .ensureAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });

        const pixels = new Uint8Array(data);
        let changedPixels = 0;

        // VERY aggressive - remove anything remotely light colored
        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const a = pixels[i + 3];

            // Skip if already transparent
            if (a === 0) continue;

            // Calculate brightness
            const brightness = (r + g + b) / 3;

            // Remove based on multiple conditions:

            // 1. Very light colors (white, cream, light gray, beige)
            if (brightness >= 160) {
                pixels[i + 3] = 0;
                changedPixels++;
            }
            // 2. Near-white colors
            else if (r >= 150 && g >= 150 && b >= 150) {
                pixels[i + 3] = 0;
                changedPixels++;
            }
            // 3. Light warm colors (cream, tan, beige)
            else if (r >= 140 && g >= 130 && b >= 110) {
                pixels[i + 3] = 0;
                changedPixels++;
            }
            // 4. Light cool colors (light blue, light gray)
            else if (r >= 130 && g >= 140 && b >= 150) {
                pixels[i + 3] = 0;
                changedPixels++;
            }
            // 5. Greenish/brownish light backgrounds
            else if (r >= 120 && g >= 130 && b >= 100 && brightness >= 120) {
                pixels[i + 3] = 0;
                changedPixels++;
            }
        }

        const buffer = await sharp(pixels, {
            raw: {
                width: info.width,
                height: info.height,
                channels: 4
            }
        })
        .png()
        .toBuffer();

        console.log(`✅ Made ${changedPixels} pixels transparent`);

        // Save back to same location
        fs.writeFileSync(inputPath, buffer);
        console.log(`✅ Saved: ${filename}`);

        return true;

    } catch (error) {
        console.error(`❌ Error processing ${filename}:`, error.message);
        return false;
    }
}

async function processAll() {
    console.log('🔥 AGGRESSIVE BACKGROUND REMOVAL');
    console.log('================================\n');

    let successCount = 0;

    for (const filename of materials) {
        const success = await aggressiveRemoveBackground(filename);
        if (success) successCount++;
    }

    console.log('\n================================');
    console.log(`✅ Processed ${successCount}/${materials.length} materials`);
    console.log('🔥 All backgrounds GONE!');
}

processAll();
