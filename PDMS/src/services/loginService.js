import axios from "axios";
import { BASE_URL } from "config/config";

export const adminLoginService = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/admin/sign-in`, data);
      localStorage.setItem("auth", JSON.stringify({ role: response.data.data.role, id: response.data.data.adminId }));
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  export const patientLoginService = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/patients/sign-in`, data);
      localStorage.setItem("auth", JSON.stringify({ role: response.data.data.role, id: response.data.data.patientId }));
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  export const doctorLoginService = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/doctors/sign-in`, data);
      console.log(response)
      localStorage.setItem("auth", JSON.stringify({ role: response.data.data.role, id: response.data.data.doctorId }));
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  export const insuranceLoginService = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/insurances/sign-in`, data);
      localStorage.setItem("auth", JSON.stringify({ role: response.data.data.role, id: response.data.data.insuranceCompanyId }));
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
