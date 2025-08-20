import { analyser } from "../sound.js";

const canvas = document.getElementById("visualiser-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;

function draw() {
	if (!canvas || !ctx || !analyser) return;

	const bufferLen = analyser.frequencyBinCount;
	const data = new Uint8Array(bufferLen);
	analyser.getByteFrequencyData(data);

	// Clear with slight fade for trails
	ctx.fillStyle = "rgba(0,0,0,0.2)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	const barWidth = canvas.width / bufferLen;
	for (let i = 0; i < bufferLen; i++) {
		const v = data[i] / 255;
		const h = v * canvas.height;
		ctx.fillStyle = `hsl(${(i / bufferLen) * 300}, 80%, ${35 + v * 45}%)`;
		ctx.fillRect(i * barWidth, canvas.height - h, Math.max(1, barWidth - 1), h);
	}

	requestAnimationFrame(draw);
}

// Kick off the loop when DOM is ready
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", draw);
} else {
	draw();
}
