"use client";

import {
  Modal,
  Form,
  Button,
  Input,
  Row,
  Col,
  notification,
  message,
} from "antd";
import { AppContext } from "../AppContext/AppContext";
import React, { useContext } from "react";
import Image from "next/image";
import balo from "public/zyro-image.svg";
import { createConsultRegister } from "@/api/apiConsultRegister";
import { useForm } from "antd/lib/form/Form";

const RegisterAccountModal = () => {
  const { data, dispatch } = useContext(AppContext);
  const [form] = useForm();
  const { modalRegisterAccOpen } = data;
  const onFinish = async (values) => {
    createConsultRegister(values).then((res) => {
      if (res?.data?.success) {
        message.success("Đăng ký tư vấn thành công");
        form.resetFields();
      } else if (res?.data?.error?.statusCode === 2) {
        {
          res?.data?.error?.errorDetailList.map((e) =>
            message.error(e.message)
          );
        }
      }
    });
    dispatch({ type: "modalRegisterAccClose" });
    //đặt thông báo gửi thông tin thành công
  };
  const handleCancel = () => {
    dispatch({ type: "modalRegisterAccClose" });
  };
  return (
    <>
      <Modal
        open={modalRegisterAccOpen}
        onCancel={handleCancel}
        className="max-h-[208px] tablet:w-[508px] phone:w-[340px] rounded-[38px] "
        footer={[]}
      >
        <Row className="bg-[#FB9400] rounded-[27px] my-20 overflow-hidden">
          <Col span={9} className="object-cover transform-scale-x-[-1] ">
            <Image src={balo} alt="icon" height={140} width={157} />
          </Col>
          <Col span={15} className="text-white text-left my-[10px]">
            <h2 className="font-black text-[32px] leading-snug">
              Đăng ký tư vấn
            </h2>
            <p className="font-normal text-[19.4px]">
              EduStar sẽ liên hệ với bạn sớm nhất có thể
            </p>
          </Col>
        </Row>
        <Form
          className="login-form"
          initialValues={{
            remember: true,
          }}
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập họ và tên!" },
              { type: "text", message: "Vui lòng nhập họ và tên!" },
            ]}
          >
            <Input className="h-52" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^[0-9]{10,}$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input className="h-52" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input className="h-52" />
          </Form.Item>
          <Form.Item
            label="Nội dung tư vấn"
            name="contentAdvice"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập nội dung tư vấn",
              },
            ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>

          <Form.Item className="flex justify-end ">
            <Button
              type="primary"
              htmlType="submit"
              className="rounded-[50px] bg-[#FB9400]"
            >
              Gửi thông tin
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default RegisterAccountModal;
