import React from "react";
import PaymentPage from "@/component/payment/PaymentPage"; // Đường dẫn đến file PaymentPage

const PaymentCoursePage = ({ params }) => {
  const { CourseID } = params; // Lấy CourseID từ params

  return (
    <div>
      <h1>Thanh toán khóa học</h1>
      <PaymentPage id={CourseID} />{" "}
      {/* Truyền CourseID vào component PaymentPage */}
    </div>
  );
};

export default PaymentCoursePage;
