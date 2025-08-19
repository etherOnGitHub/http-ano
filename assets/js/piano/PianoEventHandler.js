/**
 * PianoEventHandler - Handles all piano input events
 * Manages mouse, touch, and keyboard interactions with the piano
 */
export class PianoEventHandler {
  constructor(piano) {
    this.piano = piano;
    this.currentMouseKey = null;
    this.currentTouchKey = null;

    // Bind methods to preserve 'this' context
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.preventContextMenu = this.preventContextMenu.bind(this);
  }

  /**
   * Set up all event listeners for the piano
   */
  setupEventListeners() {
    this.setupMouseEvents();
    this.setupTouchEvents();
    this.setupResizeEvents();
    this.setupContextMenu();
  }

  /**
   * Set up mouse event listeners
   */
  setupMouseEvents() {
    this.piano.canvas.addEventListener("mousedown", this.handleMouseDown);
    window.addEventListener("mouseup", this.handleMouseUp);
  }

  /**
   * Set up touch event listeners for mobile support
   */
  setupTouchEvents() {
    this.piano.canvas.addEventListener("touchstart", this.handleTouchStart);
    this.piano.canvas.addEventListener("touchend", this.handleTouchEnd);
  }

  /**
   * Set up window resize event listener
   */
  setupResizeEvents() {
    window.addEventListener("resize", this.handleResize);
  }

  /**
   * Prevent context menu on right click
   */
  setupContextMenu() {
    this.piano.canvas.addEventListener("contextmenu", this.preventContextMenu);
  }

  /**
   * Handle mouse down events
   * @param {MouseEvent} event - Mouse event
   */
  handleMouseDown(event) {
    const key = this.piano.getKeyFromEvent(event);
    if (key) {
      console.log(`Piano key clicked: ${key.note} (${key.type} key)`);
      this.piano.pressKey(key.note);
      this.currentMouseKey = key.note;
    }
  }

  /**
   * Handle mouse up events
   * @param {MouseEvent} event - Mouse event
   */
  handleMouseUp(event) {
    if (!this.currentMouseKey) return;
    
    this.piano.releaseKey(this.currentMouseKey);
    this.currentMouseKey = null;
  }

  /**
   * Handle touch start events
   * @param {TouchEvent} event - Touch event
   */
  handleTouchStart(event) {
    event.preventDefault(); // Prevent scrolling
    const key = this.piano.getKeyFromEvent(event);
    if (key) {
      console.log(`Piano key touched: ${key.note} (${key.type} key)`);
      this.piano.pressKey(key.note);
      this.currentTouchKey = key.note;
    }
  }

  /**
   * Handle touch end events
   * @param {TouchEvent} event - Touch event
   */
  handleTouchEnd(event) {
    event.preventDefault();
    if (this.currentTouchKey) {
      this.piano.releaseKey(this.currentTouchKey);
      this.currentTouchKey = null;
    }
  }

  /**
   * Handle window resize events (debounced)
   */
  handleResize() {
    this.piano.handleResize();
  }

  /**
   * Prevent context menu on right click
   * @param {Event} event - Context menu event
   */
  preventContextMenu(event) {
    event.preventDefault();
  }

  /**
   * Clean up event listeners (useful for destroying piano instance)
   */
  cleanup() {
    this.piano.canvas.removeEventListener("mousedown", this.handleMouseDown);
    this.piano.canvas.removeEventListener("mouseup", this.handleMouseUp);
    this.piano.canvas.removeEventListener("touchstart", this.handleTouchStart);
    this.piano.canvas.removeEventListener("touchend", this.handleTouchEnd);
    this.piano.canvas.removeEventListener(
      "contextmenu",
      this.preventContextMenu
    );
    window.removeEventListener("resize", this.handleResize);
  }

  /**
   * Get current interaction state
   * @returns {Object} Current state of interactions
   */
  getInteractionState() {
    return {
      currentMouseKey: this.currentMouseKey,
      currentTouchKey: this.currentTouchKey,
      hasActiveInteraction: !!(this.currentMouseKey || this.currentTouchKey),
    };
  }
}
