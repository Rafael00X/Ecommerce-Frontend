import { BACKEND_ONE_API_URL } from "../config";

export const getAllSections = async () => {
  const response = await fetch(`${BACKEND_ONE_API_URL}/sections`);
  const data = await response.json();
  return data;
};

export const getSection = async (sectionId) => {
  const response = await fetch(`${BACKEND_ONE_API_URL}/sections/${sectionId}`);
  const data = await response.json();
  return data;
};

export const getCategory = async (categoryId) => {
  const response = await fetch(
    `${BACKEND_ONE_API_URL}/categories/${categoryId}`
  );
  const data = await response.json();
  return data;
};

export const getProduct = async (productId) => {
  const response = await fetch(`${BACKEND_ONE_API_URL}/products/${productId}`);
  const data = await response.json();
  return data;
};
