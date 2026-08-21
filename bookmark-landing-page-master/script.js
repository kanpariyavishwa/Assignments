// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});


// ================= FEATURE TABS =================

const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {

  tab.addEventListener("click", () => {

    tabs.forEach(item => {
      item.classList.remove("active");
    });

    tabContents.forEach(content => {
      content.classList.remove("active");
    });

    tab.classList.add("active");

    const selectedTab = document.getElementById(
      tab.getAttribute("data-tab")
    );

    selectedTab.classList.add("active");

  });

});


// ================= FAQ =================

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

  question.addEventListener("click", () => {

    const currentItem = question.parentElement;

    document.querySelectorAll(".faq-item").forEach(item => {
      if (item !== currentItem) {
        item.classList.remove("active");
      }
    });

    currentItem.classList.toggle("active");

  });

});


// ================= EMAIL VALIDATION =================

const contactForm = document.getElementById("contactForm");
const email = document.getElementById("email");
const error = document.getElementById("error");

contactForm.addEventListener("submit", function(event) {

  event.preventDefault();

  const emailValue = email.value.trim();

  if (emailValue === "") {

    error.textContent = "Email cannot be empty";
    email.style.border = "2px solid #fa5757";

  } 
  else if (!emailValue.includes("@")) {

    error.textContent = "Whoops, make sure it's an email";
    email.style.border = "2px solid #fa5757";

  } 
  else {

    error.textContent = "";
    email.style.border = "none";

    alert("Thank you! Your email has been submitted.");

    email.value = "";
  }

});