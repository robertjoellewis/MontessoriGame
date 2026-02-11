/**
 * Generate detailed pixel art sprites for Montessori materials
 * Using Replicate API with Stardew Valley style
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
soft pink color blocks,
Stardew Valley game style,
16-bit retro pixel art,
top down isometric view,
clean pixel art icon,
32x32 pixels,
wooden shelf background,
warm cozy game aesthetic,
chunky simple pixel art`
  },
  {
    name: 'knobbed_cylinders',
    filename: 'material_cylinders.png',
    prompt: `Montessori Knobbed Cylinders pixel art sprite,
wooden block with 3 cylinder holes,
small wooden knobs on each cylinder,
natural wood grain color,
Stardew Valley game style,
16-bit retro pixel art,
top down view,
clean pixel art icon,
32x32 pixels,
warm wood tones,
chunky simple pixel art`
  },
  {
    name: 'color_tablets',
    filename: 'material_color_tablets.png',
    prompt: `Montessori Color Tablets pixel art sprite,
wooden box with colorful rectangular tablets,
red blue yellow color cards standing up,
wooden frame border,
Stardew Valley game style,
16-bit retro pixel art,
top down view,
clean pixel art icon,
32x32 pixels,
bright primary colors,
chunky simple pixel art`
  },
  {
    name: 'pouring_pitchers',
    filename: 'material_pouring.png',
    prompt: `Montessori Water Pouring pixel art sprite,
two small ceramic pitchers side by side,
one blue pitcher one orange pitcher,
practical life material,
Stardew Valley game style,
16-bit retro pixel art,
top down view,
clean pixel art icon,
32x32 pixels,
bright cheerful colors,
chunky simple pixel art`
  },
  {
    name: 'spooning_tray',
    filename: 'material_spooning.png',
    prompt: `Montessori Spooning Tray pixel art sprite,
wooden tray with two small white bowls,
silver spoon between bowls,
practical life material,
Stardew Valley game style,
16-bit retro pixel art,
top down view,
clean pixel art icon,
32x32 pixels,
natural wood and white ceramic,
chunky simple pixel art`
  },
  {
    name: 'broom',
    filename: 'material_broom.png',
    prompt: `Montessori child-sized broom pixel art sprite,
small toddler broom for cleaning,
wooden handle with tan bristles,
practical life care of environment,
Stardew Valley game style,
16-bit retro pixel art,
angled view,
clean pixel art icon,
32x32 pixels,
natural wood colors,
chunky simple pixel art`
  },
  {
    name: 'books',
    filename: 'material_books.png',
    prompt: `Montessori children's books pixel art sprite,
stack of 3 colorful picture books,
red blue green book spines,
language materials,
Stardew Valley game style,
16-bit retro pixel art,
side view stack,
clean pixel art icon,
32x32 pixels,
bright cheerful book colors,
chunky simple pixel art`
  },
  {
    name: 'puzzle',
    filename: 'material_puzzle.png',
    prompt: `Montessori knobbed puzzle pixel art sprite,
wooden puzzle board with 4 colorful shapes,
round wooden knobs on each piece,
red blue yellow green puzzle pieces,
Stardew Valley game style,
16-bit retro pixel art,
top down view,
clean pixel art icon,
32x32 pixels,
natural wood with bright colors,
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
top down view showing nesting,
clean pixel art icon,
32x32 pixels,
warm sunset gradient colors,
chunky simple pixel art`
  }
];

async function generateMaterial(material) {
  console.log(`\n🎨 Generating ${material.name}...`);
  console.log(`Prompt: ${material.prompt.split(',')[0]}`);

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

    // Remove white/light backgrounds
    console.log('🎨 Removing background...');
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

        // Remove light backgrounds (white/cream/light gray)
        if (r >= 230 && g >= 230 && b >= 230) {
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

async function generateAllMaterials() {
  console.log('🎮 MONTESSORI MATERIALS SPRITE GENERATOR');
  console.log('========================================');
  console.log(`Generating ${materials.length} material sprites...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const material of materials) {
    const success = await generateMaterial(material);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    // Small delay between requests
    if (material !== materials[materials.length - 1]) {
      console.log('⏳ Waiting 2 seconds before next generation...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('\n========================================');
  console.log('📊 GENERATION COMPLETE');
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log('\n🎨 All materials saved to: src/assets/sprites/');
  console.log('📋 Ready for asset viewer review!');
}

generateAllMaterials();
