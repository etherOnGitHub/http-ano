/**
 * KeyGenerator - Handles piano key layout generation
 * Generates piano key layout for a given octave with proper positioning
 */
export class KeyGenerator {
  constructor(config) {
    this.config = config;
    this.notePattern = ["C", "D", "E", "F", "G", "A", "B"];
    this.blackKeyPattern = [1, 1, 0, 1, 1, 1, 0]; // Which notes have sharps (C#, D#, F#, G#, A#)
  }

  /**
   * Generate keys for a single octave
   * @param {number} canvasWidth - Width of the canvas
   * @param {number} canvasHeight - Height of the canvas
   * @param {number} startOctave - Starting octave number
   * @returns {Array} Array of key objects
   */
  generateOctaveKeys(canvasWidth, canvasHeight, startOctave) {
    const keys = [];
    const totalWhiteKeys = 7;
    const whiteKeyWidth = canvasWidth / totalWhiteKeys;
    const blackKeyWidth = whiteKeyWidth * 0.6;
    const whiteKeyHeight = canvasHeight;
    const blackKeyHeight = whiteKeyHeight * 0.6;

    let whiteKeyIndex = 0;
    let keyIndex = 0;

    for (let noteIndex = 0; noteIndex < this.notePattern.length; noteIndex++) {
      const noteName = this.notePattern[noteIndex];
      const fullNoteName = noteName + startOctave;

      // Generate white key
      keys.push(
        this.createWhiteKey(
          whiteKeyIndex,
          whiteKeyWidth,
          whiteKeyHeight,
          fullNoteName,
          keyIndex
        )
      );
      keyIndex++;

      // Generate black key if needed
      if (this.blackKeyPattern[noteIndex] === 1) {
        keys.push(
          this.createBlackKey(
            whiteKeyIndex,
            whiteKeyWidth,
            blackKeyWidth,
            blackKeyHeight,
            noteName + "#" + startOctave,
            keyIndex
          )
        );
        keyIndex++;
      }

      whiteKeyIndex++;
    }

    return keys;
  }

  /**
   * Create a white key object
   * @param {number} whiteKeyIndex - Index among white keys
   * @param {number} width - Key width
   * @param {number} height - Key height
   * @param {string} note - Note name (e.g., "C4")
   * @param {number} index - Overall key index
   * @returns {Object} White key object
   */
  createWhiteKey(whiteKeyIndex, width, height, note, index) {
    return {
      type: "white",
      x: whiteKeyIndex * width,
      y: 0,
      width: width,
      height: height,
      note: note,
      index: index,
      pressed: false,
    };
  }

  /**
   * Create a black key object
   * @param {number} whiteKeyIndex - Index of the white key this black key is positioned relative to
   * @param {number} whiteKeyWidth - Width of white keys
   * @param {number} blackKeyWidth - Width of black keys
   * @param {number} height - Key height
   * @param {string} note - Note name (e.g., "C#4")
   * @param {number} index - Overall key index
   * @returns {Object} Black key object
   */
  createBlackKey(
    whiteKeyIndex,
    whiteKeyWidth,
    blackKeyWidth,
    height,
    note,
    index
  ) {
    return {
      type: "black",
      x: whiteKeyIndex * whiteKeyWidth + (whiteKeyWidth - blackKeyWidth / 2),
      y: 0,
      width: blackKeyWidth,
      height: height,
      note: note,
      index: index,
      pressed: false,
    };
  }

  /**
   * Get the note pattern for reference
   * @returns {Array} Array of note names
   */
  getNotePattern() {
    return [...this.notePattern];
  }

  /**
   * Get the black key pattern for reference
   * @returns {Array} Array indicating which notes have sharps
   */
  getBlackKeyPattern() {
    return [...this.blackKeyPattern];
  }
}
