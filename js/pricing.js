document.addEventListener("DOMContentLoaded", function() {
  var selectedPlan = "A"; // Default selection
  const pricingCardsContainer = document.querySelector("[data-pricing-cards-container]");
  const pricingPrices = document.querySelectorAll(".price-line[data-annual], .price-line[data-monthly]");

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