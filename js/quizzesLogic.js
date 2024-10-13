const productHandlesMap = new Map([
  ["sticks-chocolate", "chocolate-fluoride-varnish"],
  ["sticks-bubblegum", "bubblegum-fluoride-varnish"],
  ["sticks-strawberry", "strawberry-fluoride-varnish"],
  ["sticks-marshmallow", "marshmallow-varnish"],
  ["sticks-smores", "smores-varnish"],
  ["sticks-mint", "mint-fluoride-varnish"],
  ["cups-chocolate", "copy-of-chocolate-fluoride-varnish-cups-brushes-not-included"],
  ["cups-bubblegum", "copy-of-bubblegum-fluoride-varnish-cups-brushes-not-included"],
  ["cups-strawberry", "strawberry-fluoride-varnish-cups-bundled-with-brushes"],
  ["cups-marshmallow", "marshmallow-varnish-cups-w-brushes"],
  ["cups-smores", "smores-fluoride-varnish-cups"],
  ["cups-mint", "mint-fluoride-varnish-cups-bundled-with-brushes"],
  ["adult-bubblegum", "adult-bubblegum-prophy-paste"],
  ["adult-mint", "adult-mint-prophy-paste"],
  ["paste-chocolate", "chocolate-prophy-paste"],
  ["paste-bubblegum", "bubblegum-prophy-paste"],
  ["paste-strawberry", "strawberry-prophy-paste"],
  ["paste-marshmallow", "marshmallow-prophy-paste"],
  ["paste-mint", "mint-prophy-paste"],
  ["paste-variety", "copy-of-variety-prophy-paste"],
  ["paste-plain", "plain-prophy-paste"],
  ["brushes", "additional-microbrushes-100-pack"],
  ["angles-hard", "hard-prophy-angles-latex-free"],
  ["angles-soft", "prophy-angle"],
]);

const quizPointsProductType = {
  adultProphyPaste: 0,
  prophyPaste: 2,
  varnishSticks: 2,
  varnishCups: 3,
  accessories: 0,
}
const quizPointsProductFlavor = {
  bubblegum: 2,
  chocolate: 0,
  mint: 3,
  plain: 2,
  strawberry: 1,
  marshmallow: 0,
  smores: 5,
  variety: 4,
}
const quizPointsAccessoriesType = {
  brushes: 0,
  anglesSoft: 0,
  anglesFirm: 0,
};

const bestProducts = determineBestProducts(quizPointsProductType, quizPointsProductFlavor);

console.log(bestProducts);

function determineBestProducts(pointsProductType, pointsProductFlavor, pointsAccessoriesType = null) {
  let topProducts = [];
  const top3ProductTypes = getTop3ProductTypes(pointsProductType);
  const sortedProductFlavors = sortProductAttributes(pointsProductFlavor);

  top3ProductTypes.forEach((type) => {
    if (type === "accessories") {
      topProducts.push(determineWhichAccessories(pointsAccessoriesType));
    } else {
      topProducts.push(determineWhichProduct(type, sortedProductFlavors));
    }
  });

  const topProductsHandles = topProducts.map((product) => productHandlesMap.get(product));
  return topProductsHandles;
}

function getTop3ProductTypes(pointsProductType) {
  const sortedProductTypes = sortProductAttributes(pointsProductType);
  return sortedProductTypes.slice(0, 3);
}

function determineWhichAccessories(pointsAccessoriesType) {
  if ((pointsAccessoriesType.brushes == pointsAccessoriesType.anglesSoft
    && pointsAccessoriesType.brushes == pointsAccessoriesType.anglesFirm)
    || pointsAccessoriesType === null) {
    return getRandomAccessories();
  }

  const sortedAccessoriesTypes = sortProductAttributes(pointsAccessoriesType);
  return getAccessoriesProductName(sortedAccessoriesTypes[0]);
}

function getRandomAccessories() {
  const productVariants = ["brushes", "angles-soft", "angles-firm"];

  return productVariants[Math.floor(Math.random() * productVariants.length)];
}

function getAccessoriesProductName(accessoriesType) {
  switch (accessoriesType) {
    case "brushes":
      return "brushes";
    case "anglesSoft":
      return "angles-soft";
    case "anglesFirm":
      return "angles-firm";
  }
}

function determineWhichProduct(productType, sortedProductFlavors) {
  const productFlavors = getProductFlavors(productType);
  const productTypeBase = getProductTypeBase(productType);
  
  for (let flavor of sortedProductFlavors) {
    if (productFlavors.includes(flavor)) {
      return `${productTypeBase}-${flavor}`;
    }
  }
}

function getProductFlavors(productType) {
  switch (productType) {
    case "adultProphyPaste":
      return ["bubblegum", "mint"];
    case "prophyPaste":
      return ["bubblegum", "chocolate", "mint", "plain", "strawberry", "marshmallow", "variety"];
    case "varnishSticks":
    case "varnishCups":
      return ["bubblegum", "chocolate", "mint", "smores", "strawberry", "marshmallow"];
  }
}

function getProductTypeBase(productType) {
  switch (productType) {
    case "adultProphyPaste":
      return "adult";
    case "prophyPaste":
      return "paste";
    case "varnishSticks":
      return "sticks";
    case "varnishCups":
      return "cups";
  }
}

function sortProductAttributes(pointsProductAttribute) {
  return Object.keys(pointsProductAttribute).sort(
    (a, b) => pointsProductAttribute[b] - pointsProductAttribute[a]);
}

/*

PRODUCT TYPES:
- Adult Prophy Paste
- Prophy Paste
- Varnish
- Accessories

PRODUCT VARIANTS:
- Sticks (variant of Varnish)
- Cups (variant of Varnish)
- Brushes (variant of Accessories)
- Angles Soft (variant of Accessories)
- Angles Firm (variant of Accessories)

PRODUCT FLAVORS:
- Bubblegum
- Chocolate
- Mint
- Plain
- Strawberry
- Marshmallow
- Smores
- Variety
DISCLAIMER: The product flavors are not the same for all product types and variants. For example, the smores flavor is not available for the Adult Prophy Paste or Prophy Paste product types.


QUIZZES RULES:
- The first question always determines what three types of products will be recommended to the user.
- There will always be the question that will determine a specific product variant. For example, if the varnish product type is selected, some other question will determine whether the user will be recommended a sticks or cups variant.
- The rest of the questions will determine the product flavor.
- If the question is concerning product type, all products of that type will get the corresponding number of points. For example, if the user selects the prophy paste product type,  prophy paste products of all flavors will get the corresponding number of points.
- If the question is concerning product variant, only the products of that variant will get the corresponding number of points. For example, if the user selects the sticks variant, only the sticks products will get the corresponding number of points.
- If the question is concerning product flavor, only the products of that flavor will get the corresponding number of points. For example, if the user selects the mint flavor, only the mint products will get the corresponding number of points.


HOW TO SET UP NEW QUIZ QUESTIONS POINTS:
- The first question always takes 1000 points if there is no any product variant that should be determined later on. If there is a product variant that should be determined later on, the first question takes 500 points.
- The question that determines the product variant always takes 100 points.
- The question that determines the product flavor always takes 1 point.


FIRST QUESTION EXAMPLE:
- What kind of office are you
  - Family clinic: 
    - 1000 points for all Adult Prophy Paste products
    - 1000 points for all Prophy Paste products
    - 1000 points for all Varnish products
  - Pediatric Dentist
    - 1000 points for all Prophy Paste products
    - 500 points for all Varnish products
*/

