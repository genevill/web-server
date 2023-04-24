import './DrumMachine.css';

const src = [
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
];

const soundName = [
    "Heater 1",
    "Heater 2",
    "Heater 3",
    "Heater 4",
    "Heater 6",
    "Dsc Oh",
    "Kick n Hat",
    "RP4 KICK 1",
    "Cev H2"
];

const drumLetters = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
const keyCodes = [81, 87, 69, 65, 83, 68, 90, 88, 67];
var noteIndex = 0;

addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 229) {
        return;
    }
    if (document.getElementById(drumLetters[keyCodes.findIndex(code => code == event.keyCode)]) != null && document.getElementById(drumLetters[keyCodes.findIndex(code => code == event.keyCode)]).getElementsByClassName("clip")[0] != null) {
        noteIndex = keyCodes.findIndex(code => code == event.keyCode);
        PlaySound();
    }
});

addEventListener("keyup", (event) => {
    EndSound();
});

const TextBox = () => {
    return <p id="text-box" class="unselectable">Sound Name</p>
}

const PlaySound = () => {
    EndSound();
    document.getElementById(drumLetters[noteIndex]).getElementsByClassName("clip")[0].play();
    document.getElementById("text-box").innerHTML = soundName[noteIndex];
    document.getElementById(drumLetters[noteIndex]).style.background = "indianred";
}

const EndSound = () => {
    drumLetters.map((current, index) => document.getElementById(drumLetters[index]).style.background = "rosybrown")
}

const DrumPads = () => {
    const drumPads = drumLetters.map((current, index) => <DrumPad text={current} />)
    return drumPads;
}

const DrumPad = props => {
    return (<button class="drum-pad unselectable" id={props.text} onClick={() => {
        noteIndex = drumLetters.findIndex(letter => letter == props.text);
        PlaySound();
    }} >
        {props.text}
        <audio class="clip" id={props.text} src={src[drumLetters.findIndex(letter => letter == props.text)]} type="audio/mp3" />
    </button>)
}

export const DrumApp = () => {
    return (
        <div id="drum-machine" class="box">
            <div class="row">
                <DrumPads />
            </div>
            <div id="display" class="row">
                <TextBox />
            </div>
        </div>
    );
}