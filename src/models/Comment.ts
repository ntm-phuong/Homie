import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    room_id: { type: Number, required: true },
    user_email: { type: String, required: true },
    user_name: { type: String, required: true },
    user_avatar: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
