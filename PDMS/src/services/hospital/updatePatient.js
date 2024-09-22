import axios from "axios";
import { BASE_URL } from "config/config";

export const updatePatient = async (data, patientId) => {
  try {
    const { id, role } = JSON.parse(localStorage.getItem("auth"));
    const response = await axios.post(`${BASE_URL}/patients/${patientId}/report`, data, {
      headers: {
        id,
        role,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data.response;
  }
};
