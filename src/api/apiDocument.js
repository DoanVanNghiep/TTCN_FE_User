import { message } from "antd";
import axios from "./axios";
import { base_url } from "./baseURL";
// const base_url = "http://localhost:8080/"

export const getAllDocument = async (params) => {
  const response = await fetch(`${base_url}document/all`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};

export const downloadDocument = async (params) => {
  try {
    const res = await axios.get(`/file/?filename=${params}`);
    const { data, success, error } = res?.data;
    if (success) {
      return {
        data: data || [],
      };
    } else {
      message.error(error || "Lỗi không lấy được dữ liệu");
    }
  } catch (error) {}
};

export const getDocumentByCourseId = async (courseId) => {
  const response = await fetch(`${base_url}/document/service/${courseId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch classes by courseId");
  }
  const data = await response.json();
  return data; // Trả về dữ liệu đã parse
};
