import React from "react";
import { getDataDisplay } from "@/api/apiDisplay";
import ButtonBanner from "../Button/Button";

async function BannerVstepB1() {
  const res = await getDataDisplay();
  let banner = {};
  if (res) {
    banner = res?.data?.items[32];
  }
  return (
    <div>
      <div className="w-[100vw] h-[50vh] relative">
        <img src={banner.image} alt="" className="w-full h-full object-cover" />
        <div className="w-[60vw] bg-[#fff4e5d6] h-full block block-center opa">
          <h2 className="text-[9rem] text-[#000000] font-[500] text-center mt-[10%] mb-[5%]">
            {banner.title}
          </h2>
          <p className="text-[4rem] font-[400] text-[#000000] line-clamp-4 h-[110px] px-[20%] text-center">
            {banner.description}
          </p>

          <div className=" w-[36rem] mt-[10px] mb-[0] mx-[auto] ">
            <ButtonBanner />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerVstepB1;
