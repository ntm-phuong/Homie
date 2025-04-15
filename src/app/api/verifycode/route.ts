import { NextResponse } from 'next/server';
import User from '../../../models/User';
import { connectDB } from '@/src/lib/mongoose';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const { email, code } = await request.json();
    
    // 1. Find user with valid code
    const user = await User.findOne({
      email,
      verificationCode: code,
      codeExpiry: { $gt: new Date() }, // Check if code is not expired
    });
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired verification code' },
        { status: 400 }
      );
    }
    
    // 2. Code is valid, return success with resetToken
    return NextResponse.json(
      { 
        message: 'Verification code is valid', 
        resetToken: user.resetToken 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { message: 'Server error' }, 
      { status: 500 }
    );
  }
}