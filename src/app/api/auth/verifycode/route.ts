import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongoose";
import User from "@/src/models/User";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { code } = await request.json();

    // Kiểm tra code có hợp lệ không
    if (!code) {
      return NextResponse.json(
        { message: "Code is required" },
        { status: 400 }
      );
    }

    // Kiểm tra xem code có phải là số không và có 6 chữ số không
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { message: "Code must be exactly 6 digits" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      verificationCode: code,
      codeExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired verification code" },
        { status: 400 }
      );
    }

    user.codeExpiry = new Date(Date.now() + 600000); // Extend 10 minutes
    await user.save();

    return NextResponse.json(
      {
        message: "Verification code is valid",
        resetToken: user.resetToken,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}