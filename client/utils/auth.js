// utils/auth.js
import axios from "axios";

export const fetchProfileData = async () => {
  const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
  });

  try {
    const response = await api.get("/auth/profile");
    const image = response.data.profile.image;
    if (image) {
      response.data.profile.image = `http://localhost:5000${image}`;
    }
    return response.data;
  } catch (error) {
    throw new Error("Failed to load profile data");
  }
};
