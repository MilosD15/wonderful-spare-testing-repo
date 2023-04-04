import { getCSSPropertyValueFromRoot } from "./additional-func.js";

if (document.querySelector("[data-navigation-menu]")) {
  // DOM elements
  const navigationMenu = document.querySelector("[data-navigation-menu]");
  const navigationNavbar = navigationMenu.querySelector("[data-navigation-navbar]");
  const navigationBgClouds = navigationMenu.querySelectorAll("[data-navigation-cloud]");
  const openMenuButton = document.querySelector(".open-menu-btn");
  const closeMenuButton = navigationMenu.querySelector(".close-menu-btn");

  const fadeInDuration = parseInt(getCSSPropertyValueFromRoot("--NAVBAR-fade-in-transition-duration"));
  const slideInBiggestDuration = parseInt(getCSSPropertyValueFromRoot("--NAVBAR-slide-in-biggest-transition-duration"));

  openMenuButton.addEventListener("click", () => {
    openMenuPanel();
  });

  closeMenuButton.addEventListener("click", () => {
    closeMenuPanel();
  });

  function openMenuPanel() {
    navigationMenu.classList.add("show");

    setTimeout(() => {
      navigationMenu.classList.add("fade-in");
      navigationBgClouds.forEach(cloud => {
        cloud.classList.add("slide-in");
      });
    }, 0);

    setTimeout(() => {
      navigationNavbar.classList.add("fade-in");
    }, slideInBiggestDuration - fadeInDuration / 2);
  }

  function closeMenuPanel() {
    navigationNavbar.classList.remove("fade-in");
    navigationBgClouds.forEach(cloud => {
      cloud.classList.remove("slide-in");
    });

    setTimeout(() => {
      navigationMenu.classList.remove("fade-in");
    }, slideInBiggestDuration / 4);

    setTimeout(() => {
      navigationMenu.classList.remove("show");
    }, slideInBiggestDuration);
  }
}