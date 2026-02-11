#!/usr/bin/env node

/**
 * MASTER SPRITE GENERATOR TEMPLATE
 *
 * PROVEN STRATEGY for perfect Stardew Valley sprites:
 * - Use FLUX-SCHNELL model (better at isolated objects)
 * - Frame as "game sprite icon" not scene
 * - Explicit "NO scene, NO other objects"
 * - White background for easy removal
 * - Generate at 16x size for quality
 */

import Replicate from 'replicate';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'assets', 'sprites');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * SPRITE DEFINITIONS - Using PROVEN PROMPT TEMPLATE
 *
 * Template formula:
 * "pixel art game sprite, single [OBJECT] [TYPE], [COLOR DETAILS],
 *  thick black outline, stardew valley style, 16-bit retro game asset,
 *  isolated on white background, NO other objects, NO scene, just the [OBJECT]"
 */
const SPRITES = [
  {
    name: 'table',
    filename: 'table_flux.png',
    prompt: 'pixel art game sprite, single wooden coffee table furniture icon, brown wood with two chunky rectangular legs visible, thick black outline, stardew valley style, 16-bit retro game asset, isolated on white background, NO other objects, NO chairs, NO scene, just the table, top-down view',
    width: 48,
    height: 32,
  },
  {
    name: 'dresser',
    filename: 'dresser_flux.png',
    prompt: 'pixel art game sprite, single wooden dresser furniture icon, brown wood with three visible drawers, small gold handles, thick black outline, stardew valley style, 16-bit retro game asset, isolated on white background, NO other objects, NO scene, just the dresser, front view',
    width: 48,
    height: 56,
  },
  {
    name: 'door',
    filename: 'door_flux.png',
    prompt: 'pixel art game sprite, single wooden door icon, brown wood with two rectangular panels, small gold handle on right side, thick black outline, stardew valley style, 16-bit retro game asset, isolated on white background, NO doorframe, NO walls, NO scene, just the door, front view',
    width: 60,
    height: 80,
  },
  {
    name: 'window',
    filename: 'window_flux.png',
    prompt: 'pixel art game sprite, single window icon, brown wooden frame with four panes, light blue glass, chunky cross dividers, thick black outline, stardew valley style, 16-bit retro game asset, isolated on white background, NO wall, NO curtains, NO scene, just the window',
    width: 50,
    height: 40,
  },
  {
    name: 'plant',
    filename: 'plant_flux.png',
    prompt: 'pixel art game sprite, single potted plant decoration icon, brown terracotta pot with three simple green leaves, thick black outline, stardew valley style, 16-bit retro game asset, isolated on white background, NO table, NO shelf, NO scene, just the plant',
    width: 30,
    height: 40,
  },
  {
    name: 'coffee_maker',
    filename: 'coffee_maker_flux.png',
    prompt: 'pixel art game sprite, single coffee maker machine icon, gray/black machine body with brown coffee pot, one small red button, thick black outline, stardew valley style, 16-bit retro game asset, isolated on white background, NO counter, NO kitchen, NO scene, just the coffee maker',
    width: 30,
    height: 40,
  },
  {
    name: 'rug',
    filename: 'rug_flux.png',
    prompt: 'pixel art game sprite, single decorative rug icon, red and orange colors with simple stripe pattern, thick black outline, stardew valley style, 16-bit retro game asset, isolated on white background, NO floor, NO furniture, NO scene, just the rug, top-down view',
    width: 150,
    height: 100,
  },
];

/**
 * Generate a single sprite using FLUX
 */
async function generateSprite(sprite) {
  console.log(`\n🎨 Generating: ${sprite.name}`);
  console.log(`   Target: ${sprite.width}x${sprite.height}px`);

  try {
    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: sprite.prompt,
          num_inference_steps: 4,  // FLUX-schnell optimized for 4 steps
          width: sprite.width * 16,  // 16x for high quality
          height: sprite.height * 16,
          num_outputs: 1,
        }
      }
    );

    const imageUrl = Array.isArray(output) ? output[0] : output;
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const outputPath = path.join(OUTPUT_DIR, sprite.filename);
    fs.writeFileSync(outputPath, buffer);

    console.log(`   ✅ Saved: ${sprite.filename}`);
    return true;
  } catch (error) {
    console.error(`   ❌ Failed:`, error.message);
    return false;
  }
}

/**
 * Generate all sprites
 */
async function generateAllSprites() {
  console.log('\n🎮 STARDEW VALLEY SPRITE GENERATOR');
  console.log('Using PROVEN FLUX-SCHNELL strategy');
  console.log('=' .repeat(60));
  console.log(`\n📊 Sprites to generate: ${SPRITES.length}\n`);

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ ERROR: REPLICATE_API_TOKEN not found');
    process.exit(1);
  }

  let successCount = 0;

  for (const sprite of SPRITES) {
    const success = await generateSprite(sprite);
    if (success) successCount++;

    // Wait 3 seconds between requests
    if (sprite !== SPRITES[SPRITES.length - 1]) {
      console.log('   ⏳ Waiting 3 seconds...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  console.log('\n' + '=' .repeat(60));
  console.log('✨ GENERATION COMPLETE!');
  console.log(`✅ Success: ${successCount}/${SPRITES.length}`);
  console.log('=' .repeat(60));

  console.log('\n📝 Next Steps:');
  console.log('1. Review each sprite - check for isolated objects');
  console.log('2. Run cleanup on good sprites');
  console.log('3. Regenerate any that have background elements\n');
}

generateAllSprites().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
