const { createSlice } = require("@reduxjs/toolkit");

const AUTH_KEY_NAME = "auth-ecommerce";
const auth = JSON.parse(localStorage.getItem(AUTH_KEY_NAME));

const initialState = {
  isLoggedIn: !!auth?.token,
  token: auth?.token,
  user: auth?.user,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem(AUTH_KEY_NAME, JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = undefined;
      state.user = undefined;
      localStorage.removeItem(AUTH_KEY_NAME);
    },
  },
});

export default authSlice;
