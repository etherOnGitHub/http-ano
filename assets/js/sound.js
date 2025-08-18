// example: playSound("assets/audio/piano/C5piano.mp3");

export function playSound(soundFilePath) {
  // Play audio if available for this note (allow overlapping sounds)
  if (soundFilePath) {
    const audio = new Audio(soundFilePath);
    audio.currentTime = 0;
    audio.play();
  }
}