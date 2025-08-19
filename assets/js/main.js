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
