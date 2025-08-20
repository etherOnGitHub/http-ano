import Piano from "./piano/Piano.js";
import { setupVirtualKeyboard, keyMap } from "./pianoKeyPress.js";
import { testPlayAlong, PlayAlongController } from "./playAlong.js";

// =========================
// INITIALIZATION
// =========================
document.addEventListener("DOMContentLoaded", function () {
  // Initialize modular piano with default configuration
  const piano = new Piano("piano");

  // Make piano globally accessible for potential future features
  window.piano = piano;

  
  console.log("Piano keys array information:", piano.getAllKeys());
});

setupVirtualKeyboard();
masterGain();
testPlayAlong("twinkle");
// Console output:
// Note 1: C4
// Note 2: C4
// Note 3: G4
// ...etc

// Play-along controller instance
window.playAlongController = null;

// Track expected note for highlighting
window.expectedNote = null;

// Update the keybind indicator label under the keyboard
function updateKeybindIndicator() {
  const indicator = document.getElementById("keybind-indicator");
  if (!window.expectedNote) {
    indicator.textContent = "";
    return;
  }
  const keyObj = keyMap.find((k) => k.note === window.expectedNote);
  if (keyObj && keyObj.key) {
    indicator.textContent = keyObj.key.toUpperCase();
  } else {
    indicator.textContent = "";
  }
}

// Play button event
document.getElementById("play-song").addEventListener("click", function () {
  const songName = document.getElementById("song-select").value;
  window.playAlongController = new PlayAlongController(songName, keyMap);
  window.playAlongController.start();
  // Set expected note for highlighting
  window.expectedNote =
    window.playAlongController.song[window.playAlongController.currentIndex];
  console.log("Expected note (play):", window.expectedNote);
  updateKeybindIndicator();
  if (window.piano) window.piano.draw();
});

// Stop button event
document.getElementById("stop-song").addEventListener("click", function () {
  if (window.playAlongController) {
    window.playAlongController.stop();
    window.expectedNote = null;
    console.log("Expected note (stop):", window.expectedNote);
    updateKeybindIndicator();
    if (window.piano) window.piano.draw();
  }
});

// Listen for a custom 'noteplayed' event and advance if correct note is played
document.addEventListener("noteplayed", function (e) {
  if (window.playAlongController && window.playAlongController.active) {
    const songFinished = window.playAlongController.handleNotePlayed(
      e.detail.note
    );
    // Update expected note for highlighting
    if (songFinished) {
      window.expectedNote = null;
      console.log("Expected note (advance):", window.expectedNote);
      updateKeybindIndicator();
    } else {
      window.expectedNote =
        window.playAlongController.song[
          window.playAlongController.currentIndex
        ];
      console.log("Expected note (advance):", window.expectedNote);
      updateKeybindIndicator();
    }
    if (window.piano) window.piano.draw();
  }
});

// =========================
// TOGGLE
// =========================
// Toggle visualiser box
document.querySelector("#visualiser .toggle-text").onclick = function () {
  const box = document.getElementById("visualiser-box");
  box.style.display = box.style.display === "none" ? "block" : "none";
};

// Toggle instructions box
document.querySelector("#instructions .toggle-text").onclick = function () {
  const box = document.getElementById("instructions-box");
  box.style.display = box.style.display === "none" ? "block" : "none";
};
