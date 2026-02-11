/**
 * Generate nature-themed cozy retro SNES music
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

async function generateNatureRetroMusic() {
  console.log('🎵 Generating nature-themed cozy retro SNES morning music...\n');

  const prompt = `morning nature ambience with retro game music,
bird chirping sounds mixed with SNES chiptune,
forest morning with gentle 16-bit melody,
real bird songs and nature sounds,
countryside ambience with soft video game music,
chirping birds tweeting singing,
gentle wind and nature with retro beeps,
animal crossing style morning theme,
peaceful outdoor morning sounds,
cozy nature forest atmosphere,
soft natural ambient sounds,
relaxing morning birds and trees`;

  try {
    console.log('Prompt:', prompt);
    console.log('\nGenerating with MusicGen...');

    const output = await replicate.run(
      "meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
      {
        input: {
          model_version: "stereo-large",
          prompt: prompt,
          duration: 30, // 30 seconds loop
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
    const outputPath = path.join(__dirname, '../src/assets/audio/morning_theme_nature.mp3');

    // Create audio directory if it doesn't exist
    const audioDir = path.join(__dirname, '../src/assets/audio');
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, buffer);

    console.log(`\n✅ Saved to: ${outputPath}`);
    console.log('\n🎮 Nature retro music generated!');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

generateNatureRetroMusic();
