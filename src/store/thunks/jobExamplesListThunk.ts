import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { client } from "../../api/client";
import {
  CATEGORY_FILTER_URI,
  JOB_EXAMPLES_API_URI,
} from "../../utils/constants";

interface FetchJobsParams {
  category: string;
  page?: string;
  limit?: string;
}

export const getJobExamplesListThunk = createAsyncThunk<
  AxiosResponse<unknown>,
  FetchJobsParams
>("jobExamples/getJobExamplesList", async ({ category, page, limit }) => {
  const url = `${JOB_EXAMPLES_API_URI}${CATEGORY_FILTER_URI}${category}&page=${page}&limit=${limit}`;
  console.log("Esto es url: ", url);
  const response = await client.get(url);
  console.log("Esto es response: ", response);
  console.log("Esto es response.data: ", response.data);
  /* const result = {
        state: response.state,
        data: response.data,
        message: response.message

    }; */
  return response;
});
