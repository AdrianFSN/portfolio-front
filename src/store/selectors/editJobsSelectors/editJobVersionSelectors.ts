import { RootState } from "../../store";

interface EditJobVersion {
  data: object;
  message: string;
  state: string;
}
export const getJobVersionLoadingSelector = (state: RootState) =>
  state.jobVersion.loading;

export const getJobVersionErrorSelector = (state: RootState) =>
  state.jobVersion.error;

export const getJobVersionStateSelector = (state: RootState) => {
  const jobVersion = state.jobVersion.data as EditJobVersion;
  return jobVersion.state;
};

export const getJobVersionMessageSelector = (state: RootState) => {
  const jobVersion = state.jobVersion.data as EditJobVersion;
  return jobVersion.message;
};
