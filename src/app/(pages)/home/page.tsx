"use client";

import { useEffect, useState } from "react";
import { StarFilled } from "@ant-design/icons";

const Home = () => {
  const [rooms, setRooms] = useState([]); // State để lưu danh sách phòng

  // Hàm gọi API để lấy danh sách phòng
  const fetchRooms = async () => {
    try {
      const response = await fetch("/api/get-list-rooms"); // Gọi API
      const data = await response.json();
      if (data.success) {
        setRooms(data.data); // Lưu danh sách phòng vào state
      } else {
        console.error("Failed to fetch rooms:", data.message);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  // Gọi hàm fetchRooms khi component được render lần đầu
  useEffect(() => {
    fetchRooms();
  }, []);

  // Hàm render từng phòng
  const _renderItemRoom = (room: any) => {
    return (
      <div key={room._id} className="flex flex-col gap-1 md:w-[19vw] w-full">
        <div className="relative w-full">
          <img
            className="rounded-xl md:h-[18vw] w-full object-cover"
            src={room.image || "/default-room.jpg"} // Hiển thị ảnh phòng, dùng ảnh mặc định nếu không có
            alt={room.name}
          />
          <div className="absolute top-3 right-4 flex justify-center items-center cursor-pointer transition-transform duration-300 hover:scale-110">
            <img width={35} src="/heart-icon.png" alt="Favorite" />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-[500] text-md flex flex-row justify-between items-center">
            <span>{room.name || "Tên phòng"}</span> {/* Hiển thị tên phòng */}
            <span>
              <StarFilled style={{ color: "#fadb14", marginRight: "2px" }} />
              {room.rating || "N/A"} {/* Hiển thị rating */}
            </span>
          </p>
          <p className="text-gray-500 text-sm">{room.address || "Địa chỉ không xác định"}</p>
          <p className="text-gray-500 text-sm">{room.rentalDate || "Không có ngày thuê"}</p>
        </div>
        <div className="text-md">
          <span className="font-[500]">{room.price || "N/A"} đ</span> / đêm
        </div>
      </div>
    );
  };

  return (
    <div className="lg:px-38 px-4 w-full flex flex-col gap-8 justify-center items-center">
      <h1 className="text-2xl font-bold">Danh sách phòng</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-8">
        {rooms.length > 0 ? (
          rooms.map((room) => _renderItemRoom(room)) // Render danh sách phòng
        ) : (
          <p>Đang tải danh sách phòng...</p> // Hiển thị khi đang tải
        )}
      </div>
    </div>
  );
};

export default Home;
