"use client";
import { Button, Image, message } from "antd";
import React, { useEffect, useRef, useState, useContext } from "react";
import Link from "next/link";
import moment from "moment";
import { getUserProfile, updateUser } from "@/api/user";
import UploadAvatar from "@/component/modal/UploadAvatar";
import { AppContext } from "@/component/AppContext/AppContext";
import {
  ProForm,
  ProFormDatePicker,
  ProFormText,
} from "@ant-design/pro-components";
import "./style.css";
import { useRouter } from "next/navigation";

function PageUserProfile(props) {
  const [data, setData] = useState({});
  const { dispatch } = useContext(AppContext);
  const router = useRouter();
  const formRef = useRef(null);

  const handleGetInforUser = () => {
    getUserProfile().then((res) => {
      setData(res?.data?.data);
    });
  };

  // console.log("data", data?.name);

  const handleUpdateInforUser = (values) => {
    updateUser(values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Cập nhật người dùng thành công");
        handleGetInforUser();
        router.push("/user");
      } else if (res?.data?.error?.statusCode === 2) {
        {
          res?.data?.error?.errorDetailList.map((e) =>
            message.error(e.message)
          );
        }
      }
    });
  };

  const showModalUploadAvatar = () => {
    dispatch({ type: "modalUploadAvatarOpen" });
  };

  useEffect(() => {
    handleGetInforUser();
  }, []);

  return (
    <div style={{ margin: "45px auto", maxWidth: "1440px" }}>
      <div className="mx-[10%]">
        <ProForm
          submitter={false}
          name="basic"
          // initialValues={data}
          layout="vertical"
          onFinish={(values) => {
            handleUpdateInforUser(values);
          }}
          formRef={formRef}
          className="w-[187.5rem]  m-[auto] bg-white border-2 border-solid border-[#808080/40]"
        >
          <div className="grid gap-12 tablet:grid-cols-3  phone:grid-cols-1 flex-row items-center justify-evenly mx-[10rem] my-[10px]">
            <Image
              src={data?.avatar}
              alt="avatar"
              height={150}
              width={150}
              className="col-span-1 phone:mx-auto my-[10px] "
            />
            <button
              onClick={() => {
                showModalUploadAvatar();
              }}
              className="custom-btn mr-[4rem] block px-[3rem] phone:mx-auto phone:w-[60%] tablet:w-full col-span-1 "
            >
              Tải ảnh đại diện mới
            </button>
            <button className="custom-btn  px-[3rem] phone:mx-auto phone:w-[60%] tablet:w-full  col-span-1">
              <Link href="/user/edit-account">Đổi mật khẩu</Link>
            </button>
          </div>

          <div className="flex justify-between flex-wrap mx-[10rem]">
            <ProForm.Group>
              <ProFormText
                className="w-[100%] hover:border-[#FB9400] "
                initialValue={data?.name}
                width="md"
                name="name"
                label="Tên người dùng"
                placeholder="Tên người dùng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ tên ",
                  },
                ]}
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText
                width="md"
                initialValue={data?.email}
                name="email"
                label="E-mail"
                placeholder="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "E-mail không hợp lệ",
                  },
                  {
                    required: true,
                    message: "Vui lòng nhập E-mail của bạn",
                  },
                ]}
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText
                width="md"
                name="phone"
                initialValue={data?.phone}
                label="Số điện thoại:"
                placeholder="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Số điện thoại ",
                  },
                  {
                    pattern: /^[0-9]{10,}$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]}
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormDatePicker
                width="md"
                name="dateOfBirth"
                initialValue={data?.dateOfBirth}
                label="Ngày sinh"
                placeholder="Ngày sinh"
                fieldProps={{
                  format: "DD/MM/YYYY",
                  transform: (value) => moment(value).format("DD/MM/YYYY"),
                }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập ngày sinh ",
                  },
                ]}
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText
                width="md"
                name="address"
                initialValue={data?.address}
                label="Địa chỉ"
                placeholder="Địa chỉ"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ ",
                  },
                ]}
              />
            </ProForm.Group>
          </div>

          <div className="flex justify-end m-[10rem]  ">
            <Button
              type="default"
              // htmlType="submit"
              className=" hover:opacity-80   mr-[4rem] px-[5rem]"
            >
              <Link href="/user">Hủy</Link>
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#FB9400]  hover:opacity-80  px-[5rem]"
              // onClick={handleSubmit}
            >
              Cập nhật
            </Button>
          </div>
        </ProForm>
        <UploadAvatar />
      </div>
    </div>
  );
}

export default PageUserProfile;
