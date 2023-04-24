import './Calculator.css';

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
    return (<button class="button unselectable" id={idNames[buttonNames.indexOf(props.text)]} onClick={() => {
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
        } else if (/[\+/x]/.test(props.text) && /[\+\-/x]/.test(totalString.slice(totalString.length - 1, totalString.length))) {
            if (/\+/.test(props.text) && /\-/.test(displayString.slice(0))) {
                displayString = displayString.slice(1);
            }
            totalString = totalString.slice(0, totalString.length - 1) + props.text;
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
                totalString = totalString.slice(0, totalString.length - 1) + props.text;
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
                        allNumbers[i + 1] = "-" + allNumbers[i + 1];
                        allOperands[i] = allOperands[i].slice(0, 1);
                    }
                    tempAnswer = Math(allOperands[i], allNumbers[i], allNumbers[i + 1]);
                } else if (allOperands[i] != "=") {
                    tempAnswer = Math(allOperands[i], tempAnswer, allNumbers[i + 1]);
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
    }} >{props.text}</button>)
}

function Math(operation, num1, num2) {
    var total = 0;
    switch (operation) {
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

function UpdateDisplayTotal() {
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

export const CalculatorApp = () => {
    return (
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