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
    if (pathname.includes("/vstep")) {
      return "3";
    }
    if (pathname.includes("/vstep/luyen-thi-b1")) {
      return "4";
    }
    if (pathname.includes("/vstep/luyen-thi-b2")) {
      return "5";
    }
    if (pathname.includes("/toeic")) {
      return "6";
    }
    if (pathname.includes("/ielts")) {
      return "7";
    }
    if (pathname.includes("/aptis")) {
      return "8";
    }
    if (pathname.includes("/aptis/luyen-thi-b1")) {
      return "9";
    }
    if (pathname.includes("/aptis/luyen-thi-b2")) {
      return "10";
    }
    if (pathname.includes("/englishacademic")) {
      return "11";
    }
    if (pathname.includes("/test-schedule")) {
      return "12";
    }
    if (pathname.includes("/study-schedule")) {
      return "13";
    }
    if (pathname.includes("/new")) {
      return "14";
    }
  };

  const items = [
    {
      label: "TRANG CHỦ",
      key: "1",
      onClick: () => {
        router.push("/");
      },
    },
    {
      label: (
        <Link href={`https://mocktest.edustar.com.vn/?jwt=${jwt}&id=${id}`}>
          THI THỬ{" "}
        </Link>
      ),
      key: "2",
    },
    {
      label: "KHÓA HỌC",
      children: [
        {
          label: <Link href="/vstep">Luyện thi VSTEP</Link>,
          key: "3",
          children: [
            {
              label: "Luyện thi VSTEP B1",
              key: "4",
              onClick: () => {
                router.push("/vstep/luyen-thi-b1");
              },
            },
            {
              label: "Luyện thi VSTEP B2",
              key: "5",
              onClick: () => {
                router.push("/vstep/luyen-thi-b2");
              },
            },
          ],
        },
        {
          label: "Luyện thi TOEIC",
          key: "6",
          onClick: () => {
            router.push("/toeic");
          },
        },
        {
          label: "Luyện thi IELTS",
          key: "7",
          onClick: () => {
            router.push("/ielts");
          },
        },
        {
          label: <Link href="/aptis">Luyện thi APTIS</Link>,
          key: "8",
          children: [
            {
              label: "Luyện thi APTIS B1",
              key: "9",
              onClick: () => {
                router.push("/aptis/luyen-thi-b1");
              },
            },
            {
              label: "Luyện thi APTIS B2",
              key: "10",
              onClick: () => {
                router.push("/aptis/luyen-thi-b2");
              },
            },
          ],
        },

        {
          label: "Anh Ngữ Học Thuật",
          key: "11",
          onClick: () => {
            router.push("/englishacademic");
          },
        },
      ],
    },
    {
      label: "LỊCH THI VSTEP",
      key: "12",
      onClick: () => {
        router.push("/test-schedule");
      },
    },
    {
      label: "LỊCH ÔN TẬP",
      key: "13",
      onClick: () => {
        router.push("/study-schedule");
      },
    },
    {
      label: "TIN TỨC",
      key: "14",
      onClick: () => {
        router.push("/new");
      },
    },

    {
      label: "ĐĂNG KÝ TƯ VẤN",
      key: "sub6",
    },
  ];
  useEffect(() => {
    setJwt(Cookies.get("jwt"));
    setId(Cookies.get("id"));
    console.log(jwt, id);
  }, []);

  return (
    <>
      <Menu
        onClick={(e) => {
          if (e.key == "sub6") {
            showModalRegisterAcc();
          }
        }}
        className="font-[500] items-center w-[70vw] phone:hidden tablet:hidden desktop:flex laptop:hidden  "
        mode="horizontal"
        items={items}
        defaultSelectedKeys={checkPathname}
      />
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
        className="block phone:block tablet:block phone:absolute phone:left-[20px] phone:bottom-[13px] desktop:hidden  "
      >
        <MenuOutlined className="" onClick={(e) => e.preventDefault()} />
      </Dropdown>
      <RegisterAccountModal />
    </>
  );
};

export default MenuHeader;
