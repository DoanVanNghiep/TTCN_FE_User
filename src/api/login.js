// import axiosServer from "./axios";
import axios from "./axios"

export const login = ({username,password}) =>{
    return axios.post('/auth/login', {username, password})
    // return axiosServer.post('/auth/login', {username, password})
}

