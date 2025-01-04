import { Col } from "antd";
import React from "react";

const ExamStructureVstepB2 = ({ examSructureVstepB2 }) => {
  return (
    // <div className="">
    //   {examSructureVstepB2.map((item, ind) => (
    //     <div
    //       key={ind}
    //       className="border-[1px]  border-solid rounded-[5px] col-span-2"
    //     >
    //       <div>
    //         <p className="">{item.title} </p>
    //         <span className="text-[4rem]">{item.content} </span>
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <>
      <div className="grid phone:grid-cols-1 tablet:grid-cols-2">
        {examSructureVstepB2.map((item, index) => (
          <div key={index} className="col-span-1 phone:my-[5rem] tablet:my-0">
            <h2 className="text-[4.5rem] font-[500] border-[1px] border-solid text-center py-4 text-[#000000]">
              {item.title}
            </h2>
            <p className="border-[1px] border-solid text-left border-t-0 p-[10rem]">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExamStructureVstepB2;
