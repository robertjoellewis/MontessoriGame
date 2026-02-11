/**
 * Generate a single building sprite with NO TEXT
 */

import Replicate from 'replicate';
import sharp from 'sharp';
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

// Get building name from command line argument
const buildingName = process.argv[2];

const buildings = {
  'rusty_spur': {
    name: 'The Rusty Spur',
    filename: 'rusty_spur_ai.png',
    prompt: `pixel art game sprite, single western style wooden building,
old west barn or tavern with double doors,
weathered brown wood plank walls,
red colored roof,
simple wooden porch with posts,
symmetrical front view,
thick black pixel art outlines,
stardew valley game style,
16-bit retro game building,
white background,
plain wood exterior with zero text,
blank building facade,
simple western architecture,
no signs no words no letters,
clean chunky pixel art,
200x180 pixels size`
  },
  'paper_trail': {
    name: 'The Paper Trail',
    filename: 'paper_trail_ai.png',
    prompt: `pixel art game sprite, single small stationary shop building,
charming storefront with large display windows,
light blue or pale green painted wood siding,
striped awning over entrance,
simple elegant shop design,
front-facing view,
thick black outline,
stardew valley style,
16-bit retro game asset,
white background,
zero text zero signs zero letters,
blank storefront,
use light pastel colors not white,
chunky pixel art,
200x180 pixels`
  },
  'maple_general': {
    name: 'Maple & Co. General',
    filename: 'maple_general_ai.png',
    prompt: `pixel art game sprite, single wooden shop building,
country trading post with porch,
natural brown wood plank siding,
large windows with shutters,
covered wooden porch,
barrel decorations,
plain blank facade,
front-facing view,
thick black outline,
stardew valley style,
16-bit retro game asset,
white background,
blank wood exterior no signage,
no text no words no letters no writing,
brown wood tones only,
simple country building,
chunky pixel art,
200x180 pixels`
  },
  'mystery_house': {
    name: 'Mystery House',
    filename: 'mystery_house_ai.png',
    prompt: `pixel art game sprite, single Victorian house building exterior,
spooky gothic mansion,
dark purple painted siding,
ornate Victorian details,
tall windows and gables,
front-facing view,
thick black outline,
stardew valley style,
16-bit retro game asset,
completely isolated on pure white background,
ABSOLUTELY NO text anywhere,
ABSOLUTELY NO signs,
ABSOLUTELY NO letters or words of any kind,
just the plain house building exterior,
chunky simple pixel art,
200x180 pixels size`
  },
  'harrington_manor': {
    name: 'Harrington Manor',
    filename: 'harrington_manor_ai.png',
    prompt: `pixel art game sprite, single large mansion building exterior,
grand wealthy manor house,
light beige or pale yellow painted exterior,
elegant columns and fancy architecture,
larger impressive building showing wealth,
front-facing symmetrical view,
thick black outline,
stardew valley style,
16-bit retro game asset,
pure white background,
zero text zero signs zero letters,
blank elegant facade,
use cream beige or light gold colors not pure white,
chunky pixel art,
240x220 pixels size`
  },
  'school': {
    name: 'Little Sprouts Montessori',
    filename: 'school_ai.png',
    prompt: `pixel art game sprite, single schoolhouse building exterior,
small one-room schoolhouse,
red brick exterior,
bell on roof,
windows and door,
front-facing view,
thick black outline,
stardew valley style,
16-bit retro game asset,
completely isolated on pure white background,
ABSOLUTELY NO text anywhere,
ABSOLUTELY NO signs,
ABSOLUTELY NO letters or words of any kind,
just the plain school building exterior,
chunky simple pixel art,
200x180 pixels size`
  }
};

async function removeWhiteBackground(buffer) {
    const image = sharp(buffer);
    const { data, info } = await image
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

    const pixels = new Uint8Array(data);
    let changedPixels = 0;

    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        if (r >= 240 && g >= 240 && b >= 240) {
            pixels[i + 3] = 0;
            changedPixels++;
        }
    }

    const outputBuffer = await sharp(pixels, {
        raw: {
            width: info.width,
            height: info.height,
            channels: 4
        }
    })
    .png()
    .toBuffer();

    return { buffer: outputBuffer, changedPixels };
}

async function generateBuilding() {
    if (!buildingName || !buildings[buildingName]) {
        console.log('❌ Invalid building name. Available options:');
        console.log('   rusty_spur, paper_trail, maple_general, mystery_house, harrington_manor, school');
        process.exit(1);
    }

    const building = buildings[buildingName];

    console.log(`\n🏠 Generating ${building.name} (NO TEXT)...\n`);

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

        const response = await fetch(output[0]);
        const arrayBuffer = await response.arrayBuffer();
        let buffer = Buffer.from(arrayBuffer);

        console.log('🎨 Removing white background...');
        const result = await removeWhiteBackground(buffer);
        buffer = result.buffer;
        console.log(`✅ Made ${result.changedPixels} pixels transparent`);

        const outputPath = path.join(__dirname, '../src/assets/sprites', building.filename);
        fs.writeFileSync(outputPath, buffer);

        console.log(`✅ Saved to: ${outputPath}`);
        console.log(`\n🎮 Refresh browser to see updated ${building.name}`);

    } catch (error) {
        console.error(`❌ Error:`, error);
        process.exit(1);
    }
}

generateBuilding();
