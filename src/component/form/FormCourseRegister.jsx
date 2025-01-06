"use client";
import React, { useState } from "react";
import { message, Button, Form, Input } from "antd";
import {
  MailOutlined,
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";
import { createCourseRegister } from "@/api/apiCourseRegister";

function FormCourseRegister() {
  const [form] = useForm();
  const [loading, setLoading] = useState(false); // State loading

  const onFinish = async (values) => {
    setLoading(true); // Bật trạng thái loading
    try {
      const res = await createCourseRegister(values);
      if (res?.data?.success) {
        message.success("Đăng ký tư vấn thành công");
        form.resetFields();
      } else if (res?.data?.error?.statusCode === 2) {
        res?.data?.error?.errorDetailList.forEach((e) =>
          message.error(e.message)
        );
      } else {
        message.error("Đã xảy ra lỗi, vui lòng thử lại!");
      }
    } catch (error) {
      message.error("Không thể kết nối đến server.");
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="max-w-[600px] mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-center text-lg font-bold text-orange-500 mb-6">
        Đăng ký khóa học
      </h2>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Họ và tên"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Nhập họ và tên"
            className="rounded-md"
          />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại" },
            { pattern: /^[0-9]{10,}$/, message: "Số điện thoại không hợp lệ!" },
          ]}
        >
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Nhập số điện thoại"
            className="rounded-md"
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { type: "email", message: "Định dạng email không hợp lệ" },
            { required: true, message: "Vui lòng nhập Email" },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Nhập email"
            className="rounded-md"
          />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
          <Input
            prefix={<EnvironmentOutlined />}
            placeholder="Nhập địa chỉ"
            className="rounded-md"
          />
        </Form.Item>
        <Form.Item
          name="information"
          label="Khóa học đăng ký"
          rules={[{ required: true, message: "Vui lòng nhập Khóa học đăng ký" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Nhập Khóa học đăng ký"
            className="rounded-md"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full bg-orange-500 border-orange-500 hover:bg-orange-400 rounded-md"
          >
            Gửi thông tin
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormCourseRegister;
