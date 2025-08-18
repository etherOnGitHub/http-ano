// Canvas Helper Functions
// Reusable functions for common canvas drawing operations

/**
 * Apply shadow effect to canvas context
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} shadowConfig - Shadow configuration
 * @param {string} shadowConfig.color - Shadow color (rgba string)
 * @param {number} shadowConfig.blur - Shadow blur amount
 * @param {number} shadowConfig.offsetX - Shadow X offset
 * @param {number} shadowConfig.offsetY - Shadow Y offset
 */
export function applyShadow(ctx, shadowConfig) {
  ctx.shadowColor = shadowConfig.color;
  ctx.shadowBlur = shadowConfig.blur;
  ctx.shadowOffsetX = shadowConfig.offsetX;
  ctx.shadowOffsetY = shadowConfig.offsetY;
}

/**
 * Clear shadow effects from canvas context
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 */
export function clearShadow(ctx) {
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

/**
 * Create and apply a linear gradient
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x1 - Start X coordinate
 * @param {number} y1 - Start Y coordinate
 * @param {number} x2 - End X coordinate
 * @param {number} y2 - End Y coordinate
 * @param {Array} colorStops - Array of {offset, color} objects
 * @returns {CanvasGradient} - The created gradient
 */
export function createLinearGradient(ctx, x1, y1, x2, y2, colorStops) {
  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  colorStops.forEach((stop) => {
    gradient.addColorStop(stop.offset, stop.color);
  });
  return gradient;
}

/**
 * Apply a linear gradient and fill a rectangle
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Rectangle X position
 * @param {number} y - Rectangle Y position
 * @param {number} width - Rectangle width
 * @param {number} height - Rectangle height
 * @param {number} gradientX1 - Gradient start X
 * @param {number} gradientY1 - Gradient start Y
 * @param {number} gradientX2 - Gradient end X
 * @param {number} gradientY2 - Gradient end Y
 * @param {Array} colorStops - Array of {offset, color} objects
 */
export function fillRectWithGradient(
  ctx,
  x,
  y,
  width,
  height,
  gradientX1,
  gradientY1,
  gradientX2,
  gradientY2,
  colorStops
) {
  const gradient = createLinearGradient(
    ctx,
    gradientX1,
    gradientY1,
    gradientX2,
    gradientY2,
    colorStops
  );
  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, width, height);
}

/**
 * Draw a rounded rectangle path (doesn't fill or stroke)
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Rectangle X position
 * @param {number} y - Rectangle Y position
 * @param {number} width - Rectangle width
 * @param {number} height - Rectangle height
 * @param {number} radius - Corner radius
 * @param {Object} corners - Which corners to round {topLeft, topRight, bottomLeft, bottomRight}
 */
export function createRoundedRectPath(
  ctx,
  x,
  y,
  width,
  height,
  radius,
  corners = {
    topLeft: true,
    topRight: true,
    bottomLeft: true,
    bottomRight: true,
  }
) {
  ctx.beginPath();

  // Start from top-left corner
  ctx.moveTo(x + (corners.topLeft ? radius : 0), y);

  // Top edge and top-right corner
  if (corners.topRight) {
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
  } else {
    ctx.lineTo(x + width, y);
  }

  // Right edge and bottom-right corner
  if (corners.bottomRight) {
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
  } else {
    ctx.lineTo(x + width, y + height);
  }

  // Bottom edge and bottom-left corner
  if (corners.bottomLeft) {
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
  } else {
    ctx.lineTo(x, y + height);
  }

  // Left edge and top-left corner
  if (corners.topLeft) {
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
  } else {
    ctx.lineTo(x, y);
  }

  ctx.closePath();
}

/**
 * Draw a rounded rectangle with only bottom corners rounded
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Rectangle X position
 * @param {number} y - Rectangle Y position
 * @param {number} width - Rectangle width
 * @param {number} height - Rectangle height
 * @param {number} radius - Corner radius
 */
export function createBottomRoundedRectPath(ctx, x, y, width, height, radius) {
  createRoundedRectPath(ctx, x, y, width, height, radius, {
    topLeft: false,
    topRight: false,
    bottomLeft: true,
    bottomRight: true,
  });
}

/**
 * Draw a glow effect around a rectangle
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Rectangle X position
 * @param {number} y - Rectangle Y position
 * @param {number} width - Rectangle width
 * @param {number} height - Rectangle height
 * @param {string} glowColor - Glow color (rgba string)
 * @param {number} glowSize - Size of the glow effect
 * @param {number} lineWidth - Stroke line width
 */
export function drawGlowRect(
  ctx,
  x,
  y,
  width,
  height,
  glowColor,
  glowSize,
  lineWidth
) {
  // Save context
  ctx.save();

  // Apply glow shadow
  applyShadow(ctx, {
    color: glowColor,
    blur: glowSize,
    offsetX: 0,
    offsetY: 0,
  });

  // Draw the glow stroke
  ctx.strokeStyle = glowColor;
  ctx.lineWidth = lineWidth;
  ctx.strokeRect(x, y, width, height);

  // Restore context
  ctx.restore();
}

/**
 * Draw neon glow border effect with rounded bottom corners (multiple layers)
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Rectangle X position
 * @param {number} y - Rectangle Y position
 * @param {number} width - Rectangle width
 * @param {number} height - Rectangle height
 * @param {number} radius - Corner radius for bottom corners
 * @param {string} glowColor - Base glow color
 */
export function drawNeonBorder(
  ctx,
  x,
  y,
  width,
  height,
  radius,
  glowColor
) {
  // Save context
  ctx.save();

  // Outer glow (larger)
  applyShadow(ctx, {
    color: glowColor,
    blur: 15,
    offsetX: 0,
    offsetY: 0,
  });
  ctx.strokeStyle = glowColor;
  ctx.lineWidth = 4;
  createBottomRoundedRectPath(ctx, x - 2, y - 2, width + 4, height + 4, radius);
  ctx.stroke();

  // Inner glow (smaller, brighter)
  applyShadow(ctx, {
    color: glowColor,
    blur: 8,
    offsetX: 0,
    offsetY: 0,
  });
  ctx.lineWidth = 2;
  createBottomRoundedRectPath(ctx, x - 1, y - 1, width + 2, height + 2, radius);
  ctx.stroke();

  // Restore context
  ctx.restore();
}

/**
 * Apply 3D highlight effect to white keys
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Key X position
 * @param {number} y - Key Y position
 * @param {number} width - Key width
 * @param {number} height - Key height
 * @param {string} highlightColor - Highlight color base (without alpha)
 */
export function applyWhiteKey3DEffect(
  ctx,
  x,
  y,
  width,
  height,
  highlightColor = "0, 255, 255"
) {
  // Top highlight with cyan tint
  fillRectWithGradient(
    ctx,
    x,
    y,
    width,
    height * 0.4,
    x,
    y,
    x,
    y + height * 0.3,
    [
      { offset: 0, color: `rgba(${highlightColor}, 0.4)` },
      { offset: 1, color: `rgba(${highlightColor}, 0.0)` },
    ]
  );

  // Bottom shadow for depth
  fillRectWithGradient(
    ctx,
    x,
    y + height * 0.7,
    width,
    height * 0.3,
    x,
    y + height * 0.7,
    x,
    y + height,
    [
      { offset: 0, color: "rgba(0, 0, 0, 0)" },
      { offset: 1, color: "rgba(0, 0, 0, 0.3)" },
    ]
  );
}

/**
 * Apply pressed state glow effect
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Key X position
 * @param {number} y - Key Y position
 * @param {number} width - Key width
 * @param {number} height - Key height
 * @param {string} glowColor - Glow color base (without alpha)
 */
export function applyPressedGlowEffect(
  ctx,
  x,
  y,
  width,
  height,
  glowColor = "0, 255, 255"
) {
  fillRectWithGradient(
    ctx,
    x,
    y,
    width,
    height * 0.2,
    x,
    y,
    x,
    y + height * 0.2,
    [
      { offset: 0, color: `rgba(${glowColor}, 0.3)` },
      { offset: 1, color: `rgba(${glowColor}, 0)` },
    ]
  );
}

/**
 * Apply 3D effect to black keys with rounded corners
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Key X position
 * @param {number} y - Key Y position
 * @param {number} width - Key width
 * @param {number} height - Key height
 * @param {number} radius - Corner radius
 * @param {string} highlightColor - Highlight color base (without alpha)
 */
export function applyBlackKey3DEffect(
  ctx,
  x,
  y,
  width,
  height,
  radius,
  highlightColor = "0, 255, 255"
) {
  // Create the rounded path for gradients
  createBottomRoundedRectPath(ctx, x, y, width, height, radius);

  // Top highlight for glossy effect with cyan tint
  const blackGradient = createLinearGradient(ctx, x, y, x, y + height * 0.4, [
    { offset: 0, color: `rgba(${highlightColor}, 0.2)` },
    { offset: 0.3, color: `rgba(${highlightColor}, 0.05)` },
    { offset: 1, color: `rgba(${highlightColor}, 0)` },
  ]);
  ctx.fillStyle = blackGradient;
  ctx.fill();

  // Side highlights for rounded appearance
  ctx.fillStyle = `rgba(${highlightColor}, 0.1)`;
  ctx.fillRect(x, y, 2, height - radius);
  ctx.fillRect(x + width - 2, y, 2, height - radius);
}
