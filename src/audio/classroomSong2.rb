# Classroom Song 2: Gentle but Engaging
# Curiosity-inspiring with light, dancing notes
# Duration: ~36 seconds, loop-able

use_bpm 100

define :curious_melody do
  use_synth :kalimba

  # Inquisitive ascending patterns
  play_pattern_timed [:D4, :E4, :F4, :A4], [0.75, 0.75, 0.75, 0.75], amp: 0.7
  play_pattern_timed [:G4, :F4, :E4], [0.75, 0.75, 1.5], amp: 0.7

  play_pattern_timed [:E4, :F4, :G4, :B4], [0.75, 0.75, 0.75, 0.75], amp: 0.7
  play_pattern_timed [:A4, :G4, :F4], [0.75, 0.75, 1.5], amp: 0.7

  # Playful exploration
  play_pattern_timed [:F4, :A4, :D5, :A4], [0.5, 0.5, 0.75, 0.75], amp: 0.7
  play_pattern_timed [:G4, :E4, :D4], [0.75, 0.75, 1.5], amp: 0.7

  play_pattern_timed [:D4, :F4, :A4, :F4, :D4], [0.5, 0.5, 0.5, 0.5, 1], amp: 0.7
end

define :gentle_bass do
  use_synth :fm

  # Soft, supportive bass
  play_pattern_timed [:D3, :D3, :A2, :A2], [3, 3, 3, 3], amp: 0.25, release: 2.5
end

define :sparkle_layer do
  use_synth :bell

  # Add curiosity sparkles
  sleep 1
  play_pattern_timed [:A5, :D5, :F5], [1, 1, 1], amp: 0.2, release: 0.8
  sleep 3
  play_pattern_timed [:G5, :E5, :B4], [1, 1, 1], amp: 0.2, release: 0.8
  sleep 3
end

# Main composition
in_thread do
  curious_melody
end

in_thread do
  gentle_bass
end

in_thread do
  sparkle_layer
end

sleep 12
