import { RootState } from "../../store";

interface JobAudios {
  data: object;
  message: string;
  state: string;
}
export const getJobAudiosLoadingSelector = (state: RootState) =>
  state.jobPictures.loading;

export const getJobAudiosErrorSelector = (state: RootState) =>
  state.jobPictures.error;

export const getJobAudiosStateSelector = (state: RootState) => {
  const jobAudios = state.jobPictures.data as JobAudios;
  return jobAudios.state;
};

export const getJobAudiosMessageSelector = (state: RootState) => {
  const jobAudios = state.jobPictures.data as JobAudios;
  return jobAudios.message;
};
