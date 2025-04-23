import { NextResponse } from 'next/server';
import User from '../../../../models/User';
import { connectDB } from '@/src/lib/mongoose';
import { sendOtpEmail } from '@/src/lib/email'; 

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Users do not exist" }, { status: 404 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); 
    await user.save();

    // Gửi OTP qua email
    await sendOtpEmail(email, otp);

    return NextResponse.json({ message: "OTP has been sent back!" }, { status: 200 });
  } catch (error: any) {
    console.error("Error in resend-otp API:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}