// Virtual keyboard button key mapping
export const keyMap = [
  { id: "vk-btn-1", key: "1" },
  { id: "vk-btn-2", key: "2" },
  { id: "vk-btn-3", key: "3" },
  { id: "vk-btn-4", key: "4" },
  { id: "vk-btn-5", key: "5" },
  { id: "vk-btn-6", key: "6" },
  { id: "vk-btn-7", key: "7" },
  { id: "vk-btn-8", key: "8" },
  { id: "vk-btn-9", key: "9" },
  { id: "vk-btn-10", key: "0" },
  { id: "vk-btn-11", key: "q" },
  { id: "vk-btn-12", key: "w" },
];

export function handleButtonAction(id) {
  const btn = document.getElementById(id);
  const mappedKey = keyMap.find((mappedKey) => mappedKey.id === id);
  if (btn && mappedKey) {
    btn.classList.add("active");
    setTimeout(() => btn.classList.remove("active"), 200);
    switch (id) {
      case "vk-btn-1":
        // Future: play audio for button 1
        console.log(`Key '${mappedKey.key}' pressed (Button ${id})`);
        break;
      case "vk-btn-2":
        // Future: play audio for button 2
        console.log(`Key '${mappedKey.key}' pressed (Button ${id})`);
        break;
      case "vk-btn-3":
        // Future: play audio for button 3
        console.log(`Key '${mappedKey.key}' pressed (Button ${id})`);
        break;
      case "vk-btn-4":
        // Future: play audio for button 4
        console.log(`Key '${mappedKey.key}' pressed (Button ${id})`);
        break;
      case "vk-btn-5":
        // Future: play audio for button 5
        console.log(`Key '${mappedKey.key}' pressed (Button ${id})`);
        break;
      case "vk-btn-6":
        // Future: play audio for button 6
        console.log(`Key '${mappedKey.key}' pressed (Button ${id})`);
        break;
      case "vk-btn-7":
        // Future: play audio for button 7
        console.log(`Key '${mappedKey.key}' pressed (Button ${id})`);
        break;
      case "vk-btn-8":
        // Future: play audio for button 8
        console.log(`Key '${mappedKey.key}' pressed (Button ${id})`);
        break;
      case "vk-btn-9":
        // Future: play audio for button 9
        console.log(`Key '${mappedKey.key}' pressed (Button ${id})`);
        break;
      case "vk-btn-10":
        // Future: play audio for button 10
        console.log(`Key '${mappedKey.key}' pressed (Button ${id})`);
        break;
      case "vk-btn-11":
        // Future: play audio for button 11
        console.log(`Key '${mappedKey.key}' pressed (Button ${id})`);
        break;
      case "vk-btn-12":
        // Future: play audio for button 12
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
      btn.addEventListener("click", (e) => {
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
