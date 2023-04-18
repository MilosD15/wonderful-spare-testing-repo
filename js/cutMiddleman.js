// imports
import ElementParallax from "./ElementParallax.js";
import { isSectionInViewPort } from "./additional-func.js";

if (document.querySelector("[data-cut-middleman-section]")) {
  // DOM elements
  const cutMiddlemanSection = document.querySelector("[data-cut-middleman-section]");
  const cutMiddlemanSkyElement = cutMiddlemanSection.querySelector("[data-cm-sky]");
  const cutMiddlemanBgHillsElement = cutMiddlemanSection.querySelector("[data-cm-bg-hills]");
  const cutMiddlemanTreesFenceHouseElement = cutMiddlemanSection.querySelector("[data-cm-trees-fence-house]");
  const cutMiddlemanMoneyWolfElement = cutMiddlemanSection.querySelector("[data-cm-money-wolf]");
  const cutMiddlemanLottiePlayer = cutMiddlemanSection.querySelector("[data-cm-lottie-player]");
  
  // parallax
  let cutMiddlemanSkyParallax, cutMiddlemanBgHillsParallax, cutMiddlemanTreesFenceHouseParallax, cutMiddlemanMoneyWolfParallax;
  if (window.innerWidth > 1300) {
    cutMiddlemanSkyParallax = new ElementParallax(cutMiddlemanSection, cutMiddlemanSkyElement, { scale: 1 }, 0, { scale: 1.2 }, 1.5);
    cutMiddlemanBgHillsParallax = new ElementParallax(cutMiddlemanSection, cutMiddlemanBgHillsElement, { y: -10 }, 0.5, { y: 2 }, 1.5);
    cutMiddlemanTreesFenceHouseParallax = new ElementParallax(cutMiddlemanSection, cutMiddlemanTreesFenceHouseElement, { y: -5 }, 0, { y: 0 }, 1);
    cutMiddlemanMoneyWolfParallax = new ElementParallax(cutMiddlemanSection, cutMiddlemanMoneyWolfElement, { y: 12 }, 0, { y: -12 }, 2);
  } else {
    cutMiddlemanSkyParallax = new ElementParallax(cutMiddlemanSection, cutMiddlemanSkyElement, { x: -22 }, 0, { x: 0 }, 2);
    cutMiddlemanBgHillsParallax = new ElementParallax(cutMiddlemanSection, cutMiddlemanBgHillsElement, { y: 0 }, 0.4, { y: -5 }, 2);
    cutMiddlemanTreesFenceHouseParallax = new ElementParallax(cutMiddlemanSection, cutMiddlemanTreesFenceHouseElement, { x: 0 }, 0.4, { x: -28.5 }, 2);
    cutMiddlemanMoneyWolfParallax = new ElementParallax(cutMiddlemanSection, cutMiddlemanMoneyWolfElement, { y: 0 }, 0.4, { y: -6 }, 2);
  }

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

  function reloadPlayer(player) {
    player.load('../cut-out-the-middleman.lottie');
  
    player.addEventListener('ready', () => {
      player.play();
      player.setSpeed(1.5);
    });
  }

  window.addEventListener("load", handleLottieAnimation);
  window.addEventListener("scroll", handleLottieAnimation);

  function handleLottieAnimation() {
    if (isSectionInViewPort(cutMiddlemanSection) && sectionWasAlreadyInViewport === false) {
      reloadPlayer(cutMiddlemanLottiePlayer);

      setInterval(() => {
        reloadPlayer(cutMiddlemanLottiePlayer);
      }, 5000);

      sectionWasAlreadyInViewport = true;
    }
  }
}