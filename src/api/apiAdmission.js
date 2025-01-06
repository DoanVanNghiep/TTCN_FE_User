import { base_url } from "./baseURL";
// const base_url = "http://localhost:8080/"

export const getAllAdmissions = async (params) => {
  // const response = await fetch('https://service.edustar.com.vn/admissions/all');
  const response = await fetch(`${base_url}/admissions/all`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};
export const getAdmissionsById = async (id) => {
  const response = await fetch(`${base_url}/admissions/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};
