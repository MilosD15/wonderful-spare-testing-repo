// imports
import ElementParallax from './ElementParallax.js';
import { isSectionInViewPort } from "./additional-func.js";

// DOM elements
const heavenlyFlavorsSection = document.querySelector("[data-heavenly-flavors]");
const heavenlyFlavorsFurtherPedestal = heavenlyFlavorsSection.querySelector("[data-heavenly-flavors-further-pedestal]");
const heavenlyFlavorsCloserPedestal = heavenlyFlavorsSection.querySelector("[data-heavenly-flavors-closer-pedestal]");
const heavenlyFlavorsLottiePlayer = heavenlyFlavorsSection.querySelector("[data-heavenly-flavors-lottie]");

// lottie animation (the example of lottie animation that loop specific part of animation with delay between loops)
let sectionWasAlreadyInViewport = false;
const lottieAnimationSpeed = 0.9;
const delayBetweenLoops = 2000;
const lottieAnimationDuration = 2400;
const lastFrame = 72;
const frameFromWhichToStartLoop = 40;
let currentIteration = 0;

function reloadPlayer(player, thisIteration) {
  if (currentIteration > thisIteration) return;

  player.load('../heavenly-flavors.lottie');

  player.addEventListener('ready', () => {
    LottieInteractivity.create({
      player: player.getLottie(),
      mode: 'chain',
      actions: [
        {
          state: 'autoplay',
          frames: [0, lastFrame],
          speed: lottieAnimationSpeed
        }
      ],
    });

    setTimeout(() => {
      if (currentIteration > thisIteration) return;

      playSecondPartOfLottieAnimation(player);

      setInterval(() => {
        if (currentIteration > thisIteration) return;

        playSecondPartOfLottieAnimation(player)
      }, lottieAnimationDuration / 2 + delayBetweenLoops);
    }, lottieAnimationDuration + delayBetweenLoops);
  });
}

function playSecondPartOfLottieAnimation(player) {
  LottieInteractivity.create({
    player: player.getLottie(),
    mode: 'chain',
    actions: [
      {
        state: 'autoplay',
        frames: [frameFromWhichToStartLoop, lastFrame],
        speed: lottieAnimationSpeed
      },
    ],
  });
}

window.addEventListener("load", handleLottieAnimation);
window.addEventListener("scroll", handleLottieAnimation);

function handleLottieAnimation() {
  if (isSectionInViewPort(heavenlyFlavorsSection) && sectionWasAlreadyInViewport === false) {
    sectionWasAlreadyInViewport = true;
    currentIteration++;
    reloadPlayer(heavenlyFlavorsLottiePlayer, currentIteration);
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