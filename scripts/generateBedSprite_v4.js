#!/usr/bin/env node

/**
 * BED SPRITE V4 - GAME ASSET ICON APPROACH
 *
 * New strategy: Frame as "game asset icon" or "inventory item"
 * This should signal to the AI that we want JUST the object
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
 * ATTEMPT #4: GAME ASSET ICON FRAMING
 *
 * Key change: Frame as "icon" or "inventory sprite"
 * This tells AI we want a UI element, not a scene
 */
const BED_SPRITE_V4 = {
  filename: 'bed_v4_icon.png',

  // NEW APPROACH: Frame as game UI icon/asset
  prompt: [
    // Primary framing - this is an ICON
    'video game furniture icon sprite',
    'single bed furniture asset for game inventory',
    'ICON ONLY on plain white background',

    // Object description
    'simple pixel art bed',
    'brown wooden frame',
    'red quilted blanket',
    'white pillow at headboard',

    // Technical specs
    'stardew valley pixel art style',
    'thick black outlines 2px',
    'chunky retro 16-bit sprites',
    'flat colors minimal shading',
    'top-down 45 degree angle view',

    // Critical: What this is NOT
    'JUST THE BED ICON',
    'NO other objects around it',
    'NO plants NO lamps NO nightstands',
    'NO bedroom scene NO floor NO walls',
    'isolated object centered on white',
    'product catalog style single item',
  ].join(', '),

  negative_prompt: [
    'scene, room, bedroom, interior',
    'multiple objects, decorations, plants',
    'nightstand, table, lamp, pot',
    'floor, carpet, rug, tiles',
    'walls, wallpaper, background details',
    'people, characters, animals',
    'realistic, 3d render, photograph',
    'smooth, gradient, anti-aliased',
    'complex details, wood grain texture',
  ].join(', '),

  width: 80,
  height: 60,
};

/**
 * Alternative: Try FLUX model which may be better at following prompts
 */
const BED_SPRITE_V4_FLUX = {
  filename: 'bed_v4_flux.png',

  prompt: 'pixel art game sprite, single bed furniture icon, brown wood frame, red blanket, white pillow, thick black outline, stardew valley style, 16-bit retro game asset, isolated on white background, NO other objects, NO scene, just the bed, top-down view',

  negative_prompt: 'scene, room, plants, lamps, nightstand, floor, walls, multiple objects, realistic, 3d',

  width: 80,
  height: 60,
};

async function generateWithSDXL() {
  console.log('\n🎨 ATTEMPT 1: SDXL with "game icon" framing');
  console.log('=' .repeat(60));

  try {
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: BED_SPRITE_V4.prompt,
          negative_prompt: BED_SPRITE_V4.negative_prompt,
          width: BED_SPRITE_V4.width * 16,
          height: BED_SPRITE_V4.height * 16,
          num_inference_steps: 50,
          guidance_scale: 10.0,  // Even higher guidance
          scheduler: "DPMSolverMultistep",
        }
      }
    );

    const imageUrl = Array.isArray(output) ? output[0] : output;
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const outputPath = path.join(OUTPUT_DIR, BED_SPRITE_V4.filename);
    fs.writeFileSync(outputPath, buffer);

    console.log(`✅ SDXL version saved: ${outputPath}\n`);
    return outputPath;
  } catch (error) {
    console.error(`❌ SDXL failed:`, error.message);
    return null;
  }
}

async function generateWithFlux() {
  console.log('\n🎨 ATTEMPT 2: FLUX-SCHNELL (faster model)');
  console.log('=' .repeat(60));

  try {
    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: BED_SPRITE_V4_FLUX.prompt,
          num_inference_steps: 4,  // Flux-schnell is optimized for 4 steps
          width: BED_SPRITE_V4_FLUX.width * 16,
          height: BED_SPRITE_V4_FLUX.height * 16,
          num_outputs: 1,
        }
      }
    );

    const imageUrl = Array.isArray(output) ? output[0] : output;
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const outputPath = path.join(OUTPUT_DIR, BED_SPRITE_V4_FLUX.filename);
    fs.writeFileSync(outputPath, buffer);

    console.log(`✅ FLUX version saved: ${outputPath}\n`);
    return outputPath;
  } catch (error) {
    console.error(`❌ FLUX failed:`, error.message);
    return null;
  }
}

async function generateBothVersions() {
  console.log('\n🛏️  BED SPRITE GENERATOR V4 - DUAL APPROACH');
  console.log('=' .repeat(60));
  console.log('\nStrategy: Generate with TWO different models');
  console.log('1. SDXL - High quality, "game icon" framing');
  console.log('2. FLUX - Fast model, may follow prompts better\n');

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ ERROR: REPLICATE_API_TOKEN not found');
    process.exit(1);
  }

  const results = [];

  // Try SDXL first
  const sdxlPath = await generateWithSDXL();
  if (sdxlPath) results.push(sdxlPath);

  // Wait 3 seconds
  console.log('⏳ Waiting 3 seconds...\n');
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Try FLUX
  const fluxPath = await generateWithFlux();
  if (fluxPath) results.push(fluxPath);

  console.log('\n' + '=' .repeat(60));
  console.log('✨ GENERATION COMPLETE');
  console.log('=' .repeat(60));
  console.log(`\n📊 Generated ${results.length} versions\n`);

  results.forEach((path, i) => {
    console.log(`${i + 1}. ${path}`);
  });

  console.log('\n📝 REVIEW BOTH SPRITES:');
  console.log('Check which one has:');
  console.log('  ✓ ONLY the bed (no plants, lamps, nightstands)');
  console.log('  ✓ Pixel art style (chunky, thick outlines)');
  console.log('  ✓ Stardew Valley aesthetic');
  console.log('  ✓ White/light background (easy to remove)');
  console.log('\nThen choose the best one for cleanup!');
}

generateBothVersions().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
