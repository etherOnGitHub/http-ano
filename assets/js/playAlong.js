import { keybindToNotes } from "./helpers.js";

export const SONGS = {
  twinkle: [
    ["C4"],
    ["C4"],
    ["G4"],
    ["G4"],
    ["A4"],
    ["A4"],
    ["G4"],
    ["F4"],
    ["F4"],
    ["E4"],
    ["E4"],
    ["D4"],
    ["D4"],
    ["C4"],
    ["G4"],
    ["G4"],
    ["F4"],
    ["F4"],
    ["E4"],
    ["E4"],
    ["D4"],
    ["G4"],
    ["G4"],
    ["F4"],
    ["F4"],
    ["E4"],
    ["E4"],
    ["D4"],
    ["C4"],
    ["C4"],
    ["G4"],
    ["G4"],
    ["A4"],
    ["A4"],
    ["G4"],
    ["F4"],
    ["F4"],
    ["E4"],
    ["E4"],
    ["D4"],
    ["D4"],
    ["C4"],
  ],
  mary: [
    ["E4"],
    ["D4"],
    ["C4"],
    ["D4"],
    ["E4"],
    ["E4"],
    ["E4"],
    ["D4"],
    ["D4"],
    ["D4"],
    ["E4"],
    ["G4"],
    ["G4"],
    ["E4"],
    ["D4"],
    ["C4"],
    ["D4"],
    ["E4"],
    ["E4"],
    ["E4"],
    ["E4"],
    ["D4"],
    ["D4"],
    ["E4"],
    ["D4"],
    ["C4"],
  ],
  mario: [
    ["E5"],
    ["E5"],
    ["E5"],
    ["C5"],
    ["E5"],
    ["G5"],
    ["G5"],

    ["C5"],
    ["G4"],
    ["E4"],
    ["A4"],
    ["B4"],
    ["A#4"],
    ["A4"],
    ["G4"],
    ["E5"],
    ["G5"],
    ["A5"],
    ["F5"],
    ["G5"],
    ["E5"],
    ["C5"],
    ["D5"],
    ["B4"],

    ["C5"],
    ["G4"],
    ["E4"],
    ["A4"],
    ["B4"],
    ["A#4"],
    ["A4"],
    ["G4"],
    ["E5"],
    ["G5"],
    ["A5"],
    ["F5"],
    ["G5"],
    ["E5"],
    ["C5"],
    ["D5"],
    ["B4"],

    ["G5"],
    ["F#5"],
    ["F5"],
    ["D5"],
    ["E5"],
    ["G4"],
    ["A4"],
    ["C5"],
    ["A4"],
    ["C5"],
    ["D5"],
    ["G5"],
    ["F#5"],
    ["F5"],
    ["D5"],
    ["E5"],
    ["C6"],
    ["C6"],
    ["C6"],

    ["G5"],
    ["F#5"],
    ["F5"],
    ["D5"],
    ["E5"],
    ["G4"],
    ["A4"],
    ["C5"],
    ["A4"],
    ["C5"],
    ["D5"],
    ["D#5"],
    ["D5"],
    ["C5"],

    ["C6"],
    ["C6"],
    ["C6"],
    ["C6"],
    ["D6"],
    ["E6"],
    ["C6"],
    ["A4"],
    ["G4"],
    ["C6"],
    ["C6"],
    ["C6"],
    ["C6"],
    ["D6"],
    ["E6"],

    ["C6"],
    ["C6"],
    ["C6"],
    ["C6"],
    ["D6"],
    ["E6"],
    ["C6"],
    ["A4"],
    ["G4"],
    ["E5"],
    ["E5"],
    ["E5"],
    ["C5"],
    ["E5"],
    ["G5"],
    ["G5"],

    ["C5"],
    ["G4"],
    ["E4"],
    ["A4"],
    ["B4"],
    ["A4"],
    ["G#4"],
    ["A#4"],
    ["G#4"],
    ["G4"],
    ["F#4"],
    ["G4"],
  ],
  threeblindmice: [
    ["F#4"],
    ["E4"],
    ["D4"],
    ["F#4"],
    ["E4"],
    ["D4"],
    ["A4"],
    ["G4"],
    ["G4"],
    ["F#4"],
    ["A4"],
    ["G4"],
    ["G4"],
    ["F#4"],
    ["A4"],
    ["D5"],
    ["D5"],
    ["C#5"],
    ["B4"],
    ["C#5"],
    ["D5"],
    ["A4"],
    ["A4"],
    ["A4"],
    ["D5"],
    ["D5"],
    ["D5"],
    ["C#5"],
    ["B4"],
    ["C#5"],
    ["D5"],
    ["A4"],
    ["A4"],
    ["A4"],
    ["A4"],
    ["D5"],
    ["D5"],
    ["C#5"],
    ["B4"],
    ["C#5"],
    ["D5"],
    ["A4"],
    ["A4"],
    ["A4"],
    ["G4"],
    ["F#4"],
    ["E4"],
    ["D4"],
  ],
  odetojoy: [
    ["E4"],
    ["E4"],
    ["F4"],
    ["G4"],
    ["G4"],
    ["F4"],
    ["E4"],
    ["D4"],
    ["C4"],
    ["C4"],
    ["D4"],
    ["E4"],
    ["E4"],
    ["D4"],
    ["D4"],
    ["E4"],
    ["E4"],
    ["F4"],
    ["G4"],
    ["G4"],
    ["F4"],
    ["E4"],
    ["D4"],
    ["C4"],
    ["C4"],
    ["D4"],
    ["E4"],
    ["D4"],
    ["C4"],
    ["C4"],
  ],
  // New song with chords - Pure Imagination (simplified version)
  pureimagination: [
    // "Come with me and you'll be"
    ["C4"], // Come
    ["D#4"], // with
    ["A#4"], // me
    ["C4"], // and
    ["D#4"], // you'll
    ["A#4"], // be

    // "In a world of pure imagination"
    ["C4"], // In
    ["D#4"], // a
    ["D5"], // world
    ["D#5"], // of
    ["D5"], // pure
    ["D#5", "D5"], // imagination (chord)
    ["A#4"], // (hold)

    // "Take a look and you'll see"
    ["C4"], // Take
    ["D#4"], // a
    ["G4"], // look
    ["G#4"], // and
    ["A#4"], // you'll
    ["G4"], // see

    // "Into your imagination!"
    ["F4", "D#4"], // Into (chord)
    ["D4"], // your
    ["D#4", "D4"], // imagination! (chord)
    ["A#4"], // (hold)

    // "We'll begin with a spin"
    ["C4"], // We'll
    ["D#4", "A#4"], // begin (chord)
    ["C4"], // with
    ["D#4"], // a
    ["A#4"], // spin

    // "Travelling in the world of my creation"
    ["C4", "D#4"], // Travelling (chord)
    ["D5"], // in
    ["D#5"], // the
    ["D5"], // world
    ["D#5"], // of
    ["D5"], // my
    ["D#5", "D5"], // creation (chord)
    ["A#4"], // (hold)

    // "What we'll see will defy explanation!"
    ["C4"], // What
    ["D#4"], // we'll
    ["G4"], // see
    ["G#4"], // will
    ["A#4", "G4"], // defy (chord)
    ["F4", "D#4", "D4"], // explanation! (3-note chord)
    ["D5"], // (hold)
  ],
  // use function to write songs in shorthand format
  // just type the keyboard letters in the order you want
  neverGonnaGiveYouUp: keybindToNotes(
    "tyutooi rtyr iiuyt tyut ui ytr riu tyutooi rtyr z yuyt tyut ui ytr riu"
  ),
  happyBirthday: keybindToNotes("uuiupo uuiuzp uuvx ppoi ddx pzp"),
  mexicanHatDance: keybindToNotes("zazououyur r4rtyuiopi popiyiytyr zzzxzpoiu"),
};

export function testPlayAlong(songName) {
  const song = SONGS[songName];
  if (!song) {
    console.log("Song not found:", songName);
    return;
  }
  song.forEach((noteArray, idx) => {
    console.log(`Note ${idx + 1}: ${noteArray.join(", ")}`);
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
    document.getElementById("keybind-indicator").style.backgroundColor =
      "#181c2f";
  }

  stop() {
    this.active = false;
    this.currentIndex = 0;
    document.getElementById("keybind-indicator").style.backgroundColor =
      "transparent";
  }

  // New method: handle note played
  handleNotePlayed(note) {
    if (!this.active) return false;
    const currentNoteArray = this.song[this.currentIndex];
    // Only advance if the correct note is played, and do not skip repeated notes
    if (note && currentNoteArray && currentNoteArray.includes(note)) {
      // Advance only once per correct key press
      console.log(
        `Correct note '${note}' played for song notes '${currentNoteArray.join(
          ", "
        )}'. Moving to next key.`
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
      console.log(
        `Wrong note: '${note}'. Expected: '${currentNoteArray.join(", ")}'.`
      );
      return false;
    }
  }

  handleKeyPress(key) {
    if (!this.active) return;
    const currentNoteArray = this.song[this.currentIndex];
    const expectedKey = this.keyMap.find((k) => {
      return currentNoteArray.some((note) => k.note.includes(note));
    })?.key;
    if (key && expectedKey && key.toLowerCase() === expectedKey.toLowerCase()) {
      console.log(
        `Correct key '${key}' pressed for notes '${currentNoteArray.join(
          ", "
        )}'. Moving to next key.`
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
        `Wrong key: '${key}'. Expected: '${expectedKey}' for notes '${currentNoteArray.join(
          ", "
        )}'.`
      );
    }
  }

  logCurrentKey() {
    const currentNoteArray = this.song[this.currentIndex];
    const expectedKey = this.keyMap.find((k) => {
      return currentNoteArray.some((note) => k.note.includes(note));
    })?.key;
    console.log(
      `Press key: '${expectedKey}' for notes: '${currentNoteArray.join(", ")}'`
    );
  }
}

export function renderPlayAlongControls(selectedSong) {
  const controls = document.getElementById("playalong-controls");
  if (!controls) return;

  if (selectedSong && selectedSong !== "freeplay" && selectedSong !== "") {
    controls.innerHTML = `
    <div class="d-flex justify-content-between align-items-center w-100"
    style="max-width: 900px; min-height: 90px; padding: 24px 16px 0 16px; position: relative; z-index: 1000;">
      <button id="play-song" class="btn px-4"
      style="background-color: #181c2f; color: #fff; border: 2px solid #00fff9; border-radius: 12px; box-shadow: 0 0 16px #00fff9, 0 0 32px #00fff980; font-weight: bold; z-index: 11; transition: box-shadow 0.2s, color 0.2s, background-color 0.2s;">
      Play
      </button>
      <div id="keybind-indicator" class="text-center mx-4 btn px-4"
      style="font-size: 2rem; color: #fff; z-index: 1100; min-height: 48px; border-radius: 16px;">
      </div>
      <button id="stop-song" class="btn px-4"
      style="background-color: #181c2f; color: #fff; border: 2px solid #ff00ff; border-radius: 12px; box-shadow: 0 0 16px #ff00ff, 0 0 32px #ff00ff80; font-weight: bold; z-index: 11; transition: box-shadow 0.2s, color 0.2s, background-color 0.2s;">
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
