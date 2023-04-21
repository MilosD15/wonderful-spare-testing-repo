// imports
import { getValidCharacters, getObjsForRendering, updateTheDOM, chooseDifferentImageVariation } from "./flashingAnimation.js";
import { getCSSPropertyValueFromRoot, isSectionInViewPort } from "./additional-func.js";
import ElementParallax from "./ElementParallax.js";

// DOM elements
const meetFamilySection = document.querySelector("[data-meet-family-section]");
const handElement = meetFamilySection.querySelector("[data-mf-hand]");
const flashBg = meetFamilySection.querySelector("[data-mf-flash-bg]");
const cameraFlashElement = meetFamilySection.querySelector("[data-mf-camera-flash]");
const charactersElements = [...meetFamilySection.querySelectorAll("[data-mf-character]")];
const charactersScene = meetFamilySection.querySelector("[data-mf-characters-scene]");
const cameraElement = meetFamilySection.querySelector("[data-mf-camera]");
const handWrapperElement = meetFamilySection.querySelector("[data-mf-hand-wrapper]");
const greeneryElement = meetFamilySection.querySelector("[data-mf-greenery]");
const greeneryAdditionElements = [...meetFamilySection.querySelectorAll("[data-mf-greenery-addition-piece]")];
const cloudsElement = meetFamilySection.querySelector("[data-mf-clouds]");
const foggyMountains = meetFamilySection.querySelector("[data-mf-foggy-mountains]");
const meetTheFamilyLottiePlayer = meetFamilySection.querySelector("[data-mf-lottie-player]");

// lottie animation
let sectionWasAlreadyInViewport = false;
const repeatLottieAnimationStep = 3; // e.g. if it's 3, lottie animation is animated again every third flashing
const lottieRepeatingFrames = [20, 75];
const lottieAnimationSpeed = 1.5;

function reloadPlayer(player) {
  player.load('../meet-the-family.lottie');

  player.addEventListener('ready', () => {
    LottieInteractivity.create({
      player: player.getLottie(),
      mode: 'chain',
      actions: [
        {
          state: 'autoplay',
          frames: lottieRepeatingFrames,
          speed: lottieAnimationSpeed
        }
      ],
    });
  });
}

window.addEventListener("load", handleLottieAnimationAndFlashing);
window.addEventListener("scroll", handleLottieAnimationAndFlashing);

function handleLottieAnimationAndFlashing() {
  if (isSectionInViewPort(meetFamilySection) && !sectionWasAlreadyInViewport) {
    handleFlashing(currentAnimationId);
    reloadPlayer(meetTheFamilyLottiePlayer);
    sectionWasAlreadyInViewport = true;
  }
}

// flashing animation
const flashingAnimationsDuration = parseInt(getCSSPropertyValueFromRoot("--MEET-THE-FAMILY-SEC-flashing-animations-duration") ?? 2000);
const delayBetweenSequences = 3000;
let currentAnimationId = 0;
let flashingAnimationCount = 0;

// events
handElement.addEventListener("click", () => {
  currentAnimationId++;
  removeFlashingClasses(currentAnimationId);

  setTimeout(() => {
    handleFlashing(currentAnimationId);
  }, 50);
});

// functions
function handleFlashing(animationId) {
  if (currentAnimationId > animationId) return;
  flashingAnimationCount++;

  performFlashing(animationId);

  setTimeout(() => {
    randomizeCharacters(animationId);

    // repeat lottie animation on flashing
    if (flashingAnimationCount % repeatLottieAnimationStep === 0) {
      reloadPlayer(meetTheFamilyLottiePlayer);
    }
  }, (50 * flashingAnimationsDuration) / 100);

  setTimeout(() => {
    handleFlashing(animationId);
  }, flashingAnimationsDuration + delayBetweenSequences);
}

function performFlashing(animationId) {
  if (currentAnimationId > animationId) return;

  addFlashingClasses(animationId);

  setTimeout(() => {
    removeFlashingClasses(animationId);
  }, flashingAnimationsDuration);
}

function randomizeCharacters(animationId) {
  if (currentAnimationId > animationId) return;

  const currentCharacterObjs = getValidCharacters();
  const objectsForRendering = getObjsForRendering(currentCharacterObjs);
  const finalObjectsForRendering = objectsForRendering.map(chooseDifferentImageVariation);

  // console.log(animationId);
  // console.log(finalObjectsForRendering);

  updateTheDOM(finalObjectsForRendering);
}

function removeFlashingClasses(animationId) {
  if (currentAnimationId > animationId) return;

  flashBg.classList.remove("flash");
  handElement.classList.remove("pull-trigger");
  cameraFlashElement.classList.remove("flash");
  charactersElements.forEach(character => character.classList.remove("flash"));
}

function addFlashingClasses(animationId) {
  if (currentAnimationId > animationId) return;

  flashBg.classList.add("flash");
  handElement.classList.add("pull-trigger");
  cameraFlashElement.classList.add("flash");
  charactersElements.forEach(character => character.classList.add("flash"));
}

// parallax
let cloudsElementParallax, greeneryElementParallax, greeneryAdditionElementsParallax, charactersSceneParallax, cameraElementParallax, handElementParallax, foggyMountainsParallax;
if (window.innerWidth > 1300) {
  cloudsElementParallax = new ElementParallax(meetFamilySection, cloudsElement, { scale: 1 }, 1, { scale: 1.1 }, 1.7);
  greeneryElementParallax = new ElementParallax(meetFamilySection, greeneryElement, { y: 0 }, 1, { y: 10 }, 2);
  greeneryAdditionElementsParallax = greeneryAdditionElements.map(greeneryAdditionElement => {
    if (greeneryAdditionElement.dataset.position === "middle") {
      return new ElementParallax(meetFamilySection, greeneryAdditionElement, { x: -50, y: -15 }, 1, { x: -50, y: -4 }, 2);
    }
  
    return new ElementParallax(meetFamilySection, greeneryAdditionElement, { y: -15 }, 1, { y: -4 }, 2);
  });
  charactersSceneParallax = new ElementParallax(meetFamilySection, charactersScene, { x: -50, y: 0 }, 1, { x: -50, y: 16 }, 2);
  cameraElementParallax = new ElementParallax(meetFamilySection, cameraElement, { x: -50, y: 0 }, 1, { x: -50, y: -10 }, 2);
  handElementParallax = new ElementParallax(meetFamilySection, handWrapperElement, { y: 0 }, 1, { y: -10 }, 2);
  foggyMountainsParallax = new ElementParallax(meetFamilySection, foggyMountains, { y: 0 }, 1, { y: 6 }, 2);
} else if (window.innerWidth < 1300 && window.innerWidth > 600) {
  cloudsElementParallax = new ElementParallax(meetFamilySection, cloudsElement, { scale: 1, x: 0 }, 1, { scale: 1.1, x: 5 }, 1.7);
  greeneryElementParallax = new ElementParallax(meetFamilySection, greeneryElement, { y: 0 }, 1, { y: 8 }, 2);
  greeneryAdditionElementsParallax = greeneryAdditionElements.map(greeneryAdditionElement => {
    if (greeneryAdditionElement.dataset.position === "middle") {
      return new ElementParallax(meetFamilySection, greeneryAdditionElement, { x: -50, y: -2 }, 1, { x: -50, y: 6 }, 2);
    }
  
    return new ElementParallax(meetFamilySection, greeneryAdditionElement, { y: -2 }, 1, { y: 6 }, 2);
  });
  charactersSceneParallax = new ElementParallax(meetFamilySection, charactersScene, { x: -50, y: -10 }, 1, { x: -50, y: 16 }, 2);
  cameraElementParallax = new ElementParallax(meetFamilySection, cameraElement, { x: -50, y: 0 }, 1, { x: -50, y: -10 }, 2);
  handElementParallax = new ElementParallax(meetFamilySection, handWrapperElement, { y: 0 }, 1, { y: -10 }, 2);
  foggyMountainsParallax = new ElementParallax(meetFamilySection, foggyMountains, { y: 0 }, 1, { y: 6 }, 2);
} else {
  cloudsElementParallax = new ElementParallax(meetFamilySection, cloudsElement, { scale: 1, x: 0 }, 1, { scale: 1.1, x: 5 }, 3.7);
  greeneryElementParallax = new ElementParallax(meetFamilySection, greeneryElement, { y: 0 }, 1, { y: 8 }, 4);
  greeneryAdditionElementsParallax = greeneryAdditionElements.map(greeneryAdditionElement => {
    if (greeneryAdditionElement.dataset.position === "middle") {
      return new ElementParallax(meetFamilySection, greeneryAdditionElement, { x: -50, y: -2 }, 1, { x: -50, y: 6 }, 4);
    }
  
    return new ElementParallax(meetFamilySection, greeneryAdditionElement, { y: -2 }, 1, { y: 6 }, 4);
  });
  charactersSceneParallax = new ElementParallax(meetFamilySection, charactersScene, { x: -50, y: -16 }, 1, { x: -50, y: 16 }, 4);
  cameraElementParallax = new ElementParallax(meetFamilySection, cameraElement, { x: -50, y: 0 }, 1, { x: -50, y: -10 }, 4);
  handElementParallax = new ElementParallax(meetFamilySection, handWrapperElement, { y: 0 }, 1, { y: -10 }, 4);
  foggyMountainsParallax = new ElementParallax(meetFamilySection, foggyMountains, { y: 0 }, 1, { y: 6 }, 4);
}


window.addEventListener("load", handleParallax);
window.addEventListener("scroll", handleParallax);

function handleParallax() {
  const currentScroll = document.documentElement.scrollTop;

  cloudsElementParallax.apply(currentScroll);
  greeneryElementParallax.apply(currentScroll);
  greeneryAdditionElementsParallax.forEach(parallax => parallax.apply(currentScroll));
  // charactersElementsParallaxes.forEach(parallax => parallax.apply(currentScroll));
  charactersSceneParallax.apply(currentScroll);
  cameraElementParallax.apply(currentScroll);
  handElementParallax.apply(currentScroll);
  foggyMountainsParallax.apply(currentScroll);
}