
// DOM elements
const simpleForm = document.querySelector("[data-simple-form-1]");
const whereHeardForWonderfulSelectElement = simpleForm.querySelector("[data-where-heard-for-wonderful-select]");
const whereHeardForWonderfulAdditionalField = simpleForm.querySelector("[data-where-heard-for-wonderful-additional-field]");
const whichBrandsProphyOtherCheckbox = simpleForm.querySelector("[data-which-brands-prophy-other]");
const whichBrandsProphyOtherTextBox = simpleForm.querySelector("#which-brands-prophy-other-textbox");
const whichBrandsFluorideVarnishOtherCheckbox = simpleForm.querySelector("[data-which-brands-fluoride-varnish-other]");
const whichBrandsFluorideVarnishOtherTextBox = simpleForm.querySelector("#which-brands-fluoride-varnish-other-textbox");
const whatDislikeOtherCheckbox = simpleForm.querySelector("[data-what-dislike-other-checkbox]");
const whatDislikeOtherTextBox = simpleForm.querySelector("#what-dislike-other-textbox");

// variables
const whereHeardForWonderfulSelectOptions = [...whereHeardForWonderfulSelectElement.querySelectorAll("option")];

// events
whereHeardForWonderfulSelectElement.addEventListener("change", () => {
  const currentSelectedIndex = whereHeardForWonderfulSelectElement.selectedIndex;

  if (currentSelectedIndex === whereHeardForWonderfulSelectOptions.length - 1) {
    whereHeardForWonderfulAdditionalField.classList.remove("hidden");
  } else {
    whereHeardForWonderfulAdditionalField.classList.add("hidden");
  }
});

whichBrandsProphyOtherCheckbox.addEventListener("change", () => {
  if (whichBrandsProphyOtherCheckbox.checked) {
    whichBrandsProphyOtherTextBox.classList.remove("hidden");
  } else {
    whichBrandsProphyOtherTextBox.classList.add("hidden");
  }
});

whichBrandsFluorideVarnishOtherCheckbox.addEventListener("change", () => {
  if (whichBrandsFluorideVarnishOtherCheckbox.checked) {
    whichBrandsFluorideVarnishOtherTextBox.classList.remove("hidden");
  } else {
    whichBrandsFluorideVarnishOtherTextBox.classList.add("hidden");
  }
});

whatDislikeOtherCheckbox.addEventListener("change", () => {
  if (whatDislikeOtherCheckbox.checked) {
    whatDislikeOtherTextBox.classList.remove("hidden");
  } else {
    whatDislikeOtherTextBox.classList.add("hidden");
  }
});