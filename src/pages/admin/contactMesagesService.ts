import { AxiosError, AxiosResponse } from "axios";
import { client } from "../../api/client";
import { MESSAGES_API_URI } from "../../utils/constants";
import StandardResponseInterface from "../../@types/StandardResponse";
import MessageInterface from "../../@types/Message";

interface FetchFormDataParams {
  name: string;
  email: string;
  subject: string[];
  content: string;
  opt_in: boolean;
  read: boolean;
  answered: boolean;
}

interface FetchUpdateMessageStatusParams {
  read: boolean;
  answered: boolean;
}

interface MessagesResponseInterface {
  messagesList: MessageInterface[];
  totalPages: number;
  currentPage: number;
  totalMessages: number;
  state: string;
  message: string;
  data: object;
}

export const createNewMessage = async (
  formData: FetchFormDataParams
): Promise<AxiosResponse<StandardResponseInterface>> => {
  try {
    const url = MESSAGES_API_URI;
    const response = await client.post(url, formData);
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export const getAllMessages = async (
  page: string,
  limit: string
): Promise<AxiosResponse<MessagesResponseInterface>> => {
  try {
    const url = `${MESSAGES_API_URI}?page=${page}&limit=${limit}`;
    const response = await client.get(url);
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export const updateMessageStatus = async (
  messageId: string,
  formData: FetchUpdateMessageStatusParams
): Promise<AxiosResponse<StandardResponseInterface>> => {
  try {
    const url = `${MESSAGES_API_URI}/${messageId}`;
    const response = await client.put(url, formData);
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export const getOneMessage = async (
  messageId: string
): Promise<AxiosResponse<StandardResponseInterface>> => {
  try {
    const url = `${MESSAGES_API_URI}/${messageId}`;
    const response = await client.put(url);

    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export const deleteMessage = async (
  messageId: string
): Promise<AxiosResponse<StandardResponseInterface>> => {
  try {
    const url = `${MESSAGES_API_URI}/${messageId}`;
    const response = await client.delete(url);

    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};
