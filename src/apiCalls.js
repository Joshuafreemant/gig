import { apiInstance } from "./fetch";

export const registerUser = async (url, body) => {
  try {
    const response = await apiInstance.post(url, body);
    return response;
  } catch (error) {
    console.error("Error registering user:", error.response || error.message);
  }
};
export const loginApi = async (url, body) => {
    try {
      const response = await apiInstance.post(url, body);
      return response;
    } catch (error) {
      console.error("Error fetching user:", error.response || error.message);
    }
  };
  export const logoutApi = async (url) => {
    try {
      const response = await apiInstance.post(url);
      return response;
    } catch (error) {
      console.error("Error fetching user:", error.response || error.message);
    }
  };


  export const fetchUserApi = async (url) => {
    try {
      const response = await apiInstance.get(url);
      return response;
    } catch (error) {
      console.error("Error getting user:", error.response || error.message);
    }
  };

  export const updateUserApi = async (url, body) => {
    try {
      const response = await apiInstance.put(url, body);
      return response;
    } catch (error) {
      console.error("Error fetching user:", error.response || error.message);
    }
  };
  