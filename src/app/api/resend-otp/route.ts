import { NextResponse } from 'next/server';
import User from '../../../models/User';
import { connectDB } from '@/src/lib/mongoose';
import { sendOtpEmail } from '@/src/lib/email'; // Import sendOtpEmail

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email là bắt buộc" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Người dùng không tồn tại" }, { status: 404 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP có hiệu lực trong 10 phút
    await user.save();

    // Gửi OTP qua email
    await sendOtpEmail(email, otp);

    return NextResponse.json({ message: "OTP đã được gửi lại!" }, { status: 200 });
  } catch (error: any) {
    console.error("Error in resend-otp API:", error);
    return NextResponse.json({ message: "Lỗi máy chủ" }, { status: 500 });
  }
}