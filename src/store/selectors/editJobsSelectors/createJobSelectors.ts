import { RootState } from "../../store";

interface CreateJob {
  data: object;
  message: string;
  state: string;
}
export const getCreateJobLoadingSelector = (state: RootState) =>
  state.createJob.loading;

export const getCreateJobErrorSelector = (state: RootState) =>
  state.createJob.error;

export const getCreateJobStateSelector = (state: RootState) => {
  const createJob = state.createJob.data as CreateJob;
  return createJob.state;
};

export const getCreateJobMessageSelector = (state: RootState) => {
  const createJob = state.createJob.data as CreateJob;
  return createJob.message;
};
