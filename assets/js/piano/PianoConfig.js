/**
 * PianoConfig - Central configuration for piano settings
 * Contains all configuration constants and default values
 */
export const PIANO_CONFIG = {
  // Canvas and sizing configuration
  aspectRatio: 0.18, // Height to width ratio for multi-octave piano (smaller for wider keyboard)
  maxWidth: 1400, // Maximum width for piano in pixels (increased for more keys)
  minWidth: 700, // Minimum width for piano in pixels (increased for more keys)
  responsiveWidthPercent: 1, // Percentage of container width to use

  // Visual configuration
  colors: {
    whiteKey: "#0a0a0a",
    whiteKeyPressed: "#00ffff",
    whiteKeyBorder: "#00ffff",
    blackKey: "#0a0a0a",
    blackKeyPressed: "#00ffff",
    background: "#1a1a1a",
  },

  // Key sizing ratios
  keyRatios: {
    blackKeyWidthRatio: 0.6, // Black key width as ratio of white key width
    blackKeyHeightRatio: 0.6, // Black key height as ratio of white key height
  },

  // Visual effects configuration
  effects: {
    shadowBlur: {
      whiteKeyNormal: 8,
      whiteKeyPressed: 20,
      blackKeyNormal: 12,
      blackKeyPressed: 20,
    },
    shadowOffset: {
      whiteKeyNormal: { x: 0, y: 4 },
      whiteKeyPressed: { x: 0, y: 0 },
      blackKeyNormal: { x: 0, y: 6 },
      blackKeyPressed: { x: 0, y: 0 },
    },
    borderWidth: 4,
    topBorderHeight: 8,
    blackKeyRadius: 6,
  },

  // Responsive behavior
  responsive: {
    maxWindowWidthPercent: 1, // Never more than this percent of window width (increased for wider piano)
    resizeDebounceMs: 250, // Debounce time for resize events
  },

  // Piano layout configuration
  layout: {
    defaultOctave: 4,
    numOctaves: 3, // Number of full octaves to display (C4-B4, C5-B5)
    whiteKeysPerOctave: 7,
    notePattern: ["C", "D", "E", "F", "G", "A", "B"],
    blackKeyPattern: [1, 1, 0, 1, 1, 1, 0], // Which notes have sharps
  },
};

/**
 * Configuration validator and helper functions
 */
export class PianoConfigHelper {
  /**
   * Validate piano configuration
   * @param {Object} config - Configuration object to validate
   * @returns {boolean} True if configuration is valid
   */
  static validateConfig(config) {
    const required = [
      "aspectRatio",
      "maxWidth",
      "minWidth",
      "responsiveWidthPercent",
      "colors",
    ];

    return required.every((key) => key in config);
  }

  /**
   * Merge user configuration with defaults
   * @param {Object} userConfig - User-provided configuration
   * @returns {Object} Merged configuration
   */
  static mergeConfig(userConfig = {}) {
    return {
      ...PIANO_CONFIG,
      ...userConfig,
      colors: {
        ...PIANO_CONFIG.colors,
        ...userConfig.colors,
      },
      effects: {
        ...PIANO_CONFIG.effects,
        ...userConfig.effects,
      },
    };
  }

  /**
   * Get color configuration for a specific key state
   * @param {string} keyType - 'white' or 'black'
   * @param {boolean} isPressed - Whether key is pressed
   * @returns {string} Color value
   */
  static getKeyColor(keyType, isPressed) {
    if (keyType === "white") {
      return isPressed
        ? PIANO_CONFIG.colors.whiteKeyPressed
        : PIANO_CONFIG.colors.whiteKey;
    } else {
      return isPressed
        ? PIANO_CONFIG.colors.blackKeyPressed
        : PIANO_CONFIG.colors.blackKey;
    }
  }

  /**
   * Get shadow configuration for a specific key state
   * @param {string} keyType - 'white' or 'black'
   * @param {boolean} isPressed - Whether key is pressed
   * @returns {Object} Shadow configuration object
   */
  static getShadowConfig(keyType, isPressed) {
    const stateKey = isPressed ? "Pressed" : "Normal";
    const typeKey = keyType === "white" ? "whiteKey" : "blackKey";
    const configKey = typeKey + stateKey;

    return {
      blur: PIANO_CONFIG.effects.shadowBlur[configKey],
      offset: PIANO_CONFIG.effects.shadowOffset[configKey],
    };
  }
}
