import axios from "axios";
import { BASE_URL } from "config/config";

export const fetchUnusedAddresses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/common/fetch-unused-addresses`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };