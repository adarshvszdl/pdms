import axios from "axios";
import { BASE_URL } from "config/config";

export const registerFaceService = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/common/register-face`, data);
    return response.data;
  } catch (error) {
    throw error.response.data
  }
};
