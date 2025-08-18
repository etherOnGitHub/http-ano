import {
  applyShadow,
  clearShadow,
  drawNeonBorder,
  applyWhiteKey3DEffect,
  applyPressedGlowEffect,
  createBottomRoundedRectPath,
  applyBlackKey3DEffect,
} from "../canvasHelpers.js";

/**
 * PianoRenderer - Handles all piano canvas rendering operations
 * Responsible for drawing the piano keys with all visual effects
 */
export class PianoRenderer {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.config = config;
  }

  /**
   * Draw the complete piano with all keys
   * @param {Array} keys - Array of key objects
   * @param {Set} pressedKeys - Set of currently pressed key notes
   */
  draw(keys, pressedKeys) {
    this.clearCanvas();
    this.drawKeys(keys, pressedKeys);
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
   */
  drawKeys(keys, pressedKeys) {
    // Draw white keys first (background layer)
    keys
      .filter((key) => key.type === "white")
      .forEach((key) => {
        this.drawKey(key, pressedKeys.has(key.note));
      });

    // Draw black keys on top (foreground layer)
    keys
      .filter((key) => key.type === "black")
      .forEach((key) => {
        this.drawKey(key, pressedKeys.has(key.note));
      });
  }

  /**
   * Draw a single piano key with all effects
   * @param {Object} key - Key object with position and note information
   * @param {boolean} isPressed - Whether the key is currently pressed
   */
  drawKey(key, isPressed) {
    this.ctx.save();

    if (key.type === "white") {
      this.drawWhiteKey(key, isPressed);
    } else {
      this.drawBlackKey(key, isPressed);
    }

    this.ctx.restore();
  }

  /**
   * Draw a white key with all visual effects
   * @param {Object} key - Key object
   * @param {boolean} isPressed - Whether the key is pressed
   */
  drawWhiteKey(key, isPressed) {
    // Apply shadow effects
    this.applyWhiteKeyShadow(isPressed);

    // Set fill color and draw main body
    this.ctx.fillStyle = isPressed
      ? this.config.colors.whiteKeyPressed
      : this.config.colors.whiteKey;
    this.ctx.fillRect(key.x, key.y, key.width, key.height);

    // Clear shadow for additional effects
    clearShadow(this.ctx);

    // Apply 3D visual effects
    if (!isPressed) {
      applyWhiteKey3DEffect(this.ctx, key.x, key.y, key.width, key.height);
    } else {
      applyPressedGlowEffect(this.ctx, key.x, key.y, key.width, key.height);
    }

    // Draw border
    this.ctx.strokeStyle = this.config.colors.whiteKeyBorder;
    this.ctx.lineWidth = 4;
    this.ctx.strokeRect(key.x, key.y, key.width, key.height);
  }

  /**
   * Draw a black key with all visual effects
   * @param {Object} key - Key object
   * @param {boolean} isPressed - Whether the key is pressed
   */
  drawBlackKey(key, isPressed) {
    const radius = 6;

    // Draw neon border effect
    drawNeonBorder(
      this.ctx,
      key.x,
      key.y,
      key.width,
      key.height,
      radius,
      "rgba(255, 20, 147, 0.9)"
    );

    // Apply shadow effects
    this.applyBlackKeyShadow(isPressed);

    // Set fill color and draw rounded rectangle
    this.ctx.fillStyle = isPressed
      ? this.config.colors.blackKeyPressed
      : this.config.colors.blackKey;

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
      applyBlackKey3DEffect(
        this.ctx,
        key.x,
        key.y,
        key.width,
        key.height,
        radius
      );
    }
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

  /**
   * Resize the canvas and update context reference
   * @param {number} width - New canvas width
   * @param {number} height - New canvas height
   */
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    // Context might need to be re-obtained after resize
    this.ctx = this.canvas.getContext("2d");
  }
}
