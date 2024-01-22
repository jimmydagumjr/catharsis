import { configureStore } from "@reduxjs/toolkit";
import musicPlayerReducer from "./musicPlayerSlice.jsx";
import sessionReducer from "./sessionSlice.jsx";
import resetPasswordReducer from "./resetPasswordSlice.jsx"

export const store = configureStore({
  reducer: {
    musicPlayer: musicPlayerReducer,
    session: sessionReducer,
    resetPassword: resetPasswordReducer
  },
});
