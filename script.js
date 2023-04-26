const output = document.querySelector("input#output")
const buttonEqual = document.querySelector("button.button_equal");
const buttonClearLast = document.querySelector("button.button_clear_last");
const buttonsNumber = document.querySelectorAll("button.button_number")
const buttonsClearAll = document.querySelectorAll("button.button_clear_all")
const buttonsOperator = document.querySelectorAll("button.button_operator")

const signs = ["/", "*", "-", "+"]
let launcError = false;
let inputTextOutputCurrentValue = "";
const inputTextOutputData = [];


const validateQuantityOfPoints = (maxQuantity = 1) => {
  const quantity = inputTextOutputCurrentValue.split("").reduce((prev, curr) => {
    if (curr === ".") return prev + 1;
    return prev;
  }, 0)

  return quantity === maxQuantity;
}

const clearInputTextOutput = () => {
  output.value = inputTextOutputCurrentValue = "";
  inputTextOutputData.splice(0, inputTextOutputData.length)
  launcError = false;
}

const clearLastNumber = () => {
  inputTextOutputCurrentValue = inputTextOutputCurrentValue.substring(0, inputTextOutputCurrentValue.length - 1)
  output.value = inputTextOutputCurrentValue;
}

const buttonNumberClick = (e) => {

  if (launcError) { clearInputTextOutput() };

  if (!launcError && inputTextOutputCurrentValue === "" && inputTextOutputData.length === 0 && output.value !== "") { clearInputTextOutput() };

  const buttonNumbervalue = e.target.textContent;
  const lastCharacter = inputTextOutputCurrentValue.substring(inputTextOutputCurrentValue.length - 1, inputTextOutputCurrentValue.length)

  if (e.target.textContent === "." && lastCharacter === ".") return;
  if (e.target.textContent === "." && validateQuantityOfPoints(1)) return;

  inputTextOutputCurrentValue += buttonNumbervalue;
  output.value = inputTextOutputCurrentValue;
}

const buttonOperationClick = (e) => {
  const signOperator = e.target.textContent;
  const outputToNumber = Number(inputTextOutputCurrentValue);

  if (Number.isNaN(outputToNumber) && !launcError) {
    clearInputTextOutput();
    launcError = true;
    output.value = "Syntax Error"
    return;
  }

  inputTextOutputData.push(outputToNumber, signOperator)
  inputTextOutputCurrentValue = ""
  output.value = "";
}

const buttonEqualClick = (e) => {

  const outputToNumber = Number(inputTextOutputCurrentValue);
  if (Number.isNaN(outputToNumber) && (inputTextOutputCurrentValue === "" && !launcError)) {
    clearInputTextOutput();
    launcError = true;
    output.value = "Syntax Error"
    return;
  }

  inputTextOutputData.push(outputToNumber);

  let lastSign = "", lastValue = 0;

  for (const item of inputTextOutputData) {
    if (!Number.isNaN(Number(item))) {
      if (signs.includes(lastSign)) {
        lastValue = eval(`${lastValue}${lastSign}${item}`)
        lastSign = "";
      } else {
        lastValue = item;
      }
    } else {
      lastSign = item;
    }
  }

  if (Number.isNaN(lastValue) && !launcError) {
    clearInputTextOutput();
    launcError = true;
    output.value = "Syntax Error"
    return;
  }

  clearInputTextOutput();
  output.value = lastValue;
}

// carga inicial
buttonsNumber.forEach(button => button.addEventListener("click", buttonNumberClick))
buttonsClearAll.forEach(button => button.addEventListener("click", clearInputTextOutput))
buttonsOperator.forEach(button => button.addEventListener("click", buttonOperationClick))
buttonClearLast.addEventListener("click", clearLastNumber)
buttonEqual.addEventListener("click", buttonEqualClick)
