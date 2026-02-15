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

const OUTPUT_DIR = path.join(__dirname, '../assets/audio');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Additional sound effect specifications - 800ms with smooth endings
const audioSpecs = [
  // Additional Success Sound Effects (1 second each with smooth fade)
  {
    filename: 'teachingSuccess2.mp3',
    prompt: 'Short cheerful magical sparkle chime with quick gentle fade out, ascending xylophone notes, celebratory uplifting warm bell tones ending softly',
    duration: 1,
    type: 'sfx-success'
  },
  {
    filename: 'teachingSuccess3.mp3',
    prompt: 'Brief positive achievement sound with smooth natural decay, bright piano chord fading gently, encouraging warm tone with soft ending',
    duration: 1,
    type: 'sfx-success'
  },

  // Additional Failure Sound Effects (1 second each with smooth fade)
  {
    filename: 'teachingFailure2.mp3',
    prompt: 'Short gentle curious tone with smooth gentle fade, soft descending marimba notes, friendly non-judgmental sound with warm natural decay',
    duration: 1,
    type: 'sfx-failure'
  },
  {
    filename: 'teachingFailure3.mp3',
    prompt: 'Brief soft thoughtful sound fading smoothly, gentle wooden xylophone descending notes, encouraging try-again feel with warm gentle ending',
    duration: 1,
    type: 'sfx-failure'
  }
];

// Download file from URL using fetch
async function downloadFile(url, filepath) {
  try {
    console.log(`   Fetching from: ${url}`);
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

// Generate a single audio file
async function generateAudio(spec) {
  console.log(`\n🎵 Generating ${spec.filename}...`);
  console.log(`   Type: ${spec.type}`);
  console.log(`   Duration: ${spec.duration}s`);
  console.log(`   Prompt: ${spec.prompt}`);

  try {
    const output = await replicate.run(
      "meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
      {
        input: {
          prompt: spec.prompt,
          duration: spec.duration,
          model_version: "stereo-large",
          output_format: "mp3",
          normalization_strategy: "peak"
        }
      }
    );

    console.log(`   ✓ Generation complete!`);

    // Handle output - Replicate returns a FileOutput object with a url() method
    let audioUrl;
    if (typeof output === 'string') {
      audioUrl = output;
    } else if (output && typeof output.url === 'function') {
      audioUrl = output.url().toString();
    } else if (output && output.url) {
      audioUrl = output.url;
    } else {
      audioUrl = String(output);
    }

    console.log(`   Audio URL: ${audioUrl.substring(0, 80)}...`);

    // Download the generated audio
    const outputPath = path.join(OUTPUT_DIR, spec.filename);
    console.log(`   Downloading to ${spec.filename}...`);

    await downloadFile(audioUrl, outputPath);
    console.log(`   ✓ Downloaded successfully!`);

    return { success: true, filename: spec.filename };
  } catch (error) {
    console.error(`   ✗ Error generating ${spec.filename}:`, error);
    return { success: false, filename: spec.filename, error: error.message };
  }
}

// Main function
async function main() {
  console.log('🎼 Generating additional sound effects for Montessori Game');
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  console.log(`🔢 Total files to generate: ${audioSpecs.length}`);
  console.log(`⏱️  Duration: 800ms each with smooth endings`);

  const results = [];

  // Generate each audio file sequentially to avoid rate limits
  for (const spec of audioSpecs) {
    const result = await generateAudio(spec);
    results.push(result);

    // Add a small delay between requests to be nice to the API
    if (audioSpecs.indexOf(spec) < audioSpecs.length - 1) {
      console.log('   ⏱️  Waiting 2 seconds before next generation...');
      await new Promise(resolve => setTimeout(resolve, 2000));
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

  console.log('\n🎉 Additional sound effects generation complete!');
  console.log(`📁 Files saved to: ${OUTPUT_DIR}`);
}

// Run the script
main().catch(console.error);
