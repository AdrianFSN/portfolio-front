import { RootState } from "../../store";

interface JobVideos {
  data: object;
  message: string;
  state: string;
}
export const getJobVideosLoadingSelector = (state: RootState) =>
  state.jobPictures.loading;

export const getJobVideosErrorSelector = (state: RootState) =>
  state.jobPictures.error;

export const getJobVideosStateSelector = (state: RootState) => {
  const jobVideos = state.jobPictures.data as JobVideos;
  return jobVideos.state;
};

export const getJobVideosMessageSelector = (state: RootState) => {
  const jobVideos = state.jobPictures.data as JobVideos;
  return jobVideos.message;
};
