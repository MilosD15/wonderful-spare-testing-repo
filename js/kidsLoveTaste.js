import { isSectionInViewPort } from './additional-func.js';

if (document.querySelector("[data-kids-love-taste-section]")) {
  const kidsLoveTasteSection = document.querySelector("[data-kids-love-taste-section]");
  const kidsLoveTasteLottiePlayer = kidsLoveTasteSection.querySelector("[data-klt-lottie-player]");

  // lottie
  let sectionWasAlreadyInViewport = false;

  function reloadPlayer(player) {
    player.load('../kids-love-the-taste.lottie');
  
    player.addEventListener('ready', () => {
      player.play();
      player.setSpeed(0.9);
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