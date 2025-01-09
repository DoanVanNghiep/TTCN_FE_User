"use client";
import { AppContext } from "../AppContext/AppContext";
import React, { useState, useContext, useEffect } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";

import RegisterAccountModal from "../modal/RegisterAccountModal";
import Cookies from "js-cookie";
import Link from "next/link";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const MenuHeader = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [jwt, setJwt] = useState(null);
  const [id, setId] = useState(null);

  const { data, dispatch } = useContext(AppContext);

  const showModalRegisterAcc = () => {
    dispatch({ type: "modalRegisterAccOpen" });
  };

  const checkPathname = () => {
    if (pathname.includes("/")) {
      return "1";
    }
    if (pathname.includes("/admission")) {
      return "3";
    }
    if (pathname.includes("/vstep")) {
      return "4";
    }
    if (pathname.includes("/vstep/luyen-thi-b1")) {
      return "5";
    }
    if (pathname.includes("/vstep/luyen-thi-b2")) {
      return "6";
    }
    if (pathname.includes("/toeic")) {
      return "7";
    }
    if (pathname.includes("/ielts")) {
      return "8";
    }
    if (pathname.includes("/aptis")) {
      return "9";
    }
    if (pathname.includes("/aptis/luyen-thi-b1")) {
      return "10";
    }
    if (pathname.includes("/aptis/luyen-thi-b2")) {
      return "11";
    }
    if (pathname.includes("/englishacademic")) {
      return "12";
    }
    if (pathname.includes("/test-schedule")) {
      return "13";
    }
    if (pathname.includes("/study-schedule")) {
      return "14";
    }
    if (pathname.includes("/new")) {
      return "15";
    }
  };

  const items = [
    {
      label: (
        <span style={{ fontSize: "13px", fontWeight: "500" }}>TRANG CHỦ</span>
      ),
      key: "1",
      onClick: () => {
        router.push("/");
      },
    },
    {
      label: (
        <span style={{ fontSize: "13px", fontWeight: "500" }}>TUYỂN SINH</span>
      ),
      key: "3",
      onClick: () => {
        router.push("/admission");
      },
    },
    {
      label: (
        <span style={{ fontSize: "13px", fontWeight: "500" }}>
          ĐÀO TẠO ANH NGỮ
        </span>
      ),
      children: [
        {
          label: (
            <Link href="/vstep" style={{ fontSize: "13px", fontWeight: "400" }}>
              Luyện thi VSTEP
            </Link>
          ),
          key: "4",
          children: [
            {
              label: (
                <span style={{ fontSize: "13px", fontWeight: "400" }}>
                  Luyện thi VSTEP B1
                </span>
              ),
              key: "5",
              onClick: () => {
                router.push("/vstep/luyen-thi-b1");
              },
            },
            {
              label: (
                <span style={{ fontSize: "13px", fontWeight: "400" }}>
                  Luyện thi VSTEP B2
                </span>
              ),
              key: "6",
              onClick: () => {
                router.push("/vstep/luyen-thi-b2");
              },
            },
          ],
        },
        {
          label: (
            <span style={{ fontSize: "13px", fontWeight: "400" }}>
              Luyện thi TOEIC
            </span>
          ),
          key: "7",
          onClick: () => {
            router.push("/toeic");
          },
        },
        {
          label: (
            <span style={{ fontSize: "13px", fontWeight: "400" }}>
              Luyện thi IELTS
            </span>
          ),
          key: "8",
          onClick: () => {
            router.push("/ielts");
          },
        },
        {
          label: (
            <Link href="/aptis" style={{ fontSize: "13px", fontWeight: "400" }}>
              Luyện thi APTIS
            </Link>
          ),
          key: "9",
          children: [
            {
              label: (
                <span style={{ fontSize: "13px", fontWeight: "400" }}>
                  Luyện thi APTIS B1
                </span>
              ),
              key: "10",
              onClick: () => {
                router.push("/aptis/luyen-thi-b1");
              },
            },
            {
              label: (
                <span style={{ fontSize: "13px", fontWeight: "400" }}>
                  Luyện thi APTIS B2
                </span>
              ),
              key: "11",
              onClick: () => {
                router.push("/aptis/luyen-thi-b2");
              },
            },
          ],
        },
        {
          label: (
            <span style={{ fontSize: "13px", fontWeight: "400" }}>
              Anh Ngữ Học Thuật
            </span>
          ),
          key: "12",
          onClick: () => {
            router.push("/englishacademic");
          },
        },
      ],
    },
    {
      label: (
        <span style={{ fontSize: "13px", fontWeight: "500" }}>
          ĐÀO TẠO TIN HỌC
        </span>
      ),
      children: [
        {
          label: (
            <Link href="/oit0" style={{ fontSize: "13px", fontWeight: "400" }}>
              CHỨNG CHỈ ỨNG DỤNG CNTT CƠ BẢN VÀ NÂNG CAO
            </Link>
          ),
          key: "16",
          onClick: () => {
            router.push("/oit0");
          },
        },
        {
          label: (
            <Link href="/oit1" style={{ fontSize: "13px", fontWeight: "400" }}>
              CHỨNG CHỈ TIN HỌC QUỐC TẾ ICDL
            </Link>
          ),
          key: "17",
          onClick: () => {
            router.push("/oit1");
          },
        },
        {
          label: (
            <Link href="/itce" style={{ fontSize: "13px", fontWeight: "400" }}>
              CHỨNG CHỈ TIN HỌC THEO QUY CHẾ ĐÀO TẠO
            </Link>
          ),
          key: "18",
          onClick: () => {
            router.push("/itce");
          },
        },
      ],
    },
    {
      label: (
        <span style={{ fontSize: "13px", fontWeight: "500" }}>
          LỊCH THI VSTEP
        </span>
      ),
      key: "13",
      onClick: () => {
        router.push("/test-schedule");
      },
    },
    {
      label: (
        <span style={{ fontSize: "13px", fontWeight: "500" }}>LỊCH ÔN TẬP</span>
      ),
      key: "14",
      onClick: () => {
        router.push("/study-schedule");
      },
    },
    {
      label: (
        <span style={{ fontSize: "13px", fontWeight: "500" }}>TIN TỨC</span>
      ),
      key: "15",
      onClick: () => {
        router.push("/new");
      },
    },
  ];

  useEffect(() => {
    setJwt(Cookies.get("jwt"));
    setId(Cookies.get("id"));
  }, []);

  return (
    <>
      <Menu
        onClick={(e) => {
          if (e.key === "sub6") {
            showModalRegisterAcc();
          }
        }}
        className="font-[500] items-center w-[70vw] phone:hidden tablet:hidden desktop:flex laptop:hidden"
        mode="horizontal"
        items={items}
        defaultSelectedKeys={checkPathname}
      />
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
        className="block phone:block tablet:block phone:absolute phone:left-[20px] phone:bottom-[13px] desktop:hidden"
      >
        <MenuOutlined className="" onClick={(e) => e.preventDefault()} />
      </Dropdown>
      <RegisterAccountModal />
    </>
  );
};

export default MenuHeader;
