"use client";
import React, { useState } from "react";

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

  const handleCancelBooking = (id: number) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: "Cancelled" } : booking
    );
    setBookings(updatedBookings);
    alert("Booking has been cancelled.");
  };

  const handleViewDetails = (id: number) => {
    alert(`Viewing details for booking ID: ${id}`);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-600 font-semibold";
      case "Cancelled":
        return "text-red-500 font-semibold";
      case "Just Booked":
        return "text-blue-500 font-semibold";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="w-full px-4 md:px-5 py-5">
      <h1 className="text-3xl font-bold text-center mb-6">Booking History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm font-semibold text-gray-700">
              <th className="p-4 w-1/5">Room</th>
              <th className="p-4 w-1/6">Date</th>
              <th className="p-4 w-1/4">Location</th>
              <th className="p-4 w-1/6">Price</th>
              <th className="p-4 w-1/6">Status</th>
              <th className="p-4 w-1/6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={booking.image}
                    alt={booking.roomName}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <span>{booking.roomName}</span>
                </td>
                <td className="p-4">{booking.date}</td>
                <td className="p-4">{booking.location}</td>
                <td className="p-4">{booking.price}</td>
                <td className="p-4">
                  <span className={getStatusStyle(booking.status)}>
                    {booking.status}
                  </span>
                </td>
                <td className="p-4 text-center space-x-2">
                  {booking.status === "Just Booked" && (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={() => handleViewDetails(booking.id)}
                    className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-400">
                  No booking history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookHistory;
