const { createSlice } = require("@reduxjs/toolkit");

const TOKEN_NAME = "auth-token";
const token = localStorage.getItem(TOKEN_NAME);

const initialState = {
  token: token,
  isLoggedIn: !!token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem(TOKEN_NAME, action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem(TOKEN_NAME);
    },
  },
});

export default authSlice;
