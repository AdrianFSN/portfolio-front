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
export const getJobsListCurrentPageSelector = (state: RootState) => {
  const jobsPages = state.jobExamplesList.data as Jobs;
  return jobsPages.data?.currentPage;
};
export const getJobsListTotalJobsSelector = (state: RootState) => {
  const totalJobs = state.jobExamplesList.data as Jobs;
  return totalJobs.data?.totalJobs;
};
export const getJobsListTotalPagesSelector = (state: RootState) => {
  const totalPages = state.jobExamplesList.data as Jobs;
  return totalPages.data?.totalPages;
};
export const getJobsCarousselResponseSelector = (state: RootState) => {
  const jobsCaroussel = state.jobsCaroussel.data as Jobs;
  return jobsCaroussel;
};
export const getjobsCarousselSelector = (state: RootState) => {
  const jobsCaroussel = state.jobsCaroussel.data as Jobs;
  return jobsCaroussel.data?.jobExamples;
};
export const getjobsCarousselStateSelector = (state: RootState) => {
  const jobsCaroussel = state.jobsCaroussel.data as Jobs;
  return jobsCaroussel.state;
};
export const getjobsCarousselMessageSelector = (state: RootState) => {
  const jobsCaroussel = state.jobsCaroussel.data as Jobs;
  return jobsCaroussel.message;
};
