"use client";
import React, { useEffect, useState } from "react";
import { Modal, message, Button, Form, Input } from "antd";
import { getAdmissionsById, createConsultRegister } from "@/api/apiAdmission";
import {
  MailOutlined,
  UserOutlined,
  PhoneOutlined,
  EditOutlined,
} from "@ant-design/icons";

function AdmissionItem({ params }) {
  const [admissionItem, setAdmissionsItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getAdmissionsById(params.id).then((res) => {
      setAdmissionsItem(res?.data);
    });
  }, [params.id]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    createConsultRegister(values).then((res) => {
      if (res?.data?.success) {
        message.success("Đăng ký tư vấn thành công!");
        form.resetFields();
        handleCancel();
      } else {
        message.error("Đăng ký thất bại. Vui lòng thử lại.");
      }
    });
  };

  if (!admissionItem) {
    return (
      <div
        style={{
          maxWidth: "800px",
          margin: "20px auto",
          textAlign: "center",
          padding: "20px",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        <p style={{ fontSize: "18px", color: "#595959" }}>
          Đang tải dữ liệu...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <style>
        {`
          .custom-button {
            background-color: #FB9400;
            color: #fff;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: bold;
            font-size: 16px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border: none;
            cursor: pointer;
            min-width: 150px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: transform 0.3s ease, background-color 0.3s ease;
          }
          .custom-button:hover {
            background-color: #D97F00;
            transform: scale(1.05);
          }
          .content-box {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 8px;
            line-height: 1.8;
          }
          .image-container img {
            width: 100%;
            height: auto;
            object-fit: cover;
            border-radius: 8px;
            transition: transform 0.3s ease;
          }
          .image-container img:hover {
            transform: scale(1.05);
          }
        `}
      </style>

      {/* Nội dung chính */}
      <div
        className="content-box"
        dangerouslySetInnerHTML={{ __html: admissionItem?.admissionForm }}
        style={{
          margin: "15px 65px",
          borderRadius: "8px",
          marginTop: "60px",
        }}
      ></div>

      {/* Nút mở form đăng ký tư vấn */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Button type="primary" onClick={showModal} className="custom-button">
          Đăng ký tư vấn
        </Button>
      </div>

      {/* Modal chứa form đăng ký tư vấn */}
      <Modal
        title="Đăng ký tư vấn"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Họ và tên"
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              {
                pattern: /^[0-9]{10,}$/,
                message: "Số điện thoại không hợp lệ",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Số điện thoại"
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
          </Form.Item>

          <Form.Item
            name="contentAdvice"
            rules={[
              { required: true, message: "Vui lòng nhập nội dung tư vấn" },
            ]}
          >
            <Input
              prefix={<EditOutlined />}
              placeholder="Nội dung tư vấn"
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="custom-button"
              style={{ width: "100%" }}
            >
              Gửi thông tin
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdmissionItem;
