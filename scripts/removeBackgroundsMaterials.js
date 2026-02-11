/**
 * Remove backgrounds from specific material sprites
 * Pink tower, nesting boxes, and broom
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

async function removeBackground(filename) {
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

        // More aggressive background removal
        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];

            // Remove light backgrounds (white/cream/light gray/beige)
            if (r >= 180 && g >= 180 && b >= 180) {
                pixels[i + 3] = 0;
                changedPixels++;
            }
            // Also remove cream/tan/brown backgrounds
            else if (r >= 180 && g >= 170 && b >= 150) {
                pixels[i + 3] = 0;
                changedPixels++;
            }
            // Remove darker gray backgrounds
            else if (r >= 150 && g >= 150 && b >= 150 &&
                     Math.abs(r - g) < 20 && Math.abs(g - b) < 20) {
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
    console.log('🎨 BACKGROUND REMOVAL FOR MATERIALS');
    console.log('===================================\n');

    let successCount = 0;

    for (const filename of materials) {
        const success = await removeBackground(filename);
        if (success) successCount++;
    }

    console.log('\n===================================');
    console.log(`✅ Processed ${successCount}/${materials.length} materials`);
    console.log('🎨 Backgrounds removed!');
}

processAll();
