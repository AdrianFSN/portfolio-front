import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/loginThunk";
import storage from "../../utils/storage";
import StandardResponseInterface from "../../@types/StandardResponse";

export const loginInitialState = {
  message: "",
  state: "",
  loggedInState: !!storage.get("authToken"),
  startSessionCountdown: false,
  loading: false,
  error: undefined as string | undefined,
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loginInitialState,
  reducers: {
    setAuth: (state, action) => {
      state.loggedInState = action.payload;
      state.startSessionCountdown = true;
    },
    resetLogin: (state) => {
      state.loggedInState = false;
      state.startSessionCountdown = false;
      state.message = loginInitialState.message;
      state.state = loginInitialState.state;
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
        state.loggedInState = true;
        state.startSessionCountdown = true;
        state.message = (
          action.payload as unknown as StandardResponseInterface
        ).message;
        state.state = "success";
        state.error = undefined;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.message = (
          action.payload as unknown as StandardResponseInterface
        ).message;
        state.state = "error";
        state.error = action.payload as string;
      });
  },
});

export const { setAuth, resetLogin } = loginSlice.actions;
export default loginSlice.reducer;
