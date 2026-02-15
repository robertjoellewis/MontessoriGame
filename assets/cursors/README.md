# Game Cursor Assets

AI-generated cursor options for Bluebonnet Montessori game.

## Available Cursors

1. **cursor_hand_1.png** - Cute cartoon hand pointer (friendly, warm design)
2. **cursor_hand_2.png** - Pixel art hand pointer (16-bit retro style, matches Stardew aesthetic)
3. **cursor_star_1.png** - Golden sparkly star (whimsical, perfect for teaching moments)
4. **cursor_heart_1.png** - Soft pink/coral heart (nurturing, warm)
5. **cursor_flower_1.png** - Bluebonnet flower (school mascot themed)
6. **cursor_pointer_1.png** - Rounded arrow pointer (soft, friendly)

## How to Implement in Phaser

### Method 1: CSS Cursor (Simple)

Add to your `index.html` or main CSS file:

```css
canvas {
  cursor: url('assets/cursors/cursor_hand_2.png') 16 16, auto;
}
```

The numbers `16 16` are the hotspot coordinates (where the click registers).

### Method 2: Phaser Input Plugin (Advanced)

In your scene's `create()` method:

```javascript
// Hide default cursor
this.input.setDefaultCursor('none');

// Create custom cursor sprite
this.customCursor = this.add.sprite(0, 0, 'cursor')
  .setDepth(10000)
  .setScrollFactor(0);

// Update cursor position
this.input.on('pointermove', (pointer) => {
  this.customCursor.setPosition(pointer.x, pointer.y);
});
```

And in your `preload()`:

```javascript
this.load.image('cursor', 'assets/cursors/cursor_hand_2.png');
```

## Recommended Cursor

**cursor_hand_2.png** (Pixel Art Hand) - Best matches the Stardew Valley aesthetic of the game.

## Cursor Sizes

All cursors are square (1:1 aspect ratio) and approximately 1024x1024px. They may need to be scaled down for actual use:

- For CSS: 32x32 or 48x48 pixels
- For Phaser sprite: Scale to 0.03-0.05 depending on preference

## Notes

- All cursors have transparent backgrounds (PNG format)
- AI-generated, so some may have imperfections
- Choose the cursor that best fits the game's visual style
- Test different sizes to find what feels best for gameplay
