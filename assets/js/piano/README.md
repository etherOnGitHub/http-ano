# Piano Module Documentation

## Overview

The Piano module is a modular, canvas-based piano implementation designed for web applications. It provides a responsive, interactive piano interface with visual effects and sound playback.

## Architecture

The Piano module follows a modular architecture with separated concerns:

```
piano/
├── Piano.js           # Main piano class that coordinates all components
├── KeyGenerator.js    # Handles piano key layout generation
├── PianoEventHandler.js # Manages all input events (mouse, touch, keyboard)
├── PianoRenderer.js   # Handles all canvas rendering operations
├── PianoConfig.js     # Central configuration and helper functions
├── index.js          # Main entry point that exports all modules
└── README.md         # This documentation file
```

## Quick Start

### Basic Usage

```javascript
import Piano from "./assets/js/piano/Piano.js";

// Create a piano instance
const piano = new Piano("myCanvasId");

// The piano is now ready to use!
```

### Advanced Usage with Custom Configuration

```javascript
import Piano, { PIANO_CONFIG } from "./assets/js/piano/index.js";

// Custom configuration
const customConfig = {
  maxWidth: 800,
  colors: {
    whiteKey: "#ffffff",
    blackKey: "#000000"
  }
};

const piano = new Piano("myCanvasId", customConfig);
```

## API Reference

### Piano Class

#### Constructor
```javascript
new Piano(canvasId, userConfig = {})
```
- `canvasId`: String ID of the canvas element
- `userConfig`: Optional configuration object

#### Methods

##### Key Interaction
- `pressKey(note)` - Press a specific key
- `releaseKey(note)` - Release a specific key
- `releaseAllKeys()` - Release all pressed keys
- `getKeyAtPosition(x, y)` - Get key at canvas coordinates
- `getKeyFromEvent(event)` - Get key from mouse/touch event

##### Information
- `getAllKeys()` - Get information about all keys
- `getPressedKeys()` - Get currently pressed keys
- `getConfig()` - Get current configuration
- `getState()` - Get complete piano state

##### Control
- `setOctave(octave)` - Change the octave (0-8)
- `handleResize()` - Handle window resize events
- `destroy()` - Clean up and destroy the piano instance

### Configuration Options

```javascript
const config = {
  // Canvas sizing
  aspectRatio: 0.45,
  maxWidth: 600,
  minWidth: 300,
  responsiveWidthPercent: 0.8,
  
  // Colors
  colors: {
    whiteKey: "#0a0a0a",
    whiteKeyPressed: "#1a1a1a",
    whiteKeyBorder: "#00ffff",
    blackKey: "#0a0a0a",
    blackKeyPressed: "#00ffff",
    background: "#1a1a1a",
  },
  
  // Responsive behavior
  responsive: {
    maxWindowWidthPercent: 0.8,
    resizeDebounceMs: 250,
  },
  
  // Layout
  layout: {
    defaultOctave: 4,
    whiteKeysPerOctave: 7,
  }
};
```

## Individual Modules

### KeyGenerator

Handles the generation of piano key layouts.

```javascript
import { KeyGenerator } from "./assets/js/piano/KeyGenerator.js";

const keyGen = new KeyGenerator(config);
const keys = keyGen.generateOctaveKeys(width, height, octave);
```

### PianoEventHandler

Manages all input events for the piano.

```javascript
import { PianoEventHandler } from "./assets/js/piano/PianoEventHandler.js";

const eventHandler = new PianoEventHandler(pianoInstance);
eventHandler.setupEventListeners();
```

### PianoRenderer

Handles all canvas rendering operations.

```javascript
import { PianoRenderer } from "./assets/js/piano/PianoRenderer.js";

const renderer = new PianoRenderer(canvas, config);
renderer.draw(keys, pressedKeys);
```

### PianoConfig

Central configuration and helper functions.

```javascript
import { PIANO_CONFIG, PianoConfigHelper } from "./assets/js/piano/PianoConfig.js";

// Use default config
const defaultConfig = PIANO_CONFIG;

// Merge with custom config
const mergedConfig = PianoConfigHelper.mergeConfig(userConfig);

// Validate configuration
const isValid = PianoConfigHelper.validateConfig(config);
```

## Features

- **Responsive Design**: Automatically adapts to different screen sizes
- **Touch Support**: Works on mobile devices with touch events
- **Visual Effects**: 3D key effects, shadows, and neon glow borders
- **Modular Architecture**: Each component can be used independently
- **Configurable**: Extensive configuration options for customization
- **Type Safety**: Well-documented APIs with clear parameter types
- **Event Handling**: Comprehensive mouse and touch event handling
- **Performance**: Debounced resize events and efficient rendering

## Browser Support

- Modern browsers with ES6 module support
- Canvas 2D context support required
- Touch events for mobile support

## Dependencies

- `canvasHelpers.js` - Canvas utility functions
- `pianoKeyPress.js` - Keyboard mapping
- `sound.js` - Audio playback functionality

## Examples

### Changing Octave
```javascript
// Change to octave 5
piano.setOctave(5);
```

### Getting Piano State
```javascript
const state = piano.getState();
console.log('Currently pressed keys:', state.pressedKeys);
console.log('Piano dimensions:', state.dimensions);
```

### Custom Event Handling
```javascript
// Access the event handler for custom behavior
const eventHandler = piano.eventHandler;
const interactionState = eventHandler.getInteractionState();
```

### Cleanup
```javascript
// Properly destroy the piano when done
piano.destroy();
```

## Performance Considerations

- Resize events are debounced (250ms default)
- Canvas redraws only occur when necessary
- Event listeners are properly cleaned up in destroy()
- Modular design allows for selective importing

## Contributing

When extending the piano module:

1. Follow the modular architecture
2. Keep individual modules focused on single responsibilities
3. Use the configuration system for customizable options
4. Add proper JSDoc documentation
5. Test across different screen sizes and devices
