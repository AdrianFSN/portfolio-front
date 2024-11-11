import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/loginThunk";

export const loginInitialState = {
  data: {},
  loading: false,
  error: undefined as string | undefined,
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loginInitialState,
  reducers: {
    setLogin: (state, action) => {
      state.data = action.payload;
    },
    resetLogin: (state) => {
      state.data = loginInitialState.data;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = undefined;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLogin, resetLogin } = loginSlice.actions;
export default loginSlice.reducer;
