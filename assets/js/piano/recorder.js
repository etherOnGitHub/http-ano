// Recorder.js
export class Recorder {
    constructor(piano) {
        this.piano = piano;
        this.recordedNotes = [];
        this.recordingStartTime = null;
        this.isRecording = false;
        this.playbackTimeouts = [];
    }

    start() {
        this.recordedNotes = [];
        this.recordingStartTime = performance.now();
        this.isRecording = true;
    }

    stop() {
        this.isRecording = false;
    }

    recordNote(note) {
        if (!this.isRecording) return;
        const time = performance.now() - this.recordingStartTime;
        this.recordedNotes.push({ note, time });
    }

    getRecording() {
        return this.recordedNotes;
    }

    clear() {
        this.recordedNotes = [];
    }

    play() {
        if (this.recordedNotes.length === 0) return;

        // Clear any existing playback timers
        this.stopPlayback();

        this.recordedNotes.forEach(({ note, time }) => {
            const timerID = setTimeout(() => {
                this.piano.pressKey(note);
                setTimeout(() => this.piano.releaseKey(note), 300);
            }, time);
            this.playbackTimeouts.push(timerID);
        });
    }

    stopPlayback() {
        this.playbackTimeouts.forEach((id) => clearTimeout(id));
        this.playbackTimeouts = [];
    }
}

export function setupRecorderButtons() {
    const startBtn = document.getElementById('start-recording');
    const stopBtn = document.getElementById('stop-recording');
    const playBtn = document.getElementById('play-recording');

    function activate(btn) {
        btn.classList.add('active');
        btn.disabled = false;
    }

    function deactivate(btn) {
        btn.classList.remove('active');
        btn.disabled = true;
    }

    // Initial State
    activate(startBtn);
    deactivate(stopBtn);
    deactivate(playBtn);

    function onStart() {
        if (startBtn.classList.contains('active')) {
            activate(stopBtn);
            deactivate(startBtn);
            deactivate(playBtn);
        }
    }

    function onStop() {
        if (stopBtn.classList.contains('active')) {
            activate(startBtn);
            activate(playBtn);
            deactivate(stopBtn);
        }
    }

    function onPlay() {
        if (!playBtn.classList.contains('active')) {
            activate(playBtn);
        }
        deactivate(startBtn);

        // Simulate playback delay
        setTimeout(() => {
            activate(startBtn); // reactive startBtn after playback
        }, 3000);
    }

    // Touchscreen and click events
    startBtn.addEventListener('click', onStart);
    startBtn.addEventListener('touchstart', onStart);

    stopBtn.addEventListener('click', onStop);
    stopBtn.addEventListener('touchstart', onStop);

    playBtn.addEventListener('click', onPlay);
    playBtn.addEventListener('touchstart', onPlay);
}
