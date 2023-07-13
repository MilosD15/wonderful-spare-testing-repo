// DOM elements
const footerElement = document.querySelector('[data-footer]');
let hue = 0;

// animate bg gradient
function animateGradient() {
    // Update hue value
    hue = (hue + 1) % 360;
    // Apply the linear gradient with the updated hue value
    footerElement.style.backgroundImage = `linear-gradient(to bottom left, #000000 50%, hsla(${hue}, 100%, 50%, 0.7))`;
}
setInterval(animateGradient, 50);

// dynamic pictures (make fade from one to another picture)
let currentIndex = 1;
const pictures = [
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

function changePicture() {
    const pictureElement = document.querySelector('[data-footer-picture]');
    const oldImg = pictureElement.querySelector('img');

    const nextIndex = (currentIndex + 1) % pictures.length;
    const randomPicture = pictures[nextIndex];
    currentIndex = nextIndex;
    const newImg = document.createElement('img');
    newImg.src = randomPicture.src;
    newImg.alt = randomPicture.alt;
    newImg.style = randomPicture.style;
    newImg.classList.add("footer__dynamic-img");
    pictureElement.appendChild(newImg);

    oldImg.classList.remove('fade-in');
    setTimeout(() => { newImg.classList.add('fade-in'); }, 0);
    setTimeout(() => { oldImg.remove(); }, 500);
}
setInterval(changePicture, 6000);