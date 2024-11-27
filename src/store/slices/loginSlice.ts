import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/loginThunk";
import storage from "../../utils/storage";

export const loginInitialState = {
  message: "",
  state: "",
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
      state.loggedInState = false;
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
      .addCase(loginThunk.fulfilled, (state) => {
        state.loading = false;
        state.loggedInState = true;
        state.message = "Login successful!";
        state.state = "success";
        state.error = undefined;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.message = "Something went wrong";
        state.state = "error";
        state.error = action.payload as string;
      });
  },
});

export const { setAuth, resetLogin } = loginSlice.actions;
export default loginSlice.reducer;
