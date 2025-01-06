/* eslint-disable @next/next/no-img-element */
"use client";

import { getAllAdmissions } from "@/api/apiAdmission";
import { Button } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function AdmissionList() {
  const [admissionList, setAdmissionList] = useState([]);

  useEffect(() => {
    getAllAdmissions()
      .then((data) => {
        const dataAdmissions = data?.data?.items || [];
        const sortedAdmissions = dataAdmissions.sort((a, b) => b.id - a.id);
        setAdmissionList(sortedAdmissions);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={{ maxWidth: "100%", margin: "0 auto", padding: "20px" }}>
      {admissionList.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: index % 2 === 0 ? "row" : "row-reverse",
            alignItems: "center",
            backgroundColor: "#f3f4f6",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Hình ảnh */}
          <div style={{ flex: "1", padding: "10px" }}>
            <img
              src={item.image}
              alt={item.program}
              style={{
                width: "88%",
                height: "auto",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Thông tin */}
          <div style={{ flex: "1", padding: "10px" }}>
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
            <Link href={`admission/${item.id}`}>
              <Button
                style={{
                  backgroundColor: "#FB9400",
                  color: "#fff",
                  border: "none",
                }}
                type="primary"
              >
                Xem thêm
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdmissionList;
