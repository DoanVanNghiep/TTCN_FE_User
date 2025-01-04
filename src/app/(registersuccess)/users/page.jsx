import { Button } from "antd";
import Link from "next/link";
import React from "react";

function RegisterSuccess() {
  return (
    <div>
      <div className="text-center my-[40rem] mx-[80rem] p-[29rem] bg-[cornsilk] rounded-[20px] border-[1px] border-solid border-transparent ">
        <h2>Bạn đã xác thực email đăng ký thành công tại Edustar</h2>
        <div className="mt-[30px]">
          <Link
            className="bg-[#FB9400] hover:opacity-80 px-[5rem] border-solid	rounded-[2rem] text-white py-[6px] "
            href="/"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterSuccess;
