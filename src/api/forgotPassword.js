import axios from "./axios";
// import axiosServer from "./axios";



export const forgotPassword = ({email}) =>{
    // return axiosServer.post('/user/forgot/password', {email})
    return axios.post('/user/forgot/password', {email})
}