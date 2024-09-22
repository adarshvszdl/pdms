import axios from "axios";
import { BASE_URL } from "config/config";

export const fetchAllDoctors = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/doctors/`);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  };