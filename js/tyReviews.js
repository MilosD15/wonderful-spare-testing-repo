// imports
import ElementParallax from "./ElementParallax.js";
import { isSectionInViewPort } from "./additional-func.js";

if (document.querySelector("[data-ty-reviews-section]")) {
  const tyReviewsSection = document.querySelector("[data-ty-reviews-section]");
  const tyReviewsLottiePlayer = document.querySelector("[data-ty-reviews-lottie]");

  // lottie
  let sectionWasAlreadyInViewport = false;

  function reloadPlayer(player) {
    player.load('../ty-reviews.lottie');
  
    player.addEventListener('ready', () => {
      player.play();
    });
  }

  window.addEventListener("load", handleLottieAnimation);
  window.addEventListener("scroll", handleLottieAnimation);

  function handleLottieAnimation() {
    if (isSectionInViewPort(tyReviewsSection) && sectionWasAlreadyInViewport === false) {
      sectionWasAlreadyInViewport = true;
      reloadPlayer(tyReviewsLottiePlayer);
    }
    if (!isSectionInViewPort(tyReviewsSection)) {
      sectionWasAlreadyInViewport = false;
    }
  }
}