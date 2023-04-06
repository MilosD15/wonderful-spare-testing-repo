if (document.querySelector("[data-faq-section]")) {
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-faq-question-btn]")) {
      handleQuestionClick(e);
    }
  });
  
  function handleQuestionClick(e) {
    const questionContainer = e.target.closest("[data-faq-question]");
    const answerContainer = questionContainer.querySelector("[data-faq-answer]");
    $(answerContainer).slideToggle(500, "swing");
  
    const questionHoverText = e.target.dataset.questionHoverText;
    const newQuestionHoverText = questionHoverText === "Reveal answer" ? "Collapse answer" : "Reveal answer";
    e.target.dataset.questionHoverText = newQuestionHoverText;
  }
}