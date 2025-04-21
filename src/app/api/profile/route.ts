import { NextResponse } from 'next/server';
import User from '@/src/models/User'; // hoặc Token model riêng nếu bạn có
import { connectDB } from '@/src/lib/mongoose';


export async function GET(req: Request) {
  try {
    await connectDB();
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }
    const token = authHeader.replace("Bearer ", "");
    const user = await User.findOne({ token });
    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    return NextResponse.json({
      success: true,
      user: {
        email: user.email,
        password: user.password,
        name: user.name,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
