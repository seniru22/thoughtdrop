import { baseURL } from "@/api/api";
import axios from "axios";

export const getBlogsData = async (token: string | undefined) => {
    try {
      const response = await axios.get(`${baseURL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data.data;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return [];
    }
  }

export const getUserBlogsData = async (token: string | undefined) => {
    try {
      const response = await axios.get(`${baseURL}/posts/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user blogs:", error);
      return [];
    }
  };