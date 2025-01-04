/* eslint-disable @next/next/no-img-element */
import React from "react";
// import "./VstepB2Intro.css";

function VstepB2Intro({ listIntroduceVstepB2 }) {
  return (
    <div className="mt-[20rem] justify-center">
      {listIntroduceVstepB2.map((item, index) => (
        <div key={index} className="flex mb-[20px]">
          <img src={item.image} alt="" className="h-[50rem] w-[50rem] " />
          <div className="ml-[15rem]">
            <p className="text-[4.5rem] text-left font-[600] py-[2rem] text-[#FB9400] ">
              {item.title}
            </p>
            <span className="text-[4rem] line-clamp-4 h-[25rem] block w-1/2">
              {item.content}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VstepB2Intro;
