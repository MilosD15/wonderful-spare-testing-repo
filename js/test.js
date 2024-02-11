// imports
import { getCSSPropertyValueFromRoot, isSectionInViewPort } from "./additional-func.js";
// import { makeHeadingCurved } from "./curvedText.js";
// import ElementParallax from "./ElementParallax.js";

// DOM elements
const walkingCharactersSection = document.querySelector("[data-walking-characters-section]");
const furtherCharactersContainer = walkingCharactersSection.querySelector("[data-wc-further-characters]");
const closerCharactersContainer = walkingCharactersSection.querySelector("[data-wc-closer-characters]");
// const furtherHillsElement = walkingCharactersSection.querySelector("[data-wc-further-hills-and-lane]");
// const closerHillsElement = walkingCharactersSection.querySelector("[data-wc-closer-hills-and-lane]");
// const mountainsElement = walkingCharactersSection.querySelector("[data-wc-mountains]");
// const BushAndBoardElement = walkingCharactersSection.querySelector("[data-wc-bush-and-board]");
const sunElement = walkingCharactersSection.querySelector("[data-wc-sun]");

// global variables
const furtherCharacterAnimationDuration = parseInt(getCSSPropertyValueFromRoot("--WALKING-CHARACTERS-further-walking-animation-duration"));
const closerCharacterAnimationDuration = parseInt(getCSSPropertyValueFromRoot("--WALKING-CHARACTERS-closer-walking-animation-duration"));
const walkingCharactersTravelDelay = 600;
const walkingCharactersTimeBetweenWalkingSequences = 6000;
const walkingCharactersNumberOfCharactersInCrew = 5;

// constants
const WALKING_ANIMATION_CHARACTERS = [
    { name: 'angles-blue' },
    { name: 'angles-yellow' },
    { name: 'tooth-walk' },
    { name: 'varnish-cup' },
    { name: 'prophy'},
    { name: 'stick'},
    { name: 'brush'}
];
const WALKING_ANIMATION_POSSIBLE_ROUTES = ["first", "second", "third", "fourth", "fifth"];

// DEFINE 10 CHARACTER ITERATIONS
const NUMBERS_OF_CHARACTERS = [
  new Map([
    [0, 1]
  ]),
  new Map([
    [0, 5],
    [1, 1],
    [2, 4],
    [3, 3],
    [4, 2]
  ]),
  new Map([
    [0, 4],
    [1, 3],
    [2, 6],
    [3, 1]
  ]),
  new Map([
    [0, 3],
    [1, 0],
    [2, 1]
  ]),
  new Map([
    [0, 1],
    [1, 5]
  ]),
  new Map([
    [0, 6],
    [1, 4],
    [2, 2]
  ]),
  new Map([
    [0, 0],
    [1, 5],
    [2, 2],
    [3, 6],
    [4, 4]
  ]),
  new Map([
    [0, 0],
    [1, 2],
    [2, 3],
    [3, 1]
  ]),
  new Map([
    [0, 2]
  ]),
  new Map([
    [0, 0],
    [1, 2],
    [2, 3]
  ])
];
const CHARACTERS_POSITIONS = [
    [6],
    [5, 1, 4, 3, 2],
    [4, 3, 6, 1],
    [3, 0, 1],
    [0, 4],
    [6, 4, 2],
    [0, 5, 2, 6, 4],
    [0, 2, 3, 1],
    [2],
    [0, 2]
];
const CHARACTERS_ROUTES = [
    [2],
    [0, 3, 2, 1, 4],
    [3, 1, 2, 0],
    [1, 2, 3],
    [1, 2],
    [3, 1, 2],
    [2, 4, 0, 1, 3],
    [4, 1, 2, 3],
    [2],
    [2, 3]
];
let currentIteration;

// sun moving
const sunMovingIntersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            sunElement.classList.add("moving");
        } else {
            sunElement.classList.remove("moving");
        }
    });
}, { rootMargin: "20%" });
sunMovingIntersectionObserver.observe(walkingCharactersSection);

// walking characters
const walkingCharactersIntersectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            currentIteration = getRandomNumber(1, NUMBERS_OF_CHARACTERS.length - 1);
            performIntroductoryAnimation();
            playJustCloserLaneAnimation();

            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0 });
walkingCharactersIntersectionObserver.observe(walkingCharactersSection);

function performIntroductoryAnimation() {
    // console.log("currentIteration: ", currentIteration);
    // console.time("characters DOM manipulation");
    const numberOfCharacters = NUMBERS_OF_CHARACTERS[currentIteration].size;
    const characters = getCharacters(numberOfCharacters, currentIteration);
    // console.timeEnd("characters DOM manipulation");

    const {furtherCharacters, closerCharacters} = findCharactersElements(characters);
    animateCharacters(furtherCharacters, closerCharacters);
}

function playJustCloserLaneAnimation() {
    const closeLaneCurrentIteration = currentIteration - 1;
    const numberOfCharacters = NUMBERS_OF_CHARACTERS[closeLaneCurrentIteration].size;
    const characters = getCharacters(numberOfCharacters, closeLaneCurrentIteration);
    const closerCharacters = findCloserCharacterElements(characters);

    setTimeout(() => {
        closerCharacters.forEach(closerCharacter => {
            animateCharacter(closerCharacter, "walk", closerCharacterAnimationDuration);
        });
    }, walkingCharactersTravelDelay);
}

function animateCharacters(furtherCharacters, closerCharacters) {
    let generalDelay = 0;
    setTimeout(() => {
        furtherCharacters.forEach(furtherCharacter => {
            animateCharacter(furtherCharacter, "walk", furtherCharacterAnimationDuration);
        });
    }, generalDelay);

    generalDelay += furtherCharacterAnimationDuration + walkingCharactersTravelDelay;
    setTimeout(() => {
        closerCharacters.forEach(closerCharacter => {
            animateCharacter(closerCharacter, "walk", closerCharacterAnimationDuration);
        });
    }, generalDelay);

    generalDelay += closerCharacterAnimationDuration;
    setTimeout(() => {
        currentIteration = currentIteration === 8 ? 0 : currentIteration + 1;
        performIntroductoryAnimation();
    }, walkingCharactersTimeBetweenWalkingSequences);
}

function animateCharacter(characterElement, toggleClass, animationDuration) {
    characterElement.classList.add(toggleClass);

    setTimeout(() => {
        characterElement.classList.remove(toggleClass);
        characterElement.dataset.wcCharacterReserved = 'false';
    }, animationDuration);
}

function findCharactersElements(characters) {
    let furtherCharacters = [], closerCharacters = [];

    for (let i = 0; i < characters.length; i++) {
        furtherCharacters.push(findFurtherCharacterElement(characters[i]));
        closerCharacters.push(findCloserCharacterElement(characters[i]));
    }

    return { furtherCharacters, closerCharacters };
}

function findCloserCharacterElements(characters) {
    let closerCharacters = [];

    for (let i = 0; i < characters.length; i++) {
        closerCharacters.push(findCloserCharacterElement(characters[i]));
    }

    return closerCharacters;
}

function findFurtherCharacterElement(character) {
    const furtherCharacterElement = furtherCharactersContainer.querySelector(`[data-wc-character-name="${character.name}"][data-wc-character-reserved="false"]`);
    furtherCharacterElement.className = '';
    furtherCharacterElement.classList.add("walking-characters__character", "walking-characters__character--further", character.position);
    furtherCharacterElement.dataset.wcCharacterReserved = 'true';

    return furtherCharacterElement;
}

function findCloserCharacterElement(character) {
    const closerCharacterElement = closerCharactersContainer.querySelector(`[data-wc-character-name="${character.name}"][data-wc-character-reserved="false"]`);
    closerCharacterElement.className = '';
    closerCharacterElement.classList.add("walking-characters__character", "walking-characters__character--closer", character.position);
    closerCharacterElement.dataset.wcCharacterReserved = 'true';

    return closerCharacterElement;
}

function getCharacters(numberOfCharacters, currentIteration) {
    const characters = [];

    const charactersPositions = CHARACTERS_POSITIONS[currentIteration];
    charactersPositions.forEach(position => {
        const character = { ...WALKING_ANIMATION_CHARACTERS[position] };
        characters.push(character);
    });

    const positions = CHARACTERS_ROUTES[currentIteration];
    for (let i = 0; i < numberOfCharacters; i++) {
        characters[i] = { ...characters[i], position: WALKING_ANIMATION_POSSIBLE_ROUTES[positions[i]] }
    }

    return characters;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}