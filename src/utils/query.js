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
  return productData.find((product) => product.productId === productId);
};
