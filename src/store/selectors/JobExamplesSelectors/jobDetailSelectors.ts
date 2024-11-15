import { createSelector } from "reselect";
import JobInterface from "../../../@types/Job";
import { RootState } from "../../store";

export const getJobDetailResponseSelector = (state: RootState) => {
  const job = state.jobDetail.data as JobInterface;
  return job;
};
export const getJobDetailSelector = (state: RootState) => {
  const job = state.jobDetail.data as JobInterface;
  return job.data;
};
export const getJobDetailStateSelector = (state: RootState) => {
  const job = state.jobDetail.data as JobInterface;
  return job.state;
};
export const getJobDetailMessageSelector = (state: RootState) => {
  const job = state.jobDetail.data as JobInterface;
  return job.message;
};
export const getJobDetailLoadingSelector = (state: RootState) =>
  state.jobDetail.loading;

export const getJobDetailErrorSelector = (state: RootState) =>
  state.jobDetail.error;

export const getJobDetailImagesSelector = createSelector(
  (state: RootState) => state.jobDetail.data as JobInterface,
  (job) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...filteredPictures } = job.data.pictures;
    return Object.values(filteredPictures);
  }
);

export const getJobDetailVideosSelector = createSelector(
  (state: RootState) => state.jobDetail.data as JobInterface,
  (job) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...filteredVideos } = job.data.videos;
    return Object.values(filteredVideos);
  }
);

export const getJobDetailAudiosSelector = createSelector(
  (state: RootState) => state.jobDetail.data as JobInterface,
  (job) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...filteredAudios } = job.data.audios;
    return Object.values(filteredAudios);
  }
);
