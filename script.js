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
let workingNumbersArray = []; // To compile working numbers

// Function to update working number string by adding characters to it
const updateWorkingNumberString = function (adder) {
  workingNumberString += adder;
};

// Function to update the number string digit counter
const updateWorkingNumberStringDigitCounter = function () {
  workingNumberStringDigitCounter++;
};

// Function to render number on screen
const renderScreen = function (number) {
  screen.textContent = number;
};

const calculator = function (e) {
  const pressedButton = e.target; // Registering the pressed button

  // If pressed button is the decimal point
  if (pressedButton.classList.contains("decimal-point")) {
    if (!decimalPointActivated) {
      decimalPointActivated = true;
      if (
        workingNumberString.length === 1 &&
        workingNumberString.includes("0")
      ) {
        updateWorkingNumberString(".");
        updateWorkingNumberStringDigitCounter();
        renderScreen(workingNumberString);
      } else {
        updateWorkingNumberString(".");
        renderScreen(workingNumberString);
      }
    }
  }

  // If pressed button is a number
  if (pressedButton.classList.contains("number")) {
    // Change the CE button to C
    buttonClear.textContent = "C";

    // If pressed number is a 0 and the working number is 0
    if (
      pressedButton.dataset.number === "0" &&
      workingNumberString.length === 1 &&
      workingNumberString.includes("0")
    ) {
      return;
    }
    // If pressed number is not a 0 but the working number is 0
    else if (
      workingNumberString.length === 1 &&
      workingNumberString.includes("0") &&
      pressedButton.dataset.number !== "0"
    ) {
      workingNumberString = pressedButton.dataset.number;
      updateWorkingNumberStringDigitCounter();
      renderScreen(workingNumberString);
    }
    // If working number is a single digit but not 0
    else if (
      workingNumberString.length === 1 &&
      !workingNumberString.includes("0")
    ) {
      updateWorkingNumberString(pressedButton.dataset.number);
      updateWorkingNumberStringDigitCounter();
      renderScreen(workingNumberString);
    }
    // The maximum number of digits a number should have is 9 digits
    else if (workingNumberStringDigitCounter < 9) {
      updateWorkingNumberString(pressedButton.dataset.number);
      updateWorkingNumberStringDigitCounter();
      renderScreen(workingNumberString);
    } else {
      return;
    }
  }
};

buttonsArea.addEventListener("click", calculator);
