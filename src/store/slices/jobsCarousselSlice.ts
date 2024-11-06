import { createSlice } from "@reduxjs/toolkit";
import { getJobsCarousselThunk } from "../thunks/jobsCarousselThunk";

export const jobsCarousselInitialState = {
  data: {},
  loading: false,
  error: undefined as string | undefined,
};

const JobsCarousselSlice = createSlice({
  name: "jobsCarousselSlice",
  initialState: jobsCarousselInitialState,
  reducers: {
    setJobsCaroussel: (state, action) => {
      state.data = action.payload;
    },
    resetJobsCaroussel: (state) => {
      state.data = jobsCarousselInitialState.data;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobsCarousselThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJobsCarousselThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = undefined;
      })
      .addCase(getJobsCarousselThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setJobsCaroussel: setJobExamples,
  resetJobsCaroussel: resetJobExamples,
} = JobsCarousselSlice.actions;
export default JobsCarousselSlice.reducer;
