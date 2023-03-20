// imports
import { limitNumberOfWords } from "./controlTextOverflow.js";
import { isSectionInViewPort } from "./additional-func.js";
import ElementParallax from "./ElementParallax.js";

// DOM elements
const chooseCharacterSection = document.querySelector("section.choose-your-character");
const chooseCharacterWrapper = chooseCharacterSection.querySelector(".wrapper");
const chooseCharacterRepresentationButtons = document.querySelectorAll(".character-representation button");
const chooseCharacterModalContainer = document.querySelector(".modal-container");
const chooseCharacterModalParagraph = chooseCharacterModalContainer.querySelector("[data-modal-description]");
const chooseCharacterCloseModalBtn = document.querySelector(".modal-container .close-btn");
const chooseCharacterRadialDarkShadow = chooseCharacterSection.querySelector(".radial-dark-shadow");

const CHOOSE_CHARACTER_SEC_CHARACTERS_INFO = [
    {
        id: 1,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum quidem amet similique exercitationem quaerat ullam cumque veritatis ea laboriosam delectus eveniet ab ipsa voluptatibus, est dicta, fuga eos aliquid dolores culpa molestias voluptate maxime! Repudiandae corrupti quaerat ducimus, amet cupiditate inventore non eum placeat sequi vero? Quis consectetur error inventore.",
        image: {
            url: {
                staticAnimation: '../images/varnish-cup-sprite.png',
                onHoverAnimation: "../images/varnish-cup-sprite.png"
            },
            altText: "A fluoride varnish cup character"
        },
        productPageLink: "../"
    },
    {
        id: 2,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ipsa voluptas quia odio omnis aspernatur nemo incidunt maiores! Ut mollitia quibusdam eos iusto dicta necessitatibus officiis, possimus debitis. Consectetur, neque?",
        image: {
            url: {
                staticAnimation: '../images/sticks-choose-sprite.png',
                onHoverAnimation: "../images/sticks-choose-sprite.png"
            },
            altText: "A fluoride varnish character"
        },
        productPageLink: "../"
    },
    {
        id: 3,
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere dolore cum itaque ducimus facilis neque sint tempora quas enim exercitationem maiores quo, nobis dicta eum praesentium accusantium eius repellat, fugit quibusdam omnis! Aut nemo, ipsam tenetur officiis vel incidunt laudantium.",
        image: {
            url: {
                staticAnimation: '../images/paste-choose-sprite.png',
                onHoverAnimation: "../images/paste-choose-sprite.png"
            },
            altText: "A prophy paste character"
        },
        productPageLink: "../"
    },
];

chooseCharacterRepresentationButtons.forEach(button => {
    button.addEventListener("click", e => {
        const characterContainer = e.target.closest(".character-representation");
        showModal(parseInt(characterContainer.dataset.id), characterContainer.dataset.position);
    });
});

window.addEventListener("resize", () => {
    checkNumOfWordsInModalParagraph();
});

chooseCharacterCloseModalBtn.addEventListener("click", () => {
    chooseCharacterModalContainer.dataset.active = false;
});

// closing the modal when a user clicks somewhere outside the modal
chooseCharacterModalContainer.addEventListener("click", e => {
    const isModal = e.target.closest(".modal");
    if (isModal) return;

    chooseCharacterModalContainer.dataset.active = false;
});

function showModal(characterId, characterPosition) {
    const characterObj = CHOOSE_CHARACTER_SEC_CHARACTERS_INFO.find(character => character.id === characterId);

    const modal = chooseCharacterModalContainer.querySelector(".modal");
    modal.dataset.id = characterObj.id;

    const description = chooseCharacterModalContainer.querySelector("[data-modal-description]");
    description.textContent = characterObj.description;

    const link = chooseCharacterModalContainer.querySelector("[data-modal-link]");
    link.href = characterObj.productPageLink;

    const staticImage = chooseCharacterModalContainer.querySelector("[data-modal-image-static-animation]");
    staticImage.src = characterObj.image.url.staticAnimation;
    staticImage.alt = characterObj.image.altText;

    const onHoverImage = chooseCharacterModalContainer.querySelector("[data-modal-image-on-hover-animation]");
    onHoverImage.src = characterObj.image.url.onHoverAnimation;
    onHoverImage.alt = characterObj.image.altText;

    chooseCharacterModalContainer.dataset.active = true;
    chooseCharacterModalContainer.dataset.characterPosition = characterPosition;

    checkNumOfWordsInModalParagraph();
}

function checkNumOfWordsInModalParagraph() {
    const modalId = parseInt(chooseCharacterModalContainer.querySelector(".modal").dataset.id);
    if (!modalId) return chooseCharacterModalParagraph.textContent;

    const paragraphContent = CHOOSE_CHARACTER_SEC_CHARACTERS_INFO.find(character => character.id === modalId).description;
    chooseCharacterModalParagraph.textContent = limitNumberOfWords(chooseCharacterModalParagraph, paragraphContent, 20);
}

// lottie animation
let sectionWasAlreadyInViewport = false;
let chooseCharacterLottiePlayer = null;

function addNewPlayer() {
    const player = document.createElement("dotlottie-player");
    player.classList.add("lottie-container");
    player.src = "./choose-your-character.lottie";
    chooseCharacterWrapper.insertBefore(player, chooseCharacterRadialDarkShadow);

    player.addEventListener("ready", () => {
        player.play();
        player.setSpeed(0.65);
    });

    return player;
}

window.addEventListener("load", handleLottieAnimation);
window.addEventListener("scroll", handleLottieAnimation);

function handleLottieAnimation() {
    if (isSectionInViewPort(chooseCharacterSection) && sectionWasAlreadyInViewport === false) {
        sectionWasAlreadyInViewport = true;
        chooseCharacterLottiePlayer = addNewPlayer();
    }
    if (!isSectionInViewPort(chooseCharacterSection)) {
        chooseCharacterLottiePlayer?.remove();
        chooseCharacterLottiePlayer = null;
        sectionWasAlreadyInViewport = false;
    }
}

// parallax
const chooseCharacterVeryBgElement = chooseCharacterSection.querySelector(".bg .very-back");

const chooseCharacterVeryBgElementParallax = new ElementParallax(chooseCharacterSection, chooseCharacterVeryBgElement, { scale: 1 }, 0, { scale: 1.24 }, 1);

window.addEventListener("load", handleParallax);
window.addEventListener("scroll", handleParallax);

function handleParallax() {
    const currentScroll = document.documentElement.scrollTop;

    chooseCharacterVeryBgElementParallax.apply(currentScroll);
}