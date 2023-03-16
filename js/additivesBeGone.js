// imports
import lottieWeb from 'https://cdn.skypack.dev/lottie-web';
import ElementParallax from "./ElementParallax.js";
import { isSectionInViewPort } from "./additional-func.js";

if (document.querySelector("[data-additives-be-gone-section]")) {
  // DOM elements
  const additivesBeGoneSection = document.querySelector("[data-additives-be-gone-section]");
  const additivesBeGoneWrapper = additivesBeGoneSection.querySelector("[data-additives-be-gone-wrapper]");
  const additivesBeGoneBgElement = additivesBeGoneSection.querySelector("[data-abg-bg]");
  const additivesBeGoneRocksElement = additivesBeGoneSection.querySelector("[data-abg-rocks]");
  const additivesBeGoneMagicianElement = additivesBeGoneSection.querySelector("[data-abg-magician]");
  const additivesBeGoneMagicElement = additivesBeGoneSection.querySelector("[data-abg-magic]");
  const additivesBeGoneAdditivesElement = additivesBeGoneSection.querySelector("[data-abg-additives]");
  // const additivesBeGoneLottiePlayer = additivesBeGoneSection.querySelector("[data-abg-lottie-player]");

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
  let lottieAnimationsState = "active";
  let additivesBeGoneLottiePlayer;

  function addNewPlayer() {
    const player = document.createElement("dotlottie-player");
    player.classList.add("additives-be-gone__lottie-animation");
    player.dataset.abgLottiePlayer = true;
    player.src = "./additives-be-gone.lottie";
    additivesBeGoneWrapper.insertBefore(player, additivesBeGoneRocksElement);

    player.addEventListener("ready", () => {
      player.toggleLooping();
      player.play();
      player.setSpeed(0.8);
    });
  
    player.addEventListener("frame", e => {
      const frame = parseInt(e.detail.frame);
      if (frame === 36) {
        if (lottieAnimationsState !== "active") return;
  
        player.seek(30);
      }
    });

    return player;
  }

  window.addEventListener("load", handleLottieAnimation);
  window.addEventListener("scroll", handleLottieAnimation);

  function handleLottieAnimation() {
    if (isSectionInViewPort(additivesBeGoneSection) && sectionWasAlreadyInViewport === false) {
      sectionWasAlreadyInViewport = true;
      lottieAnimationsState = "active";
      additivesBeGoneLottiePlayer = addNewPlayer();
    }
    if (!isSectionInViewPort(additivesBeGoneSection)) {
      additivesBeGoneLottiePlayer?.remove();
      sectionWasAlreadyInViewport = false;
      lottieAnimationsState = "inactive";
    }
  }
}