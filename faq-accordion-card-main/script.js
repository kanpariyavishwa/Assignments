const faqItems = document.querySelectorAll(".faq-item");


faqItems.forEach((item) => {

  const question = item.querySelector(".faq-question");


  question.addEventListener("click", () => {

    const alreadyOpen = item.classList.contains("active");


    // Close all FAQ items
    faqItems.forEach((faqItem) => {
      faqItem.classList.remove("active");
    });


    // Open clicked item
    if (!alreadyOpen) {
      item.classList.add("active");
    }

  });

});