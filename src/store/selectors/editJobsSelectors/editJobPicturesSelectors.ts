import { RootState } from "../../store";

interface JobPictures {
  data: object;
  message: string;
  state: string;
}
export const getJobPicturesLoadingSelector = (state: RootState) =>
  state.jobPictures.loading;

export const getJobPicturesErrorSelector = (state: RootState) =>
  state.jobPictures.error;

export const getJobPicturesStateSelector = (state: RootState) => {
  const jobPictures = state.jobPictures.data as JobPictures;
  return jobPictures.state;
};

export const getJobPicturesMessageSelector = (state: RootState) => {
  const jobPictures = state.jobPictures.data as JobPictures;
  return jobPictures.message;
};
