if (document.querySelector("[data-navigation-menu]")) {
  // DOM elements
  const navigationMenu = document.querySelector("[data-navigation-menu]");
  const navigationNavbar = navigationMenu.querySelector("[data-navigation-navbar]");
  const navigationBgClouds = navigationMenu.querySelectorAll("[data-navigation-cloud]");
  const openMenuButton = document.querySelector(".open-menu-btn");
  const closeMenuButton = navigationMenu.querySelector(".close-menu-btn");

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
      navigationNavbar.classList.add("fade-in");
      navigationBgClouds.forEach(cloud => {
        cloud.classList.add("slide-in");
      });
    }, 0);
  }

  function closeMenuPanel() {
    navigationMenu.classList.remove("fade-in");
    navigationNavbar.classList.remove("fade-in");
    navigationBgClouds.forEach(cloud => {
      cloud.classList.remove("slide-in");
    });
    setTimeout(() => {
      navigationMenu.classList.remove("show");
    }, 400);
  }
}