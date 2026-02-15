# Classroom Song 3: Warm and Encouraging
# Builds confidence with strong, supportive progression
# Duration: ~32 seconds, loop-able

use_bpm 110

define :encouraging_melody do
  use_synth :piano

  # Strong, confident melody
  play_pattern_timed [:C4, :E4, :G4], [0.75, 0.75, 1.5], amp: 0.75
  play_pattern_timed [:G4, :A4, :B4], [0.75, 0.75, 1.5], amp: 0.75

  play_pattern_timed [:C5, :B4, :A4, :G4], [0.5, 0.5, 0.5, 1.5], amp: 0.75
  play_pattern_timed [:E4, :G4, :C5], [0.75, 0.75, 1.5], amp: 0.75

  # Building confidence
  play_pattern_timed [:A4, :G4, :F4, :E4], [0.5, 0.5, 0.5, 0.5], amp: 0.75
  play_pattern_timed [:D4, :E4, :F4, :G4], [0.5, 0.5, 0.5, 0.5], amp: 0.75

  play_pattern_timed [:C4, :E4, :G4, :C5], [0.5, 0.5, 0.5, 1.5], amp: 0.8
end

define :supportive_chords do
  use_synth :tri

  # Warm, supportive harmony
  play_chord [:C3, :E3, :G3, :C4], release: 3, amp: 0.35
  sleep 3
  play_chord [:G3, :B3, :D4, :G4], release: 3, amp: 0.35
  sleep 3

  play_chord [:A3, :C4, :E4, :A4], release: 3, amp: 0.35
  sleep 3
  play_chord [:C3, :E3, :G3, :C4], release: 3, amp: 0.35
  sleep 3
end

define :confidence_rhythm do
  use_synth :pluck

  # Steady, reassuring pulse
  8.times do
    play :C3, amp: 0.3, release: 0.3
    sleep 0.5
    play :E3, amp: 0.25, release: 0.3
    sleep 0.5
    play :G3, amp: 0.3, release: 0.3
    sleep 1
  end
end

# Main composition
in_thread do
  encouraging_melody
end

in_thread do
  supportive_chords
end

in_thread do
  confidence_rhythm
end

sleep 16
