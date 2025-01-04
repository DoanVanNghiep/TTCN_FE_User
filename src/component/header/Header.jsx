/* eslint-disable @next/next/no-img-element */
"use client";
import { Button, Dropdown } from "antd";
import LoginModal from "../modal/LoginModal";
import RegisterModal from "../modal/RegisterModal";
import MenuHeader from "@/component/menu/MenuHeader";
import ForgetPassword from "../modal/ForgetPassword";
import { AppContext } from "../AppContext/AppContext";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

function Header() {
  const { data, dispatch } = useContext(AppContext);
  const router = useRouter();
  const pathname = usePathname();
  const [check, setCheck] = useState("");

  const jwt = Cookies.get("jwt");
  useEffect(() => {
    setCheck(jwt);
  }, [jwt]);

  const showModalRegister = () => {
    dispatch({ type: "modalRegisterOpen" });
  };

  const showModalLogin = () => {
    dispatch({ type: "modalLoginOpen" });
  };

  const onClick = (e) => {
    if (e.key == 1) {
      showModalRegister();
    }
    if (e.key == 2) {
      showModalLogin();
    }
  };

  const checkPathname = () => {
    const pathMapping = {
      "/mycourse": "3",
      "/user": "4",
    };
    return pathMapping[pathname];
  };

  const items = [
    check
      ? undefined
      : {
          label: "Đăng ký",
          key: 1,
        },
    check
      ? undefined
      : {
          label: "Đăng nhập",
          onClick: () => {},
          key: "2",
        },
    check
      ? {
          label: <Link href="/mycourse">Khóa học</Link>,
          key: "3",
        }
      : undefined,
    check
      ? {
          label: <Link href="/user">Hồ sơ</Link>,
          key: "4",
        }
      : undefined,
    check
      ? {
          label: "Đăng xuất",
          onClick: () => {
            router.replace("/");
            Cookies.remove("jwt");
            Cookies.remove("id");
            dispatch({ type: "isLogin", payload: false });
          },

          key: "5",
        }
      : undefined,
  ];

  return (
    <div className="mx-auto fixed top-0 z-50 max-w-screen-2xl  ">
      <div>
        <div className=" flex items-center w-[100vw] bg-white px-[39rem] phone:pl-[51rem] tablet:pl-[111rem]  phone:pt-[47px] laptop:pt-[50px] laptop:px-[128rem]  desktop:pt-[5px] desktop:pl-[101rem] ">
          <div className="flex">
            <div>
              <div
                className="flex cursor-pointer"
                onClick={() => {
                  router.push("/");
                }}
              >
                <img
                  src="/logoCamTrongSuot.png"
                  alt="" //laptop:bottom-[-20px] laptop:left-[105rem]
                  className="  h-[23rem]  phone:absolute phone:bottom-[-6rem] phone:left-[25rem] tablet:left-[56rem] tablet:block  laptop:left-[106rem]  desktop:left-[55rem] desktop:bottom-[-5rem]" //phone:hidden
                />
                <h2 className=" ml-[21rem] my-[6px] text-[#fb9400] mt-[9px] text-8xl font-medium  phone:ml-[-9rem]  phone:absolute phone:mt-[-31px] tablet:ml-[-38rem] laptop:ml-[-3rem]   desktop:left-[74rem]  desktop:top-[12rem]  ">
                  EduStar
                </h2>
              </div>
            </div>

            <MenuHeader />
          </div>

          <div className="max-h-[7rem]">
            <Dropdown
              menu={{
                items,
                onClick,
                defaultSelectedKeys: checkPathname(),
              }}
              trigger={["click"]}
              arrow
              className="pl-[2rem] my-auto h-[7rem] cursor-pointer phone:m-[3rem] desktop:m-[5rem] phone:absolute   phone:bottom-[0px] desktop:top-[-3rem] phone:right-[10px] desktop:right-[22rem] "
              // className="block"
            >
              <p onClick={(e) => e.preventDefault()}>
                <Image
                  src="/profile-user.png" //phone:absolute
                  className="mb-5px"
                  alt="sth"
                  width={36}
                  height={26}
                />
              </p>
            </Dropdown>
          </div>
        </div>
      </div>

      <RegisterModal />
      <LoginModal />
      <ForgetPassword />
      {/* <RegisterAccountModal        
      /> */}
    </div>
  );
}

export default Header;
