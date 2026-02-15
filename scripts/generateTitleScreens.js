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

const OUTPUT_DIR = path.join(__dirname, '../assets/title_screens');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Title screen specifications
const titleScreenSpecs = [
  {
    filename: 'title_screen_1.png',
    prompt: 'Cozy Montessori classroom title screen, warm wooden shelves with colorful learning materials, soft natural lighting, gentle watercolor art style, "Bluebonnet Montessori" game logo, peaceful educational atmosphere, warm beige and soft green color palette, children\'s learning materials visible, inviting and calm',
    type: 'watercolor'
  },
  {
    filename: 'title_screen_2.png',
    prompt: 'Pixel art title screen for Bluebonnet Montessori game, Stardew Valley inspired style, cozy classroom with wooden furniture, bright colorful Montessori materials on shelves, warm sunset lighting through windows, 16-bit retro game aesthetic, chunky pixels, vibrant but calming colors',
    type: 'pixel_art'
  },
  {
    filename: 'title_screen_3.png',
    prompt: 'Hand-drawn illustration title screen, Bluebonnet Montessori school exterior, charming small building with bluebonnet flowers in front yard, warm afternoon sun, soft pastel colors, storybook illustration style, welcoming entrance door, gentle clouds in sky, peaceful rural setting',
    type: 'illustration'
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

// Generate a single title screen
async function generateTitleScreen(spec) {
  console.log(`\n🎨 Generating ${spec.filename}...`);
  console.log(`   Type: ${spec.type}`);
  console.log(`   Prompt: ${spec.prompt.substring(0, 100)}...`);

  try {
    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: spec.prompt,
          aspect_ratio: "16:9",
          output_format: "png",
          output_quality: 90
        }
      }
    );

    console.log(`   ✓ Generation complete!`);

    // Handle output - get image URL
    let imageUrl;
    if (typeof output === 'string') {
      imageUrl = output;
    } else if (Array.isArray(output) && output.length > 0) {
      imageUrl = output[0];
    } else if (output && typeof output.url === 'function') {
      imageUrl = output.url().toString();
    } else if (output && output.url) {
      imageUrl = output.url;
    } else {
      imageUrl = String(output);
    }

    // Convert to string if needed
    imageUrl = String(imageUrl);

    console.log(`   Image URL: ${imageUrl.substring(0, 80)}...`);

    // Download the generated image
    const outputPath = path.join(OUTPUT_DIR, spec.filename);
    console.log(`   Downloading to ${spec.filename}...`);

    await downloadFile(imageUrl, outputPath);
    console.log(`   ✓ Downloaded successfully!`);

    return { success: true, filename: spec.filename };
  } catch (error) {
    console.error(`   ✗ Error generating ${spec.filename}:`, error);
    return { success: false, filename: spec.filename, error: error.message };
  }
}

// Main function
async function main() {
  console.log('🎨 Generating title screens for Bluebonnet Montessori');
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  console.log(`🔢 Total screens to generate: ${titleScreenSpecs.length}`);

  const results = [];

  // Generate each title screen sequentially
  for (const spec of titleScreenSpecs) {
    const result = await generateTitleScreen(spec);
    results.push(result);

    // Add a delay between requests
    if (titleScreenSpecs.indexOf(spec) < titleScreenSpecs.length - 1) {
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

  console.log(`\n✓ Successful: ${successful.length}/${results.length}`);
  successful.forEach(r => console.log(`  - ${r.filename}`));

  if (failed.length > 0) {
    console.log(`\n✗ Failed: ${failed.length}/${results.length}`);
    failed.forEach(r => console.log(`  - ${r.filename}: ${r.error}`));
  }

  console.log('\n🎉 Title screen generation complete!');
  console.log(`📁 Files saved to: ${OUTPUT_DIR}`);
}

// Run the script
main().catch(console.error);
