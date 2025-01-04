import React from "react";
import BannerTestSchedule from "@/component/banner/BannerTestSchedule";
import Area from "./Area";
import Route from "@/component/route/route";
import RegisterCourseVstep from "@/component/form/RegisterCourseVstep";
import FormRegister from "@/component/form/FormRegister";
import New from "@/component/news/New";

async function PageTestSchedule() {
  return (
    <div>
      <BannerTestSchedule />
      <div className=" mt-[20rem] mb-[5rem] max-w-[1440px] mx-[10%] ">
        <Area />
        <div>
          <h2 className="title">Lộ trình học và thi</h2>
          <Route />
        </div>
      </div>
      <RegisterCourseVstep />
      <div className="max-w-[1440px] mx-[10%] ">
        <h2 className="title">Đăng ký nhận tư vấn </h2>
        <FormRegister />
        <h2 className="title">Tin tức</h2>
        <New />
      </div>
    </div>
  );
}

export default PageTestSchedule;
