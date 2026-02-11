/**
 * Generate rooster crow sound effect using Replicate API (AudioGen)
 */

import Replicate from 'replicate';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function generateRoosterCrow() {
  console.log('🐓 Generating rooster crow sound effect...\n');

  const prompt = `rooster crowing cock-a-doodle-doo,
morning rooster crow sound,
farm rooster call,
rooster wake up sound,
single rooster crow`;

  try {
    console.log('Prompt:', prompt);
    console.log('\nGenerating with AudioGen...');

    const output = await replicate.run(
      "meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
      {
        input: {
          model_version: "stereo-large",
          prompt: prompt,
          duration: 3,
          temperature: 1,
          top_k: 250,
          top_p: 0,
          classifier_free_guidance: 3
        }
      }
    );

    console.log('✅ Generated!');
    console.log('Output URL:', output);

    // Download the audio
    const response = await fetch(output);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save to assets folder
    const outputPath = path.join(__dirname, '../src/assets/audio/rooster_crow.wav');

    // Create audio directory if it doesn't exist
    const audioDir = path.join(__dirname, '../src/assets/audio');
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, buffer);

    console.log(`\n✅ Saved to: ${outputPath}`);
    console.log('\n🎮 Rooster crow sound ready!');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

generateRoosterCrow();
