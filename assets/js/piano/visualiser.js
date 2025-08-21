import { analyser } from "../sound.js";

const canvas = document.getElementById("visualiser-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;

function draw() {
  if (!canvas || !ctx || !analyser) return;

  const bufferLen = analyser.frequencyBinCount;
  const data = new Uint8Array(bufferLen);
  analyser.getByteFrequencyData(data);

  // Clear with slight fade for trails
  ctx.fillStyle = "rgba(13,13,13,1)";
  ctx.fillRect(0, 0.3, canvas.width, canvas.height);

  const barWidth = canvas.width / bufferLen;
  for (let i = 0; i < bufferLen; i++) {
    const v = data[i] / 255;
    const h = v * canvas.height - 20;
    ctx.fillStyle = `hsl(${(i / bufferLen) * 255}, 100%, ${15 + v * 33}%)`;
    ctx.fillRect(
      i * barWidth + 50,
      canvas.height / 1.1 - h,
      Math.max(30, barWidth - 25),
      h + 100
    );
  }

  requestAnimationFrame(draw);
}

// Kick off the loop when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", draw);
} else {
  draw();
}
