// imports
import { isSectionInViewPort } from "./additional-func.js";
import ElementParallax from './ElementParallax.js';

// DOM elements
const madeWithLoveSection = document.querySelector('[data-made-with-love-section]');
const lottieAnimationWrapper = madeWithLoveSection.querySelector('[data-mvl-lottie]');
const cookRightHandElement = madeWithLoveSection.querySelector("[data-mvl-cook-right-hand]");
const mvlBgElement = madeWithLoveSection.querySelector("[data-mvl-bg]");
const mvlTableElement = madeWithLoveSection.querySelector("[data-mvl-table]");
const mvlCookToolElement = madeWithLoveSection.querySelector("[data-mvl-cook-tool]");
const mvlLottiePlayer = madeWithLoveSection.querySelector("[data-mvl-lottie]");

// lottie animation
const timeBetweenLottieAnimationSequences = 1000; // milliseconds
const lottieAnimationDuration = 2400;
let startToothHandAnimation = true;

mvlLottiePlayer.load("../made-with-love.lottie");

mvlLottiePlayer.addEventListener("ready", () => {
    handleLottieAnimation();
    mvlLottiePlayer.setSpeed(0.75);
});

mvlLottiePlayer.addEventListener("frame", e => {
    const frame = parseInt(e.detail.frame);
    if (frame === 0) {
        setTimeout(() => {
            mvlLottiePlayer.setDirection(1);
            mvlLottiePlayer.play();
            mvlLottiePlayer.classList.remove("hide");
        }, timeBetweenLottieAnimationSequences);
    }
    if (frame === 58) {
        if (startToothHandAnimation) {
            cookRightHandElement.classList.add("animate");
            startToothHandAnimation = false;
        }
        setTimeout(() => {
            mvlLottiePlayer.setDirection(-1);
            mvlLottiePlayer.play();
        }, timeBetweenLottieAnimationSequences);
        setTimeout(() => {
            mvlLottiePlayer.classList.add("hide");
        }, timeBetweenLottieAnimationSequences + lottieAnimationDuration);
    }
});

window.addEventListener("load", handleLottieAnimation);
window.addEventListener("scroll", handleLottieAnimation);

function handleLottieAnimation() {
    if (isSectionInViewPort(madeWithLoveSection)) {
        mvlLottiePlayer.play();
    }
    if (!isSectionInViewPort(madeWithLoveSection)) {
        mvlLottiePlayer.pause();
    }
}

// // initiating lottie animation object
// const lottieAnimation = lottieWeb.loadAnimation({
//     container: lottieAnimationWrapper,
//     path: './made-with-love-animation.json',
//     renderer: 'svg',
//     loop: false,
//     autoplay: false
// });

// // character starts to animate once lottie animation is loaded for the first time
// lottieAnimation.addEventListener("complete", () => {
//     cookRightHandElement.classList.add("animate");
// });

// // functions
// function applyAnimationDirection(direction) {
//     setTimeout(() => {
//         lottieAnimation.setDirection(direction);
//         lottieAnimation.play();
//     }, timeBetweenLottieAnimationSequences);
// }

// // ADD INTERSECTION OBSERVER TO START ANIMATING THINGS WHEN USER ENTERS INTO SECTION VIEW
// const observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         if (!entry.isIntersecting) return;

//         // play animation once user scrolls into this section
//         lottieAnimation.play();

//         // control animation flow (playing forward and backward)
//         lottieAnimation.addEventListener("enterFrame", e => {
//             if (e.totalTime === e.currentTime + 1) {
//                 applyAnimationDirection(-1);
//             }
//             if (e.currentTime === 0) {
//                 lottieAnimationWrapper.classList.add("hide");
//                 applyAnimationDirection(1);
        
//                 setTimeout(() => {
//                     lottieAnimationWrapper.classList.remove("hide");
//                 }, timeBetweenLottieAnimationSequences);
//             }
//         });

//         // don't observe anymore
//         observer.unobserve(entry.target);
//     });
// }, {
//     threshold: 0.6 // once user scrolled into 60% of the section, animation starts
// });
// observer.observe(madeWithLoveSection);

// parallax
const mvlBgParallax = new ElementParallax(madeWithLoveSection, mvlBgElement, { scale: 1 }, 0.25, { scale: 1.2 }, 1.75);
const mvlTableParallax = new ElementParallax(madeWithLoveSection, mvlTableElement, { y: -1.5 }, 0.5, { y: 2 }, 2);
const mvlCookToolParallax = new ElementParallax(madeWithLoveSection, mvlCookToolElement, { y: -4.5 }, 0.5, { y: 7.5 }, 2);

document.addEventListener("DOMContentLoaded", handleParallax);
window.addEventListener("scroll", handleParallax);

function handleParallax() {
    const currentScroll = document.documentElement.scrollTop;
  
    mvlBgParallax.apply(currentScroll);
    mvlTableParallax.apply(currentScroll);
    mvlCookToolParallax.apply(currentScroll);
  }