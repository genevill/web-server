import './App.css';
import { CalculatorApp } from './Calculator.js';
import { TimerApp } from './Timer.js';
import { DrumApp } from './DrumMachine.js';
import { QuoteApp } from './Quote.js';
import { MarkdownApp } from './Markdown.js';
import { LoadText } from './Markdown.js';

//----App----------------------------------------------------------------------

function App() {
  return (
  <div>
    <div class="header">
      <header id="header">
      <nav class="navbar" id="navbar">
        <a class="nav-links" href="#about-me">About Me</a>
        <a class="nav-links" href="#projects">Projects</a>
        <a class="nav-links" href="#coding-challenges">Coding Challenges</a>
      </nav>
      </header>
    </div>
    <div class="main">
      <main id="main">
        <section class="center" id="about-me">
          <h1>About Me</h1>
          <div class="about-me-sub">
            <div class="about-me-div unselectable">
              <img class="unselectable"  src="https://github.com/genevill/genevill/blob/main/profilepic.JPG?raw=true" />
            </div>
            <div class="about-me-div">
              <a id="profile-link" href="https://www.freecodecamp.org/genevill" target="_blank">freeCodeCamp Portfolio</a>
              <a id="profile-link" href="https://play.google.com/store/apps/dev?id=6083836623150592844" target="_blank">Google Developer Profile</a>
              <a id="profile-link" href="https://github.com/genevill" target="_blank">GitHub Portfolio</a>
            </div>
          </div>
        </section>
        <section class="center" id="projects">
            <h1 >Projects</h1>
            <p class="project-tile">Project Tile</p>
            <a href="./project-link">Project Link</a>
            <h1>Pomodoro Timer App</h1>
            <TimerApp />
            <h1>Calculator App</h1>
            <CalculatorApp />
            <h1>Drum App</h1>
            <DrumApp />
            <h1>Markdown App</h1>
            <MarkdownApp />
            <h1>Quote App</h1>
            <QuoteApp />

        </section>
        <section class="center" id="coding-challenges">
          <h1>Coding Challenges</h1>
        </section>
      </main>
    </div>
    <footer id="footer">
    </footer>
  </div>
 );
}

export default App;

window.addEventListener("load", function () {
    if (document.getElementById("markdown-preview") != null && document.getElementById("markdown-editor") != null) {
        LoadText();
    }
    if (document.getElementById("markdown-preview") == null) {
        console.log("markdown-preview is null");
    }
    if (document.getElementById("markdown-editor") == null) {
        console.log("markdown-editor is null");
    }
});
