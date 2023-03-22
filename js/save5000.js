// imports
import { isSectionInViewPort } from './additional-func.js';
import ElementParallax from "./ElementParallax.js";

if (document.querySelector("[data-save-5000-section]")) {
  // DOM elements
  const save5000Section = document.querySelector("[data-save-5000-section]");
  const save5000DentistCharacter = save5000Section.querySelector("[data-dentist-character]");
  const save5000HygienistCharacter = save5000Section.querySelector("[data-hygienist-character]");
  const save5000LottiePlayer = save5000Section.querySelector("[data-save-5000-lottie]");

  // lottie animation
  let sectionWasAlreadyInViewport = false;

  function reloadPlayer(player) {
    player.load('../save-5000.lottie');
  
    player.addEventListener('ready', () => {
      player.play();
    });
  }

  window.addEventListener("load", handleLottieAnimation);
  window.addEventListener("scroll", handleLottieAnimation);

  function handleLottieAnimation() {
    if (isSectionInViewPort(save5000Section) && sectionWasAlreadyInViewport === false) {
      sectionWasAlreadyInViewport = true;
      reloadPlayer(save5000LottiePlayer);
    }
    if (!isSectionInViewPort(save5000Section)) {
      sectionWasAlreadyInViewport = false;
    }
  }

  // parallax
  const [save5000DentistCharacterParallax, save5000HygienistCharacterParallax] = assignParallaxObjs();

  function assignParallaxObjs() {
    if (window.innerWidth < 1300) {
      return [
        new ElementParallax(save5000Section, save5000DentistCharacter, { y: 42 }, 0, { y: 21 }, 1.2),
        new ElementParallax(save5000Section, save5000HygienistCharacter, { y: 42 }, 0, { y: 21 }, 1.2)
      ];
    } else {
      return [
        new ElementParallax(save5000Section, save5000DentistCharacter, { y: 42 }, 0, { y: 21 }, 1),
        new ElementParallax(save5000Section, save5000HygienistCharacter, { y: 42 }, 0, { y: 21 }, 1)
      ];
    }
  }

  window.addEventListener("load", handleParallax);
  window.addEventListener("scroll", handleParallax);

  function handleParallax() {
    const currentScroll = document.documentElement.scrollTop;

    save5000DentistCharacterParallax.apply(currentScroll);
    save5000HygienistCharacterParallax.apply(currentScroll);
  }
}