import { configureStore } from "@reduxjs/toolkit";
import musicPlayerReducer from "./musicPlayerSlice.jsx";

export const store = configureStore({
  reducer: {
    musicPlayer: musicPlayerReducer,
  },
});
