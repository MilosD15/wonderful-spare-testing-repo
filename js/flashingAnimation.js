// DOM elements
const meetFamilySection = document.querySelector("[data-meet-family-section]");
const charactersElements = [...meetFamilySection.querySelectorAll("[data-mf-character]")];

// variables
const MIN_CHARACTERS_IN_PICTURE = 7;
const MAX_CHARACTERS_IN_PICTURE = 13;
let previousCharactersOrder = [];
const CHARACTER_POSITIONS = [
  { id: 1, position: "center" },
  { id: 2, position: "left-closer" },
  { id: 3, position: "right-closer"},
  { id: 4, position: "left-further" },
  { id: 5, position: "right-further" },
  { id: 6, position: "very-left-closer" },
  { id: 7, position: "very-right-closer" },
  { id: 8, position: "very-left-further" },
  { id: 9, position: "very-right-further" },
  { id: 10, position: "very-very-left-closer" },
  { id: 11, position: "very-very-right-closer" },
  { id: 12, position: "very-very-left-further" },
  { id: 13, position: "very-very-right-further" },
];
const CHARACTERS = [
  { 
    id: 1, 
    name: "girl", 
    forbiddenPositions: [], 
    className: "meet-family__character--girl", 
    images: ["./images/little-girl-character-1.webp", "./images/little-girl-character-2.webp", "./images/little-girl-character-3.webp"], 
    currentImageIndex: -1, 
    altText: "Girl character", 
  },
  { 
    id: 2, 
    name: "mint", 
    forbiddenPositions: [], 
    className: "meet-family__character--mint", 
    images: ["./images/mint-leaves-character-1.webp", "./images/mint-leaves-character-2.webp", "./images/mint-leaves-character-3.webp"], 
    currentImageIndex: -1, 
    altText: "Mint character", 
  },
  { 
    id: 3, 
    name: "cone", 
    forbiddenPositions: [], 
    className: "meet-family__character--cone", 
    images: ["./images/ice-cream-character-1.webp", "./images/ice-cream-character-2.webp", "./images/ice-cream-character-3.webp"], 
    currentImageIndex: -1, 
    altText: "Cone character", 
  },
  { 
    id: 4, 
    name: "boy", 
    forbiddenPositions: [], 
    className: "meet-family__character--boy", 
    images: ["./images/little-boy-character-1.webp", "./images/little-boy-character-2.webp", "./images/little-boy-character-3.webp"], 
    currentImageIndex: -1, 
    altText: "Boy character", 
  },
  { 
    id: 5, 
    name: "heart", 
    forbiddenPositions: [], 
    className: "meet-family__character--heart", 
    images: ["./images/heart-character-1.webp", "./images/heart-character-2.webp", "./images/heart-character-3.webp"], 
    currentImageIndex: -1, 
    altText: "Heart character", 
  },
  { 
    id: 6, 
    name: "bubblegum", 
    forbiddenPositions: [], 
    className: "meet-family__character--bubblegum", 
    images: ["./images/bubblegum-character-1.webp", "./images/bubblegum-character-2.webp", "./images/bubblegum-character-3.webp"], 
    currentImageIndex: -1, 
    altText: "Bubblegum character", 
  },
  { 
    id: 7, 
    name: "chocolate", 
    forbiddenPositions: [], 
    className: "meet-family__character--chocolate", 
    images: ["./images/chocolate-character-1.webp", "./images/chocolate-character-2.webp", "./images/chocolate-character-3.webp"], 
    currentImageIndex: -1, 
    altText: "Chocolate character", 
  },
  { 
    id: 8, 
    name: "cherry", 
    forbiddenPositions: [], 
    className: "meet-family__character--cherry", 
    images: ["./images/cherry-character-1.webp", "./images/cherry-character-2.webp", "./images/cherry-character-3.webp"], 
    currentImageIndex: -1, 
    altText: "Cherry character", 
  },
  { 
    id: 9, 
    name: "marshmallow", 
    forbiddenPositions: [], 
    className: "meet-family__character--marshmallow", 
    images: ["./images/marshmallow-character-1.webp", "./images/marshmallow-character-2.webp", "./images/marshmallow-character-3.webp"], 
    currentImageIndex: -1, 
    altText: "Marshmallow character", 
  },
  { 
    id: 10, 
    name: "strawberry", 
    forbiddenPositions: [], 
    className: "meet-family__character--strawberry", 
    images: ["./images/strawberry-character-1.webp", "./images/strawberry-character-2.webp", "./images/strawberry-character-3.webp"], 
    currentImageIndex: -1, 
    altText: "Strawberry character", 
  },
  { 
    id: 11, 
    name: "male-dentist", 
    forbiddenPositions: [], 
    className: "meet-family__character--male-dentist", 
    images: ["./images/dentist-male-character-1.webp", "./images/dentist-male-character-2.webp", "./images/dentist-male-character-3.webp"], 
    currentImageIndex: -1, 
    altText: "Male dentist character", 
  },
  { 
    id: 12, 
    name: "female-dentist", 
    forbiddenPositions: [], 
    className: "meet-family__character--female-dentist", 
    images: ["./images/dentist-female-character-1.webp", "./images/dentist-female-character-2.webp", "./images/dentist-female-character-3.webp"], 
    currentImageIndex: -1, 
    altText: "Female dentist character", 
  },
  { 
    id: 13, 
    name: "hygienist", 
    forbiddenPositions: [], 
    className: "meet-family__character--hygienist", 
    images: ["./images/hygienist-character-1.webp", "./images/hygienist-character-2.webp", "./images/hygienist-character-3.webp"], 
    currentImageIndex: -1, 
    altText: "Hygienist character", 
  },
  { 
    id: 14, 
    name: "smore", 
    forbiddenPositions: [], 
    className: "meet-family__character--smore", 
    images: ["./images/smore-character-1.webp", "./images/smore-character-2.webp", "./images/smore-character-3.webp"], 
    currentImageIndex: -1, 
    altText: "Smore character", 
  },
  { 
    id: 15, 
    name: "plain", 
    forbiddenPositions: [], 
    className: "meet-family__character--plain", 
    images: ["./images/plain-character-1.webp", "./images/plain-character-2.webp", "./images/plain-character-3.webp"], 
    currentImageIndex: -1, 
    altText: "Plain character", 
  },
];

// exports
export function updateTheDOM(objectsForRendering) {
  clearAllCharacters();

  objectsForRendering.forEach(obj => {
    updateCharacter(obj);
  });
}

export function chooseDifferentImageVariation(objectForRendering) {
  let imageIndex;
  do {
    imageIndex = getRandomNumber(0, objectForRendering.images.length);
  } while (imageIndex === objectForRendering.currentImageIndex)

  // console.log(objectForRendering.currentImageIndex, imageIndex);

  // update current image index of particular character
  CHARACTERS.find(({ id }) => objectForRendering.id === id).currentImageIndex = imageIndex;

  return {
    ...objectForRendering,
    imgURL: objectForRendering.images[imageIndex]
  }
}

export function getObjsForRendering(currentCharacterObjs) {
  let objectsForRendering = [];

  for (let i = 0; i < currentCharacterObjs.length; i++) {
    const correspondingObj = getObjForRendering(currentCharacterObjs[i]);
    objectsForRendering.push(correspondingObj);
  }

  return objectsForRendering;
}

export function getValidCharacters() {
  const numberOfCharactersInPicture = getRandomNumber(MIN_CHARACTERS_IN_PICTURE, MAX_CHARACTERS_IN_PICTURE + 1);
  // console.log(numberOfCharactersInPicture)

  let currentCharacters;
  do {
    const charactersIds = getRandomNumbers(numberOfCharactersInPicture, 1, CHARACTERS.length + 1);
    // console.log(charactersIds)
    const uniqueRandomPositions = getRandomNumbers(numberOfCharactersInPicture, 1, numberOfCharactersInPicture + 1);
    // console.log(uniqueRandomPositions)
    currentCharacters = formCharacterObjs(charactersIds, uniqueRandomPositions);
  } while (!checkPositionsValidity(currentCharacters) && hasSameCharacterInSamePosition(currentCharacters));

  previousCharactersOrder = currentCharacters;
  // console.log(currentCharacters)

  return currentCharacters;
}

// other functions
function updateCharacter({ className, imgURL, altText, position }) {
  const targetedElement = charactersElements.find(element => element.dataset.position === position);
  targetedElement.classList.remove("invisible");
  targetedElement.classList.add(className);

  const correspondingImage = targetedElement.querySelector("img");
  correspondingImage.src = imgURL;
  correspondingImage.alt = altText;
}

function clearAllCharacters() {
  charactersElements.forEach(element => {
    element.classList.value = '';
    element.classList.add("meet-family__character", "invisible");
  });
}

function getObjForRendering({ id, position }) {
  const targetedObject = CHARACTERS.find(character => character.id === id);
  const positionObj = CHARACTER_POSITIONS.find(positionObj => positionObj.id === position);
  return {...targetedObject, position: positionObj.position};
}

// checks if some object of given characters is in the same place as it was in the previous order
function hasSameCharacterInSamePosition(currentCharacters) {
  const smallerCharactersLength = currentCharacters.length < previousCharactersOrder.length ? currentCharacters.length : previousCharactersOrder.length;

  for (let i = 0; i < smallerCharactersLength; i++) {
    if (checkCharacterObjectsEquality(currentCharacters[i], previousCharactersOrder[i])) {
      return true;
    }
  }
  return false;
}

function checkCharacterObjectsEquality(currentCharacterObj, previousCharacterObj) {
  return (currentCharacterObj.id === previousCharacterObj.id) && (currentCharacterObj.position === previousCharacterObj.position);
}

function checkPositionsValidity(currentCharacters) {
  for (let i = 0; i < currentCharacters.length; i++) {
    if (!checkCharacterValidity(currentCharacters[i])) {
      return false;
    }
  }
  return true;
}

function checkCharacterValidity(characterObj) {
  const characterInfo = CHARACTERS.find(character => character.id === characterObj.id);
  return !characterInfo.forbiddenPositions.includes(characterObj.position);
}

function formCharacterObjs(charactersIds, uniqueRandomPositions) {
  let characterObjs = [];
  for (let i = 0; i < charactersIds.length; i++) {
    characterObjs.push({ id: charactersIds[i], position: uniqueRandomPositions[i] });
  }
  return characterObjs;
}

function getRandomNumbers(amount, min, max) {
  const randNumbers = new Set();
  while(randNumbers.size < amount) {
    const newRandNumber = getRandomNumber(min, max);
    randNumbers.add(newRandNumber);
  }
  return [...randNumbers];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}