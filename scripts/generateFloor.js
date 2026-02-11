#!/usr/bin/env node

/**
 * Generate Floor Texture - SINGLE ATTEMPT
 * Creates seamless tileable floor with LARGE vertical planks
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

/**
 * Floor Specification
 *
 * REQUIREMENTS:
 * - 128x128 pixel SEAMLESS tile
 * - 2-3 LARGE vertical wooden planks (40-60px wide each)
 * - Planks run vertically (top to bottom)
 * - Edges must align when tiled (seamless pattern)
 * - Warm orange/brown wood color (#D8894C)
 * - Simple wood grain texture
 * - Stardew Valley pixel art style
 */
const FLOOR_SPEC = {
  filename: 'floor_v2.png',
  width: 128,
  height: 128,

  // ULTRA-SPECIFIC PROMPT for seamless tiling
  prompt: `pixel art seamless tileable texture pattern,
  2 or 3 LARGE vertical wooden floor planks,
  each plank 40-60 pixels wide,
  warm orange wood color #D8894C,
  planks run from top to bottom vertically,
  simple horizontal wood grain lines,
  thin dark brown borders between planks,
  MUST tile seamlessly when repeated left-to-right,
  128x128 pixel square tile,
  stardew valley game floor texture style,
  16-bit retro game asset,
  flat top-down view,
  NO perspective, NO 3D depth,
  just a flat tileable pattern`,

  negative_prompt: `furniture, objects, walls, room, scene,
  small planks, horizontal planks, diagonal planks,
  detailed wood grain, realistic texture, photograph,
  3d render, perspective, depth, shadows,
  non-tileable, uneven edges, border frame`
};

async function generateFloor() {
  console.log('🎨 GENERATING FLOOR TEXTURE\n');
  console.log('Specifications:');
  console.log(`  - Size: ${FLOOR_SPEC.width}x${FLOOR_SPEC.height}px`);
  console.log(`  - Style: Seamless tile with 2-3 LARGE vertical planks`);
  console.log(`  - Color: Warm orange wood (#D8894C)`);
  console.log(`  - Must tile seamlessly when repeated\n`);

  console.log('🔄 Generating with FLUX-schnell model...');

  try {
    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: FLOOR_SPEC.prompt,
          negative_prompt: FLOOR_SPEC.negative_prompt,
          width: FLOOR_SPEC.width * 8,  // Generate at 8x for quality
          height: FLOOR_SPEC.height * 8,
          num_outputs: 1,
          num_inference_steps: 4,  // FLUX-schnell is fast, use 4 steps
        }
      }
    );

    const imageUrl = Array.isArray(output) ? output[0] : output;

    console.log('📥 Downloading...');
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const outputPath = path.join(OUTPUT_DIR, FLOOR_SPEC.filename);
    fs.writeFileSync(outputPath, buffer);

    console.log(`✅ SAVED: ${outputPath}\n`);
    console.log('📝 Next Steps:');
    console.log('  1. Review the floor texture');
    console.log('  2. Check if planks are LARGE (40-60px each)');
    console.log('  3. Check if it tiles seamlessly');
    console.log('  4. If good, run: npm run cleanup-floor');
    console.log('  5. If bad, tell me what to adjust in the prompt\n');

    return true;

  } catch (error) {
    console.error('❌ Error generating floor:', error.message);
    return false;
  }
}

generateFloor().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
