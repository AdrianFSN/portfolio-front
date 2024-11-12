import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/loginThunk";
import storage from "../../utils/storage";

export const loginInitialState = {
  loggedInState: !!storage.get("authToken"),
  loading: false,
  error: undefined as string | undefined,
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loginInitialState,
  reducers: {
    setAuth: (state, action) => {
      state.loggedInState = action.payload;
    },
    resetLogin: (state) => {
      state.loggedInState = loginInitialState.loggedInState;
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
        state.loggedInState = true;
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
