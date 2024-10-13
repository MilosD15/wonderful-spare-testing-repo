// populate questions from the JSON file
const quizInfo = await fetchQuizInfo("quiz-1.json");
populateQuizInfo(quizInfo);

// DOM ELEMENTS
const quizFormContainer = document.querySelector("[data-quizzes-form-container]");
const quizFormOverlay = document.querySelector("[data-quizzes-form-overlay]");
const quizForm = document.querySelector("[data-quizzes-form]");
const quizQuestionsContainer = document.querySelector("[data-quiz-questions-container]");
const quizQuestions = document.querySelectorAll("[data-quiz-question]");
const quizButtonsRow = document.querySelector("[data-quiz-buttons-row]");
const quizNextButton = document.querySelector("[data-quiz-next-btn]");
const quizPrevButton = document.querySelector("[data-quiz-prev-btn]");
const quizSubmitButton = document.querySelector("[data-quiz-submit-btn]");
const errorMessagePopup = document.querySelector("[data-error-message-popup]");
const errorMessageText = document.querySelector("[data-error-message-text]");
const errorMessagePopupBtn = document.querySelector("[data-error-message-popup] button");
const openQuizzesModalButton = document.querySelector("[data-open-quizzes-modal-btn]");
const quizProgressNumber = document.querySelector("[data-quizzes-progress-number]");
const quizProgressBar = document.querySelector("[data-quizzes-progress-bar]");
const closeQuizzesModalButton = document.querySelector("[data-close-popup-btn]");

// CONSTANTS
const KLAVIYO_PUBLIC_API_KEY = "LmwnMm";
const ERROR_MESSAGE_POPUP_STATES = {
  OPENED: Symbol("OPENED"),
  CLOSING_STARTED: Symbol("CLOSING_STARTED"),
  CLOSED: Symbol("CLOSED"),
};
const ERROR_MESSAGES = {
  NO_OPTION_SELECTED: "Please, select at least one option.",
  REQUIRED_FIELD: "Please, fill in the text field above.",
  INVALID_EMAIL: "Please, enter a valid email address.",
}
const transitionDurationSuperFast = parseInt(getCSSProperty(quizFormContainer, "--transition-duration-super-fast"));
const transitionDurationFast = parseInt(getCSSProperty(quizFormContainer, "--transition-duration-fast"));
const transitionDurationMedium = parseInt(getCSSProperty(quizFormContainer, "--transition-duration-medium"));
const transitionDurationSlow = parseInt(getCSSProperty(quizFormContainer, "--transition-duration-slow"));
const transitionDurationVerySlow = parseInt(getCSSProperty(quizFormContainer, "--transition-duration-very-slow"));
const transitionDelay = parseInt(getCSSProperty(quizFormContainer, "--transition-delay"));
const transitionDurationOpenModal = parseInt(getCSSProperty(quizFormContainer, "--transition-duration-open-modal"));
const selectingOptionAnimationDuration = parseInt(getCSSProperty(quizFormContainer, "--selecting-option-animation-duration"));
const errorMessagePopupDuration = parseInt(getCSSProperty(quizFormContainer, "--error-message-popup-duration"));
const fakeDelayTime = 1;
const betweenQuestionsDelay = 0;
const productHandlesMap = new Map([
  ["sticks-chocolate", "chocolate-fluoride-varnish"],
  ["sticks-bubblegum", "bubblegum-fluoride-varnish"],
  ["sticks-strawberry", "strawberry-fluoride-varnish"],
  ["sticks-marshmallow", "marshmallow-varnish"],
  ["sticks-smores", "smores-varnish"],
  ["sticks-mint", "mint-fluoride-varnish"],
  ["cups-chocolate", "copy-of-chocolate-fluoride-varnish-cups-brushes-not-included"],
  ["cups-bubblegum", "copy-of-bubblegum-fluoride-varnish-cups-brushes-not-included"],
  ["cups-strawberry", "strawberry-fluoride-varnish-cups-bundled-with-brushes"],
  ["cups-marshmallow", "marshmallow-varnish-cups-w-brushes"],
  ["cups-smores", "smores-fluoride-varnish-cups"],
  ["cups-mint", "mint-fluoride-varnish-cups-bundled-with-brushes"],
  ["adult-bubblegum", "adult-bubblegum-prophy-paste"],
  ["adult-mint", "adult-mint-prophy-paste"],
  ["paste-chocolate", "chocolate-prophy-paste"],
  ["paste-bubblegum", "bubblegum-prophy-paste"],
  ["paste-strawberry", "strawberry-prophy-paste"],
  ["paste-marshmallow", "marshmallow-prophy-paste"],
  ["paste-mint", "mint-prophy-paste"],
  ["paste-variety", "copy-of-variety-prophy-paste"],
  ["paste-plain", "plain-prophy-paste"],
  ["brushes", "additional-microbrushes-100-pack"],
  ["angles-hard", "hard-prophy-angles-latex-free"],
  ["angles-soft", "prophy-angle"],
]);

// GLOBAL VARIABLES
let currentQuestion = 0;
let currentErrorMessagePopupState = {
  state: ERROR_MESSAGE_POPUP_STATES.CLOSED,
  count: 0,
};
const klaviyoQuizAnswersData = {};
const initialQuizPointsProductType = {
  adultProphyPaste: 0,
  prophyPaste: 0,
  varnishSticks: 0,
  varnishCups: 0,
  accessories: 0,
}
const initialQuizPointsProductFlavor = {
  bubblegum: 0,
  chocolate: 0,
  mint: 0,
  plain: 0,
  strawberry: 0,
  marshmallow: 0,
  smores: 0,
  variety: 0,
}
const initialQuizPointsAccessoriesType = {
  brushes: 0,
  anglesSoft: 0,
  anglesFirm: 0,
};


// handle quizzes form submission
quizForm.addEventListener("submit", e => {
  e.preventDefault();

  // if the submit button is not clicked, exit the function
  if (e.submitter !== quizSubmitButton) return;

  // if the email field is empty, 
  // display an error message and exit the function
  const emailQuestion = quizQuestions[quizQuestions.length - 1];
  const emailInput = emailQuestion.querySelector("input");
  if (emailInput.value === "") {
    displayErrorMessagePopup(ERROR_MESSAGES.REQUIRED_FIELD);
    return;
  }

  // if the email is not valid, 
  // display an error message and exit the function
  if (!isValidEmail(emailInput.value)) {
    displayErrorMessagePopup(ERROR_MESSAGES.INVALID_EMAIL);
    return;
  }

  // SUCCESSFUL SUBMISSION

  // calculate the points for each product
  const [quizPointsProductType, quizPointsProductFlavor, quizPointsAccessoriesType] = calculatePoints(quizInfo.questions);

  // console.log(quizPointsProductType, quizPointsProductFlavor, quizPointsAccessoriesType);

  // get the top 3 products that best match the user's needs
  const topProducts = determineBestProducts(quizPointsProductType, quizPointsProductFlavor, quizPointsAccessoriesType);
  // alert("Products that best matches your needs:\n" + topProducts.join(",\n"));
  
  // send data to Klaviyo
  // const quizDataToBeSent = { [quizInfo.klaviyoTag]: topProducts.join(", "), ...klaviyoQuizAnswersData };
  // sendDataToKlaviyo(emailInput.value, quizDataToBeSent)
  //   .then(response => console.log(response));

  // refresh the page and render the recommended products
  // const topProductHandles = topProducts.map((product) => productHandlesMap.get(product));
});

// SEND DATA TO KLAVIYO
async function sendDataToKlaviyo(customerEmail, data) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      revision: '2024-07-15',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      data: {
        type: 'profile',
        attributes: {
          email: customerEmail,
          properties: data
        }
      }
    })
  };

  try {
    const response = await fetch(`https://a.klaviyo.com/client/profiles/?company_id=${KLAVIYO_PUBLIC_API_KEY}`, options);

    if (response.status === 202) {
      // console.log('Success');
      return Promise.resolve('Successfully sent data to Klaviyo');
    } else {
      // console.error('Error:', response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error: ', error);
  }
}

// CALCULATE POINTS FUNCTIONS
function calculatePoints(questions) {
  const quizPointsProductType = { ...initialQuizPointsProductType };
  const quizPointsProductFlavor = { ...initialQuizPointsProductFlavor };
  const quizPointsAccessoriesType = { ...initialQuizPointsAccessoriesType };

  const pointsQuestions = document.querySelectorAll("[data-quiz-question]:not(:last-child)");
  pointsQuestions.forEach(question => {
    const checkedInputs = [...question.querySelectorAll("input:checked")];
    const questionObj = questions.find(q => q.id === question.dataset.quizQuestionId);

    checkedInputs.forEach(input => {
      const optionContainer = input.closest("[data-quiz-option-id]");
      const optionId = optionContainer.dataset.quizOptionId;

      const option = questionObj.options.find(o => o.id === optionId);
      if (!option) return;

      // populate data for Klaviyo
      if (klaviyoQuizAnswersData[questionObj.klaviyoTag]) {
        klaviyoQuizAnswersData[questionObj.klaviyoTag] += `, ${option.optionText}`;
      } else {
        klaviyoQuizAnswersData[questionObj.klaviyoTag] = option.optionText;
      }

      if (questionObj.pointsType === "productType") {
        option.productPoints.forEach(point => {
          quizPointsProductType[point.pointsTypeName] += point.points;
        });
      } else if (questionObj.pointsType === "productFlavor") {
        option.productPoints.forEach(point => {
          quizPointsProductFlavor[point.pointsTypeName] += point.points;
        });
      } else if (questionObj.pointsType === "accessoriesType") {
        option.productPoints.forEach(point => {
          quizPointsAccessoriesType[point.pointsTypeName] += point.points;
        });
      }
    });
  });

  return [quizPointsProductType, quizPointsProductFlavor, quizPointsAccessoriesType];
}

function determineBestProducts(pointsProductType, pointsProductFlavor, pointsAccessoriesType = null) {
  let topProducts = [];
  const top3ProductTypes = getTop3ProductTypes(pointsProductType);
  const sortedProductFlavors = sortProductAttributes(pointsProductFlavor);

  top3ProductTypes.forEach((type) => {
    if (type === "accessories") {
      topProducts.push(determineWhichAccessories(pointsAccessoriesType));
    } else {
      topProducts.push(determineWhichProduct(type, sortedProductFlavors));
    }
  });

  return topProducts;
}

function getTop3ProductTypes(pointsProductType) {
  const sortedProductTypes = sortProductAttributes(pointsProductType);
  return sortedProductTypes.slice(0, 3);
}

function determineWhichAccessories(pointsAccessoriesType) {
  if ((pointsAccessoriesType?.brushes == pointsAccessoriesType?.anglesSoft
    && pointsAccessoriesType?.brushes == pointsAccessoriesType?.anglesFirm)
    || pointsAccessoriesType === null) {
    return getRandomAccessories();
  }

  const sortedAccessoriesTypes = sortProductAttributes(pointsAccessoriesType);
  return getAccessoriesProductName(sortedAccessoriesTypes[0]);
}

function getRandomAccessories() {
  const productVariants = ["brushes", "angles-soft", "angles-firm"];

  return productVariants[Math.floor(Math.random() * productVariants.length)];
}

function getAccessoriesProductName(accessoriesType) {
  switch (accessoriesType) {
    case "brushes":
      return "brushes";
    case "anglesSoft":
      return "angles-soft";
    case "anglesFirm":
      return "angles-firm";
  }
}

function determineWhichProduct(productType, sortedProductFlavors) {
  const productFlavors = getProductFlavors(productType);
  const productTypeBase = getProductTypeBase(productType);
  
  for (let flavor of sortedProductFlavors) {
    if (productFlavors.includes(flavor)) {
      return `${productTypeBase}-${flavor}`;
    }
  }
}

function getProductFlavors(productType) {
  switch (productType) {
    case "adultProphyPaste":
      return ["bubblegum", "mint"];
    case "prophyPaste":
      return ["bubblegum", "chocolate", "mint", "plain", "strawberry", "marshmallow", "variety"];
    case "varnishSticks":
    case "varnishCups":
      return ["bubblegum", "chocolate", "mint", "smores", "strawberry", "marshmallow"];
  }
}

function getProductTypeBase(productType) {
  switch (productType) {
    case "adultProphyPaste":
      return "adult";
    case "prophyPaste":
      return "paste";
    case "varnishSticks":
      return "sticks";
    case "varnishCups":
      return "cups";
  }
}

function sortProductAttributes(pointsProductAttribute) {
  return Object.keys(pointsProductAttribute).sort(
    (a, b) => pointsProductAttribute[b] - pointsProductAttribute[a]);
}

// ANIMATION FUNCTIONS
openQuizzesModalButton.addEventListener("click", openQuizzesModal);
function openQuizzesModal() {
  quizFormContainer.dataset.state = "open";

  setTimeout(() => {
    quizForm.classList.add("fade-in");
    quizFormOverlay.classList.add("fade-in");

    // animate the first question in
    animateQuestionIn("fade-in");
    handleHidingButtons();
  }, 0);
}

closeQuizzesModalButton.addEventListener("click", closeQuizzesModal);
function closeQuizzesModal() {
  quizForm.classList.remove("fade-in");
  quizFormOverlay.classList.remove("fade-in");

  setTimeout(() => {
    quizFormContainer.dataset.state = "close";

    resetQuizForm();
  }, transitionDurationOpenModal);
}

function resetQuizForm() {
  const quizQuestionTitle = quizQuestions[currentQuestion].querySelector("[data-quiz-question-title]");
  const quizQuestionOptions = quizQuestions[currentQuestion].querySelector("[data-quiz-question-options]");

  quizQuestions[currentQuestion].classList.remove("active");
  resetAnimationClasses(quizQuestionTitle);
  resetAnimationClasses(quizQuestionOptions);
  resetAnimationClasses(quizButtonsRow);

  currentQuestion = 0;
  uncheckAllQuestionOptions();
  moveProgressBar();
}

// handle moving between questions
// (only for self-changing questions - questions
// that change when an option is selected)
document.addEventListener("click", e => {
  // if the clicked element is not inside the question container, exit the function
  const questionContainer = e.target.closest("[data-quiz-question]");
  if (!questionContainer) return;

  // if the question is not a self-changing question, exit the function
  const selfChangingQuestion = questionContainer.dataset.selfChangingQuestion;
  if (selfChangingQuestion !== "true") return;
  
  // if the clicked element is not an option(label in this case), exit the function
  const option = e.target.closest("[data-quiz-option-id] > label");
  if (!option) return;

  const input = option.closest("[data-quiz-option-id]").querySelector("input");

  if (input.checked) {
    nextQuestion();
    return;
  }

  setTimeout(() => {
    nextQuestion();
  }, selectingOptionAnimationDuration + betweenQuestionsDelay);
});

quizNextButton.addEventListener("click", nextQuestion);
quizPrevButton.addEventListener("click", previousQuestion);

function nextQuestion() {
  // if the questions is checkbox question
  // and no option is selected, don't move to the next question
  const selfChangingQuestion = quizQuestions[currentQuestion].dataset.selfChangingQuestion;
  if (selfChangingQuestion !== "true" && checkCheckboxQuestionValidity() === false) return;


  animateQuestionOut();

  setTimeout(() => {
    currentQuestion++;

    animateQuestionIn("slide-in-from-right");

    handleHidingButtons();
  }, transitionDurationFast + betweenQuestionsDelay);
}

function previousQuestion() {
  animateQuestionOut();

  setTimeout(() => {
    currentQuestion--;

    animateQuestionIn("slide-in-from-left");

    handleHidingButtons();
  }, transitionDurationFast + betweenQuestionsDelay);
}

function handleHidingButtons() {
  const selfChangingQuestion = quizQuestions[currentQuestion].dataset.selfChangingQuestion;

  // hide back btn if the current question is the first question
  if (currentQuestion === 0) {
    quizPrevButton.classList.add("hidden");
  } else {
    quizPrevButton.classList.remove("hidden");
  }

  // hide next btn if the current question is the last question
  // display submit btn instead
  if (currentQuestion === quizQuestions.length - 1) {
    quizNextButton.classList.add("hidden");
    quizSubmitButton.classList.add("active");
  } else {
    quizNextButton.classList.remove("hidden");
    quizSubmitButton.classList.remove("active");
  }
  
  // if the current question is a self-changing question
  // and none of the options are selected, hide the next button
  if (selfChangingQuestion === "true" && checkIfAnyOptionChecked() === false) {
    quizNextButton.classList.add("hidden");
  }

  // hide the buttons row if the next, prev, and submit buttons are hidden
  // otherwise display the buttons row
  if (quizNextButton.classList.contains("hidden") && quizPrevButton.classList.contains("hidden") && !quizSubmitButton.classList.contains("active")) {
    quizButtonsRow.classList.add("hidden");
  } else {
    quizButtonsRow.classList.remove("hidden");
  }
}

function animateQuestionIn(animateInClass) {
  const quizQuestionTitle = quizQuestions[currentQuestion].querySelector("[data-quiz-question-title]");
  const quizQuestionOptions = quizQuestions[currentQuestion].querySelector("[data-quiz-question-options]");

  // make questions visible in the DOM
  quizQuestions[currentQuestion].classList.add("active");
  quizButtonsRow.classList.add("active");

  // attach validations events & set initial actions
  checkSingleSelectableFieldValidity();
  focusInputTextQuestion();

  // move question elements to the left or right
  // depending on the direction of the animation
  // (only for slide-in animations)
  if (animateInClass === "slide-in-from-right") {
    quizQuestionTitle.classList.add("move-right");
    quizQuestionOptions.classList.add("move-right");
    quizButtonsRow.classList.add("move-right");
  } else if (animateInClass === "slide-in-from-left") {
    quizQuestionTitle.classList.add("move-left");
    quizQuestionOptions.classList.add("move-left");
    quizButtonsRow.classList.add("move-left");
  }

  let animateInDelay = 100;
  if (currentQuestion === quizQuestions.length - 1) {
    // the email question doesn't want to slide in, but just fade in
    // if the delay is the normal fake delay
    // it needs to be 300ms+ to slide in, but I don't know why
    animateInDelay = 301;
  }

  // animate question elements in the screen
  setTimeout(() => {
    quizQuestionTitle.classList.add(animateInClass);
    quizQuestionOptions.classList.add(animateInClass);
    quizButtonsRow.classList.add(animateInClass);
    moveProgressBar();
  }, animateInDelay);
}

function moveProgressBar() {
  // the email question is always the last question
  // const quizQuestionsCount = quizQuestions.length + 1;
  const quizQuestionsCount = quizQuestions.length;
  const progress = (currentQuestion + 1) / quizQuestionsCount * 100;
  quizProgressNumber.textContent = `${currentQuestion + 1}`;
  quizProgressBar.style.width = `${progress}%`;
}

function animateQuestionOut() {
  const quizQuestionTitle = quizQuestions[currentQuestion].querySelector("[data-quiz-question-title]");
  const quizQuestionOptions = quizQuestions[currentQuestion].querySelector("[data-quiz-question-options]");

  // animate question elements out of the screen (make it invisible)
  quizQuestionTitle.classList.add("fade-out");
  quizQuestionOptions.classList.add("fade-out");
  quizButtonsRow.classList.add("fade-out");

  // remove all classes after the animation ends
  // to prepare for the next cycle of animating the same question in
  setTimeout(() => {
    quizQuestions[currentQuestion].classList.remove("active");
    resetAnimationClasses(quizQuestionTitle);
    resetAnimationClasses(quizQuestionOptions);
    resetAnimationClasses(quizButtonsRow);
  }, transitionDurationFast);
}

function resetAnimationClasses(element) {
  element.classList.remove("fade-in");
  element.classList.remove("fade-out");
  element.classList.remove("slide-in-from-left");
  element.classList.remove("slide-in-from-right");
  element.classList.remove("move-right");
  element.classList.remove("move-left");
  element.classList.remove("active");
}

// VALIDATION FUNCTIONS
function checkCheckboxQuestionValidity() {
  const checkboxes = quizQuestions[currentQuestion].querySelectorAll("input[type='checkbox']");
  if (checkboxes.length === 0) return true;

  if (!quizQuestions[currentQuestion].querySelector("input:checked")) {
    if (currentErrorMessagePopupState.state === ERROR_MESSAGE_POPUP_STATES.CLOSED) {
      displayErrorMessagePopup(ERROR_MESSAGES.NO_OPTION_SELECTED);
      ifAnyOptionCheckedHideErrorMessagePopup();
    }
    return false;
  }

  return true;
}

function ifAnyOptionCheckedHideErrorMessagePopup() {
  const options = quizQuestions[currentQuestion].querySelectorAll("input");
  options.forEach(option => {
    option.addEventListener("change", () => {
      if (option.checked) {
        closeErrorMessagePopup(currentErrorMessagePopupState);
      }
    });
  });
}

/**
 * check if the question has a single selectable field
 * if no, exit the function
 * if yes, grabs the input of the single selectable
 * option and attaches on_change event listener to it
 * check if the question has a single selectable field
 * that will ensure that selecting this option will uncheck all other options
 * and that selecting any other option will uncheck this option
 * 
 * @param {void} - This function don't need any arguments.
 * @returns {void} - This function does not return a value.
 */
function checkSingleSelectableFieldValidity() {
  const singleSelectableOption = quizQuestions[currentQuestion].querySelector("[data-single-selectable-option]");
  if (!singleSelectableOption) return;

  const singleSelectableOptionInput = singleSelectableOption.querySelector("input");

  singleSelectableOptionInput.addEventListener("change", () => {
    if (singleSelectableOptionInput.checked) {
      uncheckCurrentQuestionOptions();
      singleSelectableOptionInput.checked = true;

      uncheckSingleSelectableOptionWhenOthersChecked(singleSelectableOptionInput);
    }
  });
}

function uncheckSingleSelectableOptionWhenOthersChecked(singleSelectableOptionInput) {
  const otherOptions = quizQuestions[currentQuestion].querySelectorAll("input");
  otherOptions.forEach(option => {
    if (option === singleSelectableOptionInput) return;

    option.addEventListener("change", () => {
      if (option.checked) {
        singleSelectableOptionInput.checked = false;
      }
    });
  });
}

function uncheckAllQuestionOptions() {
  quizQuestions.forEach(question => {
    const options = question.querySelectorAll("input");
    options.forEach(option => option.checked = false);
  });
}

function uncheckCurrentQuestionOptions() {
  const currentQuestionOptions = quizQuestions[currentQuestion].querySelectorAll("input");
  currentQuestionOptions.forEach(option => option.checked = false);
}

function checkIfAnyOptionChecked() {
  const options = [...quizQuestions[currentQuestion].querySelectorAll("input")];
  return options.some(option => option.checked);
}

// ERROR MESSAGE POPUP FUNCTIONS & EVENTS
errorMessagePopupBtn.addEventListener("click", () => {
  closeErrorMessagePopup(currentErrorMessagePopupState);
});

function displayErrorMessagePopup(errorMessage) {
  if (currentErrorMessagePopupState.state === ERROR_MESSAGE_POPUP_STATES.OPENED) return;

  errorMessagePopup.classList.remove("hidden");
  errorMessageText.textContent = errorMessage;
  currentErrorMessagePopupState.state = ERROR_MESSAGE_POPUP_STATES.OPENED;
  currentErrorMessagePopupState.count++;

  const copyOfCurrentErrorMessagePopupState = { ...currentErrorMessagePopupState };

  setTimeout(() => {
    errorMessagePopup.classList.add("slide-in");

    setTimeout(() => {
      closeErrorMessagePopup(copyOfCurrentErrorMessagePopupState);
    }, transitionDurationSlow + errorMessagePopupDuration);
  }, fakeDelayTime);
}

function closeErrorMessagePopup(errorMessagePopupState) {
  if (errorMessagePopupState.state !== currentErrorMessagePopupState.state ||
    errorMessagePopupState.count !== currentErrorMessagePopupState.count) return;

  currentErrorMessagePopupState.state = ERROR_MESSAGE_POPUP_STATES.CLOSING_STARTED;
  errorMessagePopup.classList.remove("slide-in");

  setTimeout(() => {
    errorMessagePopup.classList.add("hidden");
    currentErrorMessagePopupState.state = ERROR_MESSAGE_POPUP_STATES.CLOSED;
  }, transitionDurationSlow);
}

// POPULATE QUIZ QUESTIONS FUNCTIONS
function populateQuizInfo(quizInfo) {
  const quizQuestionsContainer = document.querySelector('[data-quiz-questions-container]');
  const quizForm = document.querySelector('[data-quizzes-form]');

  quizForm.dataset.quizId = quizInfo.id;

  quizInfo.questions.forEach(question => {
    const questionElement = createQuestionElement(question);
    quizQuestionsContainer.appendChild(questionElement);
  });

  const emailQuestion = createEmailQuestion(quizInfo.questions);
  quizQuestionsContainer.appendChild(emailQuestion);
}

function createEmailQuestion(questions) {
  const quizEmailQuestionTemplate = document.querySelector("[data-quiz-email-question-template]");
  const quizEmailQuestionFragment = quizEmailQuestionTemplate.content.cloneNode(true);

  const quizEmailQuestion = quizEmailQuestionFragment.querySelector("[data-quiz-question]");
  quizEmailQuestion.dataset.quizQuestion = questions.length + 1;

  return quizEmailQuestion;
}

function createQuestionElement(question) {
  const quizQuestionTemplate = document.querySelector("[data-quiz-question-template]");
  const quizQuestionFragment = quizQuestionTemplate.content.cloneNode(true);

  const quizQuestionRow = quizQuestionFragment.querySelector("[data-quiz-question]");
  quizQuestionRow.dataset.quizQuestionId = question.id;
  quizQuestionRow.dataset.quizQuestion = question.id.charAt(question.id.length - 1);
  populateDataAttributes(question.dataAttributes, quizQuestionRow);
  if (question.optionsType === "radio") {
    quizQuestionRow.classList.add("quizzes-form__row--radio-btns");
  } else {
    quizQuestionRow.classList.add("quizzes-form__row--checkboxes");
  }

  const quizQuestionTitle = quizQuestionFragment.querySelector("[data-quiz-question-title]");
  quizQuestionTitle.textContent = question.questionText;

  const quizQuestionOptions = quizQuestionFragment.querySelector("[data-quiz-question-options]");
  if (question.optionsGridType === "two-column-grid") {
    quizQuestionOptions.classList.add("quizzes-form__options--grid--two-column", "quizzes-form__options--grid");
  } else if (question.optionsGridType === "three-column-grid") {
    quizQuestionOptions.classList.add("quizzes-form__options--grid--three-column", "quizzes-form__options--grid");
  } else {
    quizQuestionOptions.classList.add("quizzes-form__options--row-grid");
  }
  question.options.forEach(option => {
    const optionElement = createQuizQuestionOptionElement(question, option, question.optionsType, quizQuestionFragment);
    quizQuestionOptions.appendChild(optionElement);
  });

  return quizQuestionRow;
}

function createQuizQuestionOptionElement(question, option, optionsType) {
  const quizOptionTemplate = document.querySelector("[data-quiz-option-template]");
  const quizOptionFragment = quizOptionTemplate.content.cloneNode(true);

  const quizOption = quizOptionFragment.querySelector("[data-quiz-option]");
  quizOption.dataset.quizOptionId = option.id;
  populateDataAttributes(option.dataAttributes, quizOption);

  const quizOptionInput = quizOptionFragment.querySelector("input");
  quizOptionInput.value = option.optionText;
  if (optionsType === "radio") {
    quizOptionInput.type = "radio";
    quizOptionInput.classList.add("quizzes-form__input--radio-hidden");
    quizOptionInput.name = `quiz-question-${question.id}`;
    quizOptionInput.id = `quiz-option-${option.id}`;
  } else if (optionsType === "checkbox") {
    quizOptionInput.type = "checkbox";
    quizOptionInput.classList.add("quizzes-form__input--checkbox-hidden");
    quizOptionInput.name = `quiz-option-${option.id}`;
    quizOptionInput.id = `quiz-option-${option.id}`;
  }

  const quizOptionLabel = quizOptionFragment.querySelector("label");
  quizOptionLabel.htmlFor = `quiz-option-${option.id}`;
  const quizOptionLabelText = quizOptionLabel.querySelector("div");
  quizOptionLabelText.textContent = option.optionText;
  if (question.labelType === "thumbnail") {
    quizOptionLabel.classList.add("quizzes-form__label--with-thumbnail");
    const thumbnail = document.createElement("img");
    thumbnail.src = option.thumbnail.src;
    thumbnail.alt = option.thumbnail.altText;
    thumbnail.classList.add("quizzes-form__label-thumbnail");
    quizOptionLabel.insertBefore(thumbnail, quizOptionLabelText);
  } else if (question.labelType === "row") {
    quizOptionLabel.classList.add("quizzes-form__label--full-row");
  }

  return quizOption;
}

function populateDataAttributes(dataAttributes, element) {
  if (!dataAttributes) return;

  Object.entries(dataAttributes).forEach(([key, value]) => {
    element.dataset[key] = value;
  });
}


async function fetchQuizInfo(quizFileName) {
  const response = await fetch(`../${quizFileName}`);
  return await response.json();
}

// ADDITIONAL FUNCTIONS
function focusInputTextQuestion() {
  if (quizQuestions[currentQuestion].dataset.inputTextQuestion === "true") {
    quizQuestions[currentQuestion].querySelector("input").focus();
  }
}

// UTILITY FUNCTIONS
function getCSSProperty(element, property) {
  return window.getComputedStyle(element).getPropertyValue(property);
}

function isValidEmail(email) {
  //  Source: https://emailregex.com/index.html
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}