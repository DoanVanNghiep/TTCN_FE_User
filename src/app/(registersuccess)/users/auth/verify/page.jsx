/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { verifyEmail } from "../../../../../api/registerAuthen";
import { message } from "antd";

function RegisterSuccess(request) {
  const params = request?.searchParams["email-verification"];
  const [isVerified, setIsVerified] = useState(true);

  useEffect(() => {
    verifyEmail(params).then((res) => {
      if (res?.data?.success) {
        setIsVerified(res?.data?.success);
      } else if (res?.data?.statusCode === 500) {
        setIsVerified(res?.data?.success);
      }
    });
  }, [params]);
  return (
    <div>
      <div className="text-center my-[40rem] mx-[80rem] p-[29rem] bg-[cornsilk] rounded-[20px] border-[1px] border-solid border-transparent ">
        <h2>
          {isVerified
            ? "Bạn đã xác thực email đăng ký thành công tại Edustar"
            : "Xác thực thất bại"}
        </h2>
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
