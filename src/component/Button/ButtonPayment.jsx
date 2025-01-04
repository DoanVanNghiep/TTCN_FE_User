"use client";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import Cookies from "js-cookie";
import { AppContext } from "../AppContext/AppContext";

function ButtonPayment({ courseID }) {
  const router = useRouter();
  const { dispatch } = useContext(AppContext); // Lấy context để mở form đăng nhập

  // Hàm kiểm tra trạng thái đăng nhập
  const isLoggedIn = () => {
    const token = Cookies.get("jwt"); // Lấy token từ Cookies
    return !!token; // Trả về true nếu có token, false nếu không
  };

  const handlePaymentClick = () => {
    if (!isLoggedIn()) {
      message.warning("Vui lòng đăng nhập để tiếp tục thanh toán!");
      dispatch({ type: "modalLoginOpen" }); // Mở form đăng nhập
      return;
    }

    if (courseID) {
      router.push(`/paymentCourse/${courseID}`); // Điều hướng đến trang thanh toán
    } else {
      message.error("Mã khóa học không hợp lệ!");
    }
  };

  return (
    <div className="flex gap-4 justify-center">
      <Button
        onClick={handlePaymentClick} // Kiểm tra trạng thái đăng nhập trước khi điều hướng
        className="bg-green-500 custom-btn uppercase hover:text-[#fff]"
        style={{
          width: "300px", // Tăng chiều rộng
          height: "60px", // Tăng chiều cao
          borderRadius: "8px", // Bo góc cho nút
        }}
      >
        Thanh toán khóa học
      </Button>
    </div>
  );
}

export default ButtonPayment;
