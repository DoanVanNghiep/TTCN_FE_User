"use client";

import { Modal, Form, Button, Input } from "antd";
import { AppContext } from "@/component/AppContext/AppContext";
import React, { useContext } from "react";

const StudyScheduleDetailModal = () => {
  const { data, dispatch } = useContext(AppContext);
  const { modalStudyScheduleOpen, studyScheduleDetail } = data;
  const onFinish = async (data) => {
    dispatch({ type: "modalStudyScheduleClose" });
    dispatch({ type: "modalRegisterAccOpen" });
  };
  const item = studyScheduleDetail;
  const handleCancel = () => {
    dispatch({ type: "modalStudyScheduleClose" });
  };
  return (
    <>
      <Modal
        open={modalStudyScheduleOpen}
        onCancel={handleCancel}
        className="max-h-[60%] tablet:w-[60%] phone:w-[80%]  "
        footer={[]}
      >
        <h2 className="title">{item.name}</h2>
        <div>
          <div className="flex mx-[5%] my-[10px] gap-[5px] items-baseline ">
            <h3>Số buổi học:</h3> <p>{item.numberTeachingSessions}</p>
          </div>
          <div className="flex mx-[5%] my-[10px] gap-[5px] items-baseline ">
            <h3>Hình thức học:</h3> <p>{item.learningForm}</p>
          </div>
          <div className="flex mx-[5%] my-[10px] gap-[5px] items-baseline">
            <h3>Lịch học:</h3> <p>{item.schedule}</p>
          </div>
          <div className="flex mx-[5%] my-[10px] gap-[5px] items-baseline ">
            <h3>Chi phí:</h3> <p>{item.price}</p>
          </div>
          <div className="flex mx-[5%] my-[10px] gap-[5px] items-baseline">
            <h3>Mô tả:</h3>
            <ul className="list-disc ml-[5%]">
              {item.detailDescription?.map((item, subIndex) => (
                <li key={subIndex}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <Form
          // name="normal_login"
          className="my-[5%]"
          initialValues={{
            remember: true,
          }}
          //   layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item className="flex justify-center ">
            <Button
              type="primary"
              htmlType="submit"
              className="rounded-[50px] custom-btn bg-[#FB9400]"
            >
              Đăng ký tư vấn
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default StudyScheduleDetailModal;
