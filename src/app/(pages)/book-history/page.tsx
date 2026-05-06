"use client";
import React, { useEffect, useState } from "react";
import { Table, Tag, Image } from "antd";
import axios from "axios";
import { formatCurrency } from "@/src/utils";

const BookHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const email = localStorage.getItem("email");
      if (!email) {
        console.error("Email not found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/booking/history?email=${email}`);
        const data = response.data;

        if (data.success) {
          setBookings(data.data);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const columns = [
    {
      title: "Room",
      dataIndex: "room_name",
      key: "room_name",
      render: (text: string, record: any) => (
        <div className="flex items-center gap-3">
          <Image
            src={record.room_image}
            alt={record.room_name}
            width={50}
            height={50}
            className="rounded-md object-cover"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Check-in",
      dataIndex: "check_in",
      key: "check_in",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Check-out",
      dataIndex: "check_out",
      key: "check_out",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Location",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Price",
      dataIndex: "total_price",
      key: "total_price",
      render: (price: number) => formatCurrency(price),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "";
        switch (status) {
          case "Completed":
            color = "green";
            break;
          // case "Cancelled":
          //   color = "red";
          //   break;
          case "Just Booked":
            color = "blue";
            break;
          default:
            color = "red";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    // Sửa lg:px-38 thành lg:px-40 (chuẩn Tailwind), thêm max-w để màn hình to không bị bè ra quá
    <div className="w-full px-4 md:px-10 lg:px-40 py-8 max-w-[1600px] mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 py-5 text-gray-800">
        Booking History
      </h1>
      
      {/* Bao bọc Table bằng một div có shadow cho giao diện hiện đại hơn */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table
          dataSource={bookings} 
          columns={columns}
          rowKey="_id" 
          pagination={{ pageSize: 5 }}
          bordered
          loading={loading} 
          // 💡 ĐÂY LÀ DÒNG CHÌA KHÓA ĐỂ RESPONSIVE BẢNG:
          // Bắt buộc bảng phải rộng đủ nội dung, nếu màn hình nhỏ hơn nội dung thì sinh ra thanh cuộn ngang
          scroll={{ x: 'max-content' }} 
        />
      </div>
    </div>
  );
};

export default BookHistory;
