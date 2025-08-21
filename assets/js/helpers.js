import { keyMap } from "./pianoKeyPress.js";

// Helper function to convert keybind letters to piano notes
// e.g. "uio" -> [["C5"], ["D5"], ["E5"]]
export function keybindToNotes(keybindString) {
  const notes = [];

  // Remove whitespace and convert to lowercase
  const cleanKeybind = keybindString.replace(/\s/g, "").toLowerCase();

  // Convert each character to its corresponding note by looking up in keyMap
  for (let i = 0; i < cleanKeybind.length; i++) {
    const currentKey = cleanKeybind[i];

    // Find the item in keyMap where key matches currentKey
    const mappedKey = keyMap.find((item) => item.key === currentKey);

    if (mappedKey) {
      notes.push(mappedKey.note);
    } else {
      console.warn(`Unknown keybind character: ${currentKey}`);
    }
  }

  return notes;
}
