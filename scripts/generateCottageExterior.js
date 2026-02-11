/**
 * Generate Virginia's Cottage Exterior using Replicate API (FLUX model)
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

async function generateCottageExterior() {
  console.log('🏠 Generating Virginia\'s Cottage Exterior with FLUX...\n');

  const prompt = `pixel art game sprite, single rustic cottage house exterior building icon,
cozy small cottage with wood siding and red shingled roof,
front-facing view with centered door and two windows with shutters,
stone chimney on side,
flower boxes under windows,
thick black outline,
stardew valley style,
16-bit retro game asset,
isolated on white background,
NO other objects,
NO scene,
NO interior,
just the cottage building exterior,
chunky pixel art,
warm brown and red colors,
200x180 pixels size`;

  try {
    console.log('Prompt:', prompt);
    console.log('\nGenerating with FLUX-schnell...');

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: prompt,
          num_outputs: 1,
          aspect_ratio: "1:1",
          output_format: "png",
          output_quality: 100
        }
      }
    );

    console.log('✅ Generated!');
    console.log('Output URL:', output[0]);

    // Download the image
    const response = await fetch(output[0]);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save to sprites folder
    const outputPath = path.join(__dirname, '../src/assets/sprites/cottage_exterior_ai.png');
    fs.writeFileSync(outputPath, buffer);

    console.log(`\n✅ Saved to: ${outputPath}`);
    console.log('\n🎨 Now run the cleanup script to remove background and resize:');
    console.log('   node scripts/cleanupCottageExterior.js');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

generateCottageExterior();
