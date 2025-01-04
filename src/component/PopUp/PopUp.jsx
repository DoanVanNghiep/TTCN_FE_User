/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { registerAuthen } from "@/api/registerAuthen";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  RightSquareOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, message, notification } from "antd";
import { useForm } from "antd/lib/form/Form";
import Image from "next/image";
import popup3 from "public/popup3.png";
import popup5 from "public/popup5.png";
import { useEffect, useState } from "react";
import "./Css.css";

function PopUp(props) {
  const [isPopUp, setIsPopUp] = useState(false);
  const [isInternal, setInternal] = useState(false);
  const [form] = useForm();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const popup =
      !isPopUp && !isInternal
        ? setInterval(() => {
            setIsPopUp(true);
          }, 5000)
        : undefined;
    return () => clearInterval(popup);
  }, [isPopUp]);

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
        message.error(res?.data?.error?.message);
        form.resetFields();
      } else if (res?.data?.error?.statusCode === 2) {
        {
          res?.data?.error?.errorDetailList.map((e) =>
            message.error(e.message)
          );
        }
        form.resetFields();
      }
    });
  };

  return (
    <div>
      <Modal
        open={isPopUp}
        
        onCancel={() => {
          setIsPopUp(false);
          setInternal(true);
        }}
        width={800}
        footer={[]}
      >
        <div className="laptop:flex laptop:h-[106rem]  phone:block phone:h-[112rem] ">
          <div className=" mt-[10px] phone:relative phone:bottom-[30px] tablet:left-[30rem] laptop:left-[15rem] ">
            <div className="flex desktop:relative desktop:right-[24px] ">
              <img
                src="/logoCamTrongSuot.png"
                alt=""
                className=" laptop:w-[45rem] relative laptop:top-[-7rem]  laptop:left-[-10rem] phone:w-[30rem] phone:top-[-10px] phone:left-[26px]  "
              />
              <h2 className="laptop:text-[45px] phone:text-[30px] font-normal text-[#fb9400] relative laptop:right-[26rem] laptop:top-[57px] phone:right-[4rem] phone:top-[35px] ">
                EduStar
              </h2>
            </div>
            <p className=" text-[#fb9400] laptop:text-[30px] laptop:w-[80%] phone:text-[15px] relative laptop:bottom-[19rem] laptop:left-[-12px] phone:bottom-[11rem] phone:left-[10rem]  ">
              Make English become your power
            </p>
            <div className="laptop:relative laptop:bottom-[18rem] ml-[18px] phone:hidden laptop:inline ">
              <h1 className="text-[6rem] mb-[15px]  ">Đăng ký ngay để: </h1>
              <div className="flex mb-[10px] ">
                <RightSquareOutlined className="text-[#F69050] mr-[5px] " />

                <p>Nhận thêm tài liệu</p>
              </div>
              <div className="flex mb-[10px] ">
                <RightSquareOutlined className="text-[#F69050] mr-[5px] " />

                <p>Nhận thêm nhiều bài thi thử</p>
              </div>
            </div>
            <Image
              src={popup3}
              height={289}
              width={157}
              className=" w-[289px]  m-[0] relative left-[16px] bottom-[110px] phone:hidden laptop:inline "
            />
          </div>
          {/* w-[50%] ml-[20rem] */}
          <div className=" phone:relative phone:bottom-[16rem] laptop:top-[10px] ">
            <Form
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              form={form}
            >
              <h1 className=" font-bold text-7xl text-center mb-[20px] text-[#FB9400] mt-[11px] uppercase  phone:relative phone:right-[0px] tablet:right-[1px] ">
                Đăng ký ngay bây giờ
              </h1>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên!" },
                  { type: "text", message: "Vui lòng nhập họ và tên!" },
                ]}
              >
                <Input
                  className="h-[10rem]"
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
                  className="h-[10rem]"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Tên tài khoản"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input.Password
                  className="h-[10rem]"
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
                  className="h-[10rem]"
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
                  className="h-[10rem]"
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>

              <Form.Item className="flex justify-end ">
                <Button
                  type="primary"
                  htmlType="submit"
                  className=" bg-[#FB9400] w-[94rem] phone:w-[50rem] phone:relative phone:right-[10rem] phone:bottom-[7px] tablet:right-[26rem] tablet:w-[80rem] laptop:right-[0rem] "
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
            <Image
              src={popup5}
              // src={popup1}
              alt="icon"
              height={140}
              width={157}
              className=" relative laptop:bottom-[63rem] laptop:left-[78rem] phone:hidden laptop:inline "
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PopUp;
