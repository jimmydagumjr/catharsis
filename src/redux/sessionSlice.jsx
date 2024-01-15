import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action) => {
      return {
        ...state,
        ...action.payload,
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
