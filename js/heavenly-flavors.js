// imports
import ElementParallax from './ElementParallax.js';
import { isSectionInViewPort } from "./additional-func.js";

// DOM elements
const heavenlyFlavorsSection = document.querySelector("[data-heavenly-flavors]");
const heavenlyFlavorsLottieContainer = heavenlyFlavorsSection.querySelector("[data-heavenly-flavors-lottie-container]");
const heavenlyFlavorsFurtherPedestal = heavenlyFlavorsSection.querySelector("[data-heavenly-flavors-further-pedestal]");
const heavenlyFlavorsCloserPedestal = heavenlyFlavorsSection.querySelector("[data-heavenly-flavors-closer-pedestal]");
const heavenlyFlavorsLottiePlayer = heavenlyFlavorsSection.querySelector("[data-heavenly-flavors-lottie]");

// lottie animation
let sectionWasAlreadyInViewport = false;
const lottieAnimationSpeed = 0.9;

function reloadPlayer(player) {
  player.load('../../heavenly-flavors.lottie');

  player.addEventListener('ready', () => {
    player.play();
    player.setSpeed(lottieAnimationSpeed);
  });
}

window.addEventListener("load", handleLottieAnimation);
window.addEventListener("scroll", handleLottieAnimation);

function handleLottieAnimation() {
  if (isSectionInViewPort(heavenlyFlavorsSection) && sectionWasAlreadyInViewport === false) {
    sectionWasAlreadyInViewport = true;
    reloadPlayer(heavenlyFlavorsLottiePlayer);
  }
  if (!isSectionInViewPort(heavenlyFlavorsSection)) {
    sectionWasAlreadyInViewport = false;
  }
}

// parallax
const heavenlyFlavorsFurtherPedestalParallax = new ElementParallax(heavenlyFlavorsSection, heavenlyFlavorsFurtherPedestal, { y: 36 }, 0, { y: -25 }, 2);
const heavenlyFlavorsCloserPedestalParallax = new ElementParallax(heavenlyFlavorsSection, heavenlyFlavorsCloserPedestal, { y: 25 }, 0, { y: -18 }, 2);

window.addEventListener("load", handleParallax);
window.addEventListener("scroll", handleParallax);

function handleParallax() {
  const currentScroll = document.documentElement.scrollTop;

  heavenlyFlavorsFurtherPedestalParallax.apply(currentScroll);
  heavenlyFlavorsCloserPedestalParallax.apply(currentScroll);
}