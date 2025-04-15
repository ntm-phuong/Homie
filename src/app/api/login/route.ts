
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../../../models/User"; 

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: "Invalid credentials!" }, { status: 401 });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1d",
    });

    return NextResponse.json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
