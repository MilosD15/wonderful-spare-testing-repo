// imports
import lottieWeb from 'https://cdn.skypack.dev/lottie-web';
import ElementParallax from "./ElementParallax.js";
import { isSectionInViewPort } from "./additional-func.js";

if (document.querySelector("[data-cut-middleman-section]")) {
  // DOM elements
  const cutMiddlemanSection = document.querySelector("[data-cut-middleman-section]");
  const cutMiddlemanWrapper = cutMiddlemanSection.querySelector("[data-cm-wrapper]");
  const cutMiddlemanSkyElement = cutMiddlemanSection.querySelector("[data-cm-sky]");
  const cutMiddlemanBgHillsElement = cutMiddlemanSection.querySelector("[data-cm-bg-hills]");
  const cutMiddlemanTreesFenceHouseElement = cutMiddlemanSection.querySelector("[data-cm-trees-fence-house]");
  const cutMiddlemanMoneyWolfElement = cutMiddlemanSection.querySelector("[data-cm-money-wolf]");

  // parallax
  const cutMiddlemanSkyParallax = new ElementParallax(cutMiddlemanSection, cutMiddlemanSkyElement, { scale: 1 }, 0, { scale: 1.2 }, 1.5);
  const cutMiddlemanBgHillsParallax = new ElementParallax(cutMiddlemanSection, cutMiddlemanBgHillsElement, { y: -10 }, 0.5, { y: 2 }, 1.5);
  const cutMiddlemanTreesFenceHouseParallax = new ElementParallax(cutMiddlemanSection, cutMiddlemanTreesFenceHouseElement, { y: -5 }, 0, { y: 0 }, 1);
  const cutMiddlemanMoneyWolfParallax = new ElementParallax(cutMiddlemanSection, cutMiddlemanMoneyWolfElement, { y: 12 }, 0, { y: -12 }, 2);

  window.addEventListener("load", handleParallax);
  window.addEventListener("scroll", handleParallax);

  function handleParallax() {
    const currentScroll = document.documentElement.scrollTop;

    cutMiddlemanSkyParallax.apply(currentScroll);
    cutMiddlemanBgHillsParallax.apply(currentScroll);
    cutMiddlemanTreesFenceHouseParallax.apply(currentScroll);
    cutMiddlemanMoneyWolfParallax.apply(currentScroll);
  }

  // lottie
  let sectionWasAlreadyInViewport = false;
  let cutMiddlemanLottiePlayer = null;

  function addNewPlayer() {
    const player = document.createElement("dotlottie-player");
    player.classList.add("cut-middleman__lottie");
    player.src = "./cut-out-the-middleman.lottie";
    cutMiddlemanWrapper.insertBefore(player, cutMiddlemanMoneyWolfElement);

    player.addEventListener("ready", () => {
      player.play();
      player.setSpeed(0.8);
    });

    return player;
  }

  window.addEventListener("load", handleLottieAnimation);
  window.addEventListener("scroll", handleLottieAnimation);

  function handleLottieAnimation() {
    if (isSectionInViewPort(cutMiddlemanSection) && sectionWasAlreadyInViewport === false) {
      cutMiddlemanLottiePlayer = addNewPlayer();

      setInterval(() => {
        cutMiddlemanLottiePlayer?.remove();
        cutMiddlemanLottiePlayer = addNewPlayer();
      }, 5000);

      sectionWasAlreadyInViewport = true;
    }
  }
}