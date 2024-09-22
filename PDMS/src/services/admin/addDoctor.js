import axios from "axios";
import { BASE_URL } from "config/config";

export const adminAddDoctor = async (data) => {
    try {
      const { id, role } = JSON.parse(localStorage.getItem("auth"));
      const response = await axios.post(`${BASE_URL}/doctors/`, data, {
        headers: {
          id, role
        }
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data)
      return error.response.data;
    }
  };