import { keybindToNotes } from "./helpers.js";

export const SONGS = {
  twinkle: [
    "C4",
    "C4",
    "G4",
    "G4",
    "A4",
    "A4",
    "G4",
    "F4",
    "F4",
    "E4",
    "E4",
    "D4",
    "D4",
    "C4",
    "G4",
    "G4",
    "F4",
    "F4",
    "E4",
    "E4",
    "D4",
    "G4",
    "G4",
    "F4",
    "F4",
    "E4",
    "E4",
    "D4",
    "C4",
    "C4",
    "G4",
    "G4",
    "A4",
    "A4",
    "G4",
    "F4",
    "F4",
    "E4",
    "E4",
    "D4",
    "D4",
    "C4",
  ],
  mary: [
    "E4",
    "D4",
    "C4",
    "D4",
    "E4",
    "E4",
    "E4",
    "D4",
    "D4",
    "D4",
    "E4",
    "G4",
    "G4",
    "E4",
    "D4",
    "C4",
    "D4",
    "E4",
    "E4",
    "E4",
    "E4",
    "D4",
    "D4",
    "E4",
    "D4",
    "C4",
  ],
  keytest: [
    // Natural notes first
    "C4",
    "D4",
    "E4",
    "F4",
    "G4",
    "A4",
    "B4",
    "C5",
    "D5",
    "E5",
    "F5",
    "G5",
    "A5",
    "B5",
    "C6",
    "D6",
    "E6",
    "F6",
    "G6",
    "A6",
    "B6",
    // Sharps at the end
    "C#4",
    "D#4",
    "F#4",
    "G#4",
    "A#4",
    "C#5",
    "D#5",
    "F#5",
    "G#5",
    "A#5",
    "C#6",
    "D#6",
    "F#6",
    "G#6",
    "A#6",
  ],
  neverGonnaGiveYouUp: keybindToNotes("tyutooi rtyr iiuyt tyut ui ytr riu tyutooi rtyr z yuyt tyut ui ytr riu"),
};

export function testPlayAlong(songName) {
  const song = SONGS[songName];
  if (!song) {
    console.log("Song not found:", songName);
    return;
  }
  song.forEach((note, idx) => {
    console.log(`Note ${idx + 1}: ${note}`);
  });
}

export class PlayAlongController {
  constructor(songName, keyMap) {
    this.song = SONGS[songName] || [];
    this.keyMap = keyMap || [];
    this.currentIndex = 0;
    this.active = false;
  }

  start() {
    this.currentIndex = 0;
    this.active = true;
    this.logCurrentKey();
  }

  stop() {
    this.active = false;
    this.currentIndex = 0;
  }

  // New method: handle note played
  handleNotePlayed(note) {
    if (!this.active) return false;
    const currentNote = this.song[this.currentIndex];
    // Only advance if the correct note is played, and do not skip repeated notes
    if (
      note &&
      currentNote &&
      note.toLowerCase() === currentNote.toLowerCase()
    ) {
      // Advance only once per correct key press
      console.log(
        `Correct note '${note}' played for song note '${currentNote}'. Moving to next key.`
      );
      this.currentIndex += 1;
      if (this.currentIndex < this.song.length) {
        this.logCurrentKey();
        return false;
      } else {
        console.log("Song complete!");
        this.stop();
        return true;
      }
    } else {
      // Do not advance if the note is wrong, even if it's the same as the previous
      console.log(`Wrong note: '${note}'. Expected: '${currentNote}'.`);
      return false;
    }
  }

  handleKeyPress(key) {
    if (!this.active) return;
    const currentNote = this.song[this.currentIndex];
    const expectedKey = this.keyMap.find((k) => k.note === currentNote)?.key;
    if (key && expectedKey && key.toLowerCase() === expectedKey.toLowerCase()) {
      console.log(
        `Correct key '${key}' pressed for note '${currentNote}'. Moving to next key.`
      );
      this.currentIndex++;
      if (this.currentIndex < this.song.length) {
        this.logCurrentKey();
      } else {
        console.log("Song complete!");
        this.stop();
      }
    } else {
      console.log(
        `Wrong key: '${key}'. Expected: '${expectedKey}' for note '${currentNote}'.`
      );
    }
  }

  logCurrentKey() {
    const currentNote = this.song[this.currentIndex];
    const expectedKey = this.keyMap.find((k) => k.note === currentNote)?.key;
    console.log(`Press key: '${expectedKey}' for note: '${currentNote}'`);
  }
}
export function renderPlayAlongControls(selectedSong) {
  const controls = document.getElementById("playalong-controls");
  if (!controls) return;

  if (selectedSong && selectedSong !== "freeplay" && selectedSong !== "") {
    controls.innerHTML = `
  <div class="d-flex justify-content-between align-items-center w-100" style="max-width: 900px; min-height: 90px; padding: 24px 16px 0 16px; position: relative; z-index: 1000;">
        <button id="play-song" class="btn px-4"
          style="background-color: #181c2f; color: #00fff9; border: 2px solid #00fff9; border-radius: 12px; box-shadow: 0 0 16px #00fff9, 0 0 32px #00fff980; font-weight: bold; z-index: 11; transition: box-shadow 0.2s, color 0.2s, background-color 0.2s;">
          Play
        </button>
        <div id="keybind-indicator" class="text-center mx-4" style="font-size: 2rem; color: #ff9800; z-index: 1100; min-height: 48px;"></div>
        <button id="stop-song" class="btn px-4"
          style="background-color: #181c2f; color: #ff00ff; border: 2px solid #ff00ff; border-radius: 12px; box-shadow: 0 0 16px #ff00ff, 0 0 32px #ff00ff80; font-weight: bold; z-index: 11; transition: box-shadow 0.2s, color 0.2s, background-color 0.2s;">
          Stop
        </button>
      </div>
    `;

    // Active indicator logic for Play/Stop buttons
    const playBtn = document.getElementById("play-song");
    const stopBtn = document.getElementById("stop-song");

    function setActive(btn, color) {
      btn.style.backgroundColor = color;
      btn.style.color = "#181c2f";
      btn.style.boxShadow = "none";
    }
    function setInactive(btn, borderColor, textColor, shadowColor) {
      btn.style.backgroundColor = "#181c2f";
      btn.style.color = textColor;
      btn.style.boxShadow = `0 0 16px ${shadowColor}, 0 0 32px ${shadowColor}80`;
    }

    playBtn.addEventListener("click", function () {
      setActive(playBtn, "#00fff9");
      setInactive(stopBtn, "#ff00ff", "#ff00ff", "#ff00ff");
      // Listen for song finish event to remove highlight
      document.addEventListener(
        "playalongfinished",
        function () {
          setInactive(playBtn, "#00fff9", "#00fff9", "#00fff9");
        },
        { once: true }
      );
    });

    stopBtn.addEventListener("click", function () {
      setActive(stopBtn, "#ff00ff");
      setInactive(playBtn, "#00fff9", "#00fff9", "#00fff9");
    });

    setInactive(playBtn, "#00fff9", "#00fff9", "#00fff9");
    setInactive(stopBtn, "#ff00ff", "#ff00ff", "#ff00ff");
  } else {
    controls.innerHTML = "";
  }
}
// Usage example (in main.js):
// import { PlayAlongController } from './playAlong.js';
// import { keyMap } from './pianoKeyPress.js';
// const controller = new PlayAlongController('twinkle', keyMap);
// controller.start();
// controller.handleKeyPress('q'); // etc
