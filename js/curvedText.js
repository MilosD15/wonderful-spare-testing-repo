export function makeHeadingCurved(curvedHeadingElement, radius = 2000, maxFontSize = 7, translateYValues = [0, -20, -25, -30, -35, -40]) {
    if (!curvedHeadingElement) return;

    const elementsToBeCurved = prepareTextToBeCurved(curvedHeadingElement);

    curvedHeadingElement.innerHTML = '';

    elementsToBeCurved.forEach((element, index) => {
        element.classList.add("curved-heading__piece");
        curvedHeadingElement.appendChild(element);
        makeTextCurved(element, radius, maxFontSize);
        adjustHeadingPlacement(element, index, translateYValues);
    });
}

function makeTextCurved(curvedHeadingText, radius, maxFontSize) {
    const element = document.createElement("div");
    element.textContent = curvedHeadingText.textContent;

    curvedHeadingText.innerHTML = '';

    makeTextShadow(element, curvedHeadingText, radius, maxFontSize);
    curvedHeadingText.appendChild(element);
    new CircleType(element).radius(radius);
    setCurvedHeadingFontSize(element, maxFontSize);
}

function prepareTextToBeCurved(curvedHeadingElement) {
    const delimiter = "<br>";
    const curvedHeadingTextContent = curvedHeadingElement.innerHTML;

    const sequences = splitStrings(curvedHeadingTextContent, delimiter);

    return makeElements(sequences);
}

function makeElements(sequences) {
    return sequences.map(sequence => {
        const div = document.createElement("div");
        div.textContent = sequence;
        return div;
    });
}

function makeTextShadow(element, curvedHeadingText, radius, maxFontSize) {
    const textShadow = document.createElement("div");
    textShadow.textContent = element.textContent;
    textShadow.classList.add("curved-heading__text-shadow");

    curvedHeadingText.appendChild(textShadow);
    new CircleType(textShadow).radius(radius);
    setCurvedHeadingFontSize(textShadow, maxFontSize);
}

function splitStrings(curvedHeadingTextContent, delimiter) {
    const sequences = curvedHeadingTextContent.split(delimiter);
    const trimmedSequences = sequences.map(sequence => sequence.trim());
    return trimmedSequences.filter(sequence => sequence !== "");
}

function setCurvedHeadingFontSize(curvedHeadingElement, maxFontSize) {
    const numberOfCharacters = curvedHeadingElement.textContent.split('').length;
    const fontSize = (100 / numberOfCharacters + 1) > maxFontSize ? maxFontSize : 100 / numberOfCharacters + 1;
    curvedHeadingElement.style.fontSize = `${fontSize}vw`;
}

function adjustHeadingPlacement(element, index, translateYValues) {
    element.style.transform = `translateY(${translateYValues[index]}%)`;
}