const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  email: null,
  password: null,
  jwt: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.jwt = action.payload.jwt;
    },
    logout: (state) => {
      state.email = null;
      state.password = null;
      state.jwt = null;
    },
  },
});

export default authSlice;
