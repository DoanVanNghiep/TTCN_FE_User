/* eslint-disable @next/next/no-img-element */
"use client";
import Cookies from "js-cookie"; // Import Cookies for user ID retrieval
import { getOrderByUserId } from "@/api/apiOrder"; // Import API for fetching orders
import { getServiceById, getClassesByCourseId } from "@/api/apiService"; // Import API for fetching services
import { PageContainer } from "@ant-design/pro-components";
import { Table, Spin, message } from "antd";
import React, { useEffect, useState } from "react";

function TableCourse() {
  const [courses, setCourses] = useState([]); // State to store course information
  const [loading, setLoading] = useState(true); // Loading state

  const fetchUserCourses = async () => {
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

      // Duyệt qua các đơn hàng và lấy thông tin khóa học, lớp học
      const courses = await Promise.all(
        paidOrders.map(async (order) => {
          try {
            const serviceManagerId = order.serviceManagerId;
            let service = null;
            let classroom = null;

            if (serviceManagerId) {
              // Gọi API để lấy thông tin chi tiết khóa học
              service = await getServiceById(serviceManagerId);

              // Gọi API để lấy thông tin lớp học theo courseId
              classroom = await getClassesByCourseId(serviceManagerId);
              // classroom = classroomData?.[0]; // Chọn lớp học đầu tiên (nếu có)
            }

            return {
              orderId: order.orderId,
              fullName: order.fullName,
              phone: order.phone,
              address: order.address,
              paymentMethod: order.paymentMethod,
              status: order.status,
              amount: parseFloat(order.amount),
              paymentDate: new Date(order.paymentDate).toLocaleString(),
              courseName: service?.data?.name || "Không có tên khóa học", // Tên khóa học
              classCode: classroom?.data?.classId || "Không có mã lớp",
              startDate: classroom?.data?.startDate || "Không có ngày bắt đầu",
              endDate: classroom?.data?.endDate || "Không có ngày kết thúc",
            };
          } catch (error) {
            console.error(
              `Lỗi khi lấy thông tin khóa học cho serviceManagerId ${order.serviceManagerId}:`,
              error.message
            );
            return null; // Nếu lỗi xảy ra, bỏ qua mục này
          }
        })
      );

      // Loại bỏ các giá trị null và cập nhật state
      setCourses(courses.filter(Boolean));
    } catch (error) {
      console.error("Lỗi khi tải danh sách khóa học:", error.message);
      message.error(
        error.message || "Đã xảy ra lỗi khi tải danh sách khóa học."
      );
    } finally {
      setLoading(false); // Đảm bảo trạng thái tải kết thúc
    }
  };

  useEffect(() => {
    fetchUserCourses();
  }, []);

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Tên khóa học",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Giá tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `${parseInt(amount).toLocaleString()} VND`,
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let displayText = status;
        let color = "grey"; // Màu mặc định

        switch (status) {
          case "PAID":
            color = "green";
            displayText = "Thành công";
            break;
          case "PENDING":
            color = "gold";
            displayText = "Đang chờ xử lý";
            break;
          case "FAILED":
            color = "red";
            displayText = "Thanh toán thất bại";
            break;
          default:
            break;
        }

        return <span style={{ color, fontWeight: "bold" }}>{displayText}</span>;
      },
    },
    {
      title: "Mã lớp",
      dataIndex: "classCode",
      key: "classCode",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <PageContainer>
      {loading ? (
        <Spin tip="Đang tải dữ liệu..." />
      ) : (
        <Table
          columns={columns}
          dataSource={courses}
          rowKey={(record) => record.id} // Đảm bảo mỗi dòng có một khóa duy nhất
          pagination={{ pageSize: 5 }} // Phân trang
        />
      )}
    </PageContainer>
  );
}

export default TableCourse;
