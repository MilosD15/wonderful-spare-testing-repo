// imports
import ElementParallax from "./ElementParallax.js";
import { isSectionInViewPort } from "./additional-func.js";

if (document.querySelector("[data-how-we-are-different-section]")) {
  // DOM elements
  const howWeAreDifferentSection = document.querySelector("[data-how-we-are-different-section]");
  const howWeAreDifferentBgElement = howWeAreDifferentSection.querySelector("[data-hwad-bg]");
  const howWeAreDifferentDrawnDifferencesElement = howWeAreDifferentSection.querySelector("[data-hwad-drawn-differences]");
  const howWeAreDifferentWrittenDifferencesElement = howWeAreDifferentSection.querySelector("[data-hwad-written-differences]");
  const howWeAreDifferentTitleFlagElement = howWeAreDifferentSection.querySelector("[data-hwad-title-flag]");
  const howWeAreDifferentHighlightsContainer = howWeAreDifferentSection.querySelector("[data-hwad-highlights-container]");
  const howWeAreDifferentCharacterCircles = howWeAreDifferentSection.querySelector("[data-hwad-character-circles]");
  const howWeAreDifferentLottiePlayer = howWeAreDifferentSection.querySelector("[data-hwad-lottie-player]");

  // parallax
  const howWeAreDifferentBgParallax = new ElementParallax(howWeAreDifferentSection, howWeAreDifferentBgElement, 
    { scale: 1, x: -50, y: -50 }, 0, { scale: 1.05, x: -50, y: -50 }, 1.5);
  const centeredContentElementsParallax = [howWeAreDifferentDrawnDifferencesElement, howWeAreDifferentWrittenDifferencesElement, 
    howWeAreDifferentTitleFlagElement, howWeAreDifferentHighlightsContainer].map(element => {
    return new ElementParallax(howWeAreDifferentSection, element, { x: -50, y: -30 }, 0, { x: -50, y: -66 }, 2);
  });
  let howWeAreDifferentLottieContainerParallax, howWeAreDifferentTitleFlagElementParallax;
  if (window.innerWidth > 1300) {
    howWeAreDifferentTitleFlagElementParallax = new ElementParallax(howWeAreDifferentSection, howWeAreDifferentTitleFlagElement, { x: -50, y: -30 }, 0, { x: -50, y: -66 }, 2);
    howWeAreDifferentLottieContainerParallax = new ElementParallax(howWeAreDifferentSection, howWeAreDifferentLottiePlayer, 
      { x: -50, y: 15 }, 0, { x: -50, y: -12 }, 2);
  } else {
    howWeAreDifferentTitleFlagElementParallax = new ElementParallax(howWeAreDifferentSection, howWeAreDifferentTitleFlagElement, { x: -50, y: -18 }, 0, { x: -50, y: -80 }, 2);
    howWeAreDifferentLottieContainerParallax = new ElementParallax(howWeAreDifferentSection, howWeAreDifferentLottiePlayer, 
      { x: -50, y: 8 }, 0, { x: -50, y: -6 }, 2);
  }
  const howWeAreDifferentCharacterCirclesParallax = new ElementParallax(howWeAreDifferentSection, howWeAreDifferentCharacterCircles,
    { y: 10 }, 0.4, { y: -6 }, 1.5);

  window.addEventListener("load", handleParallax);
  window.addEventListener("scroll", handleParallax);

  function handleParallax() {
    const currentScroll = document.documentElement.scrollTop;

    howWeAreDifferentBgParallax.apply(currentScroll);
    centeredContentElementsParallax.forEach(element => element.apply(currentScroll));
    howWeAreDifferentLottieContainerParallax.apply(currentScroll);
    howWeAreDifferentCharacterCirclesParallax.apply(currentScroll);
    howWeAreDifferentTitleFlagElementParallax.apply(currentScroll);
  }

  // lottie
  let sectionWasAlreadyInViewport = false;

  function reloadPlayer(player) {
    player.load('../how-we-are-different.lottie');
  
    player.addEventListener('ready', () => {
      player.play();
    });
  }

  // window.addEventListener("load", repeatLottieAnimation);
  window.addEventListener("load", handleLottieAnimation);
  window.addEventListener("scroll", handleLottieAnimation);

  function handleLottieAnimation() {
    if (isSectionInViewPort(howWeAreDifferentSection) && sectionWasAlreadyInViewport === false) {
      sectionWasAlreadyInViewport = true;
      reloadPlayer(howWeAreDifferentLottiePlayer);
    }
    if (!isSectionInViewPort(howWeAreDifferentSection)) {
      sectionWasAlreadyInViewport = false;
    }
  }

  // function repeatLottieAnimation() {
  //   setInterval(() => {
  //     if (!isSectionInViewPort(howWeAreDifferentSection)) return;

  //     howWeAreDifferentLottie.goToAndPlay(0, true);
  //   }, 10000);
  // }
}