/* eslint-disable @next/next/no-img-element */
import React from "react";
// import "./VstepB2Intro.css";

function VstepB2Intro({ listIntroduceVstepB2 }) {
  return (
    <div className="mt-[20rem] justify-center ">
      {listIntroduceVstepB2.map((item, index) => (
        <div key={index} className="flex mb-[20px]">
          {index % 2 == 0 ? (
            <div className="grid grid-cols-3 gap-24 flex items-center">
              <img
                src={item.image}
                alt=""
                className=" col-span-1 block - mx-auto"
              />
              <div className=" col-span-2">
                <p className="text-[4.5rem] text-left font-[600] py-[2rem] text-[#FB9400] ">
                  {item.title}
                </p>
                <span className="text-[4rem] line-clamp-4 h-[25rem] block ">
                  {item.content}
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-24 flex items-center">
              <div className=" col-span-2">
                <p className="text-[4.5rem] text-left font-[600] py-[2rem] text-[#FB9400] ">
                  {item.title}
                </p>
                <span className="text-[4rem] line-clamp-4 h-[25rem] block ">
                  {item.content}
                </span>
              </div>
              <img
                src={item.image}
                alt=""
                className=" col-span-1 block - mx-auto"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default VstepB2Intro;
