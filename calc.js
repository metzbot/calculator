/*----------------------------
Math Functions--------------*/
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

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
  if (primaryDisplay.textContent === '' || resetDisplay)
    clrDisplay();
  if (primaryDisplay.textContent.length < 12)
    primaryDisplay.textContent += num;
}

function addDecimal() {
  if (resetDisplay) clrDisplay();
  if (primaryDisplay.textContent === '')
    primaryDisplay.textContent = '0';
  if (primaryDisplay.textContent.includes('.')) return;
  primaryDisplay.textContent += '.';
}

function plusMinus() {
  if (resetDisplay) clrDisplay()
  if (primaryDisplay.textContent.slice(0,1) === '-') {
    primaryDisplay.textContent = primaryDisplay.textContent.substring(1);
  } else {
    primaryDisplay.textContent = '-' + primaryDisplay.textContent;
  }
}

function setOpType(op) {
  if (op === secondaryDisplay.textContent.slice(-1)) return;
  if (currentOperator !== null) doMathCalc();
  if ((primaryDisplay.textContent === '') && (resetDisplay)) {
    currentOperator = null;
    return;
  }
  operandOne = primaryDisplay.textContent;
  currentOperator = op;
  primaryDisplay.textContent = '';
  secondaryDisplay.textContent = `${operandOne} ${currentOperator}`
  fitFont(display); //CHANGED
}

function doMathCalc() {
  if (currentOperator === null || resetDisplay) return;
  if (currentOperator === '/' && primaryDisplay.textContent === '0') {
    alert('nice try you fuckin zoolander')
    return;
  }
  operandTwo = primaryDisplay.textContent;
  primaryDisplay.textContent = roundReturn(doMath(currentOperator, operandOne, operandTwo));
  if (primaryDisplay.textContent.length > 12)
    primaryDisplay.textContent = ((parseInt(primaryDisplay.textContent)).toExponential());
  secondaryDisplay.textContent = `${operandOne} ${currentOperator} ${operandTwo} =`;
  fitFont(display);
  currentOperator = null;
  resetDisplay = true;
}

//functions exactly like backspace key expected to
function undoLastInput() {
  if (resetDisplay) return;
  if (primaryDisplay.textContent !== '') {
    primaryDisplay.textContent = primaryDisplay.textContent.toString().slice(0, -1);
  } else {
    primaryDisplay.textContent = secondaryDisplay.textContent.toString().slice(0, -1);
    secondaryDisplay.textContent = '';
    fitFont(display);
    currentOperator = null
    operandTwo = '';
  }
}

//only clears current operand
function clearEntry() {
  if (resetDisplay === false) primaryDisplay.textContent = '';
}

//full clear of display and operation
function clear() {
  primaryDisplay.textContent = '';
  secondaryDisplay.textContent = '';
  operandOne = '';
  operandTwo = '';
  currentOperator = null;
}

//contextual display clearing
function clrDisplay() {
  if (secondaryDisplay.textContent !== '') {
    secondaryDisplay.textContent += ` ${primaryDisplay.textContent}`;
    fitFont(display);
  }
  primaryDisplay.textContent = '';
  resetDisplay = false;
}

//font-size scaling
function fitFont(textElement) {
  let child = document.getElementById('line1');
  let getFontSize = parseFloat(window.getComputedStyle(child).getPropertyValue('font-size'));
    
  while(child.offsetWidth > (textElement.clientWidth - 20)) {
    getFontSize -= .1;
    child.style.fontSize = getFontSize + 'px';
  }
  child.style.visibility = 'visible';
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
const display = document.getElementById('display');

/*----------------------------
Event listeners-------------*/
window.addEventListener('keydown', keebInput);
decimalBtn.addEventListener('click', addDecimal);
plusMinusBtn.addEventListener('click', plusMinus);
equalsBtn.addEventListener('click', doMathCalc);
clearEntryBtn.addEventListener('click', clearEntry);
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

/* TO DO
odd behavior why are C and CE buttons toggling/highlighting
truncate numbers to fit in display

implement proper history display
*/