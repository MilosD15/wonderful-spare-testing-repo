import { isSectionInViewPort } from "./additional-func.js";

if (document.querySelector("[data-faq-section]")) {
  const faqSection = document.querySelector("[data-faq-section]");
  const faqLottiePlayer = faqSection.querySelector("[data-faq-lottie-player]");

  if (!isTouchDevice()) {
    document.body.addEventListener("mouseenter", e => {
      handleQuestionMouseOver(e);
      // console.log("mouseenter");
    });
    document.body.addEventListener("mouseover", e => {
      handleQuestionMouseOver(e);
      // console.log("mouseover");
    });
    document.body.addEventListener("mousedown", e => {
      handleQuestionMouseDown(e);
      // console.log("mousedown");
    });
  }

  function handleQuestionMouseOver(e) {
    if (e.target.matches("[data-faq-question-btn]")) {
      e.target.classList.add("on-hover");

      e.target.addEventListener("mouseleave", e => {
        if (e.target.matches("[data-faq-question-btn]")) {
          e.target.classList.remove("on-hover");
        }
      }, { once: true });
    }
  }

  function handleQuestionMouseDown(e) {
    if (e.target.matches("[data-faq-question-btn]")) {
      handleQuestionClick(e);
    }
  }

  const averageHumanTouchDuration = 200; // milliseconds
  let touchStartDate = new Date(), touchEndDate = new Date();

  document.body.addEventListener("touchstart", e => {
    if (!e.target.matches("[data-faq-question-btn]")) return;
    
    touchStartDate = new Date();

    // const questionHoverText = e.target.dataset.questionHoverText;
    // if (questionHoverText === "Collapse answer") {
    //   e.target.classList.add("on-hover");
    // }
  });

  document.body.addEventListener("touchend", e => {
    if (!e.target.matches("[data-faq-question-btn]")) return;

    touchEndDate = new Date();
    const touchDuration = touchEndDate.getTime() - touchStartDate.getTime();
    if (touchDuration <= averageHumanTouchDuration) {
      handleQuestionClick(e);
      e.target.classList.remove("on-hover");
    } else {
      e.target.classList.add("on-hover");
    }

    // const questionHoverText = e.target.dataset.questionHoverText;
    // if (questionHoverText === "Reveal answer") {
    //   e.target.classList.remove("on-hover");
    // }
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
    return Modernizr.touch;
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