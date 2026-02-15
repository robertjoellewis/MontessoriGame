#!/usr/bin/env node

import Replicate from 'replicate';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const TITLE_SCREENS_DIR = path.join(__dirname, '../assets/title_screens');
const CURSORS_DIR = path.join(__dirname, '../assets/cursors');

// Ensure output directories exist
[TITLE_SCREENS_DIR, CURSORS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Title screen specifications (NO TEXT - just beautiful scenes)
const titleScreenSpecs = [
  {
    filename: 'title_notext_1.png',
    prompt: 'Cozy Montessori classroom interior, warm wooden shelves filled with colorful learning materials, pink tower, golden beads, sensorial materials, soft natural sunlight streaming through windows, peaceful educational atmosphere, warm beige and soft green color palette, gentle watercolor art style, inviting and calm, no text, no words',
    type: 'watercolor_classroom'
  },
  {
    filename: 'title_notext_2.png',
    prompt: 'Pixel art Montessori classroom, Stardew Valley inspired style, cozy interior with wooden furniture, bright colorful materials on shelves, warm sunset lighting through windows, 16-bit retro game aesthetic, chunky pixels, vibrant but calming colors, no text, no letters, no words',
    type: 'pixel_art_classroom'
  },
  {
    filename: 'title_notext_3.png',
    prompt: 'Charming small Montessori school building exterior, bluebonnet flowers blooming in front yard, warm afternoon sun, soft pastel colors, storybook illustration style, welcoming entrance door, gentle clouds in sky, peaceful rural Texas setting, hand-drawn illustration, no text, no signs, no words',
    type: 'illustration_exterior'
  },
  {
    filename: 'title_notext_4.png',
    prompt: 'Aerial view of cozy Montessori classroom, children sitting on floor mats working with materials, warm wooden furniture, colorful educational materials, soft natural lighting, peaceful learning environment, gentle art style, warm inviting colors, no text, no words',
    type: 'aerial_classroom'
  },
  {
    filename: 'title_notext_5.png',
    prompt: 'Montessori classroom at golden hour, sunbeams through large windows, dust particles in light, wooden shelves with organized materials, practical life corner, cozy reading nook, plants, warm and inviting atmosphere, painterly style, no text, no words',
    type: 'golden_hour_classroom'
  },
  {
    filename: 'title_notext_6.png',
    prompt: 'Cute pixel art Montessori school exterior with playground, slide, sandbox, bluebonnet flowers, small charming building, retro 16-bit style like Stardew Valley, bright cheerful colors, afternoon sunlight, no text, no words, no signs',
    type: 'pixel_art_exterior'
  }
];

// Cursor specifications (cute cursor options)
const cursorSpecs = [
  {
    filename: 'cursor_hand_1.png',
    prompt: 'Cute cartoon hand cursor icon for game, simple friendly design, warm skin tone, slightly pointing, clean design, white outline, transparent background, game cursor, 32x32 pixels style, no text',
    type: 'hand_pointer'
  },
  {
    filename: 'cursor_hand_2.png',
    prompt: 'Adorable pixel art hand cursor, 16-bit retro style, chunky pixels, warm color, white border, game cursor icon, simple and cute, transparent background, no text',
    type: 'pixel_hand'
  },
  {
    filename: 'cursor_star_1.png',
    prompt: 'Cute sparkly star cursor icon, golden yellow star with white sparkles, friendly game cursor, simple clean design, transparent background, warm friendly style, no text',
    type: 'star_cursor'
  },
  {
    filename: 'cursor_heart_1.png',
    prompt: 'Adorable heart-shaped cursor icon, soft pink or coral color, friendly cute design, game cursor, simple clean style with white outline, transparent background, no text',
    type: 'heart_cursor'
  },
  {
    filename: 'cursor_flower_1.png',
    prompt: 'Cute bluebonnet flower cursor icon, small simple flower design, purple-blue petals, friendly game cursor, clean design with outline, transparent background, no text',
    type: 'flower_cursor'
  },
  {
    filename: 'cursor_pointer_1.png',
    prompt: 'Cute rounded arrow pointer cursor, soft friendly design, warm color palette, simple clean game cursor with white outline, transparent background, cozy style, no text',
    type: 'arrow_pointer'
  }
];

// Download file from URL using fetch
async function downloadFile(url, filepath) {
  try {
    console.log(`   Fetching from: ${url.substring(0, 80)}...`);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fs.writeFileSync(filepath, buffer);

    const stats = fs.statSync(filepath);
    console.log(`   File size: ${(stats.size / 1024).toFixed(2)} KB`);
  } catch (error) {
    throw new Error(`Download failed: ${error.message}`);
  }
}

// Generate a single image
async function generateImage(spec, outputDir, category) {
  console.log(`\n🎨 Generating ${spec.filename}...`);
  console.log(`   Type: ${spec.type}`);
  console.log(`   Prompt: ${spec.prompt.substring(0, 100)}...`);

  try {
    // Use different settings for cursors (square aspect ratio, smaller)
    const isCursor = category === 'cursor';

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: spec.prompt,
          aspect_ratio: isCursor ? "1:1" : "16:9",
          output_format: "png",
          output_quality: 90
        }
      }
    );

    console.log(`   ✓ Generation complete!`);

    // Handle output - get image URL
    let imageUrl = String(output);

    console.log(`   Image URL: ${imageUrl.substring(0, 80)}...`);

    // Download the generated image
    const outputPath = path.join(outputDir, spec.filename);
    console.log(`   Downloading to ${spec.filename}...`);

    await downloadFile(imageUrl, outputPath);
    console.log(`   ✓ Downloaded successfully!`);

    return { success: true, filename: spec.filename, category };
  } catch (error) {
    console.error(`   ✗ Error generating ${spec.filename}:`, error);
    return { success: false, filename: spec.filename, error: error.message, category };
  }
}

// Main function
async function main() {
  console.log('🎨 Generating Visual Assets for Bluebonnet Montessori');
  console.log('=' .repeat(60));

  const results = [];

  // Generate title screens
  console.log('\n📺 TITLE SCREENS (No Text)');
  console.log(`📁 Output directory: ${TITLE_SCREENS_DIR}`);
  console.log(`🔢 Total screens to generate: ${titleScreenSpecs.length}\n`);

  for (const spec of titleScreenSpecs) {
    const result = await generateImage(spec, TITLE_SCREENS_DIR, 'title');
    results.push(result);

    // Add a delay between requests
    if (titleScreenSpecs.indexOf(spec) < titleScreenSpecs.length - 1) {
      console.log('   ⏱️  Waiting 3 seconds before next generation...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  // Generate cursors
  console.log('\n\n🖱️  CURSOR OPTIONS');
  console.log(`📁 Output directory: ${CURSORS_DIR}`);
  console.log(`🔢 Total cursors to generate: ${cursorSpecs.length}\n`);

  for (const spec of cursorSpecs) {
    const result = await generateImage(spec, CURSORS_DIR, 'cursor');
    results.push(result);

    // Add a delay between requests
    if (cursorSpecs.indexOf(spec) < cursorSpecs.length - 1) {
      console.log('   ⏱️  Waiting 3 seconds before next generation...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Generation Summary');
  console.log('='.repeat(60));

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  const titleResults = successful.filter(r => r.category === 'title');
  const cursorResults = successful.filter(r => r.category === 'cursor');

  console.log(`\n✓ Total Successful: ${successful.length}/${results.length}`);

  console.log(`\n📺 Title Screens: ${titleResults.length}`);
  titleResults.forEach(r => console.log(`  - ${r.filename}`));

  console.log(`\n🖱️  Cursors: ${cursorResults.length}`);
  cursorResults.forEach(r => console.log(`  - ${r.filename}`));

  if (failed.length > 0) {
    console.log(`\n✗ Failed: ${failed.length}/${results.length}`);
    failed.forEach(r => console.log(`  - ${r.filename}: ${r.error}`));
  }

  console.log('\n🎉 Asset generation complete!');
  console.log(`📁 Title screens: ${TITLE_SCREENS_DIR}`);
  console.log(`📁 Cursors: ${CURSORS_DIR}`);
}

// Run the script
main().catch(console.error);
