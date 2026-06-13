import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

// ✅ These are named exports and must exist exactly like this:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;