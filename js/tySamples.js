// imports
import ElementParallax from "./ElementParallax.js";
import { isSectionInViewPort, getCSSPropertyValueFromRoot } from "./additional-func.js";

if (document.querySelector("[data-ty-samples-section]")) {
  // DOM elements
  const tySamplesSection = document.querySelector("[data-ty-samples-section]");
  const tySamplesAirplanePilotContainer = tySamplesSection.querySelector("[data-ty-samples-airplane-pilot-container]");

  // variables
  const tySamplesAirplaneTransitionDuration = parseInt(getCSSPropertyValueFromRoot("--TY-SAMPLES-SEC-airplane-transition-duration"));

  // animate airplane and pilot
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      tySamplesAirplanePilotContainer.classList.add("load-transition");

      setTimeout(() => {
        tySamplesAirplanePilotContainer.classList.add("airplane-flying");
      }, tySamplesAirplaneTransitionDuration);

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.8 });
  observer.observe(tySamplesSection);
}