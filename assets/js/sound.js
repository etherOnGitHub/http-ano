export function playSound(sound) {
  // Play audio if available for this note (allow overlapping sounds)
  if (sound) {
    const audio = new Audio(sound);
    audio.currentTime = 0;
    audio.play();
  }
}
