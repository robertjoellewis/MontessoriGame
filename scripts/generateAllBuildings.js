/**
 * Generate All Village Building Exteriors using Replicate API (FLUX model)
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

const buildings = [
  {
    name: 'The Rusty Spur',
    filename: 'rusty_spur_ai.png',
    prompt: `pixel art game sprite, single western honky tonk bar building exterior icon,
rustic saloon with swinging doors and wooden porch,
"THE RUSTY SPUR" sign above entrance,
weathered wood siding with red trim,
front-facing view with centered saloon doors,
hitching post out front,
thick black outline,
stardew valley style,
16-bit retro game asset,
isolated on white background,
NO other objects,
NO scene,
just the bar building exterior,
chunky pixel art,
warm brown and red colors,
200x180 pixels size`
  },
  {
    name: 'The Paper Trail',
    filename: 'paper_trail_ai.png',
    prompt: `pixel art game sprite, single stationary store building exterior icon,
charming paper and stationery shop with large display windows,
"THE PAPER TRAIL" sign above entrance,
clean white or cream colored siding,
front-facing view with centered door and large windows,
awning over entrance,
thick black outline,
stardew valley style,
16-bit retro game asset,
isolated on white background,
NO other objects,
NO scene,
just the shop building exterior,
chunky pixel art,
light colors with colorful accents,
200x180 pixels size`
  },
  {
    name: 'Maple & Co. General',
    filename: 'maple_general_ai.png',
    prompt: `pixel art game sprite, single general store building exterior icon,
classic old-fashioned general store with big front porch,
"MAPLE & CO. GENERAL" sign above entrance,
wood siding with covered porch,
front-facing view with centered door and display windows,
barrel and crates on porch,
thick black outline,
stardew valley style,
16-bit retro game asset,
isolated on white background,
NO other objects,
NO scene,
just the store building exterior,
chunky pixel art,
warm natural wood colors,
200x180 pixels size`
  },
  {
    name: 'Mystery House',
    filename: 'mystery_house_ai.png',
    prompt: `pixel art game sprite, single mysterious Victorian house building exterior icon,
spooky mysterious house with ornate details and dark colors,
no sign or name visible,
purple or dark blue siding with gothic accents,
front-facing view with arched door and tall narrow windows,
slightly eerie but whimsical appearance,
thick black outline,
stardew valley style,
16-bit retro game asset,
isolated on white background,
NO other objects,
NO scene,
just the house building exterior,
chunky pixel art,
purple and dark colors,
200x180 pixels size`
  },
  {
    name: 'Harrington Manor',
    filename: 'harrington_manor_ai.png',
    prompt: `pixel art game sprite, single large mansion building exterior icon,
impressive wealthy manor house with grand entrance,
elegant architecture with columns or fancy details,
pristine white or cream colored exterior,
front-facing view with grand centered entrance,
LARGER than other buildings showing wealth,
thick black outline,
stardew valley style,
16-bit retro game asset,
isolated on white background,
NO other objects,
NO scene,
just the manor building exterior,
chunky pixel art,
gold and white colors showing opulence,
240x220 pixels size (larger than standard)`
  },
  {
    name: 'Little Sprouts Montessori',
    filename: 'school_ai.png',
    prompt: `pixel art game sprite, single schoolhouse building exterior icon,
cheerful small school building with welcoming appearance,
"LITTLE SPROUTS MONTESSORI" or just school bell visible,
red brick or painted wood exterior,
front-facing view with centered door and multiple windows,
flag pole or school bell,
thick black outline,
stardew valley style,
16-bit retro game asset,
isolated on white background,
NO other objects,
NO scene,
just the school building exterior,
chunky pixel art,
red and warm welcoming colors,
200x180 pixels size`
  }
];

async function generateBuilding(building) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🏠 Generating ${building.name}...\n`);
  console.log(`Prompt: ${building.prompt}\n`);

  try {
    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: building.prompt,
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
    const outputPath = path.join(__dirname, '../src/assets/sprites', building.filename);
    fs.writeFileSync(outputPath, buffer);

    console.log(`✅ Saved to: ${outputPath}`);
    return true;

  } catch (error) {
    console.error(`❌ Error generating ${building.name}:`, error);
    return false;
  }
}

async function generateAllBuildings() {
  console.log('🏘️ Generating all village building sprites with FLUX...\n');

  let successCount = 0;
  let failCount = 0;

  for (const building of buildings) {
    const success = await generateBuilding(building);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    // Small delay between generations to avoid rate limiting
    if (building !== buildings[buildings.length - 1]) {
      console.log('\n⏳ Waiting 2 seconds before next generation...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`\n✨ GENERATION COMPLETE!`);
  console.log(`✅ Success: ${successCount}/${buildings.length}`);
  if (failCount > 0) {
    console.log(`❌ Failed: ${failCount}/${buildings.length}`);
  }
  console.log(`\n📁 All sprites saved to: src/assets/sprites/`);
  console.log(`\n🎨 Next step: Update VillageScene.js to load and display all sprites`);
}

generateAllBuildings();
