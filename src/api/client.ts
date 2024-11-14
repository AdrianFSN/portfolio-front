import axios from "axios";
import i18n from "i18next";
import storage from "../utils/storage";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

client.interceptors.request.use(
  (config) => {
    const currentLanguage = i18n.language;
    if (currentLanguage) {
      config.headers["Accept-Language"] = currentLanguage;
    }
    console.log("Request headers:", config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      return Promise.reject({
        message: error.response.statusText,
        ...error.response,
        ...error.response.data,
      });
    }
    // Request error
    return Promise.reject({ message: error.message });
  }
);

export const setAuthorizationHeader = (token: string) => {
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log(
    "Authorization header set:",
    client.defaults.headers.common["Authorization"]
  );
};

export const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common["Authorization"];
};

export const logout = () => {
  storage.remove("authToken");
  removeAuthorizationHeader();
};
