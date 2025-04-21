import { NextResponse } from 'next/server';
import User from '@/src/models/User';
import { connectDB } from '@/src/lib/mongoose';

export async function PUT(req: Request) {
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
    const body = await req.json();
    const { name, email, phone, address } = body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    await user.save();
    return NextResponse.json({
      success: true,
      message: "Profile updated successfully", 
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
