if (document.querySelector("[data-loyalty-rewards-section]")) {
  // DOM elements
  var loyaltyRewardsSection = document.querySelector("[data-loyalty-rewards-section]");
  var earnLoyaltyRewardsMainContent = loyaltyRewardsSection.querySelector("[data-lr-elr-main-content]");
  var earnLoyaltyRewardsFooter = loyaltyRewardsSection.querySelector("[data-lr-elr-footer]");
  var earningPointsMainContent = loyaltyRewardsSection.querySelector("[data-lr-ep-main-content]");
  var takeActionsLoginBtn = loyaltyRewardsSection.querySelector("[data-lr-ta-login-btn]");
  var takeActionsSignupBtn = loyaltyRewardsSection.querySelector("[data-lr-ta-signup-btn]");

  // variables
  var onloadTransitionDelayStepShorter = 130;
  var onloadTransitionDelayStepLarger = 200;

  // assign transition delays to the each row of specific side-by-side list
  var elrLastIndexNotApplied = assignTransitionDelays(earnLoyaltyRewardsMainContent, 3, onloadTransitionDelayStepShorter);
  earnLoyaltyRewardsFooter.style.transitionDelay = `${elrLastIndexNotApplied * onloadTransitionDelayStepShorter + onloadTransitionDelayStepLarger}ms`;
  assignTransitionDelays(earningPointsMainContent, 3, onloadTransitionDelayStepShorter);

  // logged-in hero section loading animation
  if (loyaltyRewardsSection.dataset.darkMode === "true") {
    playLoadingAnimationsBySection("[data-lr-logged-in-hero-section]",
    ["[data-lr-logged-in-hero-bg]", "[data-lr-logged-in-hero-main-title]", 
    "[data-lr-logged-in-hero-points-count]", "[data-lr-logged-in-hero-redeem-btn]"], 0.3);
  }

  // not-logged-in hero section loading animation
  playLoadingAnimationsBySection("[data-lr-not-logged-in-hero-section]",
  ["[data-lr-not-logged-in-hero-sup-title]", "[data-lr-not-logged-in-hero-main-title]", 
  "[data-lr-not-logged-in-hero-subtitle]", "[data-lr-not-logged-in-hero-shiny-diamond]"], 0.3);

  // earn loyalty rewards section loading animation
  playLoadingAnimationsBySection("[data-lr-earn-loyalty-rewards]",
  ["[data-lr-elr-main-content]", "[data-lr-sbs-list-row]", "[data-lr-elr-main-title]", 
  "[data-lr-elr-subtitle]", "[data-lr-elr-footer]"], 0.3);

  // direct selling only section loading animation
  playLoadingAnimationsBySection("[data-lr-direct-selling-only]",
  ["[data-lr-dso-title]", "[data-lr-dso-drawing]"], 0.3);

  // skip supply house section loading animation
  playLoadingAnimationsBySection("[data-lr-skip-supply-house]",
  ["[data-lr-ssh-bpbi-border]", "[data-lr-ssh-bpbi-caption]", "[data-lr-ssh-tsh-caption]", 
  "[data-lr-ssh-skip-caption]", "[data-lr-ssh-super-tasty-caption]", "[data-lr-ssh-smile]"]
  , 0.3);

  // earning points section loading animation
  playLoadingAnimationsBySection("[data-lr-earning-points]",
  ["[data-lr-ep-main-title]", "[data-lr-ep-subtitle]", "[data-lr-sbs-list-row]"]
  , 0.2);

  // earning points section footer loading animation
  playLoadingAnimationsBySection("[data-lr-ep-footer]", 
  ["[data-lr-ep-footer-other-ways-to-earn]", "[data-lr-ep-footer-smile-points-caption]", 
  "[data-lr-ep-footer-arrow-down]", "[data-lr-ep-footer-arrow-additions]"], 0.3);

  // take actions section loading animation
  if (loyaltyRewardsSection.dataset.darkMode !== "true") {
    playLoadingAnimationsBySection("[data-lr-take-actions]", 
    ["[data-lr-ta-login-btn]", "[data-lr-ta-signup-btn]"], 0.4, 700, () => {
      removeTransitionDelay(takeActionsLoginBtn);
      removeTransitionDelay(takeActionsSignupBtn);
    });
  }

  function playLoadingAnimationsBySection(sectionSelector, elementsSelectors, thresholdValue, delayDuration, delayedFunc) {
    const section = loyaltyRewardsSection.querySelector(sectionSelector);
    const sectionElements = getDOMElementsFromSelectors(section, elementsSelectors);

    const sectionIntersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          sectionElements.forEach(element => element.classList.add("animate-in"));

          if (delayDuration && delayedFunc) {
            setTimeout(delayedFunc, delayDuration);
          }

          sectionIntersectionObserver.unobserve(section);
        }
      });
    }, { threshold: thresholdValue });
    sectionIntersectionObserver.observe(section);
  }

  function getDOMElementsFromSelectors(parentElement, elementsSelectors) {
    let DOMElements = [];
    for (let i = 0; i < elementsSelectors.length; i++) {
      const elements = [...parentElement.querySelectorAll(elementsSelectors[i])];
      if (!elements) continue;

      DOMElements = [...DOMElements, ...elements];
    }

    return DOMElements;
  }

  // assigns transition delays to the each row of specific side-by-side list
  function assignTransitionDelays(containerOfSideBySideList, startingDelayIndex, delayStep) {
    const sideBySideList = containerOfSideBySideList.querySelectorAll("[data-lr-sbs-list-row]");
    for (let i = 0; i < sideBySideList.length; i++) {
      sideBySideList[i].style.transitionDelay = `${(startingDelayIndex + i) * delayStep}ms`;
    }

    return startingDelayIndex + sideBySideList.length - 1;
  }

  // removes transition delay from certain element
  function removeTransitionDelay(element) {
    element.classList.add("transition-delay-0");
  }
}