# Naptime Song 3: Soothing and Sleep-Inducing
# Warm, calming tones that invite deep rest
# Duration: ~44 seconds, loop-able

use_bpm 50

define :soothing_melody do
  use_synth :sine

  # Very slow, sleep-inducing melody
  play_pattern_timed [:G3, :B3, :D4], [3, 3, 4], amp: 0.35, release: 2.5
  play_pattern_timed [:C4, :B3, :A3], [3, 3, 4], amp: 0.3, release: 2.5

  play_pattern_timed [:G3, :B3, :D4], [3, 3, 4], amp: 0.3, release: 2.5
  play_pattern_timed [:A3, :G3], [4, 6], amp: 0.25, release: 3
end

define :warm_bass do
  use_synth :fm

  # Deep, warm foundation
  play_pattern_timed [:G2, :D3], [5, 5], amp: 0.2, release: 4.5
  play_pattern_timed [:C3, :G2], [5, 5], amp: 0.2, release: 4.5
  play_pattern_timed [:G2, :D3], [5, 5], amp: 0.18, release: 4.5
  play_pattern_timed [:C3, :G2], [5, 5], amp: 0.18, release: 4.5
end

define :sleep_pad do
  use_synth :dark_ambience

  # Ultra-soft ambient layer
  play_chord [:G3, :B3, :D4, :G4], release: 16, amp: 0.12
  sleep 16
  play_chord [:C4, :E4, :G4, :C5], release: 16, amp: 0.1
  sleep 16
end

define :gentle_pulse do
  use_synth :hollow

  # Very subtle rhythmic comfort
  8.times do
    play :D3, amp: 0.15, release: 2
    sleep 4
    play :G3, amp: 0.12, release: 2
    sleep 2
  end
end

# Main composition
in_thread do
  soothing_melody
end

in_thread do
  warm_bass
end

in_thread do
  sleep_pad
end

in_thread do
  gentle_pulse
end

sleep 32
