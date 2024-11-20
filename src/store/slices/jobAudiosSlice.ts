import { createSlice } from "@reduxjs/toolkit";
import { updateJobAudiosThunk } from "../thunks/editJobAudiosThunk";

export const jobAudiosInitialState = {
  data: {},
  loading: false,
  error: undefined as string | undefined,
};

const JobAudiosSlice = createSlice({
  name: "jobAudioSlice",
  initialState: jobAudiosInitialState,
  reducers: {
    setJobAudios: (state, action) => {
      state.data = action.payload;
    },
    resetJobAudios: (state) => {
      state.data = jobAudiosInitialState.data;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateJobAudiosThunk.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateJobAudiosThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = undefined;
      })
      .addCase(updateJobAudiosThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setJobAudios, resetJobAudios } = JobAudiosSlice.actions;
export default JobAudiosSlice.reducer;
