import { RootState } from "../../store";

interface EditJobBasics {
  data: object;
  message: string;
  state: string;
}
export const getEditJobBasicsLoadingSelector = (state: RootState) =>
  state.editJobBasics.loading;

export const getEditJobBasicsErrorSelector = (state: RootState) =>
  state.editJobBasics.error;

export const getEditJobBasicsStateSelector = (state: RootState) => {
  const editJobBasics = state.editJobBasics.data as EditJobBasics;
  return editJobBasics.state;
};

export const getEditJobBasicsMessageSelector = (state: RootState) => {
  const editJobBasics = state.editJobBasics.data as EditJobBasics;
  return editJobBasics.message;
};
