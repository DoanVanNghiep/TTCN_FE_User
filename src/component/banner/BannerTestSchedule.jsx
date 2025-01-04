/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getDataDisplay } from "@/api/apiDisplay";
import ButtonBanner from "../Button/Button";

async function BannerTestSchedule(props) {
  const res = await getDataDisplay();
  let banner = {};
  if (res) {
    banner = res?.data?.items[30];
  }

  return (
    <>
      <div className="relative">
        <div className="w-[100vw] h-[60vh]">
          <img
            src={banner.image}
            className="w-full h-full object-cover"
            alt=""
          />
          <div className="block-center w-[80%]">
            <h2 className="laptop:text-[10rem] phone:text-[7rem] text-[#fff]  text-center leading-[10rem]">
              {banner.title}
            </h2>
            <p className="text-center w-1/2 mx-auto line-clamp-3 text-[#fff] my-[5%] font-[500px] text-[4.5rem]">
              {banner.description}
            </p>
            <div className="w-[35rem] my-[0px] mx-[auto] ">
              <ButtonBanner />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BannerTestSchedule;
