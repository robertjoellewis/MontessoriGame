/**
 * Remove white backgrounds from AI-generated building sprites
 * Makes backgrounds transparent
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spritesDir = path.join(__dirname, '../src/assets/sprites');

const files = [
    'cottage_exterior_ai.png',
    'rusty_spur_ai.png',
    'paper_trail_ai.png',
    'maple_general_ai.png',
    'mystery_house_ai.png',
    'harrington_manor_ai.png',
    'school_ai.png'
];

async function removeWhiteBackground(filename) {
    console.log(`\n🎨 Processing ${filename}...`);

    const inputPath = path.join(spritesDir, filename);
    const outputPath = inputPath; // Overwrite original

    try {
        // Read the image
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        // Convert to raw pixels
        const { data, info } = await image
            .ensureAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });

        // Process pixels - make white/near-white transparent
        const pixels = new Uint8Array(data);
        let changedPixels = 0;

        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const a = pixels[i + 3];

            // If pixel is white or very light (threshold 240), make it transparent
            if (r >= 240 && g >= 240 && b >= 240) {
                pixels[i + 3] = 0; // Set alpha to 0 (transparent)
                changedPixels++;
            }
        }

        // Create new image with transparent background
        await sharp(pixels, {
            raw: {
                width: info.width,
                height: info.height,
                channels: 4
            }
        })
        .png()
        .toFile(outputPath);

        console.log(`✅ Removed background from ${filename} (${changedPixels} pixels made transparent)`);

    } catch (error) {
        console.error(`❌ Error processing ${filename}:`, error);
    }
}

async function processAllImages() {
    console.log('🖼️  Removing white backgrounds from all building sprites...\n');

    for (const file of files) {
        await removeWhiteBackground(file);
    }

    console.log('\n✨ All backgrounds removed!');
    console.log('🎮 Refresh the game to see transparent buildings');
}

processAllImages();
