"use client";
import React from "react";
import { Button, Card, Row, Col, Typography } from "antd";
import ButtonScroll from "../Button/ButtonScroll";
import ButtonPayment from "../Button/ButtonPayment";

function CourseDetail({ service }) {
  return (
    <div>
      <Col
        span={20}
        className=" shadow-xl rounded-[10px] overflow-hidden mx-auto"
      >
        <h2 className="uppercase text-[5rem] font-[700] py-[2rem] bg-primaryColor text-[#fff] text-center">
          {service?.name}
        </h2>
        <div className="px-[5%] py-[5%]  ">
          {/* Header */}
          <Row gutter={[16, 16]}>
            {/* Phần hình ảnh */}
            <Col xs={24} md={12}>
              <img
                src={service?.image || "aptisb1pic3.png"}
                alt={
                  service?.name ||
                  "Khóa Học Tiktok Marketing Thực Chiến Từ Con Số 0"
                }
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  height: "400px",
                  borderRadius: "10px",
                }}
              />
            </Col>

            {/* Phần thông tin khóa học */}
            <Col xs={24} md={12}>
              <div style={{ maxWidth: "100%" }}>
                <Typography.Title className="uppercase text-[5rem] font-[700] py-[2rem] bg-primaryColor text-[#fff] text-center">
                  {service?.name ||
                    "Khóa Học Tiktok Marketing Thực Chiến Từ Con Số 0"}
                </Typography.Title>
                <Typography.Text
                  style={{
                    fontSize: "7rem",
                    textDecoration: "line-through", // Gạch ngang
                    color: "#99FFFF",
                  }}
                >
                  {service?.originalPrice || "20.000.000đ"}
                </Typography.Text>
                &nbsp;&nbsp;
                <Typography.Text
                  style={{
                    fontSize: "7rem",
                    fontWeight: "bold",
                    color: "#00CCFF",
                    marginLeft: "20px",
                  }}
                >
                  {service?.price}
                </Typography.Text>
                {/* Chi tiết */}
                <div style={{ marginTop: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <Typography.Text
                      style={{
                        fontSize: "6rem", // Chỉnh kích thước chữ lớn hơn (1.5rem tương đương 24px)
                      }}
                    >
                      Số buổi:
                    </Typography.Text>
                    <Typography.Text
                      style={{
                        fontSize: "6rem", // Chỉnh kích thước chữ lớn hơn (1.5rem tương đương 24px)
                      }}
                    >
                      {service?.numberTeachingSessions || "19 Bài Giảng"}
                    </Typography.Text>
                  </div>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <Typography.Text
                      style={{
                        fontSize: "6rem", // Chỉnh kích thước chữ lớn hơn (1.5rem tương đương 24px)
                      }}
                    >
                      Bài giảng:
                    </Typography.Text>
                    <Typography.Text
                      style={{
                        fontSize: "6rem", // Chỉnh kích thước chữ lớn hơn (1.5rem tương đương 24px)
                      }}
                    >
                      {service?.typeService || "19 Bài Giảng"}
                    </Typography.Text>
                  </div>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <Typography.Text
                      style={{
                        fontSize: "6rem", // Chỉnh kích thước chữ lớn hơn (1.5rem tương đương 24px)
                      }}
                    >
                      Yêu cầu:
                    </Typography.Text>
                    <Typography.Text
                      style={{
                        fontSize: "6rem", // Chỉnh kích thước chữ lớn hơn (1.5rem tương đương 24px)
                      }}
                    >
                      {service?.studyGoals || "Không có yêu cầu"}
                    </Typography.Text>
                  </div>
                </div>
                {/* Nút
            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <Button
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#ff5733",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Nâng Cấp Gói Hội Viên Ngay
              </Button>
              <Button
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#fff",
                  color: "#333",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              >
                Nhận Voucher 50K Tại Đây
              </Button>
            </div> */}
                {/* Footer */}
                <div
                  style={{
                    marginTop: "40px",
                  }}
                >
                  {/* <ButtonScroll /> */}
                  <ButtonPayment courseID={service?.id} />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </div>
  );
}

export default CourseDetail;
