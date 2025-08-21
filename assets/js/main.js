import Piano from './piano/Piano.js';
import { setupVirtualKeyboard, keyMap } from './pianoKeyPress.js';
import { testPlayAlong, PlayAlongController, renderPlayAlongControls } from './playAlong.js';
import { Recorder, setupRecorderButtons } from './piano/recorder.js';

// =========================
// INITIALIZATION
// =========================
document.addEventListener('DOMContentLoaded', function () {
    // Stop current play-along when changing songs
    document.getElementById('song-select')?.addEventListener('change', function () {
        if (window.playAlongController) {
            window.playAlongController.stop();
            window.expectedNote = null;
            document.dispatchEvent(new Event('playalongfinished'));
            if (window.piano) window.piano.draw();
        }
    });
    // Direct event listeners for Play/Stop buttons
    document.getElementById('play-song')?.addEventListener('click', function () {
        const songName = document.getElementById('song-select').value;
        window.playAlongController = new PlayAlongController(songName, keyMap);
        window.playAlongController.start();
        window.expectedNote =
            window.playAlongController.song[window.playAlongController.currentIndex];
        updateKeybindIndicator();
        if (window.piano) window.piano.draw();
    });

    document.getElementById('stop-song')?.addEventListener('click', function () {
        if (window.playAlongController) {
            window.playAlongController.stop();
            window.expectedNote = null;
            updateKeybindIndicator();
            if (window.piano) window.piano.draw();
        }
    });
    // Initialize modular piano with default configuration
    const piano = new Piano('piano');

    // Make piano globally accessible for potential future features
    window.piano = piano;
    // Initialize recorder with the piano instance
    const recorder = new Recorder(piano);
    window.recorder = recorder;
    setupRecorderButtons();

    // Initialize playalong controls with default song
    const songSelect = document.getElementById('song-select');
    function attachPlayAlongListeners() {
        document.getElementById('play-song')?.addEventListener('click', function () {
            const songName = document.getElementById('song-select').value;
            window.playAlongController = new PlayAlongController(songName, keyMap);
            window.playAlongController.start();
            window.expectedNote =
                window.playAlongController.song[window.playAlongController.currentIndex];
            updateKeybindIndicator();
            if (window.piano) window.piano.draw();
        });
        document.getElementById('stop-song')?.addEventListener('click', function () {
            if (window.playAlongController) {
                window.playAlongController.stop();
                window.expectedNote = null;
                updateKeybindIndicator();
                if (window.piano) window.piano.draw();
            }
        });
    }

    function renderAndAttachControls(songName) {
        renderPlayAlongControls(songName);
        attachPlayAlongListeners();
    }

    renderAndAttachControls(songSelect.value);

    // Update controls when song selection changes
    songSelect.addEventListener('change', function () {
        renderAndAttachControls(songSelect.value);
    });

    console.log('Piano keys array information:', piano.getAllKeys());

    // Recorder Event Listeners
    const startBtn = document.getElementById('start-recording');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            recorder.start();
            console.log('Recording started');
        });
        startBtn.addEventListener('touchstart', (e) => {
            e.preventDefault(); // evita clic fantasma
            recorder.start();
            console.log('Recording started (touch)');
        });
    }

    const stopBtn = document.getElementById('stop-recording');
    if (stopBtn) {
        stopBtn.addEventListener('click', () => {
            recorder.stop();
            console.log('Recording stopped');
        });
        stopBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            recorder.stop();
            console.log('Recording stopped (touch)');
        });
    }

    const playBtn = document.getElementById('play-recording');
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            recorder.play();
            console.log('Playback started');
        });
        playBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            recorder.play();
            console.log('Playback started (touch)');
        });
    }

    // const clearBtn = document.getElementById('clear-recording');
    // if (clearBtn) {
    //     clearBtn.addEventListener('click', () => {
    //         recorder.clear();
    //         console.log('Recording cleared');
    //     });
    //     clearBtn.addEventListener('touchstart', (e) => {
    //         e.preventDefault();
    //         recorder.clear();
    //         console.log('Recording cleared (touch)');
    //     });
    // }
});

setupVirtualKeyboard();
testPlayAlong('twinkle');
// Console output:
// Note 1: C4
// Note 2: C4
// Note 3: G4
// ...etc

// Play-along controller instance
window.playAlongController = null;

// Track expected note for highlighting
window.expectedNote = null;

// Update the keybind indicator label under the keyboard
function updateKeybindIndicator() {
    const indicator = document.getElementById('keybind-indicator');
    if (!window.expectedNote) {
        indicator.textContent = '';
        return;
    }
    const keyObj = keyMap.find((k) => k.note === window.expectedNote);
    if (keyObj && keyObj.key) {
        indicator.textContent = keyObj.key.toUpperCase();
    } else {
        indicator.textContent = '';
    }
}

// Listen for a custom 'noteplayed' event and advance if correct note is played
document.addEventListener('noteplayed', function (e) {
    // Debounce play-along advancement to prevent spamming when holding a key
    if (!window.lastPlayAlongAdvance) window.lastPlayAlongAdvance = 0;
    const now = Date.now();
    const debounceMs = 200; // Minimum ms between advancements
    if (now - window.lastPlayAlongAdvance < debounceMs) return;
    window.lastPlayAlongAdvance = now;

    if (window.playAlongController && window.playAlongController.active) {
        const songFinished = window.playAlongController.handleNotePlayed(e.detail.note);
        // Update expected note for highlighting
        if (songFinished) {
            window.expectedNote = null;
            console.log('Expected note (advance):', window.expectedNote);
            updateKeybindIndicator();
            document.dispatchEvent(new Event('playalongfinished'));
        } else {
            window.expectedNote =
                window.playAlongController.song[window.playAlongController.currentIndex];
            console.log('Expected note (advance):', window.expectedNote);
            updateKeybindIndicator();
        }
        if (window.piano) window.piano.draw();
    }
});

// =========================
// TOGGLE
// =========================
// Toggle visualiser box
document.querySelector('#visualiser .toggle-text').onclick = function () {
    const box = document.getElementById('visualiser-box');
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
    console.log('Visualiser box toggled:', box.style.display);
};

// Toggle instructions box
document.querySelector('#instructions .toggle-text').onclick = function () {
    const box = document.getElementById('instructions-box');
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
    console.log('Instructions box toggled:', box.style.display);
};


// Toggle visualiser visibility
document.getElementById('toggle-visuals').addEventListener('change', function () {
    const visualiser = document.getElementById('visualiser-canvas');
    if (this.checked) {
        visualiser.style.display = 'block';
        console.log('Visualiser enabled');
    } else {
        visualiser.style.display = 'none';
        console.log('Visualiser disabled');
    }
})