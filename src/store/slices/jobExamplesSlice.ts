import { createSlice } from "@reduxjs/toolkit";
import { getJobExamplesListThunk } from "../thunks/jobExamplesListThunk";

export const jobExamplesInitialState = {
  data: [],
  loading: false,
  error: undefined as string | undefined,
};

const JobExamplesSlice = createSlice({
  name: "jobExamplesSlice",
  initialState: jobExamplesInitialState,
  reducers: {
    setJobExamples: (state, action) => {
      state.data = action.payload;
    },
    resetJobExamples: (state) => {
      state.data = jobExamplesInitialState.data;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobExamplesListThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJobExamplesListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = undefined;
      })
      .addCase(getJobExamplesListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setJobExamples, resetJobExamples } = JobExamplesSlice.actions;
export default JobExamplesSlice.reducer;
