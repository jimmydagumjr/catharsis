import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action) => {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: Object.keys(action.payload).length > 0,
      };
    },
    clearSession: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
