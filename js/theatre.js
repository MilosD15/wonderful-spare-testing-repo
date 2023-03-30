import { isSectionInViewPort, getCSSPropertyValueFromRoot } from './additional-func.js';
import ElementParallax from "./ElementParallax.js";

if (document.querySelector("[data-theatre-section]")) {
  // DOM elements
  var theatreSection = document.querySelector("[data-theatre-section]");
  var theatrePeople1 = document.querySelector("[data-theatre-people-1]");
  var theatrePeople2 = document.querySelector("[data-theatre-people-2]");
  var theatrePeople3 = document.querySelector("[data-theatre-people-3]");
  var theatrePeople4 = document.querySelector("[data-theatre-people-4]");
  var theatrePeople5 = document.querySelector("[data-theatre-people-5]");
  var theatrePeople6 = document.querySelector("[data-theatre-people-6]");
  var theatrePeople7 = document.querySelector("[data-theatre-people-7]");
  var theatrePeople8 = document.querySelector("[data-theatre-people-8]");
  var theatreCharactersElements = [
    theatrePeople1,
    theatrePeople2,
    theatrePeople3,
    theatrePeople4,
    theatrePeople5,
    theatrePeople6,
    theatrePeople7,
    theatrePeople8,
  ];
  var theatreSeatsElements = [
    document.querySelector("[data-theatre-seats-1]"),
    document.querySelector("[data-theatre-seats-2]"),
    document.querySelector("[data-theatre-seats-3]"),
    document.querySelector("[data-theatre-seats-4]"),
    document.querySelector("[data-theatre-seats-5]"),
    document.querySelector("[data-theatre-seats-6]"),
    document.querySelector("[data-theatre-seats-7]"),
    document.querySelector("[data-theatre-seats-8]"),
  ];

  // parallax
  var parallaxTranslateYIndex = 3;

  var theatrePeople1Parallax = new ElementParallax(theatreSection, theatrePeople1, 
    { x: -50, y: 8 * parallaxTranslateYIndex }, 0.2, { x: -50, y: -8 * parallaxTranslateYIndex }, 1.8);
  var theatrePeople2Parallax = new ElementParallax(theatreSection, theatrePeople2,
    { x: -50, y: 7 * parallaxTranslateYIndex }, 0.2, { x: -50, y: -7 * parallaxTranslateYIndex }, 1.8);
  var theatrePeople3Parallax = new ElementParallax(theatreSection, theatrePeople3,
    { x: -50, y: 6 * parallaxTranslateYIndex }, 0.2, { x: -50, y: -6 * parallaxTranslateYIndex }, 1.8);
  var theatrePeople4Parallax = new ElementParallax(theatreSection, theatrePeople4,
    { x: -50, y: 5 * parallaxTranslateYIndex }, 0.2, { x: -50, y: -5 * parallaxTranslateYIndex }, 1.8);
  var theatrePeople5Parallax = new ElementParallax(theatreSection, theatrePeople5,
    { x: -50, y: 4 * parallaxTranslateYIndex }, 0.2, { x: -50, y: -4 * parallaxTranslateYIndex }, 1.8);
  var theatrePeople6Parallax = new ElementParallax(theatreSection, theatrePeople6,
    { x: -50, y: 3 * parallaxTranslateYIndex }, 0.2, { x: -50, y: -3 * parallaxTranslateYIndex }, 1.8);
  var theatrePeople7Parallax = new ElementParallax(theatreSection, theatrePeople7,
    { x: -50, y: 2 * parallaxTranslateYIndex }, 0.2, { x: -50, y: -2 * parallaxTranslateYIndex }, 1.8);
  var theatrePeople8Parallax = new ElementParallax(theatreSection, theatrePeople8,
    { x: -50, y: 1 * parallaxTranslateYIndex }, 0.2, { x: -50, y: -1 * parallaxTranslateYIndex }, 1.8);
  
  window.addEventListener("load", slideCharactersSeatsIn);
  window.addEventListener("load", handleParallax);
  window.addEventListener("scroll", handleParallax);

  function slideCharactersSeatsIn() {
    theatreCharactersElements.forEach(element => {
      element.classList.add("slide-in");
    });
    theatreSeatsElements.forEach(element => {
      element.classList.add("slide-in");
    });
  }

  function handleParallax() {
    const currentScroll = document.documentElement.scrollTop;

    theatrePeople1Parallax.apply(currentScroll);
    theatrePeople2Parallax.apply(currentScroll);
    theatrePeople3Parallax.apply(currentScroll);
    theatrePeople4Parallax.apply(currentScroll);
    theatrePeople5Parallax.apply(currentScroll);
    theatrePeople6Parallax.apply(currentScroll);
    theatrePeople7Parallax.apply(currentScroll);
    theatrePeople8Parallax.apply(currentScroll);
  }
}