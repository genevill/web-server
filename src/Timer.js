import './Timer.css';
import { upCaret } from './App.js';
import { downCaret } from './App.js';
import { refresh } from './App.js';
import { playPause } from './App.js';

//---Timer--------------------------------------------------------------------------

export const TimerApp = () => {
    var breakLength = 5;
    var sessionLength = 25;
    var currentBreak = breakLength * 60;
    var currentSession = sessionLength * 60;
    var onSession = true;
    var myTimer;
    upCaret = "https://storage.cloud.google.com/genevill/383167_caret_up_icon.png";
    downCaret = "https://storage.cloud.google.com/genevill/383170_caret_down_icon.png";
    refresh = "https://storage.cloud.google.com/genevill/383083_refresh_reload_icon.png";
    playPause = "https://storage.cloud.google.com/genevill/play-pause.png";


    const Timer = () => {
        if (document.getElementById("timer-outer-box") == null) {
            clearInterval(myTimer);
            myTimer = null;
        }
        onSession == true ? currentSession-- : currentBreak--;
        if (currentSession == -1) {
            onSession = false;
            document.getElementById("timer-timer-label").innerHTML = "Break";
            currentSession = sessionLength * 60;
            document.getElementById("timer-beep").play();
        }
        if (currentBreak == -1) {
            onSession = true;
            document.getElementById("timer-timer-label").innerHTML = "Session";
            currentBreak = breakLength * 60;
            document.getElementById("timer-beep").play();
        }
        if (document.getElementById("timer-outer-box") != null) {
            document.getElementById("timer-time-left").innerHTML = SessionFormat();
        }
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
        document.getElementById("timer-timer-label").innerHTML = "Session";
        document.getElementById("timer-session-length").innerHTML = sessionLength;
        document.getElementById("timer-break-length").innerHTML = breakLength;
        document.getElementById("timer-time-left").innerHTML = SessionFormat();
        document.getElementById("timer-beep").pause();
        document.getElementById("timer-beep").currentTime = 0;
    }

    const Increase = props => {
        return (<button class="timer-button timer-unselectable" id={props.id} onClick={() => {
            props.idValue == "timer-break-length" ? breakLength++ : sessionLength++;
            if (breakLength > 60) breakLength = 60; if (sessionLength > 60) sessionLength = 60;
            document.getElementById(props.idValue).innerHTML = (props.idValue == "timer-break-length" ? breakLength : sessionLength);
            currentSession = sessionLength * 60;
            currentBreak = breakLength * 60;
            document.getElementById("timer-time-left").innerHTML = SessionFormat();
        }}><img id="timer-buttonimg" src={upCaret} /></button>)
    }

    const Decrease = props => {
        return (<button class="timer-button timer-unselectable" id={props.id} onClick={() => {
            props.idValue == "timer-break-length" ? breakLength-- : sessionLength--;
            if (breakLength < 1) breakLength = 1; if (sessionLength < 1) sessionLength = 1;
            document.getElementById(props.idValue).innerHTML = (props.idValue == "timer-break-length" ? breakLength : sessionLength);
            currentSession = sessionLength * 60;
            currentBreak = breakLength * 60;
            document.getElementById("timer-time-left").innerHTML = SessionFormat();
        }}><img id="timer-buttonimg" src={downCaret} /></button>)
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
        return (<button class="timer-button timer-unselectable" id={props.id} onClick={props.function}><img id="timer-buttonimg" src={props.image} /></button>)
    }

    const Text = props => {
        return (<p class="timer-unselectable" id={props.id}>{props.text}</p>)
    }

    const SessionTimer = props => {
        return (<p class="timer-unselectable" id={props.id}>{(currentSession / 60).toString().padStart(2, '0') + ":" + (currentSession % 60).toString().padStart(2, '0')}</p>)
    }

    const AudioElement = props => {
        return (<audio id="timer-beep">
            <source src="https://storage.cloud.google.com/genevill/mixkit-clock-countdown-bleeps-916.wav" type="audio/wav" />
        </audio>)
    }

    return (
        <div class="timer-outer-box" id="timer-outer-box">
            <div class="timer-box timer-grid-container">
                <Text id="timer-break-label" text="Break Length" />
                <Text id="timer-session-label" text="Session Length" />
                <Decrease id="timer-break-decrement" idValue="timer-break-length" />
                <Increase id="timer-break-increment" idValue="timer-break-length" />
                <Increase id="timer-session-increment" idValue="timer-session-length" />
                <Decrease id="timer-session-decrement" idValue="timer-session-length" />
                <Text id="timer-break-length" text="5" />
                <Text id="timer-session-length" text="25" />
                <Text id="timer-timer-label" text="Session" />
                <SessionTimer id="timer-time-left" />
                <div id="timer-start-stop-reset">
                    <TimerButton id="timer-start-stop" image={playPause} function={PlayPause} />
                    <TimerButton id="timer-reset" image={refresh} function={Reset} />
                    <AudioElement />
                </div>
            </div>
        </div>
    );
}
