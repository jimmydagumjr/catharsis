import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const userSessionSlice = createSlice({
  name: "userSession",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearSession: (state) => {
      state.session = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setSession, clearSession } = userSessionSlice.actions;
export default userSessionSlice.reducer;
