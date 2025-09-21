import axios from "axios";

const API_URL = "http://localhost:8080"; // URL Backend

// GET All Skripsi
export const getAllSkripsi = async () => {
  try {
    const response = await axios.get(`${API_URL}/skripsi/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching skripsi data:", error);
    throw error;
  }
};

// Create Data Skripsi (POST)
export const createSkripsi = async (newData) => {
  try {
    const response = await axios.post(`${API_URL}/skripsi/`, newData);
    return response.data;
  } catch (error) {
    console.error("Error creating skripsi:", error);
    throw error;
  }
};

// Update Data Skripsi (PATCH)
export const updateSkripsi = async (id, updatedData) => {
  try {
    const response = await axios.patch(`${API_URL}/skripsi/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating skripsi:", error);
    throw error;
  }
};

// Delete Data Skripsi (DELETE)
export const deleteSkripsi = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/skripsi/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting skripsi:", error);
    throw error;
  }
};
