// imports
import lottieWeb from 'https://cdn.skypack.dev/lottie-web';
import { getValidCharacters, getObjsForRendering, updateTheDOM, chooseDifferentImageVariation } from "./flashingAnimation.js";
import { getCSSPropertyValueFromRoot } from "./additional-func.js";
import ElementParallax from "./ElementParallax.js";

// DOM elements
const meetFamilySection = document.querySelector("[data-meet-family-section]");
const meetTheFamilyLottieContainer = meetFamilySection.querySelector("[data-mf-lottie]");
const handElement = meetFamilySection.querySelector("[data-mf-hand]");
const flashBg = meetFamilySection.querySelector("[data-mf-flash-bg]");
const cameraFlashElement = meetFamilySection.querySelector("[data-mf-camera-flash]");
const charactersElements = [...meetFamilySection.querySelectorAll("[data-mf-character]")];
const cameraElement = meetFamilySection.querySelector("[data-mf-camera]");
const handWrapperElement = meetFamilySection.querySelector("[data-mf-hand-wrapper]");
const greeneryElement = meetFamilySection.querySelector("[data-mf-greenery]");
const greeneryAdditionElements = [...meetFamilySection.querySelectorAll("[data-mf-greenery-addition-piece]")];
const cloudsElement = meetFamilySection.querySelector("[data-mf-clouds]");
const foggyMountains = meetFamilySection.querySelector("[data-mf-foggy-mountains]");

// lottie animation
const repeatLottieAnimationStep = 3; // e.g. if it's 3, lottie animation is animated again every third flashing
const lottieRepeatingFrames = [16, 89];
const meetTheFamilyAnimation = lottieWeb.loadAnimation({
  container: meetTheFamilyLottieContainer,
  path: '../meet-the-family.json',
  renderer: 'svg',
  loop: false,
  autoplay: false
});

// flashing animation
const flashingAnimationsDuration = parseInt(getCSSPropertyValueFromRoot("--MEET-THE-FAMILY-SEC-flashing-animations-duration") ?? 2000);
const delayBetweenSequences = 3000;
let currentAnimationId = 0;
let flashingAnimationCount = 0;

// events
$("document").ready(function() {
  handleFlashing(currentAnimationId);
  meetTheFamilyAnimation.playSegments(lottieRepeatingFrames, true);
});

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
      meetTheFamilyAnimation.playSegments(lottieRepeatingFrames, true);
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
const cloudsElementParallax = new ElementParallax(meetFamilySection, cloudsElement, { scale: 1 }, 1, { scale: 1.1 }, 1.7);
const greeneryElementParallax = new ElementParallax(meetFamilySection, greeneryElement, { y: 0 }, 1, { y: 10 }, 2);
const greeneryAdditionElementsParallax = greeneryAdditionElements.map(greeneryAdditionElement => {
  if (greeneryAdditionElement.dataset.position === "middle") {
    return new ElementParallax(meetFamilySection, greeneryAdditionElement, { x: -50, y: -15 }, 1, { x: -50, y: -4 }, 2);
  }

  return new ElementParallax(meetFamilySection, greeneryAdditionElement, { y: -15 }, 1, { y: -4 }, 2);
});
const charactersElementsParallaxes = charactersElements.map(characterElement => {
  if (characterElement.dataset.position === "canter") {
    return new ElementParallax(meetFamilySection, characterElement, { x: -50, y: 0 }, 1, { x: -50, y: 1500 }, 2);
  }

  return new ElementParallax(meetFamilySection, characterElement, { y: 0 }, 1, { y: 1500 }, 2);
});
const cameraElementParallax = new ElementParallax(meetFamilySection, cameraElement, { x: -50, y: 0 }, 1, { x: -50, y: -10 }, 2);
const handElementParallax = new ElementParallax(meetFamilySection, handWrapperElement, { y: 0 }, 1, { y: -10 }, 2);
const foggyMountainsParallax = new ElementParallax(meetFamilySection, foggyMountains, { y: 0 }, 1, { y: 6 }, 2);


$("document").ready( function() {
  handleParallax();
});

$(window).on("scroll", function() {
  handleParallax();
});

function handleParallax() {
  const currentScroll = document.documentElement.scrollTop;

  cloudsElementParallax.apply(currentScroll);
  greeneryElementParallax.apply(currentScroll);
  greeneryAdditionElementsParallax.forEach(parallax => parallax.apply(currentScroll));
  charactersElementsParallaxes.forEach(parallax => parallax.apply(currentScroll));
  cameraElementParallax.apply(currentScroll);
  handElementParallax.apply(currentScroll);
  foggyMountainsParallax.apply(currentScroll);
}