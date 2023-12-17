const contactTerminalWindow = document.querySelector("[data-contact-terminal-window]");
const contactTerminalWindowWrapper = document.querySelector("[data-contact-terminal-window-wrapper]");

window.addEventListener("load", () => {
  resetTerminal();
});

document.addEventListener("click", e => {
  if (allQuestionsCompleted()) return;

  if (e.target.closest("[data-contact-terminal-window]")) {
    focusCurrentLine();
  } else {
    blurCurrentLine();
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Enter" && e.target.dataset.finalButton === "true") return;
  
  if (e.key === "Enter" && e.target.closest("[data-contact-terminal-window]")) {
    e.preventDefault();

    const currentLine = document.querySelector("[data-current-line]");
    const inputElement = currentLine.querySelector("[data-input-field]");
    const input = inputElement.textContent.trim();

    if (input) {
      const pieceOfData = inputElement.dataset.pieceOfData;
      const isValid = validateInput(input, pieceOfData);
      const currentQuestion = QUESTIONS_DATA.find(q => q.key === pieceOfData);

      if (isValid === true) {
        printSuccessInput(input);
        currentQuestion.complete = true;
      } else {
        printError(isValid, input);
      }

      currentLine.remove();

      if (currentQuestion.complete) {
        currentQuestion.value = input;

        if (currentQuestion.index === QUESTIONS_DATA.length - 1) {
          printSummary(QUESTIONS_DATA);
          printFinalButtons();
        } else {
          const nextQuestion = QUESTIONS_DATA[currentQuestion.index + 1];
          printQuestion(nextQuestion.previousSuccessText, nextQuestion.highlighted);
          createCurrentLine(nextQuestion.key);
          focusCurrentLine();
        }
      } else {
        printQuestion(currentQuestion.previousErrorText, currentQuestion.highlighted);
        createCurrentLine(currentQuestion.key);
        focusCurrentLine();
      }
    }
  }
});

function focusCurrentLine() {
  const inputElement = document.querySelector("[data-current-line] [data-input-field]");
  inputElement.focus();

  // Set the cursor to the end of the input field
  const range = document.createRange();
  range.selectNodeContents(inputElement);
  range.collapse(false); // false collapses the range to its end
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  if (contactTerminalWindow.querySelector(".cursor-gutter")) return;

  const currentLine = document.querySelector("[data-current-line]");
  const cursorGutter = document.createElement("span");
  cursorGutter.classList.add("cursor-gutter");
  currentLine.appendChild(cursorGutter);
}

function blurCurrentLine() {
  const currentLine = contactTerminalWindow.querySelector("[data-current-line]");
  const cursorGutter = contactTerminalWindow.querySelector(".cursor-gutter");
  const inputElement = currentLine.querySelector("[data-input-field]");

  inputElement.blur();
  cursorGutter?.remove();
}

function createCurrentLine(pieceOfData) {
  const currentLine = document.createElement("p");
  currentLine.classList.add("p-input");
  currentLine.setAttribute("data-current-line", "");
  currentLine.innerHTML = `
    <span class="green-detail">➜</span>
    <span class="blue-detail">~</span>
    <span class="text">Enter ${pieceOfData}: </span>
    <span class="input-field" data-input-field contenteditable="true" spellcheck="false" data-piece-of-data="${pieceOfData}"></span>
  `;
  contactTerminalWindowWrapper.appendChild(currentLine);
}

function printError(error, input) {
  const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 -960 960 960"><path d="m480-424 116 116q11 11 28 11t28-11q11-11 11-28t-11-28L536-480l116-116q11-11 11-28t-11-28q-11-11-28-11t-28 11L480-536 364-652q-11-11-28-11t-28 11q-11 11-11 28t11 28l116 116-116 116q-11 11-11 28t11 28q11 11 28 11t28-11l116-116Zm0 344q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;
  const invalidValueText = `<span class="input">${input}</span>`;

  const invalidValueElement = document.createElement("p");
  invalidValueElement.classList.add("post-error");
  invalidValueElement.innerHTML = `${errorIcon}${invalidValueText}`;
  contactTerminalWindowWrapper.appendChild(invalidValueElement);

  const errorTextElement = document.createElement("p");
  errorTextElement.classList.add("error");
  errorTextElement.innerHTML = `Error: <span class="value">${error}</span>`;
  contactTerminalWindowWrapper.appendChild(errorTextElement);

  scrollToBottom();
}

function printSuccessInput(input) {
  const checkMark = `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 -960 960 960"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"/></svg>`;
  const successValueText = `<span class="input">${input}</span>`;

  const successValueElement = document.createElement("p");
  successValueElement.classList.add("post-success");
  successValueElement.innerHTML = `${checkMark}${successValueText}`;
  contactTerminalWindowWrapper.appendChild(successValueElement);

  scrollToBottom();
}

function printIntroMessage() {
  const introMessage = document.createElement("p");
  introMessage.textContent = "Hey there! We're excited to link 🔗";

  const divider = document.createElement("p");
  divider.classList.add("divider");
  divider.textContent = "------------------------------------------------------------------------";

  contactTerminalWindowWrapper.appendChild(introMessage);
  contactTerminalWindowWrapper.appendChild(divider);

  scrollToBottom();
}

function printSummary(data) {
  printQuestion("Beautiful! Here's what we've got: ");
  
  // summary of the data entered
  data.forEach(({ key, value }) => {
    const pairWrapper = document.createElement("p");

    const keyElement = document.createElement("span");
    keyElement.classList.add("summary-blue");
    keyElement.textContent = `${key}: `;

    const valueElement = document.createElement("span");
    valueElement.textContent = value;

    pairWrapper.appendChild(keyElement);
    pairWrapper.appendChild(valueElement);
    contactTerminalWindowWrapper.appendChild(pairWrapper);
  });

  printQuestion("Look good? ");

  scrollToBottom();
}

function printFinalButtons() {
  const buttonsWrapper = document.createElement("div");
  buttonsWrapper.classList.add("final-buttons-container");

  const restartButton = document.createElement("button");
  restartButton.classList.add("final-btn", "final-btn--restart", "main-btn");
  restartButton.setAttribute("data-final-button", "true");
  restartButton.textContent = "Restart";
  restartButton.addEventListener("click", () => {
    resetTerminal();
  });

  const sendButton = document.createElement("button");
  sendButton.classList.add("final-btn", "final-btn--send", "main-btn");
  sendButton.setAttribute("data-final-button", "true");
  sendButton.textContent = "Send it!";
  sendButton.addEventListener("click", () => {
    buttonsWrapper.remove();
    printSuccessInput("Sent! We'll get back to you ASAP 😎");

    // console.log all the data gathered
    console.log(QUESTIONS_DATA.reduce((acc, val) => {
      return { ...acc, [val.key]: val.value };
    }, {}));

    // const emailValue = QUESTIONS_DATA.find(q => q.key === "email").value;
    // const nameValue = QUESTIONS_DATA.find(q => q.key === "name").value;
    // const descriptionValue = QUESTIONS_DATA.find(q => q.key === "description").value;

    // postDataToServer(emailValue, nameValue, descriptionValue);
  });

  buttonsWrapper.appendChild(restartButton);
  buttonsWrapper.appendChild(sendButton);
  contactTerminalWindowWrapper.appendChild(buttonsWrapper);
  
  scrollToBottom();
  sendButton.focus();
}

function postDataToServer(emailValue, nameValue, descriptionValue) {
  const contactForm = document.querySelector("[data-contact-section] #contact-us-form");
  const emailField = contactForm.querySelector("[data-email-field]");
  const nameField = contactForm.querySelector("[data-name-field]");
  const descriptionField = contactForm.querySelector("[data-description-field]");

  emailField.value = emailValue;
  nameField.value = nameValue;
  descriptionField.value = descriptionValue;

  contactForm.submit();
}

function scrollToBottom() {
  contactTerminalWindow.scrollTop = contactTerminalWindow.scrollHeight;
}

function resetTerminal() {
  contactTerminalWindowWrapper.innerHTML = "";
  printIntroMessage();
  QUESTIONS_DATA.forEach(q => q.complete = false);
  QUESTIONS_DATA.forEach(q => q.value = "");
  const currentQuestion = QUESTIONS_DATA[0];
  printQuestion(currentQuestion.previousSuccessText, currentQuestion.highlighted);
  createCurrentLine(currentQuestion.key);
  setTimeout(() => {
    focusCurrentLine();
  }, 0);
}

function printQuestion(question, emphasizedText = undefined) {
  const questionElement = document.createElement("p");
  if (emphasizedText) {
    questionElement.innerHTML = `${question} <span class="post-highlighting">${emphasizedText}</span>`;
  } else {
    questionElement.textContent = question;
  }
  contactTerminalWindowWrapper.appendChild(questionElement);

  scrollToBottom();
}

function validateInput(input, pieceOfData) {
  const validation = QUESTIONS_DATA.find(q => q.key === pieceOfData).validation;

  if (!validation.length) return true;

  for (const { type, message } of validation) {
    if (type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input)) return message;
    }
  }

  return true;
}

function allQuestionsCompleted() {
  return QUESTIONS_DATA.every(q => q.complete);
}

const QUESTIONS_DATA = [
  {
    index: 0,
    key: "email",
    previousSuccessText: "To start, could you give us ",
    previousErrorText: "Could you try again with ",
    highlighted: "your email?",
    validation: [
      {
        type: "email",
        message: "Please enter a valid email address.",
      },
    ],
    value: "",
    complete: false,
  },
  {
    index: 1,
    key: "name",
    previousSuccessText: "Awesome! And what's ",
    previousErrorText: "Let's try that again. What's ",
    highlighted: "your name?",
    validation: [],
    value: "",
    complete: false,
  },
  {
    index: 2,
    key: "description",
    previousSuccessText: "Perfect, and",
    previousErrorText: "Could you tell us again ",
    highlighted: "how can we help you?",
    validation: [],
    value: "",
    complete: false,
  },
];
