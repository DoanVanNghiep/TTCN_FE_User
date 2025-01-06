import { Button } from "antd/es/radio";
import React from "react";
import Carousels from "@/component/slider/Carousel";
import AdmissionList from "@/component/admission/AdmissionList";
import FormCourseRegister from "@/component/form/FormCourseRegister";
import FormRegister from "@/component/form/FormRegister";
import { getAllAdmissions } from "@/api/apiAdmission";

async function PageDashbroadAdd() {
  return (
    <div className=" ">
      <Carousels />
      <div className=" mx-auto">
        <div className=" bg-[#fff]">
          <div className="desktop:mx-[10%] tablet:mx-[10%] phone:mx-[5%] mt-[100px]">
            <h2 className="text-[10rem] font-[500] text-center my-[10rem] break-before-column text-[#f79500]">
              Thông Tin Tuyển Sinh
            </h2>
            <AdmissionList />

            <h2
              id="resgister"
              className="text-[10rem] font-[500] text-center my-[10rem] break-before-column text-[#f79500]"
            >
              Đăng ký tư vấn
            </h2>
            {/* <FormCourseRegister /> */}
            <FormRegister />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageDashbroadAdd;
