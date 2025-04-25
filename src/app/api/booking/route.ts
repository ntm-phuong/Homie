import { connectDB } from "@/src/lib/mongoose";
import Booking from "@/src/models/Booking";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const body = await req.json();

    const {
      user_id,
      room_id,
      room_name,
      address,
      price_per_night,
      check_in,
      check_out,
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
        { success: false, message: "Phòng đã được đặt trong khoảng thời gian này." },
        { status: 400 }
      );
    }

    // Tính số đêm và tổng giá
    const total_nights =
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);

    if (total_nights <= 0) {
      return NextResponse.json(
        { success: false, message: "Ngày trả phòng phải sau ngày nhận phòng." },
        { status: 400 }
      );
    }

    const total_price = total_nights * price_per_night;

    // Tạo booking mới
    const newBooking = await Booking.create({
      user_id,
      room_id,
      room_name,
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
        message: "Lỗi khi đặt phòng",
        error: err.message,
      },
      { status: 500 }
    );
  }
};
