const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  email: null,
  password: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    logout: (state) => {
      state.email = null;
      state.password = null;
    },
  },
});

export default authSlice;
