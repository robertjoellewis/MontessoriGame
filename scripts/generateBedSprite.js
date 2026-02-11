#!/usr/bin/env node

/**
 * ULTRA-SPECIFIC Bed Sprite Generator
 * This script uses EXTREMELY detailed prompts to generate a perfect isolated bed sprite
 * with NO background, NO scene elements, ONLY the bed itself
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
 * ULTRA-SPECIFIC BED SPRITE PROMPT
 *
 * Key specifications to prevent background generation:
 * 1. "isolated single object" - emphasizes ONE object only
 * 2. "transparent background" or "white background" - no scene
 * 3. "no room, no floor, no walls" - explicitly exclude environments
 * 4. "game sprite asset" - signals this is a UI element, not a scene
 * 5. "product shot" style - like photographing a single item
 * 6. Exact hex colors - prevents AI from adding creative elements
 * 7. "centered" - keeps object in middle, easier to crop
 * 8. Very specific pixel dimensions
 */
const BED_SPRITE_V3 = {
  filename: 'bed_v3_perfect.png',

  // ULTRA-SPECIFIC PROMPT - Layer multiple concepts
  prompt: [
    // Core object definition
    'pixel art game sprite asset',
    'ISOLATED SINGLE OBJECT: one simple bed furniture',
    'product shot centered on pure white background',

    // Exact bed details
    'wooden headboard at top in brown #8B4513',
    'red blanket covering mattress #DC143C',
    'white pillow at top #FFFFFF',

    // Style specifications
    'stardew valley furniture game asset style',
    'chunky blocky shapes with thick 2-3 pixel black #000000 outlines',
    'flat colors, minimal shading, retro 16-bit SNES pixel art',

    // Perspective
    'top-down angled view at 45 degrees',
    'both vertical sides of bed visible',

    // Size
    '80 pixels wide by 60 pixels tall exactly',

    // Critical exclusions
    'ONLY THE BED, nothing else',
    'NO nightstands, NO lamps, NO other furniture',
    'NO room, NO floor tiles, NO walls, NO wallpaper',
    'NO scene, NO environment, NO decorations',
    'white background or transparent background',
  ].join(', '),

  // AGGRESSIVE NEGATIVE PROMPT
  negative_prompt: [
    // Scene elements to exclude
    'room, bedroom scene, interior scene, environment',
    'floor, floor tiles, wooden floor, carpet',
    'walls, wallpaper, wall decoration',
    'nightstand, bedside table, lamp, clock',
    'other furniture, chairs, dresser',
    'people, person, character, sleeping',

    // Style issues
    'realistic, photograph, 3d render, smooth',
    'detailed texture, wood grain detail',
    'soft edges, gradient, anti-aliasing',
    'modern style, complex details',

    // Technical issues
    'blurry, noisy, distorted',
    'multiple beds, many objects',
    'perspective error, isometric',
  ].join(', '),

  width: 80,
  height: 60,
};

/**
 * Generate the bed sprite with optimal settings
 */
async function generateBedSprite() {
  console.log('\n🛏️  PERFECT BED SPRITE GENERATOR');
  console.log('=' .repeat(60));
  console.log('\n📋 Specifications:');
  console.log(`   Target size: ${BED_SPRITE_V3.width}x${BED_SPRITE_V3.height}px`);
  console.log(`   Style: Stardew Valley chunky pixel art`);
  console.log(`   Background: White/transparent (will be removed)`);
  console.log(`   Output: ${BED_SPRITE_V3.filename}\n`);

  console.log('🎨 Prompt Strategy:');
  console.log('   ✓ "isolated single object" - only the bed');
  console.log('   ✓ "product shot" - catalog style, no scene');
  console.log('   ✓ "white background" - easy to remove');
  console.log('   ✓ Explicit hex colors - #8B4513, #DC143C');
  console.log('   ✓ "thick 2-3px black outlines" - Stardew style');
  console.log('   ✓ "NO room, NO floor, NO walls" - aggressive exclusion\n');

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ ERROR: REPLICATE_API_TOKEN not found');
    process.exit(1);
  }

  try {
    console.log('🚀 Starting generation...\n');

    // Use SDXL with maximum quality settings
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: BED_SPRITE_V3.prompt,
          negative_prompt: BED_SPRITE_V3.negative_prompt,

          // Generate at 16x size for ultra quality
          width: BED_SPRITE_V3.width * 16,  // 1280px
          height: BED_SPRITE_V3.height * 16,  // 960px

          // Maximum quality settings
          num_inference_steps: 50,  // More steps = more accurate to prompt
          guidance_scale: 9.0,  // Higher = follow prompt more strictly
          scheduler: "DPMSolverMultistep",  // Best quality scheduler
          num_outputs: 1,
        }
      }
    );

    const imageUrl = Array.isArray(output) ? output[0] : output;

    console.log(`📥 Downloading from Replicate...`);
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const outputPath = path.join(OUTPUT_DIR, BED_SPRITE_V3.filename);
    fs.writeFileSync(outputPath, buffer);

    console.log(`✅ SUCCESS! Saved to: ${outputPath}\n`);

    console.log('📝 Next Steps:');
    console.log('1. REVIEW: Open the image and check:');
    console.log('   - Is it ONLY the bed? (no nightstands, walls, floor)');
    console.log('   - Is it pixel art style? (chunky, thick outlines)');
    console.log('   - Does it match Stardew Valley aesthetic?');
    console.log('');
    console.log('2. If good → Run cleanup: npm run cleanup-sprites');
    console.log('3. If bad → Regenerate with adjusted prompt');
    console.log('');
    console.log('🔍 Review the sprite at:');
    console.log(`   ${outputPath}`);

  } catch (error) {
    console.error('\n❌ Generation failed:', error.message);
    console.error('\nPossible issues:');
    console.error('- Replicate API token invalid');
    console.error('- Network connection problem');
    console.error('- Rate limit exceeded');
    process.exit(1);
  }
}

// Run the generator
generateBedSprite().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
