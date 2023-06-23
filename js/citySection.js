// imports
import ElementParallax from "./ElementParallax.js";
import { isSectionInViewPort, getCSSPropertyValueFromRoot } from "./additional-func.js";

if (document.querySelector("[data-city-section]")) {
  // DOM elements
  const citySection = document.querySelector("[data-city-section]");
  const citySectionLottiePlayer = citySection.querySelector("[data-city-section-lottie]");
  const citySectionBuildings = [...citySection.querySelectorAll("[data-city-section-building]")];
  const cityFurthestBuildings = [...citySection.querySelectorAll(
    "[data-city-section-building='2'], [data-city-section-building='4']"
  )];
  const cityBuildingsInTheMiddle = [...citySection.querySelectorAll(
    "[data-city-section-building='1'], [data-city-section-building='5']"
  )];
  const cityClosestBuildings = [...citySection.querySelectorAll(
    "[data-city-section-building='3'], [data-city-section-building='6']"
  )];
  
  // animate buildings
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      animateBuildings();

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.8 });
  observer.observe(citySection);

  function animateBuildings() {
    citySectionBuildings.forEach(building => {
      building.classList.add("animate");
    });
  }

  // parallax
  const cityFurthestBuildingsParallaxes = cityFurthestBuildings.map(building => {
    return new ElementParallax(citySection, building, { y: -10 }, 0, { y: 10 }, 3);
  });
  const cityBuildingsInTheMiddleParallaxes = cityBuildingsInTheMiddle.map(building => {
    return new ElementParallax(citySection, building, { y: 15 }, 0, { y: -15 }, 3);
  });
  const cityClosestBuildingsParallaxes = cityClosestBuildings.map(building => {
    return new ElementParallax(citySection, building, { y: 20 }, 0, { y: -20 }, 3);
  });
  
  window.addEventListener("load", handleParallax);
  window.addEventListener("scroll", handleParallax);

  function handleParallax() {
    const currentScroll = document.documentElement.scrollTop;

    cityFurthestBuildingsParallaxes.forEach(parallax => parallax.apply(currentScroll));
    cityBuildingsInTheMiddleParallaxes.forEach(parallax => parallax.apply(currentScroll));
    cityClosestBuildingsParallaxes.forEach(parallax => parallax.apply(currentScroll));
  }

  // lottie
  let sectionWasAlreadyInViewport = false;

  function reloadPlayer(player) {
    player.load('../wonderful-best-tasting.lottie');
  
    player.addEventListener('ready', () => {
      player.play();
    });
  }

  window.addEventListener("load", handleLottieAnimation);
  window.addEventListener("scroll", handleLottieAnimation);

  function handleLottieAnimation() {
    if (isSectionInViewPort(citySection) && sectionWasAlreadyInViewport === false) {
      sectionWasAlreadyInViewport = true;
      reloadPlayer(citySectionLottiePlayer);
    }
    if (!isSectionInViewPort(citySection)) {
      sectionWasAlreadyInViewport = false;
    }
  }
}