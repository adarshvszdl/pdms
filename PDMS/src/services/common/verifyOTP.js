import axios from "axios";
import { BASE_URL } from "config/config";

export const verifyOTPService = async (data) => {
  try {
    const { id, role } = JSON.parse(localStorage.getItem("auth"))
    const response = await axios.post(`${BASE_URL}/common/authorize-otp`, data, {
      headers: {
        id,
        role,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
