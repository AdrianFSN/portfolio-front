import Job from "../../../@types/job";
import { RootState } from "../../store";

export const getJobDetailResponseSelector = (state: RootState) => {
  const job = state.jobDetail.data as Job;
  return job;
};
export const getJobDetailSelector = (state: RootState) => {
  const job = state.jobDetail.data as Job;
  return job.data;
};
export const getJobDetailStateSelector = (state: RootState) => {
  const job = state.jobDetail.data as Job;
  return job.state;
};
export const getJobDetailMessageSelector = (state: RootState) => {
  const job = state.jobDetail.data as Job;
  return job.message;
};
export const getJobDetailLoadingSelector = (state: RootState) => {
  return state.jobDetail.loading;
};
export const getJobDetailErrorSelector = (state: RootState) => {
  return state.jobDetail.error;
};
export const getJobDetailImagesSelector = (state: RootState) => {
  const job = state.jobDetail.data as Job;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...filteredPictures } = job.data.pictures;
  const pictures = Object.values(filteredPictures);
  return pictures;
};
export const getJobDetailVideosSelector = (state: RootState) => {
  const job = state.jobDetail.data as Job;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...filteredVideos } = job.data.videos;
  const videos = Object.values(filteredVideos);
  return videos;
};
export const getJobDetailAudiosSelector = (state: RootState) => {
  const job = state.jobDetail.data as Job;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...filteredAudios } = job.data.audios;
  const audios = Object.values(filteredAudios);
  return audios;
};
