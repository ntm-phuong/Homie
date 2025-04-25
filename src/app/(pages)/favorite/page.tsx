"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HeartFilled, StarFilled } from "@ant-design/icons";
import { toast } from "react-toastify";

const Favorite = () => {
  const [favoriteRooms, setFavoriteRooms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchFavoriteRooms();
  }, []);

  const fetchFavoriteRooms = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to login first.");
        return;
      }

      const res = await fetch("/api/user/favorite-rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setFavoriteRooms(data.data || []);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };

  const toggleLike = async (roomId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("You need to login first.");

      const res = await fetch(`/api/room/${roomId}/unlike`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchFavoriteRooms();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const truncateName = (name: string, wordLimit: number) => {
    const words = name.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + " ..."
      : name;
  };

  const _renderRoomItem = (room: any) => (
    <div
      key={room._id}
      className="flex flex-col gap-1 md:w-[19vw] w-full cursor-pointer"
      onClick={() => router.push(`/detail-room/${room._id}`)}
    >
      <div className="relative w-full">
        <img
          className="rounded-xl md:h-[18vw] w-full object-cover"
          src={room.image}
          alt={room.name}
        />
        <div className="absolute top-3 right-4 cursor-pointer">
          <HeartFilled
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(room._id);
            }}
            style={{
              color: "#e11d48",
              fontSize: "23px",
              stroke: "white",
              strokeWidth: 45,
            }}
            className="hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>
      <div className="font-[500] text-md flex flex-row justify-between items-center">
        <span>{truncateName(room.name || "Tên phòng", 4)}</span>
        <div className="flex items-center">
          <StarFilled style={{ color: "#fadb14", marginRight: "2px" }} />
          {room.rating || "N/A"}
        </div>
      </div>

      <p className="text-gray-500 text-sm">{room.address || ""}</p>
      <p className="text-gray-500 text-sm">
        {room.rentalDate || "Không có ngày thuê"}
      </p>
      <div className="text-md font-medium text-black-600">
        <span className="font-[500]">{room.price || "N/A"} đ</span> / đêm
      </div>
    </div>
  );

  return (
    <div className="lg:px-38 px-4 w-full flex flex-col gap-8 py-6">
      <h1 className="text-2xl font-semibold">Favorite Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-8">
        {favoriteRooms.length > 0 ? (
          favoriteRooms.map((room) => _renderRoomItem(room))
        ) : (
          <p>No data founded.</p>
        )}
      </div>
    </div>
  );
};

export default Favorite;
