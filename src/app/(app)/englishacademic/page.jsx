/* eslint-disable @next/next/no-img-element */
import { Button, Row } from "antd";
import React from "react";
import EAcadamicIntro from "@/component/introduce/EAcadamicIntro";
import Course from "@/component/studyDetail/course";
import Route from "@/component/route/route";
import AnotherCoures from "@/component/course/AnotherCoures";
import FormRegister from "@/component/form/FormRegister";
import BannerEnglishAcademic from "@/component/banner/BannerEnglishAcademic";
import { getServiceById } from "@/api/apiService";
import { getSlideById } from "@/api/apiSlide";
import CourseDetail from "@/component/studyDetail/couseDetail";

async function PageEnglishAcademic(props) {
  const res = await getServiceById(13);
  let service = [];
  if (res) {
    service = res?.data;
  }

  const slide = await getSlideById(9);
  let slidebyId = [];
  if (slide) {
    slidebyId = slide?.data;
  }

  return (
    <div className="mx-[auto]">
      <BannerEnglishAcademic />
      <div className="max-w-[1440px] mx-[10%]">
        <div className=" grid gap-48 laptop:grid-cols-3 tablet:grid-cols-2 phone:grid-cols-1 mt-[100px] ">
          <EAcadamicIntro />
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
          <>
            <CourseDetail service={service} />
          </>

          <div className="">
            <h2 className="title">Lộ trình học và thi</h2>
            <Route />
          </div>
          <>
            <h2 className="text-[8rem] font-[500] text-center mt-[10rem] mb-[10rem] break-before-column text-[#f79500]">
              Các chương trình học khác
            </h2>
            <AnotherCoures />
          </>

          <>
            <h2 className="title" id="resgister">
              Đăng ký nhận tư vấn{" "}
            </h2>

            <FormRegister />
          </>
        </div>
      </div>
    </div>
  );
}

export default PageEnglishAcademic;
