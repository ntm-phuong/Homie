import cloudinary from '@/src/lib/cloudinary';
import { connectDB } from '@/src/lib/mongoose';
import User from '@/src/models/User';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export const PUT = async (req: NextRequest) => {
  await connectDB();

  try {
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
    const file: File | null = formData.get('avatar') as unknown as File;

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;

    // Cập nhật thông tin người dùng
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    // Nếu có file avatar, upload lên Cloudinary
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;

      const uploadRes = await cloudinary.uploader.upload(base64Image, {
        folder: 'users',
      });

      user.avatar = uploadRes.secure_url; // Lưu URL ảnh vào database
    }

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
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: 'Update failed', error: err.message },
      { status: 500 }
    );
  }
};
