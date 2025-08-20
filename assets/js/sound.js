// example: playSound("assets/audio/piano/C5piano.mp3");

export function playSound(soundFilePath) {
  // Play audio if available for this note (allow overlapping sounds)
  if (soundFilePath) {
    const audio = new Audio(soundFilePath);
    const volumeSlider = document.getElementById("volume-slider");
    if (volumeSlider) {
      // Pass slider value through sliderToGain for dB conversion
      audio.volume = sliderToGain(volumeSlider.value);
    } else {
      audio.volume = sliderToGain(30); // fallback default, e.g. 30/100
    }
    audio.currentTime = 0;
    audio.play();
  }
}

// Function to convert slider value to gain level
// function sliderToGain(val) {
//     const v = Number(val);
//     if (v <= 0) return 0;
//     const norm = v / 100; // Normalize to 0-1 range
//     const dB = -60 + (norm * 60); // Convert to dB\
//     return Math.pow(10, dB / 20); // Convert dB to linear scale
// }