import axios from "axios";
import { BASE_URL } from "config/config";

export const fetchReportPdf = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/patients/generate-report-pdf`, data, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
