import React from "react";
import { getDataDisplay } from "@/api/apiDisplay";
import ButtonBanner from "../Button/Button";

async function BannerStudySchedule(props) {
  const res = await getDataDisplay();
  let background = {};
  let banner = {};
  if (res) {
    banner = res?.data?.items[31];
    background = res?.data?.items[26];
  }

  return (
    <>
      <div className="relative ">
        <div
          className=" grid grid-cols-5  text-white uppercase h-[54.4vh] "
          style={{
            backgroundImage: `url(${background.image})`,
            backgroundSize: "cover",
          }}
        >
          <div className="col-span-4 flex items-center text-center justify-center">
            <div className="mx-[10%] mt-[35px] text-center">
              <h2 className="laptop:text-[10rem] phone:text-[7rem] ml-[20%] text-[#fff]  text-center leading-[10rem]">
                {banner.title}
              </h2>
              <p className="text-center w-4/5 line-clamp-3  ml-[20%] text-[#fff] my-[5%] font-[500px] text-[4.5rem]">
                {banner.description}
              </p>
              <div className="w-[0rem] my-[0px] mx-[auto]">
                <ButtonBanner />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BannerStudySchedule;
