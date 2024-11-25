import { AxiosError, AxiosResponse } from "axios";
import { client } from "../../api/client";
import {
  AUDIOS_COLLECTION_API_URI,
  JOB_EXAMPLES_API_URI,
  PICTURES_COLLECTION_API_URI,
  VIDEOS_COLLECTION_API_URI,
} from "../../utils/constants";
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

interface FetchJobAudios {
  mainAudio?: File | null;
  audio2?: File | null;
  deleteMainAudio: boolean;
  deleteAudio2: boolean;
  collectionId: string;
}

interface FetchJobVideos {
  mainVideo?: File | null;
  video2?: File | null;
  deleteMainVideo: boolean;
  deleteVideo2: boolean;
  collectionId: string;
}

interface FetchJobPictures {
  mainPicture?: File | null;
  picture2?: File | null;
  picture3?: File | null;
  picture4?: File | null;
  picture5?: File | null;
  deleteMainPicture: boolean;
  deletePicture2: boolean;
  deletePicture3: boolean;
  deletePicture4: boolean;
  deletePicture5: boolean;
  collectionId: string;
}

export const createJob = async (
  formData: FetchFormDataParams
): Promise<AxiosResponse<StandardResponseInterface>> => {
  try {
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

    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export const updateJobAudios = async (
  audiosId: string,
  formData: FetchJobAudios
) => {
  try {
    const url = `${AUDIOS_COLLECTION_API_URI}/${audiosId}`;
    const response = await client.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export const updateJobVideos = async (
  videosId: string,
  formData: FetchJobVideos
) => {
  try {
    const url = `${VIDEOS_COLLECTION_API_URI}/${videosId}`;
    const response = await client.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export const updateJobPictures = async (
  picturesId: string,
  formData: FetchJobPictures
) => {
  try {
    const url = `${PICTURES_COLLECTION_API_URI}/${picturesId}`;
    const response = await client.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};
