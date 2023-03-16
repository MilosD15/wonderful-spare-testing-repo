// imports
import lottieWeb from 'https://cdn.skypack.dev/lottie-web';
import ElementParallax from './ElementParallax.js';

// DOM elements
const madeWithLoveSection = document.querySelector('[data-made-with-love-section]');
const lottieAnimationWrapper = madeWithLoveSection.querySelector('[data-mvl-lottie]');
const cookRightHandElement = madeWithLoveSection.querySelector("[data-mvl-cook-right-hand]");
const mvlBgElement = madeWithLoveSection.querySelector("[data-mvl-bg]");
const mvlTreesOutsideElement = madeWithLoveSection.querySelector("[data-mvl-trees-outside]");
const mvlTableElement = madeWithLoveSection.querySelector("[data-mvl-table]");
const mvlCupcakesElement = madeWithLoveSection.querySelector("[data-mvl-cupcakes]");
const mvlCookToolElement = madeWithLoveSection.querySelector("[data-mvl-cook-tool]");

// variables
const timeBetweenLottieAnimationSequences = 1000; // milliseconds

// initiating lottie animation object
const lottieAnimation = lottieWeb.loadAnimation({
    container: lottieAnimationWrapper,
    path: './made-with-love-animation.json',
    renderer: 'svg',
    loop: false,
    autoplay: false
});

// character starts to animate once lottie animation is loaded for the first time
lottieAnimation.addEventListener("complete", () => {
    cookRightHandElement.classList.add("animate");
});

// functions
function applyAnimationDirection(direction) {
    setTimeout(() => {
        lottieAnimation.setDirection(direction);
        lottieAnimation.play();
    }, timeBetweenLottieAnimationSequences);
}

// ADD INTERSECTION OBSERVER TO START ANIMATING THINGS WHEN USER ENTERS INTO SECTION VIEW
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // play animation once user scrolls into this section
        lottieAnimation.play();

        // control animation flow (playing forward and backward)
        lottieAnimation.addEventListener("enterFrame", e => {
            if (e.totalTime === e.currentTime + 1) {
                applyAnimationDirection(-1);
            }
            if (e.currentTime === 0) {
                lottieAnimationWrapper.classList.add("hide");
                applyAnimationDirection(1);
        
                setTimeout(() => {
                    lottieAnimationWrapper.classList.remove("hide");
                }, timeBetweenLottieAnimationSequences);
            }
        });

        // don't observe anymore
        observer.unobserve(entry.target);
    });
}, {
    threshold: 0.6 // once user scrolled into 60% of the section, animation starts
});
observer.observe(madeWithLoveSection);

// parallax
const mvlBgParallax = new ElementParallax(madeWithLoveSection, mvlBgElement, { scale: 1 }, 0.25, { scale: 1.2 }, 1.75);
const mvlTreesOutsideParallax = new ElementParallax(madeWithLoveSection, mvlTreesOutsideElement, { scale: 1 }, 0.25, { scale: 1.2 }, 1.75);
const mvlTableParallax = new ElementParallax(madeWithLoveSection, mvlTableElement, { y: -4.5 }, 0.5, { y: 7.5 }, 2);
const mvlCupcakesParallax = new ElementParallax(madeWithLoveSection, mvlCupcakesElement, { y: -4.5 }, 0.5, { y: 7.5 }, 2);
const mvlCookToolParallax = new ElementParallax(madeWithLoveSection, mvlCookToolElement, { y: -4.5 }, 0.5, { y: 7.5 }, 2);

document.addEventListener("DOMContentLoaded", handleParallax);
window.addEventListener("scroll", handleParallax);

function handleParallax() {
    const currentScroll = document.documentElement.scrollTop;
  
    mvlBgParallax.apply(currentScroll);
    mvlTreesOutsideParallax.apply(currentScroll);
    mvlTableParallax.apply(currentScroll);
    mvlCupcakesParallax.apply(currentScroll);
    mvlCookToolParallax.apply(currentScroll);
  }