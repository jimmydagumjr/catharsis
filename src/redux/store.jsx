import { configureStore } from "@reduxjs/toolkit";
import musicPlayerReducer from "./musicPlayerSlice.jsx";
import userSessionReducer from "./userSessionSlice.jsx";

export const store = configureStore({
  reducer: {
    musicPlayer: musicPlayerReducer,
    userSession: userSessionReducer,
  },
});
