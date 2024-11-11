import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { client, setAuthorizationHeader } from "../../api/client";
import { SESSION_LOGIN_API_URI } from "../../utils/constants";
import storage from "../../utils/storage";
import AuthResponseInterface from "../../@types/AuthResponse";

interface FetchLoginParams {
  email: string;
  password: string;
}

export const loginThunk = createAsyncThunk<
  AxiosResponse<AuthResponseInterface>,
  FetchLoginParams
>("login", async ({ email, password }) => {
  const credentials = {
    email,
    password,
  };
  const url = SESSION_LOGIN_API_URI;
  const response = await client.post(url, credentials);

  if (response && response.data.token) {
    setAuthorizationHeader(response.data.token);
    storage.set("authToken", response.data.token);
  }
  return response;
});
