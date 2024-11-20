import { createSlice } from "@reduxjs/toolkit";
import { updateJobVersionThunk } from "../thunks/editJobVersionThunk";

export const editJobVersionInitialState = {
  data: {},
  loading: false,
  error: undefined as string | undefined,
};

const EditJobVersionSlice = createSlice({
  name: "editJobVersionSlice",
  initialState: editJobVersionInitialState,
  reducers: {
    setEditJobVersion: (state, action) => {
      state.data = action.payload;
    },
    resetEditJobVersion: (state) => {
      state.data = editJobVersionInitialState.data;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateJobVersionThunk.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateJobVersionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = undefined;
      })
      .addCase(updateJobVersionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setEditJobVersion, resetEditJobVersion } =
  EditJobVersionSlice.actions;
export default EditJobVersionSlice.reducer;
