"use strict";

const screen = document.querySelector(".screen");
const buttonsArea = document.querySelector(".buttons");
const buttonClear = document.querySelector(".button-clear");
const selectedBackgroundColor = "#fee48f";
const selectedBorderColor = "#b18907";
// screen.textContent = "";

let workingNumberString = "0"; // To be updated when the user is done entering the number
let workingNumberStringDigitCounter = 0; // To make sure that the entered number has no greater than 9 digits in total
let decimalInNumber = false; // To be updated when decimal number has been inputed
let workingNumbersArray = []; // To compile working numbers

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
    )
      return;
    // If pressed number is not a 0 but the working number is 0
    else if (
      workingNumberString.length === 1 &&
      workingNumberString.includes("0") &&
      pressedButton.dataset.number !== "0"
    ) {
      workingNumberString = pressedButton.dataset.number;
      workingNumberStringDigitCounter++;
      screen.textContent = workingNumberString;
    }
    // If working number is a single digit but not 0
    else if (
      workingNumberString.length === 1 &&
      !workingNumberString.includes("0")
    ) {
      workingNumberString += pressedButton.dataset.number;
      workingNumberStringDigitCounter++;
      screen.textContent = workingNumberString;
    }
    // The maximum number of digits a number should have is 9 digits
    else if (workingNumberStringDigitCounter < 9) {
      workingNumberString += pressedButton.dataset.number;
      workingNumberStringDigitCounter++;
      screen.textContent = workingNumberString;
    } else {
      return;
    }
  }
};

buttonsArea.addEventListener("click", calculator);
