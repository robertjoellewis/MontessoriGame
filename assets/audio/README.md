# Montessori Game Audio Assets

This directory contains all the audio files for the Montessori Game, generated using Replicate's MusicGen API.

## Files Overview

### Classroom Songs (Pre-Naptime - ~35 seconds each)

1. **classroomSong1.mp3** - Playful & Energetic
   - Upbeat piano melody with bright major chords
   - 120 BPM, cheerful and bouncy
   - Perfect for active play time

2. **classroomSong2.mp3** - Curious & Gentle
   - Light kalimba tones with gentle bells
   - 100 BPM, curiosity-inspiring
   - Ideal for exploration activities

3. **classroomSong3.mp3** - Warm & Encouraging
   - Confidence-building piano with supportive harmonies
   - 110 BPM, warm chord progression
   - Great for learning moments

### Naptime Lullabies (~35 seconds each)

4. **naptimeSong1.mp3** - Soft Rocking
   - Gentle lullaby with slow rocking rhythm
   - 60 BPM, soothing sine waves
   - Perfect for transition to rest

5. **naptimeSong2.mp3** - Peaceful & Dreamy
   - Minimal peaceful melody, very slow
   - 55 BPM, dreamy and spacious
   - Calming atmosphere

6. **naptimeSong3.mp3** - Sleep-Inducing
   - Ultra-calming tones with warm bass
   - 50 BPM, deep rest
   - Maximum relaxation

### Sound Effects (~1 second each)

7. **teachingSuccess.mp3** - Success Chime
   - Bright encouraging chime
   - Ascending major arpeggio
   - Celebratory "ding!" for positive feedback

8. **teachingFailure.mp3** - Try Again
   - Gentle descending notes
   - Soft "try again" sound
   - Not harsh, maintains curious feel

## Generation Details

- **Model**: Meta MusicGen (via Replicate)
- **Format**: MP3, stereo
- **Quality**: Stereo-large model with peak normalization
- **Generated**: February 14, 2026

## Usage in Game

These audio files can be loaded in Phaser 3 using:

```javascript
// In preload()
this.load.audio('classroomSong1', 'assets/audio/classroomSong1.mp3');
this.load.audio('teachingSuccess', 'assets/audio/teachingSuccess.mp3');

// In create()
this.sound.play('classroomSong1', { loop: true, volume: 0.5 });
```
