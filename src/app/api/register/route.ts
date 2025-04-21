import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import { connectDB } from '@/src/lib/mongoose';
import { sendOtpEmail } from '@/src/lib/email'; // Import sendOtpEmail

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email và mật khẩu là bắt buộc" }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email đã được đăng ký" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = new User({
      email,
      password: hashedPassword,
      otp,
      otpExpiresAt,
      isVerified: false,
    });
    await newUser.save();

    // Gửi OTP qua email
    await sendOtpEmail(email, otp);

    return NextResponse.json({ message: "Đăng ký thành công! Vui lòng kiểm tra email để nhận OTP." }, { status: 200 });
  } catch (error: any) {
    console.error("Error in register API:", error);
    return NextResponse.json({ message: "Lỗi máy chủ" }, { status: 500 });
  }
}
