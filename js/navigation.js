if (document.querySelector("[data-navigation-menu]")) {
  // DOM elements
  const navigationMenu = document.querySelector("[data-navigation-menu]");
  const navigationMenuWrapper = navigationMenu.querySelector("[data-navigation-menu-wrapper]");

  window.addEventListener("load", handleNavMenuBgResize);
  window.addEventListener("resize", handleNavMenuBgResize);

  function handleNavMenuBgResize() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const navigationMenuWrapperWidth = navigationMenuWrapper.offsetWidth;
    const navigationMenuWrapperHeight = navigationMenuWrapper.offsetHeight;

    if (windowHeight < navigationMenuWrapperHeight || windowWidth > navigationMenuWrapperWidth) {
      navigationMenuWrapper.style.width = "100%";
      navigationMenuWrapper.style.height = "auto";
    } else {
      navigationMenuWrapper.style.width = "auto";
      navigationMenuWrapper.style.height = "100%";
    }
  }
}