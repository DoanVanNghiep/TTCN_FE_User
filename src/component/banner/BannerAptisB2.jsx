import Image from "next/image";
import React from "react";
import { getDataDisplay } from "../../api/apiDisplay";
import ButtonBanner from "../Button/Button";

// { banner }
async function BannerAptisB2() {
  // useEffect(() => {
  //   getDataDisplay()
  //     .then((data) => {
  //       setBanner(data?.data?.items[38]);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);
  const res = await getDataDisplay();
  let banner = {};
  if (res) {
    banner = res?.data?.items[38];
  }

  return (
    <div className="bg-[#FFF4E5]">
      <div className="max-w-[1440px] mx-[auto]">
        <div className="grid tablet:grid-cols-2 items-center  tablet:mx-[10%] phone:grid-cols-1 phone:mx-0 ">
          <div className="col-span-1  justify-center phone:hidden  tablet:flex">
            <div className="after:absolute after:h-[30%] relative after:w-[20%] after:top-[-10px] after:left-[-10px] after:bg-[#FB9400] after:z-5  before:absolute before:h-[30%] before:w-[20%] before:bottom-[-10px] before:right-[-10px] before:bg-[#FB9400] before:z-5">
              <Image
                src={banner.image}
                alt="pic"
                className="z-10 object-cover relative "
                width={590}
                height={340}
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="mx-[10%] my-[10%] ">
              <h2 className="uppercase text-[black]">{banner.title}</h2>
              <br />
              <p>{banner.description}</p>
              <div className="flex items-center">
                <ButtonBanner />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerAptisB2;
