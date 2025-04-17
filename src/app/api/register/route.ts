import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../models/User";
import { connectDB } from "@/src/lib/mongoose";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: "All fields are required!" }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format!" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters!" }, { status: 400 });
    }
    await connectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already registered!" }, { status: 409 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });
    await newUser.save();
    return NextResponse.json(
      { message: "Registration successful!", user: { id: newUser._id, email: newUser.email } },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.message.includes("Failed to connect to MongoDB")) {
      return NextResponse.json({ message: "Database connection error" }, { status: 500 });
    }
    if (error.name === "ValidationError") {
      return NextResponse.json({ message: "Invalid user data" }, { status: 400 });
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}