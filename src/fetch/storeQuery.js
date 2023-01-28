import { PRODUCT_API_URL } from "../config";

export const getAllSections = async () => {
  const response = await fetch(`${PRODUCT_API_URL}/sections`);
  const data = await response.json();
  return data;
};

export const getSection = async (sectionId) => {
  const response = await fetch(`${PRODUCT_API_URL}/sections/${sectionId}`);
  const data = await response.json();
  return data;
};

export const getCategory = async (categoryId) => {
  const response = await fetch(`${PRODUCT_API_URL}/categories/${categoryId}`);
  const data = await response.json();
  return data;
};

export const getProduct = async (productId) => {
  const response = await fetch(`${PRODUCT_API_URL}/products/${productId}`);
  const data = await response.json();
  return data;
};

export const addReviewOfProduct = async (review, product, user) => {
  review.product = { productId: product.productId };
  review.userName = user.userName;
  review.userId = user.userId;

  const response = await fetch(`${PRODUCT_API_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  const data = await response.json();
  return data;
};

export const deleteReviewOfProduct = async (review, product, user) => {
  review.product = { productId: product.productId };
  review.userName = user.userName;
  review.userId = user.userId;

  const response = await fetch(`${PRODUCT_API_URL}/reviews`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  const data = await response.json();
  return data;
};
