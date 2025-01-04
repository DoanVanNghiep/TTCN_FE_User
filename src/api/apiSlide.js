import { message } from "antd";
import axios from "./axios";
import { base_url } from "./baseURL";

export const getAllSlide = async () => {
  const response = await fetch(`${base_url}/slide/all`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};

export const getSlideById = async (id) => {
  const response = await fetch(`${base_url}/slide/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};
