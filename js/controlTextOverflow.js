
function limitNumberOfWords(element, fullElementContent, minNumOfWords) {
  const wordsInElement = fullElementContent.split(' ');
  let wordsToBeRendered = "";

  if (wordsInElement.length <= minNumOfWords) return element.textContent;


  for (let i = 0; i < minNumOfWords; i++) {
    wordsToBeRendered += wordsInElement[i];
    if (i === minNumOfWords - 1) {
      wordsToBeRendered += "...";
    } else {
      wordsToBeRendered += " ";
    }
  }

  return wordsToBeRendered;
}

export {
  limitNumberOfWords
}