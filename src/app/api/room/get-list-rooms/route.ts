import { NextResponse } from "next/server";
import Room from "@/src/models/Room";
import Like from "@/src/models/Like";
import User from "@/src/models/User";
import { connectDB } from "@/src/lib/mongoose";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("search_room") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");
    const skip = (page - 1) * limit;

    const authHeader = req.headers.get("authorization");
    let user = null;
    let likedRoomIds = new Set();

    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      user = await User.findOne({ token });

      if (user) {
        const userLikes = await Like.find({ userId: user._id }).select(
          "roomId"
        );
        likedRoomIds = new Set(userLikes.map((like) => like.roomId.toString()));
      }
    }

    const filter = keyword
      ? {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { address: { $regex: keyword, $options: "i" } },
            { type_room: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};

    const [rooms, total] = await Promise.all([
      Room.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Room.countDocuments(filter),
    ]);

    const enrichedRooms = rooms.map((room) => ({
      ...room.toObject(),
      isUserFavorite: user ? likedRoomIds.has(room._id.toString()) : false,
    }));

    return NextResponse.json({
      success: true,
      data: enrichedRooms,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}
