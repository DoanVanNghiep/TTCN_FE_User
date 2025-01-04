import axios from "axios";
import { message } from "antd";
import { base_url } from "./baseURL";

export const getOrderByUserId = async (userId) => {
  try {
    const response = await fetch(`${base_url}/order/paid/${userId}`);
    if (!response.ok) {
      throw new Error(`Lỗi máy chủ: ${response.status}`);
    }

    const orders = await response.json(); // Parse JSON từ API

    // Kiểm tra nếu dữ liệu trả về không phải là mảng
    if (!Array.isArray(orders)) {
      throw new Error("Dữ liệu trả về không hợp lệ.");
    }

    return orders; // Trả về mảng đơn hàng
  } catch (error) {
    console.error("Lỗi gọi API:", error.message);
    message.error(`Lỗi gọi API: ${error.message}`);
    throw error; // Re-throw lỗi để xử lý ở nơi khác
  }
};

// Lấy thông tin đơn hàng theo orderId
export const getOrderByOrderId = async (id) => {
  const response = await fetch(`${base_url}/order/orderId/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch order details");
  }
  return response.json();
};

// Lấy thông tin đơn hàng theo orderId
export const getOrderById = async (id) => {
  const response = await fetch(`${base_url}/order/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch order details");
  }
  return response.json();
};
