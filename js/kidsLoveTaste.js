import { isSectionInViewPort } from './additional-func.js';
import ElementParallax from './ElementParallax.js';

if (document.querySelector("[data-kids-love-taste-section]")) {
  const kidsLoveTasteSection = document.querySelector("[data-kids-love-taste-section]");
  const kidsLoveTasteLottiePlayer = kidsLoveTasteSection.querySelector("[data-klt-lottie-player]");
  const kidsLoveTasteCharacters = [...kidsLoveTasteSection.querySelectorAll("[data-klt-character]")];
  const kidsLoveTasteAnglesBlueCharacter = kidsLoveTasteSection.querySelector("[data-klt-angle-blue-character]");
  const kidsLoveTasteSea = kidsLoveTasteSection.querySelector("[data-klt-sea]");

  // parallax
  const kidsLoveTasteCharactersParallax = kidsLoveTasteCharacters.map(characterParallax => {
    return new ElementParallax(kidsLoveTasteSection, characterParallax, { y: -5 }, 0, { y: 15 }, 2);
  });
  const kidsLoveTasteAnglesBlueCharacterParallax = new ElementParallax(kidsLoveTasteSection, kidsLoveTasteAnglesBlueCharacter, { y: 15 }, 0, { y: -5 }, 2);
  const kidsLoveTasteSeaParallax = new ElementParallax(kidsLoveTasteSection, kidsLoveTasteSea, { y: 15 }, 0, { y: -3 }, 2);

  window.addEventListener("load", handleParallax);
  window.addEventListener("scroll", handleParallax);

  function handleParallax() {
    const currentScroll = document.documentElement.scrollTop;

    kidsLoveTasteCharactersParallax.forEach(characterParallax => characterParallax.apply(currentScroll));
    kidsLoveTasteAnglesBlueCharacterParallax.apply(currentScroll);
    kidsLoveTasteSeaParallax.apply(currentScroll);
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