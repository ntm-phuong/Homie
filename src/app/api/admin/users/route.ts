import { NextResponse } from "next/server";
import { verifyAdmin } from "@/src/middleware/auth";
import User from "@/src/models/User";
import { connectDB } from "@/src/lib/mongoose";

export async function GET(request: Request) {
  try {
    const authResult = await verifyAdmin(request);

    if (!authResult.success) {
      return NextResponse.json(
        { message: authResult.message },
        { status: authResult.status }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    query.role = "user";

    const users = await User.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error in admin users API:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Soft Delete user
export async function DELETE(req: Request) {
  try {
    const authResult = await verifyAdmin(req);

    if (!authResult.success) {
      return NextResponse.json(
        { message: authResult.message },
        { status: authResult.status }
      );
    }

    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status: "deleted" },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete user" },
      { status: 500 }
    );
  }
}

// Update user
export async function PUT(req: Request) {
  try {
    const authResult = await verifyAdmin(req);

    if (!authResult.success) {
      return NextResponse.json(
        { message: authResult.message },
        { status: authResult.status }
      );
    }

    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");
    const data = await req.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update user" },
      { status: 500 }
    );
  }
}
