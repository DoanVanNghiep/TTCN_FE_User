"use client";

import React, { useEffect, useState } from "react";
import { Table, Typography, Card, Spin, message } from "antd";
import { useSearchParams } from "next/navigation";
import { getOrderById } from "@/api/apiOrder"; // Đảm bảo import API đúng
import { getServiceById } from "@/api/apiService";

const { Title, Text } = Typography;

const SuccessPaymentPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Khách hàng";
  const id = searchParams.get("orderId"); // Lấy mã đơn hàng từ URL

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy thông tin đơn hàng từ API
  useEffect(() => {
    if (id) {
      fetchOrderDetails(id);
    } else {
      message.error("Không tìm thấy mã đơn hàng.");
    }
  }, [id]);

  const fetchOrderDetails = async (id) => {
    setLoading(true);

    try {
      // Gọi API để lấy thông tin đơn hàng
      const orderResponse = await getOrderById(id);
      const orderData = orderResponse?.data;

      if (!orderData) {
        throw new Error("Không tìm thấy thông tin đơn hàng.");
      }

      const serviceManagerId = orderData.serviceManagerId;
      let service = null;

      // Gọi API để lấy thông tin chi tiết khóa học nếu có serviceManagerId
      if (serviceManagerId) {
        const serviceResponse = await getServiceById(serviceManagerId);
        service = serviceResponse?.data;
      }

      // Chuẩn bị dữ liệu để hiển thị
      const formattedOrderDetails = {
        customerName: orderData.fullName || "Không có tên khách hàng",
        status: orderData.status || "Không rõ trạng thái",
        orderIdData: orderData.orderId,
        courses: [
          {
            key: "1",
            title: service?.name || "Không có thông tin khóa học",
            unitPrice: parseFloat(orderData.amount) || 0,
            totalPrice: parseFloat(orderData.amount) || 0,
          },
        ],
        totalAmount: parseFloat(orderData.amount) || 0,
      };

      setOrderDetails(formattedOrderDetails);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin đơn hàng:", error.message);
      message.error(error.message || "Không thể tải thông tin đơn hàng.");
    } finally {
      setLoading(false); // Đảm bảo trạng thái tải kết thúc
    }
  };

  const columns = [
    {
      title: "Tên khóa học",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Đơn giá",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (text) => `${text.toLocaleString()} đ`,
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => `${text.toLocaleString()} đ`,
    },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <br />
      <br />
      <Card>
        <Title level={3} style={{ textAlign: "center", marginBottom: "10px" }}>
          Kết Quả Giao Dịch
        </Title>
        {loading ? (
          <Spin
            size="large"
            style={{ display: "block", margin: "20px auto" }}
          />
        ) : orderDetails ? (
          <>
            <Text
              style={{
                display: "block",
                textAlign: "center",
                color: orderDetails?.status === "PENDING" ? "orange" : "green",
                marginBottom: "20px",
              }}
            >
              {orderDetails?.status === "PENDING"
                ? "Đặt hàng thành công"
                : orderDetails?.status === "PAID"
                ? "Thanh toán thành công"
                : "Không rõ trạng thái"}
            </Text>

            <Text
              style={{
                display: "block",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Cảm ơn quý khách hàng <b>{orderDetails.customerName}</b> đã đặt
              hàng tại Edustar!
            </Text>
            <Text
              style={{
                display: "block",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Đơn hàng <b>{orderDetails.orderIdData}</b> của bạn đã được tạo
              thành công!
            </Text>

            <Table
              columns={columns}
              dataSource={orderDetails.courses}
              pagination={false}
              bordered
              summary={() => (
                <Table.Summary.Row>
                  <Table.Summary.Cell
                    colSpan={2}
                    style={{ textAlign: "right" }}
                  >
                    <Text strong style={{ color: "red" }}>
                      Tổng cộng:
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <Text strong style={{ color: "red" }}>
                      {orderDetails.totalAmount.toLocaleString()} đ
                    </Text>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              )}
            />
          </>
        ) : (
          <Text style={{ textAlign: "center", display: "block", color: "red" }}>
            Không có dữ liệu đơn hàng để hiển thị.
          </Text>
        )}
      </Card>
    </div>
  );
};

export default SuccessPaymentPage;
