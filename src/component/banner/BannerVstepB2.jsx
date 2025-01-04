import React from "react";
import { getDataDisplay } from "@/api/apiDisplay";
import ButtonBanner from "../Button/Button";

async function BannerVstepB2() {
  // useEffect(() => {
  //   getDataDisplay()
  //     .then((data) => {
  //       setBanner(data?.data?.items[33]);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);
  const res = await getDataDisplay();
  let banner = {};
  if (res) {
    banner = res?.data?.items[33];
  }
  return (
    <div className=" bg-[#FFF4E5] grid grid-cols-2 ">
      <div className=" phone:col-span-2 px-[10%]  laptop:col-span-1">
        <h1 className="uppercase py-auto   text-center font-[500] text-[8rem] mt-[10%] mb-[5%]">
          {banner.title}
        </h1>
        <p className="leading-[9rem] font-[400]">{banner.description}</p>
        <div className="flex justify-center">
          {/* <Button
            className="uppercase  custom-btn  mt-[5%] mb-[10%]"
            onClick={() => {
              showModalConsulting();
            }}
          >
            đăng ký tư vấn
          </Button>
          <RegisterAccountModal /> */}
          <div className="mt-[16%] mr-[15rem] ">
            <ButtonBanner />
          </div>
        </div>
      </div>
      <div className=" laptop:col-span-1 hidden laptop:block ">
        <img src={banner.image} alt="" />
      </div>
    </div>
  );
}

export default BannerVstepB2;
