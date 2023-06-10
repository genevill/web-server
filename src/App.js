import './App.css';
import { CalculatorApp } from './Calculator.js';
import { TimerApp } from './Timer.js';
import { DrumApp } from './DrumMachine.js';
import { QuoteApp } from './Quote.js';
import { MarkdownApp } from './Markdown.js';
import { LoadText } from './Markdown.js';

var openedApp = <p></p>;

//----App----------------------------------------------------------------------

const AppButton = props => {
    return (<button onMouseDown={() => {
        switch (props.text) {
            case "Pomodoro Timer":
                openedApp = < TimerApp />;
                break;
            case "Calculator":
                console.log("Calculator");
                break;
            case "Drum App":
                console.log("Drum App");
                break;
            case "Markdown App":
                console.log("Markdown App");
                break;
            case "Quote App":
                console.log("Quote App");
                break;
            default:
            // code block
        }
    }} >{props.text}</button>)
}

//<h4>Pomodoro Timer App</h4>
//            <TimerApp />
//            <h4>Calculator App</h4>
//            <CalculatorApp />
//            <h4>Drum App</h4>
//            <DrumApp />
//            <h4>Markdown App</h4>
//            <MarkdownApp />
//            <h4>Quote App</h4>
//            <QuoteApp />

function App() {
  return (
  <div class="app">
    <div class="header">
      <header id="header">
        <nav class="navbar" id="navbar">
          <div class="navborders">
            <a class="nav-links" href="#about-me">About Me</a>
            <a class="nav-links" href="#projects">Projects</a>
            <a class="nav-links" href="#coding-challenges">Coding Challenges</a>
          </div>
      </nav>
      </header>
    </div>
    <div class="main">
      <main id="main">
        <section id="background">
        </section>
        <section class="center" id="about-me">
            <div id="about-me">
                <a id="profile-link" href="https://www.freecodecamp.org/genevill" target="_blank">freeCodeCamp Portfolio</a>
                <a id="profile-link" href="https://play.google.com/store/apps/dev?id=6083836623150592844" target="_blank">Google Developer Profile</a>
                <a id="profile-link" href="https://github.com/genevill" target="_blank">GitHub Portfolio</a>
            </div>
            <div>
                <AppButton text="Pomodoro Timer"></AppButton>
                <AppButton text="Calculator"></AppButton>
                <AppButton text="Drum App"></AppButton>
                <AppButton text="Markdown App"></AppButton>
                <AppButton text="Quote App"></AppButton>
            </div>

        </section>
        <section class="center" id="projects">
            
        </section>
        <section class="center" id="coding-challenges">
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
