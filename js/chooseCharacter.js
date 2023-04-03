// imports
import { isSectionInViewPort, getElementsScrollTop } from "./additional-func.js";
import ElementParallax from "./ElementParallax.js";

if (document.querySelector("[data-choose-character-section]")) {
    // DOM elements
    const chooseCharacterSection = document.querySelector("[data-choose-character-section]");
    const chooseCharacterVeryBgElement = chooseCharacterSection.querySelector("[data-cyc-very-back-bg]");
    const chooseCharacterLottiePlayer = chooseCharacterSection.querySelector("[data-cyc-lottie-player]");
    const characterRepresentations = chooseCharacterSection.querySelectorAll("[data-cyc-character-representation]");

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

    // highlight characters on mobile
    window.addEventListener("load", () => { handleCharactersHighlight() });
    window.addEventListener("scroll", () => { handleCharactersHighlight() });

    function handleCharactersHighlight(highlightPercentage = 0.3) {
        if (window.innerWidth > 1300) return;

        characterRepresentations.forEach(characterRepresentation => {
            let highlight = false;

            const scrollInsideSection = document.documentElement.scrollTop - getElementsScrollTop(characterRepresentation);
            const scrollAfterSection = scrollInsideSection + characterRepresentation.clientHeight * -1;
            const translateToEnsureCentering = (1 - highlightPercentage) / 2 * window.innerHeight * 0.5;
            if (scrollAfterSection - translateToEnsureCentering > 0 && scrollAfterSection - translateToEnsureCentering < window.innerHeight * highlightPercentage) { 
                highlight = true;
            }

            const currentState = characterRepresentation.classList.contains("highlight");

            if (highlight !== currentState) {
                if (highlight) {
                    characterRepresentation.classList.add("highlight");
                } else {
                    characterRepresentation.classList.remove("highlight");
                }
            }
        });
    }
}