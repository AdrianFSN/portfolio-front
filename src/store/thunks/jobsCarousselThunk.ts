import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { client } from "../../api/client";
import {
  CATEGORY_FILTER_URI,
  JOB_EXAMPLES_API_URI,
} from "../../utils/constants";
import StandardResponseInterface from "../../@types/StandardResponse";

interface FetchJobsCarousselParams {
  category?: string;
}

export const getJobsCarousselThunk = createAsyncThunk<
  AxiosResponse<StandardResponseInterface>,
  FetchJobsCarousselParams
>("jobsCaroussel/getJobsCarousselList", async ({ category }) => {
  const url = category
    ? `${JOB_EXAMPLES_API_URI}${CATEGORY_FILTER_URI}${category}`
    : `${JOB_EXAMPLES_API_URI}`;
  const response = await client.get(url);
  return response;
});
