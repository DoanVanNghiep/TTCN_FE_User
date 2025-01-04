"use client";
import React from "react";
import { message, Button, Form, Input } from "antd";
import {
  MailOutlined,
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { createConsultRegister } from "@/api/apiConsultRegister";
import { useForm } from "antd/lib/form/Form";

function FormRegister() {
  const [form] = useForm();
  const onFinish = (values) => {
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
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="max-w-full "
        form={form}
      >
        <div className="grid tablet:grid-cols-2 gap-12 phone:grid-cols-1 justify-between mt-[5%]">
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ và tên",
              },
            ]}
            className=" hover:border-[#FB9400] col-span-1"
          >
            <Input
              className="border-[2px] border-solid border-[#FB9400] col-span-1 py-6 my-5 hover:border-[#FB9400] py-6"
              prefix={<UserOutlined className="site-form-item-icon mr-5" />}
              placeholder="Họ và tên"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại",
              },
              {
                pattern: /^[0-9]{10,}$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input
              className="border-[2px] border-solid border-[#FB9400] py-6 my-5 hover:border-[#FB9400]"
              prefix={<PhoneOutlined className="site-form-item-icon mr-5" />}
              placeholder="Số điện thoại"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "Định dạng email không hợp lệ",
              },
              {
                required: true,
                message: "Vui lòng nhập Email",
              },
            ]}
          >
            <Input
              className="border-[2px] border-solid border-[#FB9400] py-6 my-5 hover:border-[#FB9400]"
              prefix={<MailOutlined className="site-form-item-icon mr-5" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="contentAdvice"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập nội dung tư vấn",
              },
            ]}
            className=""
          >
            <Input
              className="border-[2px] border-solid border-[#FB9400] py-6 my-5 hover:border-[#FB9400] font-[500]]"
              prefix={<EditOutlined className="site-form-item-icon mr-5" />}
              placeholder="Nội dung tư vấn "
            />
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#FB9400] block mx-auto hover:opacity-80 mb-[5%] px-[4%] "
          >
            Gửi thông tin
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormRegister;
