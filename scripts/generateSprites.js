#!/usr/bin/env node

/**
 * Automated Sprite Generation Script
 * Uses Replicate API to generate Stardew Valley-style pixel art sprites
 */

import Replicate from 'replicate';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Initialize Replicate
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Output directory
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'assets', 'sprites');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Sprite definitions with optimized prompts for Stardew Valley style
 */
const SPRITES = [
  {
    filename: 'floor_planks.png',
    prompt: 'pixel art seamless tileable texture, vertical orange wood planks, warm brown and orange colors, wood grain details, 128x128 pixels, stardew valley game style, top-down view, 16-bit style',
    width: 128,
    height: 128,
  },
  {
    filename: 'wallpaper_stripes.png',
    prompt: 'pixel art seamless tileable texture, vertical yellow and orange stripes, bold alternating pattern, warm cottage interior, 128x128 pixels, stardew valley game style, 16-bit style',
    width: 128,
    height: 128,
  },
  {
    filename: 'bed.png',
    prompt: 'pixel art sprite of a cozy bed, wooden headboard, red blanket, white pillow, chunky style with thick dark outlines, 80x60 pixels, stardew valley game furniture style, top-down view, warm colors, simple shapes',
    width: 80,
    height: 60,
  },
  {
    filename: 'dresser.png',
    prompt: 'pixel art sprite of a wooden dresser with 3 drawers, gold handles, chunky blocky style with thick dark outlines, 48x56 pixels, stardew valley furniture style, top-down view, brown wood colors',
    width: 48,
    height: 56,
  },
  {
    filename: 'table.png',
    prompt: 'pixel art sprite of a simple wooden coffee table, two chunky legs visible, thick dark outlines, 48x32 pixels, stardew valley furniture style, top-down view, brown wood, minimalist',
    width: 48,
    height: 32,
  },
  {
    filename: 'door.png',
    prompt: 'pixel art sprite of a wooden door with two panels, gold handle on right side, thick dark outlines, 60x80 pixels, stardew valley style, brown wood door, simple chunky design',
    width: 60,
    height: 80,
  },
  {
    filename: 'window.png',
    prompt: 'pixel art sprite of a window with brown frame, 4 panes, blue sky reflection, chunky cross dividers, thick outlines, 50x40 pixels, stardew valley style, simple design',
    width: 50,
    height: 40,
  },
  {
    filename: 'rug.png',
    prompt: 'pixel art sprite of a decorative rug, red/orange colors, simple stripe pattern, thick dark outline, 150x100 pixels, stardew valley style, top-down view, warm cottage aesthetic',
    width: 150,
    height: 100,
  },
  {
    filename: 'plant.png',
    prompt: 'pixel art sprite of a potted plant, brown pot, green leaves, chunky blocky shapes, thick dark outlines, 30x40 pixels, stardew valley style, simple cute design',
    width: 30,
    height: 40,
  },
  {
    filename: 'coffee_maker.png',
    prompt: 'pixel art sprite of a coffee maker, gray/black machine body, brown coffee pot, red button, chunky style with thick outlines, 30x40 pixels, stardew valley style, simple design',
    width: 30,
    height: 40,
  },
];

/**
 * Generate a single sprite using Replicate API
 */
async function generateSprite(sprite) {
  console.log(`\n🎨 Generating: ${sprite.filename}`);
  console.log(`   Prompt: ${sprite.prompt.substring(0, 80)}...`);

  try {
    // Use SDXL with pixel art optimized settings
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: sprite.prompt,
          negative_prompt: "blurry, smooth, anti-aliased, realistic, 3d, photograph, gradient, soft edges, modern, detailed shading",
          width: sprite.width * 8, // Generate at 8x size for better quality
          height: sprite.height * 8,
          num_inference_steps: 30,
          guidance_scale: 7.5,
          scheduler: "K_EULER",
        }
      }
    );

    // Output is an array of image URLs
    const imageUrl = Array.isArray(output) ? output[0] : output;

    // Download the image
    console.log(`   📥 Downloading from: ${imageUrl}`);
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save to file
    const outputPath = path.join(OUTPUT_DIR, sprite.filename);
    fs.writeFileSync(outputPath, buffer);

    console.log(`   ✅ Saved to: ${outputPath}`);

    return true;
  } catch (error) {
    console.error(`   ❌ Error generating ${sprite.filename}:`, error.message);
    return false;
  }
}

/**
 * Generate all sprites
 */
async function generateAllSprites() {
  console.log('🚀 Starting Stardew Valley Sprite Generation');
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  console.log(`🎯 Total sprites to generate: ${SPRITES.length}\n`);

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ ERROR: REPLICATE_API_TOKEN not found in .env file');
    console.error('Please create a .env file with your Replicate API token:');
    console.error('REPLICATE_API_TOKEN=your_token_here');
    process.exit(1);
  }

  let successCount = 0;
  let failCount = 0;

  // Generate sprites sequentially to avoid rate limits
  for (const sprite of SPRITES) {
    const success = await generateSprite(sprite);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    // Wait 2 seconds between requests to be nice to the API
    if (sprite !== SPRITES[SPRITES.length - 1]) {
      console.log('   ⏳ Waiting 2 seconds before next generation...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('✨ Generation Complete!');
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log('='.repeat(50));

  if (successCount > 0) {
    console.log('\n📝 Next steps:');
    console.log('1. Review generated sprites in: src/assets/sprites/');
    console.log('2. Use image editing software to resize to exact pixel dimensions if needed');
    console.log('3. Run the game to see your new sprites!');
  }
}

// Run the generator
generateAllSprites().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
