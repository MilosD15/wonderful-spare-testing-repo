// DOM elements
const questionsContainer = document.querySelector("[data-faq-questions]");
const questionTemplate = document.querySelector("[data-faq-question-template]");

// constants
const questionThemesObjects = [
  {
    name: "mint-green",
    imgAltText: "A varnish cup character in a mint-green circle"
  },
  {
    name: "orange",
    imgAltText: "A male dentist character in an orange circle"
  },
  {
    name: "darker-pink",
    imgAltText: "A prophy character in a darker-pink circle"
  },
  {
    name: "darker-blue",
    imgAltText: "A boy character in a darker-blue circle"
  },
  {
    name: "darker-red",
    imgAltText: "A boy character in a darker-red circle"
  },
  {
    name: "lighter-green",
    imgAltText: "A male dentist character in a lighter-green circle"
  },
  {
    name: "darker-purple",
    imgAltText: "A female dentist character in a darker-purple circle"
  },
  {
    name: "lighter-blue",
    imgAltText: "A hygienist character in a lighter-blue circle"
  },
  {
    name: "lighter-pink",
    imgAltText: "A female dentist character in a lighter-pink circle"
  },
  {
    name: "yellow",
    imgAltText: "A heart character in a yellow circle"
  },
  {
    name: "lime-green",
    imgAltText: "A hygienist character in a lime-green circle"
  },
  {
    name: "lighter-purple",
    imgAltText: "A plain character in a lighter-purple circle"
  },
  {
    name: "lighter-red",
    imgAltText: "An angles blue character in a lighter-red circle"
  },
  {
    name: "neon-blue",
    imgAltText: "A male dentist character in a neon-blue circle"
  },
  {
    name: "normal-green",
    imgAltText: "A girl character in a normal-green circle"
  },
];

const randomQuestions = await getQuestions(20);
const questionObjects = composeQuestionObjects(randomQuestions, questionThemesObjects);
renderQuestions(questionObjects);


// functions
function renderQuestions(questionObjects) {
  questionObjects.forEach(questionObject => {
    const questionFragment = renderQuestion(questionObject);
    questionsContainer.appendChild(questionFragment);
  });
}

function renderQuestion(questionObject) {
  const questionFragment = questionTemplate.content.cloneNode(true);
  const questionContainer = questionFragment.querySelector("[data-faq-question]");
  const questionText = questionFragment.querySelector("[data-faq-question-btn]");
  const answerText = questionFragment.querySelector("[data-faq-answer-text]");
  const questionImg = questionFragment.querySelector("[data-faq-answer-img]");


  questionText.textContent = questionObject.question;
  answerText.innerHTML = `${questionObject.answer}<div class="faq__question-answer-shape-text"></div>`;
  questionContainer.classList.add(`faq__question--${questionObject.theme}-theme`);
  questionImg.setAttribute("src", `./images/faq-question-character-${questionObject.theme}-circle.webp`);
  questionImg.setAttribute("alt", questionObject.imgAltText);

  return questionFragment;
}

function composeQuestionObjects(randomQuestions, questionThemesObjects) {
  const questionObjects = randomQuestions.map((question, index) => {
    const questionTheme = questionThemesObjects.find((themeObj, themeObjIndex) => index % questionThemesObjects.length === themeObjIndex);
    const questionObject = {
      question: question.question,
      answer: question.answer,
      theme: questionTheme.name,
      imgAltText: questionTheme.imgAltText
    };

    return questionObject;
  });

  return questionObjects;
}

async function getQuestions(count = 5) {
  const response = await fetch("../sample-questions.json");
  const allQuestions = await response.json();

  while (allQuestions.length < count) {
    allQuestions.push(...allQuestions);
  }

  return allQuestions.slice(0, count);
}