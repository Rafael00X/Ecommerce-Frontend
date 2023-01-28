import { productData, userData } from "./database";
import { PRODUCT_API_URL, USER_API_URL } from "../config";

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

export const addProductToCart = async (productId, user) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) cart = { products: [] };
  if (cart.products.find((product) => product.productId === productId))
    return false;
  cart.products.push({ productId, quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  return true;
};

export const removeProductFromCart = async (productId, user) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) cart = { products: [] };
  cart.products = cart.products.filter(
    (product) => product.productId !== productId
  );
  localStorage.setItem("cart", JSON.stringify(cart));
  return await getCart();
};

export const updateProductInCart = async (productId, quantity, user) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) localStorage.setItem("cart", JSON.stringify({ products: [] }));
  const product = cart.products.find(
    (product) => product.productId === productId
  );
  product.quantity = quantity;
  localStorage.setItem("cart", JSON.stringify(cart));
  return await getCart();
};

export const getProductFromCart = async (productId, user) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) return false;
  return cart.products.find((product) => product.productId === productId);
};

export const getCart = async (user) => {
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

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${USER_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error("Failed to login");
    if (data.message === "Email not registered") {
      error.props = {
        email: "Email not registered",
      };
    } else if (data.message === "Invalid credentials") {
      error.props = {
        email: "Invalid credentials",
        password: "Invalid credentials",
      };
    }
    throw error;
  }

  return {
    token: data.token,
    user: {
      userId: data.userId,
      userName: data.userName,
    },
  };
};

export const registerUser = async ({ username, email, password }) => {
  const response = await fetch(`${USER_API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, userName: username }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error("Email registered");
    if (data.message === "Email already registered") {
      error.props = {
        email: "Email already registered",
      };
    }
    throw error;
  }
  return {
    token: data.token,
    user: {
      userId: data.userId,
      userName: data.userName,
    },
  };
};

export const placeOrder = async (user) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) return false;
  let orders = JSON.parse(localStorage.getItem("orders"));
  if (!orders) orders = [];
  cart.products.forEach((product) => {
    product.date = new Date().toString();
    orders.push(product);
  });
  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("cart");
  return true;
};

export const getOrders = async (user) => {
  const orders = JSON.parse(localStorage.getItem("orders"));
  if (!orders) return [];
  return orders.map((order) => {
    const product = productData.find(
      (product) => product.productId === order.productId
    );
    return { ...order, ...product };
  });
};
