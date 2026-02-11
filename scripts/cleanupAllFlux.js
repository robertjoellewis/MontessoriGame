#!/usr/bin/env node

/**
 * Cleanup All FLUX-Generated Sprites
 * Removes backgrounds, crops, and resizes to exact game dimensions
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SPRITES_DIR = path.join(__dirname, '..', 'src', 'assets', 'sprites');
const CLEANED_DIR = path.join(SPRITES_DIR, 'cleaned');

if (!fs.existsSync(CLEANED_DIR)) {
  fs.mkdirSync(CLEANED_DIR, { recursive: true });
}

/**
 * All sprite specifications for cleanup
 */
const SPRITES = [
  { input: 'bed_v4_flux.png', output: 'bed.png', width: 80, height: 60 },
  { input: 'table_flux.png', output: 'table.png', width: 48, height: 32 },
  { input: 'dresser_flux.png', output: 'dresser.png', width: 48, height: 56 },
  { input: 'door_flux.png', output: 'door.png', width: 60, height: 80 },
  { input: 'window_flux.png', output: 'window.png', width: 50, height: 40 },
  { input: 'plant_flux.png', output: 'plant.png', width: 30, height: 40 },
  { input: 'coffee_maker_flux.png', output: 'coffee_maker.png', width: 30, height: 40 },
  { input: 'rug_flux.png', output: 'rug.png', width: 150, height: 100 },
  { input: 'floor_planks.png', output: 'floor_planks.png', width: 128, height: 128 },
];

/**
 * Process a single sprite: remove background, crop, resize
 */
async function processSprite(sprite) {
  const inputPath = path.join(SPRITES_DIR, sprite.input);
  const outputPath = path.join(CLEANED_DIR, sprite.output);

  console.log(`\n🎨 Processing: ${sprite.input}`);
  console.log(`   Target: ${sprite.width}x${sprite.height}px`);

  if (!fs.existsSync(inputPath)) {
    console.log(`   ⏭️  SKIP - File not found`);
    return false;
  }

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    console.log(`   📐 Input: ${metadata.width}x${metadata.height}px`);

    // Step 1: Convert to RGBA and remove white background
    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Make white/light pixels transparent
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const brightness = (r + g + b) / 3;

      // If very light (close to white), make transparent
      if (brightness > 240) {
        data[i + 3] = 0;
      }
    }

    // Step 2: Create temp file with transparent background
    const tempPath = path.join(SPRITES_DIR, `temp_${sprite.output}`);
    await sharp(data, {
      raw: { width: info.width, height: info.height, channels: 4 }
    }).png().toFile(tempPath);

    // Step 3: Trim transparent edges
    const tempPath2 = path.join(SPRITES_DIR, `temp2_${sprite.output}`);
    await sharp(tempPath)
      .trim({ background: { r: 255, g: 255, b: 255, alpha: 0 }, threshold: 10 })
      .toFile(tempPath2);

    const trimmed = await sharp(tempPath2).metadata();
    console.log(`   ✂️  Cropped: ${trimmed.width}x${trimmed.height}px`);

    // Step 4: Resize to target with nearest-neighbor (preserves pixel art)
    await sharp(tempPath2)
      .resize(sprite.width, sprite.height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
        kernel: sharp.kernel.nearest,
      })
      .png()
      .toFile(outputPath);

    // Cleanup temp files
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    if (fs.existsSync(tempPath2)) fs.unlinkSync(tempPath2);

    const final = await sharp(outputPath).metadata();
    console.log(`   ✅ Final: ${final.width}x${final.height}px → ${outputPath.split('/').pop()}`);
    return true;

  } catch (error) {
    console.error(`   ❌ Error:`, error.message);
    return false;
  }
}

/**
 * Process all sprites
 */
async function cleanupAll() {
  console.log('🧹 CLEANING UP ALL FLUX SPRITES\n');
  console.log('Process: Remove backgrounds → Crop → Resize → Save\n');

  let successCount = 0;
  let failCount = 0;

  for (const sprite of SPRITES) {
    const success = await processSprite(sprite);
    if (success) successCount++;
    else failCount++;
  }

  console.log('\n' + '='.repeat(60));
  console.log('✨ CLEANUP COMPLETE!');
  console.log(`✅ Success: ${successCount}/${SPRITES.length}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log('='.repeat(60));

  if (successCount > 0) {
    console.log('\n📁 Cleaned sprites saved to: src/assets/sprites/cleaned/');
    console.log('🎮 Refresh the game to see them!');
  }
}

cleanupAll().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
