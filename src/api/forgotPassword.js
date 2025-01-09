import axios from "./axios";
// import axiosServer from "./axios";

const API = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const forgotPassword = ({email}) =>{
    // return axiosServer.post('/user/forgot/password', {email})
    return axios.post('/user/forgot/password', {email})
}

export const verifyAccount = ({ email, otp }) => {
    console.log("Sending to API:", { email, otp }); // Debug payload
    return API.put("/auth/verify-account", { email, otp });
  };
  
  export const regenerateOTP = async ({ email }) => {
    console.log("Sending to regenerateOTP API:", { email });
    try {
      const response = await API.put("/auth/regenerate-otp", { email });
      console.log("Response from regenerateOTP API:", response.data);
      return response;
    } catch (error) {
      console.error("Error from regenerateOTP API:", error.response || error);
      throw error;
    }
  };