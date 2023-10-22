import { isSectionInViewPort, getElementsScrollTop } from "./additional-func.js";

if (document.querySelector("[data-product-hero-container]")) {
  const productHeroContainer = document.querySelector("[data-product-hero-container]");
  const productHeroGraphicPart = document.querySelector("[data-product-hero-graphic-part]");
  const productHeroContentPart = document.querySelector("[data-product-hero-content-part]");

  // adjust height of product hero container
  window.addEventListener("load", adjustHeightOfProductHeroContainer);
  window.addEventListener("resize", adjustHeightOfProductHeroContainer);
  // make graphic part relative to scroll
  // window.addEventListener("load", makeGraphicPartRelativeToScroll);
  // window.addEventListener("scroll", makeGraphicPartRelativeToScroll);
  

  function adjustHeightOfProductHeroContainer() {
    if (window.innerWidth < 1300) return;

    if (productHeroGraphicPart.clientHeight >= productHeroContentPart.clientHeight) {
      productHeroContainer.classList.add("adjust-height-for-bigger-screens");
    } else {
      productHeroContainer.classList.remove("adjust-height-for-bigger-screens");
    }
  }

  // function makeGraphicPartRelativeToScroll() {
  //   removePositioningClasses(productHeroGraphicPart);

  //   if (window.innerWidth < 1300) return;
  //   if (productHeroGraphicPart.clientHeight >= productHeroContentPart.clientHeight) return;

  //   const currentScroll = document.documentElement.scrollTop;
  //   const sectionScrollTop = getElementsScrollTop(productHeroContainer);
  //   const scrollInsideSection = currentScroll - sectionScrollTop;
  //   const windowHeight = window.innerHeight;

  //   if (!isSectionInViewPort(productHeroContainer)) return;
  //   if (scrollInsideSection <= windowHeight) {
  //     productHeroGraphicPart.classList.add("absolute-top-0"); return;
  //   }
    
  //   const difference = scrollInsideSection - windowHeight;
  //   // const topExtentToBeCentered = (windowHeight - productHeroGraphicPart.clientHeight) / 2;

  //   if (difference + productHeroGraphicPart.clientHeight > productHeroContainer.clientHeight) {
  //     productHeroGraphicPart.classList.add("absolute-bottom-0"); return;
  //   }

  //   productHeroGraphicPart.classList.add("fixed-top-0");
  //   // productHeroGraphicPart.style.top = `${difference}px`;
  // }

  // function removePositioningClasses(productHeroGraphicPart) {
  //   productHeroGraphicPart.classList.remove("absolute-top-0");
  //   productHeroGraphicPart.classList.remove("absolute-bottom-0");
  //   productHeroGraphicPart.classList.remove("fixed-top-0");
  // }
}