// List of funky taglines
const taglines = [
  '<i class="fa-solid fa-music"></i> HTTP: Hear The Tune Play. . . <i class="fa-solid fa-music"></i>',
  '<i class="fa-solid fa-headphones"></i> HyperText, meet Harmony. . . <i class="fa-solid fa-headphones"></i>',
  '<i class="fa-solid fa-guitar"></i> HTTP: Hit The Right Pitch. . . <i class="fa-solid fa-guitar"></i>',
  '<i class="fa-solid fa-drum"></i> From HTTP to Harmony. . . <i class="fa-solid fa-drum"></i>',
  '<i class="fa-solid fa-compact-disc"></i> HTTP unlocked: music in your browser. . . <i class="fa-solid fa-compact-disc"></i>',
  '<i class="fa-solid fa-microphone"></i> From HTTP requests to musical quests. . . <i class="fa-solid fa-microphone"></i>',
  '<i class="fa-solid fa-record-vinyl"></i> HyperText Transfer Protocol just got a soundtrack. . . <i class="fa-solid fa-record-vinyl"></i>',
  '<i class="fa-solid fa-music"></i> Turning HTTP into harmonies, one key at a time. . . <i class="fa-solid fa-music"></i>',
  '<i class="fa-solid fa-drum-steelpan"></i> Where the web speaks in chords and HTTP sings. . . <i class="fa-solid fa-drum-steelpan"></i>',
  '<i class="fa-solid fa-microphone-lines"></i> HTTP is not just for websites anymore - it is for symphonies. . . <i class="fa-solid fa-microphone-lines"></i>'
];

// Function to update tagline
function updateTagline() {
  // Pick a random tagline
  const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];
  
  // Insert it into the footer using innerHTML to render icons
  const taglineElement = document.getElementById("tagline");
  if (taglineElement) {
    taglineElement.innerHTML = randomTagline;
  }
}

// Update tagline when page loads
document.addEventListener('DOMContentLoaded', updateTagline);

// Optional: Change tagline every 10 seconds for fun
setInterval(updateTagline, 10000);