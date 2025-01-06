/* eslint-disable @next/next/no-img-element */
"use client";

import { getAllAdmissions } from "@/api/apiAdmission";
import { Button } from "antd";
import React, { useEffect, useState } from "react";

function AdmissionList() {
  const [admissionList, setAdmissionList] = useState([]);
  const [highlightedAdmission, setHighlightedAdmission] = useState(null);

  useEffect(() => {
    getAllAdmissions()
      .then((data) => {
        const dataAdmissions = data?.data?.items || [];
        const sortedAdmissions = dataAdmissions.sort((a, b) => b.id - a.id);

        const highlighted = sortedAdmissions.find((item) => item.id === 1);
        setHighlightedAdmission(highlighted);

        const remainingAdmissions = sortedAdmissions.filter(
          (item) => item.id !== 1
        );
        setAdmissionList(remainingAdmissions);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const navigateTo = (url) => {
    window.location.href = url;
  };

  return (
    <div style={{ margin: "20px 0" }}>
      {/* Khối Đào tạo Anh ngữ */}
       <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          backgroundColor: "#f3f4f6",
          padding: "20px",
          borderRadius: "8px",
          margin: "20px 0", // Khoảng cách đều giữa các khối
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Ảnh chiếm 40% */}
         <div
          style={{
            flex: "4",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/thoihan_b2vsstep.png"
            alt="Đào tạo Anh ngữ"
            style={{
              width: "100%",
              height: "100%",
              maxHeight: "300px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        </div> 

        {/* Nội dung chiếm 60% */}
         <div style={{ flex: "6", lineHeight: "1.6", padding: "10px" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "red",
              marginBottom: "20px",
              textDecoration: "underline",
            }}
          >
            Đào tạo Anh Ngữ và TIN Học
          </h2>
          <ul style={{ paddingLeft: "20px" }}>
            <li>
              <strong style={{ color: "#FB9400" }}>Chương trình Anh Ngữ</strong>
              <ul style={{ paddingLeft: "20px" }}>
                <li>
                  <strong>Hình thức:</strong> Đào tạo tập trung theo học chế : Văn bằng 2 ngoại ngữ cho bậc sau đại học và tín chỉ ngoại ngữ cho người đi làm .
                </li>
                <li>
                  <strong>Chương trình đào tạo:</strong> Phù hợp với các ngành
                  nghề học, làm việc.
                </li>
              </ul>
            </li>
            <li>
              <strong style={{ color: "#FB9400" }}>Chương trình Tin Học</strong>
              <ul style={{ paddingLeft: "20px" }}>
                <strong>Hình thức:</strong> Đào tạo tập trung theo phương pháp
                học mới và thể chế tín chỉ chương trình học.
                <li>
                  <strong>Thời gian đào tạo:</strong> từ 8 tháng đến 1 năm theo
                  chương trình đào tạo.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div> 

      {/** Hiển thị Đào tạo chương trình tin học */}
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          backgroundColor: "#f3f4f6",
          padding: "20px",
          borderRadius: "8px",
          margin: "20px 0", // Khoảng cách đều giữa các khối
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      > */}
        {/* Ảnh chiếm 40% */}
        {/* <div
          style={{
            flex: "4",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/vb1.png"
            alt="Đào tạo Tin Học"
            style={{
              width: "100%",
              height: "100%",
              maxHeight: "300px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        </div> */}

        {/* Nội dung chiếm 60% */}
        {/* <div style={{ flex: "6", lineHeight: "1.6", padding: "10px" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "red",
              marginBottom: "20px",
              textDecoration: "underline",
            }}
          >
            Đào tạo Tin Học
          </h2>
          <ul style={{ paddingLeft: "20px" }}>
            <li>
              <strong style={{ color: "#FB9400" }}>
                Tin Học cơ bản và nâng cao
              </strong>
              <ul style={{ paddingLeft: "20px" }}>
                <li>
                  <strong>Hình thức:</strong> Đào tạo tập trung theo học chế tín
                  chỉ.
                </li>
                <li>
                  <strong>Chương trình đào tạo:</strong> Phù hợp với các ngành
                  nghề học.
                </li>
              </ul>
            </li>
            <li>
              <strong style={{ color: "#FB9400" }}>Tin học quốc tế ITCE</strong>
              <ul style={{ paddingLeft: "20px" }}>
                <strong>Hình thức:</strong> Đào tạo tập trung theo phương pháp
                học mới và thể chế tín chỉ chương trình học.
                <li>
                  <strong>Thời gian đào tạo:</strong> từ 8 tháng đến 1 năm theo
                  chương trình đào tạo.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div> */}

      {/* Hiển thị danh sách từ API */}
      {admissionList.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: index % 2 === 0 ? "row-reverse" : "row", // Đảo chiều so le
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: index % 2 === 0 ? "#ffffff" : "#f3f4f6",
            padding: "20px",
            borderRadius: "8px",
            margin: "20px 0", // Khoảng cách đều giữa các khối
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Hình ảnh */}
          <div
            style={{
              flex: "4",
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={item.image}
              alt={item.program}
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "300px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Thông tin */}
          <div style={{ flex: "6", padding: "10px", lineHeight: "1.6" }}>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#FB9400",
                marginBottom: "10px",
              }}
            >
              {item.program}
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#333",
                marginBottom: "20px",
              }}
            >
              {item.description}
            </p>
            <Button
              type="primary"
              style={{
                backgroundColor: "#FB9400",
                color: "#fff",
                border: "none",
              }}
              onClick={() => navigateTo(`admission/${item.id}`)}
            >
              Xem thêm
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdmissionList;
