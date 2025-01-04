import React from "react";
import { getDataDisplay } from "@/api/apiDisplay";
async function Route() {
  const res = await getDataDisplay();
  let routeList = [];
  if (res) {
    routeList = res?.data?.items.slice(4, 9);
  }

  return (
    <div>
      {routeList.map((item, index) => (
        <div
          key={index}
          className=" bg-[#FFF4E5] tablet:h-[25rem] phone:h-[30rem] my-[5rem] shadow-md hover:opacity-90  grid  grid-cols-10 gap-0"
        >
          <div className="bg-primaryColor relative justify-center tablet:col-span-2   laptop:col-span-1 phone:col-span-3 block ">
            <h2 className="text-[#fff] font-[600] laptop:text-[5rem] phone:text-[4rem] text-center block-center ">
              {item.image}
            </h2>
          </div>
          <div className="  block relative phone:col-span-7 tablet:col-span-8 laptop:col-span-9">
            <div className="absolute top-[50%] translate-y-[-50%] px-[5rem] phone: py-[3rem] ">
              <h3 className="text-[4.5rem] phone:leading-tight font-[500]">
                {item.title}
              </h3>
              <p className="text-[4rem] fontt-[400]  phone:leading-tight phone:text-[3.5rem]">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Route;
