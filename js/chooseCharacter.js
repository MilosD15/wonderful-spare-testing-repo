// imports
import { isSectionInViewPort } from "./additional-func.js";
import ElementParallax from "./ElementParallax.js";

if (document.querySelector("[data-choose-character-section]")) {
    // DOM elements
    const chooseCharacterSection = document.querySelector("[data-choose-character-section]");
    const chooseCharacterVeryBgElement = chooseCharacterSection.querySelector("[data-cyc-very-back-bg]");
    const chooseCharacterLottiePlayer = chooseCharacterSection.querySelector("[data-cyc-lottie-player]");

    // lottie animation
    let sectionWasAlreadyInViewport = false;

    function reloadPlayer(player) {
        player.load('../choose-your-character.lottie');
    
        player.addEventListener('ready', () => {
            player.play();
            player.setSpeed(0.75);
        });
    }

    window.addEventListener("load", handleLottieAnimation);
    window.addEventListener("scroll", handleLottieAnimation);

    function handleLottieAnimation() {
        if (isSectionInViewPort(chooseCharacterSection) && sectionWasAlreadyInViewport === false) {
            sectionWasAlreadyInViewport = true;
            reloadPlayer(chooseCharacterLottiePlayer);
        }
        if (!isSectionInViewPort(chooseCharacterSection)) {
            sectionWasAlreadyInViewport = false;
        }
    }

    // parallax
    const chooseCharacterVeryBgElementParallax = new ElementParallax(chooseCharacterSection, chooseCharacterVeryBgElement, { scale: 1 }, 0, { scale: 1.4 }, 1.5);

    window.addEventListener("load", handleParallax);
    window.addEventListener("scroll", handleParallax);

    function handleParallax() {
        const currentScroll = document.documentElement.scrollTop;

        chooseCharacterVeryBgElementParallax.apply(currentScroll);
    }
}