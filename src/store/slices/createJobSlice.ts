import { createSlice } from "@reduxjs/toolkit";
import { createJobThunk } from "../thunks/createJobThunk ";

export const createJobInitialState = {
  data: {},
  loading: false,
  error: undefined as string | undefined,
};

const CreateJobSlice = createSlice({
  name: "createJobSlice",
  initialState: createJobInitialState,
  reducers: {
    setCreateJob: (state, action) => {
      state.data = action.payload;
    },
    resetCreateJob: (state) => {
      state.data = createJobInitialState.data;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJobThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createJobThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = undefined;
      })
      .addCase(createJobThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCreateJob, resetCreateJob } = CreateJobSlice.actions;
export default CreateJobSlice.reducer;
