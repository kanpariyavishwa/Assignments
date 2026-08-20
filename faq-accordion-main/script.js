const questions = document.querySelectorAll(".faq-question");

questions.forEach((question) => {

  question.addEventListener("click", () => {

    const currentItem = question.closest(".faq-item");

    // Pehle saare FAQs close karo
    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("active");
    });

    // Agar clicked FAQ pehle se open nahi tha,
    // to usko open karo
    if (!currentItem.classList.contains("active")) {
      currentItem.classList.add("active");
    }

  });

});