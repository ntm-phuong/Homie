import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../../../models/User';
import nodemailer from 'nodemailer';

const connectMongo = async () => {
  if (mongoose.connection.readyState) return;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not defined");
  await mongoose.connect(uri);
};

const sendOtpEmail = async (email: string, otp: string) => {
  console.log(email, 'chinh686868')
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: '"HOMIE - Xác thực tài khoản',
    to: email,
    subject: 'Mã OTP xác thực tài khoản của bạn',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Chào bạn,</h2>
        <p>Bạn vừa đăng ký tài khoản tại <strong>HOMIE</strong>.</p>
        <p>Mã OTP của bạn là:</p>
        <h1 style="color: #007BFF">${otp}</h1>
        <p>Mã có hiệu lực trong vòng <strong>10 phút</strong>.</p>
        <br />
        <p style="font-size: 12px; color: #777;">Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
        <p style="font-size: 12px; color: #777;">HOMIE Team</p>
      </div>
    `,
  };
  

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email và mật khẩu là bắt buộc" }, { status: 400 });
    }

    await connectMongo();

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
    await sendOtpEmail(email, otp);

    return NextResponse.json({ message: "Đăng ký thành công! Vui lòng kiểm tra email để nhận OTP." }, { status: 200 });
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json({ message: "Lỗi máy chủ" }, { status: 500 });
  }
}
