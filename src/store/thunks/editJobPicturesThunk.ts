import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { client } from "../../api/client";
import { PICTURES_COLLECTION_API_URI } from "../../utils/constants";
import StandardResponseInterface from "../../@types/StandardResponse";

interface FetchJobPicturesCollectionParams {
  picturesId: string;
  formData: object;
}

export const updateJobPicturesThunk = createAsyncThunk<
  AxiosResponse<StandardResponseInterface>,
  FetchJobPicturesCollectionParams
>(
  "jobPictures/updateJobPictures",
  async ({ picturesId, formData }, { rejectWithValue }) => {
    try {
      const url = `${PICTURES_COLLECTION_API_URI}/${picturesId}`;
      const response = await client.put(url, formData);
      return response;
    } catch (error) {
      return rejectWithValue((error as AxiosError).message);
    }
  }
);
