# Teaching Success Sound Effect
# A bright, encouraging chime that celebrates accomplishment
# Duration: ~0.75 seconds

use_synth :pretty_bell

# Play a quick ascending major arpeggio with sparkle
with_fx :reverb, room: 0.5, mix: 0.4 do
  # Root note - E major chord
  play :e5, release: 0.3, amp: 0.8
  sleep 0.15

  # Major third
  play :gs5, release: 0.3, amp: 0.9
  sleep 0.15

  # Perfect fifth - brighter and longer for the "ding!"
  play :b5, release: 0.5, amp: 1.0
end

# Add a subtle shimmer on top
sleep 0.05
use_synth :sine
with_fx :echo, phase: 0.1, decay: 2, mix: 0.3 do
  play :e6, release: 0.2, amp: 0.3
end
