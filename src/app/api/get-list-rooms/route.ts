import { NextResponse } from 'next/server';
import Room from '@/src/models/Room';
import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI || '');
  }
};

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('search_room') || '';
    const filter = keyword
      ? {
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { address: { $regex: keyword, $options: 'i' } },
        ],
      }
      : {};
    const rooms = await Room.find(filter);
    return NextResponse.json({ success: true, data: rooms });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch rooms' },
      { status: 500 }
    );
  }
}
