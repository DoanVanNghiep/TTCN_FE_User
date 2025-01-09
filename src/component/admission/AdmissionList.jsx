/* eslint-disable @next/next/no-img-element */
"use client";

import { getAllAdmissions } from "@/api/apiAdmission";
import { Button, Pagination } from "antd";
import React, { useEffect, useState } from "react";

function AdmissionList() {
  const [admissionList, setAdmissionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số lượng mục trên mỗi trang

  useEffect(() => {
    getAllAdmissions()
      .then((data) => {
        const dataAdmissions = data?.data?.items || [];
        setAdmissionList(dataAdmissions);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Phân trang: tính toán mục hiển thị dựa trên trang hiện tại
  const paginatedItems = admissionList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const navigateTo = (url) => {
    window.location.href = url;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      {/* Khối Đào tạo Anh Ngữ và Tin Học */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch", // Đảm bảo chiều cao bằng nhau
          gap: "20px",
          backgroundColor: "#f3f4f6",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Khối ảnh */}
        <div
          style={{
            flex: "1 1 40%", // Khối ảnh chiếm 40% chiều rộng
            maxWidth: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/thoihan_b2vsstep.png"
            alt="Đào tạo Anh Ngữ và Tin Học"
            style={{
              width: "100%",
              height: "100%",
              maxHeight: "300px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Khối nội dung */}
        <div
          style={{
            flex: "1 1 60%", // Khối nội dung chiếm 60% chiều rộng
            maxWidth: "60%",
            lineHeight: "1.6",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Căn giữa nội dung theo chiều dọc
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "red",
              marginBottom: "20px",
              textAlign: "left",
            }}
          >
            Đào tạo Anh Ngữ và TIN Học
          </h2>
          <ul style={{ paddingLeft: "20px", textAlign: "left" }}>
            <li>
              <strong style={{ color: "#FB9400" }}>Chương trình Anh Ngữ</strong>
              <ul style={{ paddingLeft: "20px" }}>
                <li>
                  <strong>Hình thức:</strong> Đào tạo tập trung theo học chế:
                  Văn bằng 2 ngoại ngữ cho bậc sau đại học và tín chỉ ngoại ngữ
                  cho người đi làm.
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
                <li>
                  <strong>Hình thức:</strong> Đào tạo tập trung theo phương pháp
                  học mới và thể chế tín chỉ chương trình học.
                </li>
                <li>
                  <strong>Thời gian đào tạo:</strong> từ 8 tháng đến 1 năm theo
                  chương trình đào tạo.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* Danh sách từ API */}
      {paginatedItems.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: index % 2 === 0 ? "row-reverse" : "row", // So le các khối
            alignItems: "stretch", // Đảm bảo chiều cao bằng nhau
            gap: "20px",
            backgroundColor: index % 2 === 0 ? "#ffffff" : "#f3f4f6",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Khối ảnh */}
          <div
            style={{
              flex: "1 1 40%",
              maxWidth: "40%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={item.image || "/default-image.png"} // Sử dụng ảnh mặc định nếu không có
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

          {/* Khối nội dung */}
          <div
            style={{
              flex: "1 1 60%",
              maxWidth: "60%",
              lineHeight: "1.6",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between", // Căn đều nội dung theo chiều dọc
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#FB9400",
                  marginBottom: "10px",
                  textTransform: "capitalize",
                }}
              >
                {item.program}
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#333",
                  marginBottom: "20px",
                  overflow: "hidden", // Giới hạn nội dung
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3, // Hiển thị tối đa 3 dòng
                  WebkitBoxOrient: "vertical",
                }}
              >
                {item.description}
              </p>
            </div>
            <Button
              type="primary"
              style={{
                backgroundColor: "#FB9400",
                color: "#fff",
                border: "none",
                alignSelf: "flex-start",
              }}
              onClick={() => navigateTo(`admission/${item.id}`)}
            >
              Xem thêm
            </Button>
          </div>
        </div>
      ))}

      {/* Phân trang */}
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={admissionList.length}
        onChange={handlePageChange}
        style={{ textAlign: "center", marginTop: "20px" }}
        showSizeChanger={false} // Ẩn tùy chọn thay đổi số lượng mục mỗi trang
        itemRender={(page, type, originalElement) => {
          if (type === "prev") {
            return <Button>{"<<"}</Button>;
          }
          if (type === "next") {
            return <Button>{">>"}</Button>;
          }
          return originalElement;
        }}
      />
    </div>
  );
}

export default AdmissionList;
