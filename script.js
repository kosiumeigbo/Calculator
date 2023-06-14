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
let operationActivated = false;
// let workingNumbersArray = []; // To compile working numbers
let additionCounter = 0; // To be updated when addition button is pressed
let subtractionCounter = 0; // To be updated when subtraction button is pressed
let divisionCounter = 0; // To be updated when division button is pressed
let multiplicationCounter = 0; // To be updated when multiplication button is pressed
let savedWorkingNumber; // Number to be updated as one of the 4 main operations is pressed
let previousEnteredNumber; // Last number to be entered

// Function to update working number string by adding characters to it
const updateWorkingNumberString = function (adder1, adder2) {
  workingNumberString = adder1 + adder2;
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
const numberPressed = function (adder1, adder2) {
  updateWorkingNumberString(adder1, adder2);
  updateWorkingNumberStringDigitCounter();
};

const calculator = function (e) {
  const pressedButton = e.target; // Registering the pressed button

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
    // If addition hasn't been pressed yet in this round of calculations
    if (additionCounter === 0 && !operationActivated) {
      savedWorkingNumber = Number(workingNumberString);
      previousEnteredNumber = Number(workingNumberString);
      console.log(`Previous entered number is: ${previousEnteredNumber}`);
      workingNumberString = "0";
      additionCounter++;
      operationActivated = true;
    }
    // If addition button has been pressed already
    else {
      savedWorkingNumber += Number(workingNumberString);
      previousEnteredNumber = Number(workingNumberString);
      console.log(`Previous entered number is: ${previousEnteredNumber}`);
      workingNumberString = "0";
      additionCounter++;
      renderScreen(savedWorkingNumber);
    }
  }
};

buttonsArea.addEventListener("click", calculator);
