import { connectDB } from "@/src/lib/mongoose";
import Comment from "@/src/models/Comment";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (req: NextRequest, context: { params: { room_id: string } }) => {
  try {
    await connectDB();
    const { room_id } = await context.params;
    if (!room_id) {
      return NextResponse.json(
        { success: false, message: "Room ID is required!" },
        { status: 400 }
      );
    }
    const comments = await Comment.find({ room_id: Number(room_id) }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, comments }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error when fetching comments!",
        error: err.message,
      },
      { status: 500 }
    );
  }
};
