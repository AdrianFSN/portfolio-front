import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { client } from "../../api/client";
import { VIDEOS_COLLECTION_API_URI } from "../../utils/constants";
import StandardResponseInterface from "../../@types/StandardResponse";

interface FetchJobVideosCollectionParams {
  videosId: string;
  formData: object;
}

export const updateJobVideosThunk = createAsyncThunk<
  AxiosResponse<StandardResponseInterface>,
  FetchJobVideosCollectionParams
>(
  "jobVideos/updateJobVideos",
  async ({ videosId, formData }, { rejectWithValue }) => {
    try {
      const url = `${VIDEOS_COLLECTION_API_URI}/${videosId}`;
      const response = await client.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue((error as AxiosError).message);
    }
  }
);
