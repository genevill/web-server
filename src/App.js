import './App.css';
import { CalculatorApp } from './Calculator.js';
import { TimerApp } from './Timer.js';
import { DrumApp } from './DrumMachine.js';
import { QuoteApp } from './Quote.js';
import { MarkdownApp } from './Markdown.js';
import { useState } from 'react';

//DRUM APP AND MARKDOWN APP ARE MESSED UP

export var upCaret = new Image();
upCaret.src = "https://storage.cloud.google.com/genevill/383167_caret_up_icon.png";
export var downCaret = new Image();
downCaret.src = "https://storage.cloud.google.com/genevill/383170_caret_down_icon.png";
export var refresh = new Image();
refresh.src = "https://storage.cloud.google.com/genevill/383083_refresh_reload_icon.png";
export var playPause = new Image();
playPause.src = "https://storage.cloud.google.com/genevill/play-pause.png";

function App() {

    const [openedApp, setOpenedApp] = useState(0);

    //----App----------------------------------------------------------------------

    const AppButton = props => {
        return (<button onMouseDown={() => {
            if (props.text == "Pomodoro Timer") {
                setOpenedApp(0);
            }
            if (props.text == "Calculator") {
                setOpenedApp(1);
            }
            if (props.text == "Drum App") {
                setOpenedApp(2);
            }
            if (props.text == "Markdown App") {
                setOpenedApp(3);
            }
            if (props.text == "Quote App") {
                setOpenedApp(4);
            }
        }
        }> {props.text}</button >)
    }

    const Switcher = props => {
        if (openedApp == 0) {
            return (<TimerApp />);
        }
        if (openedApp == 1) {
            return (<CalculatorApp />);
        }
        if (openedApp == 2) {
            return (<DrumApp />);
        }
        if (openedApp == 3) {
            return (<MarkdownApp />);
        }
        if (openedApp == 4) {
            return (<QuoteApp />);
        }
    }

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
            <div class="center switcher-center">
            <div>
                <AppButton text="Pomodoro Timer"></AppButton>
                <AppButton text="Calculator"></AppButton>
                <AppButton text="Drum App"></AppButton>
                <AppButton text="Markdown App"></AppButton>
                <AppButton text="Quote App"></AppButton>
            </div>
            </div>

        </section>
        <section class="center switcher-center" id="projects">
            <Switcher class="switcher-center" />
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
