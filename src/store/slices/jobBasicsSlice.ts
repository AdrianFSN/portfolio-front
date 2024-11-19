import { createSlice } from "@reduxjs/toolkit";
import { updateJobBasicsThunk } from "../thunks/editJobBasicsThunk";

export const editJobBasicsInitialState = {
  data: {},
  loading: false,
  error: undefined as string | undefined,
};

const EditJobBasicsSlice = createSlice({
  name: "editJobBasicsSlice",
  initialState: editJobBasicsInitialState,
  reducers: {
    setEditJobBasics: (state, action) => {
      state.data = action.payload;
    },
    resetEditJobBasics: (state) => {
      state.data = editJobBasicsInitialState.data;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateJobBasicsThunk.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateJobBasicsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = undefined;
      })
      .addCase(updateJobBasicsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setEditJobBasics, resetEditJobBasics } =
  EditJobBasicsSlice.actions;
export default EditJobBasicsSlice.reducer;
