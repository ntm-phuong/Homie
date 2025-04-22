"use client";
import React, { useState } from "react";
import { Table, Button, Tag, Image } from "antd";

const BookHistory = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      roomName: "Deluxe Room",
      date: "2025-04-20",
      status: "Completed",
      price: "$120",
      location: "Hanoi, Vietnam",
      image: "/img/deluxe-room.jpg",
    },
    {
      id: 2,
      roomName: "Standard Room",
      date: "2025-04-15",
      status: "Cancelled",
      price: "$80",
      location: "Ho Chi Minh City, Vietnam",
      image: "/img/standard-room.jpg",
    },
    {
      id: 3,
      roomName: "Suite Room",
      date: "2025-04-21",
      status: "Just Booked",
      price: "$200",
      location: "Da Nang, Vietnam",
      image: "/img/suite-room.jpg",
    },
  ]);

  
  const handleViewDetails = (id: number) => {
    alert(`Viewing details for booking ID: ${id}`);
  };

  const columns = [
    {
      title: "Room",
      dataIndex: "roomName",
      key: "roomName",
      render: (text: string, record: any) => (
        <div className="flex items-center gap-3">
          <Image
            src={record.image}
            alt={record.roomName}
            width={50}
            height={50}
            className="rounded-md object-cover"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
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
          case "Cancelled":
            color = "red";
            break;
          case "Just Booked":
            color = "blue";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <button className="" 
            onClick={() => handleViewDetails(record.id)}
          >
            View
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full px-4 lg:px-38 py-5">
      <h1 className="text-3xl font-bold text-center mb-6">Booking History</h1>
      <Table
        dataSource={bookings}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default BookHistory;
