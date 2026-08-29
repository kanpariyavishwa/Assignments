const form = document.getElementById("mortgageForm");

const amountInput = document.getElementById("amount");
const termInput = document.getElementById("term");
const rateInput = document.getElementById("rate");

const emptyResult = document.getElementById("emptyResult");
const completedResult = document.getElementById("completedResult");

const monthlyPayment = document.getElementById("monthlyPayment");
const totalPayment = document.getElementById("totalPayment");

const clearBtn = document.getElementById("clearBtn");

amountInput.addEventListener("input", function () {
  let value = this.value.replace(/,/g, "");

  if (value === "") {
    this.value = "";
    return;
  }

  value = Number(value);

  this.value = value.toLocaleString("en-GB");
});


/* CALCULATE */

form.addEventListener("submit", function (event) {

  event.preventDefault();

  const amount = Number(amountInput.value.replace(/,/g, ""));
  const term = Number(termInput.value);
  const rate = Number(rateInput.value);

  let valid = true;


  /* VALIDATION */

  if (amount <= 0 || amountInput.value === "") {
    document.getElementById("amountError").textContent =
      "This field is required";
    valid = false;
  } else {
    document.getElementById("amountError").textContent = "";
  }


  if (term <= 0 || termInput.value === "") {
    document.getElementById("termError").textContent =
      "This field is required";
    valid = false;
  } else {
    document.getElementById("termError").textContent = "";
  }


  if (rate <= 0 || rateInput.value === "") {
    document.getElementById("rateError").textContent =
      "This field is required";
    valid = false;
  } else {
    document.getElementById("rateError").textContent = "";
  }


  if (!valid) {
    return;
  }


  /* GET MORTGAGE TYPE */

  const mortgageType = document.querySelector(
    'input[name="mortgageType"]:checked'
  ).value;


  let monthly;
  let total;


  /* REPAYMENT */

  if (mortgageType === "repayment") {

    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = term * 12;

    monthly =
      amount *
      monthlyRate *
      Math.pow(1 + monthlyRate, numberOfPayments) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    total = monthly * numberOfPayments;

  }


  /* INTEREST ONLY */

  else {

    monthly = amount * (rate / 100) / 12;

    total = monthly * term * 12 + amount;

  }


  /* DISPLAY RESULT */

  monthlyPayment.textContent =
    "£" + monthly.toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });


  totalPayment.textContent =
    "£" + total.toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });


  emptyResult.style.display = "none";
  completedResult.style.display = "block";

});


/* CLEAR ALL */

clearBtn.addEventListener("click", function () {

  form.reset();

  amountInput.value = "";
  
  document.getElementById("amountError").textContent = "";
  document.getElementById("termError").textContent = "";
  document.getElementById("rateError").textContent = "";
  document.getElementById("typeError").textContent = "";

  emptyResult.style.display = "block";
  completedResult.style.display = "none";

});

