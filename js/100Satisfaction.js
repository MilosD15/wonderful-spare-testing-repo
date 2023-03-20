// imports
import ElementParallax from "./ElementParallax.js";
import { isSectionInViewPort } from "./additional-func.js";

if (document.querySelector("[data-100-satisfaction-section]")) {
  // DOM elements
  const hundredSatisfactionSection = document.querySelector("[data-100-satisfaction-section]");
  const hundredSatisfactionWrapper = document.querySelector("[data-100-satisfaction-wrapper]");
  const hundredSatisfactionBgElement = hundredSatisfactionSection.querySelector("[data-100-satisfaction-bg]");
  const hundredSatisfactionHandshakeElement = hundredSatisfactionSection.querySelector("[data-100-satisfaction-handshake]");

  // parallax
  const hundredSatisfactionBgParallax = new ElementParallax(hundredSatisfactionSection, hundredSatisfactionBgElement, 
    { scale: 1, x: -50, y: -50 }, 0, { scale: 1.05, x: -50, y: -50 }, 1.5);
  const hundredSatisfactionHandshakeParallax = getHandshakeParallax();
  
  function getHandshakeParallax() {
    if (window.innerWidth > 800) {
      return new ElementParallax(hundredSatisfactionSection, hundredSatisfactionHandshakeElement, { x: -50, y: -30 }, 0, { x: -50, y: -70 }, 2);
    } else if (window.innerWidth < 800 && window.innerWidth > 500) {
      return new ElementParallax(hundredSatisfactionSection, hundredSatisfactionHandshakeElement, { x: -50, y: -30 }, 0, { x: -50, y: -70 }, 2.5);
    } else {
      return new ElementParallax(hundredSatisfactionSection, hundredSatisfactionHandshakeElement, { x: -50, y: -35 }, 0, { x: -50, y: -70 }, 4);
    }
  }
  
  window.addEventListener("load", handleParallax);
  window.addEventListener("scroll", handleParallax);

  function handleParallax() {
    const currentScroll = document.documentElement.scrollTop;

    hundredSatisfactionBgParallax.apply(currentScroll);
    hundredSatisfactionHandshakeParallax.apply(currentScroll);
  }

  // lottie
  let sectionWasAlreadyInViewport = false;
  let hundredSatisfactionLottiePlayer = null;

  function addNewPlayer() {
    const player = document.createElement("dotlottie-player");
    player.classList.add("hundred-satisfaction__lottie");
    player.src = "./hundred-satisfaction.lottie";
    hundredSatisfactionWrapper.insertBefore(player, hundredSatisfactionHandshakeElement);

    player.addEventListener("ready", () => {
        player.play();
    });

    return player;
  }

  window.addEventListener("load", handleLottieAnimation);
  window.addEventListener("scroll", handleLottieAnimation);

  function handleLottieAnimation() {
    if (isSectionInViewPort(hundredSatisfactionSection) && sectionWasAlreadyInViewport === false) {
      sectionWasAlreadyInViewport = true;
      hundredSatisfactionLottiePlayer = addNewPlayer();
    }
    if (!isSectionInViewPort(hundredSatisfactionSection)) {
      hundredSatisfactionLottiePlayer?.remove();
      hundredSatisfactionLottiePlayer = null;
      sectionWasAlreadyInViewport = false;
    }
  }
}