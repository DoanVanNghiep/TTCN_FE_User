import { message } from "antd";
import axios from "./axios";
import {base_url} from "./baseURL"
// const base_url = "http://localhost:8080/"

export const getAllExamSchedule = async (params) => {
  const response = await fetch(`${base_url}/exam/schedule/all`); 
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
 
};
