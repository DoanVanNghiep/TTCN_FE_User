import axios from "./axios";


export const changepassword = (values) =>{
    const password = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
    }
    return axios.post('/user/change/password', password)
}