import Image from "next/image";
import React from "react";
import { getDataDisplay } from "../../api/apiDisplay";
import ButtonBanner from "../Button/Button";

// { banner }
async function BannerAptisB1() {
  const res = await getDataDisplay();
  let banner = {};
  if (res) {
    banner = res?.data?.items[34];
  }
  return (
    <div className="bg-[#FFF4E5]">
      <div className="max-w-[1440px] mx-[auto]">
        <div className="grid tablet:grid-cols-2 items-center  tablet:mx-[10%] phone:grid-cols-1 phone:mx-0 ">
          <div className="col-span-1 phone:mx-[10%] tablet:mx-0 ">
            <div className="my-[10%]">
              <h2 className="uppercase text-[black]">{banner.title}</h2>
              <br />
              <p>{banner.description}</p>
              <div className="flex items-center">
                <ButtonBanner />
              </div>
            </div>
          </div>
          <div className="col-span-1  justify-center phone:hidden  tablet:flex">
            <Image src={banner.image} alt="teen" height={536} width={576} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerAptisB1;
