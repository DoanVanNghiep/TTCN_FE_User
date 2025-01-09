"use client";

import React, { useState, useEffect } from "react";
import { getAdmissionsById, getAllAdmissions } from "@/api/apiAdmission";
import Link from "next/link";
import AdmissionItem from "../../../../component/admission/AdmissionItem";
import { Pagination, Button } from "antd"; // Sử dụng Pagination từ Ant Design

function PageDetailAdmissions({ params }) {
  const { id } = params;

  const [admissions, setAdmissions] = useState([]);
  const [currentAdmission, setCurrentAdmission] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Số lượng bài viết nhỏ mỗi trang

  useEffect(() => {
    // Fetch dữ liệu bài viết chính
    getAdmissionsById(id)
      .then((res) => {
        setCurrentAdmission(res?.data);
      })
      .catch((error) =>
        console.error("Error fetching admission detail:", error)
      );

    // Fetch danh sách bài viết nhỏ
    getAllAdmissions()
      .then((res) => {
        const admissionsList = res?.data?.items || [];
        setAdmissions(admissionsList.sort((a, b) => b.id - a.id));
      })
      .catch((error) => console.error("Error fetching admissions:", error));
  }, [id]);

  // Tính toán các bài viết nhỏ hiển thị trên trang hiện tại
  const paginatedItems = admissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!currentAdmission) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="flex flex-col items-center px-4 py-12"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Nội dung bài viết chính */}
      <div className="w-[90%] mb-8">
        <AdmissionItem params={params} />
      </div>

      {/* Danh sách bài viết nhỏ */}
      <div
        className="flex flex-wrap justify-center gap-5 w-[90%]"
        style={{
          margin: "20px auto",
          rowGap: "20px", // Khoảng cách hàng
        }}
      >
        {paginatedItems.map((item, index) => (
          <div
            key={index}
            className={`group flex flex-col items-center justify-between p-4 rounded-lg shadow-md w-[250px] h-[300px] transition-transform duration-300 ${
              index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
            } hover:scale-105 hover:shadow-lg`}
          >
            <Link href={`/admission/${item.id}`} className="w-full h-full">
              <div className="relative w-full h-2/3 overflow-hidden rounded-lg">
                <img
                  src={item?.image || "/placeholder.png"}
                  alt="Admission"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h5
                className="text-md font-semibold text-gray-600 mt-3 text-center group-hover:text-blue-500"
                style={{
                  fontSize: "16px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2, // Giới hạn 2 dòng
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item?.program}
              </h5>
            </Link>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={admissions.length}
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
          return (
            <Button
              style={{
                fontSize: "16px", // Kích thước số phân trang
                padding: "5px 10px",
                backgroundColor:
                  currentPage === page ? "#FB9400" : "transparent",
                color: currentPage === page ? "#fff" : "#333",
                border: currentPage === page ? "none" : "1px solid #ddd",
              }}
            >
              {page}
            </Button>
          );
        }}
      />
    </div>
  );
}

export default PageDetailAdmissions;
