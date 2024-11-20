import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { client } from "../../api/client";
import { AUDIOS_COLLECTION_API_URI } from "../../utils/constants";
import StandardResponseInterface from "../../@types/StandardResponse";

interface FetchJobAudiosCollectionParams {
  audiosId: string;
  formData: object;
}

export const updateJobAudiosThunk = createAsyncThunk<
  AxiosResponse<StandardResponseInterface>,
  FetchJobAudiosCollectionParams
>(
  "jobAudios/updateJobAudios",
  async ({ audiosId, formData }, { rejectWithValue }) => {
    try {
      const url = `${AUDIOS_COLLECTION_API_URI}/${audiosId}`;
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
