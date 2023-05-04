
if (document.querySelector("[data-loyalty-rewards-section]")) {
  // DOM elements
  const loyaltyRewardsSection = document.querySelector("[data-loyalty-rewards-section]");

  // logged-in hero section
  const loyaltyRewardsLoggedInHeroSection = loyaltyRewardsSection.querySelector("[data-lr-logged-in-hero-section]");
  const loyaltyRewardsLoggedInHeroBg = loyaltyRewardsLoggedInHeroSection?.querySelector("[data-lr-logged-in-hero-bg]");
  const loyaltyRewardsLoggedInHeroMainTitle = loyaltyRewardsLoggedInHeroSection?.querySelector("[data-lr-logged-in-hero-main-title]");
  const loyaltyRewardsLoggedInHeroPointsCount = loyaltyRewardsLoggedInHeroSection?.querySelector("[data-lr-logged-in-hero-points-count]");
  const loyaltyRewardsLoggedInHeroRedeemBtn = loyaltyRewardsLoggedInHeroSection?.querySelector("[data-lr-logged-in-hero-redeem-btn]");

  // not-logged-in hero section
  const loyaltyRewardsNotLoggedInHeroSection = loyaltyRewardsSection.querySelector("[data-lr-not-logged-in-hero-section]");
  const loyaltyRewardsNotLoggedInHeroSupTitle = loyaltyRewardsNotLoggedInHeroSection.querySelector("[data-lr-not-logged-in-hero-sup-title]");
  const loyaltyRewardsNotLoggedInHeroMainTitle = loyaltyRewardsNotLoggedInHeroSection.querySelector("[data-lr-not-logged-in-hero-main-title]");
  const loyaltyRewardsNotLoggedInHeroSubtitle = loyaltyRewardsNotLoggedInHeroSection.querySelector("[data-lr-not-logged-in-hero-subtitle]");
  const loyaltyRewardsNotLoggedInHeroShinyDiamond = loyaltyRewardsNotLoggedInHeroSection.querySelector("[data-lr-not-logged-in-hero-shiny-diamond]");
  
  // earn loyalty rewards section
  const earnLoyaltyRewardsSection = loyaltyRewardsSection.querySelector("[data-lr-earn-loyalty-rewards]");
  const earnLoyaltyRewardsMainContent = earnLoyaltyRewardsSection.querySelector("[data-lr-elr-main-content]");
  const earnLoyaltyRewardsSideBySideListRows = earnLoyaltyRewardsMainContent.querySelectorAll("[data-lr-sbs-list-row]");
  const earnLoyaltyRewardsMainTitle = earnLoyaltyRewardsSection.querySelector("[data-lr-elr-main-title]");
  const earnLoyaltyRewardsSubtitle = earnLoyaltyRewardsSection.querySelector("[data-lr-elr-subtitle]");
  const earnLoyaltyRewardsFooter = earnLoyaltyRewardsSection.querySelector("[data-lr-elr-footer]");

  // direct selling only section
  const directSellingOnlySection = loyaltyRewardsSection.querySelector("[data-lr-direct-selling-only]");
  const directSellingOnlyTitle = directSellingOnlySection.querySelector("[data-lr-dso-title]");
  const directSellingOnlyDrawing = directSellingOnlySection.querySelector("[data-lr-dso-drawing]");

  // skip supply house section
  const skipSupplyHouseSection = loyaltyRewardsSection.querySelector("[data-lr-skip-supply-house]");
  const skipSupplyHouseBpbiBorder = skipSupplyHouseSection.querySelector("[data-lr-ssh-bpbi-border]");
  const skipSupplyHouseBpbiCaption = skipSupplyHouseSection.querySelector("[data-lr-ssh-bpbi-caption]");
  const skipSupplyHouseTshCaption = skipSupplyHouseSection.querySelector("[data-lr-ssh-tsh-caption]");
  const skipSupplyHouseSkipCaption = skipSupplyHouseSection.querySelector("[data-lr-ssh-skip-caption]");
  const skipSupplyHouseSuperTastyCaption = skipSupplyHouseSection.querySelector("[data-lr-ssh-super-tasty-caption]");
  const skipSupplyHouseSmile = skipSupplyHouseSection.querySelector("[data-lr-ssh-smile]");

  // earning points section
  const earningPointsSection = loyaltyRewardsSection.querySelector("[data-lr-earning-points]");
  const earningPointsMainTitle = earningPointsSection.querySelector("[data-lr-ep-main-title]");
  const earningPointsSubtitle = earningPointsSection.querySelector("[data-lr-ep-subtitle]");
  const earningPointsMainContent = earningPointsSection.querySelector("[data-lr-ep-main-content]");
  const earningPointsSideBySideListRows = earningPointsMainContent.querySelectorAll("[data-lr-sbs-list-row]");
  const earningPointsFooter = earningPointsSection.querySelector("[data-lr-ep-footer]");
  const earningPointsFooterOtherWaysToEarn = earningPointsFooter.querySelector("[data-lr-ep-footer-other-ways-to-earn]");
  const earningPointsFooterSmilePointsCaption = earningPointsFooter.querySelector("[data-lr-ep-footer-smile-points-caption]");
  const earningPointsFooterArrowDown = earningPointsFooter.querySelector("[data-lr-ep-footer-arrow-down]");
  const earningPointsFooterArrowAdditions = earningPointsFooter.querySelector("[data-lr-ep-footer-arrow-additions]");

  // take actions section
  const takeActionsSection = loyaltyRewardsSection.querySelector("[data-lr-take-actions]");
  const takeActionsLoginBtn = takeActionsSection.querySelector("[data-lr-ta-login-btn]");
  const takeActionsSignupBtn = takeActionsSection.querySelector("[data-lr-ta-signup-btn]");

  // variables
  const onloadTransitionDelayStepShorter = 130;
  const onloadTransitionDelayStepLarger = 200;

  // assign transition delays to the each row of specific side-by-side list
  const elrLastIndexNotApplied = assignTransitionDelays(earnLoyaltyRewardsMainContent, 3, onloadTransitionDelayStepShorter);
  earnLoyaltyRewardsFooter.style.transitionDelay = `${elrLastIndexNotApplied * onloadTransitionDelayStepShorter + onloadTransitionDelayStepLarger}ms`;
  assignTransitionDelays(earningPointsMainContent, 3, onloadTransitionDelayStepShorter);

  // logged-in hero section loading animation
  if (loyaltyRewardsLoggedInHeroSection) {
    const loggedInHeroLoadingAnimIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loyaltyRewardsLoggedInHeroBg.classList.add("animate-in");
          loyaltyRewardsLoggedInHeroMainTitle.classList.add("animate-in");
          loyaltyRewardsLoggedInHeroPointsCount.classList.add("animate-in");
          loyaltyRewardsLoggedInHeroRedeemBtn.classList.add("animate-in");
  
          loggedInHeroLoadingAnimIO.unobserve(loyaltyRewardsLoggedInHeroSection);
        }
      });
    }, { threshold: 0.3 });
    loggedInHeroLoadingAnimIO.observe(loyaltyRewardsLoggedInHeroSection);
  }

  // not-logged-in hero section loading animation
  const notLoggedInHeroLoadingAnimIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loyaltyRewardsNotLoggedInHeroSupTitle.classList.add("animate-in");
        loyaltyRewardsNotLoggedInHeroMainTitle.classList.add("animate-in");
        loyaltyRewardsNotLoggedInHeroSubtitle.classList.add("animate-in");
        loyaltyRewardsNotLoggedInHeroShinyDiamond.classList.add("animate-in");

        notLoggedInHeroLoadingAnimIO.unobserve(loyaltyRewardsNotLoggedInHeroSection);
      }
    });
  }, { threshold: 0.3 });
  notLoggedInHeroLoadingAnimIO.observe(loyaltyRewardsNotLoggedInHeroSection);

  // earn loyalty rewards section loading animation
  const earnLoyRewLoadingAnimIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        earnLoyaltyRewardsMainTitle.classList.add("animate-in");
        earnLoyaltyRewardsSubtitle.classList.add("animate-in");
        earnLoyaltyRewardsSideBySideListRows.forEach(row => row.classList.add("animate-in"));
        earnLoyaltyRewardsFooter.classList.add("animate-in");

        earnLoyRewLoadingAnimIO.unobserve(earnLoyaltyRewardsSection);
      }
    });
  }, { threshold: 0.3 });
  earnLoyRewLoadingAnimIO.observe(earnLoyaltyRewardsSection);

  // direct selling only section loading animation
  const directSellingLoadingAnimIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        directSellingOnlyTitle.classList.add("animate-in");
        directSellingOnlyDrawing.classList.add("animate-in");
        skipSupplyHouseTshCaption.classList.add("animate-in");
        skipSupplyHouseSkipCaption.classList.add("animate-in");
        skipSupplyHouseSuperTastyCaption.classList.add("animate-in");
        skipSupplyHouseSmile.classList.add("animate-in");

        directSellingLoadingAnimIO.unobserve(directSellingOnlySection);
      }
    });
  }, { threshold: 0.3 });
  directSellingLoadingAnimIO.observe(directSellingOnlySection);

  // skip supply house section loading animation
  const skipSupplyHouseLoadingAnimIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skipSupplyHouseBpbiBorder.classList.add("animate-in");
        skipSupplyHouseBpbiCaption.classList.add("animate-in");

        skipSupplyHouseLoadingAnimIO.unobserve(skipSupplyHouseSection);
      }
    });
  }, { threshold: 0.3 });
  skipSupplyHouseLoadingAnimIO.observe(skipSupplyHouseSection);

  // earning points section loading animation
  const earningPointsSectionLoadingAnimIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        earningPointsMainTitle.classList.add("animate-in");
        earningPointsSubtitle.classList.add("animate-in");
        earningPointsSideBySideListRows.forEach(row => row.classList.add("animate-in"));

        earningPointsSectionLoadingAnimIO.unobserve(earningPointsSection);
      }
    });
  }, { threshold: 0.2 });
  earningPointsSectionLoadingAnimIO.observe(earningPointsSection);

  // earning points section footer loading animation
  const earningPointsSectionFooterLoadingAnimIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        earningPointsFooterOtherWaysToEarn.classList.add("animate-in");
        earningPointsFooterSmilePointsCaption.classList.add("animate-in");
        earningPointsFooterArrowDown.classList.add("animate-in");
        earningPointsFooterArrowAdditions.classList.add("animate-in");

        earningPointsSectionFooterLoadingAnimIO.unobserve(earningPointsFooter);
      }
    });
  }, { threshold: 0.3 });
  earningPointsSectionFooterLoadingAnimIO.observe(earningPointsFooter);

  // take actions section loading animation
  const takeActionsSectionLoadingAnimIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (loyaltyRewardsSection.dataset.darkMode === "true") {

        } else {
          takeActionsLoginBtn.classList.add("animate-in");
          takeActionsSignupBtn.classList.add("animate-in");

          setTimeout(() => {
            console.log("remove transition delay");
            removeTransitionDelay(takeActionsLoginBtn);
            removeTransitionDelay(takeActionsSignupBtn);
          }, 700);
        }

        takeActionsSectionLoadingAnimIO.unobserve(takeActionsSection);
      }
    });
  }, { threshold: 0.4 });
  takeActionsSectionLoadingAnimIO.observe(takeActionsSection);

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