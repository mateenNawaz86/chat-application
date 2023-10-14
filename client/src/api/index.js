import axios from "axios";

const server = "http://localhost:8000/api/user";

// Make the POST request here
export const makePostRequest = async (endPoint, params) => {
  try {
    const response = await axios.post(`${server}/${endPoint}`, params, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
