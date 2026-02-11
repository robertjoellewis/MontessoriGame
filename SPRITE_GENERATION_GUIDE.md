# Perfect Stardew Valley Sprite Generation Guide

## 🎯 Problem Solved

AI image generators (especially SDXL) tend to generate **scenes** instead of **isolated game assets**. They add backgrounds, extra furniture, and decorative elements we don't want.

## ✅ SOLUTION: FLUX-SCHNELL Model + Specific Prompting

### What Works:
- **Model**: `black-forest-labs/flux-schnell` (NOT stability-ai/sdxl)
- **Framing**: "game sprite icon" or "furniture icon" (NOT "bed in room")
- **Explicit exclusions**: "NO scene, NO other objects, just the [object]"
- **White background**: Easy to remove programmatically

---

## 📋 Proven Workflow

### 1. Generate Sprite with FLUX

**Winning Prompt Template:**
```
pixel art game sprite, single [OBJECT] [TYPE], [COLOR DETAILS],
thick black outline, stardew valley style, 16-bit retro game asset,
isolated on white background, NO other objects, NO scene, just the [OBJECT]
```

**Example (Bed):**
```javascript
{
  prompt: 'pixel art game sprite, single bed furniture icon, brown wood frame, red blanket, white pillow, thick black outline, stardew valley style, 16-bit retro game asset, isolated on white background, NO other objects, NO scene, just the bed, top-down view',
  width: 80,  // Target width
  height: 60, // Target height
}
```

**Generate at 16x size** for high quality: `width: 80 * 16 = 1280px`

### 2. Cleanup Script

After generation, run cleanup to:
1. Remove white background → transparent
2. Auto-crop transparent edges
3. Resize to exact target dimensions with pixel-perfect scaling

**Script pattern:**
```javascript
// 1. Remove white background
const { data, info } = await sharp(inputPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
  if (brightness > 240) {
    data[i + 3] = 0; // Make transparent
  }
}

// 2. Auto-crop
await sharp(tempPath)
  .trim({ threshold: 10 })
  .toFile(croppedPath);

// 3. Resize with pixel-perfect scaling
await sharp(croppedPath)
  .resize(targetWidth, targetHeight, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
    kernel: sharp.kernel.nearest, // Critical for pixel art!
  })
  .png()
  .toFile(outputPath);
```

---

## 🎨 Sprite Specifications

### Furniture Sprites

| Sprite | Size | Colors | Details |
|--------|------|--------|---------|
| Bed | 80x60px | Brown #8B4513, Red #DC143C, White #FFFFFF | Front view, headboard, pillows, blanket |
| Dresser | 48x56px | Brown wood, Gold handles | Front view, 3 drawers |
| Table | 48x32px | Brown wood | Top-down, 2 legs visible |
| Door | 60x80px | Brown wood, Gold handle | Front view, 2 panels |
| Window | 50x40px | Brown frame, Blue glass | 4 panes with cross dividers |

### Decorative Sprites

| Sprite | Size | Colors | Details |
|--------|------|--------|---------|
| Plant | 30x40px | Brown pot, Green leaves | 3 simple leaves |
| Coffee Maker | 30x40px | Gray/black, Brown pot, Red button | Simple machine |
| Rug | 150x100px | Red/orange stripes | Top-down view |

### Style Requirements

**ALL sprites must have:**
- ✅ Thick black outlines (2-3px)
- ✅ Flat colors, minimal shading
- ✅ Chunky, blocky shapes
- ✅ 16-bit retro aesthetic
- ✅ Transparent background
- ✅ NO scene elements
- ✅ Stardew Valley warmth

---

## 🚀 Usage

### Generate One Sprite
```bash
# For bed (proven working)
npm run generate-bed-v4
npm run cleanup-bed
```

### Generate All Sprites
```bash
# Use the template generator
node scripts/generateSpriteTemplate.js

# Then review and cleanup individually
npm run cleanup-sprites
```

### Files
- **Generation**: `/scripts/generateSpriteTemplate.js`
- **Cleanup**: `/scripts/cleanupBedFlux.js` (template for others)
- **Raw sprites**: `/src/assets/sprites/`
- **Cleaned sprites**: `/src/assets/sprites/cleaned/`

---

## ⚠️ Common Issues & Fixes

### Issue: Sprite has background elements (plants, nightstands, etc.)
**Fix**: Regenerate with more aggressive negative prompt
```javascript
negative_prompt: 'scene, room, multiple objects, decorations, plants, lamps, nightstand, floor, walls, realistic, 3d'
```

### Issue: Too realistic, not pixel art
**Fix**: Emphasize in prompt
```
'chunky blocky pixel art, thick 2-3px black outline, flat colors, 16-bit SNES style'
```

### Issue: Multiple objects in one image
**Fix**: Add to prompt
```
'ISOLATED SINGLE OBJECT, product shot, just the [object], nothing else'
```

### Issue: Generated sprite sheet instead of single sprite
**Fix**: Use FLUX model, NOT SDXL
```javascript
model: "black-forest-labs/flux-schnell"  // ✅ Works
model: "stability-ai/sdxl"               // ❌ Makes sprite sheets
```

---

## 🎓 Key Learnings

1. **FLUX > SDXL** for isolated game assets
2. **Frame as "icon"** not "scene"
3. **Explicit exclusions** are critical ("NO other objects")
4. **White background** easier to remove than trying for transparent
5. **Generate large** (16x) then downscale with nearest-neighbor
6. **Thick black outlines** essential for Stardew Valley style
7. **Simple prompts** work better than overly detailed ones

---

## 📊 Success Metrics

✅ **Perfect bed sprite achieved with:**
- FLUX-schnell model
- "game sprite icon" framing
- Explicit "NO scene" exclusions
- White background → cleaned to transparent
- 80x60px final size
- Perfect Stardew Valley aesthetic

**This workflow is now proven and replicable for all other sprites!**
