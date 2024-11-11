import { configureStore } from "@reduxjs/toolkit";
import jobExamplesListReducer from "./slices/jobExamplesSlice";
import jobsCarousselReducer from "./slices/jobsCarousselSlice";
import jobDetailReducer from "./slices/jobDetailSlice";
import loginReducer from "./slices/loginSlice";

export const store = configureStore({
  reducer: {
    jobExamplesList: jobExamplesListReducer,
    jobsCaroussel: jobsCarousselReducer,
    jobDetail: jobDetailReducer,
    login: loginReducer,
  },
  devTools: import.meta.env.VITE_USER_NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
