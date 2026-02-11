/**
 * Regenerate pink tower, nesting boxes, and broom
 * NO post-processing - save exactly what AI generates
 */

import Replicate from 'replicate';
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
soft pink color blocks,
Stardew Valley game style,
16-bit retro pixel art,
isometric view,
clean pixel art icon,
32x32 pixels,
transparent background,
no background,
isolated object,
chunky simple pixel art`
  },
  {
    name: 'nesting_boxes',
    filename: 'material_nesting_boxes.png',
    prompt: `Montessori nesting boxes pixel art sprite,
3 colorful boxes nested inside each other,
largest red medium orange smallest yellow,
graduated size boxes,
Stardew Valley game style,
16-bit retro pixel art,
top down view,
clean pixel art icon,
32x32 pixels,
transparent background,
no background,
isolated object,
warm sunset gradient colors,
chunky simple pixel art`
  },
  {
    name: 'broom',
    filename: 'material_broom.png',
    prompt: `Montessori child-sized broom pixel art sprite,
small toddler broom,
wooden handle with tan bristles,
Stardew Valley game style,
16-bit retro pixel art,
angled view,
clean pixel art icon,
32x32 pixels,
transparent background,
no background,
isolated object,
natural wood colors,
chunky simple pixel art`
  }
];

async function generateMaterial(material) {
  console.log(`\n🎨 Generating ${material.name}...`);

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

    // Download and save exactly as-is
    const response = await fetch(output[0]);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save to sprites folder - NO PROCESSING
    const outputPath = path.join(__dirname, '../src/assets/sprites', material.filename);
    fs.writeFileSync(outputPath, buffer);

    console.log(`✅ Saved: ${material.filename} (no processing)`);

    return true;

  } catch (error) {
    console.error(`❌ Error generating ${material.name}:`, error.message);
    return false;
  }
}

async function regenerateAll() {
  console.log('🎨 REGENERATE MATERIALS (NO POST-PROCESSING)');
  console.log('==========================================\n');

  let successCount = 0;

  for (const material of materials) {
    const success = await generateMaterial(material);
    if (success) successCount++;

    if (material !== materials[materials.length - 1]) {
      console.log('⏳ Waiting 2 seconds...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('\n==========================================');
  console.log(`✅ Success: ${successCount}/${materials.length}`);
  console.log('🎨 Materials saved exactly as AI generated them!');
}

regenerateAll();
