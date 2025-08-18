// Canvas Helper Functions
// Reusable functions for common canvas drawing operations

/**
 * Apply shadow effect to canvas context
 */
export function applyShadow(ctx, shadowConfig) {
  ctx.shadowColor = shadowConfig.color;
  ctx.shadowBlur = shadowConfig.blur;
  ctx.shadowOffsetX = shadowConfig.offsetX;
  ctx.shadowOffsetY = shadowConfig.offsetY;
}

/**
 * Clear shadow effects from canvas context
 */
export function clearShadow(ctx) {
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

/**
 * Create and apply a linear gradient
 */
export function createLinearGradient(
  ctx,
  startX,
  startY,
  endX,
  endY,
  colorStops
) {
  const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
  colorStops.forEach((stop) => {
    gradient.addColorStop(stop.offset, stop.color);
  });
  return gradient;
}

/**
 * Apply a linear gradient and fill a rectangle
 */
export function fillRectWithGradient(
  ctx,
  x,
  y,
  width,
  height,
  gradientStartX,
  gradientStartY,
  gradientEndX,
  gradientEndY,
  colorStops
) {
  const gradient = createLinearGradient(
    ctx,
    gradientStartX,
    gradientStartY,
    gradientEndX,
    gradientEndY,
    colorStops
  );
  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, width, height);
}

/**
 * Draw a rounded rectangle path (doesn't fill or stroke)
 */
export function createRoundedRectPath(
  ctx,
  x,
  y,
  width,
  height,
  cornerRadius,
  corners = {
    topLeft: true,
    topRight: true,
    bottomLeft: true,
    bottomRight: true,
  }
) {
  ctx.beginPath();

  // Start from top-left corner
  ctx.moveTo(x + (corners.topLeft ? cornerRadius : 0), y);

  // Top edge and top-right corner
  if (corners.topRight) {
    ctx.lineTo(x + width - cornerRadius, y);
    ctx.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);
  } else {
    ctx.lineTo(x + width, y);
  }

  // Right edge and bottom-right corner
  if (corners.bottomRight) {
    ctx.lineTo(x + width, y + height - cornerRadius);
    ctx.arcTo(
      x + width,
      y + height,
      x + width - cornerRadius,
      y + height,
      cornerRadius
    );
  } else {
    ctx.lineTo(x + width, y + height);
  }

  // Bottom edge and bottom-left corner
  if (corners.bottomLeft) {
    ctx.lineTo(x + cornerRadius, y + height);
    ctx.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);
  } else {
    ctx.lineTo(x, y + height);
  }

  // Left edge and top-left corner
  if (corners.topLeft) {
    ctx.lineTo(x, y + cornerRadius);
    ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);
  } else {
    ctx.lineTo(x, y);
  }

  ctx.closePath();
}

/**
 * Draw a rounded rectangle with only bottom corners rounded
 */
export function createBottomRoundedRectPath(
  ctx,
  x,
  y,
  width,
  height,
  cornerRadius
) {
  createRoundedRectPath(ctx, x, y, width, height, cornerRadius, {
    topLeft: false,
    topRight: false,
    bottomLeft: true,
    bottomRight: true,
  });
}

/**
 * Draw a glow effect around a rectangle
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
 */
export function drawNeonBorder(
  ctx,
  x,
  y,
  width,
  height,
  cornerRadius,
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
  createBottomRoundedRectPath(
    ctx,
    x - 2,
    y - 2,
    width + 4,
    height + 4,
    cornerRadius
  );
  ctx.stroke();

  // Inner glow (smaller, brighter)
  applyShadow(ctx, {
    color: glowColor,
    blur: 8,
    offsetX: 0,
    offsetY: 0,
  });
  ctx.lineWidth = 2;
  createBottomRoundedRectPath(
    ctx,
    x - 1,
    y - 1,
    width + 2,
    height + 2,
    cornerRadius
  );
  ctx.stroke();

  // Restore context
  ctx.restore();
}

/**
 * Apply 3D highlight effect to white keys
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
 */
export function applyBlackKey3DEffect(
  ctx,
  x,
  y,
  width,
  height,
  cornerRadius,
  highlightColor = "0, 255, 255"
) {
  // Create the rounded path for gradients
  createBottomRoundedRectPath(ctx, x, y, width, height, cornerRadius);

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
  ctx.fillRect(x, y, 2, height - cornerRadius);
  ctx.fillRect(x + width - 2, y, 2, height - cornerRadius);
}
