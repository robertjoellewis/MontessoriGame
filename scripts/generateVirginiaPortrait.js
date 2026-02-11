/**
 * Generate pixelated Virginia portrait from photo using Replicate API
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

async function generateVirginiaPortrait() {
  console.log('🎨 Converting photo to retro pixelated portrait...\n');

  // Note: This requires the user's photo to be provided
  // For now, we'll generate from a text description
  const prompt = `pixel art portrait icon,
retro video game character portrait,
woman with glasses and brown hair,
friendly smiling face,
stardew valley style portrait,
16-bit SNES game character art,
pixel art game avatar,
chunky retro game portrait,
square portrait icon 128x128 pixels,
isolated on white background,
thick black outline,
simple cheerful pixel art face`;

  try {
    console.log('Prompt:', prompt);
    console.log('\nGenerating with FLUX...');

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: prompt,
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
    const image = sharp(buffer);
    const { data, info } = await image
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

    const pixels = new Uint8Array(data);
    let changedPixels = 0;

    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        if (r >= 240 && g >= 240 && b >= 240) {
            pixels[i + 3] = 0;
            changedPixels++;
        }
    }

    buffer = await sharp(pixels, {
        raw: {
            width: info.width,
            height: info.height,
            channels: 4
        }
    })
    .png()
    .toBuffer();

    console.log(`✅ Made ${changedPixels} pixels transparent`);

    // Save to sprites folder
    const outputPath = path.join(__dirname, '../src/assets/sprites/virginia_portrait.png');
    fs.writeFileSync(outputPath, buffer);

    console.log(`✅ Saved to: ${outputPath}`);
    console.log('\n🎮 Portrait ready for name selection screen!');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

generateVirginiaPortrait();
