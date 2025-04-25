import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongoose";
import Like from "@/src/models/Like";
import Room from "@/src/models/Room";
import User from "@/src/models/User";

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

    const likes = await Like.find({ userId: user._id }).populate("roomId");

    const favoriteRooms = likes
      .map((like) => like.roomId)
      .filter((room) => room);

    return NextResponse.json({ success: true, data: favoriteRooms });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to get favorites" },
      { status: 500 }
    );
  }
}
