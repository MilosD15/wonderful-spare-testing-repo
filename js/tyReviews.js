// imports
import ElementParallax from "./ElementParallax.js";
import { isSectionInViewPort, getCSSPropertyValueFromRoot } from "./additional-func.js";

if (document.querySelector("[data-ty-reviews-section]")) {
  const tyReviewsSection = document.querySelector("[data-ty-reviews-section]");
  const tyReviewsLottiePlayer = document.querySelector("[data-ty-reviews-lottie]");
  const tyReviewsCharacters = [...tyReviewsSection.querySelectorAll("[data-ty-reviews-character]")];

  // variables
  // const tyReviewsCharacterTransitionDuration = 
  // parseInt(getCSSPropertyValueFromRoot("--TY-REVIEWS-SEC-character-transition-duration"));
  // const tyReviewsCharacterTransitionDelayStep = 
  // parseInt(getCSSPropertyValueFromRoot("--TY-REVIEWS-SEC-character-transition-delay-step"));
  
  // animate characters
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      charactersSpringUp();
      makeCharactersVibrate();

      // setTimeout(() => {
      //   makeCharactersVibrate();
      // }, tyReviewsCharacterTransitionDuration + tyReviewsCharacterTransitionDelayStep * 2);

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.8 });
  observer.observe(tyReviewsSection);

  function charactersSpringUp() {
    tyReviewsCharacters.forEach(character => {
      character.classList.add("animate");
    });
  }

  function makeCharactersVibrate() {
    tyReviewsCharacters.forEach((character, index) => {
      character.classList.add("vibrate");

      const module = index % 4 === 0 ? 4 : index % 4;
      character.classList.add(`vibrate--version-${module}`);
    });
  }

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