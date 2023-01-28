import { USER_API_URL } from "../config";

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