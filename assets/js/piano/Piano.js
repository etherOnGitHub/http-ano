import { keyMap } from "../pianoKeyPress.js";
import { playSound } from "../sound.js";
import { KeyGenerator } from "./KeyGenerator.js";
import { PianoEventHandler } from "./PianoEventHandler.js";
import { PianoRenderer } from "./PianoRenderer.js";
import { PIANO_CONFIG, PianoConfigHelper } from "./PianoConfig.js";

/**
 * Piano - Main piano class that coordinates all piano functionality
 * This is the main interface for creating and interacting with a canvas-based piano
 */
class Piano {
  constructor(canvasId, userConfig = {}) {
    // Merge user configuration with defaults
    this.config = PianoConfigHelper.mergeConfig(userConfig);

    // Validate configuration
    if (!PianoConfigHelper.validateConfig(this.config)) {
      throw new Error("Invalid piano configuration provided");
    }

    // Initialize canvas and context
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      throw new Error(`Canvas element with id "${canvasId}" not found`);
    }

    this.ctx = this.canvas.getContext("2d");

    // Initialize state
    this.keys = [];
    this.pressedKeys = new Set();

    // Initialize modular components
    this.keyGenerator = new KeyGenerator(this.config);
    this.renderer = new PianoRenderer(this.canvas, this.config);
    this.eventHandler = new PianoEventHandler(this);

    // Create note-to-audio mapping
    this.noteAudioMap = this.createNoteAudioMap();

    // Initialize the piano
    this.init();
  }

  /**
   * Create mapping from notes to audio files
   * @returns {Object} Note to audio file mapping
   */
  createNoteAudioMap() {
    const noteAudioMap = {};
    keyMap.forEach(({ note, audio }) => {
      if (note && audio) {
        noteAudioMap[note] = audio;
      }
    });
    return noteAudioMap;
  }

  /**
   * Initialize the piano - sets up canvas, keys, events, and draws
   */
  init() {
    this.setupCanvas();
    this.createKeys();
    this.eventHandler.setupEventListeners();

    // Handle initial screen size to ensure proper mobile/desktop layout
    this.eventHandler.handleResize();
  }

  /**
   * Set up canvas dimensions using the renderer
   */
  setupCanvas() {
    this.renderer.setupCanvas();
  }

  /**
   * Generate piano keys using the KeyGenerator
   */
  createKeys() {
    // The KeyGenerator will now read config values dynamically
    this.keys = this.keyGenerator.generateMultiOctaveKeys(
      this.canvas.width,
      this.canvas.height
    );
  }

  /**
   * Draw the complete piano using the PianoRenderer
   */
  draw() {
    // Get the expected note from global state for play-along highlighting
    const expectedNote = window.expectedNote || null;
    this.renderer.draw(this.keys, this.pressedKeys, expectedNote);
  }

  // =========================
  // KEY INTERACTION METHODS
  // =========================

  /**
   * Get the key information at a specific canvas position
   * @param {number} x - X coordinate (relative to canvas)
   * @param {number} y - Y coordinate (relative to canvas)
   * @returns {Object|null} - Key object with note and index, or null if no key found
   */
  getKeyAtPosition(x, y) {
    // Check black keys first (they're on top layer)
    for (let i = this.keys.length - 1; i >= 0; i--) {
      const key = this.keys[i];
      if (
        key.type === "black" &&
        x >= key.x &&
        x <= key.x + key.width &&
        y >= key.y &&
        y <= key.y + key.height
      ) {
        return {
          note: key.note,
          index: key.index,
          type: key.type,
        };
      }
    }

    // Check white keys (background layer)
    for (let i = this.keys.length - 1; i >= 0; i--) {
      const key = this.keys[i];
      if (
        key.type === "white" &&
        x >= key.x &&
        x <= key.x + key.width &&
        y >= key.y &&
        y <= key.y + key.height
      ) {
        return {
          note: key.note,
          index: key.index,
          type: key.type,
        };
      }
    }

    return null;
  }

  /**
   * Get key information from mouse/touch event
   * @param {Event} event - Mouse or touch event
   * @returns {Object|null} - Key object with note and index, or null if no key found
   */
  getKeyFromEvent(event) {
    const rect = this.canvas.getBoundingClientRect();
    let x, y;

    if (event.type.startsWith("touch")) {
      const touch = event.touches[0] || event.changedTouches[0];
      x = (touch.clientX - rect.left) * (this.canvas.width / rect.width);
      y = (touch.clientY - rect.top) * (this.canvas.height / rect.height);
    } else {
      x = (event.clientX - rect.left) * (this.canvas.width / rect.width);
      y = (event.clientY - rect.top) * (this.canvas.height / rect.height);
    }

    return this.getKeyAtPosition(x, y);
  }

  /**
   * Visually press a key and play its sound
   * @param {string} note - Note name (e.g., "C4", "A#3")
   */
  pressKey(note) {
    this.pressedKeys.add(note);
    this.draw();

    // Play sound if audio mapping exists
    if (this.noteAudioMap[note]) {
      playSound(this.noteAudioMap[note]);
    }
    // Record the note if the recorder is active
    if (window.recorder && window.recorder.isRecording) {
      window.recorder.recordNote(note);
    }
    // Dispatch a custom event for play-along logic (same as keyboard press)
    document.dispatchEvent(
      new CustomEvent("noteplayed", { detail: { note: note } })
    );
  }

  /**
   * Release a specific key
   * @param {string} note - Note name (e.g., "C4", "A#3")
   */
  releaseKey(note) {
    this.pressedKeys.delete(note);
    this.draw();
  }

  /**
   * Release all pressed keys
   */
  releaseAllKeys() {
    this.pressedKeys.clear();
    this.draw();
  }

  // =========================
  // PUBLIC API METHODS
  // =========================

  /**
   * Get all keys information
   * @returns {Array} - Array of all keys with their properties
   */
  getAllKeys() {
    return this.keys.map((key) => ({
      note: key.note,
      index: key.index,
      type: key.type,
    }));
  }

  /**
   * Get currently pressed keys
   * @returns {Array} - Array of currently pressed note names
   */
  getPressedKeys() {
    return Array.from(this.pressedKeys);
  }

  /**
   * Get piano configuration
   * @returns {Object} - Current piano configuration
   */
  getConfig() {
    return { ...this.config };
  }

  /**
   * Get piano state information
   * @returns {Object} - Current piano state
   */
  getState() {
    return {
      keys: this.getAllKeys(),
      pressedKeys: this.getPressedKeys(),
      dimensions: this.renderer.getCanvasDimensions(),
      octave: this.startOctave,
      interactionState: this.eventHandler.getInteractionState(),
    };
  }

  /**
   * Change the octave of the piano
   * @param {number} octave - New octave number
   */
  setOctave(octave) {
    if (typeof octave !== "number" || octave < 0 || octave > 8) {
      throw new Error("Octave must be a number between 0 and 8");
    }

    this.config.layout.defaultOctave = octave;
    this.releaseAllKeys(); // Clear any pressed keys
    this.createKeys(); // Regenerate keys with new octave
    this.draw(); // Redraw the piano
  }

  /**
   * Change the number of octaves displayed and update config based on octave amount
   * @param {number} numOctaves - Number of octaves to display
   */
  setNumOctaves(numOctaves) {
    if (typeof numOctaves !== "number" || numOctaves < 1 || numOctaves > 4) {
      throw new Error("Number of octaves must be between 1 and 4");
    }

    switch (numOctaves) {
      case 3:
        this.config.layout.defaultOctave = 4;
        this.config.aspectRatio = 0.18;
        this.config.keyLabels.visible = true; // Show keyboard labels for 3 octaves
        break;
      case 2:
        this.config.layout.defaultOctave = 4;
        this.config.aspectRatio = 0.2;
        this.config.keyLabels.visible = false; // Hide keyboard labels for 2 octaves
        break;
      case 1:
        this.config.layout.defaultOctave = 5;
        this.config.aspectRatio = 0.25;
        this.config.keyLabels.visible = false; // Hide keyboard labels for 1 octave
        break;
      default:
        break;
    }
    switch (numOctaves) {
      case 3:
        this.config.layout.defaultOctave = 4;
        this.config.aspectRatio = 0.18;
        break;
      case 2:
        this.config.layout.defaultOctave = 4;
        this.config.aspectRatio = 0.2;
        break;
      case 1:
        this.config.layout.defaultOctave = 5;
        this.config.aspectRatio = 0.25;
        break;
      default:
        break;
    }

    this.config.layout.numOctaves = numOctaves;
    this.releaseAllKeys(); // Clear any pressed keys
    this.setupCanvas(); // Recalculate canvas size for new layout
    this.createKeys(); // Regenerate keys with new number of octaves
    this.draw(); // Redraw the piano
  }

  /**
   * Get current configuration values
   * @returns {Object} Current layout configuration
   */
  getCurrentLayout() {
    return {
      defaultOctave: this.config.layout.defaultOctave,
      numOctaves: this.config.layout.numOctaves,
      totalKeys: this.keys.length,
      keyLabelsVisible: this.config.keyLabels.visible,
    };
  }

  /**
   * Toggle the visibility of keyboard key labels
   * @param {boolean} visible - Whether to show keyboard labels (optional)
   */
  toggleKeyLabels(visible = null) {
    if (visible !== null) {
      this.config.keyLabels.visible = visible;
    } else {
      this.config.keyLabels.visible = !this.config.keyLabels.visible;
    }
    this.draw(); // Redraw the piano with updated label visibility
  }
  /**
   * Get current configuration values
   * @returns {Object} Current layout configuration
   */
  getCurrentLayout() {
    return {
      defaultOctave: this.config.layout.defaultOctave,
      numOctaves: this.config.layout.numOctaves,
      totalKeys: this.keys.length,
    };
  }

  /**
   * Destroy the piano instance and clean up resources
   */
  destroy() {
    // Clean up event listeners
    this.eventHandler.cleanup();

    // Clear pressed keys
    this.releaseAllKeys();

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default Piano;
