// Virtual keyboard button key mapping
export const keyMap = [
  {
    id: "vk-btn-C5",
    key: "t",
    audio: "assets/audio/piano/C5piano.mp3",
    note: "C4",
  },
  {
    id: "vk-btn-Cs5",
    key: "y",
    audio: "assets/audio/piano/Cs5piano.mp3",
    note: "C#4",
  },
  {
    id: "vk-btn-D5",
    key: "u",
    audio: "assets/audio/piano/D5piano.mp3",
    note: "D4",
  },
  {
    id: "vk-btn-Ds5",
    key: "i",
    audio: "assets/audio/piano/Ds5piano.mp3",
    note: "D#4",
  },
  {
    id: "vk-btn-E5",
    key: "o",
    audio: "assets/audio/piano/E5piano.mp3",
    note: "E4",
  },
  {
    id: "vk-btn-F5",
    key: "p",
    audio: "assets/audio/piano/F5piano.mp3",
    note: "F4",
  },
  {
    id: "vk-btn-Fs5",
    key: "1",
    audio: "assets/audio/piano/Fs5piano.mp3",
    note: "F#4",
  },
  {
    id: "vk-btn-G5",
    key: "2",
    audio: "assets/audio/piano/G5piano.mp3",
    note: "G4",
  },
  {
    id: "vk-btn-Gs5",
    key: "3",
    audio: "assets/audio/piano/Gs5piano.mp3",
    note: "G#4",
  },
  {
    id: "vk-btn-A5",
    key: "4",
    audio: "assets/audio/piano/A5piano.mp3",
    note: "A4",
  },
  {
    id: "vk-btn-As5",
    key: "5",
    audio: "assets/audio/piano/As5piano.mp3",
    note: "A#4",
  },
  {
    id: "vk-btn-B5",
    key: "6",
    audio: "assets/audio/piano/B5piano.mp3",
    note: "B4",
  },
];

// Function to handle piano key press directly (for canvas integration)
export function handlePianoKeyPress(mappedKey) {
  // Trigger piano key press on canvas if piano is available
  // Audio will be handled by the piano's pressKey method
  if (window.piano && mappedKey.note) {
    window.piano.pressKey(mappedKey.note);
    // Release the key after a short duration for visual feedback
    setTimeout(() => {
      window.piano.releaseKey(mappedKey.note);
    }, 200);
  }

  console.log(`Piano key '${mappedKey.key}' pressed - Note: ${mappedKey.note}`);
}

export function handleButtonAction(id) {
  const btn = document.getElementById(id);
  const mappedKey = keyMap.find((mappedKey) => mappedKey.id === id);
  if (mappedKey) {
    // Handle button visual feedback if button exists
    if (btn) {
      btn.classList.add("active");
      setTimeout(() => btn.classList.remove("active"), 200);
    }

    // Handle the piano key press
    handlePianoKeyPress(mappedKey);

    // Switch for console logging and future testing
    switch (id) {
      case "vk-btn-C5":
      case "vk-btn-Cs5":
      case "vk-btn-D5":
      case "vk-btn-Ds5":
      case "vk-btn-E5":
      case "vk-btn-F5":
      case "vk-btn-Fs5":
      case "vk-btn-G5":
      case "vk-btn-Gs5":
      case "vk-btn-A5":
      case "vk-btn-As5":
      case "vk-btn-B5":
        console.log(
          `Key '${mappedKey.key}' pressed (Button ${id}) - Piano note: ${mappedKey.note}`
        );
        break;
      default:
        console.log(
          `Key '${mappedKey.key}' pressed (Button ${id}) - Piano note: ${mappedKey.note}`
        );
    }
  }
}

export function setupVirtualKeyboard() {
  keyMap.forEach(({ id }) => {
    const btn = document.getElementById(id);
    if (btn) {
      let touchHandled = false;
      btn.addEventListener("touchstart", (e) => {
        if (!touchHandled) {
          handleButtonAction(id);
          touchHandled = true;
          setTimeout(() => {
            touchHandled = false;
          }, 300);
        }
        e.preventDefault();
      });
      btn.addEventListener("mousedown", (e) => {
        if (!touchHandled) {
          handleButtonAction(id);
        }
      });
    }
  });

  // Track pressed keys to prevent repeat firing
  const pressedKeys = new Set();
  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (pressedKeys.has(key)) return; // Ignore holding
    pressedKeys.add(key);
    const mappedKey = keyMap.find((mappedKey) => mappedKey.key === key);
    if (mappedKey) {
      handleButtonAction(mappedKey.id);
    }
  });
  document.addEventListener("keyup", (e) => {
    const key = e.key.toLowerCase();
    pressedKeys.delete(key);
  });
}
