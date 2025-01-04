import axios from "axios";

export const getClassesByCourseId = async (courseId) => {
  return axios.get(`/classRoom/by-course/${courseId}`);
};
