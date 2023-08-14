const calculator = document.querySelector(".calculator");
const buttons = document.querySelectorAll(".calc-button");
const screen = document.querySelector(".calc-screen");
const maxChars = 16;

let lastOperator = "";
let buffer = 0;

function init() {
    document.addEventListener("keyup", function (e) {
        let key;
        if (isNaN(e.key)) {
            key = e.key.toUpperCase();
        } else {
            key = e.key;
        }

        let btn;
        switch (key) {
            case "ENTER":
                btn = document.getElementById("=");
                break;

            case "BACKSPACE":
                btn = document.getElementById("D");
                break;

            default:
                btn = document.getElementById(key);
                break;
        }
        btn.click();
    });

    buttons.forEach(btn => btn.addEventListener('click', event => {
        buttonClick(event.target);
    }));
}

function buttonClick(button) {
    if (!isNaN(button.innerHTML) || button.innerHTML === ".") {
        buttonNumber(button.innerHTML);
    } else {
        buttonSymbol(button.innerHTML);
    }
}

function buttonSymbol(symbol) {
    switch (symbol) {
        case "C":
            buffer = 0;
            lastOperator = "";
            clearScreen();
            break;

        case "D":
            if (screen.innerHTML.length === 1) {
                screen.innerHTML = "0";
            } else {
                screen.innerHTML = screen.innerHTML.substring(0, Math.max(screen.innerHTML.length - 1, 1));
            }
            break;

        case "=":
            doOperation();
            break;

        case "+":
        case "*":
        case "/":
        case "-":
            lastOperator = symbol;
            buffer = Number(screen.innerHTML);
            clearScreen();
    }
}

function buttonNumber(number) {
    if (screen.innerHTML.length === maxChars) {
        return;
    }

    if (screen.innerHTML === "0") {
        screen.innerHTML = String(number);
    } else if (number === "." && screen.innerHTML.includes(".")) {
        // Do nothing
    } else {
        screen.innerHTML = screen.innerHTML.concat(String(number));
    }
}

function doOperation() {
    const number = Number(screen.innerHTML);
    switch (lastOperator) {
        case "+":
            buffer += number;
            break;
        case "*":
            buffer *= number;
            break;
        case "/":
            buffer /= number;
            break;
        case "-":
            buffer -= number;
            break;
    }
    screen.innerHTML = String(buffer);
}

function clearScreen() {
    screen.innerHTML = "0";
}

init();