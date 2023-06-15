"use strict";

const screen = document.querySelector(".screen");
const buttonsArea = document.querySelector(".buttons");
const buttonClear = document.querySelector(".button-clear");
const selectedBackgroundColor = "#fee48f";
const selectedBorderColor = "#b18907";
// screen.textContent = "";

let workingNumberString = "0"; // To be updated when the user is done entering the number
let workingNumberStringDigitCounter = 0; // To make sure that the entered number has no greater than 9 digits in total
let decimalPointActivated = false; // To be updated when decimal point has been input
let operationActivated = false; // To be updated to true when operation button has been pressed
let additionCounter = 0; // To be updated when addition button is pressed
let subtractionCounter = 0; // To be updated when subtraction button is pressed
let divisionCounter = 0; // To be updated when division button is pressed
let multiplicationCounter = 0; // To be updated when multiplication button is pressed
let savedWorkingNumber; // Number to be updated as one of the 4 main operations is pressed
let previousEnteredNumber; // Last number to be entered
let previousButtonPressed; // Last button to be pressed, either operation or number

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

const calculator = function (e) {
  const pressedButton = e.target; // Registering the pressed button

  // If pressed button is a number
  if (pressedButton.classList.contains("number")) {
    // Change the CE button to C
    buttonClear.textContent = "C";

    // If previous button was inverse
    if (previousButtonPressed === "inverse") {
      workingNumberString = "0";
    }

    // Previous pressed button is now number
    previousButtonPressed = "number";

    // If pressed number is a 0 and the working number is 0
    if (
      pressedButton.dataset.number === "0" &&
      workingNumberString.length === 1 &&
      workingNumberString.includes("0")
    ) {
      // If an operation is currently active;
      if (operationActivated) {
        renderScreen(workingNumberString);
      }
    }
    // If pressed number is not a 0 but the working number is 0
    else if (
      workingNumberString.length === 1 &&
      workingNumberString.includes("0") &&
      pressedButton.dataset.number !== "0"
    ) {
      numberPressed("", pressedButton.dataset.number);
      renderScreen(workingNumberString);
    }
    // If working number is a single digit but not 0
    else if (
      workingNumberString.length === 1 &&
      !workingNumberString.includes("0")
    ) {
      numberPressed(workingNumberString, pressedButton.dataset.number);
      renderScreen(workingNumberString);
    }
    // The maximum number of digits a number should have is 9 digits
    else if (workingNumberStringDigitCounter < 9) {
      numberPressed(workingNumberString, pressedButton.dataset.number);
      renderScreen(workingNumberString);
    } else {
      return;
    }
  }

  // If pressed button is the decimal point
  if (pressedButton.classList.contains("decimal-point")) {
    // If previous button was inverse
    if (previousButtonPressed === "inverse") {
      workingNumberString === "0";
    }

    // Previous pressed button is now number
    previousButtonPressed = "number";

    if (!decimalPointActivated) {
      decimalPointActivated = true;
      if (
        workingNumberString.length === 1 &&
        workingNumberString.includes("0")
      ) {
        numberPressed(workingNumberString, ".");
        renderScreen(workingNumberString);
      } else {
        updateWorkingNumberString(workingNumberString, ".");
        renderScreen(workingNumberString);
      }
    }
  }

  // If pressed button is addition button
  if (pressedButton.classList.contains("addition")) {
    // If no operation button has been pressed yet in this round of calculations
    if (!operationActivated) {
      savedWorkingNumber = Number(workingNumberString);
      previousEnteredNumber = Number(workingNumberString);
      console.log(`Previous entered number is: ${previousEnteredNumber}`);
      workingNumberString = "0";
      operationActivated = true;
    }
    // If an operation button has been pressed already in this round of calculations
    else {
      savedWorkingNumber += Number(workingNumberString);
      previousEnteredNumber = Number(workingNumberString);
      console.log(`Previous entered number is: ${previousEnteredNumber}`);
      workingNumberString = "0";
      renderScreen(savedWorkingNumber);
    }
    // Increasing addition counter
    additionCounter++;

    // Updating the last button that was pressed;
    previousButtonPressed = "operation";
  }

  // If pressed button is subtraction button
  if (pressedButton.classList.contains("subtraction")) {
    // If no operation button has been pressed yet in this round of calculations
    if (!operationActivated) {
      savedWorkingNumber = Number(workingNumberString);
      previousEnteredNumber = Number(workingNumberString);
      console.log(`Previous entered number is: ${previousEnteredNumber}`);
      workingNumberString = "0";
      operationActivated = true;
    }
    // If an operation button has been pressed already in this round of calculations
    else {
      savedWorkingNumber -= Number(workingNumberString);
      previousEnteredNumber = Number(workingNumberString);
      console.log(`Previous entered number is: ${previousEnteredNumber}`);
      workingNumberString = "0";
      renderScreen(savedWorkingNumber);
    }
    // Increasing subtraction counter
    subtractionCounter++;

    // Updating the last button that was pressed;
    previousButtonPressed = "operation";
  }

  // If pressed button is division button
  if (pressedButton.classList.contains("division")) {
    // If no operation button has been pressed yet in this round of calculations
    if (!operationActivated) {
      savedWorkingNumber = Number(workingNumberString);
      previousEnteredNumber = Number(workingNumberString);
      console.log(`Previous entered number is: ${previousEnteredNumber}`);
      console.log(`Saved working number is: ${savedWorkingNumber}`);
      workingNumberString = "0";
      operationActivated = true;
    }
    // If an operation button has been pressed already in this round of calculations
    else {
      savedWorkingNumber = savedWorkingNumber / Number(workingNumberString);
      previousEnteredNumber = Number(workingNumberString);
      workingNumberString = "0";
      console.log(`Previous entered number is: ${previousEnteredNumber}`);
      console.log(`Saved working number is: ${savedWorkingNumber}`);

      // Check if dividing by zero
      if (savedWorkingNumber === NaN || savedWorkingNumber === Infinity) {
        renderScreen("Error");
      } else {
        renderScreen(savedWorkingNumber);
      }
    }
    // Increasing division counter
    divisionCounter++;

    // Updating the last button that was pressed;
    previousButtonPressed = "operation";
  }

  // If pressed button is multiplication button
  if (pressedButton.classList.contains("multiplication")) {
    // If no operation button has been pressed yet in this round of calculations
    if (!operationActivated) {
      savedWorkingNumber = Number(workingNumberString);
      previousEnteredNumber = Number(workingNumberString);
      console.log(`Previous entered number is: ${previousEnteredNumber}`);
      console.log(`Saved working number is: ${savedWorkingNumber}`);
      workingNumberString = "0";
      operationActivated = true;
    }
    // If an operation button has been pressed already in this round of calculations
    else {
      savedWorkingNumber = savedWorkingNumber * Number(workingNumberString);
      previousEnteredNumber = Number(workingNumberString);
      workingNumberString = "0";
      console.log(`Previous entered number is: ${previousEnteredNumber}`);
      console.log(`Saved working number is: ${savedWorkingNumber}`);

      // Check if multiplying by Infinity or NaN
      if (savedWorkingNumber === NaN || savedWorkingNumber === Infinity) {
        renderScreen("Error");
      } else {
        renderScreen(savedWorkingNumber);
      }
    }
    // Increasing multiplication counter
    multiplicationCounter++;

    // Updating the last button that was pressed;
    previousButtonPressed = "operation";
  }

  // If pressed button is '+/-' button
  if (pressedButton.classList.contains("pos-neg")) {
    // updateWorkingNumberString("-", workingNumberString);
    workingNumberString = String(-1 * Number(workingNumberString));
    renderScreen(workingNumberString);
  }
};

buttonsArea.addEventListener("click", calculator);
