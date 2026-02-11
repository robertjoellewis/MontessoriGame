/**
 * Regenerate pink tower, nesting boxes, and broom with transparent backgrounds
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

const materials = [
  {
    name: 'pink_tower',
    filename: 'material_pink_tower.png',
    prompt: `Montessori Pink Tower pixel art sprite,
stack of 4 pink cubes graduated in size,
largest cube at bottom smallest at top,
soft pink color blocks only,
Stardew Valley game style,
16-bit retro pixel art,
isometric view,
clean pixel art icon,
32x32 pixels,
TRANSPARENT BACKGROUND,
NO background,
NO floor,
NO shelf,
isolated pink cubes only,
chunky simple pixel art`
  },
  {
    name: 'nesting_boxes',
    filename: 'material_nesting_boxes.png',
    prompt: `Montessori nesting boxes pixel art sprite,
3 colorful boxes nested inside each other,
largest red medium orange smallest yellow,
graduated size boxes only,
Stardew Valley game style,
16-bit retro pixel art,
top down view showing nesting,
clean pixel art icon,
32x32 pixels,
TRANSPARENT BACKGROUND,
NO background,
NO floor,
NO table,
isolated boxes only,
warm sunset gradient colors,
chunky simple pixel art`
  },
  {
    name: 'broom',
    filename: 'material_broom.png',
    prompt: `Montessori child-sized broom pixel art sprite,
small toddler broom for cleaning only,
wooden handle with tan bristles,
practical life care of environment,
Stardew Valley game style,
16-bit retro pixel art,
angled diagonal view,
clean pixel art icon,
32x32 pixels,
TRANSPARENT BACKGROUND,
NO background,
NO floor,
NO walls,
isolated broom only,
natural wood colors,
chunky simple pixel art`
  }
];

async function generateMaterial(material) {
  console.log(`\n🎨 Regenerating ${material.name}...`);
  console.log(`Prompt focuses on: TRANSPARENT BACKGROUND`);

  try {
    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: material.prompt,
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

    // Aggressive background removal
    console.log('🎨 Removing any remaining background...');
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
        const a = pixels[i + 3];

        if (a === 0) continue;

        const brightness = (r + g + b) / 3;

        // Remove any light colored pixels
        if (brightness >= 140 ||
            (r >= 140 && g >= 140 && b >= 140) ||
            (r >= 130 && g >= 120 && b >= 100)) {
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
    const outputPath = path.join(__dirname, '../src/assets/sprites', material.filename);
    fs.writeFileSync(outputPath, buffer);

    console.log(`✅ Saved: ${material.filename}`);

    return true;

  } catch (error) {
    console.error(`❌ Error generating ${material.name}:`, error.message);
    return false;
  }
}

async function regenerateAll() {
  console.log('🔄 REGENERATE MATERIALS WITH TRANSPARENT BG');
  console.log('=========================================\n');

  let successCount = 0;

  for (const material of materials) {
    const success = await generateMaterial(material);
    if (success) successCount++;

    // Delay between requests
    if (material !== materials[materials.length - 1]) {
      console.log('⏳ Waiting 2 seconds...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('\n=========================================');
  console.log(`✅ Success: ${successCount}/${materials.length}`);
  console.log('🎨 Materials regenerated with transparent backgrounds!');
}

regenerateAll();
