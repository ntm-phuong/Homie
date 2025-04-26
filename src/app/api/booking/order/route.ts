import { connectDB } from "@/src/lib/mongoose";
import Booking from "@/src/models/Booking";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const body = await req.json();

    const {
      email,
      room_id,
      room_name,
      room_image,
      address,
      price_per_night,
      check_in,
      check_out,
      total_nights,
      total_price
    } = body;

    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);

    // Kiểm tra trùng lịch với trạng thái "confirmed"
    const isOverlapping = await Booking.findOne({
      room_id,
      status: "confirmed", // Chỉ kiểm tra với các booking đã xác nhận
      check_in: { $lt: checkOutDate },
      check_out: { $gt: checkInDate },
    });

    if (isOverlapping) {
      return NextResponse.json(
        { success: false, message: "The room has been placed during this time." },
        { status: 400 }
      );
    }
    const newBooking = await Booking.create({
      email,
      room_id,
      room_name,
      room_image,
      address,
      price_per_night,
      check_in: checkInDate,
      check_out: checkOutDate,
      total_nights,
      total_price,
      status: "confirmed",
    });
    return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error when booking!",
        error: err.message,
      },
      { status: 500 }
    );
  }
};
