import { getDataDisplay } from "@/api/apiDisplay";
import { Col } from "antd";
import Image from "next/image";
import React from "react";
// { item }
async function EAcadamicIntro() {
  const res = await getDataDisplay();
  let listEAcademic = [];
  if (res) {
    listEAcademic = res?.data?.items.slice(27, 30);
  }
  return listEAcademic.map((item) => (
    <>
      <div className="p-[5rem]  shadow-md  ">
        <div className=" grid grid-rows-2">
          <div className=" row-span-1 flex items-center ">
            <div className="h-[210px] w-[310px] relative">
              <Image
                src={item.image}
                alt="pic"
                width={312}
                height={206}
                className=" object-fit"
              />
            </div>
          </div>

          <div className="text-left pt-[5rem] row-span-1">
            <h2 className="text-[5rem] font-[600] text-primaryColor my-[3rem]">
              {item.title}
            </h2>
            <p className="text-[4rem] font-[400]">{item.description}</p>
          </div>
        </div>
      </div>
    </>
  ));
}

export default EAcadamicIntro;
