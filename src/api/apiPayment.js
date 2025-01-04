import { message } from "antd";
import { base_url } from "./baseURL";
import axios from "axios";
import Cookies from "js-cookie";

export const getCoursePayment = async (id) => {
  try {
    const response = await fetch(`${base_url}/service/${id}`);
    if (!response.ok) {
      throw new Error(`Lỗi máy chủ: ${response.status}`);
    }

    const result = await response.json(); // Parse JSON từ API
    const { data, success, error } = result;

    if (success) {
      return { data: data || {} }; // Đảm bảo trả về object thay vì array
    } else {
      message.error(error || "Lỗi khi lấy dữ liệu từ API");
      return { data: {}, error: error || "Lỗi không xác định" };
    }
  } catch (error) {
    message.error(`Lỗi gọi API: ${error.message}`);
    return { data: {}, error: error.message || "Lỗi không xác định" };
  }
};

export const getPaymentOnlineById = async (id) => {
  try {
    const response = await fetch(`/api/payment-online/${id}`);
    if (response.data && response.data.success) {
      return response.data.data; // Trả về object trong "data"
    }
    throw new Error("Dữ liệu không hợp lệ từ server.");
  } catch (error) {
    console.error("Lỗi khi gọi API thanh toán online:", error.message);
    throw error;
  }
};
export const createDirectPayment = async (orderData) => {
  try {
    const token = Cookies.get("jwt");
    if (!token) {
      throw new Error("Token xác thực không tồn tại");
    }

    const response = await axios.post(`/order/direct-payment`, orderData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data && response.status === 200) {
      message.success(
        response.data.message ||
          "Thanh toán trực tiếp thành công vui lòng chờ xác nhận từ phía quản trị!"
      );
      return response.data;
    } else {
      const errorMessage =
        response.data?.message || "Có lỗi xảy ra trong quá trình thanh toán.";
      message.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    message.error(
      error.message || "Lỗi không xác định khi thanh toán trực tiếp."
    );
    throw error;
  }
};

export const createOnlinePayment = async (orderData) => {
  try {
    const token = Cookies.get("jwt"); // Lấy token từ cookie
    const formData = new FormData();
    formData.append("orderDto", JSON.stringify(orderDto));
    formData.append("transferImage", file);
    if (!token) {
      throw new Error("Token xác thực không tồn tại");
    }

    const response = await axios.post(`/order/online-payment`, orderData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Gửi token trong header
      },
    });

    // Kiểm tra response từ backend
    if (response.data && response.data.success) {
      message.success(
        response.data.message ||
          "Thanh toán online thành công vui lòng chờ xác nhận từ phía quản trị!"
      );
      return response.data.data;
    } else {
      // Nếu backend trả về success = false
      const errorMessage =
        response.data.message || "Lỗi không xác định trong thanh toán online!";
      message.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Thanh toán online thất bại:", error.message);
    message.error("Thanh toán online thất bại!");
    throw error; // Ném lỗi để xử lý ở cấp cao hơn nếu cần
  }
};
