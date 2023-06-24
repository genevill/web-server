import './DrumMachine.css';

export function DrumApp() {

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

    document.addEventListener("keydown", (event) => {
        if (event.isComposing || event.keyCode === 229) {
            return;
        }
        if (document.getElementById(drumLetters[keyCodes.findIndex(code => code == event.keyCode)]) != null && document.getElementById(drumLetters[keyCodes.findIndex(code => code == event.keyCode)]).getElementsByClassName("drum-clip")[0] != null) {
            noteIndex = keyCodes.findIndex(code => code == event.keyCode);
            PlaySound();
        }
    });

    document.addEventListener("keyup", (event) => {
        EndSound();
    });

    document.addEventListener("mouseup", (event) => {
        EndSound();
    });

    const TextBox = () => {
        return <p id="drum-text-box" class="drum-unselectable">Sound Name</p>
    }

    const PlaySound = () => {
        EndSound();
        document.getElementById(drumLetters[noteIndex]).getElementsByClassName("drum-clip")[0].play();
        document.getElementById("drum-text-box").innerHTML = soundName[noteIndex];
        document.getElementById(drumLetters[noteIndex]).style.background = "#5E6A75";
    }

    const EndSound = () => {
        drumLetters.map((current, index) => {
            if (document.getElementById(drumLetters[index]) != null) {
                document.getElementById(drumLetters[index]).style.background = "#213242";
            }
        });
    }

    const DrumPads = () => {
        const drumPads = drumLetters.map((current, index) => <DrumPad text={current} />)
        return drumPads;
    }

    const DrumPad = props => {
        return (<button class="drum-pad drum-unselectable" id={props.text} onMouseDown={() => {
            noteIndex = drumLetters.findIndex(letter => letter == props.text);
            PlaySound();
        }} >
            {props.text}
            <audio class="drum-clip" id={props.text} src={src[drumLetters.findIndex(letter => letter == props.text)]} type="audio/mp3" />
        </button>)
    }

    return (
        <div class="drum-outer-box">
            <div id="drum-machine" class="drum-box">
                <div class="drum-row">
                    <DrumPads />
                </div>
                <div id="display" class="drum-row">
                    <TextBox />
                </div>
            </div>
        </div>
    );
}