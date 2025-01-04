import Image from "next/image";
import React from "react";
import { getDataDisplay } from "@/api/apiDisplay";
import ButtonBanner from "../Button/Button";
// { banner }
async function BannerIelts() {
  const res = await getDataDisplay();
  let banner = {};
  if (res) {
    banner = res?.data?.items.slice(18, 19);
  }

  return banner.map((item) => (
    <div key={1} className="grid tablet:grid-cols-2 phone:grid-col-1 shadow-xl">
      <div className="col-span-1 max-h-[500px] phone: tablet:block">
        <Image
          src={item.image}
          className="w-full h-full object-cover "
          alt="pic"
          width={724}
          height={462}
        />
      </div>

      <div className="col-span-1 ">
        <div className="bg-[#FFF4E5] pt-[10%] px-[10%]  h-full ">
          <h2 className="pb-[5rem] block  font-[500] text-[8rem]">
            {item.title}
          </h2>
          <p className="py-auto block  font-[400] text-[4rem]">
            {item.description}
          </p>
          <div className="w-[34%] mt-[10px] mx-[auto] ">
            <ButtonBanner />
          </div>
        </div>
      </div>
    </div>
  ));
}

export default BannerIelts;
