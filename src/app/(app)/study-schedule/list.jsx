"use client";

import { List } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import { AppContext } from "@/component/AppContext/AppContext";
import React, { useContext } from "react";

function ScheduleList({ items }) {
  const { data, dispatch } = useContext(AppContext);

  const showStudyScheduleDetailModal = (item) => {
    dispatch({ type: "getStudyScheduleDetail", payload: item });
    dispatch({ type: "modalStudyScheduleOpen" });
  };

  return (
    <>
      <List
        bordered
        dataSource={items}
        renderItem={(item) => (
          <List.Item className="flex items-baseline hover:text-white hover:bg-[#fb9400] hover:underline-offset-2 hover:underline ">
            <div
              className="cursor-pointer"
              onClick={() => showStudyScheduleDetailModal(item)}
            >
              {item.name}
            </div>
            <FileSearchOutlined
              className=" cursor-pointer"
              onClick={() => showStudyScheduleDetailModal(item)}
            />
          </List.Item>
        )}
      />
    </>
  );
}

export default ScheduleList;
