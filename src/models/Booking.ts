import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  room_id: { type: Number, required: true },
  room_name: { type: String },
  room_image: { type: String, required: true },
  address: { type: String },
  price_per_night: { type: Number },
  check_in: { type: Date, required: true },
  check_out: { type: Date, required: true },
  total_nights: { type: Number },
  total_price: { type: Number },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
