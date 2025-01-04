import { Button } from "antd/es/radio";
import React from "react";
import Carousels from "@/component/slider/Carousel";
import NewList from "@/component/news/NewList";
import FormRegister from "@/component/form/FormRegister";
import { getAllNews } from "@/api/apiNews";

async function PageDashbroad() {
  return (
    <div className=" ">
      <Carousels />
      <div className=" mx-auto max-w-[1440px]">
        <div className=" bg-[#fff]">
          <div className="max-w-[1440px] desktop:mx-[10%] tablet:mx-[10%] phone:mx-[5%] mt-[100px]">
            <h2 className="text-[10rem] font-[500] text-center my-[10rem] break-before-column text-[#f79500]">
              Tin tức
            </h2>
            <NewList />

            <h2
              id="resgister"
              className="text-[10rem] font-[500] text-center my-[10rem] break-before-column text-[#f79500]"
            >
              Đăng ký nhận tư vấn
            </h2>
            <FormRegister />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageDashbroad;
