import axios from "axios";

const axiosMultipartInstance = axios.create({

  baseURL: "http://hybrid.srishticampus.in/story_telling_api/",

  // baseURL:  "http://localhost:4025/story_telling_api/",

  headers: {
    "Content-Type": "multipart/form-data", 
  },
});

export default axiosMultipartInstance;