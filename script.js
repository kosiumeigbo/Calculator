"use strict";

const screen = document.querySelector(".screen");
const buttonsArea = document.querySelector(".buttons");
const selectedBackgroundColor = "#fee48f";
const selectedBorderColor = "#b18907";
// screen.textContent = "";

let numberString = ""; // To be updated as user presses the digit keypads. Maximum will be
let workingNumber; // To be updated when the user is done entering the number
let decimalInNumber = false; // To be updated when decimal number has been inputed
let totalNumberCounter = 0; // To make sure that the number has no greater than 9 digits
let workingNumbersArray = []; // To compile working numbers

buttonsArea.addEventListener("click", function (e) {
  // If target is a number
  if (e.target.classList.contains("button-number")) {
    if (numberString.length < 9) numberString += e.target.textContent;
    console.log(numberString);
    console.log(Number(numberString));
    screen.textContent = numberString;
  }
});
