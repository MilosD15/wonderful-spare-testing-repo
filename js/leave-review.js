import { isSectionInViewPort } from "./additional-func.js";

if (document.querySelector("[data-leave-review-section]")) {
  const leaveReviewSection = document.querySelector("[data-leave-review-section]");
  const leaveReviewForm = leaveReviewSection.querySelector("[data-leave-review-form]");
  const leaveReviewStarsRadioButtons = leaveReviewSection.querySelectorAll("[data-star-radio-btn]");
  const howCanWeImproveDialog = leaveReviewSection.querySelector("[data-how-can-we-improve-dialog]");
  const howCanWeImproveDialogForm = leaveReviewSection.querySelector("[data-how-can-we-improve-dialog-form]");
  const howCanWeImproveDialogEmailField = leaveReviewSection.querySelector("[data-how-can-we-improve-email-field]");
  const leaveReviewLottiePlayer = leaveReviewSection.querySelector("[data-leave-review-lottie]");

  leaveReviewStarsRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", () => {
      const checkedRadioButton = leaveReviewSection.querySelector("[data-star-radio-btn]:checked");
      const checkedRadioButtonValue = parseInt(checkedRadioButton.value);

      if (checkedRadioButtonValue < 4) {
        howCanWeImproveDialog.showModal();
        howCanWeImproveDialogEmailField.focus();
      }
    });
  });

  leaveReviewForm.addEventListener("submit", e => {
    e.preventDefault();

    const chooseProductSelect = leaveReviewForm.querySelector("#leave-review-product-type-field");
    const emailInputElement = leaveReviewForm.querySelector("#leave-review-email-field");

    if (validateLeaveReviewForm(chooseProductSelect, emailInputElement)) {
      leaveReviewForm.submit();
      // post a review to Judge.me
    }
  });
  howCanWeImproveDialogForm.addEventListener("submit", e => {
    e.preventDefault();

    if (validateHowWeCanImproveForm(howCanWeImproveDialogEmailField, howCanWeImproveDialogForm)) {
      howCanWeImproveDialogForm.submit();
      // send a message to us
      // redirect to home page
    }
  });
  document.addEventListener("click", e => {
    if (!e.target.closest("[data-how-can-we-improve-dialog-close-btn]")) return;

    howCanWeImproveDialog.close();
  });


  // lottie
  let sectionWasAlreadyInViewport = false;

  function reloadPlayer(player) {
    player.load('../offices-love-wonderful.lottie');
  
    player.addEventListener('ready', () => {
      player.setSpeed(0.4);
      player.play();
    });
  }

  window.addEventListener("load", handleLottieAnimation);
  window.addEventListener("scroll", handleLottieAnimation);

  function handleLottieAnimation() {
    if (isSectionInViewPort(leaveReviewSection) && sectionWasAlreadyInViewport === false) {
      sectionWasAlreadyInViewport = true;
      reloadPlayer(leaveReviewLottiePlayer);

      setTimeout(() => {
        reloadPlayer(leaveReviewLottiePlayer);
      }, 4000);
    }
    if (!isSectionInViewPort(leaveReviewSection)) {
      sectionWasAlreadyInViewport = false;
    }
  }
}

function validateHowWeCanImproveForm(emailInputElement, howCanWeImproveForm) {
  const messageTextarea = howCanWeImproveForm.querySelector("#how-can-we-improve-message-field");
  const emailValue = emailInputElement.value;
  const messageValue = messageTextarea.value;

  let isFormValid = true;

  if (!validateEmail(emailValue)) {
    emailInputElement.classList.add("invalid");
    isFormValid = false;
  } else {
    emailInputElement.classList.remove("invalid");
  }

  if (messageValue === "") {
    messageTextarea.classList.add("invalid");
    isFormValid = false;
  } else {
    messageTextarea.classList.remove("invalid");
  }

  return isFormValid;
}

function validateEmail(email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailRegex.test(email)) return true;
  return false;
}


function validateLeaveReviewForm(chooseProductSelect, emailInputElement) {
  const selectedProductValue = chooseProductSelect.options[chooseProductSelect.selectedIndex].value;
  const emailValue = emailInputElement.value;

  let isFormValid = true;

  if (selectedProductValue === "not-selected") {
    chooseProductSelect.classList.add("invalid");
    isFormValid = false;
  } else {
    chooseProductSelect.classList.remove("invalid");
  }

  if (!validateEmail(emailValue)) {
    emailInputElement.classList.add("invalid");
    isFormValid = false;
  } else {
    emailInputElement.classList.remove("invalid");
  }

  return isFormValid;
}