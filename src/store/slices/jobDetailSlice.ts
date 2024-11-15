import { createSlice } from "@reduxjs/toolkit";
import { deleteJobThunk, getJobDetailThunk } from "../thunks/jobDetailThunk";

export const jobDetailInitialState = {
  data: {},
  loading: false,
  error: undefined as string | undefined,
};

const JobDetailSlice = createSlice({
  name: "jobDetailSlice",
  initialState: jobDetailInitialState,
  reducers: {
    setJobDetail: (state, action) => {
      state.data = action.payload;
    },
    resetJobDetail: (state) => {
      state.data = jobDetailInitialState.data;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobDetailThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJobDetailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = undefined;
      })
      .addCase(getJobDetailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteJobThunk.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(deleteJobThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = undefined;
      })
      .addCase(deleteJobThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setJobDetail, resetJobDetail } = JobDetailSlice.actions;
export default JobDetailSlice.reducer;
