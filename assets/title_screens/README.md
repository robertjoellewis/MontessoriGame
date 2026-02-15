# Title Screen Assets - Bluebonnet Montessori

AI-generated title screen backgrounds for the game.

## Title Screens With Text (Original)

These contain AI-generated text (with spelling errors):

- `title_screen_1.png` - Watercolor classroom style
- `title_screen_2.png` - Pixel art classroom style
- `title_screen_3.png` - Illustrated school exterior

## Title Screens Without Text (Ready for Manual Overlay)

Clean backgrounds without any text - ready for you to add "Bluebonnet Montessori" title:

1. **title_notext_1.png** - Watercolor Classroom Interior
   - Cozy classroom with colorful learning materials
   - Warm watercolor art style
   - Soft natural lighting

2. **title_notext_2.png** - Pixel Art Classroom
   - Stardew Valley inspired style
   - 16-bit retro aesthetic
   - Cozy interior with wooden furniture

3. **title_notext_3.png** - School Exterior Illustration
   - Charming small school building
   - Bluebonnet flowers in front yard
   - Hand-drawn storybook style

4. **title_notext_4.png** - Aerial Classroom View
   - Top-down perspective of classroom
   - Children working with materials
   - Warm inviting atmosphere

5. **title_notext_5.png** - Golden Hour Classroom
   - Sunbeams through large windows
   - Dust particles in light
   - Painterly artistic style

6. **title_notext_6.png** - Pixel Art School Exterior
   - School with playground (slide, sandbox)
   - Retro 16-bit style
   - Bright cheerful colors

## Recommended Approach

1. Choose your favorite title screen background
2. Use image editing software (Photoshop, GIMP, Figma, etc.) to add:
   - Game title: "Bluebonnet Montessori"
   - Subtitle if desired: "A Montessori Classroom Management Game"
   - Menu buttons: "Start Game", "Continue", "Settings", etc.

3. Export as PNG (1920x1080 or 1280x720)

## Image Specifications

- **Aspect Ratio**: 16:9 (widescreen)
- **Original Size**: ~1024x576 pixels (varies)
- **Format**: PNG with high quality
- **File Size**: 1.2 - 1.5 MB each

## Best for Different Styles

- **Cozy/Warm aesthetic**: title_notext_1.png or title_notext_5.png
- **Pixel art/Retro**: title_notext_2.png or title_notext_6.png
- **Storybook feel**: title_notext_3.png or title_notext_4.png

## Implementation in Phaser

Example TitleScene:

```javascript
class TitleScene extends Phaser.Scene {
  preload() {
    this.load.image('title_bg', 'assets/title_screens/title_notext_2.png');
  }

  create() {
    // Add background
    this.add.image(640, 360, 'title_bg')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(1280, 720);

    // Add your custom text/buttons here
  }
}
```
