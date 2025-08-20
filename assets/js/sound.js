// example: playSound("assets/audio/piano/C5piano.mp3");

export function playSound(soundFilePath) {
  // Play audio if available for this note (allow overlapping sounds)
  if (soundFilePath) {
    const audio = new Audio(soundFilePath);
    const volumeSlider = document.getElementById("volume-slider");
    audio.volume = parseFloat(volumeSlider.value); // set volume from slider
    audio.currentTime = 0;
    audio.play();
  }
}

