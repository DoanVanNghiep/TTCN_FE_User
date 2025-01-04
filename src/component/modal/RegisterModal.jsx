"use client";
import {
  Modal,
  Form,
  Button,
  Input,
  Row,
  Col,
  message,
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
import React, { useContext } from "react";
import { registerAuthen } from "@/api/registerAuthen";
import { useForm } from "antd/lib/form/Form";

const RegisterModal = () => {
  const { data, dispatch } = useContext(AppContext);
  const { modalRegisterOpen } = data;
  const [form] = useForm();

  const onFinish = async (values) => {
    registerAuthen(values).then((res) => {
      if (res?.data?.success) {
        notification.open({
          message: "Đăng ký thành công",
          description: "Vui lòng kiểm tra email để xác thực",
          placement: "top",
        });

        form.resetFields();
      } else if (res?.data?.error?.statusCode === 500) {
        message.open({
          type: "error",
          content: res?.data?.error?.message,
          duration: 10,
        });
        form.resetFields();
      } else if (res?.data?.error?.statusCode === 2) {
        {
          res?.data?.error?.errorDetailList.map((e) =>
            message.open({
              type: "error",
              content: e.message,
              duration: 15,
            })
          );
        }
        form.resetFields();
      }
    });
    dispatch({ type: "modalRegisterClose" });
  };

  const handleCancel = () => {
    dispatch({ type: "modalRegisterClose" });
  };

  return (
    <>
      <Modal
        open={modalRegisterOpen}
        onCancel={handleCancel}
        className="max-h-[208px] tablet:w-[508px] phone:w-[340px] rounded-[38px] "
        footer={[]}
      >
        <Row className="bg-[#FB9400] rounded-[27px] my-20 overflow-hidden">
          <Col span={9} className="object-cover transform-scale-x-[-1] ">
            <Image src={balo} alt="icon" height={140} width={157} />
          </Col>
          <Col span={15} className="text-white text-left my-[10px]">
            <h2 className="font-black text-[32px] leading-snug">Đăng ký</h2>
            <p className="font-normal text-[19.4px]">
              Học tiếng anh với EduStar
            </p>
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
            rules={[
              { required: true, message: "Vui lòng nhập họ và tên!" },
              { type: "text", message: "Vui lòng nhập họ và tên!" },
            ]}
          >
            <Input
              className="h-52"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Họ và tên"
            />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên tài khoản!" },
              { type: "text", message: "Vui lòng nhập tên tài khoản!" },
            ]}
          >
            <Input
              className="h-52"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Tên tài khoản"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password
              className="h-52"
              prefix={<LockOutlined className="site-form-item-icon" />}
              // type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
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

          <Form.Item className="flex justify-end ">
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
    </>
  );
};
export default RegisterModal;
