#!/usr/bin/env node

/**
 * Sprite Cleanup Script
 * Removes backgrounds, resizes, and prepares AI-generated sprites for game use
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SPRITES_DIR = path.join(__dirname, '..', 'src', 'assets', 'sprites');
const CLEANED_DIR = path.join(__dirname, '..', 'src', 'assets', 'sprites', 'cleaned');

// Ensure cleaned directory exists
if (!fs.existsSync(CLEANED_DIR)) {
  fs.mkdirSync(CLEANED_DIR, { recursive: true });
}

/**
 * Sprite specifications - target sizes and cleanup needs
 */
const SPRITE_SPECS = {
  'floor_planks.png': {
    targetWidth: 128,
    targetHeight: 128,
    needsBackground: false, // Texture can keep background
    description: 'Floor texture tile',
  },
  'bed.png': {
    targetWidth: 80,
    targetHeight: 60,
    needsBackground: true, // Remove white background
    description: 'Bed furniture sprite',
  },
  'dresser.png': {
    targetWidth: 48,
    targetHeight: 56,
    needsBackground: true,
    description: 'Dresser furniture sprite',
  },
  'window.png': {
    targetWidth: 50,
    targetHeight: 40,
    needsBackground: true,
    description: 'Window decoration sprite',
  },
  'rug.png': {
    targetWidth: 150,
    targetHeight: 100,
    needsBackground: true,
    description: 'Rug decoration sprite',
  },
};

/**
 * Remove white/light background and make transparent
 */
async function removeBackground(inputPath, outputPath) {
  try {
    // Read the image
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`   📐 Original size: ${metadata.width}x${metadata.height}`);

    // Convert to raw pixel data
    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Process pixels - make white/light pixels transparent
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // If pixel is very light (close to white), make it transparent
      const brightness = (r + g + b) / 3;
      if (brightness > 240) {
        data[i + 3] = 0; // Set alpha to 0 (fully transparent)
      }
    }

    // Create new image from processed data
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4,
      },
    })
      .png()
      .toFile(outputPath);

    console.log(`   ✅ Background removed`);
    return outputPath;
  } catch (error) {
    console.error(`   ❌ Error removing background:`, error.message);
    throw error;
  }
}

/**
 * Auto-crop transparent edges
 */
async function autoCrop(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .trim({
        background: { r: 255, g: 255, b: 255, alpha: 0 }, // Trim transparent pixels
        threshold: 10,
      })
      .toFile(outputPath);

    const metadata = await sharp(outputPath).metadata();
    console.log(`   ✂️  Cropped to: ${metadata.width}x${metadata.height}`);
    return outputPath;
  } catch (error) {
    console.error(`   ❌ Error cropping:`, error.message);
    throw error;
  }
}

/**
 * Resize to target dimensions
 */
async function resizeToTarget(inputPath, outputPath, targetWidth, targetHeight) {
  try {
    await sharp(inputPath)
      .resize(targetWidth, targetHeight, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
        kernel: sharp.kernel.nearest, // Use nearest-neighbor for pixel art
      })
      .png()
      .toFile(outputPath);

    console.log(`   📏 Resized to: ${targetWidth}x${targetHeight}`);
    return outputPath;
  } catch (error) {
    console.error(`   ❌ Error resizing:`, error.message);
    throw error;
  }
}

/**
 * Process a single sprite
 */
async function processSprite(filename, spec) {
  console.log(`\n🎨 Processing: ${filename}`);
  console.log(`   Target: ${spec.targetWidth}x${spec.targetHeight} - ${spec.description}`);

  const inputPath = path.join(SPRITES_DIR, filename);
  const tempBgRemoved = path.join(CLEANED_DIR, `temp_bg_${filename}`);
  const tempCropped = path.join(CLEANED_DIR, `temp_crop_${filename}`);
  const outputPath = path.join(CLEANED_DIR, filename);

  if (!fs.existsSync(inputPath)) {
    console.log(`   ⏭️  Skipped - file not found`);
    return;
  }

  try {
    let currentPath = inputPath;

    // Step 1: Remove background (if needed)
    if (spec.needsBackground) {
      await removeBackground(currentPath, tempBgRemoved);
      currentPath = tempBgRemoved;

      // Step 2: Auto-crop transparent edges
      await autoCrop(currentPath, tempCropped);
      currentPath = tempCropped;
    }

    // Step 3: Resize to target dimensions
    await resizeToTarget(currentPath, outputPath, spec.targetWidth, spec.targetHeight);

    // Clean up temp files
    if (fs.existsSync(tempBgRemoved)) fs.unlinkSync(tempBgRemoved);
    if (fs.existsSync(tempCropped)) fs.unlinkSync(tempCropped);

    console.log(`   ✨ Success! Saved to: cleaned/${filename}`);
    return true;
  } catch (error) {
    console.error(`   💥 Failed to process ${filename}:`, error.message);
    return false;
  }
}

/**
 * Process all sprites
 */
async function cleanupAllSprites() {
  console.log('🧹 Starting Sprite Cleanup Process\n');
  console.log('This will:');
  console.log('  1. Remove white backgrounds → transparent');
  console.log('  2. Auto-crop extra space');
  console.log('  3. Resize to exact game dimensions');
  console.log('  4. Save to: src/assets/sprites/cleaned/\n');

  let successCount = 0;
  let failCount = 0;

  for (const [filename, spec] of Object.entries(SPRITE_SPECS)) {
    const success = await processSprite(filename, spec);
    if (success) successCount++;
    else failCount++;
  }

  console.log('\n' + '='.repeat(60));
  console.log('✨ Cleanup Complete!');
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log('='.repeat(60));

  console.log('\n📝 Next Steps:');
  console.log('1. Review cleaned sprites in: src/assets/sprites/cleaned/');
  console.log('2. If good, they will be used in the game automatically');
  console.log('3. Check the game to see the cleaned sprites!');
}

// Run cleanup
cleanupAllSprites().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
