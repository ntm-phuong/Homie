import { NextResponse } from 'next/server';
import User from '../../../../models/User';
import { connectDB } from '@/src/lib/mongoose';

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ message: "Email và OTP là bắt buộc" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Email không tồn tại" }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json({ message: "Tài khoản đã được xác thực" }, { status: 200 });
    }

    if (user.otp !== otp) {
      return NextResponse.json({ message: "OTP không chính xác" }, { status: 400 });
    }

    if (user.otpExpiresAt < new Date()) {
      return NextResponse.json({ message: "OTP đã hết hạn" }, { status: 400 });
    }

    user.isVerified = true;
    await user.save();

    return NextResponse.json({ message: "Xác thực tài khoản thành công" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Lỗi máy chủ" }, { status: 500 });
  }
}
