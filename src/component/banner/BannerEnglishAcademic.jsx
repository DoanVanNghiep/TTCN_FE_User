/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getDataDisplay } from "../../api/apiDisplay";
import ButtonBanner from "../Button/Button";

// { banner }
async function BannerEnglishAcademic() {
  const res = await getDataDisplay();
  let banner = {};
  if (res) {
    banner = res?.data?.items[26];
  }
  return (
    <>
      <div className="w-[100vw] relative">
        <img
          src={banner.image}
          className="w-full h-[70vh] object-cover"
          alt=""
        />
        <div
          className=" laptop:w-[50%] phone:w-[80
        %] mx-auto text-center absolute top-[20%] left-[50%] translate-x-[-50%]  border-[10px] p-[3%] border-primaryColor border-solid text-[white] "
        >
          <h2 className="laptop:text-[8rem] phone: font-[700] my-[5%] uppercase">
            {banner.title}
          </h2>
          <p className="text-[4.5rem] font-[500] line-clamp-6 h-[41rem">
            {banner.description}
          </p>
          <ButtonBanner />
        </div>
      </div>
    </>
  );
}

export default BannerEnglishAcademic;
