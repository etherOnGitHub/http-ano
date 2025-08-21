// Virtual keyboard button key mapping
export const keyMap = [
  // White keys in order (C4-B6)
  // Octave 4
  {
    id: "vk-btn-C4",
    key: "tab",
    audio: "assets/audio/piano/C4piano.mp3",
    note: ["C4"],
  },
  {
    id: "vk-btn-D4",
    key: "q",
    audio: "assets/audio/piano/D4piano.mp3",
    note: ["D4"],
  },
  {
    id: "vk-btn-E4",
    key: "w",
    audio: "assets/audio/piano/E4piano.mp3",
    note: ["E4"],
  },
  {
    id: "vk-btn-F4",
    key: "e",
    audio: "assets/audio/piano/F4piano.mp3",
    note: ["F4"],
  },
  {
    id: "vk-btn-G4",
    key: "r",
    audio: "assets/audio/piano/G4piano.mp3",
    note: ["G4"],
  },
  {
    id: "vk-btn-A4",
    key: "t",
    audio: "assets/audio/piano/A4piano.mp3",
    note: ["A4"],
  },
  {
    id: "vk-btn-B4",
    key: "y",
    audio: "assets/audio/piano/B4piano.mp3",
    note: ["B4"],
  },
  // Octave 5
  {
    id: "vk-btn-C5",
    key: "u",
    audio: "assets/audio/piano/C5piano.mp3",
    note: ["C5"],
  },
  {
    id: "vk-btn-D5",
    key: "i",
    audio: "assets/audio/piano/D5piano.mp3",
    note: ["D5"],
  },
  {
    id: "vk-btn-E5",
    key: "o",
    audio: "assets/audio/piano/E5piano.mp3",
    note: ["E5"],
  },
  {
    id: "vk-btn-F5",
    key: "p",
    audio: "assets/audio/piano/F5piano.mp3",
    note: ["F5"],
  },
  {
    id: "vk-btn-G5",
    key: "z",
    audio: "assets/audio/piano/G5piano.mp3",
    note: ["G5"],
  },
  {
    id: "vk-btn-A5",
    key: "x",
    audio: "assets/audio/piano/A5piano.mp3",
    note: ["A5"],
  },
  {
    id: "vk-btn-B5",
    key: "c",
    audio: "assets/audio/piano/B5piano.mp3",
    note: ["B5"],
  },
  // Octave 6
  {
    id: "vk-btn-C6",
    key: "v",
    audio: "assets/audio/piano/C6piano.mp3",
    note: ["C6"],
  },
  {
    id: "vk-btn-D6",
    key: "b",
    audio: "assets/audio/piano/D6piano.mp3",
    note: ["D6"],
  },
  {
    id: "vk-btn-E6",
    key: "n",
    audio: "assets/audio/piano/E6piano.mp3",
    note: ["E6"],
  },
  {
    id: "vk-btn-F6",
    key: "m",
    audio: "assets/audio/piano/F6piano.mp3",
    note: ["F6"],
  },
  {
    id: "vk-btn-G6",
    key: ",",
    audio: "assets/audio/piano/G6piano.mp3",
    note: ["G6"],
  },
  {
    id: "vk-btn-A6",
    key: ".",
    audio: "assets/audio/piano/A6piano.mp3",
    note: ["A6"],
  },
  {
    id: "vk-btn-B6",
    key: "/",
    audio: "assets/audio/piano/B6piano.mp3",
    note: ["B6"],
  },

  // Sharps in order (C#4-B#6)
  // Octave 4
  {
    id: "vk-btn-Cs4",
    key: "1",
    audio: "assets/audio/piano/Cs4piano.mp3",
    note: ["C#4"],
  },
  {
    id: "vk-btn-Ds4",
    key: "2",
    audio: "assets/audio/piano/Ds4piano.mp3",
    note: ["D#4"],
  },
  {
    id: "vk-btn-Fs4",
    key: "4",
    audio: "assets/audio/piano/Fs4piano.mp3",
    note: ["F#4"],
  },
  {
    id: "vk-btn-Gs4",
    key: "5",
    audio: "assets/audio/piano/Gs4piano.mp3",
    note: ["G#4"],
  },
  {
    id: "vk-btn-As4",
    key: "6",
    audio: "assets/audio/piano/As4piano.mp3",
    note: ["A#4"],
  },
  // Octave 5
  {
    id: "vk-btn-Cs5",
    key: "8",
    audio: "assets/audio/piano/Cs5piano.mp3",
    note: ["C#5"],
  },
  {
    id: "vk-btn-Ds5",
    key: "9",
    audio: "assets/audio/piano/Ds5piano.mp3",
    note: ["D#5"],
  },
  {
    id: "vk-btn-Fs5",
    key: "a",
    audio: "assets/audio/piano/Fs5piano.mp3",
    note: ["F#5"],
  },
  {
    id: "vk-btn-Gs5",
    key: "s",
    audio: "assets/audio/piano/Gs5piano.mp3",
    note: ["G#5"],
  },
  {
    id: "vk-btn-As5",
    key: "d",
    audio: "assets/audio/piano/As5piano.mp3",
    note: ["A#5"],
  },
  // Octave 6
  {
    id: "vk-btn-Cs6",
    key: "g",
    audio: "assets/audio/piano/Cs6piano.mp3",
    note: ["C#6"],
  },
  {
    id: "vk-btn-Ds6",
    key: "h",
    audio: "assets/audio/piano/Ds6piano.mp3",
    note: ["D#6"],
  },
  {
    id: "vk-btn-Fs6",
    key: "k",
    audio: "assets/audio/piano/Fs6piano.mp3",
    note: ["F#6"],
  },
  {
    id: "vk-btn-Gs6",
    key: "l",
    audio: "assets/audio/piano/Gs6piano.mp3",
    note: ["G#6"],
  },
  {
    id: "vk-btn-As6",
    key: ";",
    audio: "assets/audio/piano/As6piano.mp3",
    note: ["A#6"],
  },
];

// Function to handle piano key press directly (for canvas integration)
export function handlePianoKeyPress(mappedKey) {
  // Trigger piano key press on canvas if piano is available
  // Audio will be handled by the piano's pressKey method
  if (window.piano && mappedKey.note) {
    mappedKey.note.forEach((note) => {
      window.piano.pressKey(note);
    });
  } else if (mappedKey.note) {
    // Fallback: if piano is not available, dispatch the event directly
    // This ensures play-along functionality works even during initialization
    mappedKey.note.forEach((note) => {
      document.dispatchEvent(
        new CustomEvent("noteplayed", { detail: { note: note } })
      );
    });
  }

  console.log(
    `Piano key '${mappedKey.key}' pressed - Notes: ${mappedKey.note.join(", ")}`
  );

  // Note: When piano is available, piano.pressKey() dispatches the 'noteplayed' event
  // When piano is not available, we dispatch it directly as a fallback
}

export function handleButtonAction(id) {
  const btn = document.getElementById(id);
  const mappedKey = keyMap.find((mappedKey) => mappedKey.id === id);
  if (mappedKey) {
    // Handle button visual feedback if button exists
    if (btn) {
      btn.classList.add("active");
    }
  }

  // Handle the piano key press
  handlePianoKeyPress(mappedKey);

  // Play-along advancement for mouse/touch
  if (window.playModeActive) {
    const currentNote = window.songSequence[window.songCurrentIndex];
    if (mappedKey.note.includes(currentNote)) {
      document.dispatchEvent(new Event("playalongadvance"));
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
}

const pressedKeys = new Set(); // Track pressed keys

// Key press anti-spam logic for piano
function handleKeyDown(event) {
  const key = event.key.toLowerCase();
  if (
    key === "tab" &&
    keyMap.some((mappedKey) => mappedKey.key.toLowerCase() === "tab")
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (pressedKeys.has(key)) return; // Prevent repeated key spamming
  pressedKeys.add(key);
  const mappedKey = keyMap.find(
    (mappedKey) => mappedKey.key.toLowerCase() === key
  );
  if (mappedKey) {
    event.preventDefault();
    handleButtonAction(mappedKey.id);
  }
}

function handleKeyUp(event) {
  const key = event.key.toLowerCase();
  if (
    key === "tab" &&
    keyMap.some((mappedKey) => mappedKey.key.toLowerCase() === "tab")
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
  pressedKeys.delete(key);
  // Remove highlight on keyup
  const mappedKey = keyMap.find(
    (mappedKey) => mappedKey.key.toLowerCase() === key
  );
  if (mappedKey && window.piano) {
    mappedKey.note.forEach((note) => {
      window.piano.releaseKey(note);
    });
  }
  if (mappedKey) {
    const btn = document.getElementById(mappedKey.id);
    if (btn) {
      btn.classList.remove("active");
      if (window.piano) {
        mappedKey.note.forEach((note) => {
          window.piano.releaseKey(note);
        });
      }
    }
  }
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
