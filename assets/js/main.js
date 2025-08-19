import Piano from "./piano/Piano.js";
import { setupVirtualKeyboard } from "./pianoKeyPress.js";

// =========================
// INITIALIZATION
// =========================
document.addEventListener("DOMContentLoaded", function () {
  // Initialize modular piano with default configuration
  const piano = new Piano("piano");

  // Make piano globally accessible for potential future features
  window.piano = piano;
});

setupVirtualKeyboard();

// =========================
// TOGGLE
// =========================
// Toggle visualiser box
  document.querySelector("#visualiser .toggle-text").onclick = function() {
    const box = document.getElementById("visualiser-box");
    box.style.display = (box.style.display === "none") ? "block" : "none";
  };

  // Toggle instructions box
  document.querySelector("#instructions .toggle-text").onclick = function() {
    const box = document.getElementById("instructions-box");
    box.style.display = (box.style.display === "none") ? "block" : "none";
  };