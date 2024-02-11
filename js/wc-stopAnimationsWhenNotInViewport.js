// imports
import { getCSSPropertyValueFromRoot, isSectionInViewPort } from "./additional-func.js";
import { makeHeadingCurved } from "./curvedText.js";
import ElementParallax from "./ElementParallax.js";

// DOM elements
const walkingCharactersSection = document.querySelector("[data-walking-characters-section]");
const furtherCharactersContainer = walkingCharactersSection.querySelector("[data-wc-further-characters]");
const closerCharactersContainer = walkingCharactersSection.querySelector("[data-wc-closer-characters]");
const furtherHillsElement = walkingCharactersSection.querySelector("[data-wc-further-hills-and-lane]");
const closerHillsElement = walkingCharactersSection.querySelector("[data-wc-closer-hills-and-lane]");
const mountainsElement = walkingCharactersSection.querySelector("[data-wc-mountains]");
const BushAndBoardElement = walkingCharactersSection.querySelector("[data-wc-bush-and-board]");
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
const NUMBERS_OF_CHARACTERS = [1, 5, 4, 3, 2, 3, 5, 4, 1, 2];
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
let reloadAnimationCount = 1;
const walkingCharactersIntersectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            currentIteration = getRandomNumber(1, NUMBERS_OF_CHARACTERS.length);
            performIntroductoryAnimation(reloadAnimationCount);
            playJustCloserLaneAnimation(reloadAnimationCount);

            walkingCharactersIntersectionObserver.unobserve(walkingCharactersSection);
        } 
        else {
            reloadAnimationCount++;
            resetWalkingCharactersScene();
            console.clear();
        }
    });
}, { threshold: 0 });
walkingCharactersIntersectionObserver.observe(walkingCharactersSection);

function performIntroductoryAnimation(currentReloadAnimationCount) {
    if (currentReloadAnimationCount !== reloadAnimationCount) return;

    console.log("introAnim: ", currentIteration);

    const numberOfCharacters = NUMBERS_OF_CHARACTERS[currentIteration];
    const characters = getCharacters(numberOfCharacters, currentIteration);

    console.time("characters DOM manipulation");
    const {furtherCharacters, closerCharacters} = findCharactersElements(characters);
    animateCharacters(furtherCharacters, closerCharacters, currentReloadAnimationCount);
    console.timeEnd("characters DOM manipulation");
}

function playJustCloserLaneAnimation(currentReloadAnimationCount) {
    const closeLaneCurrentIteration = currentIteration - 1;
    console.log("closerAnim: ", closeLaneCurrentIteration);

    const numberOfCharacters = NUMBERS_OF_CHARACTERS[closeLaneCurrentIteration];
    const characters = getCharacters(numberOfCharacters, closeLaneCurrentIteration);
    const closerCharacters = findCloserCharacterElements(characters);

    setTimeout(() => {
        closerCharacters.forEach(closerCharacter => {
            animateCharacter(closerCharacter, "walk", closerCharacterAnimationDuration, currentReloadAnimationCount);
        });
    }, walkingCharactersTravelDelay);
}

function animateCharacters(furtherCharacters, closerCharacters, currentReloadAnimationCount) {
    let generalDelay = 0;
    setTimeout(() => {
        furtherCharacters.forEach(furtherCharacter => {
            animateCharacter(furtherCharacter, "walk", furtherCharacterAnimationDuration, currentReloadAnimationCount);
        });
    }, generalDelay);

    generalDelay += furtherCharacterAnimationDuration + walkingCharactersTravelDelay;
    setTimeout(() => {
        closerCharacters.forEach(closerCharacter => {
            animateCharacter(closerCharacter, "walk", closerCharacterAnimationDuration, currentReloadAnimationCount);
        });
    }, generalDelay);

    generalDelay += closerCharacterAnimationDuration;
    setTimeout(() => {
        currentIteration = currentIteration === 9 ? 0 : currentIteration + 1;
        performIntroductoryAnimation(currentReloadAnimationCount);
    }, walkingCharactersTimeBetweenWalkingSequences);
}

function animateCharacter(characterElement, toggleClass, animationDuration, currentReloadAnimationCount) {
    if (currentReloadAnimationCount !== reloadAnimationCount) return;

    characterElement.classList.add(toggleClass);

    setTimeout(() => {
        characterElement.classList.remove(toggleClass);
        characterElement.dataset.wcCharacterReserved = 'false';
    }, animationDuration);
}

function resetWalkingCharactersScene() {
    const furtherCharacters = walkingCharactersSection.querySelectorAll("[data-wc-character-reserved='true']");
    const closerCharacters = walkingCharactersSection.querySelectorAll("[data-wc-character-reserved='true']");

    furtherCharacters.forEach(furtherCharacter => {
        furtherCharacter.classList.remove("walk");
        furtherCharacter.dataset.wcCharacterReserved = 'false';
    });

    closerCharacters.forEach(closerCharacter => {
        closerCharacter.classList.remove("walk");
        closerCharacter.dataset.wcCharacterReserved = 'false';
    });
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

    // const charactersPositions = getUniqueRandomPositions(numberOfCharacters, 0, WALKING_ANIMATION_CHARACTERS.length);
    const charactersPositions = CHARACTERS_POSITIONS[currentIteration];
    charactersPositions.forEach(position => {
        const character = { ...WALKING_ANIMATION_CHARACTERS[position] };
        characters.push(character);
    });

    // const positions = getCharactersPositions(numberOfCharacters);
    const positions = CHARACTERS_ROUTES[currentIteration];
    for (let i = 0; i < numberOfCharacters; i++) {
        characters[i] = { ...characters[i], position: WALKING_ANIMATION_POSSIBLE_ROUTES[positions[i]] }
    }

    return characters;
}

function getCharactersPositions(numberOfCharacters) {
    if (numberOfCharacters === 5 || numberOfCharacters === 4) {
        return getUniqueRandomPositions(numberOfCharacters, 0, 5);
    } else if (numberOfCharacters === 3 || numberOfCharacters === 2) {
        return getUniqueRandomPositions(numberOfCharacters, 1, 4);
    } else {
        return [2];
    }
}

function getUniqueRandomPositions(count, min, max) {
    const randomPositions = new Set([]);
    while (randomPositions.size < count) {
        const randomPosition = getRandomNumber(min, max);
        randomPositions.add(randomPosition);
    }
    return [...randomPositions];
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// curved heading
const curvedHeadingIntersectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            applyCurvedText();

            observer.unobserve(entry.target);
        }
    });
}, { rootMargin: "20%" });
curvedHeadingIntersectionObserver.observe(walkingCharactersSection);

function applyCurvedText() {
    if (window.innerWidth < 1300) {
        makeHeadingCurved(document.querySelector("[data-wc-curved-heading]"), 2000, 7, [0, -10, -20]);
    } else {
        makeHeadingCurved(document.querySelector("[data-wc-curved-heading]"), 2000, 4.5, [0, -40, -80]);
    }
}

// parallax
const furtherHillsParallax = new ElementParallax(walkingCharactersSection, furtherHillsElement, { y: 0 }, 1.2, { y: 1.667 }, 1.8);
const closerHillsParallax = new ElementParallax(walkingCharactersSection, closerHillsElement, { y: 0 }, 1.2, { y: 1.667 }, 1.8);
const mountainsParallax = new ElementParallax(walkingCharactersSection, mountainsElement, { y: 0 }, 1.2, { y: 10 }, 1.8);
const bushAndBoardParallax = new ElementParallax(walkingCharactersSection, BushAndBoardElement, { y: 0 }, 1.2, { y: 10 }, 1.8);

window.addEventListener("load", handleParallax);
window.addEventListener("scroll", handleParallax);

function handleParallax() {
    if (!isSectionInViewPort(walkingCharactersSection)) return;

    const currentScroll = document.documentElement.scrollTop;

    furtherHillsParallax.apply(currentScroll);
    closerHillsParallax.apply(currentScroll);
    mountainsParallax.apply(currentScroll);
    bushAndBoardParallax.apply(currentScroll);
}

// OBSERVING DOM CHANGES
// const observer = new MutationObserver(mutationsList => {
//     // for(let mutation of mutationsList) {
//     //     console.log(mutation)
//     // }
//     console.log(count++);
// });

// const furtherCharacters = walkingCharactersSection.querySelectorAll("[data-wc-character-reserved]");
// const closerCharacters = walkingCharactersSection.querySelectorAll("[data-wc-character-reserved]");

// let count = 0;

// observer.observe(sunElement, { attributes: true });
// furtherCharacters.forEach(furtherCharacter => {
//     observer.observe(furtherCharacter, { attributes: true });
// });
// closerCharacters.forEach(closerCharacter => {
//     observer.observe(closerCharacter, { attributes: true });
// });