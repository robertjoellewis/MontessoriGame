/**
 * Generate retro video game style morning music using Replicate API (MusicGen)
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

async function generateRetroMorningMusic() {
  console.log('🎵 Generating retro video game style morning music...\n');

  const prompt = `retro 16-bit video game morning town theme,
stardew valley game music style,
8-bit chiptune melody,
cheerful upbeat pixel game soundtrack,
retro SNES style music,
bright morning video game theme,
synthesizer and electronic sounds,
nostalgic retro gaming music,
loop-able game background music,
instrumental only no vocals`;

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
    const outputPath = path.join(__dirname, '../src/assets/audio/morning_theme_retro.mp3');

    // Create audio directory if it doesn't exist
    const audioDir = path.join(__dirname, '../src/assets/audio');
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, buffer);

    console.log(`\n✅ Saved to: ${outputPath}`);
    console.log('\n🎮 Music saved! You can choose which one to use in the game.');
    console.log('   Both tracks are now available in the asset viewer.');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

generateRetroMorningMusic();
