#!/usr/bin/env node

/**
 * Cleanup Floor Texture
 * Resize to 128x128 tile (no background removal needed for texture)
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

async function cleanupFloor() {
  console.log('🧹 CLEANING FLOOR TEXTURE\n');

  const inputPath = path.join(SPRITES_DIR, 'floor_v2.png');
  const outputPath = path.join(CLEANED_DIR, 'floor_planks.png');

  if (!fs.existsSync(inputPath)) {
    console.error('❌ floor_v2.png not found!');
    console.log('Run: npm run generate-floor first\n');
    process.exit(1);
  }

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`📐 Input: ${metadata.width}x${metadata.height}px`);

    // Resize to 128x128 using nearest-neighbor (preserves pixel art)
    await sharp(inputPath)
      .resize(128, 128, {
        fit: 'fill',  // Fill entire 128x128 (don't preserve aspect ratio)
        kernel: sharp.kernel.nearest,
      })
      .png()
      .toFile(outputPath);

    const final = await sharp(outputPath).metadata();
    console.log(`✅ Cleaned: ${final.width}x${final.height}px`);
    console.log(`💾 Saved to: cleaned/floor_planks.png\n`);

    console.log('📝 Next: Refresh the game to see the new floor!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

cleanupFloor().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
