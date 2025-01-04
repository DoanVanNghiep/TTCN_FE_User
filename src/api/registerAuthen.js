// import axiosServer from "./axios";
import axios from "./axios";


export const registerAuthen = (values) =>{
    const register = {
        name: values?.name,
        username: values?.username,
        password: values?.password,
        phone: values?.phone,
        email: values?.email,
        // link: "http://34.171.75.213:9999/user/auth/verify"
        link: "https://edustar-user.vercel.app/users/auth/verify"
    }
    // return axiosServer.post("/user/auth/register", register)
    return axios.post("/user/auth/register", register)
}

export const verifyEmail = ( params) => {
    return axios.get(`/user/auth/verify?email-verification=${params}`)
}