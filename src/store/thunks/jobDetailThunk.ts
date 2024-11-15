import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { client } from "../../api/client";
import { JOB_EXAMPLES_API_URI } from "../../utils/constants";
import StandardResponseInterface from "../../@types/StandardResponse";

interface FetchJobDetailParams {
  jobId: string;
}

export const getJobDetailThunk = createAsyncThunk<
  AxiosResponse<StandardResponseInterface>,
  FetchJobDetailParams
>("jobDetail/getJobDetail", async ({ jobId }, { rejectWithValue }) => {
  try {
    const url = `${JOB_EXAMPLES_API_URI}/${jobId}`;
    const response = await client.get(url);
    return response;
  } catch (error) {
    return rejectWithValue((error as AxiosError).message);
  }
});

export const deleteJobThunk = createAsyncThunk<
  AxiosResponse<StandardResponseInterface>,
  FetchJobDetailParams
>("jobDetail/deleteJob", async ({ jobId }, { rejectWithValue }) => {
  try {
    const url = `${JOB_EXAMPLES_API_URI}/${jobId}`;
    const response = await client.delete(url);
    return response;
  } catch (error) {
    return rejectWithValue((error as AxiosError).message);
  }
});
