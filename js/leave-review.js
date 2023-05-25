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
        resetHowWeCanImproveFormValidation(howCanWeImproveDialogEmailField, howCanWeImproveDialogForm.querySelector("#how-can-we-improve-message-field"));
        howCanWeImproveDialog.showModal();
        howCanWeImproveDialogEmailField.focus();
      }
    });
  });

  leaveReviewForm.addEventListener("submit", e => {
    e.preventDefault();

    const chooseProductSelect = leaveReviewForm.querySelector("#leave-review-product-type-field");
    const emailInputElement = leaveReviewForm.querySelector("#leave-review-email-field");

    if (validateLeaveReviewForm(chooseProductSelect, emailInputElement, leaveReviewForm)) {
      leaveReviewForm.submit();
      // post a review to Judge.me
    }
  });
  howCanWeImproveDialogForm.addEventListener("submit", e => {
    e.preventDefault();

    const messageTextarea = howCanWeImproveDialogForm.querySelector("#how-can-we-improve-message-field");

    if (validateHowWeCanImproveForm(howCanWeImproveDialogEmailField, messageTextarea, howCanWeImproveDialogForm)) {
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

function validateHowWeCanImproveForm(emailInputElement, messageTextarea, howCanWeImproveDialogForm) {
  const emailValue = emailInputElement.value;
  const messageValue = messageTextarea.value;
  const emailFormGroup = emailInputElement.closest("[data-form-group]");
  const messageFormGroup = messageTextarea.closest("[data-form-group]");
  const requiredFieldsErrorsMessages = howCanWeImproveDialogForm.querySelector("[data-required-fields-error-message]");

  requiredFieldsErrorsMessages.innerHTML = "";
  let isFormValid = true;

  if (!validateEmail(emailValue)) {
    emailFormGroup.classList.add("invalid");
    addErrorMessage(requiredFieldsErrorsMessages, "* Please enter a valid email address.");
    isFormValid = false;
  } else {
    emailFormGroup.classList.remove("invalid");
  }

  if (messageValue === "") {
    messageFormGroup.classList.add("invalid");
    addErrorMessage(requiredFieldsErrorsMessages, "* Please fill out required fields.");
    isFormValid = false;
  } else {
    messageFormGroup.classList.remove("invalid");
  }

  if (!isFormValid) {
    $(requiredFieldsErrorsMessages).slideDown(200);
  } else {
    $(requiredFieldsErrorsMessages).slideUp(200);
  }

  return isFormValid;
}

function resetHowWeCanImproveFormValidation(emailInputElement, messageTextarea) {
  const emailFormGroup = emailInputElement.closest("[data-form-group]");
  const messageFormGroup = messageTextarea.closest("[data-form-group]");

  emailFormGroup.classList.remove("invalid");
  messageFormGroup.classList.remove("invalid");
}

function validateEmail(email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailRegex.test(email)) return true;
  return false;
}


function validateLeaveReviewForm(chooseProductSelect, emailInputElement, leaveReviewForm) {
  const selectedProductValue = chooseProductSelect.options[chooseProductSelect.selectedIndex].value;
  const emailValue = emailInputElement.value;
  const selectedProductFormGroup = chooseProductSelect.closest("[data-form-group]");
  const emailFormGroup = emailInputElement.closest("[data-form-group]");
  const requiredFieldsErrorsMessages = leaveReviewForm.querySelector("[data-required-fields-error-message]");

  requiredFieldsErrorsMessages.innerHTML = "";
  let isFormValid = true;

  if (selectedProductValue === "not-selected") {
    selectedProductFormGroup.classList.add("invalid");
    addErrorMessage(requiredFieldsErrorsMessages, "* Please select a product.");
    isFormValid = false;
  } else {
    selectedProductFormGroup.classList.remove("invalid");
  }

  if (!validateEmail(emailValue)) {
    emailFormGroup.classList.add("invalid");
    addErrorMessage(requiredFieldsErrorsMessages, "* Please enter a valid email address.");
    isFormValid = false;
  } else {
    emailFormGroup.classList.remove("invalid");
  }

  if (!isFormValid) {
    $(requiredFieldsErrorsMessages).slideDown(200);
  } else {
    $(requiredFieldsErrorsMessages).slideUp(200);
  }

  return isFormValid;
}

function addErrorMessage(container, message) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  container.appendChild(errorMessage);
}