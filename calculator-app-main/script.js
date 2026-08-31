const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const equalsButton = document.querySelector(".equals");
const resetButton = document.querySelector(".reset");
const deleteButton = document.querySelector(".delete");

const themeButtons = document.querySelectorAll(".theme-btn");


let firstNumber = "";
let secondNumber = "";
let operator = "";
let shouldResetDisplay = false;


/* =========================
   NUMBER BUTTONS
========================= */

numberButtons.forEach(button => {

  button.addEventListener("click", () => {

    const value = button.textContent;

    if (shouldResetDisplay) {
      display.value = "";
      shouldResetDisplay = false;
    }

    if (value === "." && display.value.includes(".")) {
      return;
    }

    if (display.value === "0" && value !== ".") {
      display.value = value;
    } else {
      display.value += value;
    }

  });

});


/* =========================
   OPERATOR BUTTONS
========================= */

operatorButtons.forEach(button => {

  button.addEventListener("click", () => {

    const value = button.textContent;

    if (
      value !== "+" &&
      value !== "−" &&
      value !== "×" &&
      value !== "/"
    ) {
      return;
    }

    if (firstNumber !== "" && operator !== "") {
      calculate();
    }

    firstNumber = display.value;
    operator = value;

    shouldResetDisplay = true;

  });

});


/* =========================
   EQUALS
========================= */

equalsButton.addEventListener("click", () => {

  if (firstNumber === "" || operator === "") {
    return;
  }

  secondNumber = display.value;

  calculate();

  firstNumber = "";
  secondNumber = "";
  operator = "";

  shouldResetDisplay = true;

});


/* =========================
   CALCULATE
========================= */

function calculate() {

  const num1 = parseFloat(
    firstNumber.replace(/,/g, "")
  );

  const num2 = parseFloat(
    (secondNumber || display.value).replace(/,/g, "")
  );

  let result;


  switch (operator) {

    case "+":
      result = num1 + num2;
      break;

    case "−":
      result = num1 - num2;
      break;

    case "×":
      result = num1 * num2;
      break;

    case "/":

      if (num2 === 0) {
        display.value = "Error";
        return;
      }

      result = num1 / num2;
      break;

    default:
      return;
  }


  if (!Number.isFinite(result)) {
    display.value = "Error";
    return;
  }


  display.value = formatResult(result);

}


/* =========================
   FORMAT RESULT
========================= */

function formatResult(number) {

  if (Number.isInteger(number)) {
    return number.toLocaleString("en-US");
  }

  return Number(
    number.toFixed(10)
  ).toLocaleString("en-US");

}


/* =========================
   DELETE
========================= */

deleteButton.addEventListener("click", () => {

  if (
    display.value === "Error" ||
    display.value.length <= 1
  ) {
    display.value = "0";
    return;
  }

  display.value = display.value.slice(0, -1);

});


/* =========================
   RESET
========================= */

resetButton.addEventListener("click", () => {

  display.value = "0";

  firstNumber = "";
  secondNumber = "";
  operator = "";

  shouldResetDisplay = false;

});


/* =========================
   THEME SWITCH
========================= */

themeButtons.forEach(button => {

  button.addEventListener("click", () => {

    const theme = button.dataset.theme;


    document.body.classList.remove(
      "theme-2",
      "theme-3"
    );


    if (theme === "2") {
      document.body.classList.add("theme-2");
    }


    if (theme === "3") {
      document.body.classList.add("theme-3");
    }


    themeButtons.forEach(btn => {
      btn.classList.remove("active");
    });


    button.classList.add("active");

  });

});


/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener("keydown", event => {

  const key = event.key;


  /* Numbers */

  if (
    (key >= "0" && key <= "9") ||
    key === "."
  ) {

    if (shouldResetDisplay) {
      display.value = "";
      shouldResetDisplay = false;
    }


    if (
      key === "." &&
      display.value.includes(".")
    ) {
      return;
    }


    if (
      display.value === "0" &&
      key !== "."
    ) {
      display.value = key;
    } else {
      display.value += key;
    }

  }


  /* Operators */

  if (
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/"
  ) {

    if (
      firstNumber !== "" &&
      operator !== ""
    ) {
      calculate();
    }


    firstNumber = display.value;


    if (key === "*") {
      operator = "×";
    } else if (key === "-") {
      operator = "−";
    } else {
      operator = key;
    }


    shouldResetDisplay = true;

  }


  /* Equals */

  if (
    key === "Enter" ||
    key === "="
  ) {
    equalsButton.click();
  }


  /* Delete */

  if (key === "Backspace") {
    deleteButton.click();
  }


  /* Reset */

  if (key === "Escape") {
    resetButton.click();
  }

});
