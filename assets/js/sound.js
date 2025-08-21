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

// Track active audio elements for cleanup
const activeAudioElements = new Set();
const CLEANUP_DELAY = 3000; // 3 seconds after audio ends

function ensureAudioContextRunning() {
  if (audioContext.state !== "running") {
    audioContext.resume();
  }
}

function cleanupAudioElement(audio, source) {
  // Remove from tracking
  activeAudioElements.delete(audio);

  // Disconnect and clean up the source
  if (source) {
    source.disconnect();
  }

  // Remove event listeners
  audio.removeEventListener("ended", audio._endedHandler);
  audio.removeEventListener("pause", audio._pauseHandler);

  // Clear the audio source to free memory
  audio.src = "";
  audio.load(); // Reset the audio element
}

export function playSound(soundFilePath) {
  if (!soundFilePath) return;
  ensureAudioContextRunning();

  // Reuse cached audio element if available
  let audio = audioCache[soundFilePath];
  if (!audio) {
    audio = new Audio(soundFilePath);

    // Track this audio element
    activeAudioElements.add(audio);
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

  // Feed this audio element into the analyser so the visualiser can read it
  let source = null;
  try {
    source = audioContext.createMediaElementSource(audio);
    // Route through analyser (which is connected to destination)
    source.connect(analyser);
  } catch (e) {
    // Handle error silently
  }

  // Set up cleanup when audio finishes
  const setupCleanup = () => {
    setTimeout(() => {
      cleanupAudioElement(audio, source);
    }, CLEANUP_DELAY);
  };

  // Store handlers on audio element for later removal
  audio._endedHandler = setupCleanup;
  audio._pauseHandler = setupCleanup;

  // Clean up after the audio ends or is paused
  audio.addEventListener("ended", audio._endedHandler);
  audio.addEventListener("pause", audio._pauseHandler);

  audio.currentTime = 0;
  audio.play().catch((e) => {
    // If play fails, clean up immediately
    cleanupAudioElement(audio, source);
  });
}
