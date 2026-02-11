#!/usr/bin/env node

/**
 * Sprite Generation Script - Batch 2 (IMPROVED PROMPTS)
 * EXTREMELY specific prompts to generate clean, isolated sprites
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
 * BATCH 2: Remaining sprites with ULTRA-SPECIFIC prompts
 * Key improvements:
 * - Specify "isolated single object"
 * - Specify "white background" or "transparent background"
 * - Specify "no scene, no environment, no extra objects"
 * - Specify "game sprite asset"
 * - Add exact dimensions and perspective
 */
const SPRITES_BATCH_2 = [
  {
    filename: 'wallpaper_stripes_v2.png',
    prompt: 'pixel art seamless tileable texture pattern ONLY, repeating vertical stripes alternating yellow #F8D878 and orange #E8B850, bold clean stripes, no objects, no furniture, no room, just the flat stripe pattern texture, 128x128 pixel tile, stardew valley game texture style, flat 2D pattern',
    negative_prompt: 'room, walls, furniture, objects, 3d, perspective, depth, scene, environment, characters, people, doors, windows, detailed shading, gradient, smooth, realistic, photograph',
    width: 128,
    height: 128,
  },
  {
    filename: 'table_v2.png',
    prompt: 'pixel art sprite of ONE simple wooden coffee table, isolated single furniture object centered on white background, top-down bird eye view, brown wood table with TWO chunky rectangular legs visible, thick 2px black outline around entire table, 48 pixels wide by 32 pixels tall, stardew valley furniture game asset style, minimalist blocky design, NO room, NO floor, NO other objects',
    negative_prompt: 'multiple tables, chairs, room, floor tiles, walls, scene, people, detailed wood grain, realistic, 3d render, photograph, smooth edges, complex details, decorations on table',
    width: 48,
    height: 32,
  },
  {
    filename: 'door_v2.png',
    prompt: 'pixel art sprite of ONE wooden door, isolated single object centered on white background, front view, brown wood door with TWO simple rectangular panels, small gold door handle on right side, thick 2px black outline, 60 pixels wide by 80 pixels tall, stardew valley game asset style, simple clean design, NO doorframe, NO walls, NO room, just the door itself',
    negative_prompt: 'doorframe, walls, room, hallway, floor, multiple doors, open door, person, scene, environment, complex details, realistic wood texture, 3d render, photograph',
    width: 60,
    height: 80,
  },
  {
    filename: 'plant_v2.png',
    prompt: 'pixel art sprite of ONE small potted plant, isolated single object centered on white background, top-down angled view, simple brown terracotta pot with THREE chunky green leaves, thick 2px black outline, 30 pixels wide by 40 pixels tall, stardew valley decorative item style, cute simple design, NO table, NO floor, NO other objects',
    negative_prompt: 'multiple plants, table, shelf, room, floor, detailed leaves, realistic plant, photograph, 3d render, complex foliage, flowers, soil visible',
    width: 30,
    height: 40,
  },
  {
    filename: 'coffee_maker_v2.png',
    prompt: 'pixel art sprite of ONE simple coffee maker machine, isolated single object centered on white background, front view, gray machine body with brown coffee pot below, ONE small red button, thick 2px black outline, 30 pixels wide by 40 pixels tall, stardew valley game item style, chunky minimalist design, NO counter, NO kitchen, NO other objects',
    negative_prompt: 'kitchen, counter, table, multiple machines, steam, person, room, scene, detailed buttons, realistic, 3d render, photograph, complex design, coffee cups',
    width: 30,
    height: 40,
  },
];

async function generateSprite(sprite) {
  console.log(`\n🎨 Generating: ${sprite.filename}`);
  console.log(`   Prompt: ${sprite.prompt.substring(0, 100)}...`);

  try {
    // Use SDXL with very specific settings for clean sprite generation
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: sprite.prompt,
          negative_prompt: sprite.negative_prompt,
          width: sprite.width * 16,  // Generate at 16x for very high quality
          height: sprite.height * 16,
          num_inference_steps: 40,  // More steps for cleaner result
          guidance_scale: 8.5,  // Higher guidance to follow prompt exactly
          scheduler: "DPMSolverMultistep",
          num_outputs: 1,
        }
      }
    );

    const imageUrl = Array.isArray(output) ? output[0] : output;

    console.log(`   📥 Downloading from: ${imageUrl}`);
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const outputPath = path.join(OUTPUT_DIR, sprite.filename);
    fs.writeFileSync(outputPath, buffer);

    console.log(`   ✅ Saved to: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`   ❌ Error generating ${sprite.filename}:`, error.message);
    return false;
  }
}

async function generateBatch2() {
  console.log('🚀 Starting Batch 2 - IMPROVED PROMPTS');
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  console.log(`🎯 Sprites to generate: ${SPRITES_BATCH_2.length}\n`);

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ ERROR: REPLICATE_API_TOKEN not found');
    process.exit(1);
  }

  let successCount = 0;
  let failCount = 0;

  for (const sprite of SPRITES_BATCH_2) {
    const success = await generateSprite(sprite);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    // Wait 3 seconds between requests
    if (sprite !== SPRITES_BATCH_2[SPRITES_BATCH_2.length - 1]) {
      console.log('   ⏳ Waiting 3 seconds...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('✨ Batch 2 Complete!');
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log('='.repeat(50));

  if (successCount > 0) {
    console.log('\n📝 Next: Review sprites at http://localhost:5173/sprite-review.html');
  }
}

generateBatch2().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
