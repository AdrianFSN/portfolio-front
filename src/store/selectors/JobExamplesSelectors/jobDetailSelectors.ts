import Job from "../../../@types/Job";
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
