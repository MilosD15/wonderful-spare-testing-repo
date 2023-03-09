// imports
import lottieWeb from 'https://cdn.skypack.dev/lottie-web';
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
  const howWeAreDifferentLottieContainer = howWeAreDifferentSection.querySelector("[data-hwad-lottie-container]");

  // parallax
  const howWeAreDifferentBgParallax = new ElementParallax(howWeAreDifferentSection, howWeAreDifferentBgElement, 
    { scale: 1, x: -50, y: -50 }, 0, { scale: 1.05, x: -50, y: -50 }, 1.5);
  const centeredContentElementsParallax = [howWeAreDifferentDrawnDifferencesElement, howWeAreDifferentWrittenDifferencesElement, 
    howWeAreDifferentTitleFlagElement, howWeAreDifferentHighlightsContainer].map(element => {
    return new ElementParallax(howWeAreDifferentSection, element, { x: -50, y: -30 }, 0, { x: -50, y: -66 }, 2);
  });
  const howWeAreDifferentLottieContainerParallax = new ElementParallax(howWeAreDifferentSection, howWeAreDifferentLottieContainer, 
    { x: -50, y: 80 }, 0, { x: -50, y: -64 }, 2);

  window.addEventListener("load", handleParallax);
  window.addEventListener("scroll", handleParallax);

  function handleParallax() {
    const currentScroll = document.documentElement.scrollTop;

    howWeAreDifferentBgParallax.apply(currentScroll);
    centeredContentElementsParallax.forEach(element => element.apply(currentScroll));
    howWeAreDifferentLottieContainerParallax.apply(currentScroll);
  }

  // lottie
  let sectionWasAlreadyInViewport = false;

  const howWeAreDifferentLottie = lottieWeb.loadAnimation({
    container: howWeAreDifferentLottieContainer,
    path: '../how-we-are-different.json',
    renderer: 'svg',
    loop: false,
    autoplay: false
  });

  // window.addEventListener("load", repeatLottieAnimation);
  window.addEventListener("load", handleLottieAnimation);
  window.addEventListener("scroll", handleLottieAnimation);

  function handleLottieAnimation() {
    if (isSectionInViewPort(howWeAreDifferentSection) && sectionWasAlreadyInViewport === false) {
      sectionWasAlreadyInViewport = true;
      howWeAreDifferentLottie.goToAndPlay(0, true);
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