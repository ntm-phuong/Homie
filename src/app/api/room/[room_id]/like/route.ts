import { connectDB } from "@/src/lib/mongoose";
import Like from "@/src/models/Like";
import User from "@/src/models/User";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { room_id: string } }
) {
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

    const alreadyLiked = await Like.findOne({
      userId: user._id,
      roomId: params.room_id,
    });

    if (alreadyLiked) {
      return NextResponse.json(
        { success: false, message: "Already liked" },
        { status: 400 }
      );
    }

    await Like.create({ userId: user._id, roomId: params.room_id });

    return NextResponse.json({ success: true, message: "Room liked" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to like room" },
      { status: 500 }
    );
  }
}
