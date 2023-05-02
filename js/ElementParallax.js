export default class ElementParallax {
  #referenceSection;
  #element;
  #startingTranslate;
  #startingPercentage;
  #endingTranslate;
  #endingPercentage;
  #translateRange;
  #percentageRange;

  constructor(referenceSectionElement, element, startingTranslate = { x: 0, y: 0, scale: 1 }, startingPercentage = 0, endingTranslate = { x: 0, y: 0, scale: 1 }, endingPercentage = 1) {
    this.#validateSectionParallaxInput(referenceSectionElement, element, startingTranslate, startingPercentage, endingTranslate, endingPercentage);

    this.#referenceSection = referenceSectionElement;
    this.#element = element;
    this.#startingTranslate = this.#refineTranslateObj(startingTranslate);
    this.#startingPercentage = startingPercentage;
    this.#endingTranslate = this.#refineTranslateObj(endingTranslate);
    this.#endingPercentage = endingPercentage;

    this.#translateRange = {
      x: this.#endingTranslate.x - this.#startingTranslate.x,
      y: this.#endingTranslate.y - this.#startingTranslate.y,
      scale: this.#endingTranslate.scale - this.#startingTranslate.scale,
    }
    this.#percentageRange = this.#endingPercentage - this.#startingPercentage;

    this.#applyCurrentTranslate(this.#startingTranslate);
  }

  apply(currentScroll) {
    const sectionsScrollTop = getElementsScrollTop(this.#referenceSection);
    const scrollInsideSection = currentScroll - sectionsScrollTop;
    const scrollInsideSectionInPercentage = scrollInsideSection / this.#referenceSection.clientHeight;

    if (scrollInsideSectionInPercentage < this.#startingPercentage) {
      this.#applyCurrentTranslate(this.#startingTranslate);
    }
    if (scrollInsideSectionInPercentage >= this.#startingPercentage && scrollInsideSectionInPercentage < this.#endingPercentage) {
      const currentScrollPercentage = (scrollInsideSectionInPercentage - this.#startingPercentage) / this.#percentageRange;
      const currentTranslate = this.#calculateCurrentTranslate(currentScrollPercentage);
      this.#applyCurrentTranslate(currentTranslate);
    }
    if (scrollInsideSectionInPercentage >= this.#endingPercentage) {
      this.#applyCurrentTranslate(this.#endingTranslate);
    }
  }

  #calculateCurrentTranslate(scrollInsideSectionInPercentage) {
    return {
      x: this.#startingTranslate.x +  parseFloat((this.#translateRange.x * scrollInsideSectionInPercentage).toFixed(2)),
      y: this.#startingTranslate.y + parseFloat((this.#translateRange.y * scrollInsideSectionInPercentage).toFixed(2)),
      scale: this.#startingTranslate.scale + parseFloat((this.#translateRange.scale * scrollInsideSectionInPercentage).toFixed(2)),
    }
  }

  #applyCurrentTranslate(currentTranslate) {
    this.#element.style.transform = `translateX(${currentTranslate.x}%) translateY(${currentTranslate.y}%) scale(${currentTranslate.scale})`;
  }

  #validateSectionParallaxInput(referenceSectionElement, element, startingTranslate, startingPercentage, endingTranslate, endingPercentage) {
    if (!referenceSectionElement) {
      throw new Error("Section element has to be provided!");
    } else if (!isDOMElement(referenceSectionElement)) {
      throw new Error("Section element has to be a DOM element!");
    } else if (!element) {
      throw new Error("Parallax element has to be provided!");
    } else if (!isDOMElement(element)) {
      throw new Error("Parallax element has to be a DOM element!");
    } else if (isNaN(startingPercentage)) {
      throw new Error("Starting percentage has to be a number!");
    } else if (isNaN(endingPercentage)) {
      throw new Error("Ending percentage has to be a number!");
    }
  
    this.#validateTranslateProperties(startingTranslate, "Starting");
    this.#validateTranslateProperties(endingTranslate, "Ending");
  }

  #validateTranslateProperties(translateObj, translateName) {
    if (Object.keys(translateObj).some(key => key !== "x" && key !== "y" && key !== "scale")) {
      throw new Error(`${translateName} translate can just have 'x' and 'y' properties!`);
    }
    
    const refinedTranslate = this.#refineTranslateObj(translateObj);
    
    if (isNaN(refinedTranslate.x) || isNaN(refinedTranslate.y) || isNaN(refinedTranslate.scale)) {
      throw new Error(`${translateName} translate properties 'x', 'y' or 'scale' have to be numbers!`);
    }
  }

  #refineTranslateObj(translateObj) {
    return {
      x: translateObj.x == undefined ? 0 : translateObj.x,
      y: translateObj.y == undefined ? 0 : translateObj.y,
      scale: translateObj.scale == undefined ? 1 : translateObj.scale,
    }
  }
}

// returns true if 'o' is a DOM element
function isDOMElement(o){
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
  )
}

function getElementsScrollTop(element) {
  const topDistanceFromViewport = element.getBoundingClientRect().top;
  const windowScrollTop = document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  return topDistanceFromViewport + windowScrollTop - windowHeight;
}