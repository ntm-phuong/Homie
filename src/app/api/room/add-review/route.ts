import { NextResponse } from 'next/server';
import Review from '@/src/models/Review'; 
import { connectDB } from '@/src/lib/mongoose';

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { room_id, name, email, avatar, address, date, rating, description_review } = body;

    // Kiểm tra dữ liệu đầu vào
    if (!room_id || !name || !email || !rating || !description_review) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Tạo review mới
    const newReview = new Review({
      room_id,
      name,
      email,
      avatar,
      address,
      date,
      rating,
      description_review,
    });

    await newReview.save();

    return NextResponse.json({ success: true, message: 'Review added successfully' });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to add review' },
      { status: 500 }
    );
  }
}