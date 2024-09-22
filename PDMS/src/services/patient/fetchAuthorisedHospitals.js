import axios from "axios";
import { BASE_URL } from "config/config";

export const fetchAuthorisedHospitals = async (patientId) => {
  try {
    const response = await axios.get(`${BASE_URL}/patients/${patientId}/authorized-doctors`);
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
  };