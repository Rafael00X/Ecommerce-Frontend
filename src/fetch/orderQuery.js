import { USER_API_URL } from "../config";

export const placeOrder = async (user) => {
  const response = await fetch(`${USER_API_URL}/orders/add-orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (response.ok) return true;
  return false;
};

export const getOrders = async (user) => {
  const response = await fetch(`${USER_API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const orderItems = await response.json();
  console.log(orderItems);
  return orderItems;
};
