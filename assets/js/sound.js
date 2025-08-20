// Shared AudioContext and Analyser for visualiser
const AudioCtx = window.AudioContext || window.webkitAudioContext;
export const audioContext = new AudioCtx();
export const analyser = audioContext.createAnalyser();

// Cache Audio elements by file path
const audioCache = {};

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
  if (!soundFilePath) return;
  ensureAudioContextRunning();

  // Reuse cached audio element if available
  let audio = audioCache[soundFilePath];
  if (!audio) {
    audio = new Audio(soundFilePath);
    audioCache[soundFilePath] = audio;
    // Connect to analyser once
    try {
      const src = audioContext.createMediaElementSource(audio);
      src.connect(analyser);
    } catch (e) {}
  }

  // Reset and play
  audio.pause();
  audio.currentTime = 0;

  // Set volume
  const volumeSlider = document.getElementById("volume-slider");
  if (volumeSlider) {
    const v = parseFloat(volumeSlider.value / 100);
    if (!Number.isNaN(v)) audio.volume = v;
  }

  audio.play();
}
