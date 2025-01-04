import axios from "./axios";

export const createConsultRegister =  (values) => {
    return  axios.post("/consulting/registration", values);
};