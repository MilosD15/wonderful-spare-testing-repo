window.addEventListener("load", function() {
  var selectedPlan = "A"; // Default selection
  const pricingPlanLinks = {
    annualIndividual: "https://trackshack.xyz/checkout/?add-to-cart=7322&quantity=1",
    annualProfessional: "https://trackshack.xyz/checkout/?add-to-cart=7325&quantity=1",
    monthlyIndividual: "https://trackshack.xyz/checkout/?add-to-cart=6689&quantity=1",
    monthlyProfessional: "https://trackshack.xyz/checkout/?add-to-cart=6737&quantity=1",
  }

  const pricingCardsContainer = document.querySelector("[data-pricing-cards-container]");
  const pricingPrices = document.querySelectorAll(".price-line[data-annual], .price-line[data-monthly]");
  const signUpIndividualLink = document.getElementById("sign-up-individual");
  const signUpProLink = document.getElementById("sign-up-pro");

  function updateSelection(plan) {
    selectedPlan = plan;
    if (plan === "M") {
      document.getElementById("monthlyButton").classList.add("selected");
      document.getElementById("monthlyButton").classList.remove("deselected");
      document.getElementById("annualButton").classList.remove("selected");
      document.getElementById("annualButton").classList.add("deselected");
      pricingCardsContainer.dataset.pricingPlan = "M";
      pricingPrices.forEach(elem => {
        if (elem.classList.contains("price-line--monthly")) {
          elem.classList.add("active");
          elem.classList.remove("inactive");
        } else {
          setTimeout(() => {
            elem.classList.add("inactive");
            elem.classList.remove("active");
          }, 300);
        }
      });
      signUpIndividualLink.href = pricingPlanLinks.monthlyIndividual;
      signUpProLink.href = pricingPlanLinks.monthlyProfessional;
    } else {
      document.getElementById("monthlyButton").classList.remove("selected");
      document.getElementById("monthlyButton").classList.add("deselected");
      document.getElementById("annualButton").classList.add("selected");
      document.getElementById("annualButton").classList.remove("deselected");
      pricingCardsContainer.dataset.pricingPlan = "A";
      pricingPrices.forEach(elem => {
        if (elem.classList.contains("price-line--annual")) {
          elem.classList.add("active");
          elem.classList.remove("inactive");
        } else {
          setTimeout(() => {
            elem.classList.add("inactive");
            elem.classList.remove("active");
          }, 300);
        }
      });
      signUpIndividualLink.href = pricingPlanLinks.annualIndividual;
      signUpProLink.href = pricingPlanLinks.annualProfessional;
    }
  }

  document.getElementById("monthlyButton").addEventListener("click", function() {
    updateSelection("M");
  });

  document.getElementById("annualButton").addEventListener("click", function() {
    updateSelection("A");
  });

  // Initialize with default selection
  updateSelection(selectedPlan);
});