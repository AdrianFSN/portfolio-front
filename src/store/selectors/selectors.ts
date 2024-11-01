import Jobs from "../../@types/jobs";
import { RootState } from "../store";

export const getJobExamplesResponseSelector = (state: RootState) => {
  const jobs = state.jobExamplesList.data as Jobs;
  return jobs;
};
export const getJobExamplesListSelector = (state: RootState) => {
  const jobs = state.jobExamplesList.data as Jobs;
  return jobs.data?.jobExamples;
};
export const getJobsListStateSelector = (state: RootState) => {
  const jobs = state.jobExamplesList.data as Jobs;
  return jobs.state;
};
export const getJobsListMessageSelector = (state: RootState) => {
  const jobs = state.jobExamplesList.data as Jobs;
  return jobs.message;
};
export const getJobsListLoadingSelector = (state: RootState) => {
  return state.jobExamplesList.loading;
};
