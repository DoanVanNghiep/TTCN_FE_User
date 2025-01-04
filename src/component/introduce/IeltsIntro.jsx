// "use client";
import { Col, Row } from "antd";
import Image from "next/image";
// import React, { useEffect, useState } from "react";
import { getDataDisplay } from "@/api/apiDisplay";

// { adList }
async function IeltsIntro() {
  const data = await getDataDisplay();
  let adList = [];
  if (data) {
    adList = data?.data?.items.slice(19, 25);
  }

  return (
    <div className="grid tablet:gap-24 desktop:grid-cols-3 tablet:grid-cols-2 phone:grid-cols-1 justify-between ">
      {adList.map((item, index) => (
        <div
          key={index}
          className="border-[2px] col-span-1 p-[4rem]  border-solid border-primaryColor my-[5%]"
        >
          <Image
            src={item.image}
            alt="icon"
            className=" mx-auto "
            height={65}
            width={65}
          />
          <p className="text-[4.5rem] text-center font-[600] py-[2rem] uppercase ">
            {item.title}
          </p>
          <span className="text-[4rem] text-center line-clamp-4 h-[25rem] block ">
            {item.description}
          </span>
        </div>
      ))}
    </div>
  );
}

export default IeltsIntro;
