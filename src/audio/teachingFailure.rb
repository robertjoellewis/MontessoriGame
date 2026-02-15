# Teaching Failure Sound Effect
# A gentle, curious "hmm, try again" sound - not harsh or punishing
# Duration: ~0.6 seconds

use_synth :piano

# Soft, gentle descending notes with a questioning feel
with_fx :reverb, room: 0.4, mix: 0.3 do
  # Start higher - curious
  play :c5, release: 0.25, amp: 0.6
  sleep 0.2

  # Descend gently - contemplative
  play :a4, release: 0.25, amp: 0.5
  sleep 0.2

  # End softly - encouraging to try again
  play :f4, release: 0.3, amp: 0.4
end

# Add a very subtle warm tone to keep it gentle
sleep 0.1
use_synth :hollow
with_fx :lpf, cutoff: 80 do
  play :c4, release: 0.2, amp: 0.2
end
