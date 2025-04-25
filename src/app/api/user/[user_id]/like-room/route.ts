import { connectDB } from "@/src/lib/mongoose";
import Like from "@/src/models/Like";
import Room from "@/src/models/Room";
import User from "@/src/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }
    const token = authHeader.replace("Bearer ", "");
    const user = await User.findOne({ token });
    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const userId = user._id;

    const likes = await Like.find({ userId }).select("roomId");
    const roomIds = likes.map((like) => like.roomId);

    const rooms = await Room.find({ _id: { $in: roomIds } });

    return NextResponse.json({ success: true, data: rooms });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch liked rooms" },
      { status: 500 }
    );
  }
}
