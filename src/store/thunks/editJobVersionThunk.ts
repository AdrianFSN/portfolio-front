import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { client } from "../../api/client";
import { VERSION_API_URI } from "../../utils/constants";
import StandardResponseInterface from "../../@types/StandardResponse";

interface FetchJobVersionParams {
  versionId: string;
  formData: object;
}

export const updateJobVersionThunk = createAsyncThunk<
  AxiosResponse<StandardResponseInterface>,
  FetchJobVersionParams
>(
  "jobVersion/updateJobVersion",
  async ({ versionId, formData }, { rejectWithValue }) => {
    try {
      const url = `${VERSION_API_URI}/${versionId}`;
      const response = await client.put(url, formData);
      return response;
    } catch (error) {
      return rejectWithValue((error as AxiosError).message);
    }
  }
);
