/*----------------------------
Math Functions--------------*/

//add
function add(a, b) {
  return a + b;
}

//subtract
function subtract(a, b) {
  return a - b;
}

//multiply
function multiply(a, b) {
  return a * b;
}

//divide
function divide(a, b) {
  return a / b;
}

//rounds to 1000th decimal place
function roundReturn(num) {
  return Math.round(num * 1000) / 1000;
}

/*----------------------------
Calculator Functions--------*/
//takes an operator and 2 numbers, calls a math function
function doMath(op, a, b) {
  a = Number(a);
  b = Number(b);
  switch (op) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      return null;
  }
}

function setNumber(num) {
  if (primaryDisplay.textContent === '0' || resetDisplay)
    clrDisplay();
  primaryDisplay.textContent += num;
}

function addDecimal() {
  if (resetDisplay) clrDisplay()
  if (primaryDisplay.textContent === '')
    primaryDisplay.textContent = '0';
  if (primaryDisplay.textContent.includes('.')) return;
  primaryDisplay.textContent += '.';
}

function setOpType(op) {
  //lastInputOp = true;
  if (currentOperator !== null) doMathCalc();
  operandOne = primaryDisplay.textContent;
  currentOperator = op;
  primaryDisplay.textContent = '';
  secondaryDisplay.textContent = `${operandOne} ${currentOperator}`;
  resetDisplay = true;
}

function doMathCalc() {
  if (currentOperator === null || resetDisplay) return;
  if (currentOperator === '/' && primaryDisplay.textContent === '0') {
    alert('nice try zoolander')
    return;
  }
  operandTwo = primaryDisplay.textContent;
  primaryDisplay.textContent = roundReturn(doMath(currentOperator, operandOne, operandTwo));
  secondaryDisplay.textContent = `${operandOne} ${currentOperator} ${operandTwo} =`;
  currentOperator = null;
}

function undoLastInput() { //need to set undo operator input
  //if (lastInputOperator) {lastInputOp = false;};
  primaryDisplay.textContent = primaryDisplay.textContent.toString().slice(0, -1);
}

/*----------------------------
Display---------------------*/
//full clear of display and operation
function clear() {
  primaryDisplay.textContent = '';
  secondaryDisplay.textContent = '';
  operandOne = '';
  operandTwo = '';
  currentOperator = null;
}

function clrDisplay() {
  primaryDisplay.textContent = '';
  resetDisplay = false;
}

/*----------------------------
Variables-------------------*/
let currentNum = 0;
let displayNum = 0;
let currentOperator = null;
let operandOne = 0;
let operandTwo = 0;
let resetDisplay = false;
let lastInputOp = false;

//DOM references
const operandBtns = document.querySelectorAll('.operand');
const operatorBtns = document.querySelectorAll('.operator');
const decimalBtn = document.getElementById('decimal');
const plusMinusBtn = document.getElementById('plusminus');
const equalsBtn = document.getElementById('equals');
const clearEntryBtn = document.getElementById('CE');
const clearBtn = document.getElementById('C');
const backspaceBtn = document.getElementById('backspace');
const secondaryDisplay = document.getElementById('line1');
const primaryDisplay = document.getElementById('line2');

/*----------------------------
Event listeners-------------*/
window.addEventListener('keydown', keebInput); //TO DO
decimalBtn.addEventListener('click', addDecimal);
//plusMinusBtn.addEventListener('click', plusMinus); //TO DO
equalsBtn.addEventListener('click', doMathCalc);
//clearEntryBtn.addEventListener('click', clearEntry); //TO DO
clearBtn.addEventListener('click', clear);
backspaceBtn.addEventListener('click', undoLastInput);

operandBtns.forEach((button) =>
  button.addEventListener('click', () => setNumber(button.textContent))
);

operatorBtns.forEach((button) =>
  button.addEventListener('click', () => setOpType(button.textContent))
);

//keyboard functionality
function keebInput(i) {
  if (i.key >= 0 && i.key <= 9) setNumber(i.key);
  if (i.key === '.') addDecimal();
  if (i.key === '=' || i.key === 'Enter') doMathCalc();
  if (i.key === 'Backspace') undoLastInput();
  if (i.key === 'Delete' || i.key === 'Escape') clear();
  if (i.key === '+' || i.key === '-' || i.key === '*' || i.key === '/') {
    setOpType(i.key);
  }
}