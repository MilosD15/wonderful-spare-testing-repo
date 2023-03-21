// imports
import ElementParallax from "./ElementParallax.js";
import { isSectionInViewPort } from "./additional-func.js";

if (document.querySelector("[data-additives-be-gone-section]")) {
  // DOM elements
  const additivesBeGoneSection = document.querySelector("[data-additives-be-gone-section]");
  const additivesBeGoneBgElement = additivesBeGoneSection.querySelector("[data-abg-bg]");
  const additivesBeGoneRocksElement = additivesBeGoneSection.querySelector("[data-abg-rocks]");
  const additivesBeGoneMagicianElement = additivesBeGoneSection.querySelector("[data-abg-magician]");
  const additivesBeGoneMagicElement = additivesBeGoneSection.querySelector("[data-abg-magic]");
  const additivesBeGoneAdditivesElement = additivesBeGoneSection.querySelector("[data-abg-additives]");
  const additivesBeGoneLottiePlayer = additivesBeGoneSection.querySelector("[data-abg-lottie-player]");

  // parallax
  const additivesBeGoneBgParallax = new ElementParallax(additivesBeGoneSection, additivesBeGoneBgElement, { scale: 1 }, 0, { scale: 1.1 }, 1.5);
  const additivesBeGoneRocksParallax = new ElementParallax(additivesBeGoneSection, additivesBeGoneRocksElement, { y: 4 }, 0.5, { y: -3 }, 1.5);
  const additivesBeGoneMagicianParallax = new ElementParallax(additivesBeGoneSection, additivesBeGoneMagicianElement, { y: 4 }, 0.5, { y: -3 }, 1.5);
  const additivesBeGoneMagicParallax = new ElementParallax(additivesBeGoneSection, additivesBeGoneMagicElement, { y: 4 }, 0.5, { y: -3 }, 1.5);
  const additivesBeGoneAdditivesParallax = new ElementParallax(additivesBeGoneSection, additivesBeGoneAdditivesElement, { y: 4 }, 0.5, { y: -3 }, 1.5);

  window.addEventListener("load", handleParallax);
  window.addEventListener("scroll", handleParallax);

  function handleParallax() {
    const currentScroll = document.documentElement.scrollTop;

    additivesBeGoneBgParallax.apply(currentScroll);
    additivesBeGoneRocksParallax.apply(currentScroll);
    additivesBeGoneMagicianParallax.apply(currentScroll);
    additivesBeGoneMagicParallax.apply(currentScroll);
    additivesBeGoneAdditivesParallax.apply(currentScroll);
  }

  // lottie animation
  let sectionWasAlreadyInViewport = false;
  const lottieAnimationSpeed = 0.7;

  function reloadPlayer(player) {
    player.load('../additives-be-gone.lottie');

    player.addEventListener('ready', () => {
      LottieInteractivity.create({
        player: player.getLottie(),
        mode: 'chain',
        actions: [
          {
            state: 'autoplay',
            transition: 'onComplete',
            speed: lottieAnimationSpeed,
            frames: [0, 30],
          },
          {
            type: 'loop',
            frames: [30, 36],
            speed: lottieAnimationSpeed,
            state: 'autoplay',
          },
        ],
      });
    });

    return player;
  }

  window.addEventListener("load", handleLottieAnimation);
  window.addEventListener("scroll", handleLottieAnimation);

  function handleLottieAnimation() {
    if (isSectionInViewPort(additivesBeGoneSection) && sectionWasAlreadyInViewport === false) {
      sectionWasAlreadyInViewport = true;
      reloadPlayer(additivesBeGoneLottiePlayer);
    }
    if (!isSectionInViewPort(additivesBeGoneSection)) {
      sectionWasAlreadyInViewport = false;
    }
  }
}