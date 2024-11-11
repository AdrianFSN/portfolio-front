import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/loginThunk";
import storage from "../../utils/storage";

export const loginInitialState = {
  authState: !!storage.get("authToken"),
  loading: false,
  error: undefined as string | undefined,
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loginInitialState,
  reducers: {
    setAuth: (state, action) => {
      state.authState = action.payload;
    },
    resetLogin: (state) => {
      state.authState = loginInitialState.authState;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state) => {
        state.loading = false;
        state.authState = true;
        state.error = undefined;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setAuth, resetLogin } = loginSlice.actions;
export default loginSlice.reducer;
