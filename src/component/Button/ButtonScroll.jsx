"use client";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

function ButtonScroll(props) {
  return (
    <div>
      <Link href="#resgister">
        <Button className="mx-auto block  bg-primaryColor custom-btn uppercase hover:text-[#fff]">
          Đăng ký học{" "}
        </Button>
      </Link>
    </div>
  );
}

export default ButtonScroll;
