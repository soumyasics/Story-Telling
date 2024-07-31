import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4025/story_telling_api/"
  
  // baseURL:"http://hybrid.srishticampus.in/story_telling_api/"

  // headers: {
  //   "Content-Type": "multipart/form-data", // Since you're sending form data
  //   Authorization: "Bearer YOUR_ACCESS_TOKEN", // Include your authorization token if needed
  // },
});

export default axiosInstance;

