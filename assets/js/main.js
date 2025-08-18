import Piano from "./piano.js";

// =========================
// INITIALIZATION
// =========================
document.addEventListener("DOMContentLoaded", function () {
  // Initialize simple one-octave piano
  const piano = new Piano("piano");

  // Make piano globally accessible for potential future features
  window.piano = piano;
});

import { setupVirtualKeyboard } from "./keypress.js";

setupVirtualKeyboard();
