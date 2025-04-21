import { NextResponse } from 'next/server';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/src/lib/mongoose';

export async function POST(request: Request) {
  await connectDB();

  try {
    const { token, newPassword } = await request.json();

    // 1. Find user with valid token
    const user = await User.findOne({
      resetToken: token,
      codeExpiry: { $gt: new Date() }, // Kiểm tra token còn hạn (dùng codeExpiry vì liên quan đến mã xác minh)
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // 2. Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // 3. Update password and clear reset data
    user.password = hashedPassword;
    user.verificationCode = undefined;
    user.resetToken = undefined;
    user.codeExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: 'Password reset successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}