import { createSlice } from "@reduxjs/toolkit";
import { updateJobPicturesThunk } from "../thunks/editJobPicturesThunk";

export const jobPicturesInitialState = {
  data: {},
  loading: false,
  error: undefined as string | undefined,
};

const JobPicturesSlice = createSlice({
  name: "jobPicturesSlice",
  initialState: jobPicturesInitialState,
  reducers: {
    setJobPictures: (state, action) => {
      state.data = action.payload;
    },
    resetJobPictures: (state) => {
      state.data = jobPicturesInitialState.data;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateJobPicturesThunk.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateJobPicturesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = undefined;
      })
      .addCase(updateJobPicturesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setJobPictures, resetJobPictures } = JobPicturesSlice.actions;
export default JobPicturesSlice.reducer;
