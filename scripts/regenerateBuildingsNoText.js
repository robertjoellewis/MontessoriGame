/**
 * Regenerate Village Buildings WITHOUT text/signs
 * Then automatically remove white backgrounds
 */

import Replicate from 'replicate';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const buildings = [
  {
    name: 'The Rusty Spur',
    filename: 'rusty_spur_ai.png',
    prompt: `pixel art game sprite, single western honky tonk saloon bar building exterior,
rustic old west saloon with swinging doors and wooden porch,
weathered wood siding with red trim accents,
front-facing view with double swinging saloon doors in center,
wooden porch with posts,
hitching post,
thick black outline,
stardew valley style,
16-bit retro game asset,
completely isolated on pure white background,
NO text, NO signs, NO letters, NO words,
NO other objects or decorations,
NO scene elements,
just the bar building exterior only,
chunky pixel art,
warm brown and red colors,
simple clean design,
200x180 pixels size`
  },
  {
    name: 'The Paper Trail',
    filename: 'paper_trail_ai.png',
    prompt: `pixel art game sprite, single stationary paper shop store building exterior,
charming small shop with large display windows,
clean white or cream painted wood siding,
front-facing view with centered door and big windows,
small awning over entrance,
simple elegant design,
thick black outline,
stardew valley style,
16-bit retro game asset,
completely isolated on pure white background,
NO text, NO signs, NO letters, NO words,
NO other objects,
NO scene elements,
just the shop building exterior only,
chunky pixel art,
light pastel colors,
200x180 pixels size`
  },
  {
    name: 'Maple & Co. General',
    filename: 'maple_general_ai.png',
    prompt: `pixel art game sprite, single general store building exterior,
classic old-fashioned country general store,
wood siding with covered front porch,
front-facing view with centered door and side windows,
wooden porch with roof overhang,
barrel on porch,
thick black outline,
stardew valley style,
16-bit retro game asset,
completely isolated on pure white background,
NO text, NO signs, NO letters, NO words,
NO other objects,
NO scene elements,
just the store building exterior only,
chunky pixel art,
natural wood brown tones,
200x180 pixels size`
  },
  {
    name: 'Mystery House',
    filename: 'mystery_house_ai.png',
    prompt: `pixel art game sprite, single mysterious Victorian mansion house building exterior,
spooky mysterious house with gothic details,
dark purple or indigo painted siding,
ornate Victorian architecture with gables,
front-facing view with arched door and tall windows,
slightly eerie but whimsical appearance,
thick black outline,
stardew valley style,
16-bit retro game asset,
completely isolated on pure white background,
NO text, NO signs, NO letters, NO words, NO names,
NO other objects,
NO scene elements,
just the house building exterior only,
chunky pixel art,
purple and dark blue colors,
200x180 pixels size`
  },
  {
    name: 'Harrington Manor',
    filename: 'harrington_manor_ai.png',
    prompt: `pixel art game sprite, single large wealthy mansion manor building exterior,
impressive grand manor house with columns,
elegant upscale architecture,
pristine white or cream colored exterior,
front-facing view with grand centered entrance,
larger more impressive than other buildings,
shows wealth and status,
thick black outline,
stardew valley style,
16-bit retro game asset,
completely isolated on pure white background,
NO text, NO signs, NO letters, NO words,
NO other objects,
NO scene elements,
just the manor building exterior only,
chunky pixel art,
white cream and gold colors,
240x220 pixels size for larger building`
  },
  {
    name: 'Little Sprouts Montessori',
    filename: 'school_ai.png',
    prompt: `pixel art game sprite, single small schoolhouse building exterior,
cheerful one-room schoolhouse,
red brick or painted wood exterior,
front-facing view with centered door and windows,
school bell on roof,
welcoming friendly appearance,
thick black outline,
stardew valley style,
16-bit retro game asset,
completely isolated on pure white background,
NO text, NO signs, NO letters, NO words,
NO other objects,
NO scene elements,
just the school building exterior only,
chunky pixel art,
red brick and warm welcoming colors,
200x180 pixels size`
  }
];

async function removeWhiteBackground(buffer) {
    // Convert to raw pixels
    const image = sharp(buffer);
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

        // If pixel is white or very light (threshold 240), make it transparent
        if (r >= 240 && g >= 240 && b >= 240) {
            pixels[i + 3] = 0; // Set alpha to 0 (transparent)
            changedPixels++;
        }
    }

    // Create PNG buffer with transparent background
    const outputBuffer = await sharp(pixels, {
        raw: {
            width: info.width,
            height: info.height,
            channels: 4
        }
    })
    .png()
    .toBuffer();

    return { buffer: outputBuffer, changedPixels };
}

async function generateBuilding(building) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🏠 Generating ${building.name} (NO TEXT)...`);

    try {
        const output = await replicate.run(
            "black-forest-labs/flux-schnell",
            {
                input: {
                    prompt: building.prompt,
                    num_outputs: 1,
                    aspect_ratio: "1:1",
                    output_format: "png",
                    output_quality: 100
                }
            }
        );

        console.log('✅ Generated!');

        // Download the image
        const response = await fetch(output[0]);
        const arrayBuffer = await response.arrayBuffer();
        let buffer = Buffer.from(arrayBuffer);

        // Remove white background
        console.log('🎨 Removing white background...');
        const result = await removeWhiteBackground(buffer);
        buffer = result.buffer;
        console.log(`✅ Made ${result.changedPixels} pixels transparent`);

        // Save to sprites folder
        const outputPath = path.join(__dirname, '../src/assets/sprites', building.filename);
        fs.writeFileSync(outputPath, buffer);

        console.log(`✅ Saved to: ${outputPath}`);
        return true;

    } catch (error) {
        console.error(`❌ Error generating ${building.name}:`, error);
        return false;
    }
}

async function regenerateAllBuildings() {
    console.log('🏘️  Regenerating all buildings WITHOUT TEXT, with transparent backgrounds...\n');

    let successCount = 0;
    let failCount = 0;

    for (const building of buildings) {
        const success = await generateBuilding(building);
        if (success) {
            successCount++;
        } else {
            failCount++;
        }

        // Small delay between generations
        if (building !== buildings[buildings.length - 1]) {
            console.log('\n⏳ Waiting 2 seconds before next generation...');
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`\n✨ REGENERATION COMPLETE!`);
    console.log(`✅ Success: ${successCount}/${buildings.length}`);
    if (failCount > 0) {
        console.log(`❌ Failed: ${failCount}/${buildings.length}`);
    }
    console.log(`\n📁 All sprites saved with transparent backgrounds`);
    console.log(`\n🎮 Refresh browser to see updated buildings (no text, transparent)`);
}

regenerateAllBuildings();
