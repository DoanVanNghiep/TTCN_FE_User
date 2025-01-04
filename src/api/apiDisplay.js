import { message } from "antd";
import axios from "./axios";
import {base_url} from "./baseURL"


// const base_url = "http://localhost:8080/"

export const getDataDisplay = async () => {
    const response = await fetch(`${base_url}/display/all`); 
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
};




export const getDisplayById = async (id) => {
  try {
    const res = await axios.get(`/display/${id}`);
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