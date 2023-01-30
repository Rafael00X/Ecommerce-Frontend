import { USER_API_URL } from "../config";

export const getCart = async (user) => {
  const response = await fetch(`${USER_API_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  console.log(data);
  // if (response.ok)
  const products = data.cartItems.map((cartItem) => {
    const product = cartItem.product;
    product.quantity = cartItem.quantity;
    return product;
  });
  const cart = { ...data, cartItems: products };
  return cart;
};

export const getProductFromCart = async (productId, user) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) return false;
  return cart.products.find((product) => product.productId === productId);
};

export const addProductToCart = async (productId, user) => {
  const response = await fetch(`${USER_API_URL}/cart/add-item`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, productId }),
  });

  const data = await response.json();
  console.log(data);
  // if (response.ok)
  return true;
  // let cart = JSON.parse(localStorage.getItem("cart"));
  // if (!cart) cart = { products: [] };
  // if (cart.products.find((product) => product.productId === productId))
  //   return false;
  // cart.products.push({ productId, quantity: 1 });
  // localStorage.setItem("cart", JSON.stringify(cart));
  // return true;
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
