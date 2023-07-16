if (document.querySelector("[data-contact-us]")) {
  const contactUsSection = document.querySelector("[data-contact-us]");
  const contactUsForm = contactUsSection.querySelector("[data-contact-us-dialog-form]");

  contactUsForm.addEventListener("submit", e => {
    e.preventDefault();

    const emailField = contactUsForm.querySelector("#contact-us-email-field");
    const messageTextarea = contactUsForm.querySelector("#contact-us-message-field");

    if (validateContactUsForm(emailField, messageTextarea, contactUsForm)) {
      contactUsForm.submit();
    }
  });
}

function validateContactUsForm(emailInputElement, messageTextarea, contactUsForm) {
  const emailValue = emailInputElement.value;
  const messageValue = messageTextarea.value;
  const emailFormGroup = emailInputElement.closest("[data-form-group]");
  const messageFormGroup = messageTextarea.closest("[data-form-group]");
  const requiredFieldsErrorsMessages = contactUsForm.querySelector("[data-required-fields-error-message]");

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

function validateEmail(email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailRegex.test(email)) return true;
  return false;
}

function addErrorMessage(container, message) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  container.appendChild(errorMessage);
}