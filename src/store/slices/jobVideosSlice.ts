import { createSlice } from "@reduxjs/toolkit";
import { updateJobVideosThunk } from "../thunks/editJobVideosThunk";

export const jobVideosInitialState = {
  data: {},
  loading: false,
  error: undefined as string | undefined,
};

const JobVideosSlice = createSlice({
  name: "jobVideosSlice",
  initialState: jobVideosInitialState,
  reducers: {
    setJobVideos: (state, action) => {
      state.data = action.payload;
    },
    resetJobVideos: (state) => {
      state.data = jobVideosInitialState.data;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateJobVideosThunk.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateJobVideosThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = undefined;
      })
      .addCase(updateJobVideosThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setJobVideos, resetJobVideos } = JobVideosSlice.actions;
export default JobVideosSlice.reducer;
