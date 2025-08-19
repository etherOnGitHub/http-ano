import {
  applyShadow,
  clearShadow,
  drawNeonBorder,
  applyWhiteKey3DEffect,
  applyPressedGlowEffect,
  createBottomRoundedRectPath,
  applyBlackKey3DEffect,
} from "./helpers/canvasHelpers.js";

/**
 * PianoRenderer - Handles all piano canvas rendering operations
 * Responsible for drawing the piano keys with all visual effects and canvas management
 */
export class PianoRenderer {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.config = config;
    this.containerPadding = 2;
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

    // Add padding to canvas dimensions
    this.canvas.width = targetWidth + this.containerPadding * 2;
    this.canvas.height =
      targetWidth * this.config.aspectRatio + this.containerPadding * 2;

    // Set CSS size for proper aspect ratio
    this.canvas.style.width = targetWidth + this.containerPadding * 2 + "px";
    this.canvas.style.height =
      targetWidth * this.config.aspectRatio + this.containerPadding * 2 + "px";

    // Update context reference after resize
    this.ctx = this.canvas.getContext("2d");

    return {
      width: targetWidth + this.containerPadding * 2,
      height: targetWidth * this.config.aspectRatio + this.containerPadding * 2,
    };
  }

  /**
   * Draw the complete piano with all keys
   * @param {Array} keys - Array of key objects
   * @param {Set} pressedKeys - Set of currently pressed key notes
   */
  draw(keys, pressedKeys) {
    this.clearCanvas();
    // Highlight expected note if set
    let expectedNote = window.expectedNote;
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
   */
  drawKeys(keys, pressedKeys, expectedNote) {
    // Draw white keys first (background layer)
    keys
      .filter((key) => key.type === "white")
      .forEach((key) => {
        this.drawKey(
          {
            ...key,
            x: key.x + this.containerPadding,
            y: key.y + this.containerPadding,
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
            x: key.x + this.containerPadding,
            y: key.y + this.containerPadding,
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
   */
  drawKey(key, isPressed, isExpected) {
    if (isExpected) {
      console.log("Highlighting key:", key.note, "Key binding:", key.key);
    }
    this.ctx.save();

    if (key.type === "white") {
      this.drawWhiteKey(key, isPressed, isExpected);
    } else {
      this.drawBlackKey(key, isPressed, isExpected);
    }

    // Draw key label (key binding) under expected note
    if (isExpected && key.key) {
      this.ctx.font = "bold 16px Arial";
      this.ctx.fillStyle = "#ff9800";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        key.key,
        key.x + key.width / 2,
        key.y + key.height + 18
      );
    }

    this.ctx.restore();
  }

  /**
   * Draw a white key with all visual effects
   * @param {Object} key - Key object
   * @param {boolean} isPressed - Whether the key is pressed
   */
  drawWhiteKey(key, isPressed, isExpected) {
    // Draw neon glow to match border color
    if (isExpected && !isPressed) {
      drawNeonBorder(
        this.ctx,
        key.x,
        key.y,
        key.width,
        key.height,
        8,
        "#ff9800"
      );
    } else {
      drawNeonBorder(
        this.ctx,
        key.x,
        key.y,
        key.width,
        key.height,
        8,
        "rgba(0, 255, 255, 0.9)"
      );
    }
    // Draw orange background behind expected key
    if (isExpected && !isPressed) {
      this.ctx.save();
      this.ctx.globalAlpha = 0.5;
      this.ctx.fillStyle = "#ff9800";
      this.ctx.fillRect(key.x - 2, key.y - 2, key.width + 4, key.height + 4);
      this.ctx.restore();
    }
    // Make white key height slightly shorter than full height
    const keyHeightShorten = 4; // px
    this.ctx.fillStyle = isPressed
      ? this.config.colors.whiteKeyPressed
      : this.config.colors.whiteKey;
    this.ctx.fillRect(key.x, key.y, key.width, key.height - keyHeightShorten);
    // Restore context state
    this.ctx.restore();

    // Draw key border
    if (isExpected && !isPressed) {
      this.ctx.strokeStyle = "#ff9800";
    } else {
      this.ctx.strokeStyle = "rgba(0, 255, 255, 0.9)";
    }
    this.ctx.lineWidth = 4;
    this.ctx.strokeRect(key.x, key.y, key.width, key.height - keyHeightShorten);

    // Clear shadow for additional effects
    clearShadow(this.ctx);

    // Apply 3D visual effects
    if (!isPressed) {
      applyWhiteKey3DEffect(
        this.ctx,
        key.x,
        key.y,
        key.width,
        key.height - keyHeightShorten
      );
    } else {
      applyPressedGlowEffect(
        this.ctx,
        key.x,
        key.y,
        key.width,
        key.height - keyHeightShorten
      );
    }
  }

  /**
   * Draw a black key with all visual effects
   * @param {Object} key - Key object
   * @param {boolean} isPressed - Whether the key is pressed
   */
  drawBlackKey(key, isPressed, isExpected) {
    // Draw orange background behind expected black key
    if (isExpected && !isPressed) {
      this.ctx.save();
      this.ctx.globalAlpha = 0.5;
      this.ctx.fillStyle = "#ff9800";
      this.ctx.fillRect(key.x - 2, key.y - 2, key.width + 4, key.height + 4);
      this.ctx.restore();
    }
    const radius = 6;

    // Draw neon border effect (orange if expected and not pressed, pink otherwise)
    if (isExpected && !isPressed) {
      drawNeonBorder(
        this.ctx,
        key.x,
        key.y,
        key.width,
        key.height,
        radius,
        "#ff9800"
      );
      // Only draw orange border
      this.ctx.save();
      this.ctx.strokeStyle = "#ff9800";
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(key.x, key.y, key.width, key.height);
      this.ctx.restore();
    } else {
      drawNeonBorder(
        this.ctx,
        key.x,
        key.y,
        key.width,
        key.height,
        radius,
        "rgba(255, 20, 147, 0.9)"
      );
      // No border for non-expected black keys
    }

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
    // Restore context state
    this.ctx.restore();

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
