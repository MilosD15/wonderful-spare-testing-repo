const defaultDistanceToLoadOffSection = 500;

export default function lazyLoadSectionFiles(sectionElement, lazyLoadImages, lazyLoadPictures, lazyLoadLottieFiles, distanceToLoadOffSection = defaultDistanceToLoadOffSection) {
  const chooseCharacterLoadingObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
    
      lazyLoadPictures.forEach(preloadPicture);
      lazyLoadImages.forEach(preloadImage);
      lazyLoadLottieFiles.forEach(preloadLottieFile);
    
      chooseCharacterLoadingObserver.unobserve(sectionElement);
    });
  }, { rootMargin: `${distanceToLoadOffSection}px 0px` });
  chooseCharacterLoadingObserver.observe(sectionElement);
}

function preloadLottieFile(lottieData) {
  const {lottiePlayer, lottieFileName} = lottieData;
  lottiePlayer.load(lottieFileName);
}

function preloadPicture(picture) {
  let sources = picture.getElementsByTagName('source');
  let img = picture.getElementsByTagName('img')[0];

  // Replace the srcset of each source with the real image url
  for (let source of sources) {
  source.srcset = source.dataset.srcset;
  }

  // Replace the img src as a fallback
  img.src = img.dataset.src;
}

function preloadImage(img) {
  img.src = img.dataset.src;
}