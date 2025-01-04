import Carousels from "@/component/slider/Carousel";
import React from "react";
// import TableCourse from "./TableCourse";
import MyCourse from "./MyCourse/myCourse";

function PageMyCourse() {
  return (
    <div className="">
      <Carousels />

      <div className="mx-auto max-w-[1440w]">
        <div className="mt-[20rem] mb-[5rem] max-w-[1440px] mx-[10%]">
          <MyCourse />
        </div>
      </div>
    </div>
  );
}

export default PageMyCourse;
