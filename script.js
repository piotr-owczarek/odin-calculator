const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.getElementById('btn-clear');
const currentScreen = document.getElementById('screen-now');
const lastScreen = document.getElementById('screen-last');
const equalButton = document.getElementById('btn-equal');
const pointerButton = document.getElementById('btn-pointer');
const backspaceButton = document.getElementById('btn-backspace');
let lastValue = '';
let usedOperator = '';
let shouldResetScreen = false;
let operatorClicked = false;
let maxChars = 15;

numberButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        appendCurrentScreen(btn.textContent);
        operatorClicked = false;
    });
});

operatorButtons.forEach(btn => {
    btn.addEventListener('click', () => currentValue(currentScreen.textContent, btn.textContent)) 
});

clearButton.addEventListener('click', () => clear());
equalButton.addEventListener('click', () => equalSign(usedOperator, lastValue, currentScreen.textContent));
pointerButton.addEventListener('click', () => appendCurrentScreen('.'));
backspaceButton.addEventListener('click', () => backspace());

document.addEventListener('keydown', (event) => {
    const key = event.key;
    const code = event.code;

    if ((((+key >= 0 && +key <=9) || key == '.')) &&  code !== 'Space') {
        appendCurrentScreen(key);
        return;
    }
    if (key == '/') {
        currentValue(currentScreen.textContent, '÷');
        return;
    }
    if (key == '*') {
        currentValue(currentScreen.textContent, 'x');
        return;
    }
    if (key == '+' || key == '-') {
        currentValue(currentScreen.textContent, key);
        return;
    }
    if (key == '=' || key == "Enter") {
        equalSign(usedOperator, lastValue, currentScreen.textContent);
        return;
    }
    if (key == 'Backspace') {
        backspace();
        return;
    }
    if (key == 'Delete') {
        clear();
        return;
    }
  });

function appendCurrentScreen(char) {
    if (currentScreen.textContent == '0' || currentScreen.textContent == 'Number is too big' || currentScreen.textContent == 'Dividing by 0') {
        if (char == '.') currentScreen.textContent = '0.';
        else {
            if (lastScreen.toString().length == 0){
                currentScreen.textContent = '';
                lastScreen.textContent = '';
            }
        }
    }

    if (shouldResetScreen) {
        if (char == '.') currentScreen.textContent = '0.';
        else currentScreen.textContent = '';
    }

    shouldResetScreen = false;

    if (char == '.' && currentScreen.textContent.includes('.')) return;
    if (currentScreen.textContent == '0') currentScreen.textContent = '';
    if (currentScreen.textContent.length < 16) currentScreen.textContent += char;
}

function backspace() {
    if (currentScreen.textContent.length > 0) currentScreen.textContent = currentScreen.textContent.slice(0, -1);
}

function clear() {
    currentScreen.textContent = 0;
    lastScreen.textContent = '';
    lastValue = '';
    usedOperator = '';
}

function currentValue(value, operator) {
    lastScreen.textContent = value + ' ' + operator;

    if (!operatorClicked) {
        if (usedOperator !== '' && lastValue !== '') {
            if (usedOperator == operator) {
                operate(operator, lastValue, value);
            }
            else {
                operate(usedOperator, lastValue, value);
            }
            lastScreen.textContent = currentScreen.textContent + ' ' + operator;
            value = currentScreen.textContent;   
        }
    }

    operatorClicked = true;
    lastValue = value;
    usedOperator = operator;
    shouldResetScreen = true;
}

function equalSign(operator, a, b) {
    if (a == '') return;
    lastScreen.textContent = a + ' ' + operator + ' ' + b + ' =';
    operate(operator, a, b);
    usedOperator = '';
}

function round(number) {
    const wholeDigits = Math.round(number).toString().length;
    const power = wholeDigits <= 16 ? 16 - wholeDigits : 0;
    const multiplier = 10**power;
    const result = Math.round(number * multiplier) / multiplier;
    console.log(result.toString().length);
    if (result.toString().length > 17) return 'Number is too big';
    return result;
}

function operate(operator, a, b) {
    lastValue = '';
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            if (b == 0) currentScreen.textContent = 'Dividing by 0';
            else return divide(a, b);
        default:
            return 'Error, wrong operator';
    }
}

function add(a, b) {
    currentScreen.textContent = round(+a + +b);
}

function subtract(a, b) {
    currentScreen.textContent = round(a - b);
}

function multiply(a, b) {
    currentScreen.textContent = round(a * b);
}

function divide(a, b) {
    currentScreen.textContent = round(a / b);
}