/* eslint-disable @next/next/no-img-element */
"use client";
import Cookies from "js-cookie"; // Import Cookies for user ID retrieval
import { getOrderByUserId } from "@/api/apiOrder"; // Import API for fetching orders
import { getDocumentByCourseId } from "@/api/apiDocument";
import { getServiceById } from "@/api/apiService";
import { List, Image, Button, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";

function MyDocs() {
  const [documents, setDocuments] = useState([]); // State to store document information
  const [loading, setLoading] = useState(true); // Loading state
  const [expandedItems, setExpandedItems] = useState({}); // Track expanded items

  const fetchUserDocuments = async () => {
    setLoading(true);

    try {
      // Lấy userId từ Cookies
      const userId = Cookies.get("id");
      if (!userId) {
        throw new Error("Không tìm thấy userId trong Cookies.");
      }

      // Gọi API để lấy danh sách đơn hàng
      const orders = await getOrderByUserId(userId);
      if (!Array.isArray(orders) || orders.length === 0) {
        throw new Error("Không tìm thấy đơn hàng nào.");
      }

      // Lọc các đơn hàng đã thanh toán
      const paidOrders = orders.filter((order) => order.status === "PAID");
      if (paidOrders.length === 0) {
        throw new Error("Không tìm thấy đơn hàng đã thanh toán.");
      }

      // Duyệt qua các đơn hàng và lấy thông tin tài liệu
      const documents = await Promise.all(
        paidOrders.map(async (order) => {
          try {
            const serviceManagerId = order.serviceManagerId;
            let document = null;
            let service = null;

            if (serviceManagerId) {
              document = await getDocumentByCourseId(serviceManagerId);

              service = await getServiceById(serviceManagerId);
            }

            return {
              id: serviceManagerId,
              name: service?.data?.name || "Không có tên tài liệu",
              content:
                document?.data?.items?.[0]?.content ||
                "Không có nội dung tài liệu",
              file: document?.data?.items?.[0]?.file || "Không có tài liệu",
              image: "/anhnguhocthuat_8.png", // Dùng ảnh mặc định
            };
          } catch (error) {
            console.error(
              `Lỗi khi lấy thông tin tài liệu cho serviceManagerId ${order.serviceManagerId}:`,
              error.message
            );
            return null; // Nếu lỗi xảy ra, bỏ qua mục này
          }
        })
      );

      // Loại bỏ các giá trị null và cập nhật state
      setDocuments(documents.filter(Boolean));
    } catch (error) {
      console.error("Lỗi khi tải danh sách tài liệu:", error.message);
      message.error(
        error.message || "Đã xảy ra lỗi khi tải danh sách tài liệu."
      );
    } finally {
      setLoading(false); // Đảm bảo trạng thái tải kết thúc
    }
  };

  const toggleExpand = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  useEffect(() => {
    fetchUserDocuments();
  }, []);

  return (
    <div>
      {loading ? (
        <Spin tip="Đang tải dữ liệu..." />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={documents}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={
                  <Image
                    src={item.image} // Hiển thị ảnh tài liệu
                    alt="pic"
                    height={50}
                    width={50}
                  />
                }
                title={<h3>{item.name}</h3>}
                description={
                  expandedItems[item.id]
                    ? item.content
                    : `${item.content.slice(0, 40)}...` // Rút gọn nội dung
                }
              />
              {/* Nút Xem thêm/Rút gọn nếu nội dung dài hơn 40 ký tự */}
              {item.content.length > 40 && (
                <Button onClick={() => toggleExpand(item.id)}>
                  {expandedItems[item.id] ? "Rút gọn" : "Xem thêm"}
                </Button>
              )}
              {/* Nút Download */}
              <Button
                href={item.file}
                className="custom-btn ml-[5%] flex items-center"
                target="_blank"
                rel="noopener noreferrer"
                icon={<DownloadOutlined />}
              >
                Download
              </Button>
            </List.Item>
          )}
        />
      )}
    </div>
  );
}

export default MyDocs;
