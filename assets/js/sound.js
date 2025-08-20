
// Shared AudioContext and Analyser for visualiser
const AudioCtx = window.AudioContext || window.webkitAudioContext;
export const audioContext = new AudioCtx();
export const analyser = audioContext.createAnalyser();

// Configure analyser (adjust as desired)
analyser.fftSize = 32; 
analyser.smoothingTimeConstant = 0.9;
// Ensure analyser feeds the speakers so media routed through it is audible
analyser.connect(audioContext.destination);

function ensureAudioContextRunning() {
  if (audioContext.state !== "running") {
    audioContext.resume();
  }
}

export function playSound(soundFilePath) {
  // Play audio if available for this note (allow overlapping sounds)
  if (!soundFilePath) return;

  ensureAudioContextRunning();

  const audio = new Audio(soundFilePath);

  // Use existing slider value (0..1)
  const volumeSlider = document.getElementById("volume-slider");
  if (volumeSlider) {
    const v = parseFloat(volumeSlider.value/100);
    if (!Number.isNaN(v)) audio.volume = v;
  }

  // Feed this audio element into the analyser so the visualiser can read it
  try {
    const src = audioContext.createMediaElementSource(audio);
  // Route through analyser (which is connected to destination)
  src.connect(analyser);
  } catch (e) {

  }

  audio.currentTime = 0;
  audio.play();
}

