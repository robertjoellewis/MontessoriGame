# Naptime Song 2: Peaceful and Dreamy
# Minimal notes with spacious, dreamy quality
# Duration: ~36 seconds, loop-able

use_bpm 55

define :dreamy_melody do
  use_synth :prophet

  # Sparse, peaceful melody
  play :E4, amp: 0.35, release: 3
  sleep 4

  play :G4, amp: 0.3, release: 3
  sleep 4

  play :A4, amp: 0.35, release: 4
  sleep 5

  play :G4, amp: 0.3, release: 3
  sleep 4

  play :E4, amp: 0.25, release: 4
  sleep 5
end

define :peaceful_pad do
  use_synth :pad

  # Gentle, sustained harmony
  play_chord [:E3, :G3, :B3], release: 12, amp: 0.2
  sleep 12
  play_chord [:A3, :C4, :E4], release: 12, amp: 0.18
  sleep 12
end

define :whisper_notes do
  use_synth :sine

  # Very soft, high whispers
  sleep 2
  play :B5, amp: 0.15, release: 2
  sleep 6
  play :A5, amp: 0.12, release: 2
  sleep 6
  play :G5, amp: 0.15, release: 3
  sleep 10
end

# Main composition
in_thread do
  dreamy_melody
end

in_thread do
  peaceful_pad
end

in_thread do
  whisper_notes
end

sleep 24
