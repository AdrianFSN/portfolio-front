import { AxiosResponse } from "axios";
import StandardResponseInterface from "../../@types/StandardResponse";
import { client } from "../../api/client";
import {
  CATEGORY_FILTER_URI,
  JOB_EXAMPLES_API_URI,
} from "../../utils/constants";

export const getJobExamplesList = async (category: string) => {
  const url = `${JOB_EXAMPLES_API_URI}${CATEGORY_FILTER_URI}${category}`;
  return client
    .get(url)
    .then((response: AxiosResponse<StandardResponseInterface>) => {
      /* const result = {
      state: response.data.state,
      message: response.data.message,
      data: response.data.data,
    }; */
      console.log("Esto es response directamente en el servicio: ", response);
      return response;
    });
};
