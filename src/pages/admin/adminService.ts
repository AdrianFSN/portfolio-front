import { AxiosError, AxiosResponse } from "axios";
import { client } from "../../api/client";
import { JOB_EXAMPLES_API_URI } from "../../utils/constants";
import StandardResponseInterface from "../../@types/StandardResponse";

interface FetchFormDataParams {
  launchPeriod: string;
  linkToUrl: string;
  linkToGitHub: string;
  category: string[];
  title: string;
  technologies: string[];
  info: string;
  description: string;
  customer: string;
  mainPicture: null;
  picture2: null;
  picture3: null;
  picture4: null;
  picture5: null;
  mainAudio: null;
  audio2: null;
  mainVideo: null;
  video2: null;
}

interface FetchJobBasicsParams {
  launchPeriod: string;
  linkToUrl: string;
  linkToGitHub: string;
  category: string[];
}

export const createJob = async (
  formData: FetchFormDataParams
): Promise<AxiosResponse<StandardResponseInterface>> => {
  try {
    console.log("Esto es formdata en service: ", formData);
    const url = JOB_EXAMPLES_API_URI;
    const response = await client.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export const updateJobBasics = async (
  jobId: string,
  formData: FetchJobBasicsParams
): Promise<AxiosResponse<StandardResponseInterface>> => {
  try {
    const url = `${JOB_EXAMPLES_API_URI}/${jobId}`;
    const response = await client.put(url, formData);
    console.log("Esto es response en adminservice: ", response);

    return response;
  } catch (error) {
    console.error("Esto es error en admin service: ", error);

    throw error as AxiosError;
  }
};
