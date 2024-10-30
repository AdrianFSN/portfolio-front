import { createAsyncThunk } from "@reduxjs/toolkit";

import { client } from "../../api/client";
import {
  CATEGORY_FILTER_URI,
  JOB_EXAMPLES_API_URI,
} from "../../utils/constants";

export const getJobExamplesListThunk = createAsyncThunk(
  "jobExamples/getJobExamplesList",
  async (category: string) => {
    const url = `${JOB_EXAMPLES_API_URI}${CATEGORY_FILTER_URI}${category}`;
    const response = await client.get(url);
    console.log("Esto es response: ", response);
    console.log("Esto es response.data: ", response.data);
    /* const result = {
        state: response.state,
        data: response.data,
        message: response.message

    }; */
    return response;
  }
);
