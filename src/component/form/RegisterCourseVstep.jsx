"use client";
import React from "react";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { createConsultRegister } from "../../api/apiConsultRegister";

function RegisterCourseVstep(props) {
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
    <>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        className="max-w-[100vw] my-[10rem] px-[10%] bg-[#ff9400] text-white"
      >
        <h2 className="pt-[2.5rem] pb-[1.5rem] font-bold">ĐĂNG KÝ KHÓA HỌC</h2>
        <div className="grid tablet:grid-cols-5 gap-10 phone:grid-cols-1 justify-between  ">
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ và tên",
              },
            ]}
            className=" hover:border-[#FB9400] bg-[#FB9400] col-span-1 "
          >
            <Input
              className="border-[2px] border-solid border-white bg-[#FB9400]col-span-1 py-6 my-5 hover:border-[#FB9400] py-6"
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
              className="border-[2px] border-solid border-white  py-6 my-5 hover:border-[#FB9400]"
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
              className="border-[2px] border-solid border-white  py-6 my-5 hover:border-[#FB9400]"
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
          >
            <Input
              className="border-[2px] border-solid border-white  py-6 my-5 hover:border-[#FB9400] "
              placeholder="Nội dung tư vấn "
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              id="button-register"
              className="bg-white  text-[#FB9400] border-[2px] border-solid border-white  py-6 my-5 hover:border-[#FB9400] font-medium"
            >
              ĐĂNG KÝ
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}

export default RegisterCourseVstep;
