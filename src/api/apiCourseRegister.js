import axios from "./axios";

export const createCourseRegister = (values) => {
  return axios.post("/course/registrationn", values);
};
