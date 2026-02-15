# Classroom Song 1: Playful and Energetic
# Bright major chords with a bouncy rhythm
# Duration: ~40 seconds, loop-able

use_bpm 120

define :playful_melody do
  use_synth :piano

  # Main playful theme
  play_pattern_timed [:C4, :E4, :G4, :C5], [0.5, 0.5, 0.5, 0.5], amp: 0.8
  play_pattern_timed [:B4, :G4, :E4, :D4], [0.5, 0.5, 0.5, 0.5], amp: 0.8
  play_pattern_timed [:C4, :E4, :G4, :E4], [0.5, 0.5, 0.5, 0.5], amp: 0.8
  play_pattern_timed [:D4, :F4, :A4, :F4], [0.5, 0.5, 0.5, 0.5], amp: 0.8

  # Variation
  play_pattern_timed [:E4, :G4, :B4, :G4], [0.5, 0.5, 0.5, 0.5], amp: 0.8
  play_pattern_timed [:F4, :A4, :C5, :A4], [0.5, 0.5, 0.5, 0.5], amp: 0.8
  play_pattern_timed [:G4, :E4, :C4, :E4], [0.5, 0.5, 0.5, 0.5], amp: 0.8
  play_pattern_timed [:C4, :D4, :E4, :C4], [0.5, 0.5, 0.5, 1], amp: 0.8
end

define :accompaniment do
  use_synth :beep

  # Bright chord accompaniment
  4.times do
    play_chord [:C3, :E3, :G3], release: 1.5, amp: 0.3
    sleep 2
    play_chord [:F3, :A3, :C4], release: 1.5, amp: 0.3
    sleep 2
  end
end

# Main composition
in_thread do
  playful_melody
end

in_thread do
  accompaniment
end

# Add percussive rhythm
in_thread do
  use_synth :drum_cymbal_closed
  16.times do
    play :C3, amp: 0.2, release: 0.1
    sleep 0.5
  end
end

sleep 16
