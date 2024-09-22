import axios from "axios";
import { BASE_URL } from "config/config";

export const fetchPatientProfile = async (patientId) => {
    try {
      const response = await axios.get(`${BASE_URL}/patients/${patientId}/profile`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };