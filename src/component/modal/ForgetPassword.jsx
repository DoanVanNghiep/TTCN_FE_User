"use client";
import { Modal, Form, Button, Input, Row, Col, message } from "antd";
import { AppContext } from "../AppContext/AppContext";
import React, { useContext } from "react";
import { forgotPassword } from "@/api/forgotPassword";

import Image from "next/image";
import balo from "public/world_book_fun_fb_06 [Converted]-04 1.svg";
const ForgetPassword = () => {
  const onFinish = async (values) => {
    forgotPassword(values).then((res) => {
      if (res?.data?.success) {
        message.success("Vui lòng kiểm tra email");
      } else if (res?.data?.error?.statusCode === 500) {
        message.error(res?.data?.error?.message);
      }
    });
    dispatch({ type: "modalForgetPasswordClose" });
  };
  const { data, dispatch } = useContext(AppContext);
  const { modalForgetPasswordOpen } = data;

  const handleCancel = () => {
    dispatch({ type: "modalForgetPasswordClose" });
  };

  return (
    <>
      <Modal
        open={modalForgetPasswordOpen}
        onCancel={handleCancel}
        className="max-h-[208px] tablet:w-[508px] phone:w-[340px] rounded-[38px] "
        footer={[]}
      >
        <Row className="bg-[#FB9400] rounded-[27px] my-20 overflow-hidden">
          <Col span={9} className="object-cover transform-scale-x-[-1] ">
            <Image src={balo} alt="icon" height={140} width={157} />
          </Col>
          <Col span={15} className="text-white text-left my-[auto] ">
            <h2 className="font-black text-[32px]  ">Quên mật khẩu?</h2>
          </Col>
        </Row>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <h3 className="my-[3%] mx-auto">
            Nhập vào email của bạn để lấy lại mật khẩu.
          </h3>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email của bạn.",
              },
              {
                type: "email",
                message: "Email không hợp lệ",
              },
            ]}
          >
            <Input className="h-40" allowClear />
          </Form.Item>

          <Form.Item className="flex justify-end ">
            <Button
              type="default"
              onClick={handleCancel}
              className="mr-10 rounded-[50px]"
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="rounded-[50px] bg-[#FB9400]"
            >
              Gửi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ForgetPassword;
