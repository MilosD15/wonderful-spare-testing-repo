import { isSectionInViewPort } from "./additional-func.js";

if (document.querySelector("[data-faq-section]")) {
  const faqSection = document.querySelector("[data-faq-section]");
  const faqLottiePlayer = faqSection.querySelector("[data-faq-lottie-player]");

  document.body.addEventListener("mouseover", e => {
    if (isTouchDevice()) return;

    if (e.target.matches("[data-faq-question-btn]")) {
      e.target.classList.add("on-hover");

      e.target.addEventListener("mouseleave", e => {
        if (isTouchDevice()) return;

        if (e.target.matches("[data-faq-question-btn]")) {
          e.target.classList.remove("on-hover");
        }
      }, { once: true });
    }
  });

  document.body.addEventListener("mousedown", e => {
    if (isTouchDevice()) return;

    if (e.target.matches("[data-faq-question-btn]")) {
      handleQuestionClick(e);
    }
  });

  document.body.addEventListener("touchstart", e => {
    if (e.target.matches("[data-faq-question-btn]")) {
      handleQuestionClick(e);
      const questionHoverText = e.target.dataset.questionHoverText;

      if (questionHoverText === "Collapse answer") {
        e.target.classList.add("on-hover");
      }
    }
  });

  document.body.addEventListener("touchend", e => {
    if (e.target.matches("[data-faq-question-btn]")) {
      const questionHoverText = e.target.dataset.questionHoverText;

      if (questionHoverText === "Reveal answer") {
        e.target.classList.remove("on-hover");
      }
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

  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  }

  // lottie
  let sectionWasAlreadyInViewport = false;

  function reloadPlayer(player) {
    player.load('../faq.lottie');
  
    player.addEventListener('ready', () => {
      player.play();
      player.setSpeed(0.9);
    });
  }

  window.addEventListener("load", handleLottieAnimation);
  window.addEventListener("scroll", handleLottieAnimation);

  function handleLottieAnimation() {
    if (isSectionInViewPort(faqSection) && sectionWasAlreadyInViewport === false) {
      sectionWasAlreadyInViewport = true;
      reloadPlayer(faqLottiePlayer);
    }
    if (!isSectionInViewPort(faqSection)) {
      sectionWasAlreadyInViewport = false;
    }
  }
}