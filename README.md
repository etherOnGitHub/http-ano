# http-ano | [Live Build](https://etherongithub.github.io/http-ano/) | [Project Board](https://github.com/users/etherOnGitHub/projects/5/)

|                                      Area                                      | Criteria                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :----------------------------------------------------------------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                              **Front End Design**                              | Design a single-page application that meets accessibility guidelines and follows UX design principles. Create a responsive front-end using custom HTML and CSS/CSS frameworks. Ensure a clear structured layout with intuitive navigation and consistent graphics.                                                                                                                                                                      |
|                     **Interactivity and DOM Manipulation**                     | Implement interactive features with JavaScript allowing user control and feedback. Use JavaScript for effective DOM manipulation to dynamically update the single-page interface.                                                                                                                                                                                                                                                       |
|                              **Code Validation**                               | Ensure JavaScript code passes a linter with no significant issues. Validate custom HTML code using the official W3C validator. Validate custom CSS code using the Jigsaw validator.                                                                                                                                                                                                                                                     |
|                      **Responsive Design and Navigation**                      | Use CSS media queries to maintain layout integrity across different screen sizes. Implement semantic markup for clear HTML structure. Ensure the single page features intuitive navigation.                                                                                                                                                                                                                                             |
|                              **Cloud Deployment**                              | Successfully deploy the single-page application to a cloud-based hosting platform ensuring it matches the development version. Use Git and GitHub for version control throughout the development process. Remove commented-out code before final deployment. Ensure all internal links and interactive elements function correctly.                                                                                                     |
|                               **Documentation**                                | Write a README.md file explaining the application’s purpose, user value, and deployment procedure. Include screenshots of the single-page application with brief descriptions and user value explanations. Attribute any code from external sources clearly.                                                                                                                                                                            |
|                     **Code Organization and Readability**                      | Separate custom code from external sources. Organize HTML, CSS, and JavaScript into well-defined, commented sections. Place CSS and JavaScript code in external files linked appropriately in the HTML. Write code that meets readability standards with consistent indentation and minimal blank lines. Name files consistently and descriptively for cross-platform compatibility. Group files by type in well-organized directories. |
|                **JavaScript Functionality and Error Handling**                 | Write JavaScript functions implementing compound statements like if conditions and loops. Handle empty or invalid input data intelligently. Ensure the code does not generate errors on the page or in the console due to user actions.                                                                                                                                                                                                 |
|                  **Use AI tools to assist in code creation**                   | Demonstrates strategic use of AI for generating code aligned with project objectives.                                                                                                                                                                                                                                                                                                                                                   |
|                  **Use AI tools to assist in debugging code**                  | Efficient use of AI tools to identify and resolve code issues.                                                                                                                                                                                                                                                                                                                                                                          |
|     **Use AI tools to optimize code for performance and user experience**      | AI-driven optimisation for improved performance and user experience.                                                                                                                                                                                                                                                                                                                                                                    |
| **Reflect on AI’s role in the development process and its impact on workflow** | High-level reflection on how AI tools affected the development process, with focus on outcomes rather than detailed steps.                                                                                                                                                                                                                                                                                                              |

---

## Design

### Wireframes

During the planning Ryan decided to create the wireframes for the project as he was most comfortable
with Balsamiq and is quite great at designing!

<p align="center">
    <img src="https://github.com/etherOnGitHub/http-ano/blob/main/assets/images/wireframes/wireframe-combined-ryan.webp" alt="Two black and white images stacked together, one containing the layout for a desktop website with a navbar, notes and keyboard. A mobile view stacked next to it with a rotated display to maximise keyboard space"><br>
    <sub>Link to Git Image: https://github.com/etherOnGitHub/http-ano/blob/main/assets/images/wireframes/wireframe-combined-ryan.webp</sub>
</p>

---

<br>
After some consideration we also had another great alternative mock up done by Naz and Rocio for mobile with a simplified view.

<p align="center">
    <img src="https://github.com/etherOnGitHub/http-ano/blob/main/assets/images/wireframes/mobile-wireframe-naz-rocio.webp" alt="Another black and white wireframe showing an alternative view of the keyboard in portrain mode with simplified features."><br>
    <sub>Link to Git Image: https://github.com/etherOnGitHub/http-ano/blob/main/assets/images/wireframes/mobile-wireframe-naz-rocio.webp</sub>
</p>

### Design Philosophy

HTTP-ANO embraces a modern cyberpunk aesthetic with a neon-themed interface that transforms the
traditional piano experience into an interactive digital playground. The design prioritizes both
visual appeal and functionality, ensuring an engaging user experience across all devices.

### Color Palette

Our carefully selected color scheme creates a cohesive visual identity:

-   **Primary Neon Cyan**: `#00fff9` - Used for borders, highlights, and interactive elements
-   **Secondary Magenta**: `#ff00ff` - Accent color for glow effects and visual feedback
-   **Dark Background**: `rgba(25, 25, 60, 0.85)` - Provides contrast and reduces eye strain
-   **Light Text**: `#ffffff` - Ensures accessibility and readability

<img width="428" height="120" alt="image" src="https://github.com/user-attachments/assets/47834a0e-886b-4c45-8304-513626a0e46c" />

### Typography

-   **Primary Font**: Orbitron - A futuristic typeface that complements the cyberpunk theme
-   **Fallback**: Sans-serif fonts for maximum compatibility across devices

#### Piano Interface

-   **Canvas-based rendering** for smooth, responsive piano keys
-   **Neon glow effects** that activate when keys are pressed
-   **Gradient backgrounds** that enhance the futuristic aesthetic
-   **Real-time visual feedback** for user interactions

#### Interactive Components

-   **Animated taglines** in the footer with rotating Font Awesome icons
-   **Responsive navigation** with Bootstrap collapse functionality
-   **Modal dialogs** with themed styling for settings and controls
-   **Custom buttons** with hover effects and neon borders

## Features

-   Canvas-rendered piano keyboard supporting up to 4 octaves (default 3 octaves starting at C4).
-   Responsive design with dynamic resizing and key label toggling.
-   Play notes using mouse/touch clicks or mapped QWERTY keyboard keys.
-   Authentic piano sound samples for each note from C4 to B6 with sharp notes.
-   Visual key press effects with neon glow highlights.
-   Play-along mode featuring built-in songs for practice (e.g., "Twinkle Twinkle Little Star").
-   Record, stop, and playback your piano performance.
-   Audio visualizer powered by the Web Audio API to display sound waves in real-time.
-   Clean, modular JavaScript code organized into components for easy customization.
-   Accessibility compliant with keyboard navigation and high contrast colors.
-   Optimized for performance and follows web best practices.

## Development and Customization

-   To **change the number of octaves**, adjust the `numOctaves` in `PianoConfig.js` or call
    `setNumOctaves()` method on the piano instance.
-   To **add new songs**, extend the `SONGS` object in `playAlong.js` with note arrays or use
    keyboard letter shorthand converted via helper functions.
-   To **customize styles**, modify `style.css` for colors, fonts, and layout effects.
-   To **add or replace audio samples**, update `pianoKeyPress.js` with new audio file paths
    accordingly.
-   To **toggle keyboard key label visibility**, use the piano’s API method `toggleKeyLabels()` or
    update config.
-   To **extend recording features**, modify `recorder.js` as needed.
-   To **optimize performance**, ensure audio files are efficiently loaded and event handlers are
    properly debounced, as demonstrated.

## Installation and Usage

1. Clone or download the repository.
2. Open the `index.html` file in a modern web browser (Chrome, Firefox, Edge).
3. Use your mouse, touch screen, or QWERTY keyboard keys to play the piano.
4. Select play-along songs from the dropdown menu to practice with guided note highlights.
5. Use "Start Recording", "Stop Recording", and "Play Recording" buttons to record and playback your
   session.
6. Adjust volume with the slider and toggle key labels for better usability.

## Keyboard Mapping

The virtual piano keys are mapped logically to your physical QWERTY keyboard for intuitive play:

-   White keys use keys such as `Tab`, `Q`, `W`, `E`, `R`, `T`, `Y`, `U`, `I`, `O`, `P`, etc.
-   Black keys (sharps) use number and letter keys like `1`, `2`, `4`, `5`, `6`, `8`, `9`, `A`, `S`,
    `D`, `G`, etc.

Refer to `pianoKeyPress.js` for the exact mappings of keys to notes and audio samples.

## Visualiser

The visualiser works by analysing the data behind the audio being played and storing them in "bins" the amount of "bins" can be scaled up or down, we chose to keep the amount of "bins" low so that the website is lightweight and accessible. Analysing the Fast Fourier Transform - it is a data manipulation concept where audio on a computer is represented over time in a relatively accurate and resource effective manor while the frequencies that make up the audio are spread into these "bins". Each "bin" represents a specific frequency range which is why the visualiser has several bars making it up. Essentially you are seeing the aggregate data of a specific frequency range of each note behind it while playing!

## Accessibility

This project is designed with accessibility in mind, featuring:

-   Full keyboard navigability and key press feedback.
-   High contrast neon color scheme meeting WCAG standards.
-   Semantic HTML and ARIA roles for screen reader friendliness.

## Deployment
<p align="center">
<img width="1000" height="600" alt="image" src="https://github.com/user-attachments/assets/3745e8bc-3db8-496d-b027-4f686c2b5e18" />
</p>

[Live Build](https://etherongithub.github.io/http-ano/)

Deployment was handled through GitHub cloud directly from the repo.


## Testing & Validation
<p  align="center">
<img width="1178" height="847" alt="image" src="https://github.com/user-attachments/assets/0c22d2ef-db97-46dd-86fb-890bda887ff9" />
</p>

## Lighthouse

-   Performance: 97/100
-   Accessibility: 100/100
-   Best Practices: 100/100 What These Scores Mean:
-   Performance (97): The application runs smoothly, loads quickly, and is optimized for efficient
    resource usage. A high performance score indicates fast load times and responsive interactions,
    providing a seamless user experience.
-   Accessibility (100): The web piano is fully accessible, ensuring usability for all users
    including those with disabilities. This includes proper color contrast, keyboard navigation, and
    screen reader compatibility.
-   Best Practices (100): The application adheres to modern web development standards, with secure
    code, valid HTML/CSS, and a reliable structure that avoids deprecated or risky features. These
    results demonstrate that the project is not only visually engaging and interactive but also
    optimized and compliant with web standards. Users can expect a high-quality, accessible
    experience across devices and browsers.

## Use of AI

### Code Creation

#### Piano Canvas Element 🎹

(Daniel) - The development of the piano canvas element was greatly assisted using GitHub Copilot. I chose to use Claude Sonnet 4 as my primary AI model, as I found that it was the most reliable and useful when working with complex prompts, especially when using agent mode.

With the right prompts and guidance, the AI was able to successfully orchestrate changes across multiple files in agent mode. Originally, I had used a single class for managing all of the piano's features, but found that it was becoming too difficult to read and maintain. I decided on splitting this large class into modules, which not only made it easier for me to maintain the code manually, but allowed the AI to make changes more easily, too.

#### Design 🎨

After deciding on the theme and main features of the site, we used AI selectively to support the design process, helping ensure that layouts, styling, and components remained consistent with the overall visual objectives, with the creative direction and implementation guided by our design vision and project goals.

### Debugging 🪳

Throughout development, features were regularly tested and any bugs were raised and fixed before picking up any new tickets.

#### Use of AI Assistance in Debugging and Optimisation ♣️

During the development of this virtual piano project, AI-powered tools were leveraged extensively to enhance productivity and code quality. AI helped by generating code templates, providing guidance on best practices, and suggesting optimizations for performance and accessibility. It also assisted in debugging complex issues by analyzing code snippets and identifying potential problems or inconsistencies. This collaborative approach with AI accelerated development timelines and improved the overall robustness and maintainability of the codebase. Leveraging AI as a development partner allowed us to focus more on creative design and user experience while ensuring the technical foundation remained solid and efficient.

### Reflection

Overall the use of AI has helped to implement some logic that may be hard to conceptualise in the moment but after being shown a way of doing it quickly using that information to take the next steps with or without AI assistance.

AI is no perfect creation, accuracy accross models is inconsistent and sometimes it can misunderstand an operation and its requirements (especially visible elements for UI/UX).

## Credits

### Audio

-   [FL Studio](https://www.image-line.com/)
-   [Kontakt 8](https://www.native-instruments.com/en/products/komplete/samplers/kontakt-8/?srsltid=AfmBOooZFHWt6HRUb3TLe3kasLGU_eK9XycAW2-wA5f-PFl0s5BRuuUa)
-   [Noire Piano](https://www.native-instruments.com/en/products/komplete/keys/noire/?srsltid=AfmBOoqaACvectLVwpVG6RSI6KD9fXSDbk95zPTAXHIHD7MxwylWij0A)

### AI

-   [Copilot](https://github.com/features/copilot)
-   [ChatGPT 5](https://chatgpt.com/)
-   [Claude](https://claude.ai/)

### Illustrations & Design

-   [Balsamiq](https://balsamiq.com/)
-   [Font Awesome](https://fontawesome.com/)
-   [Bootstrap](https://getbootstrap.com/)
-   [Google Fonts](https://fonts.google.com/)

### Validators

-   [W3C](https://validator.w3.org/)
-   [Jigsaw](https://jigsaw.w3.org/css-validator/)
-   [JSHint](https://jshint.com/)