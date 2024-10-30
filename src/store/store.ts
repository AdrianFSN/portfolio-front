import { configureStore } from "@reduxjs/toolkit";

import jobExamplesListReducer from "./slices/jobExamplesSlice";

export const store = configureStore({
  reducer: {
    jobExamplesList: jobExamplesListReducer,
  },
  devTools: import.meta.env.VITE_USER_NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
