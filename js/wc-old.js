// imports
import { getCSSPropertyValueFromRoot, isSectionInViewPort } from "./additional-func.js";
import { makeHeadingCurved } from "./curvedText.js";
import ElementParallax from "./ElementParallax.js";

if (document.querySelector("[data-walking-characters-section]")) {
  // DOM elements
  var walkingCharactersSection = document.querySelector("[data-walking-characters-section]");
  var furtherCharactersContainer = walkingCharactersSection.querySelector("[data-wc-further-characters]");
  var closerCharactersContainer = walkingCharactersSection.querySelector("[data-wc-closer-characters]");
  var furtherHillsElement = walkingCharactersSection.querySelector("[data-wc-further-hills-and-lane]");
  var closerHillsElement = walkingCharactersSection.querySelector("[data-wc-closer-hills-and-lane]");
  var mountainsElement = walkingCharactersSection.querySelector("[data-wc-mountains]");
  var BushAndBoardElement = walkingCharactersSection.querySelector("[data-wc-bush-and-board]");
  var sunElement = walkingCharactersSection.querySelector("[data-wc-sun]");

  // global variables
  var furtherCharacterAnimationDuration = parseInt(getCSSPropertyValueFromRoot("--WALKING-CHARACTERS-further-walking-animation-duration"));
  var closerCharacterAnimationDuration = parseInt(getCSSPropertyValueFromRoot("--WALKING-CHARACTERS-closer-walking-animation-duration"));
  var walkingCharactersTravelDelay = 200;
  var walkingCharactersTimeBetweenWalkingSequences = 6000;
  var walkingCharactersNumberOfCharactersInCrew = 4;

  // constants
  var WALKING_ANIMATION_CHARACTERS = [
      { name: 'angles-blue' },
      { name: 'angles-yellow' },
      { name: 'tooth-walk' },
      { name: 'varnish-cup' },
      { name: 'prophy'},
      { name: 'stick'},
      { name: 'brush'}
  ];
  var WALKING_ANIMATION_POSSIBLE_ROUTES = ["first", "second", "third", "fourth", "fifth"];

  // lazy loading for images and lottie animations
  lazyLoadSectionFiles(walkingCharactersSection, 
    walkingCharactersSection.querySelectorAll("[data-lazy-loading-image]"), 
    undefined, undefined
  );

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

  window.addEventListener("load", () => {
      performIntroductoryAnimation();
      playJustCloserLaneAnimation();
  });

  function performIntroductoryAnimation() {
      const numberOfCharacters = getRandomNumber(3, walkingCharactersNumberOfCharactersInCrew + 1);
      const characters = getCharacters(numberOfCharacters);

      const {furtherCharacters, closerCharacters} = findCharactersElements(characters);
      animateCharacters(furtherCharacters, closerCharacters);
  }

  function playJustCloserLaneAnimation() {
      const numberOfCharacters = getRandomNumber(3, walkingCharactersNumberOfCharactersInCrew + 1);
      const characters = getCharacters(numberOfCharacters);
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

  function getCharacters(numberOfCharacters) {
      const characters = [];

      const charactersPositions = getUniqueRandomPositions(numberOfCharacters, 0, WALKING_ANIMATION_CHARACTERS.length);
      charactersPositions.forEach(position => {
          const character = { ...WALKING_ANIMATION_CHARACTERS[position] };
          characters.push(character);
      });

      const positions = getCharactersPositions(numberOfCharacters);
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

  // parallax
  var furtherHillsParallax = new ElementParallax(walkingCharactersSection, furtherHillsElement, { y: 0 }, 1.2, { y: 1.667 }, 1.8);
  var closerHillsParallax = new ElementParallax(walkingCharactersSection, closerHillsElement, { y: 0 }, 1.2, { y: 1.667 }, 1.8);
  var mountainsParallax = new ElementParallax(walkingCharactersSection, mountainsElement, { y: 0 }, 1.2, { y: 10 }, 1.8);
  var bushAndBoardParallax = new ElementParallax(walkingCharactersSection, BushAndBoardElement, { y: 0 }, 1.2, { y: 10 }, 1.8);

  window.addEventListener("load", handleParallax);
  window.addEventListener("scroll", handleParallax);

  function handleParallax() {
      const currentScroll = document.documentElement.scrollTop;

      furtherHillsParallax.apply(currentScroll);
      closerHillsParallax.apply(currentScroll);
      mountainsParallax.apply(currentScroll);
      bushAndBoardParallax.apply(currentScroll);
  }
}