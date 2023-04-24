import './Timer.css';

//---Timer--------------------------------------------------------------------------

var breakLength = 5;
var sessionLength = 25;
var currentBreak = breakLength * 60;
var currentSession = sessionLength * 60;
var onSession = true;
var myTimer;
var upCaret = "https://storage.cloud.google.com/genevill/383167_caret_up_icon.png";
var downCaret = "https://storage.cloud.google.com/genevill/383170_caret_down_icon.png";

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

const Increase = props => {
    return (<button class="button unselectable" id={props.id} onClick={() => {
        props.idValue == "break-length" ? breakLength++ : sessionLength++;
        if (breakLength > 60) breakLength = 60; if (sessionLength > 60) sessionLength = 60;
        document.getElementById(props.idValue).innerHTML = (props.idValue == "break-length" ? breakLength : sessionLength);
        currentSession = sessionLength * 60;
        currentBreak = breakLength * 60;
        document.getElementById("time-left").innerHTML = SessionFormat();
    }}><img id="buttonimg" src={upCaret} /></button>)
}

const Decrease = props => {
    return (<button class="button unselectable" id={props.id} onClick={() => {
        props.idValue == "break-length" ? breakLength-- : sessionLength--;
        if (breakLength < 1) breakLength = 1; if (sessionLength < 1) sessionLength = 1;
        document.getElementById(props.idValue).innerHTML = (props.idValue == "break-length" ? breakLength : sessionLength);
        currentSession = sessionLength * 60;
        currentBreak = breakLength * 60;
        document.getElementById("time-left").innerHTML = SessionFormat();
    }}><img id="buttonimg" src={downCaret} /></button>)
}

function SessionFormat() {
    let currentString = "";
    if (onSession) {
        currentString = currentSession;
    } else {
        currentString = currentBreak;
    }
    return (
        Math.floor(currentString / 60).toString().padStart(2, '0') + ":" + (currentString % 60).toString().padStart(2, '0')
    )
}
const TimerButton = props => {
    return (<button class="button unselectable" id={props.id} onClick={props.function}>{props.text}</button>)
}

const Text = props => {
    return (<p class="unselectable centertext" id={props.id}>{props.text}</p>)
}

const SessionTimer = props => {
    return (<p class="unselectable" id={props.id}>{(currentSession / 60).toString().padStart(2, '0') + ":" + (currentSession % 60).toString().padStart(2, '0')}</p>)
}

const AudioElement = props => {
    return (<audio id="beep">
        <source src="https://storage.cloud.google.com/genevill/mixkit-clock-countdown-bleeps-916.wav" type="audio/wav" />
    </audio>)
}
export const TimerApp = () => {
    return (
        <div class="box grid-container">
            <Text id="break-label" text="Break Length" />
            <Text id="session-label" text="Session Length" />
            <Decrease id="break-decrement" idValue="break-length" />
            <Increase id="break-increment" idValue="break-length" />
            <Increase id="session-increment" idValue="session-length" />
            <Decrease id="session-decrement" idValue="session-length" />
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