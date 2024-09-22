import axios from "axios";
import { BASE_URL } from "config/config";

export const fetchAllInsurances = async () => {
    try {
      const { id, role } = JSON.parse(localStorage.getItem("auth"));
      const response = await axios.get(`${BASE_URL}/insurances/`, {
        headers: {
          id, role
        }
      });
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  };