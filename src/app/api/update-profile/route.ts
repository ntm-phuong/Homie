import { NextResponse } from 'next/server';
import cloudinary from '@/src/lib/cloudinary';
import User from '@/src/models/User';
import { connectDB } from '@/src/lib/mongoose';

export async function PUT(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const user = await User.findOne({ token });

    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const file: File | null = formData.get('image') as unknown as File;

    // Upload ảnh nếu có
    let imageUrl = null;
    if (file) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;
    
        const uploadRes = await cloudinary.uploader.upload(base64Image, {
          folder: 'avatar',
        });
    
        imageUrl = uploadRes.secure_url;
      } catch (uploadError: any) {
        console.error('Image upload error:', uploadError);
        return NextResponse.json(
          { success: false, message: 'Image upload failed', error: uploadError.message },
          { status: 500 }
        );
      }
    }
    // Cập nhật thông tin
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.avatar = imageUrl || user.avatar; 
    await user.save();
    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        avatar: user.avatar,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
