"use client";
import { Modal, Form, Button, Input, Row, Col, message } from "antd";
import { AppContext } from "../AppContext/AppContext";
import React, { useContext } from "react";
import { login } from "@/api/login";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "antd/lib/form/Form";
import Image from "next/image";
import balo from "public/world_book_fun_fb_06 [Converted]-04 1.svg";

const LoginModal = () => {
  const { data, dispatch } = useContext(AppContext);
  const { modalLoginOpen } = data;
  const router = useRouter();
  const [form] = useForm();

  const onFinish = async (values) => {
    login(values).then((res) => {
      if (res?.data?.success === true) {
        dispatch({ type: "isLogin", payload: true });
        const checkPermission = res?.data?.data?.roles?.at(0);
        if (checkPermission === "CUSTOMER") {
          Cookies.set("jwt", res?.data?.data?.jwt);
          Cookies.set("id", res?.data?.data?.id);
          message.success("Đăng nhập thành công");
          form.resetFields();
          router.push("/mycourse");
        } else {
          form.resetFields();
          message.error("Bạn không có quyền đăng nhập");
        }
        // router.push("/mycourse");
      } else if (res?.data?.error?.statusCode === 500) {
        message.error(res?.data?.error?.message);
        form.resetFields();
        router.push("/");
      } else if (res?.data?.error?.statusCode === 3) {
        message.error("Hết phiên đăng nhập");
        form.resetFields();
        router.push("/");
      }
    });
    dispatch({ type: "modalLoginClose" });
  };

  const showModalRegister = () => {
    dispatch({ type: "modalRegisterOpen" });
    dispatch({ type: "modalLoginClose" });
  };
  const handleCancel = () => {
    dispatch({ type: "modalLoginClose" });
  };
  const handleForgetPassword = () => {
    dispatch({ type: "modalForgetPasswordOpen" });
    dispatch({ type: "modalLoginClose" });
  };

  return (
    <>
      <Modal
        open={modalLoginOpen}
        onCancel={handleCancel}
        className="max-h-[208px] tablet:w-[508px] phone:w-[340px] rounded-[38px] "
        footer={[]}
      >
        <Row className="bg-[#FB9400] rounded-[27px] my-20 overflow-hidden">
          <Col span={9} className="object-cover transform-scale-x-[-1] ">
            <Image src={balo} alt="icon" height={140} width={157} />
          </Col>
          <Col
            span={15}
            className="text-white text-left my-[10px] leading-snug"
          >
            <h2 className="font-black text-[32px] ">Đăng nhập</h2>
            <p className="font-normal text-[19.4px]">
              Học tiếng anh cùng <br></br> EduStar mỗi ngày
            </p>
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
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tài khoản.",
              },
            ]}
          >
            <Input className="h-40" placeholder="Tài khoản: " allowClear />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu.",
              },
            ]}
          >
            <Input.Password
              className="h-40"
              type="password"
              placeholder="Mật khẩu:"
            />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <div
              className="text-[#9E988F] underline decoration-solid decoration-[#9E988F] cursor-pointer "
              onClick={handleForgetPassword}
            >
              Quên mật khẩu?
            </div>
          </Form.Item>
          <Form.Item className="flex justify-end ">
            <Button
              type="default"
              // htmlType="submit"
              onClick={showModalRegister}
              className="mr-10 rounded-[50px]"
            >
              Đăng ký
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="rounded-[50px] bg-[#FB9400]"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default LoginModal;
