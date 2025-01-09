"use client";
import {
  Modal,
  Form,
  Button,
  Input,
  Row,
  Col,
  notification,
} from "antd";
import Image from "next/image";
import balo from "public/zyro-image.svg";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AppContext } from "../AppContext/AppContext";
import React, { useContext, useState } from "react";
import Verify from "./Verify";
import { registerAuthen } from "@/api/registerAuthen";

const RegisterModal = () => {
  const { data, dispatch } = useContext(AppContext);
  const { modalRegisterOpen } = data;
  const [form] = Form.useForm();
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);
  const [tempUserData, setTempUserData] = useState({});

  // Gửi dữ liệu đăng ký lên server
  const onFinish = async (values) => {
    try {
      const res = await registerAuthen(values);
  
      if (res?.data?.success) {
        notification.success({
          message: "Đăng ký thành công!",
          description: "Mã OTP đã được gửi đến email của bạn.",
        });
  
        // Hiển thị popup xác thực OTP
        setShowVerifyPopup(true);
        setTempUserData(values); // Lưu dữ liệu đăng ký tạm
      } else if (res?.data?.success === false) {
        // Hiển thị thông báo từ backend
        notification.error({
          message: "Lỗi đăng ký",
          description: res.data?.message || "Đăng ký không thành công.",
        });console.log(res.data?.message + 'Lỗi')
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error.response || error);
  
      // Hiển thị lỗi hệ thống
      notification.error({
        message: "Lỗi hệ thống",
        description: error.response?.data?.message || "Vui lòng thử lại sau.",
      });
    }
  };

  // Xử lý khi xác thực OTP thành công
  const handleVerified = async () => {
    try {
      console.log("Dữ liệu sau khi xác thực:", tempUserData); // Debug dữ liệu xác thực

      notification.success({
        message: "Xác thực thành công",
        description: "Tài khoản của bạn đã được kích hoạt.",
      });

      // Đóng toàn bộ modal sau khi xác thực
      setShowVerifyPopup(false);
      dispatch({ type: "modalRegisterClose" });
    } catch (error) {
      console.error("Lỗi khi xác thực:", error.response || error);
      notification.error({
        message: "Lỗi",
        description: "Xác thực thất bại. Vui lòng thử lại.",
      });
    }
  };

  // Xử lý đóng modal đăng ký
  const handleCancel = () => {
    dispatch({ type: "modalRegisterClose" });
  };

  return (
    <>
      <Modal
        open={modalRegisterOpen}
        onCancel={handleCancel}
        className="max-h-[208px] tablet:w-[508px] phone:w-[340px] rounded-[38px]"
        footer={[]}
      >
        <Row className="bg-[#FB9400] rounded-[27px] my-20 overflow-hidden">
          <Col span={9} className="object-cover transform-scale-x-[-1]">
            <Image src={balo} alt="icon" height={140} width={157} />
          </Col>
          <Col span={15} className="text-white text-left my-[10px]">
            <h2 className="font-black text-[32px] leading-snug">Đăng ký</h2>
            <p className="font-normal text-[19.4px]">Học tiếng anh với EduStar</p>
          </Col>
        </Row>
        <Form
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input
              className="h-52"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Họ và tên"
            />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên tài khoản!" }]}
          >
            <Input
              className="h-52"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Tên tài khoản"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              className="h-52"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
          >
            <Input
              className="h-52"
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="Số điện thoại"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              className="h-52"
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              className="rounded-[50px] bg-[#FB9400]"
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Popup Verify */}
      {showVerifyPopup && (
        <Modal
          open={showVerifyPopup}
          footer={null}
          onCancel={() => setShowVerifyPopup(false)}
          style={{ maxWidth: "600px" }} // Set max-width and responsive width
        >
          <Verify email={tempUserData.email} onVerified={handleVerified} />
        </Modal>
      )}
    </>
  );
};

export default RegisterModal;
