import jwt from "jsonwebtoken";
import { connectDB } from "@/src/lib/mongoose";
import User from "@/src/models/User";

export async function verifyToken(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return {
        success: false,
        status: 401,
        message: "No token provided",
      };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      id: string;
    };
    await connectDB();

    const user = await User.findById(decoded.id);
    if (!user) {
      return {
        success: false,
        status: 404,
        message: "User not found",
      };
    }

    if (user.status !== "active") {
      return {
        success: false,
        status: 403,
        message: "Account is not active",
      };
    }

    if (!user.isVerified) {
      return {
        success: false,
        status: 403,
        message: "Account is not verified",
      };
    }

    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      status: 401,
      message: "Invalid token",
    };
  }
}

export async function verifyAdmin(request: Request) {
  const authResult = await verifyToken(request);

  if (!authResult.success) {
    return authResult;
  }

  if (authResult.user.role !== "admin") {
    return {
      success: false,
      status: 403,
      message: "Access denied. Admin role required.",
    };
  }

  return authResult;
}
