const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let previousInput = "";
let operator = "";
let shouldResetDisplay = false;


// =========================
// DISPLAY
// =========================

function updateDisplay(value) {
    display.textContent = value || "0";
}


// =========================
// NUMBER
// =========================

function handleNumber(value) {

    if (shouldResetDisplay) {
        currentInput = "";
        shouldResetDisplay = false;
    }

    // Multiple decimal points prevent
    if (value === "." && currentInput.includes(".")) {
        return;
    }

    // Starting with decimal
    if (value === "." && currentInput === "") {
        currentInput = "0.";
    } else {
        currentInput += value;
    }

    updateDisplay(currentInput);
}


// =========================
// OPERATOR
// =========================

function handleOperator(selectedOperator) {

    if (currentInput === "" && previousInput === "") {
        return;
    }

    if (previousInput !== "" && currentInput !== "") {
        calculate();
    }

    previousInput = currentInput;
    currentInput = "";
    operator = selectedOperator;
}


// =========================
// CALCULATE
// =========================

function calculate() {

    if (
        previousInput === "" ||
        currentInput === "" ||
        operator === ""
    ) {
        return;
    }

    const firstNumber = Number(previousInput);
    const secondNumber = Number(currentInput);

    let result;

    switch (operator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":

            if (secondNumber === 0) {
                updateDisplay("Error");

                currentInput = "";
                previousInput = "";
                operator = "";

                return;
            }

            result = firstNumber / secondNumber;
            break;

        case "%":
            result = firstNumber % secondNumber;
            break;

        default:
            return;
    }

    // Remove unnecessary decimal digits
    result = Number(result.toFixed(10));

    updateDisplay(result);

    currentInput = result.toString();
    previousInput = "";
    operator = "";

    shouldResetDisplay = true;
}


// =========================
// CLEAR
// =========================

function clearCalculator() {

    currentInput = "";
    previousInput = "";
    operator = "";
    shouldResetDisplay = false;

    updateDisplay("0");
}


// =========================
// DELETE
// =========================

function deleteLast() {

    if (shouldResetDisplay) {
        return;
    }

    currentInput = currentInput.slice(0, -1);

    updateDisplay(currentInput);
}


// =========================
// BUTTON EVENTS
// =========================

buttons.forEach((button) => {

    button.addEventListener("click", () => {

        const value = button.dataset.value;
        const action = button.dataset.action;


        // Number / Decimal
        if (value !== undefined) {

            if (
                !isNaN(value) ||
                value === "."
            ) {
                handleNumber(value);
            }

            // Operator
            else {
                handleOperator(value);
            }
        }


        // Clear
        if (action === "clear") {
            clearCalculator();
        }


        // Delete
        if (action === "delete") {
            deleteLast();
        }


        // Calculate
        if (action === "calculate") {
            calculate();
        }

    });

});