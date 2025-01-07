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
  
  export const regenerateOTP = ({email}) =>{
      // return axiosServer.post('/user/otp/generate', {email})
      return axios.put('/auth/regenerate-otp', {email})
  }