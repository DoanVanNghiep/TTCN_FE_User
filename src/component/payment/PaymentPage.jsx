"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Input,
  Button,
  Card,
  Row,
  Col,
  Alert,
  Typography,
  Radio,
  Checkbox,
} from "antd";
import {
  getCoursePayment,
  getPaymentOnlineById,
  createDirectPayment,
  createOnlinePayment,
} from "@/api/apiPayment";
import { getUserProfile } from "@/api/user"; // Import API lấy thông tin người dùng
import Cookies from "js-cookie";
const { TextArea } = Input;

const PaymentPage = ({ id }) => {
  const [course, setCourse] = useState({});
  const [user, setUser] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
  });
  const [alternativeInfo, setAlternativeInfo] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
  });
  const [useAlternativeInfo, setUseAlternativeInfo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("direct");
  const [isUserFormValid, setIsUserFormValid] = useState(false);
  const [error, setError] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [transferImage, setTransferImage] = useState(null); // Lưu URL hình ảnh
  const [paymentResponse, setPaymentResponse] = useState(null); // Lưu phản hồi từ API

  const rules = {
    required: (value) => value && value.trim() !== "",
    email: (value) => /\S+@\S+\.\S+/.test(value),
    phone: (value) => /^\d{10,11}$/.test(value),
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        alert("Chỉ hỗ trợ tải lên file JPEG hoặc PNG.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setTransferImage(reader.result); // Lưu URL base64
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const currentInfo = useAlternativeInfo ? alternativeInfo : user;

    const isValid =
      rules.required(currentInfo.email) &&
      rules.email(currentInfo.email) &&
      rules.required(currentInfo.name) &&
      rules.required(currentInfo.phone) &&
      rules.phone(currentInfo.phone) &&
      rules.required(currentInfo.address);

    setIsUserFormValid(isValid);
  };

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      if (response?.data?.data) {
        const { name, email, phone, address } = response.data.data;
        setUser({
          email: email || "",
          name: name || "",
          phone: phone || "",
          address: address || "",
        });
      } else {
        setError("Dữ liệu người dùng không hợp lệ.");
      }
    } catch (err) {
      setError("Không thể lấy thông tin người dùng.");
    }
  };

  const fetchCourseDetails = async () => {
    if (!id) {
      setError("Lỗi: ID khóa học không hợp lệ.");
      return;
    }
    try {
      const response = await getCoursePayment(id);
      if (response?.data) {
        setCourse(response.data);
      } else {
        setError(response?.error || "Không tìm thấy khóa học.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const processPayment = async () => {
    const token = Cookies.get("jwt");
    const userId = Cookies.get("id");

    const generateOrderId = () => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Bộ ký tự gồm chữ cái và số
      const length = 8; // Độ dài mã
      let orderId = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        orderId += characters[randomIndex];
      }
      return orderId; // Trả về mã đơn hàng
    };

    if (!token) {
      alert("Vui lòng đăng nhập để tiếp tục thanh toán.");
      return;
    }

    if (!userId) {
      alert("ID người dùng không tồn tại.");
      return;
    }

    try {
      const selectedInfo = useAlternativeInfo ? alternativeInfo : user;

      if (
        !selectedInfo.email ||
        !selectedInfo.name ||
        !selectedInfo.phone ||
        !selectedInfo.address
      ) {
        alert("Vui lòng điền đầy đủ thông tin trước khi thanh toán.");
        return;
      }

      const orderId = generateOrderId();

      const orderData = {
        userId: Cookies.get("id"),
        email: selectedInfo.email,
        fullName: selectedInfo.name,
        phone: selectedInfo.phone,
        address: selectedInfo.address,
        serviceManagerId: course.id,
        amount: course.price ? parseFloat(course.price.replace(/\./g, "")) : 0,
        paymentMethod:
          paymentMethod === "vnpay"
            ? "VNPAY_PAYMENT"
            : paymentMethod === "direct"
            ? "DIRECT_PAYMENT"
            : paymentMethod.toUpperCase(),
        orderId, // Gán mã đơn hàng tự động vào dữ liệu
      };

      if (paymentMethod === "vnpay") {
        const response = await axios.post(
          "/api/paymentVNPAY/vn-pay",
          orderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Log response để kiểm tra
        console.log("Response từ backend:", response);

        // Truy cập `paymentUrl` đúng cách
        const paymentUrl = response?.data?.body?.data?.paymentUrl;
        if (paymentUrl) {
          console.log("Redirecting to:", paymentUrl); // Log URL trước khi điều hướng
          window.location.href = paymentUrl; // Điều hướng đến VNPay
        } else {
          console.error("Không tìm thấy paymentUrl trong response:", response);
          throw new Error("Không thể lấy URL thanh toán VNPay.");
        }
      } else if (paymentMethod === "direct") {
        // Xử lý thanh toán trực tiếp
        const response = await createDirectPayment(orderData);

        if (response) {
          // Điều hướng đến trang thành công
          window.location.href = `/paymentSuccess?name=${selectedInfo.name}&orderId=${orderId}`;
        }
      } else {
        alert("Hình thức thanh toán không được hỗ trợ.");
      }
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error.message);
      alert(`Thanh toán thất bại: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
    fetchUserProfile();
  }, [id]);

  useEffect(() => {
    validateForm(); // Kiểm tra lại tính hợp lệ khi state thay đổi
  }, [user, alternativeInfo, useAlternativeInfo]);

  const handleInputChange = (field, type) => (e) => {
    const value = e.target.value;
    if (type === "alternative") {
      setAlternativeInfo((prev) => ({ ...prev, [field]: value }));
    } else if (type === "default") {
      setUser((prev) => ({ ...prev, [field]: value }));
    }
    validateForm(); // Cập nhật trạng thái nút "Thanh toán"
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      {error && (
        <Alert
          message="Lỗi"
          description={error}
          type="error"
          showIcon
          className="mb-4"
        />
      )}
      <br />
      <br />
      {/* Form thông tin khách hàng */}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card title="Thông tin khách hàng" bordered>
            {/* Địa chỉ Email */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  fontSize: "4rem",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Địa chỉ Email
              </label>
              <Input
                placeholder="Địa chỉ Email"
                value={user.email}
                onChange={handleInputChange("email", "default")}
              />
            </div>

            {/* Họ và tên */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  fontSize: "4rem",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Họ và tên
              </label>
              <Input
                placeholder="Họ và tên"
                value={user.name}
                onChange={handleInputChange("name", "default")}
              />
            </div>

            {/* Số điện thoại */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  fontSize: "4rem",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Số điện thoại
              </label>
              <Input
                placeholder="Số điện thoại"
                value={user.phone}
                onChange={handleInputChange("phone", "default")}
              />
            </div>

            {/* Địa chỉ */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  fontSize: "4rem",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Địa chỉ
              </label>
              <TextArea
                placeholder="Địa chỉ"
                rows={2}
                value={user.address}
                onChange={handleInputChange("address", "default")}
              />
            </div>
          </Card>
        </Col>
        {/* Thông tin khóa học */}
        <Col xs={24} md={12}>
          <Card title="Tóm tắt đơn hàng" bordered>
            <div
              style={{
                width: "100px",
                height: "100px",
                overflow: "hidden",
                marginTop: "10px",
              }}
            >
              <img
                src={course.image || "https://via.placeholder.com/200"} // Link mặc định nếu không có hình ảnh
                alt="Hình ảnh khóa học"
                style={{
                  width: "100px",
                  height: "100px",
                }}
              />
            </div>
            <Typography.Text>
              <strong>Tên khóa học:</strong>{" "}
              {course.name || "Không có thông tin"}
            </Typography.Text>
            <br />
            <Typography.Text>
              <strong>Giá tiền:</strong> {course.price || "0"}
            </Typography.Text>
            <br />
            <Typography.Text>
              <strong>Lịch trình:</strong>{" "}
              {course.schedule || "Không có thông tin"}
            </Typography.Text>
            <br />
            <Typography.Text>
              <strong>Số lượng các buổi học:</strong>{" "}
              {course.numberTeachingSessions || "Không có thông tin"}
            </Typography.Text>
            <br />
            <Typography.Text>
              <strong>Hình thức học:</strong>{" "}
              {course.learningForm || "Không có thông tin"}
            </Typography.Text>
            <br />
            <Typography.Text>
              <strong>Yêu cầu sinh viên:</strong>{" "}
              {course.requestStudents || "Không có thông tin"}
            </Typography.Text>
            {/* Lưu ý nhỏ */}
            <div className="mt-4">
              <Typography.Text type="warning">
                ⚠️ Lưu ý: Thông tin thanh toán sẽ sử dụng thông tin mặc định của
                bạn.
              </Typography.Text>
              {useAlternativeInfo && (
                <Typography.Text type="warning" className="block mt-2">
                  ⚠️ Lưu ý: Bạn đang chọn sử dụng thông tin khác để thanh toán.
                </Typography.Text>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Phương thức thanh toán */}
      <Row className="mt-6">
        <Col span={24}>
          <Card title="Thanh toán" bordered>
            <Radio.Group
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <Radio value="direct">Thanh toán trực tiếp</Radio>
              {/* <Radio value="online">Thanh toán online</Radio> */}
              <Radio value="vnpay">Thanh toán online qua VNPAY</Radio>
            </Radio.Group>

            <Button
              type="primary"
              className="mt-4 w-full bg-[#FB9400] hover:bg-[#ffb100]"
              disabled={
                !isUserFormValid ||
                (paymentMethod === "online" && !transferImage)
              }
              onClick={processPayment}
            >
              Thanh toán
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentPage;
