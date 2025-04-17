"use client";

import { useEffect, useState } from "react";
import { StarFilled } from "@ant-design/icons";

const Home = () => {
  const [rooms, setRooms] = useState([]); 

  const fetchRooms = async () => {
    try {
      const response = await fetch("/api/get-list-rooms"); 
      const data = await response.json();
      if (data.success) {
        setRooms(data.data); 
      } else {
        console.error("Failed to fetch rooms:", data.message);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const _renderItemRoom = (room: any) => {
    return (
      <div
        key={room._id}
        className="flex flex-col gap-4 p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <div className="relative w-full">
          <img
            className="rounded-lg h-[200px] w-full object-cover"
            src={room.image}
            alt={room.name}
          />
          <div className="absolute top-3 right-3 flex justify-center items-center cursor-pointer transition-transform duration-300 hover:scale-110">
            <img width={30} src="/img/heart.png" alt="Favorite" />
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <div className="font-[500] text-md flex flex-row justify-between items-center">
            <div>{room.name}</div> 
            <div className="flex items-center">
              <StarFilled style={{ color: "#fadb14", marginRight: "2px" }} />
              {room.rating || "N/A"}
            </div>
          </div>
          <div className="text-gray-500 text-sm">{room.address}</div>
          <div className="text-gray-500 text-sm">{room.rentalDate}</div>
        </div>
        <div className="text-md font-medium text-black-600">
          {room.price ? `${room.price} đ` : "N/A"} / đêm
        </div>
      </div>
    );
  };

  return (
    <div className="lg:px-38 px-4 w-full flex flex-col gap-8 justify-center items-center">
      <h1 className="text-2xl font-bold">Danh sách phòng</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 pb-5">
        {rooms.length > 0 ? (
          rooms.map((room) => _renderItemRoom(room)) 
        ) : (
          <p>Đang tải danh sách phòng...</p> 
        )}
      </div>
    </div>
  );
};

export default Home;
