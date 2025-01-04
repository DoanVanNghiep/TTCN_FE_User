// "use client";
import React from "react";
import { Collapse, Tabs } from "antd";
import { getAllExamSchedule } from "@/api/apiExam";

async function Area() {
  const data = await getAllExamSchedule();

  const items1 = data?.data?.items;

  const KVMB = items1?.filter((item) => item?.areaId === "BAC");
  const KVMT = items1?.filter((item) => item?.areaId === "TRUNG");
  const KVMN = items1?.filter((item) => item?.areaId === "NAM");

  const itemsCollapse = (items) => {
    const result = items?.map((item) => {
      return {
        key: item?.id.toString(),
        label: item?.nameExamSchool,
        children: (
          <div className="px-[3rem]">
            <p>
              <b>Hình thức thi : </b>
              {item?.examMethod}
            </p>
            <p>
              <b>Đối tượng dự thi : </b>
              {item?.examinationObject}
            </p>
            <p>
              <b>Lệ phí dự thi : </b>
              <ul className="list-disc ml-[5%]">
                {item?.examinationFee.map((item, subIndex) => (
                  <li key={subIndex}>{item}</li>
                ))}
              </ul>
            </p>
            <p>
              <b>Ngày dự thi : </b>
              {item?.examTime}
            </p>
            <p>
              <b>Hạn đăng ký : </b>
              {item?.registrationTerm}
            </p>

            <p>
              <b>Hồ sơ đăng ký : </b>
              <ul className="list-disc ml-[5%]">
                {item?.examRegistrationRecords.map((item, subIndex) => (
                  <li key={subIndex}>{item}</li>
                ))}
              </ul>
            </p>
            <p>
              <b>Thời gian cấp chứng nhận :</b>
              {item?.certificationTime}
            </p>
          </div>
        ),
      };
    });

    return result;
  };

  return (
    <div>
      <>
        <Tabs
          defaultActiveKey="1"
          centered
          items={[
            {
              label: "Khu Vực Miền Bắc",
              key: "1",
              children: <Collapse accordion items={itemsCollapse(KVMB)} />,
            },
            {
              label: "Khu Vực Miền Trung",
              key: "2",
              children: <Collapse accordion items={itemsCollapse(KVMT)} />,
            },
            {
              label: "Khu Vực Miền Nam",
              key: "3",
              children: <Collapse accordion items={itemsCollapse(KVMN)} />,
            },
          ]}
        />
      </>
    </div>
  );
}

export default Area;
