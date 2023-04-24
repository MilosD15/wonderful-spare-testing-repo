import { isSectionInViewPort } from './additional-func.js';
import ElementParallax from './ElementParallax.js';

if (document.querySelector("[data-kids-love-taste-section]")) {
  const kidsLoveTasteSection = document.querySelector("[data-kids-love-taste-section]");
  const kidsLoveTasteLottiePlayer = kidsLoveTasteSection.querySelector("[data-klt-lottie-player]");
  const kidsLoveTasteCharacters = [...kidsLoveTasteSection.querySelectorAll("[data-klt-character]")];
  const kidsLoveTasteAnglesBlueCharacter = kidsLoveTasteSection.querySelector("[data-klt-angle-blue-character]");
  const kidsLoveTasteSea = kidsLoveTasteSection.querySelector("[data-klt-sea]");
  const kidsLoveTasteBeach = kidsLoveTasteSection.querySelector("[data-klt-beach]");
  const kidsLoveTasteClouds = kidsLoveTasteSection.querySelector("[data-klt-clouds]");

  // parallax
  let kidsLoveTasteBeachParallax, kidsLoveTasteCloudsParallax, kidsLoveTasteAnglesBlueCharacterParallax, kidsLoveTasteSeaParallax;
  const kidsLoveTasteCharactersParallax = kidsLoveTasteCharacters.map(character => {
    if (character.dataset.kltCharacter === "stick") {
      return new ElementParallax(kidsLoveTasteSection, character, { y: 15 }, 0, { y: 5 }, 2.5);
    }

    return new ElementParallax(kidsLoveTasteSection, character, { y: 15 }, 0, { y: 1 }, 2.5);
  });
  if (window.innerWidth > 1300) {
    kidsLoveTasteAnglesBlueCharacterParallax = new ElementParallax(kidsLoveTasteSection, kidsLoveTasteAnglesBlueCharacter, { y: -5 }, 0, { y: 7 }, 2.5);
    kidsLoveTasteSeaParallax = new ElementParallax(kidsLoveTasteSection, kidsLoveTasteSea, { y: -5 }, 0, { y: 7 }, 2.5);
  } else {
    kidsLoveTasteAnglesBlueCharacterParallax = new ElementParallax(kidsLoveTasteSection, kidsLoveTasteAnglesBlueCharacter, { x: -46, y: 0 }, 0, { x: 6, y: -6 }, 3);
    kidsLoveTasteSeaParallax = new ElementParallax(kidsLoveTasteSection, kidsLoveTasteSea, { x: -24 }, 0, { x: 0 }, 3);
  }
  if (window.innerWidth > 1300) {
    kidsLoveTasteBeachParallax = new ElementParallax(kidsLoveTasteSection, kidsLoveTasteBeach, { y: -5 }, 0, { y: 7 }, 4);
  } else {
    kidsLoveTasteCloudsParallax = new ElementParallax(kidsLoveTasteSection, kidsLoveTasteClouds, { x: 50 }, 0, { x: 0 }, 4);
  }

  window.addEventListener("load", handleParallax);
  window.addEventListener("scroll", handleParallax);

  function handleParallax() {
    const currentScroll = document.documentElement.scrollTop;

    kidsLoveTasteCharactersParallax.forEach(characterParallax => characterParallax.apply(currentScroll));
    kidsLoveTasteAnglesBlueCharacterParallax.apply(currentScroll);
    kidsLoveTasteSeaParallax.apply(currentScroll);
    if (window.innerWidth > 1300) {
      kidsLoveTasteBeachParallax.apply(currentScroll);
    } else {
      kidsLoveTasteCloudsParallax.apply(currentScroll);
    }
  }

  // lottie
  let sectionWasAlreadyInViewport = false;

  function reloadPlayer(player) {
    player.load('../kids-love-the-taste.lottie');
  
    player.addEventListener('ready', () => {
      player.play();
      player.setSpeed(0.7);
    });
  }

  window.addEventListener("load", handleLottieAnimation);
  window.addEventListener("scroll", handleLottieAnimation);

  function handleLottieAnimation() {
    if (isSectionInViewPort(kidsLoveTasteSection) && sectionWasAlreadyInViewport === false) {
      reloadPlayer(kidsLoveTasteLottiePlayer);
      sectionWasAlreadyInViewport = true;
    }
    if (!isSectionInViewPort(kidsLoveTasteSection)) {
      sectionWasAlreadyInViewport = false;
    }
  }
}