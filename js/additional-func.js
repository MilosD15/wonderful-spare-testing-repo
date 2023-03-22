
function isSectionInViewPort(sectionElement) {
    const currentScroll = document.documentElement.scrollTop;
    const sectionScrollTop = getElementsScrollTop(sectionElement);
    const scrollInsideSection = currentScroll - sectionScrollTop;
    
    const sectionHeight = sectionElement.getBoundingClientRect().height;
    const sectionTopDistanceFromEdge = sectionElement.getBoundingClientRect().top;

    if (sectionTopDistanceFromEdge > 0) return scrollInsideSection > 0;

    return (scrollInsideSection > 0) && (Math.abs(sectionTopDistanceFromEdge) - sectionHeight < 0);
}

function getElementsScrollTop(element) {
    const topDistanceFromViewport = element.getBoundingClientRect().top;
    const windowScrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    return topDistanceFromViewport + windowScrollTop - windowHeight;
}

function getCSSPropertyValueFromRoot(propertyName) {
    const root = document.querySelector(":root");
    const rootStyles = getComputedStyle(root);
    return rootStyles.getPropertyValue(propertyName);
}

function range(start, end, step) {
    const numbers = [];
    for (let i = start; i <= end; i += step) {
        numbers.push(i);
    }
    return numbers;
}

export {
    isSectionInViewPort,
    getElementsScrollTop,
    getCSSPropertyValueFromRoot,
    range
}