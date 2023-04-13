import { getCSSPropertyValueFromRoot } from "./additional-func.js";

if (document.querySelector("[data-navigation-menu]")) {
  // DOM elements
  const navigationMenu = document.querySelector("[data-navigation-menu]");
  const navigationNavbar = navigationMenu.querySelector("[data-navigation-navbar]");
  let navigationBgClouds = navigationMenu.querySelectorAll("[data-navigation-cloud]");
  const navigationCloudsContainer = navigationMenu.querySelector("[data-navigation-clouds-container]");
  const openMenuButton = document.querySelector(".open-menu-btn");
  const closeMenuButton = navigationMenu.querySelector(".close-menu-btn");
  const cloudTemplate = navigationMenu.querySelector("[data-navigation-cloud-template]");

  // positioning clouds
  const targetCoveragePercentage = 0.7;
  const maxOverlapRatio = 0.3;

  const CLOUD_IMAGES = [
    {
      className: "navigation-menu__bg-cloud--center",
      width: 600,
      aspectRatio: 1.98,
      imgURL: "./images/nav-cloud-center.webp"
    },
    {
      className: "navigation-menu__bg-cloud--top-left",
      width: 850,
      aspectRatio: 2.32,
      imgURL: "./images/nav-cloud-top-left.webp"
    },
    {
      className: "navigation-menu__bg-cloud--top-right",
      width: 1100,
      aspectRatio: 2.45,
      imgURL: "./images/nav-cloud-top-right.webp"
    },
    {
      className: "navigation-menu__bg-cloud--bottom-left",
      width: 900,
      aspectRatio: 2.1,
      imgURL: "./images/nav-cloud-bottom-left.webp"
    },
    {
      className: "navigation-menu__bg-cloud--bottom-right",
      width: 950,
      aspectRatio: 1.98,
      imgURL: "./images/nav-cloud-bottom-right.webp"
    },
  ];

  function randomizeClouds(targetCoveragePercentage) {
    let currentCoverage = 0;
    const skyArea = navigationCloudsContainer.clientWidth * navigationCloudsContainer.clientHeight;
    const targetCoverage = skyArea * targetCoveragePercentage;

    navigationCloudsContainer.innerHTML = '';

    while (currentCoverage < targetCoverage) {
      // console.log("randomizing clouds");
      // console.log("targetCoverage: ", targetCoverage);
      // console.log("currentCoverage: ", currentCoverage);
      const cloudFragment = cloudTemplate.content.cloneNode(true);

      const randomImageObj = CLOUD_IMAGES[Math.floor(Math.random() * CLOUD_IMAGES.length)];
      
      const cloudWrapper = cloudFragment.querySelector("[data-navigation-cloud]");
      cloudWrapper.classList.add(randomImageObj.className);
      cloudWrapper.style.width = `${randomImageObj.width}px`;
      cloudWrapper.style.height = `${randomImageObj.width / randomImageObj.aspectRatio}px`;

      const cloudImg = cloudFragment.querySelector("[data-navigation-cloud-image]");
      cloudImg.src = randomImageObj.imgURL;
      cloudImg.style.transform = `translateX(calc(-140% - ${navigationCloudsContainer.clientWidth}px))`;
      
      const cloudWidth = randomImageObj.width;
      const cloudHeight = randomImageObj.width / randomImageObj.aspectRatio;

      const xPos = (Math.random() * (navigationCloudsContainer.clientWidth + cloudWidth)) - (cloudWidth / 2);
      const yPos = (Math.random() * (navigationCloudsContainer.clientHeight + cloudHeight)) - (cloudHeight / 2);

      cloudWrapper.style.left = `${xPos}px`;
      cloudWrapper.style.top = `${yPos}px`;

      navigationCloudsContainer.appendChild(cloudFragment);

      // Calculate coverage
      const cloudRect = cloudWrapper.getBoundingClientRect();
      const visibleWidth = Math.max(0, Math.min(cloudRect.right, navigationCloudsContainer.clientWidth) - Math.max(cloudRect.left, 0));
      const visibleHeight = Math.max(0, Math.min(cloudRect.bottom, navigationCloudsContainer.clientHeight) - Math.max(cloudRect.top, 0));
      const visibleArea = visibleWidth * visibleHeight;

      currentCoverage += visibleArea;
    }
  }

  // animating clouds
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
    randomizeClouds(targetCoveragePercentage, maxOverlapRatio);
    navigationBgClouds = navigationMenu.querySelectorAll("[data-navigation-cloud]");

    setTimeout(() => {
      navigationMenu.classList.add("fade-in");
      navigationBgClouds.forEach(cloud => {
        cloud.classList.add("slide-in");
      });
    }, 0);

    setTimeout(() => {
      navigationNavbar.classList.add("fade-in");
    }, slideInBiggestDuration / 4 * 3);
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
    }, slideInBiggestDuration / 4 + fadeInDuration);
  }
}