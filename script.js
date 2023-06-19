"use strict";

const screen = document.querySelector(".screen");
const buttonsArea = document.querySelector(".buttons");
const buttonClear = document.querySelector(".button-clear");
const selectedBackgroundColor = "#fee48f";
const selectedBorderColor = "#b18907";
const buttons = [
  undefined,
  "number✅",
  "decimal-point✅",
  "operation (addition✅, subtraction✅, division✅, multiplication✅)",
  "pos-neg",
  "inverse",
  "square-root",
  "percentage",
  "equals-to",
  "clear",
];

let pressedButton;
let workingNumberString = ""; // To be updated when the user is done entering the number
let workingNumberStringDigitCounter = 0; // To make sure that the entered number has no greater than 9 digits in total
let decimalPointActivated = false; // To be updated when decimal point has been input
// let operationActivated = false; // To be updated to true when operation button has been pressed
let additionCounter = 0; // To be updated when addition button is pressed
let subtractionCounter = 0; // To be updated when subtraction button is pressed
let divisionCounter = 0; // To be updated when division button is pressed
let multiplicationCounter = 0; // To be updated when multiplication button is pressed
let savedWorkingNumber; // Number to be updated as one of the 4 main operations is pressed
let previousEnteredNumber; // Last number to be entered
let previousButtonPressed; // Last button to be pressed, either operation or number
let operationInMemory; // Last operation button pressed, either addition, subtraction, division or multiplication

// Function to update working number string by adding characters to it
const updateWorkingNumberString = function (rootString, adder) {
  workingNumberString = rootString + adder;
};

// Function to update the number string digit counter
const updateWorkingNumberStringDigitCounter = function () {
  workingNumberStringDigitCounter++;
};

// Function to render a number on screen
const renderScreen = function (number) {
  screen.textContent = number;
};

// Function combining updateWorkingNumberString and updateWorkingNumberStringDigitCounter
const numberPressed = function (rootString, adder) {
  updateWorkingNumberString(rootString, adder);
  updateWorkingNumberStringDigitCounter();
};

const performOperationInMemory = function (opInMemory) {
  if (opInMemory === "addition") {
    savedWorkingNumber += Number(workingNumberString);
    previousEnteredNumber = Number(workingNumberString);
    workingNumberString = "";
    workingNumberStringDigitCounter = 0;
    decimalPointActivated = false;
    console.log(`Previous entered number is: ${previousEnteredNumber}`);
    console.log(`Saved working number is: ${savedWorkingNumber}`);
  }

  if (opInMemory === "subtraction") {
    savedWorkingNumber -= Number(workingNumberString);
    previousEnteredNumber = Number(workingNumberString);
    workingNumberString = "";
    workingNumberStringDigitCounter = 0;
    decimalPointActivated = false;
    console.log(`Previous entered number is: ${previousEnteredNumber}`);
    console.log(`Saved working number is: ${savedWorkingNumber}`);
  }

  if (opInMemory === "division") {
    savedWorkingNumber = savedWorkingNumber / Number(workingNumberString);
    previousEnteredNumber = Number(workingNumberString);
    workingNumberString = "";
    workingNumberStringDigitCounter = 0;
    decimalPointActivated = false;
    console.log(`Previous entered number is: ${previousEnteredNumber}`);
    console.log(`Saved working number is: ${savedWorkingNumber}`);
  }

  if (opInMemory === "multiplication") {
    savedWorkingNumber = savedWorkingNumber * Number(workingNumberString);
    previousEnteredNumber = Number(workingNumberString);
    workingNumberString = "";
    workingNumberStringDigitCounter = 0;
    decimalPointActivated = false;
    console.log(`Previous entered number is: ${previousEnteredNumber}`);
    console.log(`Saved working number is: ${savedWorkingNumber}`);
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
  if (pressedButton.classList.contains("number")) {
    // If no previous button has been pressed or the previous button pressed was an operation button
    if (
      previousButtonPressed === undefined ||
      previousButtonPressed === "operation" ||
      previousButtonPressed === "inverse"
    ) {
      updateWorkingNumberString("", pressedButton.dataset.number);
      renderScreen(workingNumberString);

      if (pressedButton.dataset.number !== "0") {
        updateWorkingNumberStringDigitCounter();
      }

      previousButtonPressed = "number";
    }
    // If previous button pressed was a number
    else if (previousButtonPressed === "number") {
      // If working number string is just 0 and pressed number is 0
      if (
        pressedButton.dataset.number === "0" &&
        workingNumberString.length === 1 &&
        workingNumberString.includes("0")
      ) {
        previousButtonPressed = "number";
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

        previousButtonPressed = "number";
      }
      // If working number string is a single digit but not 0
      else if (
        workingNumberString.length === 1 &&
        !workingNumberString.includes("0")
      ) {
        numberPressed(workingNumberString, pressedButton.dataset.number);
        renderScreen(workingNumberString);

        previousButtonPressed = "number";
      }
      // If number of digits on working number string is less than 9
      else if (workingNumberStringDigitCounter < 9) {
        numberPressed(workingNumberString, pressedButton.dataset.number);
        renderScreen(workingNumberString);

        previousButtonPressed = "number";
      } else {
        return;
      }
    }
    // If previous button pressed was the decimal point
    else if (previousButtonPressed === "decimal-point") {
      if (workingNumberStringDigitCounter < 9) {
        numberPressed(workingNumberString, pressedButton.dataset.number);
        renderScreen(workingNumberString);

        previousButtonPressed = "number";
      } else {
        return;
      }
    }
    // If previous button pressed was the pos-neg button
    else if (previousButtonPressed === "pos-neg") {
      if (
        Number(workingNumberString) === 0 &&
        pressedButton.dataset.number !== "0"
      ) {
        updateWorkingNumberString("-", pressedButton.dataset.number);
        renderScreen(workingNumberString);
        previousButtonPressed = "number";
        workingNumberStringDigitCounter = 1;
      } else if (workingNumberStringDigitCounter < 9) {
        updateWorkingNumberString(
          workingNumberString,
          pressedButton.dataset.number
        );
        workingNumberStringDigitCounter++;
        previousButtonPressed = "number";
        renderScreen(workingNumberString);
      } else {
        return;
      }
    }
  }

  // If pressed button is the decimal point
  if (pressedButton.classList.contains("decimal-point")) {
    if (!decimalPointActivated) {
      if (
        previousButtonPressed === undefined ||
        previousButtonPressed === "operation" ||
        previousButtonPressed === "inverse"
      ) {
        updateWorkingNumberString("0", ".");
        workingNumberStringDigitCounter = 1;
        previousButtonPressed = "decimal-point";
        decimalPointActivated = true;
        renderScreen(workingNumberString);
      } else if (
        previousButtonPressed === "number" &&
        workingNumberStringDigitCounter < 9
      ) {
        updateWorkingNumberString(workingNumberString, ".");
        if (Number(workingNumberString) === 0) {
          updateWorkingNumberStringDigitCounter();
        }
        previousButtonPressed = "decimal-point";
        decimalPointActivated = true;
        renderScreen(workingNumberString);
      } else if (previousButtonPressed === "pos-neg") {
        updateWorkingNumberString(workingNumberString, ".");
        previousButtonPressed = "decimal-point";
        decimalPointActivated = true;
        renderScreen(workingNumberString);
      }
    } else {
      return;
    }
  }

  /////////////////////////////// Operations /////////////////////////////////

  // If pressed button is addition button
  if (pressedButton.classList.contains("addition")) {
    // If no button had been pressed previously
    if (previousButtonPressed === undefined) {
      savedWorkingNumber = 0;
      previousEnteredNumber = 0;
      workingNumberString = "";
      workingNumberStringDigitCounter = 0;
      previousButtonPressed = "operation";
      decimalPointActivated = false;
      operationInMemory = "addition";
      renderScreen(savedWorkingNumber);
    }
    // If previous button pressed was a number
    else if (
      previousButtonPressed === "number" ||
      previousButtonPressed === "decimal-point" ||
      previousButtonPressed === "pos-neg" ||
      previousButtonPressed === "inverse"
    ) {
      if (!operationInMemory) {
        savedWorkingNumber = Number(workingNumberString);
        previousEnteredNumber = Number(workingNumberString);
        decimalPointActivated = false;
        workingNumberString = "";
        workingNumberStringDigitCounter = 0;
        operationInMemory = "addition";
        previousButtonPressed = "operation";
        renderScreen(savedWorkingNumber);
      } else {
        performOperationInMemory(operationInMemory);
        previousButtonPressed = "operation";
        operationInMemory = "addition";
      }
    }
    // If previous button pressed was another operation button
    else if (previousButtonPressed === "operation") {
      operationInMemory = "addition";
    }
  }

  // If pressed button is subtraction button
  if (pressedButton.classList.contains("subtraction")) {
    // If no button had been pressed previously
    if (previousButtonPressed === undefined) {
      savedWorkingNumber = 0;
      previousEnteredNumber = 0;
      workingNumberString = "";
      workingNumberStringDigitCounter = 0;
      previousButtonPressed = "operation";
      decimalPointActivated = false;
      operationInMemory = "subtraction";
      renderScreen(savedWorkingNumber);
    }
    // If previous button pressed was a number
    else if (
      previousButtonPressed === "number" ||
      previousButtonPressed === "decimal-point" ||
      previousButtonPressed === "pos-neg" ||
      previousButtonPressed === "inverse"
    ) {
      if (!operationInMemory) {
        savedWorkingNumber = Number(workingNumberString);
        previousEnteredNumber = Number(workingNumberString);
        decimalPointActivated = false;
        workingNumberString = "";
        workingNumberStringDigitCounter = 0;
        operationInMemory = "subtraction";
        previousButtonPressed = "operation";
        renderScreen(savedWorkingNumber);
      } else {
        performOperationInMemory(operationInMemory);
        previousButtonPressed = "operation";
        operationInMemory = "subtraction";
      }
    }
    // If previous button pressed was another operation button
    else if (previousButtonPressed === "operation") {
      operationInMemory = "subtraction";
    }
  }

  // If pressed button is division button
  if (pressedButton.classList.contains("division")) {
    // If no button had been pressed previously
    if (previousButtonPressed === undefined) {
      savedWorkingNumber = 0;
      previousEnteredNumber = 0;
      workingNumberString = "";
      workingNumberStringDigitCounter = 0;
      previousButtonPressed = "operation";
      decimalPointActivated = false;
      operationInMemory = "division";
      renderScreen(savedWorkingNumber);
    }
    // If previous button pressed was a number
    else if (
      previousButtonPressed === "number" ||
      previousButtonPressed === "decimal-point" ||
      previousButtonPressed === "pos-neg" ||
      previousButtonPressed === "inverse"
    ) {
      if (!operationInMemory) {
        savedWorkingNumber = Number(workingNumberString);
        previousEnteredNumber = Number(workingNumberString);
        decimalPointActivated = false;
        workingNumberString = "";
        workingNumberStringDigitCounter = 0;
        operationInMemory = "division";
        previousButtonPressed = "operation";
        renderScreen(savedWorkingNumber);
      } else {
        performOperationInMemory(operationInMemory);
        previousButtonPressed = "operation";
        operationInMemory = "division";
      }
    }
    // If previous button pressed was another operation button
    else if (previousButtonPressed === "operation") {
      operationInMemory = "division";
    }
  }

  // If pressed button is multiplication button
  if (pressedButton.classList.contains("multiplication")) {
    // If no button had been pressed previously
    if (previousButtonPressed === undefined) {
      savedWorkingNumber = 0;
      previousEnteredNumber = 0;
      workingNumberString = "";
      workingNumberStringDigitCounter = 0;
      previousButtonPressed = "operation";
      decimalPointActivated = false;
      operationInMemory = "multiplication";
      renderScreen(savedWorkingNumber);
    }
    // If previous button pressed was a number
    else if (
      previousButtonPressed === "number" ||
      previousButtonPressed === "decimal-point" ||
      previousButtonPressed === "pos-neg" ||
      previousButtonPressed === "inverse"
    ) {
      if (!operationInMemory) {
        savedWorkingNumber = Number(workingNumberString);
        previousEnteredNumber = Number(workingNumberString);
        decimalPointActivated = false;
        workingNumberString = "";
        workingNumberStringDigitCounter = 0;
        operationInMemory = "multiplication";
        previousButtonPressed = "operation";
        renderScreen(savedWorkingNumber);
      } else {
        performOperationInMemory(operationInMemory);
        previousButtonPressed = "operation";
        operationInMemory = "multiplication";
      }
    }
    // If previous button pressed was another operation button
    else if (previousButtonPressed === "operation") {
      operationInMemory = "multiplication";
    }
  }

  // If pressed button is pos-neg button
  if (pressedButton.classList.contains("pos-neg")) {
    if (previousButtonPressed === undefined) {
      updateWorkingNumberString("-", "0");
      previousButtonPressed = "pos-neg";
      renderScreen(workingNumberString);
    } else if (previousButtonPressed === "decimal-point") {
      updateWorkingNumberString(String(-1 * Number(workingNumberString)), ".");
      previousButtonPressed = "pos-neg";
      renderScreen(workingNumberString);
    } else if (previousButtonPressed === "operation") {
      updateWorkingNumberString("-", "0");
      previousButtonPressed = "pos-neg";
      renderScreen(workingNumberString);
    } else if (
      previousButtonPressed === "number" ||
      previousButtonPressed === "inverse"
    ) {
      workingNumberString = String(-1 * Number(workingNumberString));
      previousButtonPressed = "pos-neg";
      renderScreen(workingNumberString);
    } else if (previousButtonPressed === "pos-neg") {
      if (workingNumberString[workingNumberString.length - 1] === ".") {
        updateWorkingNumberString(
          String(-1 * Number(workingNumberString)),
          "."
        );
        renderScreen(workingNumberString);
        previousButtonPressed = "pos-neg";
      } else {
        updateWorkingNumberString(String(-1 * Number(workingNumberString)), "");
        renderScreen(workingNumberString);
        previousButtonPressed = "pos-neg";
      }
    }
  }

  // If pressed button is inverse button
  if (pressedButton.classList.contains("inverse")) {
    if (previousButtonPressed === undefined) {
      savedWorkingNumber = 0;
      previousEnteredNumber = 0;
      renderScreen("Error");
      previousButtonPressed = "inverse";
      workingNumberString = "0";
    } else if (previousButtonPressed === "decimal-point") {
      if (Number(workingNumberString) === 0) {
        previousEnteredNumber = 0;
        renderScreen("Error");
        previousButtonPressed = "inverse";
        workingNumberString = "0";
      } else {
        workingNumberString = String(1 / Number(workingNumberString));
        previousEnteredNumber = 0;
        renderScreen(workingNumberString);
        previousButtonPressed = "inverse";
        workingNumberString = "";
      }
    } else if (previousButtonPressed === "operation") {
      if (savedWorkingNumber === 0) {
        renderScreen("Error");
        previousButtonPressed = "inverse";
        workingNumberString = "0";
        previousEnteredNumber = 0;
      } else {
        workingNumberString = String(1 / savedWorkingNumber);
        renderScreen(workingNumberString);
        previousButtonPressed = "inverse";
      }
    } else if (
      previousButtonPressed === "number" ||
      previousButtonPressed === "pos-neg"
    ) {
      if (Number(workingNumberString) === 0) {
        renderScreen("Error");
        previousButtonPressed = "inverse";
        workingNumberString = "0";
        previousEnteredNumber = 0;
      } else {
        workingNumberString = String(1 / Number(workingNumberString));
        renderScreen(workingNumberString);
        previousButtonPressed = "inverse";
      }
    } else if (previousButtonPressed === "inverse") {
      if (Number(workingNumberString) === 0) {
        renderScreen("Error");
        previousButtonPressed = "inverse";
        workingNumberString = "0";
      } else {
        workingNumberString = String(1 / Number(workingNumberString));
        renderScreen(workingNumberString);
        previousButtonPressed = "inverse";
      }
    }
  }

  // If pressed button is square root button
  if (pressedButton.classList.contains("square-root")) {
  }
};

buttonsArea.addEventListener("click", calculator);
