import axios from "axios";
import { BASE_URL } from "config/config";

export const fetchPatientReports = async (patientId,insuranceCompanyIdAsSender) => {
  try {
    const response = await axios.get(`${BASE_URL}/patients/${patientId}/report`);
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};