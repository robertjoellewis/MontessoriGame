# Naptime Song 1: Soft Rocking Rhythm
# Gentle lullaby with slow, soothing rocking motion
# Duration: ~40 seconds, loop-able

use_bpm 60

define :lullaby_melody do
  use_synth :sine

  # Soft, gentle rocking melody
  play_pattern_timed [:C4, :E4, :G4, :E4], [2, 2, 3, 1], amp: 0.4, release: 2
  play_pattern_timed [:F4, :E4, :D4], [2, 2, 4], amp: 0.4, release: 2

  play_pattern_timed [:C4, :E4, :G4, :E4], [2, 2, 3, 1], amp: 0.35, release: 2
  play_pattern_timed [:D4, :C4], [3, 5], amp: 0.35, release: 3
end

define :soft_accompaniment do
  use_synth :hollow

  # Slow, rocking bass
  play_pattern_timed [:C3, :G3], [4, 4], amp: 0.25, release: 3.5
  play_pattern_timed [:F3, :C3], [4, 4], amp: 0.25, release: 3.5
  play_pattern_timed [:C3, :G3], [4, 4], amp: 0.25, release: 3.5
  play_pattern_timed [:F3, :C3], [4, 4], amp: 0.25, release: 3.5
end

define :dreamy_layer do
  use_synth :pad

  # Very soft ambient pad
  play_chord [:C4, :E4, :G4], release: 8, amp: 0.15
  sleep 8
  play_chord [:F4, :A4, :C5], release: 8, amp: 0.15
  sleep 8
end

# Main composition
in_thread do
  lullaby_melody
end

in_thread do
  soft_accompaniment
end

in_thread do
  dreamy_layer
end

sleep 16
