import { isSectionInViewPort } from './additional-func.js';
import ElementParallax from './ElementParallax.js';

if (document.querySelector("[data-kids-love-taste-section]")) {
  const kidsLoveTasteSection = document.querySelector("[data-kids-love-taste-section]");
  const kidsLoveTasteLottiePlayer = kidsLoveTasteSection.querySelector("[data-klt-lottie-player]");
  const kidsLoveTasteCharacters = [...kidsLoveTasteSection.querySelectorAll("[data-klt-character]")];
  const kidsLoveTasteAnglesBlueCharacter = kidsLoveTasteSection.querySelector("[data-klt-angle-blue-character]");
  const kidsLoveTasteSea = kidsLoveTasteSection.querySelector("[data-klt-sea]");
  const kidsLoveTasteBeach = kidsLoveTasteSection.querySelector("[data-klt-beach]");

  // parallax
  const kidsLoveTasteCharactersParallax = kidsLoveTasteCharacters.map(character => {
    if (character.dataset.kltCharacter === "stick") {
      return new ElementParallax(kidsLoveTasteSection, character, { y: 15 }, 0, { y: 5 }, 1.5);
    }

    return new ElementParallax(kidsLoveTasteSection, character, { y: 15 }, 0, { y: 0 }, 1.5);
  });
  const kidsLoveTasteAnglesBlueCharacterParallax = new ElementParallax(kidsLoveTasteSection, kidsLoveTasteAnglesBlueCharacter, { y: -5 }, 0, { y: 7 }, 2);
  const kidsLoveTasteSeaParallax = new ElementParallax(kidsLoveTasteSection, kidsLoveTasteSea, { y: -5 }, 0, { y: 7 }, 2);
  const kidsLoveTasteBeachParallax = new ElementParallax(kidsLoveTasteSection, kidsLoveTasteBeach, { y: -5 }, 0, { y: 7 }, 2);

  window.addEventListener("load", handleParallax);
  window.addEventListener("scroll", handleParallax);

  function handleParallax() {
    const currentScroll = document.documentElement.scrollTop;

    kidsLoveTasteCharactersParallax.forEach(characterParallax => characterParallax.apply(currentScroll));
    kidsLoveTasteAnglesBlueCharacterParallax.apply(currentScroll);
    kidsLoveTasteSeaParallax.apply(currentScroll);
    kidsLoveTasteBeachParallax.apply(currentScroll);
  }

  // lottie
  let sectionWasAlreadyInViewport = false;

  function reloadPlayer(player) {
    player.load('../kids-love-the-taste.lottie');
  
    player.addEventListener('ready', () => {
      player.play();
      player.setSpeed(0.8);
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