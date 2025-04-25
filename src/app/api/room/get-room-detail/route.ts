import { NextResponse } from 'next/server';
import Room from '@/src/models/Room';
import Booking from '@/src/models/Booking';
import { connectDB } from '@/src/lib/mongoose';

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get('room_id');

    if (!roomId) {
      return NextResponse.json(
        { success: false, message: 'Room ID is required' },
        { status: 400 }
      );
    }

    const room = await Room.findOne({ room_id: roomId }).select(
      'room_id name image address price rating description_room bed_rooms bath_room occupancy_limit status amenities'
    );

    if (!room) {
      return NextResponse.json(
        { success: false, message: 'Room not found' },
        { status: 404 }
      );
    }

    // Lấy danh sách các khoảng thời gian đã đặt
    const bookings = await Booking.find({
      room_id: roomId,
      status: 'confirmed',
    }).select('check_in check_out');

    return NextResponse.json({
      success: true,
      data: room,
      bookings, // Trả về danh sách các ngày đã đặt
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch room details' },
      { status: 500 }
    );
  }
}