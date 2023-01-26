const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.getElementById('btn-clear');
const currentScreen = document.querySelector('.screen-now');
const lastScreen = document.querySelector('.screen-last');
const equalButton = document.querySelector('.btn-equal');
let lastValue;
let usedOperator;
let shouldResetScreen = false;

numberButtons.forEach(btn => {
    btn.addEventListener('click', () => appendCurrentScreen(btn.textContent))
});

operatorButtons.forEach(btn => {
    btn.addEventListener('click', () => currentValue(currentScreen.textContent, btn.textContent))
});

clearButton.addEventListener('click', () => clear());
equalButton.addEventListener('click', () => operate(usedOperator, lastValue, currentScreen.textContent))

function appendCurrentScreen(number) {
    if (currentScreen.textContent == 0) currentScreen.textContent = '';
    if (shouldResetScreen) currentScreen.textContent = '';
    shouldResetScreen = false;
    currentScreen.textContent += number;
}

function clear() {
    currentScreen.textContent = 0;
    lastScreen.textContent = '';
}

function currentValue(value, operator) {
    lastScreen.textContent = value + ' ' + operator;
    lastValue = value;
    usedOperator = operator;
    shouldResetScreen = true;
}


function operate(operator, a, b) {
    if (lastScreen.textContent !== '') lastScreen.textContent += ' ' + b + ' =';
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        default:
            return "Error, wrong operator";
    }
}

function add(a, b) {
    currentScreen.textContent = +a + +b;
}

function subtract(a, b) {
    currentScreen.textContent = a - b;
}

function multiply(a, b) {
    currentScreen.textContent = a * b;
}

function divide(a, b) {
    currentScreen.textContent = a / b;
}