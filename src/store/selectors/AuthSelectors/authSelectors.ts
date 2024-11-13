import { RootState } from "../../store";

export const getAuthResponseSelector = (state: RootState) => state.login;

export const getIsLoggedSelector = (state: RootState) =>
  state.login.loggedInState;

export const getAuthLoadingSelector = (state: RootState) => state.login.loading;

export const getAuthStateSelector = (state: RootState) => state.login.state;

export const getAuthMessageSelector = (state: RootState) => state.login.message;

export const getAuthErrorSelector = (state: RootState) => state.login.error;
