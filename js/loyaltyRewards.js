
if (document.querySelector("[data-loyalty-rewards-section]")) {
  // DOM elements
  const loyaltyRewardsSection = document.querySelector("[data-loyalty-rewards-section]");
  const loyaltyRewardsHeroSupTitle = loyaltyRewardsSection.querySelector("[data-lr-hero-sup-title]");
  const loyaltyRewardsHeroMainTitle = loyaltyRewardsSection.querySelector("[data-lr-hero-main-title]");
  const loyaltyRewardsHeroSubtitle = loyaltyRewardsSection.querySelector("[data-lr-hero-subtitle]");
  const loyaltyRewardsHeroShinyDiamond = loyaltyRewardsSection.querySelector("[data-lr-hero-shiny-diamond]");
  const earnLoyaltyRewardsMainTitle = document.querySelector("[data-lr-elr-main-title]");
  const earnLoyaltyRewardsSubtitle = document.querySelector("[data-lr-elr-subtitle]");
  const earnLoyaltyRewardsMainContent = document.querySelector("[data-lr-elr-main-content]");
  const earnLoyaltyRewardsFooter = document.querySelector("[data-lr-elr-footer]");

  window.addEventListener("load", () => {
    loyaltyRewardsHeroSupTitle.classList.add("animate-in");
    loyaltyRewardsHeroMainTitle.classList.add("animate-in");
    loyaltyRewardsHeroSubtitle.classList.add("animate-in");
    loyaltyRewardsHeroShinyDiamond.classList.add("animate-in");
    earnLoyaltyRewardsMainTitle.classList.add("animate-in");
    earnLoyaltyRewardsSubtitle.classList.add("animate-in");
    earnLoyaltyRewardsMainContent.classList.add("animate-in");
    earnLoyaltyRewardsFooter.classList.add("animate-in");
  });
}