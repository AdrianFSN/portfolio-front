import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { client } from "../../api/client";
import { JOB_EXAMPLES_API_URI } from "../../utils/constants";
import StandardResponseInterface from "../../@types/StandardResponse";

interface FetchformDataParams {
  formData: object;
}

export const createJobThunk = createAsyncThunk<
  AxiosResponse<StandardResponseInterface>,
  FetchformDataParams
>("jobDetail/createJob", async ({ formData }, { rejectWithValue }) => {
  try {
    const url = JOB_EXAMPLES_API_URI;
    const response = await client.post(url, formData);
    return response;
  } catch (error) {
    return rejectWithValue((error as AxiosError).message);
  }
});
