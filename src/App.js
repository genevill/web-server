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
          <h2>About Me</h2>
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
            <h2 >Projects</h2>
            <p class="project-tile">Project Tile</p>
            <a href="./project-link">Project Link</a>
            <h3>Pomodoro Timer App</h3>
            <TimerApp />
            <h3>Calculator App</h3>
            <CalculatorApp />
            <h3>Drum App</h3>
            <DrumApp />
            <h3>Markdown App</h3>
            <MarkdownApp />
            <h3>Quote App</h3>
            <QuoteApp />

        </section>
        <section class="center" id="coding-challenges">
          <h2>Coding Challenges</h2>
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
});
