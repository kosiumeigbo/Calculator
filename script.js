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
  "operation (addition✅, subtraction, division, multiplication)",
  "inverse",
  "pos-neg",
  "square-root",
  "percentage",
  "equals-to",
  "clear",
  "memory-clear",
  "memory-recall",
  "memory-add-positive",
  "memory-add-negative",
];

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
  const pressedButton = e.target; // Registering the pressed button

  // If current pressed button is a number
  if (pressedButton.classList.contains("number")) {
    // If no previous button has been pressed or the previous button pressed was an operation button
    if (
      previousButtonPressed === undefined ||
      previousButtonPressed === "operation"
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

    /* -------------------- Old Number Button Code Start -------------------- */
    /* 
    // Change the CE button to C
    buttonClear.textContent = "C";

    // If previous button was inverse
    if (previousButtonPressed === "inverse") {
      workingNumberString = pressedButton.dataset.number;
      workingNumberStringDigitCounter++;
      previousButtonPressed = "number";
    } else if (
      previousButtonPressed === "number" ||
      previousButtonPressed === "operation" ||
      previousButtonPressed === "decimal-point"
    ) {
      // If pressed number is a 0 and the working number is 0
      if (
        pressedButton.dataset.number === "0" &&
        workingNumberString.length === 1 &&
        workingNumberString.includes("0")
      ) {
        // Previous pressed button is now number
        previousButtonPressed = "number";
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

        // Previous pressed button is now number
        previousButtonPressed = "number";
      }
      // If working number is a single digit but not 0
      else if (
        workingNumberString.length === 1 &&
        !workingNumberString.includes("0")
      ) {
        numberPressed(workingNumberString, pressedButton.dataset.number);
        renderScreen(workingNumberString);

        // Previous pressed button is now number
        previousButtonPressed = "number";
      }
      // The maximum number of digits a number should have is 9 digits
      else if (workingNumberStringDigitCounter < 9) {
        numberPressed(workingNumberString, pressedButton.dataset.number);
        renderScreen(workingNumberString);

        // Previous pressed button is now number
        previousButtonPressed = "number";
      } else {
        return;
      }
    }
 */
    /* -------------------- Old Number Button Code End -------------------- */
  }

  // If pressed button is the decimal point
  if (pressedButton.classList.contains("decimal-point")) {
    if (!decimalPointActivated) {
      if (
        previousButtonPressed === undefined ||
        previousButtonPressed === "operation"
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
        previousButtonPressed = "decimal-point";
        decimalPointActivated = true;
        renderScreen(workingNumberString);
      }
    } else {
      return;
    }

    /* -------------------- Old Decimal Point Button Code Start -------------------- */
    /* 
    // If previous button was inverse
    if (
      previousButtonPressed === "inverse" ||
      previousButtonPressed === "operation"
    ) {
      workingNumberString === "0.";
      workingNumberStringDigitCounter++;
      previousButtonPressed = "decimal-point";
      decimalPointActivated = true;
    } else if (
      previousButtonPressed === "number" ||
      previousButtonPressed === ""
    )
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
 */
    /* -------------------- Old Decimal Point Button Code End -------------------- */
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
      previousButtonPressed === "decimal-point"
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
    /* -------------------- Old Addition Button Code Start -------------------- */
    /* 
    // If no operation button has been pressed yet in this round of calculations
    if (!operationActivated) {
      savedWorkingNumber = Number(workingNumberString);
      previousEnteredNumber = Number(workingNumberString);
      console.log(`Previous entered number is: ${previousEnteredNumber}`);
      workingNumberString = "0";
      operationActivated = true;

      // Updating the last button that was pressed and the operation in memory
      previousButtonPressed = "operation";
      operationInMemory = "addition";
    }
    // If an operation button has been pressed already in this round of calculations
    else if (previousButtonPressed !== "operation") {
      performOperationInMemory(operationInMemory);

      // Updating the last button that was pressed and the operation in memory
      previousButtonPressed = "operation";
      operationInMemory = "addition";
    } else if (
      previousButtonPressed === "operation" &&
      (savedWorkingNumber === NaN || savedWorkingNumber === Infinity)
    ) {
      savedWorkingNumber = previousEnteredNumber;
      workingNumberString = "0";
      renderScreen(savedWorkingNumber);

      // Updating the last button that was pressed and the operation in memory
      previousButtonPressed = "operation";
      operationInMemory = "addition";
    } else {
      // Updating the last button that was pressed and the operation in memory
      previousButtonPressed = "operation";
      operationInMemory = "addition";
    }
    // Increasing addition counter
    additionCounter++;
 */
    /* -------------------- Old Addition Button Code Start -------------------- */
  }

  // If pressed button is subtraction button
  if (pressedButton.classList.contains("subtraction")) {
    /* -------------------- Old Subtraction Button Code Start -------------------- */

    // If no operation button has been pressed yet in this round of calculations
    if (!operationActivated) {
      savedWorkingNumber = Number(workingNumberString);
      previousEnteredNumber = Number(workingNumberString);
      console.log(`Previous entered number is: ${previousEnteredNumber}`);
      workingNumberString = "0";
      operationActivated = true;

      // Updating the last button that was pressed and the operation in memory
      previousButtonPressed = "operation";
      operationInMemory = "subtraction";
    }
    // If an operation button has been pressed already in this round of calculations
    else if (previousButtonPressed !== "operation") {
      performOperationInMemory(operationInMemory);

      // Updating the last button that was pressed and the operation in memory
      previousButtonPressed = "operation";
      operationInMemory = "subtraction";
    } else if (
      previousButtonPressed === "operation" &&
      (savedWorkingNumber === NaN || savedWorkingNumber === Infinity)
    ) {
      savedWorkingNumber = previousEnteredNumber;
      workingNumberString = "0";
      renderScreen(savedWorkingNumber);

      // Updating the last button that was pressed and the operation in memory
      previousButtonPressed = "operation";
      operationInMemory = "subtraction";
    } else {
      // Updating the last button that was pressed and the operation in memory
      previousButtonPressed = "operation";
      operationInMemory = "addition";
    }
    // Increasing subtraction counter
    subtractionCounter++;

    /* -------------------- Old Subtraction Button Code End -------------------- */
  }

  // If pressed button is division button
  if (pressedButton.classList.contains("division")) {
    /* -------------------- Old Division Button Code Start -------------------- */

    // If no operation button has been pressed yet in this round of calculations
    if (!operationActivated) {
      savedWorkingNumber = Number(workingNumberString);
      previousEnteredNumber = Number(workingNumberString);
      console.log(`Previous entered number is: ${previousEnteredNumber}`);
      console.log(`Saved working number is: ${savedWorkingNumber}`);
      workingNumberString = "0";
      operationActivated = true;

      // Updating the last button that was pressed and the operation in memory
      previousButtonPressed = "operation";
      operationInMemory = "division";
    }
    // If an operation button has been pressed already in this round of calculations
    else if (previousButtonPressed !== "operation") {
      performOperationInMemory(operationInMemory);

      // Updating the last button that was pressed and the operation in memory
      previousButtonPressed = "operation";
      operationInMemory = "division";
    } else if (
      previousButtonPressed === "operation" &&
      (savedWorkingNumber === NaN || savedWorkingNumber === Infinity)
    ) {
      savedWorkingNumber = previousEnteredNumber;
      workingNumberString = "0";
      renderScreen(savedWorkingNumber);

      // Updating the last button that was pressed and the operation in memory
      previousButtonPressed = "operation";
      operationInMemory = "division";
    } else {
      // Updating the last button that was pressed and the operation in memory
      previousButtonPressed = "operation";
      operationInMemory = "addition";
    }
    // Increasing division counter
    divisionCounter++;

    /* -------------------- Old Division Button Code End -------------------- */
  }

  // If pressed button is multiplication button
  if (pressedButton.classList.contains("multiplication")) {
    /* -------------------- Old Multiplication Button Code Start -------------------- */

    // If no operation button has been pressed yet in this round of calculations
    if (!operationActivated) {
      savedWorkingNumber = Number(workingNumberString);
      previousEnteredNumber = Number(workingNumberString);
      console.log(`Previous entered number is: ${previousEnteredNumber}`);
      console.log(`Saved working number is: ${savedWorkingNumber}`);
      workingNumberString = "0";
      operationActivated = true;

      // Updating the last button that was pressed and the operation in memory
      previousButtonPressed = "operation";
      operationInMemory = "multiplication";
    }
    // If an operation button has been pressed already in this round of calculations
    else if (previousButtonPressed !== "operation") {
      performOperationInMemory(operationInMemory);

      // Updating the last button that was pressed and the operation in memory
      previousButtonPressed = "operation";
      operationInMemory = "multiplication";
    } else if (
      previousButtonPressed === "operation" &&
      (savedWorkingNumber === NaN || savedWorkingNumber === Infinity)
    ) {
      savedWorkingNumber = previousEnteredNumber;
      workingNumberString = "0";
      renderScreen(savedWorkingNumber);

      // Updating the last button that was pressed and the operation in memory
      previousButtonPressed = "operation";
      operationInMemory = "multiplication";
    } else {
      // Updating the last button that was pressed and the operation in memory
      previousButtonPressed = "operation";
      operationInMemory = "addition";
    }
    // Increasing multiplication counter
    multiplicationCounter++;

    /* -------------------- Old Multiplication Button Code End -------------------- */
  }
};

buttonsArea.addEventListener("click", calculator);
