import { AxiosResponse } from "axios";
import responseInterface from "../../@types/response";
import { client } from "../../api/client";
import {
  CATEGORY_FILTER_URI,
  JOB_EXAMPLES_API_URI,
} from "../../utils/constants";

export const getJobExamplesList = async (category: string) => {
  const url = `${JOB_EXAMPLES_API_URI}${CATEGORY_FILTER_URI}${category}`;
  return client.get(url).then((response: AxiosResponse<responseInterface>) => {
    const result = {
      state: response.data.state,
      message: response.data.message,
      data: response.data.data,
    };
    return result;
  });
};
