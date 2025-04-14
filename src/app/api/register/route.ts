import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../../../models/User";

// Hàm kết nối MongoDB (tích hợp trực tiếp trong file này)
const connectMongo = async () => {
  if (mongoose.connection.readyState) {
    return; // Nếu đã kết nối, không cần kết nối lại
  }
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export async function POST(req: Request) {
  try {
    // Lấy dữ liệu từ body của request
    const { email, password } = await req.json();

    // Kiểm tra dữ liệu đầu vào
    if (!email || !password) {
      return NextResponse.json({ message: "All fields are required!" }, { status: 400 });
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format!" }, { status: 400 });
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters!" }, { status: 400 });
    }

    // Kết nối MongoDB
    await connectMongo();

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already registered!" }, { status: 409 });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = new User({
      email,
      password: hashedPassword,
      createdAt: new Date(), // Thêm trường createdAt để theo dõi thời gian tạo
    });

    // Lưu user vào database
    await newUser.save();

    // Trả về phản hồi thành công
    return NextResponse.json(
      { message: "Registration successful!", user: { id: newUser._id, email: newUser.email } },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Register Error:", error);
    // Xử lý lỗi chi tiết hơn
    if (error.message.includes("Failed to connect to MongoDB")) {
      return NextResponse.json({ message: "Database connection error" }, { status: 500 });
    }
    if (error.name === "ValidationError") {
      return NextResponse.json({ message: "Invalid user data" }, { status: 400 });
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}