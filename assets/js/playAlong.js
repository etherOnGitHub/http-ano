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
    if (
      note &&
      currentNote &&
      note.toLowerCase() === currentNote.toLowerCase()
    ) {
      console.log(
        `Correct note '${note}' played for song note '${currentNote}'. Moving to next key.`
      );
      this.currentIndex++;
      if (this.currentIndex < this.song.length) {
        this.logCurrentKey();
        return false;
      } else {
        console.log("Song complete!");
        this.stop();
        return true;
      }
    } else {
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
// Usage example (in main.js):
// import { PlayAlongController } from './playAlong.js';
// import { keyMap } from './pianoKeyPress.js';
// const controller = new PlayAlongController('twinkle', keyMap);
// controller.start();
// controller.handleKeyPress('q'); // etc
