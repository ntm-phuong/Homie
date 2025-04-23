import { NextResponse } from "next/server";
import { verifyAdmin } from "@/src/middleware/auth";

export async function GET(request: Request) {
  try {
    const authResult = await verifyAdmin(request);

    if (!authResult.success) {
      return NextResponse.json(
        { message: authResult.message },
        { status: authResult.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Admin verified successfully",
    });
  } catch (error) {
    console.error("Admin verification error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
