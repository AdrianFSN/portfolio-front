import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { client } from "../../api/client";
import {
  CATEGORY_FILTER_URI,
  JOB_EXAMPLES_API_URI,
} from "../../utils/constants";
import StandardResponseInterface from "../../@types/StandardResponse";

interface FetchJobsParams {
  category?: string;
  page?: string;
  limit?: string;
}

export const getJobExamplesListThunk = createAsyncThunk<
  AxiosResponse<StandardResponseInterface>,
  FetchJobsParams
>("jobExamples/getJobExamplesList", async ({ category, page, limit }) => {
  const filteredUrl = `${JOB_EXAMPLES_API_URI}${CATEGORY_FILTER_URI}${category}&page=${page}&limit=${limit}`;
  const url = `${JOB_EXAMPLES_API_URI}?page=${page}&limit=${limit}`;
  const response = await client.get(category ? filteredUrl : url);
  return response;
});
