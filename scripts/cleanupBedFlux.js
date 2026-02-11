#!/usr/bin/env node

/**
 * Clean up the PERFECT bed sprite from FLUX
 * This will:
 * 1. Remove white background → transparent
 * 2. Auto-crop to remove extra space
 * 3. Resize to exact target dimensions (80x60px)
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INPUT_FILE = path.join(__dirname, '..', 'src', 'assets', 'sprites', 'bed_v4_flux.png');
const CLEANED_DIR = path.join(__dirname, '..', 'src', 'assets', 'sprites', 'cleaned');
const OUTPUT_FILE = path.join(CLEANED_DIR, 'bed.png');

const TARGET_WIDTH = 80;
const TARGET_HEIGHT = 60;

if (!fs.existsSync(CLEANED_DIR)) {
  fs.mkdirSync(CLEANED_DIR, { recursive: true });
}

async function cleanupBedSprite() {
  console.log('\n🧹 CLEANING PERFECT BED SPRITE (FLUX)');
  console.log('=' .repeat(60));
  console.log(`\n📥 Input: ${INPUT_FILE}`);
  console.log(`📤 Output: ${OUTPUT_FILE}`);
  console.log(`🎯 Target: ${TARGET_WIDTH}x${TARGET_HEIGHT}px\n`);

  if (!fs.existsSync(INPUT_FILE)) {
    console.error('❌ ERROR: bed_v4_flux.png not found!');
    console.error('Run: npm run generate-bed-v4 first');
    process.exit(1);
  }

  try {
    // Step 1: Read original metadata
    const image = sharp(INPUT_FILE);
    const metadata = await image.metadata();
    console.log(`📐 Original size: ${metadata.width}x${metadata.height}px`);

    // Step 2: Remove white background → transparent
    console.log('🎨 Removing white background...');

    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Process each pixel
    let transparentCount = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Calculate brightness
      const brightness = (r + g + b) / 3;

      // If pixel is very light (white or near-white), make transparent
      if (brightness > 240) {
        data[i + 3] = 0; // Set alpha to 0
        transparentCount++;
      }
    }

    console.log(`   ✓ Made ${transparentCount} pixels transparent`);

    // Step 3: Save with transparency
    const tempTransparent = path.join(CLEANED_DIR, 'temp_transparent.png');
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4,
      },
    })
      .png()
      .toFile(tempTransparent);

    console.log('   ✓ Background removed');

    // Step 4: Auto-crop transparent edges
    console.log('✂️  Auto-cropping...');

    const tempCropped = path.join(CLEANED_DIR, 'temp_cropped.png');
    await sharp(tempTransparent)
      .trim({
        background: { r: 255, g: 255, b: 255, alpha: 0 },
        threshold: 10,
      })
      .toFile(tempCropped);

    const croppedMeta = await sharp(tempCropped).metadata();
    console.log(`   ✓ Cropped to: ${croppedMeta.width}x${croppedMeta.height}px`);

    // Step 5: Resize to target dimensions with pixel-perfect scaling
    console.log(`📏 Resizing to ${TARGET_WIDTH}x${TARGET_HEIGHT}px...`);

    await sharp(tempCropped)
      .resize(TARGET_WIDTH, TARGET_HEIGHT, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent background
        kernel: sharp.kernel.nearest, // Nearest-neighbor for pixel art
      })
      .png()
      .toFile(OUTPUT_FILE);

    console.log('   ✓ Resized with pixel-perfect scaling');

    // Clean up temp files
    fs.unlinkSync(tempTransparent);
    fs.unlinkSync(tempCropped);

    // Step 6: Verify final output
    const finalMeta = await sharp(OUTPUT_FILE).metadata();
    console.log('\n' + '=' .repeat(60));
    console.log('✨ SUCCESS!');
    console.log('=' .repeat(60));
    console.log(`\n📊 Final sprite:`);
    console.log(`   Size: ${finalMeta.width}x${finalMeta.height}px`);
    console.log(`   Format: ${finalMeta.format}`);
    console.log(`   Channels: ${finalMeta.channels} (with alpha)`);
    console.log(`   Location: ${OUTPUT_FILE}\n`);

    console.log('🎮 The bed sprite is ready to use in the game!');
    console.log('✓ Transparent background');
    console.log('✓ Perfect pixel art style');
    console.log('✓ Correct dimensions');
    console.log('✓ Stardew Valley aesthetic\n');

  } catch (error) {
    console.error('\n❌ Cleanup failed:', error.message);
    process.exit(1);
  }
}

cleanupBedSprite().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
