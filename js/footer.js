// DOM elements
const footerElement = document.querySelector('[data-footer]');
let hue = 0;

// animate bg gradient
function animateGradient() {
    // Update hue value
    hue = (hue + 1) % 360;
    // Apply the linear gradient with the updated hue value
    footerElement.style.backgroundImage = `linear-gradient(194deg, #000000 46%, hsla(${hue}, 100%, 50%, 0.3) 58%, hsla(${(hue + 60) % 360}, 100%, 50%, 0.3) 72%)`;
}
setInterval(animateGradient, 50);

// dynamic pictures (make fade from one to another picture)
const footerChangingPictureContainer = document.querySelector('[data-footer-changing-picture]');
let currentIndex = -1;
let changingPictureInProgress = false;
const footerChangingPictures = [
  {
    src: './images/boy-character.webp',
    alt: 'A boy character',
    style: ''
  },
  {
    src: './images/cone-character.webp',
    alt: 'A cone character',
    style: ''
  },
  {
    src: './images/girl-character.webp',
    alt: 'A girl character',
    style: ''
  },
  {
    src: './images/hand-tooth.webp',
    alt: 'A hand holding a toothbrush',
    style: ''
  },
  {
    src: './images/map-picture.webp',
    alt: 'A map of the USA with the happy children\'s faces',
    style: ''
  },
  {
    src: './images/money-character.webp',
    alt: 'A money character',
    style: ''
  },
  {
    src: './images/money-pig-character.webp',
    alt: 'A pig with money character',
    style: ''
  },
  {
    src: './images/usa-flag.webp',
    alt: 'The USA flag',
    style: ''
  },
];

window.addEventListener('load', () => {
    changePicture();
});

footerChangingPictureContainer.addEventListener('click', () => {
    changePicture();
});

function changePicture() {
    if (changingPictureInProgress) return;

    const oldImg = footerChangingPictureContainer.querySelector('img');
    changingPictureInProgress = true;

    let nextIndex;
    do {
        nextIndex = getRandomNumber(0, footerChangingPictures.length);
    } while(nextIndex === currentIndex);
    const randomPicture = footerChangingPictures[nextIndex];
    currentIndex = nextIndex;
    const newImg = document.createElement('img');
    newImg.src = randomPicture.src;
    newImg.alt = randomPicture.alt;
    newImg.style = randomPicture.style;
    newImg.classList.add("footer__dynamic-img");
    footerChangingPictureContainer.appendChild(newImg);

    oldImg?.classList.remove('fade-in');
    setTimeout(() => { newImg.classList.add('fade-in'); }, 0);
    setTimeout(() => { oldImg?.remove(); changingPictureInProgress = false; }, 500);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}