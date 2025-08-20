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
        btn.disabled = false; // habilita el botón para que sea clickeable
    }

    function deactivate(btn) {
        btn.classList.remove('active');
        btn.disabled = true; // deshabilita el botón para que no responda
    }

    activate(startBtn);
    deactivate(stopBtn);
    deactivate(playBtn);

    startBtn.addEventListener('click', () => {
        if (startBtn.classList.contains('active')) {
            activate(stopBtn);
            deactivate(startBtn);
            deactivate(playBtn);
            // lógica inicio grabación
        }
    });

    stopBtn.addEventListener('click', () => {
        if (stopBtn.classList.contains('active')) {
            activate(startBtn);
            activate(playBtn);
            deactivate(stopBtn);
            // lógica paro grabación
        }
    });

    // Puedes añadir eventos para play y clear si es necesario
}
