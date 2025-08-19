/**
 * KeyGenerator - Handles piano key layout generation
 * Generates piano key layout for a given octave with proper positioning
 */
export class KeyGenerator {
  constructor(config) {
    this.config = config;
  }

  /**
   * Get the current note pattern from config
   * @returns {Array} Array of note names
   */
  get notePattern() {
    return this.config.layout.notePattern;
  }

  /**
   * Get the current black key pattern from config
   * @returns {Array} Array indicating which notes have sharps
   */
  get blackKeyPattern() {
    return this.config.layout.blackKeyPattern;
  }

  /**
   * Generate keys for a single octave
   * @param {number} canvasWidth - Width of the canvas
   * @param {number} canvasHeight - Height of the canvas
   * @param {number} startOctave - Starting octave number (optional, uses config default if not provided)
   * @returns {Array} Array of key objects
   */
  generateOctaveKeys(canvasWidth, canvasHeight, startOctave = null) {
    // Use config value if parameter is not provided
    const actualStartOctave =
      startOctave !== null ? startOctave : this.config.layout.defaultOctave;

    const keys = [];
    const totalWhiteKeys = this.config.layout.whiteKeysPerOctave;
    const whiteKeyWidth = canvasWidth / totalWhiteKeys;
    const blackKeyWidth =
      whiteKeyWidth * this.config.keyRatios.blackKeyWidthRatio;
    const whiteKeyHeight = canvasHeight;
    const blackKeyHeight =
      whiteKeyHeight * this.config.keyRatios.blackKeyHeightRatio;

    let whiteKeyIndex = 0;
    let keyIndex = 0;

    for (let noteIndex = 0; noteIndex < this.notePattern.length; noteIndex++) {
      const noteName = this.notePattern[noteIndex];
      const fullNoteName = noteName + actualStartOctave;

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
            noteName + "#" + actualStartOctave,
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
   * Generate keys for multiple octaves
   * @param {number} canvasWidth - Width of the canvas
   * @param {number} canvasHeight - Height of the canvas
   * @param {number} startOctave - Starting octave number (optional, uses config default if not provided)
   * @param {number} numOctaves - Number of octaves to generate (optional, uses config default if not provided)
   * @returns {Array} Array of key objects
   */
  generateMultiOctaveKeys(
    canvasWidth,
    canvasHeight,
    startOctave = null,
    numOctaves = null
  ) {
    // Use config values if parameters are not provided
    const actualStartOctave =
      startOctave !== null ? startOctave : this.config.layout.defaultOctave;
    const actualNumOctaves =
      numOctaves !== null ? numOctaves : this.config.layout.numOctaves;

    const keys = [];
    const totalWhiteKeys =
      actualNumOctaves * this.config.layout.whiteKeysPerOctave;
    const whiteKeyWidth = canvasWidth / totalWhiteKeys;
    const blackKeyWidth =
      whiteKeyWidth * this.config.keyRatios.blackKeyWidthRatio;
    const whiteKeyHeight = canvasHeight;
    const blackKeyHeight =
      whiteKeyHeight * this.config.keyRatios.blackKeyHeightRatio;

    let whiteKeyIndex = 0;
    let keyIndex = 0;

    // Generate full octaves
    for (let octave = 0; octave < actualNumOctaves; octave++) {
      const currentOctave = actualStartOctave + octave;

      for (
        let noteIndex = 0;
        noteIndex < this.notePattern.length;
        noteIndex++
      ) {
        const noteName = this.notePattern[noteIndex];
        const fullNoteName = noteName + currentOctave;

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
              noteName + "#" + currentOctave,
              keyIndex
            )
          );
          keyIndex++;
        }

        whiteKeyIndex++;
      }
    }

    return keys;
  }

  /**
   * Create a white key object
   */
  createWhiteKey(whiteKeyIndex, width, height, noteName, index) {
    return {
      type: "white",
      x: whiteKeyIndex * width,
      y: 0,
      width: width,
      height: height,
      note: noteName,
      index: index,
      pressed: false,
    };
  }

  /**
   * Create a black key object
   */
  createBlackKey(
    whiteKeyIndex,
    whiteKeyWidth,
    blackKeyWidth,
    height,
    noteName,
    index
  ) {
    return {
      type: "black",
      x: whiteKeyIndex * whiteKeyWidth + (whiteKeyWidth - blackKeyWidth / 2),
      y: 0,
      width: blackKeyWidth,
      height: height,
      note: noteName,
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
