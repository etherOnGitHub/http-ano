import {
  applyShadow,
  clearShadow,
  drawNeonBorder,
  applyWhiteKey3DEffect,
  applyPressedGlowEffect,
  createBottomRoundedRectPath,
  applyBlackKey3DEffect,
} from "./helpers/canvasHelpers.js";
import { keyMap } from "../pianoKeyPress.js";

/**
 * PianoRenderer - Handles all piano canvas rendering operations
 * Responsible for drawing the piano keys with all visual effects and canvas management
 */
export class PianoRenderer {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.config = config;
  }

  /**
   * Set up canvas dimensions and styling based on responsive configuration
   * @returns {Object} Canvas dimensions {width, height}
   */
  setupCanvas() {
    // Calculate responsive width
    const containerWidth = this.canvas.parentElement.clientWidth;
    const windowWidth = window.innerWidth;

    let targetWidth = Math.min(
      containerWidth * this.config.responsiveWidthPercent,
      windowWidth * this.config.responsive.maxWindowWidthPercent
    );

    // Clamp between min and max values
    targetWidth = Math.max(
      this.config.minWidth,
      Math.min(this.config.maxWidth, targetWidth)
    );

    // Set canvas dimensions
    this.canvas.width = targetWidth;
    this.canvas.height = targetWidth * this.config.aspectRatio;

    // Set CSS size for proper aspect ratio
    this.canvas.style.width = targetWidth + "px";
    this.canvas.style.height = targetWidth * this.config.aspectRatio + "px";

    // Update context reference after resize
    this.ctx = this.canvas.getContext("2d");

    return {
      width: targetWidth,
      height: targetWidth * this.config.aspectRatio,
    };
  }

  /**
   * Draw the complete piano with all keys
   * @param {Array} keys - Array of key objects
   * @param {Set} pressedKeys - Set of currently pressed key notes
   * @param {string} expectedNote - The note that should be highlighted for play-along
   */
  draw(keys, pressedKeys, expectedNote = null) {
    this.clearCanvas();
    this.drawKeys(keys, pressedKeys, expectedNote);
    this.drawTopBorder();
  }

  /**
   * Clear the entire canvas with background color
   */
  clearCanvas() {
    this.ctx.fillStyle = this.config.colors.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draw all piano keys in proper layering order
   * @param {Array} keys - Array of key objects
   * @param {Set} pressedKeys - Set of currently pressed key notes
   * @param {string} expectedNote - The note that should be highlighted for play-along
   */
  drawKeys(keys, pressedKeys, expectedNote = null) {
    // Draw white keys first (background layer)
    keys
      .filter((key) => key.type === "white")
      .forEach((key) => {
        this.drawKey(
          {
            ...key,
            x: key.x + (this.containerPadding || 0),
            y: key.y + (this.containerPadding || 0),
          },
          pressedKeys.has(key.note),
          expectedNote === key.note
        );
      });

    // Draw black keys on top (foreground layer)
    keys
      .filter((key) => key.type === "black")
      .forEach((key) => {
        this.drawKey(
          {
            ...key,
            x: key.x + (this.containerPadding || 0),
            y: key.y + (this.containerPadding || 0),
          },
          pressedKeys.has(key.note),
          expectedNote === key.note
        );
      });
  }

  /**
   * Draw a single piano key with all effects
   * @param {Object} key - Key object with position and note information
   * @param {boolean} isPressed - Whether the key is currently pressed
   * @param {boolean} isExpected - Whether this key is expected for play-along
   */
  drawKey(key, isPressed, isExpected = false) {
    this.ctx.save();

    if (key.type === "white") {
      this.drawWhiteKey(key, isPressed, isExpected);
    } else {
      this.drawBlackKey(key, isPressed, isExpected);
    }

    this.ctx.restore();
  }

  /**
   * Draw a white key with all visual effects
   * @param {Object} key - Key object
   * @param {boolean} isPressed - Whether the key is pressed
   * @param {boolean} isExpected - Whether this key is expected for play-along
   */
  drawWhiteKey(key, isPressed, isExpected = false) {
    // Apply shadow effects
    this.applyWhiteKeyShadow(isPressed);

    // Set fill color and draw main body - orange if expected
    if (isExpected && !isPressed) {
      this.ctx.fillStyle = "#ff9800"; // Orange for expected key
    } else {
      this.ctx.fillStyle = isPressed
        ? this.config.colors.whiteKeyPressed
        : this.config.colors.whiteKey;
    }
    this.ctx.fillRect(key.x, key.y, key.width, key.height);

    // Clear shadow for additional effects
    clearShadow(this.ctx);

    // Apply 3D visual effects
    if (!isPressed) {
      applyWhiteKey3DEffect(this.ctx, key.x, key.y, key.width, key.height);
    } else {
      applyPressedGlowEffect(this.ctx, key.x, key.y, key.width, key.height);
    }

    // Draw border - orange if expected
    if (isExpected && !isPressed) {
      this.ctx.strokeStyle = "#ff6f00"; // Darker orange for border
    } else {
      this.ctx.strokeStyle = this.config.colors.whiteKeyBorder;
    }
    this.ctx.lineWidth = 4;
    this.ctx.strokeRect(key.x, key.y, key.width, key.height);

    // Draw keyboard key label
    this.drawKeyLabel(key, false);
  }

  /**
   * Draw a black key with all visual effects
   * @param {Object} key - Key object
   * @param {boolean} isPressed - Whether the key is pressed
   * @param {boolean} isExpected - Whether this key is expected for play-along
   */
  drawBlackKey(key, isPressed, isExpected = false) {
    const radius = 6;

    // Draw neon border effect - orange if expected
    const borderColor = isExpected && !isPressed ? "#ff9800" : "#ff00ff";
    drawNeonBorder(
      this.ctx,
      key.x,
      key.y,
      key.width,
      key.height,
      radius,
      "#ff00ff"
    );

    // Apply shadow effects
    this.applyBlackKeyShadow(isPressed);

    // Set fill color and draw rounded rectangle - orange if expected
    if (isExpected && !isPressed) {
      this.ctx.fillStyle = "#ff9800"; // Orange for expected key
    } else {
      this.ctx.fillStyle = isPressed
        ? this.config.colors.blackKeyPressed
        : this.config.colors.blackKey;
    }

    createBottomRoundedRectPath(
      this.ctx,
      key.x,
      key.y,
      key.width,
      key.height,
      radius
    );
    this.ctx.fill();

    // Clear shadow and apply 3D effects
    clearShadow(this.ctx);

    // Apply 3D effects for unpressed keys
    if (!isPressed) {
      applyWhiteKey3DEffect(
        this.ctx,
        key.x,
        key.y,
        key.width,
        key.height / this.config.keyRatios.blackKeyHeightRatio
      );
    }

    // Draw keyboard key label
    this.drawKeyLabel(key, true);
  }

  /**
   * Draw keyboard key label at the bottom center of a piano key
   * @param {Object} key - Key object
   * @param {boolean} isBlackKey - Whether this is a black key
   */
  drawKeyLabel(key, isBlackKey = false) {
    // Check if keyboard labels are enabled in config
    if (!this.config.keyLabels || !this.config.keyLabels.visible) {
      return;
    }

    // Find the corresponding keyboard key from keyMap
    const mappedKey = keyMap.find((mapKey) => mapKey.note === key.note);
    if (!mappedKey || !mappedKey.key) return;

    // Set up text properties
    this.ctx.save();
    this.ctx.font = "12px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    this.ctx.fillStyle = "#ffffff"; // White text on black keys

    // Calculate position (bottom center of the key)
    const textX = key.x + key.width / 2;
    const textY = key.y + key.height - 15; // 15px from bottom

    // Draw the keyboard key label
    this.ctx.fillText(mappedKey.key.toUpperCase(), textX, textY);
    this.ctx.restore();
  }

  /**
   * Apply shadow effects to white keys
   * @param {boolean} isPressed - Whether the key is pressed
   */
  applyWhiteKeyShadow(isPressed) {
    if (!isPressed) {
      applyShadow(this.ctx, {
        color: "rgba(0, 255, 255, 0.3)",
        blur: 8,
        offsetX: 0,
        offsetY: 4,
      });
    } else {
      applyShadow(this.ctx, {
        color: "rgba(0, 255, 255, 0.8)",
        blur: 20,
        offsetX: 0,
        offsetY: 0,
      });
    }
  }

  /**
   * Apply shadow effects to black keys
   * @param {boolean} isPressed - Whether the key is pressed
   */
  applyBlackKeyShadow(isPressed) {
    if (!isPressed) {
      applyShadow(this.ctx, {
        color: "rgba(0, 0, 0, 0.4)",
        blur: 12,
        offsetX: 0,
        offsetY: 6,
      });
    } else {
      applyShadow(this.ctx, {
        color: "rgba(0, 255, 255, 0.8)",
        blur: 20,
        offsetX: 0,
        offsetY: 0,
      });
    }
  }

  /**
   * Draw the decorative cyan border at the top of the piano
   */
  drawTopBorder() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvas.width, 8);
    this.ctx.fillStyle = "#00ffff";
    this.ctx.fill();
    this.ctx.restore();
  }

  /**
   * Get canvas dimensions
   * @returns {Object} Canvas width and height
   */
  getCanvasDimensions() {
    return {
      width: this.canvas.width,
      height: this.canvas.height,
    };
  }
}
