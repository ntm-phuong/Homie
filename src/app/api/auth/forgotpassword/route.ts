import { NextResponse } from 'next/server';
import User from '../../../../models/User';
import { randomBytes } from 'crypto';
import { sendEmail } from '@/src/lib/email';
import { connectDB } from '@/src/lib/mongoose';

export async function POST(request: Request) {
  try {
    await connectDB();

    const { email } = await request.json();

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Email does not exist' }, { status: 404 });
    }

    // 2. Generate verification code (6 digits) and token
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // Mã 6 chữ số
    const resetToken = randomBytes(32).toString('hex'); // Token để sử dụng ở bước reset
    const codeExpiry = new Date(Date.now() + 600000); // Hết hạn sau 10 phút

    // 3. Save to database
    user.verificationCode = verificationCode;
    user.resetToken = resetToken;
    user.codeExpiry = codeExpiry;
    await user.save();

    // 4. Send email with verification code
    await sendEmail({
      to: email,
      subject: 'Password Reset Verification Code',
      html: `
        <p>Your verification code is: <strong>${verificationCode}</strong></p>
        <p>This code will expire in 10 minutes.</p>
      `,
    });

    return NextResponse.json(
      { message: 'Verification code has been sent to your email', resetToken }, // Trả về resetToken để sử dụng sau
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}