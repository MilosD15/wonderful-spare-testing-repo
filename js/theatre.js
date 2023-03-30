import { isSectionInViewPort } from './additional-func.js';
import ElementParallax from "./ElementParallax.js";

if (document.querySelector("[data-theatre-section]")) {
  // DOM elements
  const theatreSection = document.querySelector("[data-theatre-section]");
  const theatrePeople1 = document.querySelector("[data-theatre-people-1]");
  const theatrePeople2 = document.querySelector("[data-theatre-people-2]");
  const theatrePeople3 = document.querySelector("[data-theatre-people-3]");
  const theatrePeople4 = document.querySelector("[data-theatre-people-4]");
  const theatrePeople5 = document.querySelector("[data-theatre-people-5]");
  const theatrePeople6 = document.querySelector("[data-theatre-people-6]");
  const theatrePeople7 = document.querySelector("[data-theatre-people-7]");
  const theatrePeople8 = document.querySelector("[data-theatre-people-8]");

  // parallax
  const parallaxTranslateYIndex = 2;

  const theatrePeople1Parallax = new ElementParallax(theatreSection, theatrePeople1, 
    { x: -50, y: 8 * parallaxTranslateYIndex }, 0.6, { x: -50, y: -8 * parallaxTranslateYIndex }, 1.8);
  const theatrePeople2Parallax = new ElementParallax(theatreSection, theatrePeople2,
    { x: -50, y: 7 * parallaxTranslateYIndex }, 0.6, { x: -50, y: -7 * parallaxTranslateYIndex }, 1.8);
  const theatrePeople3Parallax = new ElementParallax(theatreSection, theatrePeople3,
    { x: -50, y: 6 * parallaxTranslateYIndex }, 0.6, { x: -50, y: -6 * parallaxTranslateYIndex }, 1.8);
  const theatrePeople4Parallax = new ElementParallax(theatreSection, theatrePeople4,
    { x: -50, y: 5 * parallaxTranslateYIndex }, 0.6, { x: -50, y: -5 * parallaxTranslateYIndex }, 1.8);
  const theatrePeople5Parallax = new ElementParallax(theatreSection, theatrePeople5,
    { x: -50, y: 4 * parallaxTranslateYIndex }, 0.6, { x: -50, y: -4 * parallaxTranslateYIndex }, 1.8);
  const theatrePeople6Parallax = new ElementParallax(theatreSection, theatrePeople6,
    { x: -50, y: 3 * parallaxTranslateYIndex }, 0.6, { x: -50, y: -3 * parallaxTranslateYIndex }, 1.8);
  const theatrePeople7Parallax = new ElementParallax(theatreSection, theatrePeople7,
    { x: -50, y: 2 * parallaxTranslateYIndex }, 0.6, { x: -50, y: -2 * parallaxTranslateYIndex }, 1.8);
  const theatrePeople8Parallax = new ElementParallax(theatreSection, theatrePeople8,
    { x: -50, y: 1 * parallaxTranslateYIndex }, 0.6, { x: -50, y: -1 * parallaxTranslateYIndex }, 1.8);
  
  window.addEventListener("load", handleParallax);
  window.addEventListener("scroll", handleParallax);

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