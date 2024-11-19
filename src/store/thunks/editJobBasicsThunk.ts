import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { client } from "../../api/client";
import { JOB_EXAMPLES_API_URI } from "../../utils/constants";
import StandardResponseInterface from "../../@types/StandardResponse";

interface FetchJobBasicsParams {
  jobId: string;
  formData: object;
}

export const updateJobBasicsThunk = createAsyncThunk<
  AxiosResponse<StandardResponseInterface>,
  FetchJobBasicsParams
>(
  "jobBasics/updateJobBasics",
  async ({ jobId, formData }, { rejectWithValue }) => {
    try {
      const url = `${JOB_EXAMPLES_API_URI}/${jobId}`;
      const response = await client.put(url, formData);
      return response;
    } catch (error) {
      return rejectWithValue((error as AxiosError).message);
    }
  }
);
