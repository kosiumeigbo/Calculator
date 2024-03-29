"use strict";

const calculatorEl = document.querySelector(".calculator");
const screen = document.querySelector(".screen");
const buttonsArea = document.querySelector(".buttons");
const buttonClear = document.querySelector(".button-clear");
const selectedBackgroundColor = "#fee48f";
const selectedBorderColor = "#b18907";
const additionButton = document.querySelector(".addition");
const subtractionButton = document.querySelector(".subtraction");
const divisionButton = document.querySelector(".division");
const multiplicationButton = document.querySelector(".multiplication");

const operationButtons = [
  additionButton,
  subtractionButton,
  divisionButton,
  multiplicationButton,
];

// prettier-ignore
const [number, decimalPoint, operation, posNeg, inverse, squareRoot, percentage, equalsTo, clear,] = ["number", "decimal-point", "operation", "pos-neg", "inverse", "square-root", "percentage", "equals-to", "clear"];

// prettier-ignore
const [addition, subtraction, division, multiplication] = ["addition", "subtraction", "division", "multiplication"];

let pressedButton;
let workingNumberString = ""; // To be updated when the user is done entering the number
let workingNumberStringDigitCounter = 0; // To make sure that the entered number has no greater than 9 digits in total
let decimalPointActivated = false; // To be updated when decimal point has been input
let savedWorkingNumber; // Number to be updated as one of the 4 main operations is pressed
let previousEnteredNumber; // Last number to be entered
let previousButtonPressed; // Last button to be pressed, either operation or number
let operationInMemory; // Last operation button pressed, either addition, subtraction, division or multiplication

const resizeCalculator = function () {
  const windowAspectRatio =
    window.screen.availWidth / window.screen.availHeight;

  if (windowAspectRatio > 5 / 6) {
    calculatorEl.style.height = "95%";
    calculatorEl.style.width = "";
  } else {
    calculatorEl.style.height = "";
    calculatorEl.style.width = "min(100%, 50rem)";
  }
};

// Event listener to check for width of calculator when DOM loads and when window is resized
window.document.addEventListener("DOMContentLoaded", resizeCalculator);
window.addEventListener("resize", resizeCalculator);

// Function to update working number string by adding characters to it
const updateWorkingNumberString = function (rootString, adder) {
  workingNumberString = rootString + adder;
};

// Function to update the number string digit counter
const updateWorkingNumberStringDigitCounter = function () {
  workingNumberStringDigitCounter++;
};

const renderScreen = function (value) {
  if (value === "Error") {
    screen.textContent = value;
  } else {
    let valueNumber = Number(value);
    let valueString = String(value);
    const numberSign = Math.sign(valueNumber);

    if (valueString.includes("e")) {
      let [num, ePart] = valueString.split("e");
      const numAbs = Math.abs(Number(num));

      if (String(numAbs).length <= 10) {
        screen.textContent = `${
          numberSign === -1 || numberSign === -0 ? "-" : ""
        }${numAbs}e${ePart}`;
      } else {
        screen.textContent = `${
          numberSign === -1 || numberSign === -0 ? "-" : ""
        }${numAbs.toFixed(8)}e${ePart}`;
      }
    } else {
      if (
        (valueString.includes("-") &&
          valueString.includes(".") &&
          valueString.length <= 11) ||
        (valueString.includes("-") &&
          !valueString.includes(".") &&
          valueString.length <= 10) ||
        (!valueString.includes("-") &&
          valueString.includes(".") &&
          valueString.length <= 10) ||
        (!valueString.includes("-") &&
          !valueString.includes(".") &&
          valueString.length <= 9)
      ) {
        screen.textContent = valueString;
      } else {
        let numAbs = Math.abs(valueNumber);
        let i = 0;
        while (numAbs >= 10) {
          numAbs = numAbs / 10;
          i++;
        }

        if (String(numAbs).length <= 10) {
          screen.textContent = `${
            numberSign === -1 || numberSign === -0 ? "-" : ""
          }${numAbs}e+${i}`;
        } else {
          screen.textContent = `${
            numberSign === -1 || numberSign === -0 ? "-" : ""
          }${numAbs.toFixed(8)}e+${i}`;
        }
      }
    }
  }
};

// Function combining updateWorkingNumberString and updateWorkingNumberStringDigitCounter
const numberPressed = function (rootString, adder) {
  updateWorkingNumberString(rootString, adder);
  updateWorkingNumberStringDigitCounter();
};

const performOperationInMemory = function (opInMemory) {
  if (opInMemory === addition) {
    savedWorkingNumber += Number(workingNumberString);
    previousEnteredNumber = Number(workingNumberString);
    workingNumberStringDigitCounter = 0;
    decimalPointActivated = false;
  }

  if (opInMemory === subtraction) {
    savedWorkingNumber -= Number(workingNumberString);
    previousEnteredNumber = Number(workingNumberString);
    workingNumberStringDigitCounter = 0;
    decimalPointActivated = false;
  }

  if (opInMemory === division) {
    savedWorkingNumber = savedWorkingNumber / Number(workingNumberString);
    previousEnteredNumber = Number(workingNumberString);
    workingNumberStringDigitCounter = 0;
    decimalPointActivated = false;
  }

  if (opInMemory === multiplication) {
    savedWorkingNumber = savedWorkingNumber * Number(workingNumberString);
    previousEnteredNumber = Number(workingNumberString);
    workingNumberStringDigitCounter = 0;
    decimalPointActivated = false;
  }

  // Check if multiplying by Infinity or NaN
  if (savedWorkingNumber === NaN || savedWorkingNumber === Infinity) {
    renderScreen("Error");
  } else {
    renderScreen(savedWorkingNumber);
  }
};

const performOperationInMemoryPosNegEqualsTo = function (opInMemory) {
  if (opInMemory === addition) {
    savedWorkingNumber = Number(workingNumberString) + previousEnteredNumber;
  }

  if (opInMemory === subtraction) {
    savedWorkingNumber = Number(workingNumberString) - previousEnteredNumber;
  }

  if (opInMemory === division) {
    savedWorkingNumber = Number(workingNumberString) / previousEnteredNumber;
  }

  if (opInMemory === multiplication) {
    savedWorkingNumber = Number(workingNumberString) * previousEnteredNumber;
  }

  // Check if multiplying by Infinity or NaN
  if (savedWorkingNumber === NaN || savedWorkingNumber === Infinity) {
    renderScreen("Error");
  } else {
    renderScreen(savedWorkingNumber);
  }
};

const performOperationInMemoryEqualsTo = function (opInMemory) {
  if (opInMemory === addition) {
    savedWorkingNumber = savedWorkingNumber + previousEnteredNumber;
  }

  if (opInMemory === subtraction) {
    savedWorkingNumber = savedWorkingNumber - previousEnteredNumber;
  }

  if (opInMemory === division) {
    savedWorkingNumber = savedWorkingNumber / previousEnteredNumber;
  }

  if (opInMemory === multiplication) {
    savedWorkingNumber = savedWorkingNumber * previousEnteredNumber;
  }

  // Check if multiplying by Infinity or NaN
  if (savedWorkingNumber === NaN || savedWorkingNumber === Infinity) {
    renderScreen("Error");
  } else {
    renderScreen(savedWorkingNumber);
  }
};

const calculator = function (e) {
  pressedButton = e.target; // Registering the pressed button

  // If current pressed button is a number
  if (pressedButton.classList.contains(`${number}`)) {
    buttonClear.textContent = "C";

    operationButtons.forEach((opr) => {
      opr.style.backgroundColor = null;
      opr.style.borderColor = null;
    });

    // If no previous button has been pressed or the previous button pressed was an operation button
    if (
      previousButtonPressed === undefined ||
      previousButtonPressed === operation ||
      previousButtonPressed === inverse ||
      previousButtonPressed === squareRoot ||
      previousButtonPressed === percentage ||
      previousButtonPressed === equalsTo ||
      previousButtonPressed === clear
    ) {
      updateWorkingNumberString("", pressedButton.dataset.number);
      renderScreen(workingNumberString);

      if (pressedButton.dataset.number !== "0") {
        updateWorkingNumberStringDigitCounter();
      }

      previousButtonPressed = number;
    }
    // If previous button pressed was a number
    else if (previousButtonPressed === number) {
      // If working number string is just 0 and pressed number is 0
      if (
        pressedButton.dataset.number === "0" &&
        workingNumberString.length === 1 &&
        workingNumberString.includes("0")
      ) {
        previousButtonPressed = number;
        renderScreen(workingNumberString);
      }
      // If working number string is just 0 but pressed number is not 0
      else if (
        workingNumberString.length === 1 &&
        workingNumberString.includes("0") &&
        pressedButton.dataset.number !== "0"
      ) {
        numberPressed("", pressedButton.dataset.number);
        renderScreen(workingNumberString);

        previousButtonPressed = number;
      }
      // If working number string is a single digit but not 0
      else if (
        workingNumberString.length === 1 &&
        !workingNumberString.includes("0")
      ) {
        numberPressed(workingNumberString, pressedButton.dataset.number);
        renderScreen(workingNumberString);

        previousButtonPressed = number;
      }
      // If number of digits on working number string is less than 9
      else if (workingNumberStringDigitCounter < 9) {
        numberPressed(workingNumberString, pressedButton.dataset.number);
        renderScreen(workingNumberString);

        previousButtonPressed = number;
      } else {
        return;
      }
    }
    // If previous button pressed was the decimal point
    else if (previousButtonPressed === decimalPoint) {
      if (workingNumberStringDigitCounter < 9) {
        numberPressed(workingNumberString, pressedButton.dataset.number);
        renderScreen(workingNumberString);

        previousButtonPressed = number;
      } else {
        return;
      }
    }
    // If previous button pressed was the pos-neg button
    else if (previousButtonPressed === posNeg) {
      if (
        Number(workingNumberString) === 0 &&
        pressedButton.dataset.number !== "0"
      ) {
        updateWorkingNumberString("-", pressedButton.dataset.number);
        renderScreen(workingNumberString);
        previousButtonPressed = number;
        workingNumberStringDigitCounter = 1;
      } else if (workingNumberStringDigitCounter < 9) {
        updateWorkingNumberString(
          workingNumberString,
          pressedButton.dataset.number
        );
        workingNumberStringDigitCounter++;
        previousButtonPressed = number;
        renderScreen(workingNumberString);
      } else {
        return;
      }
    }
  }

  // If pressed button is the decimal point
  if (pressedButton.classList.contains(`${decimalPoint}`)) {
    buttonClear.textContent = "C";

    operationButtons.forEach((opr) => {
      opr.style.backgroundColor = null;
      opr.style.borderColor = null;
    });

    if (!decimalPointActivated) {
      if (
        previousButtonPressed === undefined ||
        previousButtonPressed === operation ||
        previousButtonPressed === inverse ||
        previousButtonPressed === squareRoot ||
        previousButtonPressed === percentage ||
        previousButtonPressed === equalsTo ||
        previousButtonPressed === clear
      ) {
        updateWorkingNumberString("0", ".");
        workingNumberStringDigitCounter = 1;
        previousButtonPressed = decimalPoint;
        decimalPointActivated = true;
        renderScreen(workingNumberString);
      } else if (
        previousButtonPressed === number &&
        workingNumberStringDigitCounter < 9
      ) {
        updateWorkingNumberString(workingNumberString, ".");
        if (Number(workingNumberString) === 0) {
          updateWorkingNumberStringDigitCounter();
        }
        previousButtonPressed = decimalPoint;
        decimalPointActivated = true;
        renderScreen(workingNumberString);
      } else if (previousButtonPressed === posNeg) {
        updateWorkingNumberString(workingNumberString, ".");
        previousButtonPressed = decimalPoint;
        decimalPointActivated = true;
        renderScreen(workingNumberString);
      }
    } else {
      return;
    }
  }

  /////////////////////////////// Operations Starts /////////////////////////////////

  // If pressed button is addition button
  if (pressedButton.classList.contains(`${addition}`)) {
    operationButtons.forEach((opr) => {
      opr.style.backgroundColor = null;
      opr.style.borderColor = null;
    });
    additionButton.style.backgroundColor = selectedBackgroundColor;
    additionButton.style.borderColor = selectedBorderColor;

    // If no button had been pressed previously
    if (
      previousButtonPressed === undefined ||
      previousButtonPressed === clear
    ) {
      savedWorkingNumber = 0;
      previousEnteredNumber = 0;
      workingNumberString = "";
      workingNumberStringDigitCounter = 0;
      previousButtonPressed = operation;
      decimalPointActivated = false;
      operationInMemory = addition;
      renderScreen(savedWorkingNumber);
    }
    // If previous button pressed was a number
    else if (
      previousButtonPressed === number ||
      previousButtonPressed === decimalPoint ||
      previousButtonPressed === posNeg ||
      previousButtonPressed === inverse ||
      previousButtonPressed === squareRoot ||
      previousButtonPressed === percentage
    ) {
      if (!operationInMemory) {
        savedWorkingNumber = Number(workingNumberString);
        previousEnteredNumber = Number(workingNumberString);
        decimalPointActivated = false;
        workingNumberString = "";
        workingNumberStringDigitCounter = 0;
        operationInMemory = addition;
        previousButtonPressed = operation;
        renderScreen(savedWorkingNumber);
      } else {
        performOperationInMemory(operationInMemory);
        previousButtonPressed = operation;
        operationInMemory = addition;
      }
    }
    // If previous button pressed was another operation button
    else if (
      previousButtonPressed === operation ||
      previousButtonPressed === equalsTo
    ) {
      operationInMemory = addition;
    }
  }

  // If pressed button is subtraction button
  if (pressedButton.classList.contains(`${subtraction}`)) {
    operationButtons.forEach((opr) => {
      opr.style.backgroundColor = null;
      opr.style.borderColor = null;
    });
    subtractionButton.style.backgroundColor = selectedBackgroundColor;
    subtractionButton.style.borderColor = selectedBorderColor;

    // If no button had been pressed previously
    if (
      previousButtonPressed === undefined ||
      previousButtonPressed === clear
    ) {
      savedWorkingNumber = 0;
      previousEnteredNumber = 0;
      workingNumberString = "";
      workingNumberStringDigitCounter = 0;
      previousButtonPressed = operation;
      decimalPointActivated = false;
      operationInMemory = subtraction;
      renderScreen(savedWorkingNumber);
    }
    // If previous button pressed was a number
    else if (
      previousButtonPressed === number ||
      previousButtonPressed === decimalPoint ||
      previousButtonPressed === posNeg ||
      previousButtonPressed === inverse ||
      previousButtonPressed === squareRoot ||
      previousButtonPressed === percentage
    ) {
      if (!operationInMemory) {
        savedWorkingNumber = Number(workingNumberString);
        previousEnteredNumber = Number(workingNumberString);
        decimalPointActivated = false;
        workingNumberString = "";
        workingNumberStringDigitCounter = 0;
        operationInMemory = subtraction;
        previousButtonPressed = operation;
        renderScreen(savedWorkingNumber);
      } else {
        performOperationInMemory(operationInMemory);
        previousButtonPressed = operation;
        operationInMemory = subtraction;
      }
    }
    // If previous button pressed was another operation button
    else if (
      previousButtonPressed === operation ||
      previousButtonPressed === equalsTo
    ) {
      operationInMemory = subtraction;
    }
  }

  // If pressed button is division button
  if (pressedButton.classList.contains(`${division}`)) {
    operationButtons.forEach((opr) => {
      opr.style.backgroundColor = null;
      opr.style.borderColor = null;
    });
    divisionButton.style.backgroundColor = selectedBackgroundColor;
    divisionButton.style.borderColor = selectedBorderColor;

    // If no button had been pressed previously
    if (
      previousButtonPressed === undefined ||
      previousButtonPressed === clear
    ) {
      savedWorkingNumber = 0;
      previousEnteredNumber = 0;
      workingNumberString = "";
      workingNumberStringDigitCounter = 0;
      previousButtonPressed = operation;
      decimalPointActivated = false;
      operationInMemory = division;
      renderScreen(savedWorkingNumber);
    }
    // If previous button pressed was a number
    else if (
      previousButtonPressed === number ||
      previousButtonPressed === decimalPoint ||
      previousButtonPressed === posNeg ||
      previousButtonPressed === inverse ||
      previousButtonPressed === squareRoot ||
      previousButtonPressed === percentage
    ) {
      if (!operationInMemory) {
        savedWorkingNumber = Number(workingNumberString);
        previousEnteredNumber = Number(workingNumberString);
        decimalPointActivated = false;
        workingNumberString = "";
        workingNumberStringDigitCounter = 0;
        operationInMemory = division;
        previousButtonPressed = operation;
        renderScreen(savedWorkingNumber);
      } else {
        performOperationInMemory(operationInMemory);
        previousButtonPressed = operation;
        operationInMemory = division;
      }
    }
    // If previous button pressed was another operation button
    else if (
      previousButtonPressed === operation ||
      previousButtonPressed === equalsTo
    ) {
      operationInMemory = division;
    }
  }

  // If pressed button is multiplication button
  if (pressedButton.classList.contains(`${multiplication}`)) {
    operationButtons.forEach((opr) => {
      opr.style.backgroundColor = null;
      opr.style.borderColor = null;
    });
    multiplicationButton.style.backgroundColor = selectedBackgroundColor;
    multiplicationButton.style.borderColor = selectedBorderColor;

    // If no button had been pressed previously
    if (
      previousButtonPressed === undefined ||
      previousButtonPressed === clear
    ) {
      savedWorkingNumber = 0;
      previousEnteredNumber = 0;
      workingNumberString = "";
      workingNumberStringDigitCounter = 0;
      previousButtonPressed = operation;
      decimalPointActivated = false;
      operationInMemory = multiplication;
      renderScreen(savedWorkingNumber);
    }
    // If previous button pressed was a number
    else if (
      previousButtonPressed === number ||
      previousButtonPressed === decimalPoint ||
      previousButtonPressed === posNeg ||
      previousButtonPressed === inverse ||
      previousButtonPressed === squareRoot ||
      previousButtonPressed === percentage
    ) {
      if (!operationInMemory) {
        savedWorkingNumber = Number(workingNumberString);
        previousEnteredNumber = Number(workingNumberString);
        decimalPointActivated = false;
        workingNumberString = "";
        workingNumberStringDigitCounter = 0;
        operationInMemory = multiplication;
        previousButtonPressed = operation;
        renderScreen(savedWorkingNumber);
      } else {
        performOperationInMemory(operationInMemory);
        previousButtonPressed = operation;
        operationInMemory = multiplication;
      }
    }
    // If previous button pressed was another operation button
    else if (
      previousButtonPressed === operation ||
      previousButtonPressed === equalsTo
    ) {
      operationInMemory = multiplication;
    }
  }

  /////////////////////////////// Operations Ends /////////////////////////////////

  // If pressed button is pos-neg button
  if (pressedButton.classList.contains(`${posNeg}`)) {
    operationButtons.forEach((opr) => {
      opr.style.backgroundColor = null;
      opr.style.borderColor = null;
    });

    if (
      previousButtonPressed === undefined ||
      previousButtonPressed === squareRoot ||
      previousButtonPressed === clear
    ) {
      updateWorkingNumberString("-", "0");
      previousButtonPressed = posNeg;
      renderScreen(workingNumberString);
    } else if (previousButtonPressed === decimalPoint) {
      updateWorkingNumberString(String(-1 * Number(workingNumberString)), ".");
      previousButtonPressed = posNeg;
      renderScreen(workingNumberString);
    } else if (previousButtonPressed === operation) {
      updateWorkingNumberString("-", "0");
      previousButtonPressed = posNeg;
      renderScreen(workingNumberString);
    } else if (
      previousButtonPressed === number ||
      previousButtonPressed === inverse ||
      previousButtonPressed === percentage
    ) {
      workingNumberString = String(-1 * Number(workingNumberString));
      previousButtonPressed = posNeg;
      renderScreen(workingNumberString);
    } else if (previousButtonPressed === posNeg) {
      if (workingNumberString[workingNumberString.length - 1] === ".") {
        updateWorkingNumberString(
          String(-1 * Number(workingNumberString)),
          "."
        );
        renderScreen(workingNumberString);
        previousButtonPressed = posNeg;
      } else {
        updateWorkingNumberString(String(-1 * Number(workingNumberString)), "");
        renderScreen(workingNumberString);
        previousButtonPressed = posNeg;
      }
    } else if (previousButtonPressed === equalsTo) {
      updateWorkingNumberString(String(-1 * Number(savedWorkingNumber)), "");
      renderScreen(workingNumberString);
      previousButtonPressed = posNeg;
    }
  }

  // If pressed button is inverse button
  if (pressedButton.classList.contains(`${inverse}`)) {
    if (previousButtonPressed === undefined) {
      savedWorkingNumber = 0;
      previousEnteredNumber = 0;
      renderScreen("Error");
      previousButtonPressed = inverse;
      workingNumberString = "0";
    } else if (previousButtonPressed === operation) {
      if (savedWorkingNumber === 0) {
        renderScreen("Error");
        previousButtonPressed = inverse;
        workingNumberString = "0";
        // previousEnteredNumber = 0;
      } else {
        workingNumberString = String(1 / savedWorkingNumber);
        renderScreen(workingNumberString);
        previousButtonPressed = inverse;
      }
    } else if (
      previousButtonPressed === number ||
      previousButtonPressed === posNeg ||
      previousButtonPressed === inverse ||
      previousButtonPressed === decimalPoint ||
      previousButtonPressed === squareRoot ||
      previousButtonPressed === percentage
    ) {
      if (Number(workingNumberString) === 0) {
        renderScreen("Error");
        previousButtonPressed = inverse;
        workingNumberString = "0";
        // previousEnteredNumber = 0;
      } else {
        workingNumberString = String(1 / Number(workingNumberString));
        renderScreen(workingNumberString);
        previousButtonPressed = inverse;
      }
    } else if (previousButtonPressed === equalsTo) {
      workingNumberString = String(1 / Number(savedWorkingNumber));
      previousButtonPressed = inverse;
    } else if (previousButtonPressed === clear) {
      workingNumberString = "0";
      renderScreen("Error");
      previousButtonPressed = inverse;
    }
    decimalPointActivated = false;
  }

  // If pressed button is square root button
  if (pressedButton.classList.contains(`${squareRoot}`)) {
    if (
      previousButtonPressed === undefined ||
      previousButtonPressed === clear
    ) {
      workingNumberString = "0";
      renderScreen(workingNumberString);
      previousButtonPressed = squareRoot;
    } else if (
      previousButtonPressed === decimalPoint ||
      previousButtonPressed === number ||
      previousButtonPressed === posNeg ||
      previousButtonPressed === inverse ||
      previousButtonPressed === squareRoot ||
      previousButtonPressed === percentage
    ) {
      if (Number(workingNumberString) < 0) {
        previousEnteredNumber = Number(workingNumberString);
        renderScreen("Error");
        previousButtonPressed = squareRoot;
        workingNumberString = "0";
      } else {
        workingNumberString = String(Math.sqrt(Number(workingNumberString)));
        renderScreen(workingNumberString);
        previousButtonPressed = squareRoot;
      }
    } else if (previousButtonPressed === operation) {
      if (savedWorkingNumber < 0) {
        renderScreen("Error");
        previousButtonPressed = squareRoot;
        workingNumberString = "0";
        previousEnteredNumber = savedWorkingNumber;
      } else {
        workingNumberString = String(1 / savedWorkingNumber);
        renderScreen(workingNumberString);
        previousButtonPressed = squareRoot;
      }
    } else if (previousButtonPressed === equalsTo) {
      workingNumberString = String(Math.sqrt(Number(savedWorkingNumber)));
      renderScreen(workingNumberString);
      previousButtonPressed = squareRoot;
    }
    decimalPointActivated = false;
  }

  // If pressed button is percentage
  if (pressedButton.classList.contains(`${percentage}`)) {
    if (
      previousButtonPressed === undefined ||
      previousButtonPressed === clear
    ) {
      workingNumberString = "0";
      renderScreen(workingNumberString);
      previousButtonPressed = percentage;
    } else if (
      previousButtonPressed === decimalPoint ||
      previousButtonPressed === number ||
      previousButtonPressed === posNeg
    ) {
      workingNumberString = String(Number(workingNumberString) / 100);
      renderScreen(workingNumberString);
      previousButtonPressed = percentage;
    } else if (previousButtonPressed === operation) {
      if (savedWorkingNumber === NaN || savedWorkingNumber === Infinity) {
        renderScreen("Error");
        workingNumberString = "0";
        previousButtonPressed = percentage;
      } else {
        workingNumberString = String(Number(savedWorkingNumber) / 100);
        previousButtonPressed = percentage;
        renderScreen(workingNumberString);
      }
    } else if (
      previousButtonPressed === inverse ||
      previousButtonPressed === squareRoot
    ) {
      if (Number(workingNumberString) === 0) {
        previousButtonPressed = percentage;
        renderScreen(workingNumberString);
      } else {
        workingNumberString = String(Number(savedWorkingNumber) / 100);
        previousButtonPressed = percentage;
        renderScreen(workingNumberString);
      }
    } else if (previousButtonPressed === percentage) {
      if (savedWorkingNumber === NaN || savedWorkingNumber === Infinity) {
        renderScreen("Error");
        previousButtonPressed = percentage;
        workingNumberString = "0";
      } else {
        workingNumberString = String(Number(savedWorkingNumber) / 100);
        renderScreen(workingNumberString);
        previousButtonPressed = percentage;
      }
    } else if (previousButtonPressed === equalsTo) {
      workingNumberString = String(Number(savedWorkingNumber) / 100);
      previousButtonPressed = percentage;
      renderScreen(workingNumberString);
    }
    decimalPointActivated = false;
  }

  // If pressed button is equals to
  if (pressedButton.classList.contains(`${equalsTo}`)) {
    operationButtons.forEach((opr) => {
      opr.style.backgroundColor = null;
      opr.style.borderColor = null;
    });

    if (previousButtonPressed === undefined) {
      savedWorkingNumber = 0;
      previousEnteredNumber = 0;
      previousButtonPressed = equalsTo;
    } else if (
      previousButtonPressed === decimalPoint ||
      previousButtonPressed === number ||
      previousButtonPressed === inverse ||
      previousButtonPressed === squareRoot ||
      previousButtonPressed === percentage
    ) {
      if (!operationInMemory) {
        savedWorkingNumber = Number(workingNumberString);
        previousEnteredNumber = Number(workingNumberString);
        renderScreen(savedWorkingNumber);
        previousButtonPressed = equalsTo;
      } else {
        performOperationInMemory(operationInMemory);
        previousButtonPressed = equalsTo;
      }
    } else if (previousButtonPressed === operation) {
      previousEnteredNumber = savedWorkingNumber;
      performOperationInMemoryEqualsTo(operationInMemory);
      previousButtonPressed = equalsTo;
    } else if (previousButtonPressed === posNeg) {
      if (operationInMemory) {
        performOperationInMemoryPosNegEqualsTo(operationInMemory);
        previousButtonPressed = equalsTo;
      } else {
        savedWorkingNumber = Number(workingNumberString);
        renderScreen(savedWorkingNumber);
        previousButtonPressed = equalsTo;
      }
    } else if (previousButtonPressed === equalsTo) {
      if (operationInMemory) {
        performOperationInMemoryEqualsTo(operationInMemory);
        previousButtonPressed = equalsTo;
      } else {
        renderScreen(savedWorkingNumber);
        previousButtonPressed = equalsTo;
      }
    } else if (previousButtonPressed === clear) {
      previousEnteredNumber = 0;
      renderScreen(savedWorkingNumber);
      previousButtonPressed = equalsTo;
    }
    decimalPointActivated = false;
  }

  // If pressed button is clear button
  if (pressedButton.classList.contains(`${clear}`)) {
    if (previousButtonPressed === undefined) {
      return;
    } else if (
      previousButtonPressed === operation ||
      previousButtonPressed === decimalPoint ||
      previousButtonPressed === number ||
      previousButtonPressed === posNeg ||
      previousButtonPressed === inverse ||
      previousButtonPressed === squareRoot ||
      previousButtonPressed === percentage ||
      previousButtonPressed === equalsTo
    ) {
      buttonClear.textContent = "CE";

      workingNumberString = "";
      renderScreen("0");
      if (
        operationInMemory &&
        (previousButtonPressed === operation ||
          previousButtonPressed === decimalPoint ||
          previousButtonPressed === number ||
          previousButtonPressed === inverse ||
          previousButtonPressed === squareRoot ||
          previousButtonPressed === percentage)
      ) {
        operationButtons.forEach((opr) => {
          opr.style.backgroundColor = null;
          opr.style.borderColor = null;
        });

        document.querySelector(`.${operationInMemory}`).style.backgroundColor =
          selectedBackgroundColor;
        document.querySelector(`.${operationInMemory}`).style.borderColor =
          selectedBorderColor;
      }

      if (previousButtonPressed === posNeg) {
        document.querySelector(".pos-neg").style.backgroundColor =
          selectedBackgroundColor;
        document.querySelector(".pos-neg").style.borderColor =
          selectedBorderColor;
      }

      if (savedWorkingNumber === undefined) {
        savedWorkingNumber = 0;
      }

      decimalPointActivated = false;
      previousButtonPressed = clear;
    } else if (previousButtonPressed === clear) {
      previousButtonPressed = undefined;
      workingNumberString = "";
      workingNumberString = 0;
      savedWorkingNumber = undefined;
      previousEnteredNumber = undefined;
      decimalPointActivated = false;
      operationInMemory = undefined;

      operationButtons.forEach((opr) => {
        opr.style.backgroundColor = null;
        opr.style.borderColor = null;
      });

      document.querySelector(".pos-neg").style.backgroundColor = null;
      document.querySelector(".pos-neg").style.borderColor = null;
    }
  }
};

buttonsArea.addEventListener("click", calculator);
