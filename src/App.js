import './App.css';

//---Calculator--------------------------------------------------------

var displayString = "0";
var totalString = "";
var allNumbers = [];
var allOperands = [];
var tempAnswer = 0.0;
var idNames = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "add", "subtract", "multiply", "divide", "decimal", "clear", "equals"
]
var buttonNames = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "x", "/", ".", "AC", "="
]

const Button = props => {
  return (<button class="button unselectable" id={idNames[buttonNames.indexOf(props.text)]} onClick={ () => {
        if (/[0-9]/.test(props.text)) {
          if (/\-0/.test(displayString)) {
            displayString = displayString.replace("0", "");
          }
          displayString += props.text;
        }
        if (/AC/.test(props.text)) {
          displayString = "0";
          totalString = "";
          UpdateDisplayTotal();
        }
        if (/[\+\-/x]/.test(props.text) && !/\-/.test(displayString) && displayString != 0) {
          totalString += displayString + props.text;
          if (/\.$/.test(totalString)) {
            totalString = totalString.replace(".", "")
          }
          displayString = "0";
          document.getElementById("display").innerHTML = displayString;
          UpdateDisplayTotal();
        } else if (/[\+/x]/.test(props.text) && /[\+\-/x]/.test(totalString.slice(totalString.length-1, totalString.length))) {
          if (/\+/.test(props.text) && /\-/.test(displayString.slice(0))) {
              displayString = displayString.slice(1);
              }
          totalString = totalString.slice(0, totalString.length-1) + props.text;
          document.getElementById("display").innerHTML = displayString;
          UpdateDisplayTotal();
        } else if (/\-/.test(props.text) && !/\-/.test(displayString.slice(0)) && /[\+\-/x]/.test(totalString.slice(totalString.length - 1, totalString.length))) {
          displayString = "-" + displayString;
          document.getElementById("display").innerHTML = displayString;
          UpdateDisplayTotal();
        } else if (/\-/.test(props.text) && /\-/.test(displayString.slice(0))) {
          displayString = displayString.replace(/\-/, "");
          document.getElementById("display").innerHTML = displayString;
          UpdateDisplayTotal();
        } 
        if (/\./.test(props.text) && !/\./.test(displayString) && displayString != 0) {
          displayString += props.text;
        }
        if (/=/.test(props.text) && totalString.length != "") {
          if (displayString == 0 || /\-0/.test(displayString)) {
            totalString = totalString.slice(0, totalString.length-1) + props.text;
          } else {
            totalString += displayString + props.text;  
          }
          displayString = "0";
          allNumbers = totalString.match(/[0-9]+\.?[0-9]*/g);
          allOperands = totalString.match(/[\+\-/x=]+/g);
          //allNumbers.forEach( current => console.log(current) );
          //allOperands.forEach( current => console.log(current) );
          for (let i = 0; i < allNumbers.length; i++) {
            if (allOperands[i] != "=" && i == 0) {
              if (/[\+\-/x=]{2}/.test(allOperands[i])) {
                allNumbers[i+1] = "-" + allNumbers[i+1];
                allOperands[i] = allOperands[i].slice(0, 1);
              }
              tempAnswer = Math(allOperands[i], allNumbers[i], allNumbers[i+1]);
            } else if (allOperands[i] != "=") {
              tempAnswer = Math(allOperands[i], tempAnswer, allNumbers[i+1]);
            }
          }
          while (tempAnswer.length > 1 && tempAnswer.charAt(0) == "0") {
            tempAnswer = tempAnswer.replace(/^0/, "");
          }
          totalString += tempAnswer;
          displayString = tempAnswer;
          document.getElementById("display").innerHTML = displayString;
          UpdateDisplayTotal();
          totalString = "";
        }
        while (displayString.length > 1 && displayString.charAt(0) == "0") {
            displayString = displayString.replace(/^0/, "");
        }
        document.getElementById("display").innerHTML = displayString;
        //console.log(document.getElementById("display").innerHTML);
        } } >{props.text}</button>) 
}

function Math(operation, num1, num2) {
  var total = 0;
  switch(operation) {
    case "+":
      total = parseFloat(num1) + parseFloat(num2);
      //console.log(num1, parseFloat(num1), num2, parseFloat(num2), total);
      break;
    case "-":
      total = parseFloat(num1) - parseFloat(num2);
      break;
    case "x":
      total = parseFloat(num1) * parseFloat(num2);
      break;
    case "/":
      total = parseFloat(num1) / parseFloat(num2);
      break;
  }
  return total;
}

const Display = props => {
  return (<p class="display-text" id="display">{props.text}</p>)
}

function UpdateDisplayTotal () {
  if (totalString.length >= 1 && document.getElementById("totaldisplay") != null) {
    document.getElementById("totaldisplay").style.gridRowStart = 1;
  } else {
    document.getElementById("totaldisplay").style.gridRowStart = 2;
  }
  document.getElementById("totalString").innerHTML = totalString;
}

const DisplayTotal = () => {
  return (<p class="totalString" id="totalString">{totalString}</p>)
}

const CalculatorApp = () => {
  return(
    <div class="grid-container box">
      <div class="totaldisplay" id="totaldisplay"><DisplayTotal /></div>
      <div class="itemdisplay"><Display text="0" /></div>
      <div class="itemac"><Button text="AC" /></div>
      <div class="itemdivide"><Button text="/" /></div>
      <div class="itemtimes"><Button text="x" /></div>
      <div class="itemminus"><Button text="-" /></div>
      <div class="itemplus"><Button text="+" /></div>
      <div class="itemequals"><Button text="=" /></div>
      <div class="itemdot"><Button text="." /></div>
      <div class="item0"><Button text="0" /></div>
      <div class="item1"><Button text="1" /></div>
      <div class="item2"><Button text="2" /></div>
      <div class="item3"><Button text="3" /></div>
      <div class="item4"><Button text="4" /></div>
      <div class="item5"><Button text="5" /></div>
      <div class="item6"><Button text="6" /></div>
      <div class="item7"><Button text="7" /></div>
      <div class="item8"><Button text="8" /></div>
      <div class="item9"><Button text="9" /></div>
    </div>
  );
}

//---Timer--------------------------------------------------------------------------

var breakLength = 5;
var sessionLength = 25;
var currentBreak = breakLength * 60;
var currentSession = sessionLength * 60;
var onSession = true;
var myTimer;

const Timer = () => {
  onSession == true ? currentSession-- : currentBreak--;
  if (currentSession == -1) {
    onSession = false;
    document.getElementById("timer-label").innerHTML = "Break";
    currentSession = sessionLength * 60;
    document.getElementById("beep").play();
  }
  if (currentBreak == -1) {
    onSession = true;
    document.getElementById("timer-label").innerHTML = "Session";
    currentBreak = breakLength * 60;
    document.getElementById("beep").play();
  }
  document.getElementById("time-left").innerHTML = SessionFormat(); 
}

const PlayPause = () => {
  if (myTimer == null) {
    myTimer = setInterval(Timer, 1000);
  } else {
    clearInterval(myTimer);
    myTimer = null;
  }
}

const Reset = () => {
  clearInterval(myTimer);
  myTimer = null;
  sessionLength = 25;
  breakLength = 5;
  currentSession = sessionLength * 60;
  currentBreak = breakLength * 60;
  onSession = true;
  document.getElementById("timer-label").innerHTML = "Session";
  document.getElementById("session-length").innerHTML = sessionLength;
  document.getElementById("break-length").innerHTML = breakLength;
  document.getElementById("time-left").innerHTML = SessionFormat();
  document.getElementById("beep").pause();
  document.getElementById("beep").currentTime = 0;
}

const IncreaseDecrease = props => {
  return (<button class="button unselectable" id={props.id} onClick={ () => {
      if (props.increase) {
        props.idValue == "break-length" ? breakLength++ : sessionLength++;
        if (breakLength > 60) breakLength = 60 ; if (sessionLength > 60) sessionLength = 60 ;
        document.getElementById(props.idValue).innerHTML = (props.idValue == "break-length" ? breakLength : sessionLength);
      } else {
        props.idValue == "break-length" ? breakLength-- : sessionLength--;
        if (breakLength < 1) breakLength = 1 ; if (sessionLength < 1) sessionLength = 1 ;
        document.getElementById(props.idValue).innerHTML = (props.idValue == "break-length" ? breakLength : sessionLength);
      }
      currentSession = sessionLength * 60;
      currentBreak = breakLength * 60;
      document.getElementById("time-left").innerHTML = SessionFormat();
      }}>{props.text}</button>)
}

function SessionFormat () {
  let currentString = "";
  if (onSession) {
    currentString = currentSession;
  } else {
    currentString = currentBreak;
  }
  return (
    Math.floor(currentString / 60).toString().padStart(2, '0')  + ":" + (currentString % 60).toString().padStart(2, '0')
  )
}
const TimerButton = props => {
  return (<button class="button unselectable" id={props.id} onClick={ props.function }>{props.text}</button>)
}

const Text = props => {
  return (<p class="unselectable" id={props.id}>{props.text}</p>)
}

const SessionTimer = props => {
  return (<p class="unselectable" id={props.id}>{(currentSession / 60).toString().padStart(2, '0')  + ":" + (currentSession % 60).toString().padStart(2, '0')}</p>)
}

const AudioElement = props => {
  return (<audio id="beep">
    <source src="https://storage.cloud.google.com/genevill/mixkit-clock-countdown-bleeps-916.wav" type="audio/wav" />
  </audio>)
}
const TimerApp = () => {
  return(
    <div class="box grid-container">
      <Text id="break-label" text="Break Length" />
      <Text id="session-label" text="Session Length" />
      <IncreaseDecrease id="break-decrement" text="⌄" idValue="break-length" increase={false} />
      <IncreaseDecrease id="break-increment" text="^" idValue="break-length" increase={true} />
      <IncreaseDecrease id="session-increment" text="^" idValue="session-length" increase={true} />
      <IncreaseDecrease id="session-decrement" text="⌄" idValue="session-length" increase={false} />
      <Text id="break-length" text="5" />
      <Text id="session-length" text="25" />
      <Text id="timer-label" text="Session" />
      <SessionTimer id="time-left" />
      <div id="start-stop-reset">
        <TimerButton id="start_stop" text="⏵⏸" function={PlayPause} />
        <TimerButton id="reset" text="↺" function={Reset} />
        <AudioElement />
      </div>
    </div>
  );
}



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
            <div class="about-me-div">
              <img src="https://github.com/genevill/genevill/blob/main/profilepic.JPG?raw=true" />
            </div>
            <div class="about-me-div">
              <a id="profile-link" href="https://www.freecodecamp.org/genevill" target="_blank">freeCodeCamp Portfolio</a>
              <a id="profile-link" href="https://github.com/genevill" target="_blank">GitHub Portfolio</a>
            </div>
          </div>
        </section>
        <section class="center" id="projects">
          <h1 >Projects</h1>
          <p class="project-tile">Project Tile</p>
          <a href="./project-link">Project Link</a>
          <TimerApp />
	  <CalculatorApp />
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
