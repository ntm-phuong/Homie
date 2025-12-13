import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '../../../../models/User';
import { connectDB } from '@/src/lib/mongoose';
import { sendOtpEmail } from '@/src/lib/email'; 

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email has been registered" }, { status: 409 });
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

    return NextResponse.json({ message: "Successful registration! Please check your email to receive OTP." }, { status: 200 });
  } catch (error: any) {
    console.error("Error in register API:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
