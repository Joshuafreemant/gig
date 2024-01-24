import { apiInstance } from "./fetch";

export const postFetch = async (url, body) => {
  try {
    const response = await apiInstance.post(url, body);
    return response;
  } catch (error) {
    return error;
  }
};


export const getFetch = async (url) => {
  try {
    const response = await apiInstance.get(url);
    return response;
  } catch (error) {
    return error;
  }
};
export const deleteFetch = async (url) => {
  try {
    const response = await apiInstance.delete(url);
    return response;
  } catch (error) {
    return error;
  }
};

export const putFetch = async (url, body) => {
  try {
    const response = await apiInstance.put(url, body);
    return response;
  } catch (error) {
    return error;
  }
};
