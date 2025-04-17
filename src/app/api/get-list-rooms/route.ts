import { NextResponse } from 'next/server';
import Room from '@/src/models/Room';
import mongoose from 'mongoose';

// Kết nối đến MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI || '');
  }
};

// API handler để lấy danh sách rooms
export async function GET() {
  try {
    // Kết nối đến MongoDB
    await connectDB();

    // Lấy danh sách rooms từ MongoDB
    const rooms = await Room.find();

    // Trả về danh sách rooms dưới dạng JSON
    return NextResponse.json({ success: true, data: rooms });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch rooms' }, { status: 500 });
  }
}