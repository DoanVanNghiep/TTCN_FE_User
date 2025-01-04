import { Button, Col } from "antd";
import React from "react";
import ButtonScroll from "../Button/ButtonScroll";

function Course({ item }) {
  return (
    <>
      <Col
        span={20}
        className=" shadow-xl rounded-[10px] overflow-hidden mx-auto"
      >
        <h2 className="uppercase text-[5rem] font-[700] py-[2rem] bg-primaryColor text-[#fff] text-center">
          {item?.name}
        </h2>
        <div className="px-[5%] py-[5%]  ">
          <div className="flex my-[10px] gap-[5px] items-baseline ">
            <h3>Trình độ đầu vào:</h3> <p>{item?.requestStudents}</p>
          </div>
          <div className="flex my-[10px] gap-[5px] items-baseline ">
            <h3>Số buổi:</h3> <p>{item?.numberTeachingSessions}</p>
          </div>
          <div className="flex my-[10px] gap-[5px] items-baseline ">
            <h3>Lịch học:</h3> <p>{item?.schedule}</p>
          </div>
          <div className="flex my-[10px] gap-[5px] items-baseline ">
            <h3>Hình thức học:</h3> <p>{item?.learningForm}</p>
          </div>
          <div className="flex my-[10px] gap-[5px] items-baseline ">
            <h3>Lộ trình đào tạo:</h3>
            <ul className="list-disc ml-[5%]">
              {item?.curriculum?.map((item, subIndex) => (
                <li key={subIndex}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex my-[10px] gap-[5px] items-baseline ">
            {item?.description}
          </div>
          <ButtonScroll registerHref="#register" courseID={item?.id} />
        </div>
      </Col>
    </>
  );
}

export default Course;
