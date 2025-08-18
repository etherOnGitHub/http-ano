/**
 * Piano Module - Main entry point for the modular piano system
 * Exports all piano-related classes and configurations
 */

// Main Piano class
export { default as Piano } from "./Piano.js";

// Individual modules for advanced usage
export { KeyGenerator } from "./KeyGenerator.js";
export { PianoEventHandler } from "./PianoEventHandler.js";
export { PianoRenderer } from "./PianoRenderer.js";
export { PIANO_CONFIG, PianoConfigHelper } from "./PianoConfig.js";

// Re-export the default Piano class as the main export
export { default } from "./Piano.js";
