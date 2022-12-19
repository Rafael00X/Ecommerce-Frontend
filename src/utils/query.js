import { categoryData, productData, sectionData } from "./database";

export const getAllSections = async () => {
  sectionData.forEach(async (section) => {
    section["categories"] = await getCategoriesOfSection(section.sectionId);
  });
  return sectionData;
};

const getCategoriesOfSection = async (sectionId) => {
  return categoryData.filter((category) => category.sectionId === sectionId);
};

export const getSection = async (sectionId) => {
  const section = sectionData.find((sec) => sec.sectionId === sectionId);
  section["categories"] = await getCategoriesOfSection(sectionId);
  return section;
};

const getProductsOfCategory = async (categoryId) => {
  return productData.filter((product) => product.categoryId === categoryId);
};

export const getCategory = async (categoryId) => {
  const category = categoryData.find(
    (categ) => categ.categoryId === categoryId
  );
  category["products"] = await getProductsOfCategory(categoryId);
  return category;
};

export const getProduct = async (productId) => {
  const product = productData.find(
    (product) => product.productId === productId
  );
  product.description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  product.totalRating = 12;
  product.reviewCount = 3;
  // product.reviews = [];
  return product;
};

export const addProductToCart = async (productId, quantity) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart)
    cart = {
      products: [],
    };
  if (cart.products.find((product) => product.productId === productId))
    return false;
  cart.products.push({ productId, quantity });
  localStorage.setItem("cart", JSON.stringify(cart));
  return true;
};

export const getProductFromCart = async (productId) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) return false;
  return cart.products.find((product) => product.productId === productId);
};

export const getCart = async () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) return [];
  const products = [];
  for (let i = 0; i < cart.products.length; i++) {
    const product = await getProduct(cart.products[i].productId);
    product.quantity = cart.products[i].quantity;
    products.push(product);
  }
  return products;
};
