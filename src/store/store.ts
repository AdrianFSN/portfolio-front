import { configureStore } from "@reduxjs/toolkit";
import jobExamplesListReducer from "./slices/jobExamplesSlice";
import jobsCarousselReducer from "./slices/jobsCarousselSlice";
import jobDetailReducer from "./slices/jobDetailSlice";
import loginReducer from "./slices/loginSlice";
import editJobBasicsReducer from "./slices/jobBasicsSlice";
import jobPicturesReducer from "./slices/jobPicturesSlice";
import jobAudiosReducer from "./slices/jobAudiosSlice";
import jobVideosReducer from "./slices/jobVideosSlice";
import jobVersionReducer from "./slices/jobVersionSlice";

export const store = configureStore({
  reducer: {
    jobExamplesList: jobExamplesListReducer,
    jobsCaroussel: jobsCarousselReducer,
    jobDetail: jobDetailReducer,
    login: loginReducer,
    editJobBasics: editJobBasicsReducer,
    jobPictures: jobPicturesReducer,
    jobVideos: jobVideosReducer,
    jobAudios: jobAudiosReducer,
    jobVersion: jobVersionReducer,
  },
  devTools: import.meta.env.VITE_USER_NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
