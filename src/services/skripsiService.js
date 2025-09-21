import axios from "axios";

const API_URL = "http://localhost:8080"; // URL Backend

export const getAllSkripsi = async () => {
  try {
    const response = await axios.get(`${API_URL}/skripsi/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching skripsi data:", error);
    throw error;
  }
};
