// Piano Canvas Application
// Organized into sections to avoid merge conflicts

import { keyMap } from "./pianoKeyPress.js";
import { playSound } from "./sound.js";

// =========================
// PIANO CONFIGURATION
// =========================
const PIANO_CONFIG = {
  aspectRatio: 0.45, // Height to width ratio for single octave
  maxWidth: 600, // Maximum width for piano in pixels
  minWidth: 300, // Minimum width for piano in pixels
  responsiveWidthPercent: 0.8, // Percentage of container width to use
  colors: {
    whiteKey: "#0a0a0a",
    whiteKeyPressed: "#1a1a1a",
    whiteKeyBorder: "#00ffff",
    blackKey: "#0a0a0a",
    blackKeyPressed: "#00ffff",
    background: "#1a1a1a",
  },
};

// =========================
// PIANO CLASS
// =========================
class Piano {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.keys = [];
    this.pressedKeys = new Set();

    // Simple configuration - always one octave starting from C4
    this.startOctave = 4;

    // Create note-to-audio mapping from keyMap
    this.noteAudioMap = this.createNoteAudioMap();

    this.init();
  }

  createNoteAudioMap() {
    const noteAudioMap = {};
    keyMap.forEach(({ note, audio }) => {
      if (note && audio) {
        noteAudioMap[note] = audio;
      }
    });
    return noteAudioMap;
  }

  init() {
    this.setupCanvas();
    this.createKeys();
    this.setupEventListeners();
    this.setupResizeListener();
    this.draw();
  }

  setupCanvas() {
    // Calculate responsive width based on container and window size
    const containerWidth = this.canvas.parentElement.clientWidth;
    const windowWidth = window.innerWidth;

    // Use smaller of container width or window-based calculation
    let targetWidth = Math.min(
      containerWidth * PIANO_CONFIG.responsiveWidthPercent,
      windowWidth * 0.8 // Never more than 80% of window width
    );

    // Clamp between min and max values
    targetWidth = Math.max(
      PIANO_CONFIG.minWidth,
      Math.min(PIANO_CONFIG.maxWidth, targetWidth)
    );

    // Set canvas dimensions
    this.canvas.width = targetWidth;
    this.canvas.height = targetWidth * PIANO_CONFIG.aspectRatio;

    // Set CSS size to match canvas dimensions for proper aspect ratio
    this.canvas.style.width = targetWidth + "px";
    this.canvas.style.height = targetWidth * PIANO_CONFIG.aspectRatio + "px";
  }

  createKeys() {
    this.keys = [];

    // Single octave - 7 white keys
    const totalWhiteKeys = 7;
    const whiteKeyWidth = this.canvas.width / totalWhiteKeys;
    const blackKeyWidth = whiteKeyWidth * 0.6;
    const whiteKeyHeight = this.canvas.height;
    const blackKeyHeight = whiteKeyHeight * 0.6;

    let whiteKeyIndex = 0;
    let keyIndex = 0;

    // Create keys for one octave starting from C
    const notePattern = ["C", "D", "E", "F", "G", "A", "B"];
    const blackKeyPattern = [1, 1, 0, 1, 1, 1, 0]; // C has #, D has #, E no #, etc.

    for (let noteIndex = 0; noteIndex < notePattern.length; noteIndex++) {
      const noteName = notePattern[noteIndex];
      const fullNoteName = noteName + this.startOctave;

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
            whiteKeyIndex * whiteKeyWidth + (whiteKeyWidth - blackKeyWidth / 2),
          y: 0,
          width: blackKeyWidth,
          height: blackKeyHeight,
          note: noteName + "#" + this.startOctave,
          index: keyIndex,
          pressed: false,
        };
        this.keys.push(blackKey);
        keyIndex++;
      }

      whiteKeyIndex++;
    }
  }

  setupEventListeners() {
    // Add mouse event listeners for piano key clicks
    this.canvas.addEventListener("mousedown", (event) => {
      this.handleMouseDown(event);
    });

    this.canvas.addEventListener("mouseup", (event) => {
      this.handleMouseUp(event);
    });

    // Add touch event listeners for mobile support
    this.canvas.addEventListener("touchstart", (event) => {
      event.preventDefault(); // Prevent scrolling
      this.handleTouchStart(event);
    });

    this.canvas.addEventListener("touchend", (event) => {
      event.preventDefault();
      this.handleTouchEnd(event);
    });

    // Prevent context menu on right click
    this.canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
  }

  setupResizeListener() {
    // Add window resize listener for responsive behavior
    window.addEventListener("resize", () => {
      this.handleResize();
    });
  }

  handleMouseDown(event) {
    const key = this.getKeyFromEvent(event);
    if (key) {
      console.log(`Piano key clicked: ${key.note} (${key.type} key)`);
      this.pressKey(key.note);

      // Store the currently pressed key for mouse up handling
      this.currentMouseKey = key.note;
    }
  }

  handleMouseUp(event) {
    if (this.currentMouseKey) {
      this.releaseKey(this.currentMouseKey);
      this.currentMouseKey = null;
    }
  }

  handleTouchStart(event) {
    const key = this.getKeyFromEvent(event);
    if (key) {
      console.log(`Piano key touched: ${key.note} (${key.type} key)`);
      this.pressKey(key.note);

      // Store the currently pressed key for touch end handling
      this.currentTouchKey = key.note;
    }
  }

  handleTouchEnd(event) {
    if (this.currentTouchKey) {
      this.releaseKey(this.currentTouchKey);
      this.currentTouchKey = null;
    }
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

    // Draw a nice 5px cyan border at the top of the canvas
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvas.width, 8);
    this.ctx.fillStyle = "#00ffff";
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
        this.ctx.shadowColor = "rgba(0, 255, 255, 0.3)";
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
        // Top highlight with cyan tint
        const gradient = this.ctx.createLinearGradient(
          key.x,
          key.y,
          key.x,
          key.y + key.height * 0.3
        );
        gradient.addColorStop(0, "rgba(0, 255, 255, 0.4)");
        gradient.addColorStop(1, "rgba(0, 255, 255, 0.0)");
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(key.x, key.y, key.width, key.height * 0.4);

        // Bottom shadow for depth
        const bottomShadow = this.ctx.createLinearGradient(
          key.x,
          key.y + key.height * 0.7,
          key.x,
          key.y + key.height
        );
        bottomShadow.addColorStop(0, "rgba(0, 0, 0, 0)");
        bottomShadow.addColorStop(1, "rgba(0, 0, 0, 0.3)");
        this.ctx.fillStyle = bottomShadow;
        this.ctx.fillRect(
          key.x,
          key.y + key.height * 0.7,
          key.width,
          key.height * 0.3
        );
      } else {
        // Pressed state - cyan glow effect
        const insetShadow = this.ctx.createLinearGradient(
          key.x,
          key.y,
          key.x,
          key.y + key.height * 0.2
        );
        insetShadow.addColorStop(0, "rgba(0, 255, 255, 0.3)");
        insetShadow.addColorStop(1, "rgba(0, 255, 255, 0)");
        this.ctx.fillStyle = insetShadow;
        this.ctx.fillRect(key.x, key.y, key.width, key.height * 0.2);
      }

      // Draw border
      this.ctx.strokeStyle = PIANO_CONFIG.colors.whiteKeyBorder;
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(key.x, key.y, key.width, key.height);
    } else {
      // Black key with pink neon glow border

      // Create pink neon glow effect
      this.ctx.shadowColor = "#ff1493"; // Deep pink
      this.ctx.shadowBlur = 15;
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;

      // Draw outer glow (larger)
      this.ctx.strokeStyle = "rgba(255, 20, 147, 0.9)"; // Semi-transparent pink
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(key.x - 2, key.y - 2, key.width + 4, key.height + 4);

      // Draw inner glow (smaller, brighter)
      this.ctx.strokeStyle = "rgba(255, 20, 147, 0.9)"; // Brighter pink
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(key.x - 1, key.y - 1, key.width + 2, key.height + 2);

      // Black key shadow (cyan glow when pressed)
      if (!isPressed) {
        this.ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
        this.ctx.shadowBlur = 12;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 6;
      } else {
        this.ctx.shadowColor = "rgba(0, 255, 255, 0.8)";
        this.ctx.shadowBlur = 20;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
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
      this.ctx.arcTo(
        key.x + key.width,
        key.y + key.height,
        key.x + key.width - radius,
        key.y + key.height,
        radius
      );
      this.ctx.lineTo(key.x + radius, key.y + key.height);
      this.ctx.arcTo(
        key.x,
        key.y + key.height,
        key.x,
        key.y + key.height - radius,
        radius
      );
      this.ctx.lineTo(key.x, key.y);
      this.ctx.closePath();
      this.ctx.fill();

      // Reset shadow for additional effects
      this.ctx.shadowColor = "transparent";

      // Add gradient for 3D effect using the same rounded path
      if (!isPressed) {
        // Top highlight for glossy effect with cyan tint
        const blackGradient = this.ctx.createLinearGradient(
          key.x,
          key.y,
          key.x,
          key.y + key.height * 0.4
        );
        blackGradient.addColorStop(0, "rgba(0, 255, 255, 0.2)");
        blackGradient.addColorStop(0.3, "rgba(0, 255, 255, 0.05)");
        blackGradient.addColorStop(1, "rgba(0, 255, 255, 0)");
        this.ctx.fillStyle = blackGradient;
        this.ctx.fill();

        // Side highlights for rounded appearance with cyan
        this.ctx.fillStyle = "rgba(0, 255, 255, 0.1)";
        this.ctx.fillRect(key.x, key.y, 2, key.height - radius);
        this.ctx.fillRect(key.x + key.width - 2, key.y, 2, key.height - radius);
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

    playSound(this.noteAudioMap[note]);
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

export default Piano;
