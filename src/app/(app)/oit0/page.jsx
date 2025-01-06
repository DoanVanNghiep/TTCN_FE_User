/* eslint-disable @next/next/no-img-element */
import { Button, Row } from "antd";
import React from "react";
import EAcIntro from "@/component/introduce/EAcadamicIntro";
import Course from "@/component/studyDetail/course";
import Route from "@/component/route/route";
import AnotherCouresOit0 from "@/component/course/Coursehh";

import BannerOit0 from "@/component/banner/BannerOit0";
import FormCourseRegister from "@/component/form/FormCourseRegister";

import { getServiceById } from "@/api/apiService";
import { getSlideById } from "@/api/apiSlide";

async function PageOit0(props) {
  const res = await getServiceById(53);
  let service = [];
  if (res) {
    service = res?.data;
  }

  const slide = await getSlideById(12);
  let slidebyId = []; 
  if (slide) {
    slidebyId = slide?.data;
  }

  return (
    <div className="mx-[auto]">
      {/* <BannerEnglishAcademic /> */}
      <BannerOit0 />
      <div className="max-w-[1440px] mx-[10%]">
        <div
          style={{ textAlign: "center", marginTop: " 68px", color: "#f3833d" }}
        >
          <h2 className="laptop:text-[8rem] phone:font-[620] my-[5%] uppercase text-[#f08a41]">
            Giới thiệu tổng quan
          </h2>
        </div>
        <div className=" grid gap-48 laptop:grid-cols-3 tablet:grid-cols-2 phone:grid-cols-1 mt-[100px] ">
          <EAcIntro />
        </div>
        <div>
          <h2 className="title">Thông tin khóa học </h2>
          <Course service={service} />

          <div className="w-[80vw] mt-[10%] border-none">
            <img
              src={slidebyId?.image}
              className="w-full "
              alt=""
              width={800}
            />
          </div>

          <div className="">
            <h2 className="title">Lộ trình học và thi</h2>
            <Route />
          </div>
          <>
            <h2 className="text-[8rem] font-[500] text-center mt-[10rem] mb-[10rem] break-before-column text-[#f79500]">
              Các chương trình học khác
            </h2>
            <AnotherCouresOit0 />
          </>

          <>
            <h2 className="title" id="resgister">
              Đăng ký khóa học{" "}
            </h2>

            <FormCourseRegister />
          </>
        </div>
      </div>
    </div>
  );
}

export default PageOit0;
