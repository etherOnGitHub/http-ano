// Virtual keyboard button key mapping
export const keyMap = [
  { id: "vk-btn-C5", key: "1", audio: "assets/audio/piano/C5piano.mp3" },
  { id: "vk-btn-Cs5", key: "2", audio: "assets/audio/piano/Cs5piano.mp3" },
  { id: "vk-btn-D5", key: "3", audio: "assets/audio/piano/D5piano.mp3" },
  { id: "vk-btn-Ds5", key: "4", audio: "assets/audio/piano/Ds5piano.mp3" },
  { id: "vk-btn-E5", key: "5", audio: "assets/audio/piano/E5piano.mp3" },
  { id: "vk-btn-F5", key: "6", audio: "assets/audio/piano/F5piano.mp3" },
  { id: "vk-btn-Fs5", key: "7", audio: "assets/audio/piano/Fs5piano.mp3" },
  { id: "vk-btn-G5", key: "8", audio: "assets/audio/piano/G5piano.mp3" },
  { id: "vk-btn-Gs5", key: "9", audio: "assets/audio/piano/Gs5piano.mp3" },
  { id: "vk-btn-A5", key: "0", audio: "assets/audio/piano/A5piano.mp3" },
  { id: "vk-btn-As5", key: "q", audio: "assets/audio/piano/As5piano.mp3" },
  { id: "vk-btn-B5", key: "w", audio: "assets/audio/piano/B5piano.mp3" },
];

export function handleButtonAction(id) {
  const btn = document.getElementById(id);
  const mappedKey = keyMap.find((mappedKey) => mappedKey.id === id);
  if (btn && mappedKey) {
    btn.classList.add("active");
    setTimeout(() => btn.classList.remove("active"), 200);
    // Play audio if available (allow overlapping sounds)
    if (mappedKey.audio) {
      const audio = new Audio(mappedKey.audio);
      audio.currentTime = 0;
      audio.play();
    }
    // Switch for console logging and future testing
    switch (id) {
      case "vk-btn-C5":
      case "vk-btn-Cs5":
      case "vk-btn-D5":
      case "vk-btn-Ds5":
      case "vk-btn-E5":
      case "vk-btn-F5":
      case "vk-btn-Fs5":
      case "vk-btn-G5":
      case "vk-btn-Gs5":
      case "vk-btn-A5":
      case "vk-btn-As5":
      case "vk-btn-B5":
        console.log(`Key '${mappedKey.key}' pressed (Button ${id})`);
        break;
      default:
        console.log(`Key '${mappedKey.key}' pressed (Button ${id})`);
    }
  }
}

export function setupVirtualKeyboard() {
  keyMap.forEach(({ id }) => {
    const btn = document.getElementById(id);
    if (btn) {
      let touchHandled = false;
      btn.addEventListener("touchstart", (e) => {
        if (!touchHandled) {
          handleButtonAction(id);
          touchHandled = true;
          setTimeout(() => {
            touchHandled = false;
          }, 300);
        }
        e.preventDefault();
      });
      btn.addEventListener("mousedown", (e) => {
        if (!touchHandled) {
          handleButtonAction(id);
        }
      });
    }
  });

  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    const mappedKey = keyMap.find((mappedKey) => mappedKey.key === key);
    if (mappedKey) {
      handleButtonAction(mappedKey.id);
    }
  });
}
