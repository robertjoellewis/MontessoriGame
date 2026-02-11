/**
 * Download a free rooster crow sound effect
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function downloadRoosterCrow() {
  console.log('🐓 Downloading rooster crow sound effect...\n');

  // Using a free rooster crow from freesound.org (public domain/CC0)
  // This is a standard rooster crow sound
  const url = 'https://cdn.freesound.org/previews/615/615384_2394245-lq.mp3';

  try {
    console.log('Downloading from freesound.org...');

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save to assets folder
    const outputPath = path.join(__dirname, '../src/assets/audio/rooster_crow.mp3');

    // Create audio directory if it doesn't exist
    const audioDir = path.join(__dirname, '../src/assets/audio');
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, buffer);

    console.log(`✅ Downloaded and saved to: ${outputPath}`);
    console.log('🎮 Standard rooster crow ready!');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

downloadRoosterCrow();
