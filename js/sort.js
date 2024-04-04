// Get all elements with the data-js attribute "custom-select"
const customSelects = document.querySelectorAll("[data-js-selector='custom-select']");

customSelects.forEach((customSelect) => {
  const selectElement = customSelect.querySelector("[data-js-selector='select-element']");

  // Create a new div that will act as the selected item
  const selectedDiv = document.createElement("DIV");
  selectedDiv.setAttribute("class", "song-list__sort__selected");
  selectedDiv.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
  customSelect.appendChild(selectedDiv);

  // Create a new div that will contain the option list
  const optionsContainerDiv = document.createElement("DIV");
  optionsContainerDiv.setAttribute("class", "song-list__sort__items");

  Array.from(selectElement.options).forEach((option, index) => {
    // For each option in the original select element, create a new div that will act as an option item
    const optionDiv = document.createElement("DIV");
    optionDiv.innerHTML = option.innerHTML;
    optionDiv.addEventListener("click", function(e) {
      // When an item is clicked, update the original select box and the selected item
      selectElement.selectedIndex = index;
      selectedDiv.innerHTML = this.innerHTML;

      const sameAsSelected = this.parentNode.querySelectorAll(".same-as-selected");
      sameAsSelected.forEach((element) => {
        element.classList.remove("same-as-selected");
      });
      this.classList.add("same-as-selected");

      // Dispatch a change event on the original select element
      const event = new Event('change');
      selectElement.dispatchEvent(event);

      selectedDiv.click();
    });
    optionsContainerDiv.appendChild(optionDiv);
  });

  customSelect.appendChild(optionsContainerDiv);

  if (customSelect.getAttribute('data-open') === 'false') {
    // optionsContainerDiv.classList.add("song-list__sort__items--hide");
    toggleDropdown(optionsContainerDiv, "close");
  }

  selectedDiv.addEventListener("click", function(e) {
    // When the select box is clicked, close any other select boxes and open/close the current select box
    e.stopPropagation();
    closeAllSelect(this);
    // this.nextSibling.classList.toggle("song-list__sort__items--hide");
    toggleDropdown(optionsContainerDiv);
    this.classList.toggle("song-list__sort__selected--active");
  });
});

function closeAllSelect(element) {
  // A function that will close all select boxes in the document, except the current select box
  const allSelectItems = document.querySelectorAll(".song-list__sort__items");
  const allSelectedItems = document.querySelectorAll(".song-list__sort__selected");

  allSelectItems.forEach((selectItem, index) => {
    if (element === allSelectedItems[index] || allSelectedItems[index].contains(element.target) || selectItem.contains(element.target)) {
      return;
    }
    // selectItem.classList.add("song-list__sort__items--hide");
    toggleDropdown(selectItem, "close");
    allSelectedItems[index].classList.remove("song-list__sort__selected--active");
  });
}

function toggleDropdown(optionsContainerDiv, action = "toggle") {
  if (action === "toggle") {
    if (optionsContainerDiv.classList.contains("song-list__sort__items--hide")) {
      openDropdown(optionsContainerDiv);
    } else {
      closeDropdown(optionsContainerDiv);
    }
  } else if (action === "open") {
    openDropdown(optionsContainerDiv);
  } else if (action === "close") {
    closeDropdown(optionsContainerDiv);
  }
}

function openDropdown(optionsContainerDiv) {
  optionsContainerDiv.classList.remove("song-list__sort__items--hide");

  setTimeout(() => {
    optionsContainerDiv.classList.remove("song-list__sort__items--fade-out");
  }, 0);

}

function closeDropdown(optionsContainerDiv) {
  optionsContainerDiv.classList.add("song-list__sort__items--fade-out");

  setTimeout(() => {
    optionsContainerDiv.classList.add("song-list__sort__items--hide");
  }, 300);
}

// If the user clicks anywhere outside the select box, then close all select boxes
document.addEventListener("click", closeAllSelect);