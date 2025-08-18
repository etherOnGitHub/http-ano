// Piano Canvas Application
// Organized into sections to avoid merge conflicts

// =========================
// PIANO CONFIGURATION
// =========================
const PIANO_CONFIG = {
  baseAspectRatio: 0.2, // Base height to width ratio for 3 octaves
  maxOctaves: 4, // Maximum number of octaves allowed
  colors: {
    whiteKey: "##ffffff",
    whiteKeyPressed: "#e0e0e0",
    whiteKeyBorder: "#ccc",
    blackKey: "#2c2c2c",
    blackKeyPressed: "#1a1a1a",
    background: "#f5f5f5",
  },
  // Aspect ratio adjustments for different octave counts
  aspectRatioMultipliers: {
    1: 1.8, // Taller for fewer keys
    2: 1.4, // Moderately taller
    3: 1.0, // Perfect ratio (base)
    4: 0.8, // Slightly shorter for more keys
  },
};

// =========================
// PIANO CLASS
// =========================
class Piano {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.keys = [];
    this.pressedKeys = new Set();

    // Piano configuration options
    this.octaves = Math.min(
      Math.max(options.octaves || 3, 1),
      PIANO_CONFIG.maxOctaves
    ); // Clamp between 1 and 4
    this.startOctave = options.startOctave || 4; // Starting octave number (always C)

    this.init();
  }

  init() {
    this.setupCanvas();
    this.createKeys();
    this.draw();
  }

  setupCanvas() {
    // Set canvas size based on container width and dynamic aspect ratio
    const container = this.canvas.parentElement;
    const containerWidth = container.offsetWidth - 40; // Account for padding

    // Calculate dynamic aspect ratio based on octave count
    const aspectMultiplier =
      PIANO_CONFIG.aspectRatioMultipliers[this.octaves] || 1.0;
    const dynamicAspectRatio = PIANO_CONFIG.baseAspectRatio * aspectMultiplier;

    this.canvas.width = containerWidth;
    this.canvas.height = containerWidth * dynamicAspectRatio;

    // Set CSS size for responsive behavior
    this.canvas.style.width = "100%";
    this.canvas.style.height = "auto";
  }

  createKeys() {
    this.keys = [];

    // Always use C as starting note, calculate total white keys
    const whiteKeysPerOctave = 7;
    const totalWhiteKeys = this.octaves * whiteKeysPerOctave;

    const whiteKeyWidth = this.canvas.width / totalWhiteKeys;
    const blackKeyWidth = whiteKeyWidth * 0.6;
    const whiteKeyHeight = this.canvas.height;
    const blackKeyHeight = whiteKeyHeight * 0.6;

    let whiteKeyIndex = 0;
    let keyIndex = 0; // Overall key index for array indexing

    // Create keys starting from C
    for (let octave = 0; octave < this.octaves; octave++) {
      const notePattern = ["C", "D", "E", "F", "G", "A", "B"];
      const blackKeyPattern = [1, 1, 0, 1, 1, 1, 0]; // C has #, D has #, E no #, etc.

      for (let noteIndex = 0; noteIndex < notePattern.length; noteIndex++) {
        const noteName = notePattern[noteIndex];
        const currentOctave = this.startOctave + octave;
        const fullNoteName = noteName + currentOctave;

        // Create white key
        const whiteKey = {
          type: "white",
          x: whiteKeyIndex * whiteKeyWidth,
          y: 0,
          width: whiteKeyWidth,
          height: whiteKeyHeight,
          note: fullNoteName,
          index: keyIndex,
          pressed: false,
        };
        this.keys.push(whiteKey);
        keyIndex++;

        // Create black key if pattern indicates one should exist
        if (blackKeyPattern[noteIndex] === 1) {
          const blackKey = {
            type: "black",
            x:
              whiteKeyIndex * whiteKeyWidth +
              (whiteKeyWidth - blackKeyWidth / 2),
            y: 0,
            width: blackKeyWidth,
            height: blackKeyHeight,
            note: noteName + "#" + currentOctave,
            index: keyIndex,
            pressed: false,
          };
          this.keys.push(blackKey);
          keyIndex++;
        }

        whiteKeyIndex++;
      }
    }
  }

  // Method to change piano configuration
  reconfigure(options = {}) {
    this.octaves = Math.min(
      Math.max(options.octaves || this.octaves, 1),
      PIANO_CONFIG.maxOctaves
    );
    this.startOctave = options.startOctave || this.startOctave;

    this.setupCanvas();
    this.setupCanvas();
    this.createKeys();
    this.draw();
  }

  draw() {
    // Clear canvas
    this.ctx.fillStyle = PIANO_CONFIG.colors.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw white keys first
    this.keys
    .filter((key) => key.type === "white")
    .forEach((key) => {
      this.drawKey(key);
    });
    
    // Draw black keys on top
    this.keys
    .filter((key) => key.type === "black")
    .forEach((key) => {
      this.drawKey(key);
    });

    // Draw a nice 5px red border at the top of the canvas
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvas.width, 8);
    this.ctx.fillStyle = "#e63333";
    this.ctx.fill();
    this.ctx.restore();
  }

  drawKey(key) {
    const isPressed = this.pressedKeys.has(key.note);

    // Save context for shadow effects
    this.ctx.save();

    if (key.type === "white") {
      // White key shadow (only when not pressed)
      if (!isPressed) {
        this.ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
        this.ctx.shadowBlur = 8;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 4;
      }

      // Set fill color based on pressed state
      this.ctx.fillStyle = isPressed
        ? PIANO_CONFIG.colors.whiteKeyPressed
        : PIANO_CONFIG.colors.whiteKey;

      // Draw main key body
      this.ctx.fillRect(key.x, key.y, key.width, key.height);

      // Reset shadow for additional effects
      this.ctx.shadowColor = "transparent";

      // Add subtle gradient for 3D effect
      if (!isPressed) {
        // Top highlight
        const gradient = this.ctx.createLinearGradient(key.x, key.y, key.x, key.y + key.height * 0.3);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.4)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(key.x, key.y, key.width, key.height * 0.3);

        // Bottom shadow for depth
        const bottomShadow = this.ctx.createLinearGradient(key.x, key.y + key.height * 0.7, key.x, key.y + key.height);
        bottomShadow.addColorStop(0, "rgba(0, 0, 0, 0)");
        bottomShadow.addColorStop(1, "rgba(0, 0, 0, 0.02)");
        this.ctx.fillStyle = bottomShadow;
        this.ctx.fillRect(key.x, key.y + key.height * 0.7, key.width, key.height * 0.3);
      } else {
        // Pressed state - inset shadow effect
        const insetShadow = this.ctx.createLinearGradient(key.x, key.y, key.x, key.y + key.height * 0.2);
        insetShadow.addColorStop(0, "rgba(0, 0, 0, 0.1)");
        insetShadow.addColorStop(1, "rgba(0, 0, 0, 0)");
        this.ctx.fillStyle = insetShadow;
        this.ctx.fillRect(key.x, key.y, key.width, key.height * 0.2);
      }

      // Draw border
      this.ctx.strokeStyle = PIANO_CONFIG.colors.whiteKeyBorder;
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(key.x, key.y, key.width, key.height);

    } else {
      // Black key shadow (more pronounced)
      if (!isPressed) {
        this.ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
        this.ctx.shadowBlur = 12;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 6;
      }

      // Set fill color based on pressed state
      this.ctx.fillStyle = isPressed
        ? PIANO_CONFIG.colors.blackKeyPressed
        : PIANO_CONFIG.colors.blackKey;

      // Draw black key with rounded bottom corners
      const radius = 6;
      this.ctx.beginPath();
      this.ctx.moveTo(key.x, key.y);
      this.ctx.lineTo(key.x + key.width, key.y);
      this.ctx.lineTo(key.x + key.width, key.y + key.height - radius);
      this.ctx.arcTo(key.x + key.width, key.y + key.height, key.x + key.width - radius, key.y + key.height, radius);
      this.ctx.lineTo(key.x + radius, key.y + key.height);
      this.ctx.arcTo(key.x, key.y + key.height, key.x, key.y + key.height - radius, radius);
      this.ctx.lineTo(key.x, key.y);
      this.ctx.closePath();
      this.ctx.fill();

      // Reset shadow for additional effects
      this.ctx.shadowColor = "transparent";

      // Add gradient for 3D effect using the same rounded path
      if (!isPressed) {
        // Top highlight for glossy effect
        const blackGradient = this.ctx.createLinearGradient(key.x, key.y, key.x, key.y + key.height * 0.4);
        blackGradient.addColorStop(0, "rgba(255, 255, 255, 0.15)");
        blackGradient.addColorStop(0.3, "rgba(255, 255, 255, 0.05)");
        blackGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        this.ctx.fillStyle = blackGradient;
        this.ctx.fill();

        // Side highlights for rounded appearance
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        this.ctx.fillRect(key.x, key.y, 2, key.height - radius);
        this.ctx.fillRect(key.x + key.width - 2, key.y, 2, key.height - radius);
      } else {
        // Pressed state - darker inset
        const blackInset = this.ctx.createLinearGradient(key.x, key.y, key.x, key.y + key.height * 0.3);
        blackInset.addColorStop(0, "rgba(0, 0, 0, 0.3)");
        blackInset.addColorStop(1, "rgba(0, 0, 0, 0)");
        this.ctx.fillStyle = blackInset;
        this.ctx.fill();
      }
    }

    // Restore context
    this.ctx.restore();
  }

  // =========================
  // PUBLIC METHODS FOR EXTERNAL USE
  // =========================

  /**
   * Get the key information at a specific position
   * @param {number} x - X coordinate (relative to canvas)
   * @param {number} y - Y coordinate (relative to canvas)
   * @returns {Object|null} - Key object with note and index, or null if no key found
   */
  getKeyAtPosition(x, y) {
    // Check black keys first (they're on top)
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

    // Check white keys
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
   * Visually press a key (for external control)
   * @param {string} note - Note name (e.g., "C4", "A#3")
   */
  pressKey(note) {
    this.pressedKeys.add(note);
    this.draw();
  }

  /**
   * Release a specific key (for external control)
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
   * Handle resize events (should be called when container resizes)
   */
  handleResize() {
    // Debounce resize to avoid excessive redraws
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.setupCanvas();
      this.createKeys();
      this.draw();
    }, 250);
  }
}

// =========================
// INITIALIZATION
// =========================
document.addEventListener("DOMContentLoaded", function () {
  // Initialize piano when DOM is loaded
  // Default: 3 octaves starting from C4 (perfect aspect ratio)
  const piano = new Piano("piano", {
    octaves: 2,
    startOctave: 4,
  });

  // Make piano globally accessible for potential future features
  window.piano = piano;

  // Example of how to create different piano configurations:

  // Single octave (taller aspect ratio):
  // const piano = new Piano("piano", { octaves: 1, startOctave: 4 });

  // Two octaves (moderately taller):
  // const piano = new Piano("piano", { octaves: 2, startOctave: 3 });

  // Four octaves (slightly shorter):
  // const piano = new Piano("piano", { octaves: 4, startOctave: 3 });
});

// Basic JS file - no functionality
