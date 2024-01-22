import { createSlice } from "@reduxjs/toolkit";

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    passwordRecoveryEvent: false,
  },
  reducers: {
    setPasswordRecoveryEvent: (state, action) => {
      state.passwordRecoveryEvent = action.payload;
    },
  },
});

export const { setPasswordRecoveryEvent } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
